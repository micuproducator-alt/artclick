// Rulează după `vite build`: pune conținutul randat în dist/index.html.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = path.join(root, 'dist', 'index.html')
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href)

const appHtml = render()
const html = fs.readFileSync(htmlPath, 'utf-8')
if (!html.includes('<div id="root"></div>')) throw new Error('Nu găsesc <div id="root"></div> în dist/index.html')
fs.writeFileSync(htmlPath, html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`))
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`Prerender OK: ${appHtml.length} caractere HTML în dist/index.html`)
