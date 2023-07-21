<!--
  author: 戴伟
  date: 020 2022/12/20 11:28:56
  file: src\components\eles\d-el-table\index.vue
  des:
    do.....
-->

<template>
    <el-dropdown
            class="d-el-dropdown"
            popper-class="d-el-dropdown-popper"
            ref="dropdownRef"
            :trigger="trigger"
            :placement="placement"
            @command="data=>goTo('command',data)"
            v-bind="$props"
    >
        <slot></slot>


        <template #dropdown>
            <el-dropdown-menu>
                <template v-for="(item,index) in list" :key="index">
                    <el-dropdown-item
                            :command="item.key"
                            :class="dropdownItemClassCOM(item)"
                            :disabled="item.disabled"
                            :divided="item.divided"
                    >
                        <span class="d-el-dropdown-item"
                            :class="[(item?.key === activeName && isActive)?'active':'']"
                        >{{ item.name }} </span>
                    </el-dropdown-item>

                </template>

            </el-dropdown-menu>
        </template>
    </el-dropdown>

</template>

<script setup>
import {computed, ref, watch} from "vue";

defineOptions({
    name: 'd-el-dropdown',
});
// import {ref,reactive,computed,watch} from  "vue"

const props = defineProps({
    // 配合emits v-model

    list: {
        type: [Array],
    },
    // 触发下拉的行为	 hover/click/contextmenu
    trigger: {
        type: [String]
    },
    // 菜单弹出位置	top/top-start/top-end/bottom/bottom-start/bottom-end
    placement: {
        type: [String]
    },
    isActive:{
      type: [Boolean]
    },
    activeName: {
        type: [String, Number]
    }

});


const dropdownRef = ref();
const activeName = ref('')
activeName.value = props.activeName



watch(() => props.activeName, (activeName) => {
    activeName.value = props.activeName
}, {
    deep: true,
})


const dropdownItemClassCOM = computed(() => {
    return (item) => {
        const _item = item;
        const _itemKey = _item.key;
        const _activeName = activeName.value;
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

        if (_itemKey === _activeName) {
            _class.push('active')
        }


        return _class;

    }
})


const goTo = (key, data) => {
    console.log(key, data);
    const _key = key;
    const _data = data;
    console.log('activeName.value ',activeName.value )
    if (_key === 'command') {
        activeName.value = _data
    }
}


// 接口请求方法放这
const init = () => {
    //getList();

}

// 统一执行初始化方法
init();

const getDropdownRef = ()=>{
    return dropdownRef
}

defineExpose({
    dropdownRef:dropdownRef,
})


</script>

<style scoped lang="less">
.active {
  color: var(--el-dropdown-menuItem-hover-color);
}
</style>