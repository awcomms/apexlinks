import { post } from "$lib/utils/fetch"

export const browserSend = async (args) => {
    return await post('/send', args)
}