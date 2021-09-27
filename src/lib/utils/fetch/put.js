export function put(endpoint, data) {
    return fetch(endpoint, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(data || {}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => r.json())
}