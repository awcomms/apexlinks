import base from '$lib/send'

export const get = () => {
    return {
        headers: {
            Location: `${base}/robots.txt`
        },
        status: 301
    }
}