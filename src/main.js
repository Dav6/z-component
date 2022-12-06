import { createApp } from 'vue'
import App from './App.vue'

import "./styles/normalize.css"

import zrComponent from "./components/index"




const zrComponentOptions = {
  isImportElementPlus:true,
  isImportElementPlusIcon:true,
  elConfig:{zIndex:3000}
}


createApp(App)
  .use(zrComponent,zrComponentOptions)
  .mount('#app')
