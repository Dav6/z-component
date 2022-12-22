# zrComponents

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and
disable Vetur)
+ [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## 安装插件

```sh
npm install
```

### 运行demo

```sh
npm run dev
```

### 打包插件

```sh
npm run build
```

# 使用方式
### 组件安装方式
1. package.json 加入 
```
"dependencies": { 
    "zr-component": "git+http://192.168.10.100:8070/develops/zr-component.git"
},
```
2. 插件安装 
```
npm install zr-component --force  
```


### 组件使用之前 先安装[element-plus](https://element-plus.gitee.io/zh-CN/guide/quickstart.html)
 
```
import zrComponent from "zr-component"

const uploadFile = (file)=>{
   do.... 
   return url; 需要传出地址显示到页面上
}

const zrComponentOptions = {
  uploadFileMethod:uploadFile, // 图片上传需要的方法 
}
createApp(App)
  .use(elementIcon)
  .use(installElementPlus)
  .use(zrComponent,zrComponentOptions)
  .mount('#app')
```

