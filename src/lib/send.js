import { dev } from '$app/env'

let local = 'http://127.0.0.1:5000'
import {
	API as live
} from '$lib/env'

export let base = dev ? local : live

export function send({ method, path, data, auth }) {
	const opts = { method, headers: {} }

	if (auth) {
		if (auth.username) {
			opts.headers['auth'] = Buffer.from(`${auth.username}:${auth.password || ''}`).toString('base64')
		} else {
			opts.headers['auth'] = auth
		}
	}

	if (data) {
		opts.headers['Content-Type'] = 'application/json'
		opts.body = JSON.stringify(data);
	}

	try {
		return fetch(`${base}/${path}`, opts)
		.then(async (r) => {
			return {
				status: r.status,
				text: await r.text()
			}
		})
		.then((res)=>{
			try {
				let json = JSON.parse(res.text)
				if(json.error && !json.status){
					json.status = res.status
				}
				return json
			} catch (err) {
				return res.text
			}
		}).catch((err)=>{
			return { status: 500, error: "internal error" };
		})
	} catch {
		return { 'status': 500, 'error': 'internal error'}
	}
}