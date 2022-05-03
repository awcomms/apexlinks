import { post } from '$lib/utils/fetch/post'
import { browser } from '$app/env'
import { send } from '$lib/send'
import { browserSend } from './utils/browserSend'

export const api = {
    get: async (path) => {
        let method = 'GET'
        if (browser) {
            return await browserSend({path, method})
        } else {
            return await send({method, path})
        }
    },
    put: async (path, data) => {
        let method = 'PUT'
        let res
        if (browser) {
            res = await browserSend({path, method, data})
        } else {
            res = await send({method, path, data})
        }
        return res
    },
    post: async (path, data) => {
        let method = 'POST'
        if (browser) {
            return await browserSend({path, method, data})
        } else {
            return await send({method, path, data})
        }
    },
    del: async (path, data) => {
        let method = 'DELETE'
        if (browser) {
            return await browserSend({path, method, data})
        } else {
            return await send({method, path, data})
        }
    },
}