<!--
  @Author: 戴伟
  @Date: 2023-04-24 15:49:59
  @FilePath: src\views\layout\components\menuModel\index.vue  
  @LastEditTime: ''
  @LastEditors: ''
  @Description: 
        do.....
-->

<template>
    <el-menu
            class="menu-model"
            ref="menuModelRef"
            :default-active="modelValue"
            :collapse="collapse"
            @open="goTo('open','')"
            @close="goTo('close','')"
    >
        <d-menu-list :collapse="collapse" :list="menuList" @onClick="data=>goTo('onClick',data)"></d-menu-list>

        <d-el-button
                class="collapse-button" :class="[collapse?'isCollapse':'']"
                icon="back" round
                @click="goTo('onCollapseClick',)"

        ></d-el-button>

    </el-menu>
</template>

<script setup>
defineOptions({
    name: 'd-menu-model',
});

import {ref, reactive, computed, watch} from "vue"
import MenuList from "./menuList/index.vue"
import {debounce} from "@/tools/tools"


const props = defineProps({
    // 配合emits v-model
    modelValue: {
        type: [String],
    },
    list: {
        type: [Array],
    },
    maxLevel: {
        type: [Number],
        default: 2, // 最大两层 ，下面代码 超过2层 就会按照两层
    },
    isMerge: {
        type: [Boolean],
        default: false,
    },
    isCollapse: {
        type: [Boolean],
        default: false,
    }
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(['onClick','onCollapseClick']);

const active = ref('');

const menuModelRef = ref('')


const setList = (list, parent = {}, level = 1) => {
    const _level = level;
    // console.log('level',level)
    const maxLevel = props.maxLevel >= 2 ? 2 : props.maxLevel;

    if (_level > maxLevel) {
        return [];
    }
    let _list = list || [];
    _list = _list?.map((item, index) => {
        let _item = item;
        if (Array.isArray(_item.children) && _item.children.length > 0) {

            if (props.isMerge) {
                if (_item.children.length === 1) {
                    // _item.children = setList(_item.children, _item, _level + 1)

                    _item = _item.children[0];
                    _item.children = [];

                } else {
                    _item.children = setList(_item.children, _item, _level + 1)

                }
            } else {
                _item.children = setList(_item.children, _item, _level + 1)
            }


        }

        return _item;
    })

    return _list
}


const menuList = ref([]);

const onListChange = () => {
    let _list = props.list || [];
    _list = JSON.parse(JSON.stringify(_list));
    _list = setList(_list)
    console.log('menuModel-_list', _list)
    menuList.value = _list
}

watch(() => props.list, (list) => {
    onListChange()
}, {
    deep: true,
    immediate: true,
})


const collapse = ref(false);

watch(() => props.isCollapse, (isCollapse) => {
    console.log('isCollapse', isCollapse)

    collapse.value = isCollapse;
}, {
    deep: true,
    immediate: true,
})


const goTo = (key, data) => {
    // console.log(key,data)
    if (key === 'onClick') {
        console.log('menuModelRef', menuModelRef.value)
        emits('onClick', {...data})
    }
    if (key === 'onCollapseClick') {
        collapse.value = !collapse.value;

        emits('onCollapseClick', collapse.value)

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
.menu-model {
  //width: 100%;
  border: 0;
  padding: 24px 0 24px 24px;
  min-height: 100%;
  border-radius: 0px 24px 24px 0px;
  //height: 100%;
  --el-menu-width: 100%;
  --el-menu-collapse-width: 80px;
  --el-menu-transition: all .33s ease-in-out;
  //transition: var(--el-menu-transition);
  position: relative;
  width: var(--el-menu-width);


  :deep(.menu-model-item) {
    --el-menu-item-height: 48px;
    --el-menu-sub-item-height: 48px;
    --el-menu-text-color: #6C6E73;
    --el-menu-item-font-size: 16px;
    --el-menu-active-color: var(--el-color-primary);
    width: 100%;

    //:deep(.el-menu){
    //  width:100%;
    //}
    .el-sub-menu__icon-arrow {
      z-index: 10;

      svg {
        transform: rotateZ(-90deg);
        width: 1.2em;
        height: 1.2em;
      }
    }

    &.is-opened {
      .el-sub-menu__icon-arrow {
        z-index: 10;

        svg {
          transform: rotateZ(-180deg);
        }
      }
    }


  }

  :deep(.menu-model-item) {
    position: relative;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    position: relative;
    border-radius: 12px;
    --el-menu-text-color: #6C6E73;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    color: var(--el-menu-text-color);

    > * {
      position: relative;
      z-index: 10;
    }

    > .el-sub-menu__title {
      z-index: 20;
      border-radius: 12px;

    }

    &:before {
      content: " ";
      display: block;
      height: 100%;
      position: absolute;
      left: -24px;
      top: 0;
      bottom: 0;
      background: var(--el-color-primary);
      box-shadow: 0px 6px 12px 0px rgba(63, 140, 255, 0.26);
      border-radius: 12px;
      width: 0;
      opacity: 0;
      transition: var(--el-menu-transition);
      z-index: 1;
    }

    &:after {
      content: " ";
      display: block;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0;
      bottom: 0;
      background: var(--el-color-primary);
      box-shadow: 0px 6px 12px 0px rgba(63, 140, 255, 0.26);
      border-radius: 12px;
      width: 0;
      opacity: 0;
      transition: var(--el-menu-transition);
      z-index: 1;

    }

    &.menu-model-sub {
      &:before, &:after {
        height: var(--el-menu-item-height);
        z-index: 15;
      }


    }

    &.is-active {
      --el-menu-text-color: #fff;
      --el-menu-active-color: #fff;

      > .el-sub-menu__title {
        --el-menu-hover-bg-color: transparent;

      }

      &:before {
        width: 4px;
        opacity: 1;
      }

      &:after {
        width: calc(100% + 8px);
        opacity: 1;
      }

      .menu-model-item {
        &.is-active {
          --el-menu-text-color: var(--el-color-primary);
          --el-menu-active-color: #fff;
        }

        &:before {
          width: 4px;
          opacity: 0;
        }

        &:after {
          width: calc(100% + 8px);
          opacity: 0;
        }
      }

    }
  }


  &.el-menu--collapse {
    width: var(--el-menu-collapse-width);
    //width: 80px;
    padding: 24px 0;
    --el-menu-base-level-padding: 0;
    border-radius: 0px 8px 8px 0px;

    :deep(.menu-model-item) {
      &:before {
        opacity: 0;
      }


      .menu-item-icon {
        width: 100%;
        text-align: center;
      }

      .menu-model-sub-text {
        width: 0;
        overflow: hidden;
      }
    }
  }

  .collapse-button {
    position: absolute;
    left: calc(50% - 20px);
    bottom: 20px;
    padding: 0;
    width: 40px;
    height: 40px;
    --el-button-active-border-color: #0DC89A;
    background: #0DC89A;
    box-shadow: 0px 6px 12px 0px rgba(13, 200, 154, 0.1);
    font-size: 20px;
    color: #fff;
    transition: var(--el-menu-transition);
      transform: rotate(0deg);
      &.isCollapse{
        transform: rotate(-180deg);
      }
  }

}
</style>