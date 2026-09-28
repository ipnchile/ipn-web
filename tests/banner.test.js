import { test } from 'node:test'
import assert from 'node:assert/strict'
import { bannerSlides } from '../src/utils/banner.js'
import { validateContent, mediaIds, publicData } from '../admin/worker/content.js'

const slide = (id, overrides = {}) => ({ id, image: `https://media.ipnchile.cl/conferencias/${id}.webp`, title: 'Fe y comunión', description: 'Nuestra iglesia reunida', showText: true, ...overrides })
const banner = slides => ({ title: 'Conferencias', enabled: true, slides })

test('Conserva efectos y encuadre, con valores compatibles para banners anteriores', () => {
  const legacy = validateContent('banner', banner([slide('uno')]))
  assert.equal(legacy.transition, 'fade')
  assert.equal(legacy.slides[0].zoom, 100)
  assert.equal(legacy.slides[0].positionX, 50)
  for (const transition of ['fade', 'slide', 'zoom', 'none']) {
    const value = validateContent('banner', {...banner([slide('uno', {zoom:150, positionX:25, positionY:75})]), transition})
    const published = publicData({id:'home-banner',published:JSON.stringify(value)}, 'https://public.test')
    assert.equal(published.transition, transition)
    assert.equal(published.slides[0].zoom, 150)
    assert.equal(published.slides[0].positionY, 75)
  }
  for (const overrides of [{zoom:99}, {zoom:201}, {zoom:'150'}, {zoom:NaN}, {positionX:-1}, {positionY:101}]) {
    assert.throws(() => validateContent('banner', banner([slide('uno', overrides)])), e => e.status === 400)
  }
  assert.throws(() => validateContent('banner', {...banner([slide('uno')]), transition:'invalid'}), e => e.status === 400)
})
test('Una imagen es válida sin exigir carrusel; conserva títulos y textos superpuestos', () => {
  const value = validateContent('banner', banner([slide('uno')]))
  assert.equal(value.slides.length, 1)
  assert.equal(value.primarySlideId, 'uno')
  assert.equal(value.image, value.slides[0].image)
  assert.equal(value.slides[0].showText, true)
  assert.equal(value.slides[0].description, 'Nuestra iglesia reunida')
})
test('La principal se muestra primero sin mutar el orden editable', () => {
  const value = validateContent('banner', { ...banner([slide('uno'), slide('dos'), slide('tres')]), primarySlideId: 'dos' })
  assert.deepEqual(bannerSlides(value).map(s => s.id), ['dos', 'uno', 'tres'])
  assert.deepEqual(value.slides.map(s => s.id), ['uno', 'dos', 'tres'])
  assert.equal(value.image, value.slides[1].image)
})
test('Los banners anteriores siguen funcionando como imagen fija sin texto duplicado', () => {
  const value = validateContent('banner', { title: 'Afiche', image: slide('uno').image, link: '/actualidad/eventos', enabled: true })
  assert.equal(value.slides, undefined)
  const [legacy] = bannerSlides(value)
  assert.equal(legacy.fit, 'contain')
  assert.equal(legacy.showText, false)
  assert.equal(legacy.link, '/actualidad/eventos')
})
test('Valida todas las imágenes, enlaces, límites e imagen principal', () => {
  for (const value of [banner([]), banner(Array.from({length:13}, (_,i) => slide(String(i)))), banner([slide('uno'),slide('uno')]), banner([slide('uno',{image:''})]), banner([slide('uno',{image:'https://dash.cloudflare.com/cuenta'})]), banner([slide('uno',{link:'javascript:alert(1)'})]), banner([slide('uno',{buttonText:'Abrir'})]), banner([slide('uno',{fit:'invalid'})]), {...banner([slide('uno')]),primarySlideId:'missing'}, banner([null])]) {
    assert.throws(() => validateContent('banner',value), e => e.status === 400)
  }
})
test('Las referencias privadas se incluyen y se resuelven en todas las diapositivas', () => {
  const id = '12345678-1234-1234-1234-123456789abc'
  const value = validateContent('banner', banner([slide('uno'), slide('dos', {image:`asset:${id}`})]))
  assert.deepEqual(mediaIds(value),[id])
  const result = publicData({id:'home-banner',published:JSON.stringify(value)},'https://public.test')
  assert.equal(result.slides[1].image,`https://public.test/public/media/${id}`)
})
