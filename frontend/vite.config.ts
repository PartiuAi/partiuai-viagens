import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
//
// Dois modos de build:
//  - `npm run build`        -> UM unico dist/index.html, com CSS/JS/imagens
//                              embutidos (funciona por duplo clique, via file://)
//  - `npm run build:folder` -> build tradicional para hospedar (assets em arquivos
//                              separados, com hash e cacheaveis)
export default defineConfig(({ mode }) => {
  const folderBuild = mode === 'folder'

  return {
    plugins: folderBuild ? [react()] : [react(), viteSingleFile()],
    optimizeDeps: {
      include: ['lucide-react'],
    },
    build: {
      target: 'es2020',
      cssCodeSplit: folderBuild,
      assetsInlineLimit: folderBuild ? 4096 : 100000000,
    },
  }
})
