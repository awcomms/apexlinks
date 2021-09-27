import { post as _post } from '$lib/send'
import {respond} from '$lib/_respond'

export async function post(req) {
    const { username, password } = req.body
    const body = await _post('tokens', null, { username, password })
    console.log('res: ', body)
    return respond(body)
}