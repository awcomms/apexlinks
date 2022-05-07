export default (opt) =>
  selections.find(
    (s) => /*s.exact && s.label === opt.label &&*/ s.value === opt.value
  );
