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
    name: "图片上传",
    key: "image",
    // limit: 1,
    disabled: false,
    formType: "imageVideoUpload",
    span: 20,
    value: [],
    accept: "image/jpeg,image/jpg",
    previewTeleported: true,
    rules: [{ required: true, message: "请上传图片", trigger: "blur" }],
  },
  {
    formType: "divider",
    span: 24,
  },
  {
    name: "名称",
    key: "name",
    value: "",
    formType: "input",
    placeholder: "请输入",
    disabled: false,
    span: 24,
    rules: [{ required: true, message: "请输入", trigger: "blur" }],

    clearable: true,

    buttonList: [
      { name: "", icon: "Plus", key: "add", isText: true },
      { name: "", icon: "Minus", key: "delete", type: "danger", isText: false },
    ],
  },
  {
    formType: "divider",
    span: 24,
  },
  {
    name: "文本内容",
    key: "textArea",
    value: "",
    placeholder: "请输入文本内容",
    disabled: false,
    formType: "input",
    type: "textarea",
    span: 24,
    rules: [{ required: true, message: "请输入文本内容", trigger: "blur" }],
    marginBottom: "",
  },
  {
    formType: "divider",
    span: 24,
  },
  {
    name: "数字",
    key: "number",
    value: "",
    placeholder: "数字",
    disabled: false,
    formType: "inputNumber",
    controls: false,
    textAlign: "left",
    min: 0,
    span: 24,
    rules: [{ required: true, message: "请输入数字", trigger: "blur" }],
  },
  {
    formType: "divider",
    span: 24,
  },
  {
    name: "单选项",
    key: "radio",
    value: "",
    placeholder: "请选择选项",
    disabled: false,
    formType: "radio",
    span: 24,
    rules: [{ required: true, message: "请选择选项", trigger: "blur" }],
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
    ],
  },
  {
    formType: "divider",
    span: 24,
  },
  {
    name: "单选项",
    key: "radio",
    value: "",
    placeholder: "请选择选项",
    disabled: false,
    formType: "radio",
    isRadioBorder: true,
    span: 24,
    rules: [{ required: true, message: "请选择选项", trigger: "blur" }],
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
    ],
  },
  {
    formType: "divider",
    span: 24,
  },
  {
    name: "单选项",
    key: "radio",
    value: "",
    placeholder: "请选择选项",
    disabled: false,
    formType: "radio",
    isRadioButton: true,
    span: 24,
    rules: [{ required: true, message: "请选择选项", trigger: "blur" }],
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
    ],
  },
  {
    formType: "divider",
    span: 24,
  },
  {
    name: "选项",
    key: "options",
    value: [],
    placeholder: "请选择 ",
    disabled: false,
    formType: "select",
    span: 24,
    rules: [{ required: true, message: "请选择", trigger: "blur" }],

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
    ],
  },
  {
    formType: "divider",
    span: 24,
  },
  {
    name: "选项",
    key: "options",
    value: [],
    placeholder: "请选择",
    disabled: false,
    formType: "select",
    span: 24,
    rules: [{ required: true, message: "请选择", trigger: "blur" }],
    multiple: true,
    collapseTags: false,
    collapseTagsTooltip: false,
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
    ],
  },

  {
    formType: "divider",
    span: 24,
  },
  {
    name: "选项",
    key: "options",
    value: [],
    placeholder: "请选择",
    disabled: false,
    formType: "select",
    span: 24,
    rules: [{ required: true, message: "请选择", trigger: "blur" }],
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
    ],
  },
  {
    formType: "divider",
    span: 24,
  },
  {
    name: "选项Tree",
    key: "options",
    value: [],
    placeholder: "请选择",
    disabled: false,
    formType: "treeSelect",
    span: 24,
    rules: [{ required: true, message: "请选择", trigger: "blur" }],
    multiple: true,
    collapseTags: true,
    collapseTagsTooltip: true,
    clearable: true,
    options: [
      {
        label: "选项1",
        value: 1,
        children: [
          {
            label: "选项1",
            value: 1.1,
            children: [],
          },
          {
            label: "选项2",
            value: 1.2,
          },
          {
            label: "选项3",
            value: 1.3,
          },
          {
            label: "选项4",
            value: 1.4,
          },
        ],
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
    ],
  },

  {
    formType: "divider",
    span: 24,
  },
  {
    name: "选项Tree",
    key: "options",
    value: [],
    placeholder: "请选择",
    disabled: false,
    formType: "treeSelect",
    span: 24,
    rules: [{ required: true, message: "请选择", trigger: "blur" }],
    multiple: true,
    collapseTags: true,
    collapseTagsTooltip: true,
    showCheckbox: true,
    clearable: true,
    options: [
      {
        label: "选项1",
        value: 1,
        children: [
          {
            label: "选项1",
            value: 1.1,
            children: [],
          },
          {
            label: "选项2",
            value: 1.2,
          },
          {
            label: "选项3",
            value: 1.3,
          },
          {
            label: "选项4",
            value: 1.4,
          },
        ],
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
    ],
  },
  {
    formType: "divider",
    span: 24,
  },
  {
    name: "选项",
    key: "options",
    value: [],
    placeholder: "请选择",
    disabled: false,
    formType: "cascader",
    span: 24,
    rules: [{ required: true, message: "请选择", trigger: "blur" }],
    clearable: true,
    options: [
      {
        label: "选项1",
        value: 1,
        children: [
          {
            label: "选项1",
            value: 1.1,
            children: [],
          },
          {
            label: "选项2",
            value: 1.2,
          },
          {
            label: "选项3",
            value: 1.3,
          },
          {
            label: "选项4",
            value: 1.4,
          },
        ],
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
    ],
  },
  { formType: "divider", span: 24 },
  {
    name: "时间（time)",
    key: "timePicker",
    formType: "timePicker",
    placeholder: "请选择",
    span: 24,
    rules: [{ required: true, message: "请选择", trigger: "blur" }],
  },
  { formType: "divider", span: 24 },

  {
    name: "时间(date)",
    key: "date",
    value: "",
    placeholder: "请选择开始时间",
    disabled: false,
    formType: "datePicker",
    type: "date",
    span: 24,
    rules: [{ required: true, message: "请选择开始时间", trigger: "blur" }],
    disabledDate: (date) => {
      let _nowTime = dayjs().subtract(24, "hour").valueOf();
      // 选项里的的时间戳 和 今天的时间戳  比较
      // 小于今天的禁止点击
      return new Date(date).getTime() < _nowTime;
    },
  },
  { formType: "divider", span: 24 },

  {
    name: "时间(date)",
    key: "time",
    value: "",
    placeholder: "请选择开始时间",
    disabled: false,
    formType: "datePicker",
    type: "datetime",
    span: 24,
    rules: [{ required: true, message: "请选择开始时间", trigger: "blur" }],
    disabledDate: (date) => {
      let _nowTime = dayjs().subtract(24, "hour").valueOf();
      // 选项里的的时间戳 和 今天的时间戳  比较
      // 小于今天的禁止点击
      return new Date(date).getTime() < _nowTime;
    },
  },
  {
    name: "时间(date)",
    key: "time",
    value: [],
    placeholder: "请选择时间",
    disabled: false,
    formType: "datePicker",
    type: "datetimerange",
    span: 24,
    startPlaceholder: "开始时间",
    endPlaceholder: "结束时间",
    labelWidth: "5em",
    isClearable: true,
    rules: [{ required: true, message: "请选择开始时间", trigger: "blur" }],
    disabledDate: (date, value) => {
      // console.log(date);
      // console.log(value);

      let daysTime = 12 * 24 * 60 * 60 * 1000;
      if (value?.length > 0 && value[0]) {
        // console.log('选项',dayjs(dayjs(date).format('YYYY-MM-DD')).valueOf())
        // console.log('当前',dayjs(dayjs(value[0]).format('YYYY-MM-DD')).valueOf())

        let itemData = dayjs(dayjs(date).format("YYYY-MM-DD")).valueOf();
        let currentData = dayjs(dayjs(value[0]).format("YYYY-MM-DD")).valueOf();

        if (!value[1]) {
          // 选项里的的时间戳 和 第一个选中的值 比较
          // 只能选 12天以内的
          return Math.abs(itemData - currentData) > daysTime;
        }
      }
    },
  },
  {
    labelWidth: "0",
    formType: "divider",
  },
  {
    formType: "tag",
    value: `1.test   2.123123`,
  },

  {
    formType: "tag",
    isHtml: true,
    value: `1.test
            2.123123
    `,
  },

  {
    labelWidth: "0",
    formType: "divider",
    value: "",
    marginBottom: 0,
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