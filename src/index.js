/**
 @name: index
 @author: 戴伟
 @date: 006 2022/12/06 11:31:56
 @file: src
 @description： do.....
 */



import componentsInstall from "@/components/index"
const toolsFiles = import.meta.glob(['@/tools/**/*.js'],{eager:true} )
console.log('toolsFiles',toolsFiles)


export default {
  install:componentsInstall,
}