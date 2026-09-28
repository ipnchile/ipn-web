import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile, writeFile, mkdtemp, unlink, rmdir } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { join } from 'node:path'
import { parse, compileScript } from '@vue/compiler-sfc'
import { createRenderer, h, shallowRef, nextTick } from 'vue'

test('El componente mantiene un banner fijo, rota varias imágenes y permite navegar y pausar', async () => {
  const file = new URL('../src/components/ui/BannerCarousel.vue', import.meta.url)
  const { descriptor } = parse(await readFile(file,'utf8'))
  const compiled = compileScript(descriptor, {id:'banner-test',inlineTemplate:true}).content.replace('../../utils/banner.js',new URL('../src/utils/banner.js',import.meta.url).href)
  const folder = await mkdtemp(new URL('./.banner-test-',import.meta.url))
  const modulePath = join(folder,'component.mjs')
  await writeFile(modulePath,compiled)
  const saved = {window:globalThis.window,document:globalThis.document,setInterval:globalThis.setInterval,clearInterval:globalThis.clearInterval}
  const timers = new Map(); let serial=0
  globalThis.window = {matchMedia:()=>({matches:false,addEventListener(){},removeEventListener(){}})}
  globalThis.document = {hidden:false,addEventListener(){},removeEventListener(){}}
  globalThis.setInterval = fn => { timers.set(++serial,fn); return serial }
  globalThis.clearInterval = id => timers.delete(id)
  const node = (tag,text='') => ({tag,text,children:[],props:{},parent:null})
  const renderer = createRenderer({
    createElement:tag=>node(tag),createText:text=>node('#text',text),createComment:text=>node('#comment',text),
    setText:(n,text)=>{n.text=text},setElementText:(n,text)=>{n.text=text;n.children=[]},
    patchProp:(n,key,_old,value)=>{n.props[key]=value},parentNode:n=>n.parent,
    nextSibling:n=>n.parent?.children[n.parent.children.indexOf(n)+1] || null,
    insert(n,parent,anchor){if(n.parent){n.parent.children.splice(n.parent.children.indexOf(n),1)}const i=parent.children.indexOf(anchor);parent.children.splice(i<0?parent.children.length:i,0,n);n.parent=parent},
    remove(n){if(n.parent)n.parent.children.splice(n.parent.children.indexOf(n),1)},
    insertStaticContent(){throw new Error('Unexpected static fragment')}
  })
  const root=node('root'), config=shallowRef({title:'Portada',slides:[{id:'uno',image:'/uno.jpg',showText:true,title:'Uno'}]})
  const all = n => [n,...n.children.flatMap(all)]
  const byLabel = label => all(root).find(n=>n.props['aria-label']===label)
  const active = () => all(root).find(n=>n.tag==='article' && n.props['aria-hidden']===false)
  let app
  try {
    const {default:Component} = await import(pathToFileURL(modulePath).href)
    app=renderer.createApp({setup:()=>()=>h(Component,{banner:config.value})});app.mount(root)
    await nextTick()
    assert.equal(timers.size,0)
    assert.equal(byLabel('Controles del carrusel'),undefined)
    config.value={...config.value,slides:[...config.value.slides,{id:'dos',image:'/dos.jpg',showText:true,title:'Dos'}],primarySlideId:'dos'}
    await nextTick()
    assert.ok(all(active()).some(n=>n.tag==='img'&&n.props.src==='/dos.jpg'))
    assert.equal(timers.size,1)
    ;[...timers.values()][0]()
    await nextTick()
    assert.equal(active().props['aria-label'],'Imagen 2 de 2')
    byLabel('Imagen anterior').props.onClick()
    await nextTick()
    assert.equal(active().props['aria-label'],'Imagen 1 de 2')
    assert.equal(timers.size,0)
    byLabel('Imagen siguiente').props.onClick()
    await nextTick()
    config.value=JSON.parse(JSON.stringify(config.value))
    await nextTick()
    assert.equal(active().props['aria-label'],'Imagen 2 de 2','Una actualización idéntica no reinicia el carrusel')
    byLabel('Reanudar carrusel').props.onClick()
    await nextTick()
    assert.equal(timers.size,1)
    config.value={...config.value,slides:[config.value.slides[0]],primarySlideId:'uno'}
    await nextTick()
    assert.equal(byLabel('Controles del carrusel'),undefined)
    assert.equal(timers.size,0)
  } finally {
    app?.unmount()
    Object.assign(globalThis,saved)
    await unlink(modulePath)
    await rmdir(folder)
  }
})
