import { send } from "$lib/send";

export async function post({ request, locals }) {
  const { token: auth } = locals;
  const { path, method, data } = await request.json();
  return { body: await send({ method, path, data, auth }) };
}
