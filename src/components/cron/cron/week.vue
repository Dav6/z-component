<template>
  <div class="cron-item month" :val="_value">
    <div>
      <d-el-radio v-model="type" :data="{isRadioBorder:true,options:[{value:'1',label:`每${unit}`}]}"></d-el-radio>
    </div>
    <div>
      <d-el-radio v-model="type" :data="{isRadioBorder:true,options:[{value:'5',label:`不指定`}]}"></d-el-radio>
    </div>
    <div>
      <d-el-radio v-model="type" :data="{isRadioBorder:true,options:[{value:'2',label:'周期'}]}"></d-el-radio>
      <span style="margin-left: 10px; margin-right: 5px;">从{{ unit }}</span>
      <d-el-input-number @change="type = '2'" v-model="cycle.start" :data="{min:1,max:7,}"></d-el-input-number>
      <span style="margin-left: 5px; margin-right: 5px;">至{{ unit }}</span>
      <d-el-input-number @change="type = '2'" v-model="cycle.end" :data="{min:2,max:7,}"></d-el-input-number>
    </div>
    <div>
      <d-el-radio v-model="type" :data="{isRadioBorder:true,options:[{value:'3',label:'循环'}]}"></d-el-radio>

      <span style="margin-left: 10px; margin-right: 5px;">从{{ unit }}</span>
      <d-el-input-number @change="type = '3'" v-model="loop.start" :data="{min:1,max:7,}"></d-el-input-number>
      <span style="margin-left: 5px; margin-right: 5px;">开始，每</span>
      <d-el-input-number @change="type = '3'" v-model="loop.end" :data="{min:1,max:7,}"></d-el-input-number>
      <span style="margin-left: 5px; margin-right: 5px;">天执行一次</span>
    </div>
    <div>
      <d-el-radio v-model="type" :data="{isRadioBorder:true,options:[{value:'7',label:'指定周'}]}"></d-el-radio>

      <span style="margin-left: 10px; margin-right: 5px;">本月第</span>
      <d-el-input-number @change="type = '7'" v-model="week.end" :data="{min:1,max:4,}"></d-el-input-number>
      <span style="margin-left: 5px; margin-right: 5px;">个，{{ unit }}</span>
      <d-el-input-number @change="type = '7'" v-model="week.start" :data="{min:1,max:7,}"></d-el-input-number>
    </div>
    <div>
      <d-el-radio v-model="type" :data="{isRadioBorder:true,options:[{value:'6',label:'本月最后一个'}]}"></d-el-radio>

      <span style="margin-left: 10px; margin-right: 5px;">{{ unit }}</span>
      <d-el-input-number @change="type = '6'" v-model="last" :data="{min:1,max:7,}"></d-el-input-number>
    </div>
    <div>
      <d-el-radio v-model="type" :data="{isRadioBorder:true,options:[{value:'4',label:'指定'}]}"></d-el-radio>

      <d-el-select class="month-select" v-model="appoint"
                   clearable
                   :class="{active:type == '4' ,isError:type == '4' && !appoint?.length>0}"
                   :data="{options:appointOptions,multiple:true,collapseTags:true,collapseTagsTooltip:true}"
                   @change="type = '4'"></d-el-select>
    </div>
  </div>
</template>

<script setup>

import {
  ref,
  reactive,
  computed,
  watch,
  getCurrentInstance
} from "vue"

const instance = getCurrentInstance();

const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String, Boolean],
    default: '?'

  },
  cronData: {
    type: Object
  },
  unit: {
    type: String
  }
});
const emits = defineEmits(["update:modelValue"]);
const _type = ref('5');
const type = computed({ // 重新定义
  get: () => _type.value,
  set: async (value) => {

    setTimeout(async () => {
      let _day = props.cronData?.find(item => item.key == 'd') || {};
      // console.log('_day',_day);
      // console.log('_type.value',value )
      let _message = `日与周必须有一个为 不指定<br>将日设置为 不指定`;
      if (_day.value != '?' && value != '5') {
        await showMessage(_message);

      }
      if (_day.value == '?' && value == '5') {
        _message = `日与周不可以同时为“不指定”</br>将日设置为每日`;
        await showMessage(_message);

      }

      //

      _type.value = value;
    }, 10)


  },
})
const showMessage = (message) => {

  return new Promise((resolve, reject) => {

    instance?.appContext?.app?.config?.globalProperties?.$confirm(
        message,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          draggable: true,
          dangerouslyUseHTMLString: true,

        }
    ).then(() => {
      console.log('确定')
      props.cronData?.map(item => {
        if (item.key == 'd') {
          if (item.value == '?') {
            item.value = '*'
          } else {
            item.value = '?'
          }

        }
      })
      resolve();
    }).catch(() => {
      console.log('取消')
    })
  })
}


const cycle = ref({ // 周期
  start: 0,
  end: 0
})
const loop = ref({ // 循环
  start: 0,
  end: 0
})
const week = ref({ // 指定周
  start: 0,
  end: 0
})
const work = ref(0)
const last = ref(0)
const appoint = ref([])
const appointOptions = ref([]);
appointOptions.value = new Array(7).fill('').map((item, index) => {
  let _index = index + 1;
  let _label = _index < 10 ? `0${_index}` : _index;

  return {
    label: _label,
    value: `${_index}`,
  }
})


const _value = computed(() => {
  let result = []
  switch (type.value) {
    case '1': // 每秒
      result.push('*')
      break
    case '2': // 年期
      result.push(`${cycle.value.start}-${cycle.value.end}`)
      break
    case '3': // 循环
      result.push(`${loop.value.start}/${loop.value.end}`)
      break
    case '4': // 指定
      result.push(appoint.value.join(','))
      break
    case '6': // 最后
      result.push(`${last.value === 0 ? '' : last.value}L`)
      break
    case '7': // 指定周
      result.push(`${week.value.start}#${week.value.end}`)
      break
    default: // 不指定
      result.push('?')
      break
  }
  ;
  // this.$emit('input', result.join(''))
  emits("update:modelValue", result.join(''));

  // console.log('res', result.join(''))
  return result.join('')
});

watch(() => props.modelValue, (newValue, preValue) => {
      updateVal()

    },
    {deep: true}
);
const updateVal = () => {
  // console.log('week', props.modelValue)
  if (!props.modelValue) {
    return
  }
  if (props.modelValue === '?') {
    type.value = '5'
  } else if (props.modelValue.indexOf('-') !== -1) { // 2周期
    if (props.modelValue.split('-').length === 2) {
      type.value = '2'
      let _start = props.modelValue.split('-')[0]
      let _end = props.modelValue.split('-')[1]
      cycle.value.start = Number(_start);
      cycle.value.end = Number(_end);
    }
  } else if (props.modelValue.indexOf('/') !== -1) { // 3循环
    if (props.modelValue.split('/').length === 2) {
      type.value = '3'
      let _start = props.modelValue.split('/')[0]
      let _end = props.modelValue.split('/')[1]
      loop.value.start = Number(_start);
      loop.value.end = Number(_end);
    }
  } else if (props.modelValue.indexOf('*') !== -1) { // 1每
    type.value = '1'
  } else if (props.modelValue.indexOf('L') !== -1) { // 6最后
    type.value = '6'
    last.value = props.modelValue.replace('L', '')
  } else if (props.modelValue.indexOf('#') !== -1) { // 7指定周
    if (props.modelValue.split('#').length === 2) {
      type.value = '7'
      let _start = props.modelValue.split('#')[0]
      let _end = props.modelValue.split('#')[1]
      week.value.start = Number(_start);
      week.value.end = Number(_end);
    }
  } else if (props.modelValue.indexOf('W') !== -1) { // 8工作日
    type.value = '8'
    let _work = props.modelValue.replace('W', '')
    work.value = _work;
  } else { // *
    type.value = '4'
    appoint.value = props.modelValue.split(',')
  }
}


// 接口请求方法放这
const init = () => {
  updateVal();

}

// 统一执行初始化方法
init();


</script>

<style scoped lang="less">

</style>
 