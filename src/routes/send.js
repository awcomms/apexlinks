import {send} from '$lib/send'

export async function post(request) {
    const token = request.locals.token
    const {endpoint, method, data} = request.body
    return {body: await send({method, path:endpoint, data, auth:token})}
}