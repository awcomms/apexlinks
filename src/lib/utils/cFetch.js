export default (base, path, opts, _fetch) => {
  let f = _fetch || fetch
    try {
      return f(`${base}/${path}`, opts)
        .then(async (r) => {
          const text = await r.text();
          let json;
          try {
            json = JSON.parse(text);
          } catch (err) {
            return text;
          }
          json.STATUS = r.status;
          json.OK = !r.status.toString().startsWith('4')
          return json;
        })
        .catch((err) => {
          return { STATUS: 500, error: `API fetch error: ${err}` };
        });
    } catch (err) {
      return { STATUS: 500, error: `API fetch error: ${err}` };
    }
}