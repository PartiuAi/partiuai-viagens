/**
 * Embute as imagens da pasta public/ como data URIs no index.html gerado.
 *
 * O build single-file junta CSS e JS, mas os caminhos como `/brand/logo.png`
 * (usados em JSX e em atributos do HTML) continuam absolutos e quebram quando
 * o arquivo e aberto via `file://`. Este passo troca cada referencia pelo
 * conteudo do arquivo em base64, deixando o index.html autossuficiente.
 */
import { readFileSync, writeFileSync, existsSync, rmSync, statSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const htmlPath = join(dist, 'index.html')

if (!existsSync(htmlPath)) {
  console.error('dist/index.html nao encontrado. Rode o vite build antes.')
  process.exit(1)
}

const MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
}

let html = readFileSync(htmlPath, 'utf8')

// Caminhos absolutos locais (nao URLs completas de meta tags como
// `https://partiuai.com.br/brand/...`, que devem continuar como estao).
// O Vite reescreve alguns para `./arquivo`, entao o prefixo e opcional.
const LOCAL_ASSETS =
  /(?<![\w.-])(?:\.\/|\/)(?:brand|images|uploads)\/[A-Za-z0-9._-]+|(?<![\w.-])(?:\.\/|\/)favicon\.svg/g

// Caminhos absolutos para arquivos que existem em dist (imagens, icone).
const candidates = [...new Set(html.match(LOCAL_ASSETS) || [])]

let inlined = 0
let bytesBefore = 0
let bytesAfter = 0

for (const url of candidates) {
  const filePath = join(dist, url.replace(/^\.?\//, ''))
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    console.warn(`  ! nao encontrado, mantendo caminho: ${url}`)
    continue
  }

  const ext = extname(filePath).toLowerCase()
  const mime = MIME[ext]
  if (!mime) {
    console.warn(`  ! mime desconhecido para ${url}, mantendo caminho`)
    continue
  }

  const raw = readFileSync(filePath)
  const dataUri = `data:${mime};base64,${raw.toString('base64')}`

  const occurrences = html.split(url).length - 1
  html = html.split(url).join(dataUri)

  bytesBefore += raw.length * occurrences
  bytesAfter += dataUri.length * occurrences
  inlined += 1
  console.log(`  + ${url}  (${occurrences}x, ${(raw.length / 1024).toFixed(0)} KB -> ${(dataUri.length / 1024).toFixed(0)} KB)`)
}

writeFileSync(htmlPath, html, 'utf8')

// Os arquivos agora sao redundantes: tudo esta dentro do index.html.
for (const dir of ['brand', 'images', 'uploads']) {
  const target = join(dist, dir)
  if (existsSync(target)) {
    rmSync(target, { recursive: true, force: true })
    console.log(`  - removida pasta dist/${dir}`)
  }
}

for (const file of ['favicon.svg']) {
  const target = join(dist, file)
  if (existsSync(target)) {
    rmSync(target, { force: true })
    console.log(`  - removido dist/${file} (agora embutido)`)
  }
}

const restantes = html.match(LOCAL_ASSETS)
console.log(`\n${inlined} arquivo(s) embutido(s). ${(bytesBefore / 1024).toFixed(0)} KB -> ${(bytesAfter / 1024).toFixed(0)} KB em base64.`)
console.log(`index.html final: ${(statSync(htmlPath).size / 1024 / 1024).toFixed(2)} MB`)
if (restantes) {
  console.warn(`AVISO: ainda restam ${restantes.length} caminho(s) absoluto(s):`, [...new Set(restantes)])
  process.exitCode = 1
} else {
  console.log('Nenhum caminho absoluto restante — o arquivo e autossuficiente.')
}
