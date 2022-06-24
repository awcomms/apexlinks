import "cookie";
import "./socket-c916af1c.js";
const cFetch = (base2, path, opts, _fetch) => {
  let f = _fetch || fetch;
  try {
    return f(`${base2}/${path}`, opts).then(async (r) => {
      const text = await r.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (err) {
        return text;
      }
      json.STATUS = r.status;
      json.OK = !r.status.toString().startsWith("4");
      return json;
    }).catch((err) => {
      return { STATUS: 500, error: `API fetch error: ${err}` };
    });
  } catch (err) {
    return { STATUS: 500, error: `API fetch error: ${err}` };
  }
};
const base = "https://apexlinks-nhw6.onrender.com";
function send({ method, path, data, auth }, f) {
  const opts = { method, headers: {} };
  if (auth) {
    if (auth.username) {
      opts.headers["auth"] = Buffer.from(`${auth.username}:${auth.password || ""}`).toString("base64");
    } else {
      opts.headers["auth"] = auth;
    }
  }
  if (data) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(data);
  }
  return cFetch(base, path, opts, f);
}
export { base as b, send as s };
