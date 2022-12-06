/**
 @name: index
 @author: 戴伟
 @date: 017 2022/11/17 10:14:18
 @file: src/components/test
 @description： do.....
 */

const files = import.meta.glob('./*.vue',{eager:true} )
// console.log('files-c',files)
let module = {};
Object.keys(files)?.map(item=>{
  let _module = files[item]?.default
  let _name = _module?.name;
  if(_name){
    module =  _module
  }
})
// import index from "./index.vue"
// console.log(module)
// console.log(index);
let _name = module?.name;

module.install = Vue => Vue.component(_name, module);
//
// export default MoorSwitch;

export default module