export function todayBirthdays(rows, now = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {timeZone:'America/Santiago',month:'2-digit',day:'2-digit'}).formatToParts(now).map(p => [p.type,p.value]))
  const today = `${parts.month}-${parts.day}`
  return rows.filter(row => row.monthDay === today && row.nombre)
    .map(row => ({id:row.id,nombre:row.nombre,role:row.role,monthDay:row.monthDay,daysUntil:0}))
    .sort((a,b) => a.nombre.localeCompare(b.nombre,'es'))
}

export async function publicBirthdays(db) {
  const {results} = await db.prepare("SELECT p.person_id AS id,p.role,substr(p.fecha_nacimiento,6) AS monthDay,json_extract(d.published,'$.nombre') AS nombre FROM pastoral_profiles p JOIN directory_records d ON d.id=p.person_id WHERE p.fecha_nacimiento IS NOT NULL AND d.published IS NOT NULL").all()
  return todayBirthdays(results)
}
