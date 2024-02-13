import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert'
import fs from 'node:fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
	https: {
	key: fs.readFileSync('/etc/letsencrypt/live/allchange.xyz/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/allchange.xyz/fullchain.pem')
 },
port: 443,
proxy: {
	'/communications': {
	target: 'http://localhost:7738',
	changeOrigin: true
	},
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
	'/rpc': {
	target: 'http://localhost:8080',
	changeOrigin: true,
	},
		'/redstoneshit': {
	target: 'http://localhost:3333',
	changeOrigin: true
},
	'/oauth': {
	target: 'http://localhost:8080',
	changeOrigin: true
	},
	'/cdn': {
	target: 'http://localhost:9000',
	changeOrigin: true
	}
  },
  base: '/',
}
})
