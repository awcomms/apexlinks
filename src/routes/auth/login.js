import { send } from '$lib/send'
import {respond} from '$lib/_respond'

export async function post(req) {
    const { username, password } = req.body
    const body = await send({method: 'POST', path: 'tokens', auth: { username, password }})
    return respond(body)
}