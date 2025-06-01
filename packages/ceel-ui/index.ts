import components from './component';

const install = (app: any) => {
    
    components.forEach(component => {
      console.log('component',component)
        app.use(component)
    })
};

export default { install, ...components };

export * from '@ceel-ui/components';