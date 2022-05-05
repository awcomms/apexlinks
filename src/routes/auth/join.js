import { send } from '$lib/send'
import {respond} from '$lib/authResponse'

export async function post({request}) {
    const { email, username, password } = await request.json()
    const token = await send({method: 'POST', path: 'users', data: { email }, auth: { username, password }})
    return respond(token)
}