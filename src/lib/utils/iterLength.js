export const iterLength = (iter) => {
    let length = 0
    while (iter.next()) ++length
    return length
}