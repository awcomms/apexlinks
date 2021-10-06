import {send} from '$lib/send'

export async function post(request) {
    console.log('s init')
    const token = request.locals.token
    console.log('send token', token)
    const {endpoint, method, data} = request.body
    console.log('send: ', endpoint, method)
    return {body: await send({method, path:endpoint, data, auth:token})}
}