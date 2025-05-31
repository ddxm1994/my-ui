import { openBlock as l, createElementBlock as a } from "vue";
const r = (t, n) => {
  const o = t.__vccOpts || t;
  for (const [s, e] of n)
    o[s] = e;
  return o;
}, _ = /* @__PURE__ */ Object.assign({
  name: "cl-button"
}, {
  __name: "button",
  setup(t) {
    return (n, o) => (l(), a("button", null, "按钮1212"));
  }
}), u = /* @__PURE__ */ r(_, [["__scopeId", "data-v-f9431c83"]]), f = (t) => (t.install = (n) => {
  const o = t.name;
  n.component(o, t);
}, t), i = f(u), c = [
  i
], m = (t) => {
  console.log(11111, c), c.forEach((n) => {
    t.use(n);
  }), console.log(t);
}, b = { install: m, ...c };
export {
  i as ClButton,
  b as default
};
