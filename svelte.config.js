import adapter from '@sveltejs/adapter-node'
import { optimizeCarbonImports } from 'carbon-components-svelte/preprocess/index.js'

export default {
	kit: {
		trailingSlash: 'never',
		adapter: adapter({
			out: 'build'
		}),
		vite: {
			optimizeDeps: {
				include: ['clipboard-copy']
			}
		},
	},
	
	preprocess: [
		optimizeCarbonImports()
	]
}