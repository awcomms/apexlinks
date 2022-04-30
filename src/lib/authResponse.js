export function respond(body) {
	if (!body) return {
		status: 500
	}
	if (body.token) {
		return {
			headers: {
				'set-cookie': `token=${body.token}; SameSite=Strict; HttpOnly; Max-Age=67376900; Path=/; Secure; HttpOnly;`
			},
			body,
			status: body.STATUS
		}
	} else {
		return {
			status: body.STATUS,
			body
		}
	}
}