import { send } from '$lib/send'
import {respond} from '$lib/_respond'

export async function post(req, res) {
    const { email, username, password } = req.body
    const token = await send({method: 'POST', path: 'users', data: { email }, auth: { username, password }})
    return respond(token)
}