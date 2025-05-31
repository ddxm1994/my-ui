function s(t) {
  return (l) => t.forEach((a) => l.use(a));
}
const r = (t) => (t.install = (n) => {
  const l = t.name;
  n.component(l, t);
}, t);
export {
  s as makeInstaller,
  r as withInstall
};
