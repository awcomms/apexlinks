import { post } from "$lib/util/fetch"

export const browserSend = async (args, f) => {
    return await post('/send', args, f)
}