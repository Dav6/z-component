<template>
  <el-card shadow="never" class="cron" :_data="_value">

    时间：{{cronDesc}}

    <el-form-item class="cron-el-form-item" :rules="[]">

      <el-tabs class="cron-tab"   v-model="activeName">

        <template v-for="(item,index) in cronData" :key="item.key">
          <el-tab-pane :label="item.label" :name="item.key">
            <Component :is="item.component" v-model="item.value" :cronData="cronData" :unit="item.label"  ></Component>
          </el-tab-pane>
        </template>

      </el-tabs>
      <!-- table -->
    </el-form-item>
<!--    <d-table-model-->
<!--      :list="[cronKeyData]"-->
<!--      :keyList="cronData"-->
<!--      :settingsConfig="{isShow:false}"-->
<!--      border-->
<!--    ></d-table-model>-->


  </el-card>


</template>
<script setup>
defineOptions({
  name: 'd-cron',
});
import SecondAndMinute from './cron/secondAndMinute.vue'
import Hour from './cron/hour.vue'
import Day from './cron/day.vue'
import Month from './cron/month.vue'
import Week from './cron/week.vue'
import Year from './cron/year.vue'
import cronstrue from 'cronstrue';
import 'cronstrue/locales/zh_CN'
import {ref, reactive, markRaw, computed, watch} from "vue"
import {debounce} from "../../tools/tools"

const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String],
    default:()=>{
      return '* * * * * ? *'
    }
  },
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(["update:modelValue", "change"]);

// const cronstrue = ref(cronstrue);
const activeName = ref('s');
const cronData = ref([
  {
    key: 's',
    value: '*',
    label: '秒',
    component: markRaw(SecondAndMinute),
    showOverflowTooltip:true,
  },
  {
    key: 'm',
    value: '*',
    label: '分',
    component: markRaw(SecondAndMinute),
    showOverflowTooltip:true,
  },
  {
    key: 'h',
    value: '*',
    label: '时',
    component: markRaw(Hour),
    showOverflowTooltip:true,
  },
  {
    key: 'd',
    value: '*',
    label: '日',
    component: markRaw(Day),
    showOverflowTooltip:true,
  },
  {
    key: 'month',
    value: '*',
    label: '月',
    component: markRaw(Month),
    showOverflowTooltip:true,
  },
  {
    key: 'week',
    value: '?',
    label: '周',
    component: markRaw(Week),
    showOverflowTooltip:true,
  },
  {
    key: 'year',
    value: '*',
    label: '年',
    component: markRaw(Year),
    showOverflowTooltip:true,
  }
])
const cronKeyData = computed(() => {
  let _data = {};
  cronData.value?.map(item => {
    _data[item.key] = item.value
  })
  return _data;
})
const cronDesc = ref('')
const modelValue = computed({ // 重新定义
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
})


const _isValueFirst = ref(true);

const _value = computed(() => {

  let _data = cronData.value;
  let _isError = false;
  let _cronDesc = '';
  let _cron = _data?.map(c => {
    if(!c.value){
      _isError = true;
      cronDesc.value = `${c.label}为空`;
    }
    return c.value
  })
  _cron = _cron.join(' ');

  console.log(props.modelValue)
  console.log('watch-_value----------------', _cron)

  if(_isError){
    _cron = '';
    // cronDesc.value = cronstrue.toString(_cron,{locale:'zh_CN'})

  }else{
    cronDesc.value = cronstrue.toString(_cron,{locale:'zh_CN'})

  }



  if (_cron !== props.modelValue) {
    // this.$emit('input', v)
    emits("update:modelValue", _cron);
    if (!_isValueFirst.value) {
      emits("change", _cron);

      console.log('watch-_value----------------onchange------', _cron)

    }
    _isValueFirst.value = false;
  }
  return _cron
})

// watch(()=>_value.value,()=>{
//   console.log('watch-_value----------------',_value)
// },{deep:true})

watch(() => props.modelValue, (modelValue, preModelValue) => {
    // console.log('modelValue', modelValue);
    // console.log('preModelValue', preModelValue);
    if (modelValue != preModelValue) {
      updateVal();

    }
    // emits("change", '_cron');

    // defaultActive = newValue.path;
  },
  {deep: true}
);


const updateVal = () => {
  // console.log('updateVal', props.modelValue);
  if (!props.modelValue) {
    return '';
  }
  let arrays = props.modelValue.split(' ')
  console.log('updateVal', arrays);
  arrays?.map((item, index) => cronData[index] = item)
  // sVal.value = arrays[0]
  // mVal.value = arrays[1]
  // hVal.value = arrays[2]
  // dVal.value = arrays[3]
  // monthVal.value = arrays[4]
  // weekVal.value = arrays[5]
  // yearVal.value = arrays[6]
}

const goTo = (key,data) => {
  console.log(key,data);
}


// 接口请求方法放这
const init = () => {
  //getList();
  updateVal();

}

// 统一执行初始化方法
init();


</script>

<style lang="less" scoped>
:deep(.is-error.form-item){

}

.cron {
  text-align: left;
  border:none;
  --el-card-padding:5px 20px 20px;
  :deep(.cron-el-form-item.el-form-item) {
    .el-form-item__content {
      width: 100%;





    }
  }



  :deep(.el-tabs){
    .el-tabs__item.is-top{
      padding:0 20px;
      text-align:center;
      //margin:0 10px;
    }

  }

  .cron-tab{
    width:100%;
  }

  :deep(.cron-item) {
    .flex-item{
      display: flex;
      align-items: center;
    }
    > div {
      padding-bottom: 8px;
      display: flex;
      align-items: center;
      white-space: nowrap;
    }

    .el-input-number{
      width: 100px;
      flex-shrink: 0;
    }
    .el-select{
      margin-left:10px;
    }

    .el-checkbox-group {
      padding-left: 10px;
      padding-right: 10px;

      .el-checkbox {
        margin-left: 0;
        min-width: 3em;
        margin-right: 5px;
      }
    }
  }
}
</style>
