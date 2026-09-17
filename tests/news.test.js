import { test } from 'node:test'
import assert from 'node:assert/strict'
import { instagramPostUrl, newsLocation } from '../src/utils/news.js'

test('Instagram acepta publicaciones y reels y elimina seguimiento', () => {
  assert.equal(instagramPostUrl('https://instagram.com/p/Abc_123-/?igsh=abc#fragment'), 'https://www.instagram.com/p/Abc_123-/')
  assert.equal(instagramPostUrl('https://www.instagram.com/reel/Abc123/'), 'https://www.instagram.com/reel/Abc123/')
  for (const value of ['', undefined, 'https://www.instagram.com/ipnchilecuentaoficial/', 'https://instagram.com.evil.test/p/abc/', 'https://instagram.com@evil.test/p/abc/', 'javascript:alert(1)', 'http://instagram.com/p/abc/', 'https://evil.test/p/abc/', 'https://instagram.com:444/p/abc/']) assert.equal(instagramPostUrl(value), '')
})

test('Cada título del inicio enlaza la tarjeta de su noticia', () => {
  assert.deepEqual(newsLocation('abc-123'), { path: '/actualidad/noticias', hash: '#noticia-abc-123' })
})
