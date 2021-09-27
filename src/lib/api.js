import {post} from '$lib/utils/fetch/post'

export const api = {
    get: async (endpoint, data) => await post('/send', {endpoint, method: 'GET', data}),
    put: async (endpoint, data) => await post('/send', {endpoint, method: 'PUT', data}),
    post: async (endpoint, data) => await post('/send', {endpoint, method: 'POST', data}),
    del: async (endpoint, data) => await post('/send', {endpoint, method: 'DEL', data})
}