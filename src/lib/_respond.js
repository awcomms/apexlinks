export function respond(body) {
	if (body.errors) {
		return { status: 401, body }
	}

	return {
		headers: {
			'set-cookie': `token=${token}; SameSite=Strict; HttpOnly; Max-Age=67376900 Path=/; Secure; HttpOnly;`
		},
		body
	}
}