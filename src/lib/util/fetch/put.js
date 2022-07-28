export function put(path, data) {
    return fetch(path, {
        method: 'PUT',
        body: JSON.stringify(data || {}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => r.json())
}