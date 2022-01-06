import { abslink } from "./utils/abslink"
import { emailRegex } from './u'

export const resolveRegex = (word) => {
    if (emailRegex.test(word)) {
        return 'email'
    } else if (abslink.test(word)) {
        return 'link'
    }
}