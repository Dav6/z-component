<!--
  author: 戴伟
  date: 017 2022/11/17 16:10:52
  file: src\example\formModal\index.vue
  des:
    do.....
-->

<template>
    <div class="form-model">
        <d-form-model

                ref="addEditFormRef"
                :statusIcon="true"
                labelWidth="8em"
                :formList="formList"
                :buttonList="buttonList"
                :rules="rules"
                :options="mapOptions"
                :isButtonsRow="true"
                labelPosition="left"
                :uploadFileAPI="uploadFileAPI"
                @onSubmit="(data)=>goTo('onSubmit', data)"
                @onClick="data=>goTo('onClick', data)"
                @onChange="(data) => { goTo('onChange', data) }"
                @onFormItemButtonClick="(data)=>{goTo('onFormItemButtonClick', data)}"
                @onInputSearch="data=>goTo('onInputSearch',data)"
        >
            <template #imagePre="imagePre">
                <div style="white-space: pre-wrap">
                    <code>
                        {{ imagePre.data.value }}
                    </code>

                </div>

            </template>

             <template #labelCustom="data">
                 <div>
                     自定义label {{data.data.label}}
                 </div>
             </template>

            <template #test="test">
                <!-- {{  images  }} -->
                <div>
                    {{ test }}
                </div>
            </template>
            <template #test1="test">
                <!-- {{  images  }} -->
                <div>
                    {{ test }}
                </div>
            </template>
            <template #test112="data">
                test112
            </template>


        </d-form-model>

        <el-affix position="bottom" :offset="30">
            <el-button @click="goTo('cancel')">清空</el-button>
            <el-button type="primary" @click="goTo('confirm')">确定</el-button>
            <el-button type="primary" @click="goTo('scroll')">确定跳转</el-button>

        </el-affix>

    </div>
</template>

<script setup>
import dayjs from "dayjs";

defineOptions({
    name: "表单案例-checkbox",
    key: 'example-form-model-checkbox',
    isExposed: false
});
import {ref, h, reactive, computed, watch, inject} from "vue"

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

//watch(
//  () => props, (newValue, oldValue) => {
//    //console.log('newValue', newValue);
//    //console.log('oldValue', oldValue);
//    // defaultActive = newValue.path;
//
//  },
//   {immediate: true}
//);
const test = ref();

const buttonList = ref([
    {name: "重置", key: "reset",},
    {name: "查询", key: "search", type: 'primary'}

])
const rules = ref({
    '1.value': [
        {
            validator: (rule, value, callback) => {
                console.log('1.value', value)
                if (value < 50) {
                    return callback(new Error('值要大于50'))
                }

                callback();
            }, trigger: 'blur'
        }
    ]
})


const options = ref({})

const uploadFileAPI = (file) => {
    return new Promise((resolve, reject) => {
        console.log(file)
        const _obj = {
            url: "http://img.likebizhi.com/uploads/likebizhi/up/2022/10/bfd3a04549c751eba445faaf0c9eefb1704.jpg",
            key: "123123",
        }

        resolve(_obj)
    })
}


let mapOptions = {
    radioOptions: [
        {
            label: "选项1",
            value: 1,
        },
        {
            label: "选项2",
            value: 2,
        },
    ],
    test11111: [
        {
            label: "选项1",
            value: 1,
        },
        {
            label: "选项2",
            value: 2,
        },
    ],
    checkboxText: [
        {
            label: "选项1",
            value: 1,
        },
        {
            label: "选项2",
            value: 2,
        },
    ],
    cascaderOptions: [
        {
            label: "选项cascader1",
            value: 1,
            children: [
                {
                    label: "选项1",
                    value: 1.1,
                    children: []
                },
                {
                    label: "选项2",
                    value: 1.2,
                },
                {
                    label: "选项3",
                    value: 1.3,
                },
                {
                    label: "选项4",
                    value: 1.4,
                },
            ]

        },
        {
            label: "选项cascader2",
            value: 2,
        },
    ]
}

mapOptions = [
    {
        label: "选项1全局数组",
        value: 1,
    },
    {
        label: "选项2全局数组",
        value: 2,
    },
]

const formList = ref([


    {
        name: "多选项",
        key: "checkbox1",
        value: [1,2,3,4],
        placeholder: "请选择选项",
        disabled: false,
        formType: "checkbox",
        isCheckedAll:true,
        span: 6,
        rules: [{required: true, message: "请选择选项", trigger: "blur"}],
        optionLabelWidth: "4em",
        options: [
            {
                label: "选项1",
                value: 1,
            },
            {
                label: "选项2",
                value: 2,
            },
            {
                label: "选项33",
                value: 3,
            },
            {
                label: "选项44",
                value: 4,
            },
        ]
    },
    {
        name: "多选项",
        key: "checkbox2",
        value: '',
        placeholder: "请选择选项",
        disabled: false,
        formType: "checkbox",
        span: 6,
        rules: [{required: true, message: "请选择选项", trigger: "blur"}],
        optionLabelWidth: "3em",
        options: []
    },
    {
        formType: "divider",
        span: 24,
    },
    {
        name: "多选项",
        key: "checkbox3",
        value: [2, 3],
        placeholder: "请选择选项",
        disabled: false,
        isRadioBorder: true,
        formType: "checkbox",
        optionLabelWidth: "3em",
        span: 12,
        rules: [{required: true, message: "请选择选项", trigger: "blur"}],
        options: [
            {
                label: "选项1",
                value: 1,
            },
            {
                label: "选项2",
                value: 2,
            },
            {
                label: "选项3333",
                value: 3,
            },
            {
                label: "选项4444",
                value: 4,
            },
        ]
    },


])


const addEditFormRef = ref(null);
const goTo = (key, data) => {
    console.log('example-formModel', key, data, formList.value);
    if (key === 'onInputSearch') {
        console.log('onInputSearch', data);
    }

    if (key === 'cancel') {
        addEditFormRef.value.formModelRef.clearValidate();
    }
    if (key === 'confirm') {

        console.log('confirm-getFormDataByNoHidden',addEditFormRef.value.getFormDataByNoHidden())
        console.log('confirm-getFormData',addEditFormRef.value.getFormData())
        console.log('confirm-getFormData-false',addEditFormRef.value.getFormData(false))
        addEditFormRef.value.formModelRef.validate((valid, invalidFields) => {
            console.log('invalidFields', valid, invalidFields)
            if (valid) {

            }
        })


    }
    if (key === 'onSubmit') {
        console.log(data);
    }
    if (key === 'onClick') {
        console.log(data);

    }

    if (key === 'scroll') {
        console.log()
        console.log(addEditFormRef.value.scrollToField([55, 'value'].join('.')))

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

.form-model {
  //height:300vh;
  //background:red;
  width: calc(100% - 24px);
    overflow-y:auto ;
    height:90vh;
  .formRowClassTest {
    background: red;
  }
}
</style>