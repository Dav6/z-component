<!--
  author: 戴伟
  date: 020 2022/12/20 11:28:56
  file: src\components\eles\d-el-table\index.vue
  des:
    do.....
-->

<template>
    <el-table
            class="table-model"
            ref="tableModelRef"
            :data="tableList"
            :row-key="rowKey"
            :tree-props="treeProps"
            :header-cell-class-name="headerRowClassNameFN"
            :header-cell-style="headerCellStyleFN"
            :default-sort="defaultSort"
            @selection-change="data=>goTo('selectionChange',data)"
            @sort-change="data=>goTo('sortChange',data)"
            @filter-change="(data)=>goTo('filterChange',data)"

            v-bind="$attrs"
    >

        <d-table-list
                :tableModelRef="tableModelRef"
                :keyList="tableKeyList"
                :selectable="selectable"
                :sectionData="sectionData"
                :beforeSwitchChange="beforeSwitchChange"
                :pageData="pageData"

                :filters="tableFilters"
                :filterMethod="filterMethod"

                :option="option"

                :sectionButtons="tableSectionButtons"
                :isHiddenSectionButtons="isHiddenSectionButtons"

                @onSettingsButtonClick="(data)=>goTo('onSettingsButtonClick',data)"
                @onSwitchChange="(data) =>  goTo('onSwitchChange', data) "
                @onSection="data=>goTo('onSection',data)"
        >


            <template v-for="(item, index) in slotListCOM()" :key="index" #[item.name]="data">
                <slot :name="item.name" :data="data.data"></slot>
            </template>

        </d-table-list>

    </el-table>

</template>

<script setup>
import {JSONPath} from "jsonpath-plus";
import {computed, ref, useSlots, watch} from "vue"
import {debounce} from "@/tools/tools";

defineOptions({
    name: 'd-table-model',
});


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
        // console.log(_slots);
        return _slots
    }
})

const tableModelRef = ref();

const props = defineProps({
    // 配合emits v-model
    list: {
        type: [Array]
    },
    keyList: {
        type: [Array],
        default: []
    },
    pageData: {
        type: [Object],
    },
    isShowIndex: {
        type: [Boolean]
    },
    isShowExpand: {
        type: [Boolean]
    },
    isShowSelection: {
        type: [Boolean]
    },
    settingsConfig: {
        type: [Object],
        default: {},
    },
    // 行数据的 Key，用来优化 Table 的渲染； 在使用reserve-selection功能与显示树形数据时，该属性是必填的。
    // 类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
    rowKey: {
        type: [String, Function]
    },
    treeProps: {
        type: [Object],
        default: {hasChildren: 'hasChildren', children: 'children'}
    },


    headerCellClassName: {
        type: [String, Function]
    },
    selectable: {
        type: [Function]
    },
    beforeSwitchChange: {
        type: [Function, Boolean],
        default: true
    },
    filters: {
        type: [Object]
    },
    filterMethod: {
        type: [Object]
    },
    defaultSort: {
        type: [Object]
        //   如果只指定了 prop, 没有指定 order, 则默认顺序是 ascending
        //   { prop: 'id', order: 'descending' }
    },
    option: {
        type: [Object]
    },
    sortMap: {
        type: [Array, Object]
    },
    sectionButtons: {
        type: [Array]
    },
    isHiddenSectionButtons: {
        type: [Boolean]
    }


});


const tableFilters = ref({})
tableFilters.value = props.filters
const setTableFilters = debounce(() => {
    tableFilters.value = props.filters;
}, 100)

watch(() => props.filters, () => {
    setTableFilters()
}, {
    deep: true
})


//  section sectionData
const sectionData = ref({
    list: [],
    selection: []
})

const setListConfig = async () => {
    let _list = JSON.parse(JSON.stringify(props.list));
    // console.log(JSON.stringify(_list))
    let _treeProps = props?.treeProps
    let _childrenName = _treeProps?.children || 'children'
    _list = {
        [_childrenName]: _list
    }

    let _path = `$..${_childrenName}[:]`;
    _list = JSONPath({json: _list, path: _path,});
    // console.log('__list',JSON.stringify(__list))
    // console.log('_list',_list.length)
    sectionData.value.list = _list;
}


const tableList = ref([])
// tableList.value = props.list
// setListConfig()

const setTable = debounce(() => {
    tableList.value = props.list;
    setListConfig()
}, 100)

watch(() => props.list, () => {
    setTable()
}, {
    deep: true,
    immediate: true
})


// const tableListCOM = computed(() => {
//     const _list = props.list;
//     setListConfig()
//     return _list
// })


// <!--selection / index / expand / settings -->

let _tableIndexDefault = {
    label: "序号",
    key: "",
    type: "index",
    width: 60,
    fixed: 'left',
    showOverflowTooltip: true,
}
let _tableSelectionDefault = {
    label: "选项",
    key: "",
    type: "selection",
    fixed: 'left',
    align: "center",
    width: 40,

}
let _tableExpandDefault = {
    label: "展开",
    key: "",
    type: "expand",
    fixed: 'left',
    width: 60,
}
let _tableSettingsDefault = {
    label: "设置",
    key: "",
    type: "settings",
    fixed: 'right',
    align: "center",
    isShow: false,
    buttonList: [
        {
            name: "详情",
            key: "detail",
            type: 'button',
        },
        {
            type: "dropdown",
            trigger: "click", // hover/click/contextmenu
            placement: "bottom-start",
            teleported: true,//top/top-start/top-end/bottom/bottom-start/bottom-end
            list: [
                {
                    name: "修改",
                    key: "edit"
                },
                {
                    name: "删除",
                    key: "delete"
                },

                {
                    name: "设置",
                    key: "delete",
                    divided: true,
                }
            ]
        }
    ]
}


const tableKeyList = ref([])

const setKeyList = debounce(() => {

    console.log('keyListCOM', props)
    console.log('props.keyList', props.keyList)
    let _keyList = JSON.parse(JSON.stringify(props.keyList)) || []; // JSON.parse(JSON.stringify(props.keyList));
    console.log('_keyList', _keyList)
    let _settingsConfig = JSON.parse(JSON.stringify(props.settingsConfig))
    let _isShowExpand = props.isShowExpand;
    let _isShowSelection = props.isShowSelection;
    let _isShowIndex = props.isShowIndex;

    let _tableExpand = _tableExpandDefault;
    let _tableSelection = _tableSelectionDefault;
    let _tableIndex = _tableIndexDefault;


    let _tableSettings = {
        ..._tableSettingsDefault, // 默认
        ..._settingsConfig,
        type: "settings",
    };
    // _tableSettings?.buttonList?.map(item => {
    //     if (!item.type) { // type 为空时
    //         item.type = 'button'
    //     }
    //     if (item.text === true || item.text === false) {
    //
    //     } else {
    //         item.text = true;
    //     }
    //
    //
    //     if (item.type === 'dropdown') {
    //         //  table里 为false 不显示
    //         item.teleported = true;
    //     }
    // })


    if (!_isShowExpand) {
        _tableExpand = ''
    }
    if (!_isShowSelection) {
        _tableSelection = ''
    }
    if (!_isShowIndex) {
        _tableIndex = ''
    }
    if (!_tableSettings.isShow) {
        _tableSettings = ''
    }


    _keyList = [
        _tableSelection,
        _tableExpand,
        _tableIndex,
        ..._keyList,
        _tableSettings
    ].filter(item => item !== '')


    // 每一列加上 不重复key ， 用于视图刷新正常
    _keyList = _keyList?.map(item => {
        item.$key = Symbol()
        return item;
    })
    _keyList = JSON.parse(JSON.stringify(_keyList))
    // console.log(_keyList);
    tableKeyList.value = _keyList;
    return _keyList
}, 100)


// const watchList = [
//     ()=>props.keyList,
//     ()=>props.settingsConfig,
//     ()=>props.isShowExpand,
//     ()=>props.isShowSelection,
//     ()=>props.isShowIndex,
// ]
watch([
    () => props.keyList,
    () => props.settingsConfig,
    () => props.isShowExpand,
    () => props.isShowSelection,
    () => props.isShowIndex,
], (watchList, preWatchList) => {
    console.log('watchList', watchList)
    setKeyList()
}, {
    deep: true,
    immediate: true,
})


const tableSectionButtons = ref([]);


const _deleteButton = {name: "删除", key: "delete", class: "", icon: "delete",}

const setTableSectionButtons = debounce(() => {


    let _sectionButtons = props.sectionButtons || []
    _sectionButtons = JSON.parse(JSON.stringify(_sectionButtons));
    // console.log('_sectionButtons', _sectionButtons)
    const _deleteIndex = _sectionButtons?.findIndex(item => item.key === 'delete')
    // console.log('_deleteIndex', _deleteIndex)
    if (_deleteIndex > -1) {
        _sectionButtons[_deleteIndex] = {
            ..._deleteButton,
            ..._sectionButtons[_deleteIndex],
        };
    } else {
        _sectionButtons = [
            ..._sectionButtons
        ]
    }
    _sectionButtons?.map(item => {

        // 默认为 true  除非直接设置 为false 否者都为true
        item.text = item.text !== false
    })


    tableSectionButtons.value = _sectionButtons;


}, 100)


watch(() => props.sectionButtons, (sectionButtons) => {
    setTableSectionButtons()
}, {
    deep: true,
    immediate: true,
})


//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits([
    'onSettingsButtonClick', 'onSwitchChange',
    'selectionChange', 'onSection',
    'sortChange', 'filterChange'
]);


const headerRowClassNameFN = (data) => {
    // console.log('headerRowClassNameFN',data,_temKeyList)
    const _column = data?.column || {};

    if (_column?.sortable) {
        const _colKey = _column.property
        // sortOrders ['ascending', 'descending', null]
        const _sortOrders = _column.sortOrders;
        const _sortMap = props.sortMap;
        // console.log('_sortMap',_sortMap)
        if (Object.prototype.toString.call(_sortMap) === '[object Object]') {
            Object.keys(_sortMap)?.map(key => {
                const _key = key;
                if (_key === _colKey) {
                    // _sortOrders
                    const _keyOrder = _sortMap[_key]?.toLowerCase() || null;
                    const index = _sortOrders.findIndex(item => item?.indexOf(_keyOrder) > -1)
                    _column.order = _sortOrders?.[index] || ""
                }

            })
        }
        if (Array.isArray(_sortMap)) {
            _sortMap?.map(item => {
                const _key = item?.key;
                const _keyOrder = item?.order?.toLowerCase() || null;
                if (_key === _colKey) {
                    // _sortOrders
                    const index = _sortOrders.findIndex(item => item?.indexOf(_keyOrder) > -1)
                    _column.order = _sortOrders?.[index] || ""
                }

            })
        }
    }

    let _strClass = ''
    let _headerCellClassName = props.headerCellClassName;


    if (typeof (_headerCellClassName) == 'string') {
        _strClass = `${_strClass} ${_headerCellClassName}`
    }
    if (typeof (_headerCellClassName) == 'function') {
        _strClass = `${_strClass} ${_headerCellClassName(data)}`
    }


    return _strClass
}

const headerCellStyleFN = (data) => {
    const {row, column, rowIndex, columnIndex} = data;

    let _style = {
        display: 'table-cell',
    }
    // 用于 选中状态的界面修改
    const _sectionData = sectionData.value
    const _isShowSelection = props.isShowSelection;
    const _isHiddenSectionButtons = props.isHiddenSectionButtons
    if (_isShowSelection && !_isHiddenSectionButtons) {
        // console.log('data,',data, )
        // console.log('_sectionData,',_sectionData?.selection?.length, )

        if (_sectionData?.selection?.length > 0) {

            const _sectionIndex = row?.findIndex(item => item.type == "selection")
            // 第一列为选项框 和 标题这一行
            if (row[0]?.type === 'selection' && rowIndex === 0) {
                // console.log('row,',row, )
                // console.log(' column', column, )
                // console.log('rowIndex',rowIndex)
                // console.log(' columnIndex', columnIndex)
                //expand / selection / index / settings / time


                // 选项框这一列 和 后面这一列不隐藏
                // 后面这一列合并到最后
                if (!(column.type === 'selection' || columnIndex === 1)) {

                    console.log('取消进入了么')
                    _style = {
                        display: 'none',
                    }
                }

                let _selectionWidth = `${row?.[0]?.width}px`

                if (columnIndex === 1) {
                    _style = {
                        position: 'absolute',
                        left: `${_selectionWidth}`,
                        width: `calc(100% - ${_selectionWidth} )`,
                        display: 'flex',

                    }
                }
                //
                row[1].fixed = "left"
                row[1].colSpan = row.length
            }

        } else {
            // console.log('没选择-----------')
            _style = {
                display: 'table-cell'
            }
            row[1].fixed = ""
            row[1].colSpan = 1
        }


    }


    return _style;

}


const goTo = (key, data) => {
    // console.log(key, data);

    if (key == 'sortChange') {
        // console.log(key, data);
        emits('sortChange', data)
    }
    if (key == 'filterChange') {
        // console.log(key, data);
        emits('filterChange', data)

    }


    if (key == 'selectionChange') {
        // console.log(key, data);
        getSelection && getSelection()
        emits('selectionChange', data);
    }
    if (key == 'onSection') {
        emits('onSection', data)
    }


    if (key == 'onSwitchChange') {
        emits('onSwitchChange', data)
    }
    if (key == 'onSettingsButtonClick') {
        emits('onSettingsButtonClick', data)

    }
}


// 接口请求方法放这
const init = () => {
    //getList();

}


// 统一执行初始化方法
init();

const getSelection = () => {
    const _selection = tableModelRef.value?.getSelectionRows()
    // console.log('_selection',_selection)
    sectionData.value.selection = _selection
    return _selection;
}

const getRef = () => {
    // console.log('_componentInfo?.value?.ref',)
    return tableModelRef?.value;
};

const clearSelection = () =>{
    tableModelRef.value?.clearSelection()
    sectionData.value.selection = []
    return []
}


defineExpose({
    getRef,
    getSelection,
    clearSelection
})


</script>

<style scoped lang="less">

.table-model {
  :deep(.el-table__header) {
    .el-table-column--selection.el-table__cell + .el-table__cell {
      .cell {
        width: 100%;
      }
    }
  }
}


</style>