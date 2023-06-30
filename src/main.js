import { createApp } from 'vue'
import App from './App.vue'

import "./styles/normalize.css"
import "./styles/common.less"


import elementIcon from "@/plugins/svgicon";
import "element-plus/dist/index.css";
import installElementPlus from "@/plugins/element";
import { createPinia } from "pinia";

import zrComponent from "./index"
const pinia = createPinia();


console.log(installElementPlus.version())

const zrComponentOptions = {

}


createApp(App)
  .use(elementIcon)
  .use(pinia)
  .use(installElementPlus)
  .use(zrComponent,zrComponentOptions)
  .mount('#app')
