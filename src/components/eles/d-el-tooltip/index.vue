<!--
  author: 戴伟
  date: 019 2022/12/19 10:25:11
  file: src\components\global\g-dialog\index.vue
  des:
    do.....
-->

<template>

  <Component
      :is="_componentInfo.name"
      :ref="(el)=>_componentInfo.ref = el"
      @before-enter="goTo"
      :content="content"
      :disabled="disabled"
      v-bind="$props"
  >
    <template v-for="(item, index) in slotListCOM()" :key="index" #[item.name]="data">

      <template v-if="item.name == 'default'">
        <div class="tooltip-default" ref="tooltipDefaultRef"
             @mouseenter="event=>setShowByContent(event)">
           <slot :name="item.name" :data="data.data"></slot>
        </div>
      </template>
      <template v-else>
        <slot :name="item.name" :data="data.data"></slot>
      </template>


    </template>
  </Component>

</template>

<script setup>
// eslint-disable-next-line no-undef
defineOptions({
  name: "d-el-tooltip",
  isGlobal: true,
});
import {computed, onMounted, ref, useSlots, useAttrs, nextTick} from "vue";

const _componentInfo = ref({
  name: "el-tooltip",
  ref: null,
});
let slots = useSlots();
const slotListCOM = computed(() => {
  return () => {
    let _slots = [];
    _slots = Object.keys(slots) || [];
    _slots = _slots?.map((item) => {
      // console.log(slots)
      return {
        name: item,
      };
    });
    return _slots;
  };
});

const tooltipDefaultRef = ref();

const props = defineProps({
  // 配合emits v-model
  isShowByContent: {
    type: [Boolean],
  },
});





//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits([]);
const content = ref('');
// content.value = attrs?.content ||
const disabled = ref(false);


const setShowByContent = (event) => {
  // console.log(props.isDefaultShow)

  // console.log(event,tooltipDefaultRef)

  let _disabled = false;
  // console.log('isShowByContent',props.isShowByContent)
  if (props.isShowByContent) {
    // 元素在界面显示宽度
    let _outClientWidth = tooltipDefaultRef.value?.clientWidth;
    // 元素的整体宽度，包括由于溢出而无法展示在网页的不可见部分
    let _innerOffsetWidth = tooltipDefaultRef.value?.scrollWidth;
    // console.log('setShowByContent-_outClientWidth', _outClientWidth)
    // console.log('setShowByContent-_innerOffsetWidth', _innerOffsetWidth)
    // 里面内容宽度超过外面宽度
    if (_innerOffsetWidth > _outClientWidth) {

    } else {
      // console.log('禁用')
      _disabled = true;
    }

  }
  // _disabled = props.disabled;
  // console.log('isShowByContent',_disabled)


  disabled.value = _disabled;


}


const goTo = (key, data) => {
  console.log(key,data);

  if (key == "mouseenter") {


  }
};

// 接口请求方法放这
const init = () => {
  //getList();
};

// 统一执行初始化方法
init();
onMounted(() => {
  // console.log('onMounted',_componentInfo.value?.ref)
  //
  // setTimeout(()=>{
  //   console.log('onMounted',_componentInfo.value?.ref?.contentRef)
  //
  // },2000)
});
</script>

<style scoped lang="less">
.tooltip-default {
  display: inline-block;
  width: 100%;
  height: 100%;
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  span {

  }
}
</style>
