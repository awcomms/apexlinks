export function get(path, loadFetch) {
    let fetchFunction = loadFetch || fetch
    return fetchFunction(path, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => r.json())
}