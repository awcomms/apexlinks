export function post(path, data, _fetch) {
    let f = _fetch || fetch
    return f(path, {
        method: 'POST',
        body: JSON.stringify(data || {}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => r.json())
}