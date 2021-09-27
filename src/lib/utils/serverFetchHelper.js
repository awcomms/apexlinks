import * as methods from '$lib/utils/fetch'

export const serverFetchHelper = {
    get: methods.get,
    put: methods.put,
    post: methods.post,
    del: methods.del
}