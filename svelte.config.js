import adapter from '@sveltejs/adapter-node'
import sveltePreprocess from 'svelte-preprocess'

export default {
	kit: {
		headers: {
			host: 'X-Forwarded-Host',
			protocol: 'X-Forwarded-Proto'
		},
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