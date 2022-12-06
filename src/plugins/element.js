/*
 * @Author: your name
 * @Date: 2021-01-07 10:51:26
 * @LastEditTime: 2022-01-20 10:40:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\plugins\element.js
 */

import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "dayjs/locale/zh-cn";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  install: (app, elePlus) => {
    app.use(ElementPlus, {
      locale: zhCn,
      size: "default",
      zIndex:2999,
    });

    // for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    //   app.component(key, component)
    // }
  },
  version:()=>{
    return ElementPlus.version
  }
};
