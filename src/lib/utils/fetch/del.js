export function del(endpoint) {
    return fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => r.json())
}