<!--
  author: 戴伟
  date: 017 2022/11/17 16:04:54
  file: src\components\formModel\index.vue
  des:
    do.....
-->


<template>
  <!--  <d-el-config-provider   >-->
  <el-form
    :label-position="labelPosition" :model="_formList" ref="formModelRef" class="d-form-model"
    :class="formModelClassCOM"
    :label-width="labelWidth"
    :status-icon="statusIcon"
    @submit.prevent="(data)=>goTo('submit',data)"
    :scroll-to-error="scrollToError"
  >
    <d-el-form-list
      :formModelRef="formModelRef"
      :formList="_formList"
      :buttonList="buttonList"
      @onChange="(data) => goTo('onChange', data)"
      @submit="(data)=>goTo('submit', {...data})"
      @onFormItemButtonClick="(data)=>goTo('onFormItemButtonClick', data)"
    >

      <template v-for="(item, index) in slotListCOM()" :key="index" #[item.name]="data">
        <slot :name="item.name" :data="data.data"></slot>
      </template>

    </d-el-form-list>

    <!--    <el-row :gutter="20">-->
    <!--      <template v-for="(item, index) in _formModel" :key="index">-->
    <!--        <template v-if="!item.isHidden" :key="Symbol()">-->
    <!--          <el-col :span="item.span" :class="{ 'fixedWidth': item.width >= 0 }" :style="{ width: item.width + 'px' }">-->
    <!--            <d-el-form-item :formModelRef="formModelRef" :item="item" :index="index" :prop="[index]" :buttonProp="[index]"-->
    <!--                       :onChangeProp="[index]" @onChange="(data) => goTo('onChange', data)"-->
    <!--                       @onFormItemButtonClick="(data) => { goTo(data.key, data) }">-->
    <!--              <template v-for="(item, index) in slotListCOM()" :key="index" #[item.name]="data">-->
    <!--                <slot :name="item.name" :data="data.data"></slot>-->
    <!--              </template>-->
    <!--            </d-el-form-item>-->
    <!--          </el-col>-->
    <!--        </template>-->
    <!--      </template>-->


    <!--    </el-row>-->
  </el-form>
  <!--  </d-el-config-provider>-->
</template>

<script setup>

defineOptions({
  name: 'd-form-model',
  isExposed: false
});
import {ref, reactive, computed, watch, nextTick, useSlots, useAttrs, onMounted, onBeforeUpdate, inject} from "vue"
// import "dayjs/locale/zh-cn";


let slots = useSlots()
const slotListCOM = computed(() => {
  return () => {
    // const slots1 = useSlots()
    // console.log(slots )
    let _slots = [];
    // console.log('slots1', slots1, Object.keys(slots1))
    // console.log('useSlots', slots, Object.keys(slots))
    _slots = Object.keys(slots) || [];
    _slots = _slots?.map(item => {
      return {
        name: item,
      }
    })
    return _slots
  }
})

const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String, Boolean],
  },
  formList: {
    type: [Array],
  },
  buttonList: {
    type: [Array],
  },
  statusIcon: {
    type: [Boolean]
  },
  scrollToError: {
    type: [Boolean],
    default: false,
  },
  labelWidth: {
    type: [String, Number],
    default: () => {
      return '5em'
    }
  },
  labelPosition: {
    type: [String, Boolean, 'right', 'top', 'left'],
    default: 'right'
  },
  isHiddenItemMarginBottom: {
    type: [Boolean]
  }
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(['onClick', 'onFormItemButtonClick', 'onChange']);
const formModelRef = ref()
const getFormKeyData = (list, dataList) => {
  // console.log(list)
  let _data = {}
  list?.map(item => {
    if (item.key) {
      console.log(item.key)
      _data[item.key] = item.value;
    }
    let _childrenData = {};
    if (item.children?.length > 0) {
      _childrenData = getFormKeyData(item.children)
      // console.log('_childrenDataList',_childrenDataList)
      _data = {..._data, ..._childrenData}
    }
  })
  return _data
}

const getFormData = () => {

  console.log('getFormData', _formList.value);
  let _list = JSON.parse(JSON.stringify(_formList.value))
  _list = _list?.length > 0 ? _list : [];
  // console.log(_list);
  let _data = getFormKeyData(_list);
  console.log('_data', _data)
  // _data = JSON.parse(JSON.stringify(_data))
  return _data;
}
defineExpose({
  formModelRef,
  getFormData
})

const formModelClassCOM = computed(() => {

  // console.log('props.isHiddenItemMarginBottom',props.isHiddenItemMarginBottom)

  return {
    'hiddenItemMarginBottom': props.isHiddenItemMarginBottom,
  }

})


const _formModel = ref([
    {name: "设备名称", key: "deviceName", value: "", placeholder: "请输入设备名称", disabled: true, formType: "input", span: 12},
    {name: "设备类型", key: "deviceType", value: "", placeholder: "请输入设备类型", disabled: true, formType: "input", span: 12},
    {name: "设备ID", key: "deviceId", value: "", placeholder: "请输入设备ID", disabled: true, formType: "input", span: 12},
    {name: "品牌", key: "brand", value: "", placeholder: "请输入品牌", disabled: true, formType: "input", span: 12},
    {name: "型号", key: "type", value: "", placeholder: "请输入型号", disabled: true, formType: "input", span: 12},
    // [
    //   {name: "规格", key: "attr", formType: "input", span: 12},
    //
    // ],
    {name: "所属网关", key: "gateway", value: "", placeholder: "请输入所属网关", disabled: true, formType: "input", span: 12},
    {
      name: "通讯类型",
      key: "communicationType",
      value: "",
      placeholder: "请输入通讯类型",
      disabled: true,
      formType: "input",
      span: 12
    },
    {name: "当前值", key: "currentValue", value: "", placeholder: "请输入当前值", disabled: true, formType: "input", span: 12},
    {name: "预警值", key: "earlyValue", value: "", placeholder: "请输入预警值", disabled: true, formType: "input", span: 12},
    {
      name: "预警等级", key: "earlyLevel", value: "", placeholder: "请输入预警等级", disabled: true, formType: "select", span: 12,
      options: [],
    },
    {
      name: "处理人", key: "handleBy", value: "", placeholder: "请选择处理人", disabled: false, formType: "select", span: 12,
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
      span: 24
    },
  ]
)

const setFormList = (list) => {
  list?.map(item => {
    if (item.formType == "inputNumber") {
      // console.log(item);

      if (item.value) {
        item.value = Number(item.value)
      } else {
        item.value = undefined;
      }
    }
    if (item.children?.length > 0) {
      setFormList(item.children);
    }
  })
}


const _formList = computed(() => {
  let _list = props?.formList?.length > 0 ? props.formList : [];
  setFormList(_list);
  return _list
})


watch(
  () => props.formList, (formList, preFormList) => {
    // console.log('formList', formList);
    //console.log('oldValue', oldValue);
    // defaultActive = newValue.path;
    _formModel.value = formList?.length > 0 ? formList : [];
    setFormList(props.formList);
    console.log('formModelRef', formModelRef.value);
    nextTick(() => {
      // formModelRef?.value?.clearValidate();
      // formModelRef.value.validate(()=>{});
    })
  },
  {
    immediate: false,
    deep: true
  }
);


// getFormData()

// section goTo
const goTo = (key, data) => {
  // console.log('formModel', key, data);
  data = JSON.parse(JSON.stringify(data));
  if (key == 'onFormItemButtonClick') {
    emits('onFormItemButtonClick', {...data})
  }
  if (key == 'onChange') {

    let _prop = [...data.prop, 'value'].join('.');
    console.log('_prop', _prop);
    setTimeout(() => {
      formModelRef.value?.validateField(_prop, () => null)

    }, 300)


    emits('onChange', {...data})
  }
  if (key == 'submit') {
    console.log(key, data);
    emits('onClick', {...data})

  }
}

const onSubmit = (data) => {
  emits('onClick', {key: data.key, data,})
}

// 接口请求方法放这
const init = () => {
  //getList();
}

// 统一执行初始化方法
init();
</script>

<style scoped lang="less">

.el-form {
  &.hiddenItemMarginBottom {
    :deep(.el-form-item) {
      margin-bottom: 0;
    }
  }
}

//.form-item {
//  &.br {
//    margin-bottom: 0;
//  }
//
//
//
//  .form-select {
//    width: auto;
//    flex: 1;
//  }
//
//  .form-time-select {
//    width: auto;
//    flex: 1;
//  }
//
//  :deep(.form-time-picker) {
//    width: auto;
//    flex: 1;
//  }
//
//  .form-input {
//    width: auto;
//    flex: 1;
//  }
//
//  :deep(.form-date-picker) {
//    width: auto;
//    flex: 1;
//  }
//
//  :deep(.el-date-editor .el-range-separator) {
//    flex: unset;
//  }
//
//  :deep(.el-range-editor .el-range-input) {
//    flex: 1;
//    padding: 0 5px;
//  }
//}


.el-col.fixedWidth {
  max-width: unset;
  flex: unset;
}

/* .demo-form-inline {
  padding: 16px 27px 10px 35px;

} */
</style>













