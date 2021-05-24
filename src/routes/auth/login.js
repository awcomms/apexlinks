import * as 
api from '$lib/api'
import {respond} from '$lib/_respond'

export async function post(req) {
    const { username, password } = req.body
    const body = await api.post('tokens', { username, password })
    return respond(body)
}