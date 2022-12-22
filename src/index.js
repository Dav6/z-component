/**
 @name: index
 @author: 戴伟
 @date: 006 2022/12/06 11:31:56
 @file: src
 @description： do.....
 */



import componentsInstall from "@/components/index"
const toolsFiles = import.meta.glob(['@/tools/**/*.js'],{eager:true} )
// console.log('toolsFiles',toolsFiles)
let tools = {};
Object.keys(toolsFiles)?.map(item=>{
  //console.log(files[item].default)
  //
  // console.log( 'name',files[item]?.default?.name)
  let _module = toolsFiles[item]
  // console.log(_module)
  tools = {...tools,..._module}

})
// console.log('tools',tools)
export default {
  install:componentsInstall,
  ...tools,
}