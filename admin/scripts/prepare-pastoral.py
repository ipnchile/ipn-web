"""Read-only XLSX extraction and deterministic, guarded D1 import preparation."""
import collections, datetime as dt, hashlib, json, pathlib, re, sqlite3, sys, unicodedata
import openpyxl

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / 'imports' / 'pastoral-2026-10-05'
SOURCE = pathlib.Path(r'C:\Users\saifa\Downloads\Actualizacion Datos Cuerpo Pastoral IPN CHILE (respuestas) (1).xlsx')
NOW = '2026-10-05T00:00:00Z'
def norm(value):
    text = unicodedata.normalize('NFKD', str(value or '').lower())
    text = ''.join(c for c in text if not unicodedata.combining(c))
    text = re.sub(r'\b(pr|pra|presbitero|rev|pastor|pastora)\b', '', text)
    return ' '.join(re.findall(r'[a-z0-9]+', text))
def text(v):
    if v is None: return ''
    if isinstance(v, float) and v.is_integer(): return str(int(v))
    return str(v).strip()
def rut(v): return re.sub(r'[^0-9K]', '', text(v).upper()) or None
def serial(v): return v.isoformat() if isinstance(v,(dt.date,dt.datetime)) else v
def date(v, row, label, corrections):
    if v is None or not text(v): return None
    if isinstance(v,(dt.datetime,dt.date)): return v.date().isoformat() if isinstance(v,dt.datetime) else v.isoformat()
    m = re.fullmatch(r'(\d{1,2})/(\d{1,2})/(\d{4})',text(v))
    if not m: raise ValueError(f'Fecha no reconocida: fila {row}, {label}: {v}')
    month,day,year=map(int,m.groups())
    if year < 100:
        corrections.append({'row':row,'field':label,'original':text(v),'corrected':f'{year+1900:04}-{month:02}-{day:02}'})
        year += 1900
    return dt.date(year,month,day).isoformat()
def compact(v): return json.dumps(v,ensure_ascii=False,separators=(',',':'))
def zone(v):
    n=norm(v)
    words=['primera','segunda','tercera','cuarta','quinta','sexta','septima','octava','novena','decima','undecima']
    n=n.replace('promera','primera')
    for i,w in enumerate(words,1):
        if w in n: return f'{i} Zona'
    m=re.search(r'\d+',n)
    return f'{int(m.group())} Zona' if m else text(v)

def prepare(snapshot=None):
    OUT.mkdir(parents=True,exist_ok=True)
    if snapshot:
        raw=json.loads(pathlib.Path(snapshot).read_text(encoding='utf-8-sig'))
        base=raw['result'][0]['results'] if isinstance(raw,dict) else raw[0]['results']
        baseline='remote'
    else:
        directory=json.loads((ROOT/'seed-data/directory.json').read_text(encoding='utf-8-sig'))
        base=[{'id':r['id'],'kind':kind,'draft':compact({k:v for k,v in r.items() if k!='id'}),'published':compact({k:v for k,v in r.items() if k!='id'}),'revision':1,'updated_at':NOW,'updated_by':'initial'} for kind,key in [('person','people'),('church','churches')] for r in directory[key]]
        baseline='local_seed_only'
    records={r['id']:dict(r) for r in base}
    people={r['id']:json.loads(r['draft']) for r in base if r['kind']=='person'}
    churches={r['id']:json.loads(r['draft']) for r in base if r['kind']=='church'}
    names=collections.defaultdict(list)
    for id,p in people.items(): names[norm(p['nombre'])].append(id)
    digest=hashlib.sha256(SOURCE.read_bytes()).hexdigest(); import_id='xlsx-'+digest[:20]
    sheet=openpyxl.load_workbook(SOURCE,read_only=True,data_only=True).worksheets[0]
    all_rows=list(sheet.iter_rows(values_only=True)); headers=all_rows[0]
    rows=[(i,r) for i,r in enumerate(all_rows[1:],2) if text(r[3])]
    corrections=[]; profiles={}; identities={}; assignments=[]; new_people=[]; new_churches=[]; conflicts=[]
    def person(row,r,role):
        ni,di,ri,ti=(3,4,5,6) if role=='pastor' else (10,11,12,13)
        name=text(r[ni]); key=norm(name)
        if role=='pastor' and key=='alex bernardo brana ramirez':
            name='Alex Bernardo Brana Godoy';key=norm(name)
        if not name or key in {'viudo','sin','sin pastora'}: return None
        identity=rut(r[ri]) or key
        pid=identities.get(identity)
        if not pid:
            candidates=list(dict.fromkeys(names.get(key,[])))
            if not candidates and key=='fernando ramon arriagada alvarez': candidates=list(dict.fromkeys(names.get('fernando ramon arriagada alvaerz',[])))
            if not candidates and key=='alex bernardo brana godoy': candidates=list(dict.fromkeys(names.get('alex bernardo brana ramirez',[])))
            primary=[p for p in candidates if p.startswith(role+'-')]
            if len(primary)>1: raise ValueError('Identidad ambigua: '+name)
            pid=primary[0] if primary else candidates[0] if len(candidates)==1 else None
            if not pid:
                pid=role+'-xlsx-'+hashlib.sha256(identity.encode()).hexdigest()[:16]
                people[pid]={'nombre':name,'grado':'','email':'','foto_url':'','cargos':[]}; new_people.append(pid)
            identities[identity]=pid; names[key].append(pid)
        data=people[pid]
        data['nombre']=name
        if role=='pastor': data['grado']=text(r[7])
        institutional=text(r[2])
        if role=='pastor' and re.fullmatch(r'[^\s@]+@ipnchile\.cl',institutional,re.I): data['email']=institutional
        birth=date(r[di],row,'nacimiento_'+role,corrections)
        if not birth: raise ValueError('Falta nacimiento: '+name)
        if not '1900-01-01' <= birth <= '2026-10-05': raise ValueError('Nacimiento fuera de rango: '+name)
        profiles[pid]={'person_id':pid,'role':role,'rut':rut(r[ri]),'fecha_nacimiento':birth,'telefono':text(r[ti]),'correo_contacto':text(r[2]) if role=='pastor' else '', 'estado_civil':text(r[9]),'domicilio_particular':text(r[14]),'fecha_matrimonio':date(r[15],row,'matrimonio',corrections),'fecha_nombramiento':date(r[8],row,'nombramiento',corrections) if role=='pastor' else None,'source_import':import_id,'source_row':row,'submitted_at':serial(r[1]),'updated_at':NOW}
        return pid
    for row,r in sorted(rows,key=lambda x:(serial(x[1][1]),x[0])):
        pastor=person(row,r,'pastor'); pastora=person(row,r,'pastora')
        matches=[id for id,c in churches.items() if c.get('pastor_id')==pastor]
        # Distinct couples submitted for the same named church/address: retain both observations.
        if not matches:
            matches=[id for id,c in churches.items() if norm(c.get('source_nombre',c['nombre']))==norm(r[17]) or ('arza 40' in norm(r[18]) and 'arza 40' in norm(c.get('direccion')))]
        if len(matches)>1: raise ValueError('Iglesia ambigua: '+text(r[17]))
        if matches: cid=matches[0]
        else:
            cid='church-xlsx-'+hashlib.sha256((norm(r[17])+'|'+norm(r[18])).encode()).hexdigest()[:16]
            slug='ipn-'+norm(r[17]).replace(' ','-')+'-'+cid[-6:]
            churches[cid]={'nombre':text(r[17]),'slug':slug,'comuna':'','region':'','zona':'','direccion':'','horarios':[],'telefono':'','email':'','redes':{'facebook':'','instagram':'','youtube':''},'foto_url':'','pastor_id':'','pastora_id':'','lat':None,'lng':None,'googleMapsName':'','searchAliases':[]}; new_churches.append(cid)
        c=churches[cid]; earlier=[a for a in assignments if a['church_id']==cid and a['pastor_id']!=pastor]
        review=bool(earlier)
        confirmed_rey = norm(r[3])=='luis ernesto vega catalan' and 'arza 40' in norm(r[18])
        if review and confirmed_rey:
            for a in earlier: a['needs_review']=0
            c['pastor_id']=pastor;c['pastora_id']=pastora or '';c.pop('asignacion_pendiente',None)
            review=False
        elif review:
            conflicts.append({'church_id':cid,'church':text(r[17]),'rows':[a['source_row'] for a in earlier]+[row],'reason':'Distintos pastores para la misma iglesia; asignación pendiente'})
            for a in earlier: a['needs_review']=1
            c['pastor_id']=''; c['pastora_id']=''; c['asignacion_pendiente']=True
        else:
            c['pastor_id']=pastor;c['pastora_id']=pastora or ''
        c['source_nombre']=text(r[17]);c['direccion']=text(r[18]);c['zona']=zone(r[16])
        c['horarios']=[h.strip() for h in text(r[19]).splitlines() if h.strip()]
        c['horarios_texto']=text(r[19])
        assignments.append({'import_id':import_id,'source_row':row,'church_id':cid,'pastor_id':pastor,'pastora_id':pastora,'submitted_at':serial(r[1]),'direccion':text(r[18]),'horarios_texto':text(r[19]),'zona':zone(r[16]),'needs_review':int(review)})
    for cid,c in churches.items():
        if 'arza 40' in norm(c.get('direccion')):
            confirmed=[a for a in assignments if a['church_id']==cid and norm(people[a['pastor_id']]['nombre'])=='luis ernesto vega catalan']
            if confirmed:
                a=confirmed[-1];c.update(pastor_id=a['pastor_id'],pastora_id=a['pastora_id'] or '',direccion=a['direccion'],horarios_texto=a['horarios_texto'],horarios=a['horarios_texto'].splitlines(),zona=a['zona'])
                c.pop('asignacion_pendiente',None)
                for item in assignments:
                    if item['church_id']==cid:item['needs_review']=0
                conflicts=[f for f in conflicts if f['church_id']!=cid]
    payloads=[{'import_id':import_id,'source_row':i,'submitted_at':serial(r[1]),'payload':compact({str(h):serial(v) for h,v in zip(headers,r)})} for i,r in rows]
    changes=[]
    for kind,items in [('person',people),('church',churches)]:
        for id,data in items.items():
            old=records.get(id); draft=compact(data)
            if old and json.loads(old['draft'])==data: continue
            # Never overwrite a separate unpublished edit or retire/publish existing records implicitly.
            if old and old['published'] and json.loads(old['draft'])!=json.loads(old['published']):
                raise ValueError('Existe un borrador sin publicar: '+id)
            changes.append({'id':id,'kind':kind,'draft':draft,'published':draft if not old or old['published'] else None,'before':old})
    plan={'baseline':baseline,'source':str(SOURCE),'source_sha256':digest,'import_id':import_id,'imported_at':NOW,'responses':payloads,'profiles':list(profiles.values()),'assignments':assignments,'changes':changes}
    report={'baseline':baseline,'responses':len(rows),'pastores':sum(p['role']=='pastor' for p in profiles.values()),'pastoras':sum(p['role']=='pastora' for p in profiles.values()),'new_people':len(new_people),'new_churches':len(new_churches),'corrections':corrections,'conflicts':conflicts,'changes':len(changes),'maps':'Coordenadas, slugs existentes y código del mapa conservados; nuevas iglesias sin geolocalización.'}
    (OUT/'plan.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2),encoding='utf-8')
    (OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(report,ensure_ascii=False))
    return plan,base

if __name__=='__main__': prepare(sys.argv[1] if len(sys.argv)>1 else None)
