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
      :isButtonsRow="isButtonsRow"
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
  isButtonsRow:{
    type:Boolean,
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
      // console.log(item)
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
  // console.log('getFormData', _formList.value);
  let _list = JSON.parse(JSON.stringify(_formList.value))
  _list = _list?.length > 0 ? _list : [];
  let _data = getFormKeyData(_list);
  return _data;
}

const getFormKeyDataByNoHidden = (list, dataList) => {
  // console.log(list)
  let _data = {}
  list?.map(item => {
    if (item.key) {
      // console.log(item)
      if(!item.isHidden){
        _data[item.key] = item.value;
      }
    }
    let _childrenData = {};
    if (item.children?.length > 0) {
      _childrenData = getFormKeyDataByNoHidden(item.children)
      // console.log('_childrenDataList',_childrenDataList)
      _data = {..._data, ..._childrenData}
    }
  })
  return _data
}
const getFormDataByNoHidden = () => {
  // console.log('getFormData', _formList.value);
  let _list = JSON.parse(JSON.stringify(_formList.value))
  _list = _list?.length > 0 ? _list : [];
  let _data = getFormKeyDataByNoHidden(_list);
  return _data;
}
defineExpose({
  formModelRef,
  getFormData,
  getFormDataByNoHidden
})

const formModelClassCOM = computed(() => {

  // console.log('props.isHiddenItemMarginBottom',props.isHiddenItemMarginBottom)

  return {
    'hiddenItemMarginBottom': props.isHiddenItemMarginBottom,
  }

})



const linkageKeyValue = {}

const setlLinkageKeyValue = ()=>{

}


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

  console.log('_com-list',_list)






  return _list
})





watch(
  () => props.formList, (formList, preFormList) => {
    // console.log('formList', formList);
    //console.log('oldValue', oldValue);
    // defaultActive = newValue.path;
    // _formModel.value = formList?.length > 0 ? formList : [];
    // setFormList(props.formList);
    // console.log('formModelRef', formModelRef.value);
    // nextTick(() => {
    //   // formModelRef?.value?.clearValidate();
    //   // formModelRef.value.validate(()=>{});
    // })
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













