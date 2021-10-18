import { base } from '$lib/send'

export const get = () => {
    console.log(base, 'robots.txt')
    return {
        headers: {
            Location: `${base}/robots.txt`
        },
        status: 301
    }
}