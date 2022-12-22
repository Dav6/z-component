import { createApp } from 'vue'
import App from './App.vue'

import "./styles/normalize.css"

import elementIcon from "@/plugins/svgicon";
import "element-plus/dist/index.css";
import installElementPlus from "@/plugins/element";

import zrComponent from "./index"




const zrComponentOptions = {

}


createApp(App)
  .use(elementIcon)
  .use(installElementPlus)
  .use(zrComponent,zrComponentOptions)
  .mount('#app')
