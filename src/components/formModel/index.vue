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
    :label-position="labelPosition"
    :model="_formList"
    ref="formModelRef"
    class="d-form-model"
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

      <template
        v-for="(item, index) in slotListCOM()"
        :key="index"
        #[item.name]="data">
        <slot
          :name="item.name"
          :data="data.data"></slot>
      </template>

    </d-el-form-list>

  </el-form>
  <!--  </d-el-config-provider>-->
</template>

<script setup>

defineOptions({
  name: 'd-form-model',
  isExposed: false
});
import {
  ref,
  reactive,
  computed,
  watch,
  nextTick,
  useSlots,
  useAttrs,
  onMounted,
  onBeforeUpdate,
  inject
} from "vue"
// import "dayjs/locale/zh-cn";
import {
  JSONPath
} from "jsonpath-plus";


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
    type: [String, Number, Boolean],
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
  let _path = `$..[?(!@path.match(/buttonList/g) && @ && @.key )]`
  let _dataList = JSONPath({
    json: _list,
    path: _path
  });
  // console.log('_dataList',_dataList)


  let _data = {}
  _dataList.map((item, index) => {
    _data[item?.key] = item?.value;
  })
  // let _data = getFormKeyData(_list);
  return _data;
}

const getFormDataByNoHidden = () => {
  // console.log('getFormData', _formList.value);
  let _list = JSON.parse(JSON.stringify(_formList.value))
  _list = _list?.length > 0 ? _list : [];

  let _path = `$..[?(!@path.match(/buttonList/g) && @ && @.key && !@.isHidden)]`
  let _dataList = JSONPath({
    json: _list,
    path: _path
  });
  // console.log(_dataList)


  let _data = {}
  _dataList.map((item, index) => {
    _data[item?.key] = item?.value;

  })
  return _data;
}


const formModelClassCOM = computed(() => {
  // console.log('props.isHiddenItemMarginBottom',props.isHiddenItemMarginBottom)
  return {
    'hiddenItemMarginBottom': props.isHiddenItemMarginBottom,
  }

})


// section computed formList
const _formList = computed(() => {
  let _list = props?.formList?.length > 0 ? props.formList : [];
  // console.log('_list', _list)


  // setFormList(_list);
  // console.log('_com-list', _list)


  return _list
})


// watch(
//   () => props.formList, (formList, preFormList) => {
//     // console.log('formList', formList);
//     // setTimeout(() => {
//     //   setLinkageForm();
//     //
//     // },0)
//     //console.log('oldValue', oldValue);
//     // defaultActive = newValue.path;
//     // _formModel.value = formList?.length > 0 ? formList : [];
//     // setFormList(props.formList);
//     // console.log('formModelRef', formModelRef.value);
//     // nextTick(() => {
//     //   // formModelRef?.value?.clearValidate();
//     //   // formModelRef.value.validate(()=>{});
//     // })
//   },
//   {
//     immediate: false,
//     deep: true
//   }
// );


// getFormData()

// section goTo
const goTo = (key, data) => {
  console.log('formModel', key, data);
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
    setTimeout(()=>{
      setLinkageForm();
    },0)


    emits('onChange', {...data})
  }
  if (key == 'submit') {
    console.log(key, data);
    emits('onClick', {...data})

  }
}

const onSubmit = (data) => {
  emits('onClick', {
    key: data.key,
    data,
  })
}

// section set
const setLinkageForm = () => {
  let _list = props?.formList?.length > 0 ? props.formList : [];
  console.log('_list', _list);
  let _linkageListPath = `$..linkageKey^`
  // let _linkageList1 = JSONPath({json:_list,path: _linkageListPath});

  let _linkageList = JSONPath({
    json: _list,
    path: _linkageListPath
  });
  console.log('_linkageList', _linkageList)


  _linkageList = _linkageList.map(item => item?.linkageKey || "").filter(item => item)
  let _linkageListSet = new Set(_linkageList);

  //  特殊的联动key 单独处理,  查找他的上一个 ，
  //  如设置的item 在 位置 5 , 那就判断上一个 4的 item 的值
  if(_linkageListSet.has('prev')){
    let _prevLinkagePath = `$..[?(@ && @.linkageKey == 'prev')]`
    let _prevLinkageFormList = JSONPath({
      json: _list,
      path: _prevLinkagePath,
      resultType: 'all'
    });
    _prevLinkageFormList?.map(item => {
      console.log('_prevLinkageFormItemAll', item)
      let _item = item;
      let _prevLinkageFormItem = _item.value;
      let _prevLinkageValue = _prevLinkageFormItem.linkageValue;

      let _path = _item.path;
      let _pathArray = JSONPath.toPathArray(_path);
      let _prevIndex = _pathArray?.[_pathArray?.length-1];
      _pathArray[_pathArray.length-1] = String(_prevIndex - 1);
      let _prevPath = _pathArray
      let _prevFormItem = JSONPath({ json: _list,  path: _prevPath ,wrap:false });
      console.log('_prevFormItem',_prevFormItem);
      let _prevLinkageFormItemIsHidden = false;
      if(_prevFormItem){
        console.log('_prevLinkageFormItem',_prevLinkageFormItem);
        let _prevFormValue = _prevFormItem?.value;
        //  判断当前联动key对应的formItem的值 是否为空
        // 存在显示当前 linkageKey 的formItem ,不存在就隐藏

        if(_prevFormValue || _prevFormValue == 0){
          // console.log('有值')
          // 判断当前的值是不是数组
          if(Array.isArray(_prevFormValue)){
            // 数组为空就隐藏，不为空就系那是
            if(_prevFormValue?.length>0){
              let _arr1 = _prevFormValue;
              let _arr2 = _prevLinkageValue
              // 判断当前 linkageKey 的formItem的 _linkageValue 是否为数组
              // 判断是否和联动key对应的formItem的值有交集
              // 有就显示, 无就隐藏
              if(Array.isArray(_arr2)){
                const filteredArray = _arr1.filter(value => _arr2.includes(value));
                if(filteredArray?.length>0){

                }else{
                  _prevLinkageFormItemIsHidden = true;
                }
              }else{
                //  不是就套层数组
                //  判断是否和联动key对应的formItem的值有交集
                //  有就显示, 无就隐藏
                if(_arr2 || _arr2 == 0){
                  _arr2 = [_arr2];
                  const filteredArray = _arr1.filter(value => _arr2.includes(value));
                  if(filteredArray?.length>0){

                  }else{
                    _prevLinkageFormItemIsHidden = true;
                  }
                }
              }

            }else{
              _prevLinkageFormItemIsHidden = true;
            }


          }else{
            // 判断当前 linkageKey 的formItem的 _linkageValue 是否有
            //  有就和当前联动key对应的formItem的值 比较，相同就显示 ，不相同就隐藏
            if(_prevLinkageValue || _prevLinkageValue == 0){
              if(_prevLinkageValue != _prevFormValue){
                _prevLinkageFormItemIsHidden = true;
              }
            }
          }

        }else{
          // console.log('无值')
          _prevLinkageFormItemIsHidden = true;
        }


      }
      _item.value.isHidden = _prevLinkageFormItemIsHidden


    })

  }

  _linkageListSet.delete('prev')
  _linkageList = [..._linkageListSet]
  console.log('_linkageList', _linkageList)

  _linkageList?.map(item => {
    let _linkageKey = item;

    //  获取联动key对应的formItem
    let _path = `$..[?(@ && @.key == '${_linkageKey}')]`
    let _formItem = JSONPath({  json: _list, path: _path});
    console.log('_formItem', _formItem);
    let _formKey = _formItem?.[0]?.key;
    let _formValue = _formItem?.[0]?.value;
    console.log(_formKey, _formValue)

    // 获取设置当前 linkageKey 的formItem
    let _linkagePath = `$..[?(@ && @.linkageKey == '${_formKey}')]`
    let _linkageFormList = JSONPath({json: _list, path: _linkagePath });
    console.log('_linkageFormItem', _linkageFormList);
    // 遍历当前获取到的 当前 linkageKey 的formItem
    _linkageFormList?.map(item => {
      let _lItem = item;
      let _linkageValue = _lItem.linkageValue;
      let _linkageFormItemIsHidden = false;
      //  判断当前联动key对应的formItem的值 是否为空
      // 存在显示当前 linkageKey 的formItem ,不存在就隐藏
      if (_formValue || _formValue === 0) {
        if(Array.isArray(_formValue)){
          // 数组为空就隐藏，不为空就系那是
          if(_formValue?.length>0){
            let _arr1 = _formValue;
            let _arr2 = _linkageValue
            // 判断当前 linkageKey 的formItem的 _linkageValue 是否为数组
            // 判断是否和联动key对应的formItem的值有交集
            // 有就显示, 无就隐藏
            if(Array.isArray(_arr2)){
              const filteredArray = _arr1.filter(value => _arr2.includes(value));
              if(filteredArray?.length>0){

              }else{
                _linkageFormItemIsHidden = true;
              }
            }else{
              //  不是就套层数组
              //  判断是否和联动key对应的formItem的值有交集
              //  有就显示, 无就隐藏
              if(_arr2 || _arr2 == 0){
                _arr2 = [_arr2];
                const filteredArray = _arr1.filter(value => _arr2.includes(value));
                if(filteredArray?.length>0){

                }else{
                  _linkageFormItemIsHidden = true;
                }
              }
            }

          }else{
            _linkageFormItemIsHidden = true
          }
        }else{
          // 判断当前 linkageKey 的formItem的 _linkageValue 是否有
          //  有就和当前联动key对应的formItem的值 比较，相同就显示 ，不相同就隐藏
          if (_linkageValue || _linkageValue === 0) {
            if (_linkageValue != _formValue) {
              _linkageFormItemIsHidden = true
            }
          }
        }

      } else {
        _linkageFormItemIsHidden = true;
      }

      _lItem.isHidden = _linkageFormItemIsHidden;

    })

    return false;


  })

}

const clearValidate = () => {
  return formModelRef.value.clearValidate()
}
const validate = (callback) => {
  return formModelRef.value.validate((valid, invalidFields) => callback(valid, invalidFields))
}
const resetFields = () => {
  return formModelRef.value.resetFields()
}
const scrollToField = (prop)=>{
  return formModelRef.value.scrollToField(prop)
}

const setLinkage = ()=>{
  return setLinkageForm()
}

defineExpose({
  formModelRef,
  resetFields,
  clearValidate,
  validate,
  scrollToField,
  getFormData,
  getFormDataByNoHidden,
  setLinkage
})

// section init 接口请求方法放这
const init = () => {
  setLinkageForm();

}

// 统一执行初始化方法
init();
</script>

<style scoped
       lang="less">

.el-form {
  &.hiddenItemMarginBottom {
    :deep(.el-form-item) {
      margin-bottom: 0;
    }
  }
}


.el-col.fixedWidth {
  max-width: unset;
  flex: unset;
}

</style>













