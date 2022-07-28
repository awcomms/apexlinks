import { parseMarkdown } from '$lib/util'
import {readFileSync} from 'fs'

export const get = () => {
    let about = readFileSync('./about.md').toString()
    about = parseMarkdown(about)
    return {
        body: {about}
    }
}