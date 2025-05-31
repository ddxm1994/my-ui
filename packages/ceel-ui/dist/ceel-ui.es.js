import { openBlock as a, createElementBlock as l } from "vue";
const r = (t, n) => {
  const o = t.__vccOpts || t;
  for (const [c, s] of n)
    o[c] = s;
  return o;
}, _ = /* @__PURE__ */ Object.assign({
  name: "cl-button"
}, {
  __name: "button",
  setup(t) {
    return (n, o) => (a(), l("button", null, "按钮"));
  }
}), u = /* @__PURE__ */ r(_, [["__scopeId", "data-v-ebcea9a2"]]), i = (t) => (t.install = (n) => {
  const o = t.name;
  n.component(o, t);
}, t), m = i(u), e = [
  m
], f = (t) => {
  console.log(e), e.forEach((n) => {
    t.use(n);
  }), console.log(t);
}, b = { install: f, ...e };
export {
  m as ClButton,
  b as default
};
