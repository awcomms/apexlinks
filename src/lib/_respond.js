export function respond(body) {
	console.log('running respond; body: ', body)

	if (body.error) {
		return { 
			status: 401, 
			body 
		}
	} else if (body.token) {
		console.log('response token: ', body.token)
		return {
			headers: {
				'set-cookie': `token=${body.token}; SameSite=Strict; HttpOnly; Max-Age=67376900; Path=/; Secure; HttpOnly;`
			},
			body
		}
	} else {
		return {
			body 
		}
	}
}