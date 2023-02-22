<!--
  author: 戴伟
  date: 017 2022/11/17 16:10:52
  file: src\example\formModal\index.vue
  des:
    do.....
-->

<template>
  <div class="form-model">
    <d-el-radio v-model="test" :item="{option:[{value:1,label:'lable'}]}" ></d-el-radio>

    <d-form-model

      ref="addEditFormRef"
      :statusIcon="true"
      labelWidth="8em"
      :formList="formList"
      :buttonList="buttonList"
      :isButtonsRow="true"
      labelPosition="top"
      @onclick="(data)=>goTo('onclick', data)"
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

    <el-affix position="bottom" :offset="30">
      <el-button @click="goTo('cancel')">清空</el-button>
      <el-button type="primary" @click="goTo('confirm')">确定</el-button>

    </el-affix>

  </div>
</template>

<script setup>
import dayjs from "dayjs";
defineOptions({
  name: "表单案例",
  key: 'example-form-model',
  isExposed: false
});
import {ref,h, reactive, computed, watch, inject} from "vue"

console.log(h)
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
const formList = ref([
  {
    name: "名称", key: "name", value: "", formType: "input", placeholder: "请输入", disabled: false, span: 12,
    rules: [{required: true, message: "请输入", trigger: "blur"}],
    clearable: true,
    formClass:"form-input-item",
    prepend(){
      return h('span','222')
    },
    append(){
      return h("div",'222');
    }
  },
  {
    name: "表达式", key: "cron", value: "", formType: "cron", placeholder: "请输入", disabled: false, span: 12,
    rules: [{required: true, message: "请输入", trigger: "blur"}],
    formClass:"form-cron-item",

    clearable: true,
  },

  {
    name: "图片上传",
    key: "image",
    formClass:"form-image-item",
    // limit: 1,
    disabled: false,
    formType: "imageVideoUpload",
    span: 20,
    value: [],
    accept: "image/jpeg,image/jpg",
    previewTeleported: true,
    rules: [{required: true, message: "请上传图片", trigger: "blur"}],
  },


  {
    formType: "divider",
    span: 24,
    value: "asdsad",
  },

  {
    name: "名称", key: "name", value: "", formType: "input", placeholder: "请输入", disabled: false, span: 12,
    rules: [{required: true, message: "请输入", trigger: "blur"}],
    clearable: true,
    formClass:"form-input-item",
    buttonList: [
      {name: "参数", icon: "Plus", key: "add", isText: true,class:'123123 5i3984'},
      {name: "", icon: "Plus", key: "add", isText: true,class:['ccc','sss']},
      {name: "", icon: "Minus", key: "delete", type: "danger", isText: false,class:{is:true,test:false}},
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
    span: 12,
    rules: [{required: true, message: "请输入文本内容", trigger: "blur"}],
    marginBottom: "",
  },
  {
    formType: "divider",
    span: 24,
  },
  {
    name: "数字", key: "number", value: "", placeholder: "数字", disabled: false,
    formType: "inputNumber",
    controls: false,
    textAlign: "left",
    min: 0,
    span: 12,
    rules: [{required: true,type: "number",message: "请输入数字", trigger: "blur"}],
  },
  {
    formType: "divider",
    span: 24,
  },
  {
    name: "多选项",
    key: "checkbox",
    value: '',
    placeholder: "请选择选项",
    disabled: false,
    formType: "checkbox",
    span: 12,
    rules: [{required: true, message: "请选择选项", trigger: "blur"}],
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

  {
    formType: "divider",
    span: 24,
  },
  {
    name: "多选项",
    key: "checkbox",
    value: [2,3],
    placeholder: "请选择选项",
    disabled: false,
    isRadioBorder:true,
    formType: "checkbox",
    span: 12,
    rules: [{required: true, message: "请选择选项", trigger: "blur"}],
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
  {
    name: "单选项",
    key: "radio",
    value: '',
    placeholder: "请选择选项",
    disabled: false,
    formType: "radio",
    span: 12,
    rules: [{required: true, message: "请选择选项", trigger: "blur"}],
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
  {
    formType: "divider",
    span: 24,
  },
  {
    name: "单选项",
    key: "radio",
    value: '',
    placeholder: "请选择选项",
    disabled: false,
    formType: "radio",
    isRadioBorder: true,
    span: 12,
    rules: [{required: true, message: "请选择选项", trigger: "blur"}],
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
  {
    formType: "divider",
    span: 24,
  },
  {
    name: "单选项",
    key: "radio",
    value: '',
    placeholder: "请选择选项",
    disabled: false,
    formType: "radio",
    isRadioButton: true,
    span: 12,
    rules: [{required: true, message: "请选择选项", trigger: "blur"}],
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
    span: 12,
    rules: [{required: true, message: "请选择", trigger: "blur"}],

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
    span: 12,
    rules: [{required: true, message: "请选择", trigger: "blur"}],
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
    ]
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
    span: 12,
    rules: [{required: true, message: "请选择", trigger: "blur"}],
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
    span: 12,
    rules: [{required: true, message: "请选择", trigger: "blur"}],
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
            children: []
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
        ]
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
    span: 12,
    rules: [{required: true, message: "请选择", trigger: "blur"}],
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
            children: []
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
        ]
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
    span: 12,
    rules: [{required: true, message: "请选择", trigger: "blur"}],
    clearable: true,
    options: [
      {
        label: "选项1",
        value: 1,
        children: [
          {
            label: "选项1",
            value: 1.1,
            children: []
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
        ]
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
  {formType: "divider", span: 24},
  {
    name: "时间（time)",
    key: "timePicker",
    formType: "timePicker",
    placeholder: "请选择",
    span: 12,
    rules: [{required: true, message: "请选择", trigger: "blur"}],
  },
  {formType: "divider", span: 24},

  {
    name: "时间(date)",
    key: "date",
    value: "",
    placeholder: "请选择开始时间",
    disabled: false,
    formType: "datePicker",
    type: "date",
    span: 12,
    rules: [{required: true, message: "请选择开始时间", trigger: "blur"}],
    disabledDate: (date) => {

      let _nowTime = dayjs().subtract(24, 'hour').valueOf()
      // 选项里的的时间戳 和 今天的时间戳  比较
      // 小于今天的禁止点击
      return new Date(date).getTime() < _nowTime;
    }
  },
  {formType: "divider", span: 24},

  {
    name: "时间(date)",
    key: "time",
    value: "",
    placeholder: "请选择开始时间",
    disabled: false,
    formType: "datePicker",
    type: "datetime",
    span: 12,
    rules: [{required: true, message: "请选择开始时间", trigger: "blur"}],
    disabledDate: (date) => {
      let _nowTime = dayjs().subtract(24, 'hour').valueOf()
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
    span: 12,
    startPlaceholder: "开始时间",
    endPlaceholder: "结束时间",
    labelWidth: "5em",
    isClearable: true,
    rules: [{required: true, message: "请选择开始时间", trigger: "blur"}],

    disabledDate: (date, value) => {
      // console.log(date);
      // console.log(value);

      let daysTime = 12 * 24 * 60 * 60 * 1000
      if (value?.length > 0 && value[0]) {

        // console.log('选项',dayjs(dayjs(date).format('YYYY-MM-DD')).valueOf())
        // console.log('当前',dayjs(dayjs(value[0]).format('YYYY-MM-DD')).valueOf())

        let itemData = dayjs(dayjs(date).format('YYYY-MM-DD')).valueOf();
        let currentData = dayjs(dayjs(value[0]).format('YYYY-MM-DD')).valueOf();

        if (!value[1]) {
          // 选项里的的时间戳 和 第一个选中的值 比较
          // 只能选 12天以内的
          return Math.abs((itemData - currentData)) > daysTime;
        }

      }

    }
  },
  {
    labelWidth: '0',
    formType: "divider",
  },
  {
    formType: "tag",
    value: `1.test   2.123123`
    ,
  },

  {
    formType: "tag",
    isHtml: true,
    value: `1.test
            2.123123
    `
    ,
  },

  {
    labelWidth: '0',
    formType: "divider",
    value: "",
    marginBottom: 0,
  },


  {
    labelWidth: '0',
    formType: "divider",
    value: "复杂嵌套1"
  },
  {
    name: "层级1", key: "layer1", value: "", placeholder: "层级1", disabled: false, formType: "",
    rules: [{required: true, message: "", trigger: "blur"}],
    span: 24,
    ownSpan: 24,
    width: "110",
    childrenSpan: 24,
    children: [
      {
        labelWidth: '0em',
        name: "", key: "layer11", value: "", placeholder: "层级1-1", disabled: false, formType: "", span: 24,
        // rules: [{required: true, message: "请输入", trigger: "blur"}],
        ownSpan: 0,
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
            rules: [{required: true, message: "请输入", trigger: "blur"}],
          },
        ]
      },
      {
        labelWidth: '8em',
        // width: "600",
        name: "层级1-2", key: "layer12", value: "", placeholder: "层级1-2", disabled: false, formType: "input", span: 12,
        rules: [{required: true, message: "请输入", trigger: "blur"}],
        childrenSpan: 24,
        isChildrenBr: true,
        children: [
          {
            labelWidth: '8em',
            name: "层级1-2-1",
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
            name: "层级1-2-1",
            key: "layer111",
            value: "",
            placeholder: "层级1-1-1",
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
        name: "层级1-2", key: "layer12", value: "", placeholder: "层级1-2", disabled: false, formType: "input", span: 24,
        rules: [{required: true, message: "请输入", trigger: "blur"}],
      },
    ]
  },
  {
    labelWidth: '0',
    formType: "divider",
  },

  {
    name: "时间",
    key: "time",
    value: "",
    placeholder: "请选择开始时间",
    disabled: false,
    formType: "datePicker",
    dateType: "date",
    span: 12,
    rules: [{required: true, message: "请选择开始时间", trigger: "blur"}],
    disabledDate: (date) => {

      let _nowTime = dayjs().subtract(24, 'hour').valueOf()
      // 选项里的的时间戳 和 今天的时间戳  比较
      // 小于今天的禁止点击
      return new Date(date).getTime() < _nowTime;
    }
  },
  {
    name: "时间",
    key: "time1",
    value: "",
    placeholder: "请选择开始时间",
    disabled: false,
    formType: "datePicker",
    dateType: "datetime",
    span: 12,
    rules: [{required: true, message: "请选择开始时间", trigger: "blur"}],
    disabledDate: (date) => {

      let _nowTime = dayjs().subtract(24, 'hour').valueOf()
      // 选项里的的时间戳 和 今天的时间戳  比较
      // 小于今天的禁止点击
      return new Date(date).getTime() < _nowTime;
    },
  },
  {
    name: "文本内容",
    key: "textArea",
    value: "",
    placeholder: "请输入文本内容",
    disabled: false,
    formType: "textArea",
    span: 24,
    rules: [{required: true, message: "请输入文本内容", trigger: "blur"}],
    marginBottom: "",
  },


  {
    formType: "divider",
    span: 24,

  },

  {
    name: "自定义",
    key: "test",
    value: 123123,
    placeholder: "请输入内容",
    formType: "custom",
    customName: "test",
    span: 24,
  },
  {
    name: "test1",
    key: "test1",
    value: 123123,
    placeholder: "请输入内容",
    formType: "custom",
    customName: "test1",
    span: 12,
  },
  {
    name: "选项",
    key: "options",
    value: [],
    placeholder: "请选择",
    disabled: false,
    formType: "select",
    span: 12,
    rules: [{required: true, message: "请选择", trigger: "blur"}],
    multiple: true,
    collapseTags: true,
    collapseTagsTooltip: true,

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
  {
    name: "数字", key: "number", value: "", placeholder: "数字", disabled: false,
    formType: "inputNumber",
    controls: false,
    textAlign: "left",
    min: 0,
    span: 12,
    rules: [{required: true, message: "请输入数字", trigger: "blur"}],
  },
  {
    formType: "tag",
    value: `
            1.test
            2.123123

    `
    ,
  },
  {
    name: "test",
    key: "test",
    value: 123123,
    placeholder: "请输入内容",
    formType: "custom",
    customName: "test",
    span: 24,
  },

])


const addEditFormRef = ref(null);
const goTo = (key, data) => {
  console.log('example-formModel', key, data,formList.value);
  if (key == 'cancel') {
    addEditFormRef.value.formModelRef.clearValidate();
  }
  if (key == 'confirm') {

    console.log(addEditFormRef.value.getFormDataByNoHidden())
    console.log(addEditFormRef.value.getFormData())
    addEditFormRef.value.formModelRef.validate((valid) => {
      console.log(valid)
      if (valid) {

      }
    })


  }
  if(key == 'onclick'){
    console.log(data);
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