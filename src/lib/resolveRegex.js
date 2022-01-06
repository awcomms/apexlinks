import { abslinkRegex } from "./utils/regex"
import { emailRegex } from './utils/regex'

export const resolveRegex = (word) => {
    if (emailRegex.test(word)) {
        return 'email'
    } else if (abslinkRegex.test(word)) {
        return 'link'
    }
}