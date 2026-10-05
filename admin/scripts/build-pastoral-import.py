import json,pathlib,sqlite3,sys
from prepare_pastoral import prepare,ROOT,OUT,compact
def quote(v):
    if v is None:return 'NULL'
    if isinstance(v,int):return str(v)
    return "'"+str(v).replace("'","''")+"'"
def insert(table,row,clause=''):
    keys=list(row)
    return f"INSERT INTO {table}({','.join(keys)}) VALUES({','.join(quote(row[k]) for k in keys)}){clause};"
def make_sql(plan):
    sql=["CREATE TABLE IF NOT EXISTS pastoral_import_guards (id TEXT PRIMARY KEY, valid INTEGER NOT NULL CHECK(valid=1));"]
    for c in plan['changes']:
        old=c['before']
        if old:
            test=f"EXISTS(SELECT 1 FROM directory_records WHERE id={quote(c['id'])} AND revision={old['revision']} AND draft={quote(old['draft'])} AND published IS {quote(old['published'])})"
        else:test=f"NOT EXISTS(SELECT 1 FROM directory_records WHERE id={quote(c['id'])})"
        sql.append(f"INSERT OR REPLACE INTO pastoral_import_guards(id,valid) VALUES({quote(plan['import_id']+'-'+c['id'])},CASE WHEN {test} THEN 1 ELSE 0 END);")
    sql.append(insert('pastoral_imports',{'id':plan['import_id'],'source_name':pathlib.Path(plan['source']).name,'source_sha256':plan['source_sha256'],'imported_at':plan['imported_at'],'response_count':len(plan['responses'])}))
    for c in sorted(plan['changes'],key=lambda c:0 if c['kind']=='person' else 1):
        old=c['before']
        if old:
            sql.append(f"UPDATE directory_records SET draft={quote(c['draft'])},published={quote(c['published'])},revision=revision+1,updated_at={quote(plan['imported_at'])},updated_by='pastoral-xlsx-import' WHERE id={quote(c['id'])};")
        else:
            sql.append(insert('directory_records',{'id':c['id'],'kind':c['kind'],'draft':c['draft'],'published':c['published'],'revision':1,'updated_at':plan['imported_at'],'updated_by':'pastoral-xlsx-import'}))
    for row in plan['responses']:sql.append(insert('pastoral_responses',row))
    for row in plan['profiles']:
        fields=[k for k in row if k!='person_id']
        clause=" ON CONFLICT(person_id) DO UPDATE SET "+','.join(k+'=excluded.'+k for k in fields)+" WHERE pastoral_profiles.submitted_at IS NOT NULL AND excluded.submitted_at>pastoral_profiles.submitted_at AND pastoral_profiles.updated_at<=excluded.updated_at"
        sql.append(insert('pastoral_profiles',row,clause))
    for row in plan['assignments']:sql.append(insert('pastoral_assignments',row))
    sql.append(f"DELETE FROM pastoral_import_guards WHERE id LIKE {quote(plan['import_id']+'-%')};")
    return '\n'.join(sql)
def verify(plan,base,sql):
    db=sqlite3.connect(':memory:')
    db.executescript((ROOT/'migrations/0003_directory.sql').read_text())
    for row in base:
        keys=['id','kind','draft','published','revision','updated_at','updated_by']
        clean={k:row.get(k) for k in keys}
        clean['revision']=clean['revision'] or 1;clean['updated_at']=clean['updated_at'] or plan['imported_at'];clean['updated_by']=clean['updated_by'] or 'initial'
        db.execute(insert('directory_records',clean))
    db.commit()
    for name in ['0008_pastoral_registry.sql','0009_database_site_data.sql']:db.executescript((ROOT/'migrations'/name).read_text())
    db.executescript('BEGIN;\n'+sql+'\nCOMMIT;')
    assert db.execute('PRAGMA foreign_key_check').fetchall()==[]
    assert db.execute('SELECT count(*) FROM pastoral_responses').fetchone()[0]==54
    assert db.execute('SELECT count(*) FROM pastoral_profiles').fetchone()[0]==94
    assert db.execute("SELECT count(*) FROM pastoral_profiles WHERE fecha_nacimiento<'1900-01-01'").fetchone()[0]==0
    c=db.execute("SELECT draft FROM directory_records WHERE kind='church' AND json_extract(draft,'$.direccion') LIKE '%Arza 40%'").fetchone()
    p=db.execute("SELECT draft FROM directory_records WHERE id=?",(json.loads(c[0])['pastor_id'],)).fetchone()
    assert json.loads(p[0])['nombre']=='Luis Ernesto Vega Catalán'
    for old in base:
        if old['kind']!='church':continue
        before=json.loads(old['draft']);after=json.loads(db.execute('SELECT draft FROM directory_records WHERE id=?',(old['id'],)).fetchone()[0])
        for k in ['lat','lng','slug','googleMapsName','searchAliases']:assert before.get(k)==after.get(k),(old['id'],k)
    # A concurrent edit must reject and roll back the entire import.
    db2=sqlite3.connect(':memory:'); db.backup(db2)
    state=db2.execute('SELECT count(*) FROM directory_records').fetchone()[0]
    try:db2.executescript('BEGIN;\n'+sql+'\nCOMMIT;')
    except sqlite3.IntegrityError:db2.rollback()
    else:raise AssertionError('El guardia no rechazó una reimportación')
    assert db2.execute('SELECT count(*) FROM directory_records').fetchone()[0]==state
    (OUT/'verified.sqlite').unlink(missing_ok=True)
    target=sqlite3.connect(OUT/'verified.sqlite');db.backup(target);target.close()
    print(json.dumps({'local_verified':True,'profiles':94,'responses':54,'maps_preserved':True,'reimport_guard':True}))
if __name__=='__main__':
    plan,base=prepare(sys.argv[1] if len(sys.argv)>1 else None)
    sql=make_sql(plan);(OUT/'import.sql').write_text(sql,encoding='utf-8')
    verify(plan,base,sql)

