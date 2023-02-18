<!--
  author: 戴伟
  date: 017 2022/11/17 16:10:52
  file: src\example\formModal\index.vue
  des:
    do.....
-->

<template>
  <div class="form-model">
    <d-form-model

      ref="addEditFormRef"
      :statusIcon="true"
      labelWidth="8em"
      :formList="formList"
      :buttonList="buttonList"
      :isButtonsRow="true"
      labelPosition="top"
      @onClick="(data)=>goTo('onClick', data)"
      @onChange="(data) => { goTo('onChange', data) }"
      @onFormItemButtonClick="(data)=>{goTo('onFormItemButtonClick', data)}"

    >
      <template #imagePre="imagePre">
        <div style="white-space: pre-wrap">
          <code>
            {{ imagePre.data.value }}

          </code>

        </div>

      </template>

      <template #test="test">
        <!-- {{  images  }} -->
        <div>
          {{ test }}
        </div>
      </template>
      <template #test1="test">
        <!-- {{  images  }} -->
        <div>
          {{ test }}
        </div>
      </template>
      <template #test112="data">
        test112
      </template>


    </d-form-model>

    <!--    <el-affix position="bottom" :offset="30">-->
    <!--      <el-button @click="goTo('cancel')">清空</el-button>-->
    <!--      <el-button type="primary" @click="goTo('confirm')">确定</el-button>-->

    <!--    </el-affix>-->

  </div>
</template>

<script setup>
import dayjs from "dayjs";

defineOptions({
  name: "联动表单案例",
  key: 'example-form-model',
  isExposed: false
});
import {ref, reactive, computed, watch, inject} from "vue"


const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String, Boolean],
  },
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits([]);

const defaultCOM = computed(() => {
  return '';
});

//watch(
//  () => props, (newValue, oldValue) => {
//    //console.log('newValue', newValue);
//    //console.log('oldValue', oldValue);
//    // defaultActive = newValue.path;
//
//  },
//   {immediate: true}
//);


const buttonList = ref([
  {name: "重置", key: "reset",},
  {name: "查询", key: "search", type: 'primary'}

])
const formList1 = [


  {
    name: "设备名称", key: "deviceName", value: "", placeholder: "请输入设备名称", formType: "input", span: 12,
    rules: [{required: true, message: "请选择", trigger: "blur"}],
  },
  {
    name: "设备类型", key: "deviceType", value: "", placeholder: "请输入设备类型", formType: "input", span: 12,
    rules: [{required: true, message: "请选择", trigger: "blur"}],
  },
  {
    name: "设备ID", key: "deviceId", value: "", placeholder: "请输入设备ID", formType: "inputNumber", span: 12,
    rules: [{required: true, message: "请选择", trigger: "blur"}],

  },
  {
    name: "品牌", key: "brand", value: "", placeholder: "请输入品牌", formType: "input", span: 12,
    linkageKey: "deviceId",
    linkageValue: 0,
    rules: [{required: true, message: "请选择", trigger: "blur"}],
  },
  {
    name: "型号", key: "type", value: "", placeholder: "请输入型号", formType: "input", span: 12,
    rules: [{required: true, message: "请选择", trigger: "blur"}],
  },
  // [
  //   {name: "规格", key: "attr", formType: "input", span: 12},
  //
  // ],
  {
    name: "所属网关", key: "gateway", value: "", placeholder: "请输入所属网关", formType: "input", span: 24,
    linkageKey: "type",
    linkageValue: "",
    rules: [{required: true, message: "请选择", trigger: "blur"}],

    children: [
      {
        name: "通讯类型",
        key: "communicationType",
        value: "",
        placeholder: "请输入通讯类型",


        formType: "input",
        span: 12,
        rules: [{required: true, message: "请选择", trigger: "blur"}],
      },
      {
        name: "当前值", key: "currentValue", value: "", placeholder: "请输入当前值", formType: "input", span: 12,
        rules: [{required: true, message: "请选择", trigger: "blur"}],
      },
      {
        name: "预警值", key: "earlyValue", value: "", placeholder: "请输入预警值", formType: "input", span: 12,
        rules: [{required: true, message: "请选择", trigger: "blur"}],
      },
      {
        name: "预警等级", key: "earlyLevel", value: "", placeholder: "请输入预警等级", formType: "select", span: 12,
        rules: [{required: true, message: "请选择", trigger: "blur"}],
        options: [],
      },
      {
        name: "处理人",
        key: "handleBy",
        value: "",
        placeholder: "请选择处理人",
        disabled: false,
        formType: "select",
        span: 12,
        options: [],
        rules: [
          {required: true, message: "请选择处理人", trigger: "blur"}
        ]
      },
      {
        name: "处理意见",
        key: "handlingOpinions",
        value: "",
        placeholder: "请输入设备名称",
        disabled: false,
        formType: "textArea",
        span: 24,
        rules: [{required: true, message: "请选择", trigger: "blur"}],
      },
    ]
  },
  {
    name:"按钮",
    key:"ts",
    width: 220,
    labelWidth: "0",
    marginBottom:"18px",
    formType: "input",
    children: [
      {
        key:"sss",
        buttonList: [
          { name: "查 询", key: "search", type: "primary" },
          { name: "重 置", key: "reset" },
        ],
      }
    ]

  },


]
const formList2 = [
  {
    name: "名称",
    key: "templateName",
    placeholder: "请输入名称",
    formType: "input",
    isClearable: true,
    labelWidth: "4em",
    span: 24,
    rules: [{ required: true, message: "请输入名称", trigger: "blur" }],
  },
  {
    name: "描述",
    key: "remarks",
    placeholder: "请输入描述",
    formType: "input",
    isClearable: true,
    labelWidth: "4em",
    span: 24,
    linkageKey: "templateName",

    rules: [{ required: true, message: "请输入描述", trigger: "blur" }],
  },
  {
    name: "触发类型",
    key: "triggerType",
    placeholder: "请选择触发类型",
    formType: "select",
    isClearable: true,
    labelWidth: "0",
    span: 24,
    rules: [{ required: true, message: "请选择名称", trigger: "blur" }],
    options:[
      //   //触发类型  0:设备触发  1:定时触发 2：手动触发
      {
        label:"设备触发",
        value:0,
      },
      {
        label:"定时触发",
        value:1,
      },
      {
        label:"手动触发",
        value:2,
      }
    ]
  },
  //
  {
    name: "定时器", key: "triggerTime", value: "", placeholder: "请选择", formType: "cron", span: 24,
    linkageKey: "triggerType",
    linkageValue: 1,
    rules: [{required: true, message: "请选择", trigger: "blur"}],
  },

  {
    span: 24,
    formType: " ",
    key:"tt",
    linkageKey: "triggerType",
    linkageValue: 0,
    children:[
      {
        formType: "divider",
        contentPosition:"left",
        span: 14,
        value:"当",
        marginBottom:"0",
        childrenSpan:10,
        children:[
          {
            name: "",
            key: "满足条件",
            placeholder: "请选择满足条件",
            formType: "select",
            isClearable: true,
            labelWidth: "0",
            span: 24,
            rules: [{ required: true, message: "请选择满足条件", trigger: "blur" }],
            options:[
              //满足条件 0：任意满足 1：同时满足
              {
                label:"任意满足",
                value:0,
              },
              {
                label:"同时满足",
                value:1,
              },
            ]
          },
        ]
      },
      {
        formType: "",
        span: 24,

        children:[
          {
            name: "设备",
            key: "name",
            placeholder: "请选择名称",
            formType: "select",
            isClearable: true,
            labelWidth: "4em",
            span: 12,
            rules: [{ required: true, message: "请选择名称", trigger: "blur" }],
          },
          {
            name: "位置",
            key: "name",
            placeholder: "请选择名称",
            formType: "select",
            isClearable: true,
            labelWidth: "4em",
            span: 12,
            rules: [{ required: true, message: "请选择名称", trigger: "blur" }],
          },
          {
            name: "条件",
            key: "name",
            placeholder: "请选择名称",
            formType: "select",
            isClearable: true,
            labelWidth: "4em",
            span: 24,
            rules: [{ required: true, message: "请选择名称", trigger: "blur" }],

          },
        ]
      },

    ]
  },










]

const formList = ref(formList2)
// console.log(JSON.stringify(formList.value))
const addEditFormRef = ref(null);
const goTo = (key, data) => {
  console.log('example-formModel', key, data);

  if(key == 'onFormItemButtonClick'){
    let _bKey = data?.bItem.key
    if(_bKey == 'search'){
      // console.log(addEditFormRef.value?.getFormData());


    }
    if(_bKey == 'reset'){
      addEditFormRef.value?.resetFields();

    }

    console.log('getFormDataByNoHidden',addEditFormRef.value.getFormDataByNoHidden())
    console.log('getFormData',addEditFormRef.value.getFormData())


  }







  if (key == 'cancel') {
    addEditFormRef.value.formModelRef.clearValidate();
  }

  if (key == 'confirm') {

    console.log('getFormDataByNoHidden',addEditFormRef.value.getFormDataByNoHidden())
    console.log('getFormData',addEditFormRef.value.getFormData())
    addEditFormRef.value.formModelRef.validate((valid) => {
      console.log(valid)
      if (valid) {

      }
    })


  }
  if (key == 'onClick') {

    let _buttonKey = data?.key;
    if(_buttonKey == 'reset'){
      // addEditFormRef.value.formModelRef.clearValidate();
      addEditFormRef.value.clearValidate();
      console.log('getFormDataByNoHidden',addEditFormRef.value.getFormDataByNoHidden())
      console.log('getFormData',addEditFormRef.value.getFormData())
    }

    if(_buttonKey == 'search'){
      console.log('data',data);
      console.log('getFormDataByNoHidden',addEditFormRef.value.getFormDataByNoHidden())
      console.log('getFormData',addEditFormRef.value.getFormData())
      addEditFormRef.value.validate((valid) => {
        console.log(valid);
      })
      // addEditFormRef.value.formModelRef.validate((valid) => {
      //   console.log(valid)
      //   if (valid) {
      //
      //   }
      // })
    }


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

.form-model {
  //height:300vh;
  //background:red;
  width: calc(100% - 24px);
}
</style>