import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'

export default {
	kit: {
		adapter: adapter({
			out: 'build'
		}),
	},
	preprocess: preprocess({
		preserve: [
			'ld+json'
		]
	})
}