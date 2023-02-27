<!--
  author: 戴伟
  date: 019 2022/12/19 09:14:02
  file: src\example\dialog\index.vue
  des:
    do.....
-->

<template>

  <div>
    <el-button @click="goTo('show')">123123</el-button>
  </div>

  <d-el-dialog
    v-model="isShow"
    :before-close="(done)=>goTo('cancel')"
    :title="dialogInfo.title"
  >
    <template #header>
      头部
    </template>
    <d-el-switch v-model="switchData" ></d-el-switch>
    <d-form-model
      class="dialog-form"
      ref="addEditFormRef"
      :statusIcon="true"
      labelWidth="8em"
      :formList="formList"
      :buttonList="buttonList"
      :isButtonsRow="true"
      labelPosition="top"
      @onClick="(data)=>goTo('onclick', data)"
      @onChange="(data) => { goTo('onChange', data) }"
      @onFormItemButtonClick="(data)=>{goTo('onFormItemButtonClick', data)}"

    >

    </d-form-model>

    <template #footer >
      <el-button
        @click="goTo('cancel')">
        取消
      </el-button>
      <el-button
        type="primary"
        @click="goTo('confirm', '')"
      >确定
      </el-button>
    </template>
  </d-el-dialog>
</template>

<script setup>
import dayjs
  from "dayjs";

defineOptions({
  name: "弹窗dialog",
  key: 'example-dialog',
  isExposed: false
});
import {
  ref,
  reactive,
  computed,
  watch,
  h
} from "vue"
import formModel
  from "@/components/formModel";

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
const addEditFormRef = ref();
const switchData = ref('');
const isShow = ref(false)
const dialogInfo = reactive({
  title: '标题'
})
const buttonList = ref([
  {name: "重置", key: "reset",},
  {name: "查询", key: "search", type: 'primary'}

])
const formList = ref([
  {
    name: "开关", key: "number", value: "123", placeholder: "数字", disabled: false,
    formType: "switch",
    span: 12,
    rules: [{required: true, message: "请输入数字", trigger: "blur"}],
  },
  {
    name: "数字", key: "numbersss", value: '0asdasd', placeholder: "数字", disabled: false,
    formType: "inputNumber",
    controls: false,
    textAlign: "left",
    clearable:true,
    unit:"次/分",
    min: 0,
    max:"",
    span: 12,
    rules: [{required: true, message: "请输入数字", trigger: "blur"}],
  },
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
    name: "表达式", key: "cron", value: "", formType: "cron", placeholder: "请输入", disabled: false, span: 18,
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

])
const formListTem = JSON.parse(JSON.stringify(formList.value))
console.log('formList',formList.value)
watch(()=>isShow.value,(isShow,preIsShow)=>{
  console.log(isShow);
  if(isShow){
    // formList.value = [];
    // formList.value = JSON.parse(JSON.stringify(formListTem))
    // console.log(formList.value)
  }

})



const goTo = (key,data)=>{
  if (key == 'show'){
    isShow.value = true;
  }
  if(key == 'cancel'){
    addEditFormRef.value.formModelRef.clearValidate();

    isShow.value = false;
  }
  if (key == 'cancel') {
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
  if(key == 'scroll'){
    console.log()
    console.log(addEditFormRef.value.scrollToField([55,'value'].join('.')))

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
.dialog-form{
  max-height:60vh;
  overflow: hidden;
  overflow-y: scroll;
}
</style>