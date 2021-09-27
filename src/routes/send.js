import {send} from '$lib/send'

export async function post(request) {
    console.log('on server')
    const token = request.locals.token
    const {endpoint, method, data} = request.body
    return await send({method, endpoint, data, auth:token})
}