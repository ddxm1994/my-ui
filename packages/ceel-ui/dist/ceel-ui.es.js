import { openBlock as e, createElementBlock as c, Fragment as d, pushScopeId as b, popScopeId as i, createElementVNode as s } from "vue";
const a = (t, o) => {
  const n = t.__vccOpts || t;
  for (const [l, p] of o)
    n[l] = p;
  return n;
}, m = /* @__PURE__ */ Object.assign({
  name: "cl-button"
}, {
  __name: "button",
  setup(t) {
    return (o, n) => (e(), c("button", null, "按钮1"));
  }
}), h = /* @__PURE__ */ a(m, [["__scopeId", "data-v-a8a5ee5b"]]), u = (t) => (t.install = (o) => {
  const n = t.name;
  o.component(n, t);
}, t), f = u(h), _ = (t) => (b("data-v-94b2d061"), t = t(), i(), t), g = /* @__PURE__ */ _(() => /* @__PURE__ */ s("button", null, "按钮组1", -1)), B = /* @__PURE__ */ _(() => /* @__PURE__ */ s("button", null, "按钮2", -1)), I = /* @__PURE__ */ Object.assign({
  name: "cl-group-button"
}, {
  __name: "buttonGroup",
  setup(t) {
    return (o, n) => (e(), c(d, null, [
      g,
      B
    ], 64));
  }
}), v = /* @__PURE__ */ a(I, [["__scopeId", "data-v-94b2d061"]]), x = u(v), r = [
  f,
  x
], k = (t) => {
  r.forEach((o) => {
    console.log("component", o), t.use(o);
  });
}, G = { install: k, ...r };
export {
  f as ClButton,
  x as ClGroupButton,
  G as default
};
