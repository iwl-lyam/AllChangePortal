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
	key: fs.readFileSync('/etc/letsencrypt/live/allchange.itwithlyam.co.uk/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/allchange.itwithlyam.co.uk/fullchain.pem')
},
port: 443,
proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
	'/rpc': {
	target: 'http://localhost:8080',
	changeOrigin: true,
	}
  }
  },
  base: '/',
})
