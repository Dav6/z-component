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
        :rules="rules"
        :isButtonsRow="true"
        labelPosition="left"
        @onclick="(data)=>goTo('onclick', data)"
        @onChange="(data) => { goTo('onChange', data) }"
        @onFormItemButtonClick="(data)=>{goTo('onFormItemButtonClick', data)}"
        @onInputSearch="data=>goTo('onInputSearch',data)"
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

    <el-affix position="bottom" :offset="30">
      <el-button @click="goTo('cancel')">清空</el-button>
      <el-button type="primary" @click="goTo('confirm')">确定</el-button>
      <el-button type="primary" @click="goTo('scroll')">确定</el-button>

    </el-affix>

  </div>
</template>

<script setup>
import dayjs from "dayjs";

defineOptions({
  name: "表单嵌套案例",
  key: 'example-nest-form-model',
  isExposed: false
});
import {ref, h, reactive, computed, watch, inject} from "vue"

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
const test = ref();

const buttonList = ref([
  {name: "重置", key: "reset",},
  {name: "查询", key: "search", type: 'primary'}

])
const rules = ref({
  '1.value': [
    {
      validator: (rule, value, callback) => {
        console.log('1.value', value)
        if(value<50){
          return callback(new Error('值要大于50'))
        }

        callback();
      }, trigger: 'blur'
    }
  ]
})

const formList = ref([
  {
    labelWidth: '0',
    formType: "divider",
    value: "复杂嵌套1"
  },
  {
    name: "层级1", key: "layer1", value: "", placeholder: "层级1", disabled: false, formType: "",
    rules: [{required: true, message: "", trigger: "blur"}],
    span: 24,
    width: "110px",
    childrenWidth: " calc(100% - 110px)",
    isChildWidthFill: false,
    childrenSpan: 24,
    children: [
      {
        labelWidth: '0em',
        name: "", key: "layer11", value: "", placeholder: "层级1-1", disabled: false, formType: "", span: 24,
        // rules: [{required: true, message: "请输入", trigger: "blur"}],
        // ownSpan: 0,
        childrenSpan: 24,
        children: [

          {
            labelWidth: '8em',
            name: "层级1-1-1",
            key: "layer111",
            value: "",
            placeholder: "层级1-1-1",
            disabled: false,
            formType: "input",
            span: 12,
            width: 300,
            rules: [{required: true, message: "请输入", trigger: "blur"}],
          },
          {
            marginBottom: 0,
          },
          {
            labelWidth: '8em',
            name: "层级1-1-2",
            key: "layer112",
            value: "",
            placeholder: "层级1-1-2",
            disabled: false,
            formType: "input",
            span: 12,
            width: 200,

            rules: [{required: true, message: "请输入", trigger: "blur"}],
          },
        ]
      },
      {
        labelWidth: '8em',
        // width: "600",
        name: "层级1-2-66666",
        key: "layer12",
        value: "",
        placeholder: "层级1-2",
        disabled: false,
        formType: "input",
        span: 12,
        rules: [{required: true, message: "请输入", trigger: "blur"}],
        childrenSpan: 24,
        isChildrenBr: true,
        formRowClass: "formRowClassTest",

        children: [
          {
            labelWidth: '8em',
            name: "层级1-2-1",
            key: "layer111",
            value: "",
            placeholder: "层级1-2-1",
            disabled: false,
            formType: "input",
            span: 8,
            rules: [{required: true, message: "请输入", trigger: "blur"}],
          },
          {
            labelWidth: '8em',
            name: "层级1-2-1",
            key: "layer111",
            value: "",
            placeholder: "层级1-2-1",
            disabled: false,
            formType: "input",
            span: 8,
            rules: [{required: true, message: "请输入", trigger: "blur"}],
          },
          {
            marginBottom: 0,
          },
          {
            labelWidth: '8em',
            name: "层级1-2-2",
            key: "layer112",
            value: "",
            placeholder: "层级1-1-2",
            disabled: false,
            formType: "input",
            span: 6,
            rules: [{required: true, message: "请输入", trigger: "blur"}],
          },
        ]

      },
    ]
  },

  {
    labelWidth: '0',
    formType: "divider",
    value: "复杂嵌套2"
  },
  {
    name: "层级1", key: "layer1", value: "", placeholder: "层级1", disabled: false, formType: "input", span: 12,
    rules: [{required: true, message: "请输入", trigger: "blur"}],
    children: [

      {
        labelWidth: '8em',
        value: "1123",
        name: "层级1-1", key: "layer11", placeholder: "层级1-1", disabled: false, formType: "input",
        span: 12,
        ownSpan: 12,
        childrenSpan: 18,
        isChildrenBr: true,
        // width:800,
        rules: [{required: true, message: "请输入", trigger: "blur"}],
        children: [

          {
            labelWidth: '8em',
            name: "层级1-1-1",
            key: "layer111",
            value: "",
            placeholder: "层级1-1-1",
            disabled: false,
            formType: "input",
            span: 8,

            rules: [{required: true, message: "请输入", trigger: "blur"}],
          },
          {
            labelWidth: '8em',
            name: "层级1-1-2",
            key: "layer111",
            value: "",
            placeholder: "层级1-1-2",
            disabled: false,
            formType: "input",
            span: 8,

            rules: [{required: true, message: "请输入", trigger: "blur"}],
          },
          {
            // marginBottom:0,
          },
          {
            name: "层级1-1-3",
            labelWidth: "8em",
            key: "options",
            value: [],
            placeholder: "请选择层级1-1-3",
            disabled: false,
            formType: "select",
            span: 24,
            width: 200,

            rules: [{required: true, message: "请选择层级1-1-3", trigger: "blur"}],
            multiple: true,
            collapseTags: true,
            collapseTagsTooltip: true,
            clearable: true,
            options: [
              {
                label: "选项1",
                value: 1,
              },
              {
                label: "选项2",
                value: 2,
              },
              {
                label: "选项3",
                value: 3,
              },
              {
                label: "选项4",
                value: 4,
              },
            ]

          },

        ]
      },
      {
        labelWidth: '8em',
        name: "层级1-2",
        key: "layer12",
        value: "",
        placeholder: "层级1-2",
        disabled: false,
        formType: "input",
        span: 24,
        rules: [{required: true, message: "请输入", trigger: "blur"}],
      },
    ]
  },
])


const addEditFormRef = ref(null);
const goTo = (key, data) => {
  console.log('example-formModel', key, data, formList.value);
  if(key == 'onInputSearch'){
    console.log('onInputSearch',data);
  }

  if (key == 'cancel') {
    addEditFormRef.value.formModelRef.clearValidate();
  }
  if (key == 'confirm') {

    console.log(addEditFormRef.value.getFormDataByNoHidden())
    console.log(addEditFormRef.value.getFormData())
    addEditFormRef.value.formModelRef.validate((valid, invalidFields) => {
      console.log('invalidFields', valid, invalidFields)
      if (valid) {

      }
    })


  }
  if (key == 'onclick') {
    console.log(data);
  }
  if (key == 'scroll') {
    console.log()
    console.log(addEditFormRef.value.scrollToField([55, 'value'].join('.')))

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

  .formRowClassTest {
    background: red;
  }
}
</style>