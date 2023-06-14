<!--
  author: 戴伟
  date: 015 2022/12/15 11:14:19
  file: src\components\form\d-el-input.vue
  des:
    do.....
-->

<template>


    <el-tabs v-model="modelValue"
             class="form-tabs"
             :class="{isActive:isActive}"
             @tab-change="data=>goTo('change',data)"
    >
        <template v-for="(item,index) in optionsCOM" :key="index">
            <el-tab-pane  :label="item.label"
                          :disabled="item.disabled" :name="item.value">
                <template #label >
                    <div class="form-tabs-label">{{item.label}}</div>
                </template>
            </el-tab-pane>

        </template>


    </el-tabs>
</template>

<script setup>
defineOptions({
  name: 'd-el-tabs',
});
import {ref, reactive, computed, watch} from "vue"


const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String, Boolean, Number, Object, Array],
  },
    data: {
        type: [Object],
    },
    options:{
        type:[Array]
    }
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(["update:modelValue","change"]);
const modelValue = computed({ // 重新定义
  get: () => props.modelValue ,
  set: (value) =>  emits("update:modelValue", value),
})
const isActive = ref(false)
const optionsCOM = computed(() => {
    let _options =  [];
    const _data = props.modelValue;
    if(props.options?.length > 0){
        _options = props.options
    }
    //  最终取 data 里的options
    if(props.data?.options?.length > 0){
        _options = props.data?.options
    }
    isActive.value = false;
    _options?.map(item=>{
        if(item.value === _data){
            isActive.value = true;
        }
    })


    return _options
})



const goTo = (key, data) =>{
    console.log('key',key,data)
    if(key ==='change'){
        emits('change',{data: data})
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
.form-tabs{
    --el-tabs-header-height:24px;
    --text-padding-lr:5px;
    --el-tabs-active-color:#fff;

    :deep(.el-tabs__header){
        margin:0;

        .el-tabs__nav-prev,.el-tabs__nav-next{
            line-height:var(--el-tabs-header-height)
        }



        .el-tabs__nav-wrap{
            border-radius:999px;
            padding: 4px;
            box-shadow: 0px 2px 4px 0px rgba(63,140,255,0.26);
            &:after{
                height: 100%;
                background: rgba(72,134,255,0.1);
                border-radius: 12px;
            }




        }

        .el-tabs__nav-scroll{
            overflow: unset;
            //width: 100%;
        }

        .el-tabs__nav{
            line-height:var(--el-tabs-header-height);
            height:var(--el-tabs-header-height);
            white-space: nowrap;
        }




        .el-tabs__active-bar{
            //&:after{
            //    content:" ";
            //    display: inline-block;
            //    font-size: var(--el-font-size-base);
            //    font-weight: 500;
            //
            //}
            height:var(--el-tabs-header-height);

            //padding:0 var(--text-padding-lr);
            //left:calc( var(--text-padding-lr) * -1 );
            border-radius:999px;
            background: linear-gradient(180deg, #53A4FD 0%, #4886FF 100%);
            box-shadow: 0px 6px 12px 0px rgba(63,140,255,0.26);
            //max-width:86px;
            opacity: 0;
        }

        .el-tabs__item{
            z-index:5;
            padding:0;
            text-align: center;
            color: var(--el-text-color-primary);

            &.is-active{
                color:var(--el-tabs-active-color);
            }
        }
        .form-tabs-label{
            box-sizing: border-box;
            padding:0 var(--text-padding-lr);
            width:86px ;
            transition: color .22s ease-in-out;
            overflow: hidden;
            text-overflow: ellipsis;
        }




    }




    &.isActive{
        :deep(.el-tabs__header){

            .el-tabs__active-bar{
                opacity: 1;
            }
        }
    }


}

</style>