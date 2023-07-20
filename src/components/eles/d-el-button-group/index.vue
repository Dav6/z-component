<!--
  @Author: 戴伟
  @Date: 2023-06-12 13:51:38
  @FilePath: src\components\eles\d-el-button-group\index.vue  
  @LastEditTime: ''
  @LastEditors: ''
  @Description: 
        do.....
-->

<template>
    <el-button-group class="group-list">
        <template v-for="(item,index) in list" :key="index">

            <template v-if="item.type === 'dropdown'">
                <Component
                        class="group-dropdown"
                        :is="isComponentCOM(item)"
                        :list="item.list"
                        :trigger="item.trigger"
                        :placement="item.placement"
                        :teleported="item.teleported"

                        @command="(key)=>goTo('onCommand', {data:item,index:index,key:key})"
                >
                    <d-el-button

                            class="group-dropdown-button"
                            :class="buttonItemClassCOM(item)"
                            :type="item.buttonType"
                            :text="item.text"
                            :icon="item.icon"
                            :color="item.color"
                            :disabled="item.disabled"
                            @click.stop="()=>{}"
                    >
                        {{ item.name ? item.name : '···' }}
                    </d-el-button>
                </Component>

            </template>


            <template v-else>
                <Component
                        :is="'d-el-button'"
                        :list="item.list"
                        :class="buttonItemClassCOM(item)"
                        :type="item.buttonType"
                        :text="item.text"
                        :plain="item.plain"
                        :link="item.link"
                        :round="item.round"
                        :circle="item.circle"
                        :loading="item.loading"
                        :loading-icon="item.loadingIcon"
                        :icon="item.icon"
                        :color="item.color"
                        :disabled="item.disabled"

                        @click.stop="goTo('onClick',{data:item,index:index})"
                >

                    {{ item.name }}

                </Component>
            </template>


            <template v-if="isDivided  && (list?.length - 1 != index)">
                <div class="group-list-divided"></div>
            </template>

        </template>

    </el-button-group>


</template>

<script setup>
defineOptions({
    name: 'd-el-button-group',
});

import {computed, useSlots} from "vue"


const componentName = 'el-button'


let slots = useSlots()
// console.log('d-el-dialog-slots',slots)
const slotListCOM = computed(() => {
    return () => {
        let _slots = [];
        _slots = Object.keys(slots) || [];
        _slots = _slots?.map(item => {
            return {
                name: item,
            }
        })
        // console.log(_slots);
        return _slots
    }
})


const props = defineProps({
    // 配合emits v-model
    // modelValue: {
    //   type: [String, Boolean, Number, Object, Array],
    // },
    // item: {
    //   type: [Object],
    // }
    list: {
        type: [Array]
    },
    isDivided: {
        type: [Boolean]
    },
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(['onClick']);


const isComponentCOM = computed(() => {
    return (data) => {
        // console.log(data);
        let _settingsButtonItem = data;
        let _type = 'button'
        let _component = 'd-el-button'
        if (_settingsButtonItem.type === 'dropdown') {
            _component = 'd-el-dropdown';
            _type = 'dropdown'
        }
        if (_settingsButtonItem.type !== _type) {
            _settingsButtonItem.type = _type;
        }


        return _component
    }
})


const buttonItemClassCOM = computed(() => {
    return (item) => {
        const _item = item;
        let _class = ['']

        let _itemClass = _item?.class;
        if (typeof (_itemClass) == 'string') {
            let _bClass = _itemClass?.split(' ')
            _class = [..._class, ..._bClass]
        }
        if (Object.prototype.toString.call(_itemClass) === '[object Object]') {
            let _bClass = Object.keys(_itemClass)?.map(key => {
                // console.log(key)
                return _itemClass[key] ? key : ''
            })
            _class = [..._class, ..._bClass]
        }
        if (Array.isArray(_itemClass)) {
            let _bClass = _itemClass || [];
            _class = [..._class, ..._bClass]
        }

        return _class;

    }
})


const goTo = (key, data) => {
    console.log('key,data', key, data);
    if (key == 'onClick' || key == 'onCommand') {

        // data:scope.row,dataIndex:scope.$index,

        let _data = data?.data;
        const _index = data?.index;
        let _key = _data?.key; // 默认取里面
        let _dropdownIndex = ''
        if (_data?.type === 'dropdown') {
            // 只有在下拉点击的时候取外面
            _key = data?.key;
            _dropdownIndex = _data?.list?.findIndex(item => item.key == _key)
            console.log(_dropdownIndex);
        }


        let _emitsData = {
            key: _key,
            index: _index,
            button: _data,
        }

        // console.log('_emitsData',_emitsData)
        emits('onClick', _emitsData)
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
.group-list {
  //width: 100%;
  display: flex;
  //justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  > .el-button {
    padding: 8px;

    &:not(:last-child) {
      margin-right: -2px;
    }
  }

  > .el-dropdown {
      > .el-button {
          border-radius: var(--el-border-radius-base);
      }

    &:not(:last-child) {
      margin-right: -2px;
    }

    &:not(:first-child):not(:last-child) {
      > .el-button {
        border-radius: 0;
      }
    }



    &:first-child {
      > .el-button {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    &:last-child {

      > .el-button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }


  }


  .group-dropdown-button {
    padding: 8px;
  }

  > .el-dropdown {
    > .el-button {
      border-left-color: var(--el-button-border-color)
    }
  }

  .group-list-divided {
    height: 14px;
    width: 1px;
    background: #E9E9E9;
    //border-left:1px solid #E9E9E9;
  }


}
</style>