export const send = async (method, {tags, fields, image, options, parents, children, item}) => {
    loading = true;

    let data = {
      id: item?.id || null,
      options,
      parents: parents.map((p) => p.id),
      children: children.map((c) => c.id),
      "remove-parents": item.parents.reduce(
        (prev, id) => (parents.find((p) => p.id === id) ? prev : [...prev, id]),
        []
      ),
      "remove-children": item.children.reduce(
        (prev, id) => (children.find((c) => c.id === id) ? prev : [...prev, id]),
        []
      ),
      tags,
      fields,
      image,
    };

    let res = await api[method]("items", data).finally((r) => {
      loading = false;
      return r;
    });
    // return res
    console.log("edit res", res);
    if (res.id) {
        return true
      goto(`/i/${res.id}`);
    }
  };