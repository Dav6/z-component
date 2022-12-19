/**
 @name: index
 @author: 戴伟
 @date: 009 2022/11/09 15:05:27
 @file: src/components
 @description： do.....
 */
import * as components from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
// import "dayjs/locale/zh-cn";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import locale from 'element-plus/lib/locale'
// locale.use(zhCn)

// const

import * as injectKeys from "@/injection/keys"
// console.log('injectKeys',injectKeys)

const files = import.meta.glob(['@/components/**/index.js'],{eager:true} )
console.log('components-files',files)


const defaultOptions = {
  uploadFileMethod:'',
  elConfig:{},
}
const install = (app,options=defaultOptions)=>{
  console.log('app',app)
  console.log('options',options)
  // console.log(ElementPlusIconsVue)




  // 默认注册所有 injectKeys
  Object.keys(injectKeys)?.map(key=>{
    // console.log(key)


    if(key == 'EL_CONFIG'){
      if(options?.elConfig){
        //
        return app.provide(/* 注入名 */ injectKeys[key], /* 值 */options?.elConfig)
      }
    }

    // 文件上传
    if(key == 'UPLOAD_FILE_INJECT_KEY'){

      if(options?.uploadFileMethod){
       //
       return app.provide(/* 注入名 */ injectKeys[key], /* 值 */options?.uploadFileMethod)
      }
    }








    app.provide(/* 注入名 */ injectKeys[key], /* 值 */)




  })







  Object.keys(files)?.map(item=>{
    //console.log(files[item].default)
    //
    // console.log( 'name',files[item]?.default?.name)
    let _module = files[item]?.default
    let _name = _module?.name;
    // console.log('component',_name);

    if(_name){
      let _component = _module
      app.component(_name, _component)
      // app.component(_name, _component)
      // console.log(app)
      // app.component(_name, _component)
    }

  })


  // app.provide(/* 注入名 */ 'message', /* 值 */ ()=>{return '123'})

  // console.log(app)



}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default install