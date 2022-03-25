import adapter from '@sveltejs/adapter-node'
import sveltePreprocess from 'svelte-preprocess'

export default {
	kit: {
		vite: () => ({
			optimizeDeps: {
				exclude: ['totalist', 'sirv', 'local-access']
			}
		}),
		adapter: adapter({
			out: 'build'
		}),
	},
	preprocess: sveltePreprocess({
		preserve: [
			'ld+json'
		]
	})
}