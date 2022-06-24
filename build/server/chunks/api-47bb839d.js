import { s as send } from "./send-cf4176c0.js";
const api = {
  get: async (path, fetch) => {
    let method = "GET";
    {
      return await send({ method, path }, fetch);
    }
  },
  put: async (path, data, fetch) => {
    let method = "PUT";
    let res;
    {
      res = await send({ method, path, data }, fetch);
    }
    return res;
  },
  post: async (path, data, fetch) => {
    let method = "POST";
    {
      return await send({ method, path, data }, fetch);
    }
  },
  del: async (path, data, fetch) => {
    let method = "DELETE";
    {
      return await send({ method, path, data }, fetch);
    }
  }
};
export { api as a };
