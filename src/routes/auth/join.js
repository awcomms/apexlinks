import * as api from '$lib/api'
import {respond} from '$lib/_respond'

export function post(req, res) {
    const { email, username, password } = req.body
    const token = api.post('users', { email, username, password })
    return respond(token)
}