import * as api from '$lib/api'

export async function post(req) {
    await api.del('tokens', req.locals.token)
    req.locals.token = null
    return {
        headers: {
            'set-cookie': 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'
        },
        body: {
            ok: true
        }
    }
}