import { browser } from '$app/env'
import { send } from '$lib/send'
import { browserSend } from './browserSend'

export default {
    get: async (path, fetch) => {
        let method = 'GET'
        if (browser) {
            return await browserSend({ path, method }, fetch);
        } else {
            return await send({method, path}, fetch)
        }
    },
    put: async (path, data, fetch) => {
        let method = 'PUT'
        let res
        if (browser) {
            res = await browserSend({ path, method, data }, fetch);
        } else {
            res = await send({ method, path, data }, fetch);
        }
        return res
    },
    post: async (path, data, fetch) => {
        let method = 'POST'
        if (browser) {
            return await browserSend({ path, method, data }, fetch);
        } else {
            return await send({ method, path, data }, fetch);
        }
    },
    del: async (path, data, fetch) => {
        let method = 'DELETE'
        if (browser) {
            return await browserSend({ path, method, data }, fetch);
        } else {
            return await send({method, path, data}, fetch)
        }
    },
}