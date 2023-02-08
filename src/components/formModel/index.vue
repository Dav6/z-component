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
import {JSONPath} from "jsonpath-plus";


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
    type: [String,Number, Boolean],
  },
  formList: {
    type: [Array],
  },
  buttonList: {
    type: [Array],
  },
  isButtonsRow: {
    type: Boolean,
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

const getFormData = () => {
  // console.log('getFormData', _formList.value);
  let _list = JSON.parse(JSON.stringify(_formList.value))
  _list = _list?.length > 0 ? _list : [];
  let _path = `$..[?(@.key)][key,value]`
  let _dataList = JSONPath({json: _list, path: _path});
  let _data = {}
  _dataList.map((item, index) => {
    if (index % 2 == 0) {
      _data[item] = _dataList[index + 1];
    }
  })
  // let _data = getFormKeyData(_list);
  return _data;
}

const getFormDataByNoHidden = () => {
  // console.log('getFormData', _formList.value);
  let _list = JSON.parse(JSON.stringify(_formList.value))
  _list = _list?.length > 0 ? _list : [];

  let _path = `$..[?(@.key && !@.isHidden)][key,value]`
  let _dataList = JSONPath({json: _list, path: _path});
  // console.log(_dataList)
  let _data = {}
  _dataList.map((item, index) => {
    if (index % 2 == 0) {
      _data[item] = _dataList[index + 1];
    }
  })
  return _data;
}

const clearValidate = () => {
  return formModelRef.value.clearValidate()
}
const validate = (callback) => {
  return formModelRef.value.validate((valid, invalidFields) => callback(valid, invalidFields))
}

defineExpose({
  formModelRef,
  clearValidate,
  validate,
  getFormData,
  getFormDataByNoHidden
})

const formModelClassCOM = computed(() => {

  // console.log('props.isHiddenItemMarginBottom',props.isHiddenItemMarginBottom)

  return {
    'hiddenItemMarginBottom': props.isHiddenItemMarginBottom,
  }

})









// section computed formList
const _formList = computed(() => {
  let _list = props?.formList?.length > 0 ? props.formList : [];
  console.log('_list',_list)

  try {

  }catch(e) {
    console.log(e)
  }


  // setFormList(_list);
  console.log('_com-list', _list)


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

    setLinkageForm();

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


const setLinkageForm = () => {
  let _list = props?.formList?.length > 0 ? props.formList : [];
  let _linkageListPath = `$..[?(@.linkageKey)][linkageKey,linkageValue]`
  // let _linkageList1 = JSONPath({json:_list,path: _linkageListPath});
  // console.log('_linkageList',_linkageList1)
  // return false;
  let _linkageList = JSONPath({json: _list, path: _linkageListPath});
  console.log('_linkageList', _linkageList)

  _linkageList = _linkageList.map((item, index) => {
    if (index % 2 == 0) {

      return {
        key: item,
        value: _linkageList[index + 1]
      }
      // linkageList.value.push({
      //   key: item,
      //   value: _linkageList[index + 1]
      // })
    }
  }).filter(item => item )
  console.log('_linkageList', _linkageList)

  _linkageList?.map(item => {
    let _linkageKey = item?.key;
    let _linkageValue = item?.value
    let _path = `$..[?(@ && @.key == '${_linkageKey}')]`
    let _formItem = JSONPath({
      json: _list, path: _path, otherTypeCallback(ms){
        console.log(ms)
      }
    });
    console.log('_formItem', _formItem);
    let _linkagePath = `$..[?(@.linkageKey == '${_linkageKey}')]`
    let _linkageFormItem = JSONPath({json: _list, path: _linkagePath});
    console.log('_linkageFormItem', _linkageFormItem);
    let _linkageFormItemIsHidden = false;

    if (_formItem[0]['value'] || _formItem[0]['value'] === 0) {
      console.log('有值')
      _linkageFormItemIsHidden = false;
      if (_linkageValue || _linkageValue === 0) {
        if (_linkageValue == _formItem[0]['value']) {

        } else {
          _linkageFormItemIsHidden = true;
        }
      }

    } else {
      console.log('无值')
      _linkageFormItemIsHidden = true;
    }
    _linkageFormItem[0].isHidden = _linkageFormItemIsHidden
  })

}



// 接口请求方法放这
const init = () => {
  setLinkageForm();

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













