<!--
  author: 戴伟
  date: 021 2022/11/21 16:54:34
  file: src\components\formModel\formIList\index.vue
  des:
    do.....
-->

<template>
  <el-row class="d-form-list-row"  :class="formListRowClassCOM"  :gutter="gutter">
    <template v-for="(item, index) in _formList" :key="index">
      <template v-if="!item.isHidden">
        <el-col class="d-form-list-col" :span="item.span"
                :class="formListColClassCOM(item,index)"
                :style="formListColStyleCOM(item,index)"
        >
          <d-el-form-item
              :formModelRef="formModelRef" :item="item" :index="index" :prop="[...prop,index]"
              :formList="_formList"
              :buttonProp="[...prop,index]"
              :onChangeProp="[...prop,index]" @onChange="(data) => goTo('onChange', data)"
              @onFormItemButtonClick="(data) => { goTo('onFormItemButtonClick', data) }"
              @onInputSearch="data=>goTo('onInputSearch',data)"
          >
            <template v-for="(item, index) in slotListCOM()" :key="index" #[item.name]="data">
              <slot :name="item.name" :data="data.data"></slot>
            </template>
          </d-el-form-item>
          <template v-if="item?.children?.length > 0">
            <template v-if="item?.isChildrenBr">
              <el-col :span="24"></el-col>
            </template>
            <el-col
                class="d-form-list-children-col"
                :span="item?.childrenSpan?item?.childrenSpan:24"
                :class="formListChildrenColClassCOM(item,index)"
                :style="formListChildrenColStyleCOM(item,index)"

            >
              <d-el-form-list
                  :prop="[...prop,index,'children']"
                  :formModelRef="formModelRef"
                  :formList="item?.children"
                  :formRowClass="item?.formRowClass"
                  :gutter="gutter"
                  @onChange="(data) => goTo('onChange', data)"
                  @submit="(data)=>goTo('submit', {...data})"
                  @onInputSearch="data=>goTo('onInputSearch',data)"
                  @onFormItemButtonClick="(data)=>goTo('onFormItemButtonClick', data)"
              >

                <template v-for="(item, index) in slotListCOM()" :key="index" #[item.name]="data">
                  <slot :name="item.name" :data="data.data"></slot>
                </template>
              </d-el-form-list>

            </el-col>
          </template>

        </el-col>


      </template>
    </template>


    <template v-if="buttonList?.length > 0">
      <el-col :class="{ 'fixedWidth': !isButtonsRow }">
        <el-form-item class="form-item " label="" label-width="0">
          <template v-for="(item, index) in buttonList" :key="index">
            <el-button @click="() => goTo('submit', item)" :class="item.class" :type="item.type">
              {{ item.name }}
            </el-button>
          </template>
        </el-form-item>
      </el-col>
    </template>

  </el-row>
</template>

<script setup>

defineOptions({
  name: 'd-el-form-list',
  isExposed: false
});

import {ref, reactive, computed, watch, useSlots} from "vue"
import {throttle} from "../../../tools/tools"

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
  formList: {
    type: [Array],
  },
  formModelRef: {
    type: [Object]
  },
  prop: {
    type: [Array],
    default: [],
  },
  isButtonsRow: {
    type: Boolean,
    default: false,
  },
  buttonList: {
    type: [Array],
  },
  gutter:{
    type:[Number],
    default:20,
  },
  formRowClass:{
    type: [Array,Object,String]
  }
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(['onClick', 'onFormItemButtonClick', 'onChange', 'submit','onInputSearch']);


const defaultCOM = computed(() => {
  return '';
});

// section computed formList
const _formList = computed(() => {
  let _list = props?.formList?.length > 0 ? props.formList : [];
  // console.log('formList-computed-_list', _list)


  // setFormList(_list);
  // console.log('_com-list', _list)


  return _list
})
// const _formList = ref(props?.formList)
// const _formList = computed({ // 重新定义
//   get: () => props?.formList || [],
//   set: (value) => {
//     console.log('_formList-computed-value',value)
//     return props?.formList
//   },
// })
// watch(
//  () => props?.formList, (newValue, oldValue) => {
//    console.log('watch-_formList-newValue', newValue);
//    console.log('oldValue', oldValue);
//    // defaultActive = newValue.path;
//
//  },
//   {deep:true}
// );

const formListRowClassCOM = computed(() => {

  let _data = props.item;
  let _class = []
  // console.log('propsClass',props.formRowClass)

  let _formRowClass = props?.formRowClass;
  if (typeof (_formRowClass) == 'string') {
    let _bClass = _formRowClass?.split(' ')
    _class = [..._class, ..._bClass]
  }
  if (_formRowClass?.constructor == Object) {
    let _bClass = Object.keys(_formRowClass)?.map(key => {
      // console.log(key)
      return _formRowClass[key] ? key : ''
    })
    _class = [..._class, ..._bClass]
  }
  if (_formRowClass?.constructor == Array) {
    let _bClass = _formRowClass || [];
    _class = [..._class, ..._bClass]
  }

  // console.log('_formRowClass',_data?.formRowClass);

  return _class;
});

const formListColClassCOM = computed(()=>{
  return  (item,index)=>{
    // console.log(item);
    let _class= [];
    let _data = item;
    let _width = _data?.width;
    let _widthNum = '';
// :class="{ 'fixedWidth': item.width >= 0,'isTransition':item.isSpanTransition }"
    if(_width?.toString()?.trim()?.indexOf('calc') == 0){
      // fixedWidth.value = _width;
      _class.push('fixedWidth');
    }

    _widthNum = parseFloat(_width);
    if((_width || _width==0) && _widthNum >=0){
      _class.push('fixedWidth');
    }
    return _class
  }

})

const formListColStyleCOM = computed(()=>{
  return  (item,index)=>{
    // console.log(item);
    let _style = {};
    let _data = item;
    let _width = _data?.width;
    let _widthNum = '';
    let _widthUnit = 'px';
     _style.width = 'auto'

// :class="{ 'fixedWidth': item.width >= 0,'isTransition':item.isSpanTransition }"
    if(_width?.toString()?.trim()?.indexOf('calc') == 0){
      _style.width = _width;
    }
    _widthNum = parseFloat(_width);
    if((_width || _width==0) && _widthNum >=0){
      let _widthArr = _width.toString().split(_widthNum.toString())
      _widthUnit = _widthArr?.[1] || 'px';
      _style.width = _widthNum + _widthUnit
    }
    // console.log('formListColClassCOM-_class',_class)

    return _style
  }

})


const formListChildrenColClassCOM = computed(()=>{
  return  (item,index)=>{
    // console.log(item);
    let _class= [];
    let _data = item;
    let _isWidthFill = _data?.isChildWidthFill;
    let _width = _data?.childrenWidth;
    let _widthNum = '';
    let _widthUnit = 'px';

  // :class="{ 'fixedWidth': item.width >= 0,'widthFill': item.width >= 0 }"
  //   console.log('formListChildrenColClassCOM-_width',)
    if(_width?.toString()?.trim()?.indexOf('calc') == 0){
      _class.push('fixedWidth');
    }

    _widthNum = parseFloat(_width);
    if((_width || _width==0) && _widthNum >=0){
      _class.push('fixedWidth');
    }
    if(_isWidthFill){
      _class.push('widthFill');
    }




    return _class
  }
})

const formListChildrenColStyleCOM = computed(()=>{
  return  (item,index)=>{
    // console.log(item);
    let _style = {};
    let _data = item;
    let _isWidthFill = _data?.isChildWidthFill;
    let _width = _data?.childrenWidth;
    let _widthNum = '';
    let _widthUnit = 'px';
    _style.width = 'auto'
    // :class="{ 'fixedWidth': item.width >= 0,'widthFill': item.width >= 0 }"
    //   console.log('formListChildrenColClassCOM-_width',)
    if(_width?.toString()?.trim()?.indexOf('calc') == 0){
      _style.width = _width;
    }

    _widthNum = parseFloat(_width);
    if((_width || _width==0) && _widthNum >=0){
      // console.log('formListChildrenColClassCOM',formListColRef.value?.[index])
      // console.log('formListChildrenColClassCOM-_width',_width)
      // console.log('formListChildrenColClassCOM-parseFloat',parseFloat(_data?.width))
      let _widthArr = _width.toString().split(_widthNum.toString())
      // console.log('formListChildrenColClassCOM-_widthArr',_widthArr)
      _widthUnit = _widthArr?.[1] || 'px';
      _style.width = _widthNum + _widthUnit;
    }
    if(_isWidthFill){
      _style.width = 'auto';
    }




    return _style
  }
})


const goTo = (key, data) => {
  // console.log('formList',key,data);
  data = JSON.parse(JSON.stringify(data));
  if (key == 'onFormItemButtonClick') {
    emits('onFormItemButtonClick', {...data})
  }
  if (key == 'onInputSearch') {
    // console.log(key, data);
    emits('onInputSearch', {key: 'onInputSearch',...data})
  }
  if (key == 'onChange') {
    emits('onChange', {...data})
  }
  if (key == 'submit') {
    // console.log(key, data);
    emits('submit', {key: data.key, data,})
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
.d-form-list-row {
  flex: 1;
  //width:100%;
}

.el-col.fixedWidth {
  max-width: unset;
  flex: unset;

}

.el-col.widthFill {
  flex: 1;
}

.d-form-list-col {
  //display: flex;

  &.fixedWidth {
    max-width: unset;
    flex: unset;
    //width:v-bind('fixedWidth')
  }
  &.isTransition {
    transition: all .22s ease-in-out;
  }


}
.d-form-list-children-col{
  &.fixedWidth {
    max-width: unset;
    flex: unset;
    width:v-bind('fixedChildrenWidth')
  }
  &.widthFill {
    max-width: unset;
    flex: 1;
  }
}

//.d-form-list-row .el-col{
//  min-height:0;
//}

</style>