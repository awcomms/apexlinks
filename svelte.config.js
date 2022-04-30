import adapter from '@sveltejs/adapter-node'
import sveltePreprocess from 'svelte-preprocess'

export default {
	kit: {
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