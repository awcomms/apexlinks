export const equal = (one, two) => {
    return one.every((o) => two.find((t) => o.id === t.id));
  };