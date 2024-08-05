import { defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	const backendPort = `${env.VITE_BACKEND_PORT ?? 3001}`;

	return {
		plugins: [react()],
		css: {
			postcss: {
				plugins: [tailwindcss()],
			},
		},
		server: {
			proxy: {
				'/api': {
					target: `http://localhost:${backendPort}`,
					changeOrigin: true,
					secure: false,
				},
				'/socket.io': {
					target: `http://localhost:${backendPort}`,
					ws: true,
				},
			}
		},
	}
})

