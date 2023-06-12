<!--
  author: 戴伟
  date: 019 2022/12/19 09:14:02
  file: src\example\dialog\index.vue
  des:
    do.....
-->

<template>
  <div class="container-box">
    <d-import-button
            accept=".csv,.xls,.xlsx"

            :uploadFileAPI="uploadFile"
    ></d-import-button>

      <d-el-button-group
              :list="buttonList.list"
              :isDivided="buttonList.isDivided"
              @onClick="data=>goTo('onButtonClick',data)"
      >

      </d-el-button-group>

  </div>
</template>

<script setup>
defineOptions({
  name: "测试案例",
  key: 'example-test',
  isExposed: false
});
import {ref, reactive, computed, watch} from "vue"

const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String, Boolean],
  },
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits([]);


const buttonList = ref({
    isDivided: true,
    list:[
        {
            name: "编辑",
            key: "edit",
            type: 'button',
            class:"edit-button",
        },
        {
            name: "详情",
            key: "detail",
            class:"detail-button",
        },
        {
            name: "更多",
            type: "dropdown",
            // hover/click/contextmenu
            trigger: "click",
            //top/top-start/top-end/bottom/bottom-start/bottom-end
            placement: "bottom-start",
            teleported: true,
            class:"dropdown-button",
            list: [
                {
                    name: "修改",
                    key: "edit",
                    class:"edit",
                },
                {
                    name: "删除",
                    key: "delete",
                    class:"delete",
                },

                {
                    name: "设置",
                    key: "delete",
                    divided: true,
                }
            ]
        }
    ]
})

const uploadFile = (file)=> {
    console.log('addEditDialogStore', file)


    // 如果想要重复点击上传 不要 resolve, reject ,让状态处于中止在那
    return new Promise((resolve, reject) => {
        const _data = {
            type: 'personnel',
            file: file,
        }
        // resolve();
        // uploadFileAPI(_data).then((res: any) => {
        //     // console.log(res);
        //     if (res?.success) {
        //         const _obj = {
        //             url: res?.data?.objectUrl,
        //             key: res?.data?.objectName
        //         }
        //         resolve(_obj)
        //     } else {
        //         this.globalStore.message({message: '上传失败', type: "error"})
        //         reject(res)
        //
        //     }
        // }, err => {
        //     reject(err)
        //     this.globalStore.message({message: '上传失败', type: "error"})
        //
        // })
        // reject()

    })


};



// console.log('cutBg', cutBgWidth)
// setTimeout(()=>cutWidth.value = 20,1000)

const goTo = (key, data) => {
  if (key == 'show') {
    isShow.value = true;
  }
  if (key == 'cancel') {
    isShow.value = false;
  }
}

// 接口请求方法放这
const init = () => {
  //getList();

}

// 统一执行初始化方法
init();


</script>

<style scoped lang="less">
.container-box {
  position: relative;
  padding: 2px;
  background: #999999;
  height: 600px;
}


</style>