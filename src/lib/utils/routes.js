let txts = '/t'
let users = '/u'

export const routes = {
  index: "/",
  login: "/login",
  items: "/i",
  txts,
  txt: (id) => `${txts}/${id}`,
  user: (id) => `${users}/${id}`,
  txtTxt: (id) => `${txts}/${id}/txt`,
  txtEdit: (id) => `${txts}/${id}/edit`,
  userTxt: (id) => `${users}/${id}/txt`,
};