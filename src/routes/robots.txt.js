import { API } from '$lib/env'

export const get = () => {
    return {
        headers: {
            Location: `${API}/robots.txt`
        },
        status: 301
    }
}