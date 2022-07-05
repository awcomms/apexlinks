export const cFetch = (base, path, opts, _fetch) => {
  let f = _fetch || fetch
    try {
      return f(`${base}/${path}`, opts)
        .then(async (r) => {
          const text = await r.text();
          let json = {
            STATUS: r.status,
            OK: !r.status.toString().startsWith('4')
          };
          let _json
          try {
            _json = JSON.parse(text);
            _json.OK = !_json.error;
          } catch (err) {
            return { ...json, TEXT: text };
          }
          return {...json, ..._json}
        })
        .catch((err) => {
          return { STATUS: 500, error: `API fetch error: ${err}` };
        });
    } catch (err) {
      return { STATUS: 500, error: `API fetch error: ${err}` };
    }
}