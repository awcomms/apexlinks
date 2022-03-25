import { send } from '$lib/send'
import {respond} from '$lib/_respond'

export async function post({request}) {
    const { username, password } = await request.json()
    const body = await send({ method: 'POST', path: 'tokens', auth: { username, password } })
    return respond(body)
}