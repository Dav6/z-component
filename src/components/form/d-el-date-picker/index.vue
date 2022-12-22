<!--
  author: 戴伟
  date: 015 2022/12/15 11:14:19
  file: src\components\form\d-el-input.vue
  des:
    do.....
-->

<template>
  <el-date-picker
    class="form-date-picker" :clearable="item.clearable"
    v-model="item.value" :type="item.type"
    :disabled="item.disabled"
    :range-separator="item.rangeSeparator ? item.rangeSeparator : '-'"
    :format="item.format ? item.format : 'YYYY-MM-DD HH:mm:ss'"
    :value-format="item.valueFormat ? item.valueFormat : 'YYYY-MM-DD HH:mm:ss'"
    :shortcuts="item.shortcuts ? item.shortcuts : getShortcut(item.dateType)"
    :placeholder="placeholderCOM(item)"
    :start-placeholder="item.startPlaceholder" :end-placeholder="item.endPlaceholder"
    :disabled-date="(date) => dateChangeDisabled.disabledDate(date, item)"
    :teleported="teleportedCOM"
    @calendar-change="(date) => dateChangeDisabled.calendarChange(date)"
  />

</template>

<script setup>
import dayjs from "dayjs";

defineOptions({
  name: 'd-el-date-picker',
});
import {ref, reactive, computed, watch} from "vue"


const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String, Boolean, Number, Object, Array],
  },
  item: {
    type: [Object],
  }
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits([]);

const placeholderCOM = computed(() => {
  return (data) => {
    if (data.placeholder) return data.placeholder;
    let _placeholder = '';
    let _placeholderPrefix = '';
    _placeholderPrefix = '请选择';
    _placeholder = `${_placeholderPrefix}${data.name}`
    return _placeholder;
  }
})
const teleportedCOM = computed(()=>{
  let _item = props.item;
  // console.log('teleportedCOM',_item);
  console.log(_item.teleported == false)

  let _teleported = true;

  if(_item.teleported === false){
    _teleported = false;
  }



  return _teleported;
})



const dateChangeDisabled = computed(() => {
  let currentValue = [];
  return {
    disabledDate(data, item){
      // console.log(data);
      // item.disabledDate
      if ((typeof item?.disabledDate) == 'function') {
        return item?.disabledDate(data, currentValue);
      }
    },
    calendarChange(date){
      // console.log(date);
      currentValue = date;
    }

  }
})





const shortcut = [


  {
    text: '一周前',
    value: () => {
      // const date = new Date()
      // date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return dayjs().subtract(1, 'week')
    },
  },
  {
    text: '昨天',
    value: () => {
      // const date = new Date()
      // date.setTime(date.getTime() - 3600 * 1000 * 24)
      return dayjs().subtract(1, 'day')

    },
  },
  {
    text: '今天',
    value: dayjs(),
  },
  {
    text: '明天',
    value: () => {
      // const date = new Date()
      // date.setTime(date.getTime() + 3600 * 1000 * 24 * 1)
      return dayjs().add(1, 'day')
    },
  },
  {
    text: '一周后',
    value: () => {
      // const date = new Date()
      // date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
      return dayjs().add(1, 'week')
    },
  },
  {
    text: '一年后',
    value: () => {
      // const date = new Date()
      // date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)

      return dayjs().add(1, 'year')
    },
  },
]

const shortcuts = [

  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]




const getShortcut = (type) => {

  // <!--   year/month/date/datetime/ week/datetimerange/daterange	-->
  let _shortcut = shortcut;
  if (type == 'datetimerange' || type == 'daterange') {
    _shortcut = shortcuts
  }
  return _shortcut;
}





//watch(
//  () => props, (newValue, oldValue) => {
//    //console.log('newValue', newValue);
//    //console.log('oldValue', oldValue);
//    // defaultActive = newValue.path;
//
//  },
//   {immediate: true}
//);


// 接口请求方法放这
const init = () => {
  //getList();

}

// 统一执行初始化方法
init();


</script>

<style scoped lang="less">

</style>