import { post } from "$lib/utils/fetch"

export const browserSend = async (args, f) => {
    return await post('/send', args, f)
}