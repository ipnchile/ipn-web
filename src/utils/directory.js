export function projectChurches({churches,people}) {
  const peopleById = new Map(people.map(p => [p.id,p]))
  return churches.map(c => {
    const pastor=peopleById.get(c.pastor_id), pastora=peopleById.get(c.pastora_id)
    return {...c,pastor:pastor?.nombre || '',pastora:pastora?.nombre || '',grado:pastor?.grado || '',email:pastor?.email || '',emailPastora:pastora?.email || '',foto:c.foto_url,fotoMini:c.foto_url,fotoIglesia:c.foto_url,fotoPastor:pastor?.foto_url || '',fotoPastora:pastora?.foto_url || ''}
  })
}
export function projectAuthorities({people}) {
  return people.flatMap(p => (p.cargos || []).map(c => ({...c,nombre:p.nombre,foto:p.foto_url}))).sort((a,b) => a.orden-b.orden)
}
