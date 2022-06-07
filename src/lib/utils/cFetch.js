export default (base, path, opts) => {
    try {
      return fetch(`${base}/${path}`, opts)
        .then(async (r) => {
          const text = await r.text();
          let json;
          try {
            json = JSON.parse(text);
          } catch (err) {
            return { text, STATUS: r.status, OK: r.statusText === OK };
          }
          json.STATUS = r.status;
          json.OK = r.statusText === "OK";
          return json;
        })
        .catch((err) => {
          return { status: 500, error: "internal error" };
        });
    } catch {
      return { status: 500, error: "internal error" };
    }
}