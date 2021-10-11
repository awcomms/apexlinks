export const attrFromArray = (arr, find, label='label') => {
    obj = arr.find(f => f[label] === find)
    if (obj) {
        return obj
    } else {
        return null
    }
}