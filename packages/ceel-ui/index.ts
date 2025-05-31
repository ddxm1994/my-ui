import components from './component';

const install = (app: any) => {
    console.log(components);
    
    components.forEach(component => {
        app.use(component)
    })
    console.log(app);
    
};

export default { install, ...components };

export * from '@ceel-ui/components';