export default (base, path, opts) => {
    try {
      return fetch(`${base}/${path}`, opts)
        .then(async (r) => {
          const text = await r.text();
          let json;
          try {
            json = JSON.parse(text);
          } catch (err) {
            return text;
          }
          json.STATUS = r.status;
          return json;
        })
        .catch((err) => {
          return { status: 500, error: `fetch internal error: ${err}` };
        });
    } catch (err) {
      return { status: 500, error: `real internal error: ${err}` };
    }
}