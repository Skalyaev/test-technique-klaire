import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const alias = {
    '@': path.resolve(__dirname, './src')
}
const config = defineConfig({
    resolve: { alias },
    plugins: [react()]
})
export default config
