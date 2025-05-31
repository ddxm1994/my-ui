# 基于vite + pnpm monorepo的vue组件库 

## 思路
好多文章都是直接咔咔咔的上代码。跟着做也没问题，但总觉得少了些什么。下次做的时候还要找文章参考。。

需求有三个模块，那么就需要三个包。使用monorepo进行分包管理。

> a. 组件库 
>
> b. 组件库文档
>
> c. 开发环境

## 项目结构
这里主要记录项目架构中各个模块的联系。
考虑问题：
1. 开发组件总不能盲写吧，总要有个能预览的地方吧？
    - play 包的作用就出来了！
2. 组件库文档中要有组件的使用方式以及代码展示、效果展示。
    - docs 包中如何实现这些？
3. play 包中该如何使用组件库中的组件呢？总不能写一点儿就打包发布一次吧！？
    - pnpm 工作区的作用！package.json 中"@ceel-ui/utils": "workspace:*" 的作用是什么？
4. 开发组件的时候如何使用utils中的工具函数呢？
    - 参考 问题3
```
├── docs
│   ├── 组件库文档
├── packages
│   ├── components
│   │   ├── Button
│   │   │   ├── index.js
│   │   │   ├── src/
│   ├── ceel-ui
│   │   ├── components.ts
│   │   ├── index.js  入口文件
│   │   ├── vite.config.ts
│   ├── utils
│   │   ├── index.js
├── play
│   ├── 组件库开发环境
├── .gitignore
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── package.json
├── README.md
```

## 项目初始化
1. `docs` 文件夹中执行 `npx vitepress init`， 使用vitepress初始化。
2. `play` 文件夹中执行 `npx create vite`，初始化一个普通的`vite + vue` 项目。
3. `packages` 文件夹中添加 `components`、`ceel-ui`（你的组件库名）、`utils`。
4. `packages/ceel-ui`、 `packages/components`、`packages/utils` 文件夹中使用`pnpm init`初始化一个`package.json`。`name`字段对应的值改为对应的名字

例如：`packages/components/` 模块
```json
{
  "name": "@ceel-ui/components", 
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

考虑一个问题：**"@ceel-ui/utils": "workspace:*" 的作用是什么？**

千问回答如下：
>
>在 package.json 文件中，当你看到 "@ceel-ui/utils": "workspace:*" 这样的依赖项，这是在使用 pnpm 或其他一些支持 workspace 的包管理器（如 Yarn）时的一种特殊依赖引用方式。
>
>"workspace:*" 的作用是告诉包管理器从当前 monorepo（多仓库）项目的 workspace 中引用该依赖，而不是从外部下载一个独立的版本。具体来说：
>
> "workspace:*" 指代的是当前 monorepo 项目中定义的 workspace 下的任意版本。
> 这意味着，如果你的项目结构中有一个名为 @ceel-ui/utils 的子项目，那么这个依赖将直接从你的项目目录中引用该子项目，而不是去 NPM 或其他远程仓库下载。
>这种方式的好处包括：
>1. 版本同步:
>  ○ 所有使用 "workspace:*" 引用的项目都会引用 monorepo 中的同一个子项目，这保证了版本的一致性。
>2. 开发速度提升:
>  ○ 由于不需要从网络下载依赖，构建速度和开发迭代速度会有所提升。
>3. 便于开发和测试:
  ○ 你可以在 monorepo 的子项目中进行修改，而无需重新发布到 NPM，就能立即在其他子项目中看到效果，非常适合开发和测试阶段。
>4. 节省磁盘空间:
>  ○ 当你需要更新 @ceel-ui/utils 的功能或修复 bug 时，只需要在一个地方修改即可，所有依赖它的子项目会自动获取更新。


带着答案往下走

play包中通过vite初始化后，就可以启动了（记得下载依赖 pnpm i）。

play 启动后就可以看到一个常见的vite+vue项目。

**如果此时你已经新建了一个button组件。那么该如何在这个play中展示呢？**

答案很简单，
> 1. 在主项目的package.json 中添加软链（本地依赖） "ceel-ui": "workspace:*"
> 2. 在play项目中就可以通过import引入后通过 app.use(ceelUi) 使用。

根目录下的 `package.josn` 如下
```json
{
  "name": "ceel-ui-workspace",
  "dependencies": {
    "vue": "^3.4.32"
  },
  ...
  "devDependencies": {
    ...
    "ceel-ui": "workspace:*",  // 添加这个
    ...
  }
}
```
**特别注意，ceel-ui不是根目录，而是 ceel-ui/packages/components/ceel-ui**

**ceel-ui 作为组件库的入口，那么它应该具备以下功能：**
- 默认导出一个含有install方法的对象，以供vue的use函数去调用（app.use(ceelUi)）。
- 在其install方法中应该循环注册所有的组件。
- 如果要支持按需引入，那么应该导出各个组件。

`ceel-ui/index.ts `内容如下：
```
// 导入所有的组件
import components from './component' //该文件应该整合所有的组件到一个 list 中，然后导出。

const install = (app) => {
  循环 components 给每一项都执行 app.use(component)
}

export default { install }

// 如果要支持按需引入那么应该, 这里 @ceel-ui/components 模块应该导出各个组件。
export * from '@ceel-ui/components' 
```
到这儿你应该已经明白了大半儿，接下来你应该想到的不是去写组件，而是考虑为什么 `from '@ceel-ui/components'` 能导入组件，`npm`是怎么找到的我想要导出的东西呢？

> 提到 npm 你应该立马想到 package.json 因为npm的一些信息都在package.json中存放。

那么在子包`components`中的`package.json`应该配置该包的入口文件地址。也就是 `main` 字段的值。


文件`components/package.json`
```
{
  "name": "@ceel-ui/components",
  "version": "1.0.0",
  "description": "",
  "main": "index.js", // 该包的入口地址 也就是 components/index.js
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
这是没有打包的时候， 打包后该怎么写呢？
其实很简单，直接填写打包后的文件地址即可！

接下来你应该举一反三
- utils 包盖如何配置
- ceel-ui 包该如何配置

## node_modules 冗余依赖问题
play包中有一些依赖，docs中也有，那么是不是可以把它们提取到根目录下？
只需要把play、docs中的依赖项提取的根目录下，重新执行 pnpm i 即可。