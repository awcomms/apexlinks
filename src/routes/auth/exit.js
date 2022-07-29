import { api } from '$lib/util'

export async function POST(req) {
    req.locals.token = null
    await api.del('tokens', req.locals.token)
    return {
        headers: {
            'set-cookie': 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'
        },
        body: {
            ok:true
        }
    }
}