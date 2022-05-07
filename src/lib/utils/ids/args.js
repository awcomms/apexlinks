export default (arg, seperator = '+') => {
    let ids = arg.split("+");
    let items = ids.map((p) => {
      let id;
      try {
        id = Number(p);
      } catch {
        return;
      }
      let item = api.get(`items/${id}?min`);
      return item.id ? item : null;
    });
    return items
}