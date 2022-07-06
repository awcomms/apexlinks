export const attrFromArray = (arr, find, label='label') => {
    let obj = arr.find(f => f[label] === find)
    if (obj) {
        return obj
    } else {
        return null
    }
}