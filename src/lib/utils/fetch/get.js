export function get(path) {
    return fetch(path, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => r.json())
}