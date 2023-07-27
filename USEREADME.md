# zrComponents



## 使用方式
### 组件安装方式
#### 1. package.json 加入 
```
"dependencies": { 
    "zr-component": "git+http://192.168.1.162:8070/develops/zr-component.git"
},
```
#### 2. 插件安装 
```
npm cache clean --force
npm install zr-component --force  
```


#### 3. 组件使用之前 先安装[element-plus](https://element-plus.gitee.io/zh-CN/guide/quickstart.html)
#####  vue版本3.2.0以上  element-plus版本 2.2.0 以上 ，其他版本未测试
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

##### Tip: ts项目中使用  如在vue3中 shims-vue.d.ts 文件中加入 
```
declare module 'zr-component'

```



