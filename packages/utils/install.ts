import type { App, Plugin } from "vue";

type SFCWithInstall<T> = T & Plugin;

export function makeInstaller(components: Plugin[]) {
  const install = (app: App) => components.forEach((c) => app.use(c));
  return install;
}

export const withInstall = <T>(component: T) => {
  (component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any).name;

    app.component(name, component as SFCWithInstall<T>);
  };
  
  return component as SFCWithInstall<T>;
};
