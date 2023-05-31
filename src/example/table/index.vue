<!--
  author: 戴伟
  date: 020 2022/12/20 11:35:52
  file: src\example\table\index.vue
  des:
    do.....
-->

<template>
    <Component
            ref="formModelRef"
            is="d-table-model"
            :list="list"
            :keyList="keyList"
            :option="optionsMap"
            :pageData="pageData"
            :isShowExpand="isShowExpand"
            :isShowSelection="isShowSelection"
            :isShowIndex="isShowIndex"
            :isShowSettings="isShowSettings"
            :settingsConfig="settingsConfig"
            :selectable="selectable"
            :beforeSwitchChange="beforeSwitchChange"
            :header-cell-class-name="headerRowClassNameFN"
            :filters="globalFilters"
            :filterMethod="globalFilterMethod"
            :sortMap="sortMap"
            :sectionButtons="sectionButtons"

            :row-key="'id'"
            height="100%"
            @selection-change="data=>goTo('selectionChange',data)"
            @select="(selection, row)=>goTo('select',{selection, row})"
            @select-all="(selection, row)=>goTo('selectAll',{selection, row})"
            @onSettingsButtonClick="(data)=>goTo('onSettingsButtonClick',data)"
            @onSection="data=>goTo('onSection',data)"
            @sortChange="data=>goTo('sortChange',data)"
            @filterChange="(data)=>goTo('filterChange',data)"


            v-bind="$attrs"

    >
        <template #expand="{data}">
            <!-- {{  images  }} -->
            <div>
                {{ data?.row }}
            </div>
        </template>

        <template #test="{data}">
            <!-- {{  images  }} -->
            {{ data?.row }}

        </template>


    </Component>
</template>

<script setup>
import dayjs from "dayjs";

defineOptions({
    name: "表格table",
    key: 'example-table',
    isExposed: false
});
import {ref, reactive, computed, watch} from "vue"
import {randomNum} from "@/tools/tools"

const props = defineProps({
    // 配合emits v-model
    modelValue: {
        type: [String, Boolean],
    },
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits([]);

const defaultCOM = computed(() => {
    return '';
});




const sectionButtons = ref([
    {name: "导入", key: "import",class:"import",  icon:"",},
    {name: "导出", key: "export",class:"export", icon:"",}
])




const globalFilters = ref({
    company: []
})

setTimeout(() => {
    console.log('set')
    globalFilters.value.company = [
        {text: '111', value: '111'},
        {text: '555', value: '555'},
    ]
}, 2000)

const globalFilterMethod = ref({
    // company: (value, row, column) => {
    //   console.log(value, row, column)
    // }
})
// setTimeout(()=>{
//   console.log('set')
//   globalFilterMethod.value.company = (value, row, column) =>{
//     console.log(value,row,column)
//   }
// },2000)


const optionsMap = ref({
    option1: []
})

setTimeout(() => {
    optionsMap.value.option1 = [
        {label: "选项1", value: 1},
        {label: "选项2", value: 2},
        {label: "选项3", value: 3},
    ]
    optionsMap.value.option1 = {
        1: "选项1",
        2: "选项2",
        3: "选项3",
    }
}, 2000)


const keyList = ref([
    {label: "id", width: 50, key: "id", showOverflowTooltip: true},
    {
        label: "设备名称", key: "deviceName", showOverflowTooltip: true,
        width: 120,
        sortable: 'custom',
    },
    {
        label: "公司", key: "company", showOverflowTooltip: true,
    },
    {
        label: "选项1", key: "option1", type: "option", showOverflowTooltip: true,


    },

    {
        label: "选项2", key: "option2", type: "option", showOverflowTooltip: true,
        // option:[],
        option:[
          {label: "选项111", value: 1},
          {label: "选项2222", value: 2},
          {label: "选项33333", value: 3},
        ],
        multiple:true,
        // option: {
        //     1: "选项12",
        //     2: "选项23",
        //     3: "选项34",
        // }
    },
    {
        label: "时间", type: "time", format: 'YYYY-MM-DD HH:mm:ss', key: "createTime", showOverflowTooltip: true,
        width: 200,
        sortable: true,
        // sortMethod:(a,b)=>{
        //   // return a.createTime - b.createTime;
        // }
        // sortBy:'recordId'
    },
    {
        label: "状态", type: "switch", key: "status",
        showOverflowTooltip: false,
        filters: [
            {label: 'Home', value: 'Home'},
            {label: 'Office', value: 'Office'},
        ],
        filterMultiple: true,
        filterMethod: (value, row, column) => {
            console.log('keyList-filterMethod', value, row, column)
            return true;
        },
    },
    {label: "图片", type: "image", key: "image", size: "24 24", width: 100, limit: 5, showOverflowTooltip: false},
    {label: "自定义", type: "custom", customName: "test", key: "personnelRoleName", showOverflowTooltip: true},

])
//item.format : 'YYYY-MM-DD HH:mm:ss'"


const settingsConfig = ref({
    label: "设置",
    fixed: 'right',
    type: '123123',
    align: "center",
    width: 200,
    isShow: true,
    divided: true,
    buttonList: [
        {
            name: "编辑",
            key: "edit",
            type: 'button',
        },
        {
            name: "详情",
            key: "detail",
        },
        {
            name: "更多",
            type: "dropdown",
            trigger: "click", // hover/click/contextmenu
            placement: "bottom-start",
            teleported: false,//top/top-start/top-end/bottom/bottom-start/bottom-end
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
})


const isShowExpand = ref(true);
const isShowSelection = ref(true)
const isShowIndex = ref(true)
const isShowSettings = ref(true)
// setTimeout(()=>{
//   // isShowExpand.value = true
//   isShowSelection.value = true
// },2000)
// setTimeout(()=>{
//   // isShowExpand.value = true
//   isShowSelection.value = true
// },4000)
// setTimeout(()=>{
//   // isShowExpand.value = true
//   isShowIndex.value = true
// },6000)
// setTimeout(()=>{
//   // isShowExpand.value = true
//   isShowSettings.value = true
// },8000)


const pageData = ref({
    page: 1,
    pageSize: 20,
})
const image = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2Fv2-93dd36bf20dad23a01a51698733ed306_r.jpg%3Fsource%3D1940ef5c&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1674282885&t=f05370c806711f9117370dd745bb0d19'

const list = ref([])
list.value = Array(20).fill({})?.map((item, index) => {
    const _item = {}
    keyList.value?.map(cItem => {
        // console.log(cItem);
        let _value = `测试${randomNum(10, 200)}`
        if (cItem.key === 'id') {
            _value = index + 1
        }

        if (cItem.key === 'deviceName') {
            _value = `设备名称${randomNum(100, 2000)}`
        }
        if (cItem.key === 'company') {
            _value = `公司名称${randomNum(100, 2000)}`
        }

        if (cItem.key === 'option1') {
            _value = randomNum(1, 3)
        }
        if (cItem.key === 'option2') {
            _value = [randomNum(1, 3),randomNum(1, 3)].join(',')
        }

        if (cItem.key === 'createTime') {
            _value = dayjs().valueOf() + randomNum(1000, 100000)
        }


        if (cItem.key === 'status') {
            if (index % 3 === 0) {
                _value = true
                _item.selectable = true;
            } else {
                _value = false
                _item.selectable = false;
            }
        }


        if (cItem.key === 'image') {
            if (randomNum(0, 100) % 3 === 0) {
                // _value = image
                _value = Array(randomNum(1, 4)).fill({})?.map(item => {
                    return image
                })

            } else {
                _value = ""
            }

        }




        _item[cItem.key] = _value

    })
    if (randomNum(0, 100) % 3 === 0) {
        // _value = image
        _item['isHiddenSettings'] = true
    } else {
        _item['isHiddenSettings'] = false
    }

    if (randomNum(0, 100) % 6 === 0) {
        // _value = image
        _item['isHiddenSwitch'] = true
    } else {
        _item['isHiddenSwitch'] = false
    }


    return _item;
})


list.value?.map((item, index) => {
    if (index % 3 == 0) {
        item.status = true
        item.selectable = true;
    } else {
        item.status = false
        item.selectable = false;
    }
})

const selectable = (row, index) => {
    // console.log('selectable',row,index)
    return false;//|| row.selectable

}

const headerRowClassNameFN = (data) => {
    // console.log('headerRowClassNameFN-外')

    return ''
}


const beforeSwitchChange = (data) => {
    console.log('beforeSwitchChange', data)
    return false;
    return new Promise((resolve, reject) => {
        // resolve(true)
        // reject(false)
    })
}

const sortMap = ref([])


const goTo = (key, data) => {
    console.log(key, data);
    if (key === 'sortChange') {
        const _key = data?.prop;
        const _order = "";//|| data?.order;
        // 对象写法
        // sortMap.value[_key] = _order;
        console.log('sortMap', sortMap)


        // 数组写法

        const isHave = sortMap.value.findIndex((item,index) => {
            let _isHave = false;
            if (item?.key === _key) {

                item['order'] = _order

                _isHave = true;
            }
            return _isHave;
        })
        if(!(isHave >=0)){
            sortMap.value.push({
                key:_key,
                order:_order
            })
        }



    }
    if (key == 'onSection') {

    }
    if (key == 'onSettingsButtonClick') {
        console.log(data?.data.deviceName)
        data.data.deviceName = 3000
    }
}

const formModelRef = ref()

// setTimeout(() => {
//   console.log('formModelRef', formModelRef.value.getRef());
//   console.log('list', list);
//   console.log('formModelRef', formModelRef.value.getRef()?.toggleRowSelection(list.value[0], undefined));
// }, 1000)


// 接口请求方法放这
const init = () => {
    //getList();

}

// 统一执行初始化方法
init();


</script>
<style lang="less">
.el-table thead {
  --el-table-header-bg-color: #F5F6FA;

  .el-table__cell {
    height: 54px;
    overflow: hidden;
  }

}
</style>
<style scoped lang="less">

</style>