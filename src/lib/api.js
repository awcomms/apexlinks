import {post} from '$lib/utils/fetch/post'
import { browser } from '$app/env'
import { send } from '$lib/send'

export const api = {
    get: async (endpoint) => {
        let method = 'GET'
        if (browser) {
            return await post('/send', {endpoint, method})
        } else {
            return await send({method, path: endpoint})
        }
    },
    put: async (endpoint, data) => {
        let method = 'PUT'
        if (browser) {
            return await post('/send', {endpoint, method, data})
        } else {
            return await send({method, path: endpoint, data})
        }
    },
    post: async (endpoint, data) => {
        let method = 'POST'
        if (browser) {
            return await post('/send', {endpoint, method, data})
        } else {
            return await send({method, path: endpoint, data})
        }
    },
    del: async (endpoint, data) => {
        let method = 'DELETE'
        if (browser) {
            return await post('/send', {endpoint, method, data})
        } else {
            return await send({method, path: endpoint, data})
        }
    },
}