export function respond(body) {
	if (body.error) {
		return { 
			status: 401, 
			body 
		}
	} else if(body.token) {
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