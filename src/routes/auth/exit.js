import * as api from '$lib/api'

export function post(req, res) {
    console.log(req)
    // api.del(`tokens?id=${req.session.user.id}`, req.session.user.token)
    return {
        headers: {
            'set-cookie': 'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        },
        body: {
            ok: true
        }
    }
}