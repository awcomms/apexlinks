let local='http://localhost:5000'
let live='https://api.apexlinks.org'

export let base

if (process.env.NODE_ENV === 'development') {base=local} else {base=live}

export function send({ method, path, data, auth }) {
	console.log('path: ', path, '|', 'method: ', method)
	const opts = { method, headers: {} }

	if (auth) {
		if (auth.username && auth.password) {
			opts.headers['auth'] = Buffer.from(`${auth.username}:${auth.password}`).toString('base64')
		} else {
			opts.headers['auth'] = auth
		}
	}

	if (data) {
		opts.headers['Content-Type'] = 'application/json'
		opts.body = JSON.stringify(data);
	}

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
				console.log('json: ', json)
				return json
			} catch (err) {
				console.log('res.text: ', res.text)
				return res.text
			}
		}).catch((err)=>{
			return
		})
}

export function get(path, auth) {
	return send({ method: 'GET', path, auth });
}

export function del(path, auth) {
	return send({ method: 'DELETE', path, auth });
}

export function post(path, data, auth) {
	return send({ method: 'POST', path, data, auth });
}

export function put(path, data, auth) {
	return send({ method: 'PUT', path, data, auth });
}