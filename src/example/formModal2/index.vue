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
                :formData="formData"
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
            <el-button type="primary" @click="goTo('scroll')">确定-scroll</el-button>

        </el-affix>

    </div>
</template>

<script setup>
import dayjs from "dayjs";

defineOptions({
    name: "表单案例2",
    key: 'example-form-model-2',
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
        labelWidth: "0",
        name: "",
        key: "",
        value: "",
        formType: "",
        placeholder: "请输入",
        disabled: false,
        span: 0,
        clearable: true,
        childrenSpan: 18,
        formRowClass: "row-info",
        children: [
            {
                name: "按钮滑块", key: "tabs", value: 2,   placeholder: "按钮滑块",
                formType: "tabs",
                span: 24,
                rules: [{required: true, message: "请输入按钮滑块", trigger: "blur"}],
                options: [
                    {
                        label: "User",
                        value: 1,
                    },
                    {
                        label: "Config",
                        value: 2,
                        disabled:true,
                    },
                    {
                        label: "Role",
                        value: 3,
                    },
                    {
                        label: "User1231231",
                        value: 4,
                    },
                ]


            },

            {

                name: "多选",
                key: "isRadio",
                value: "",
                placeholder: "请选择是否多选",
                disabled: false,
                formType: "radio",
                span: 24,
                rules: [{required: true, message: "请选择是否多选", trigger: "blur"}],
                options: [
                    {
                        label: "是",
                        value: 0,
                    },
                    {
                        label: "否",
                        value: 1,
                    },
                ],
            },
            {
                name: "数字", key: "number", value: "1", placeholder: "数字", disabled: false,
                formType: "inputNumber",
                controls: false,
                textAlign: "left",
                clearable: true,
                unit: "次/分",
                min: 0,
                max: "",
                span: 12,
                rules: [
                    {required: false, message: "请输入数字", trigger: "blur"},
                    {
                        validator: function (rule, value, callback) {
                            console.log('value', value);

                            // if (value != formData["password"]) {
                            //     return callback(new Error("两次密码不一样"));
                            // }


                            return true;
                        }, trigger: 'blur'
                    }
                ],

            },
            {
                name: "车牌信息",
                key: "info",
                value: "555",
                formType: "input",
                placeholder: "请输入中英文",
                disabled: false,
                span: 12,
                rules: [{required: true, message: "请输入人员名称", trigger: "blur"}],
                clearable: true,
            },
            {
                name: "车主姓名",
                key: "name",
                value: "",
                formType: "input",
                placeholder: "请输入中英文",
                disabled: false,
                span: 12,
                rules: [{required: true, message: "请输入人员编号", trigger: "blur"}],

                clearable: true,


            },
            {
                name: "车牌颜色",
                key: "licensePlateColor",
                value: "",
                formType: "select",
                placeholder: "请选择性别",
                disabled: false,
                span: 12,
                rules: [{required: true, message: "请选择性别", trigger: "blur"}],
                options: [],
                clearable: true,
            },
            {
                name: "车辆颜色",
                key: "carColor",
                value: "",
                formType: "select",
                placeholder: "请选择性别",
                disabled: false,
                span: 12,
                rules: [{required: true, message: "请选择性别", trigger: "blur"}],
                options: [],
                clearable: true,
            },
            {
                name: "车辆类型",
                key: "carType",
                value: ["小型汽车"],
                formType: "select",
                placeholder: "请选择性别",
                multiple: true,
                disabled: false,
                span: 12,
                rules: [{required: true, message: "请选择性别", trigger: "blur"}],
                options: [
                    {label: "小型汽车", value: "小型汽车"},
                    {label: "SUV", value: "SUV"},
                    {label: "大型汽车", value: "大型汽车"},
                    {label: "小型卡车", value: "小型卡车"}
                ],
                clearable: true,
            },
            {
                name: "车辆品牌",
                key: "carBrand",
                value: "",
                formType: "select",
                placeholder: "请选择性别",
                disabled: false,

                span: 12,
                rules: [{required: true, message: "请选择性别", trigger: "blur"}],
                options: [],
                clearable: true,
                buttonList: [
                    {
                        name: "",
                        class: "dividerButton optionButton add",
                        icon: "Plus",
                        type: "primary",
                        key: "add",
                        isText: false
                    },
                    {
                        name: "",
                        class: "dividerButton optionButton delete",
                        icon: "Delete",
                        type: "danger",
                        key: "delete",
                        isText: false
                    },
                ]
            },

            {
                name: "隐藏数据",
                key: "hidden",
                value: "",
                formType: "input",
                placeholder: "请输入中英文",
                disabled: false,
                span: 12,
                rules: [{required: true, message: "请输入人员编号", trigger: "blur"}],
                isHidden: true,
                clearable: true,


            },

        ]
    },
    {
        labelWidth: "0",
        name: "",
        key: "",
        value: "",
        formType: "",
        placeholder: "请输入",
        disabled: false,
        span: 0,
        clearable: true,
        childrenSpan: 6,
        marginBottom: "12px",
        children: [
            {
                marginTop: 10,
                labelWidth: "2em",
                name: "",
                key: "faceImg",
                limit: 1,
                value: "",
                formType: "avatarUpload",
                size: "80 80",
                borderRadius: "50%",
                accept: "image/png,image/jpeg,image/jpg",
                buttonName: "上传车辆照片",
                disabled: false,
                span: 24,
                rules: [{required: true, message: "上传车辆照片", trigger: "blur"}],
                clearable: true,
            },


        ]
    },
    {
        name: "人员头像",
        key: "image",
        limit: 2,
        disabled: false,
        formType: "imageVideoUpload",
        span: 24,
        accept: "image/jpeg,image/jpg",
        previewTeleported: true,
        rules: [{required: true, message: "请上传图片", trigger: "blur"}],
        value: []
    },
])


const formData = ref({
    info: "信息",
    carBrand: "车品牌",
    carColor: "车颜色",
    carType: "",
    faceImg: "http://img.likebizhi.com/uploads/likebizhi/up/2022/10/bfd3a04549c751eba445faaf0c9eefb1704.jpg",
    hidden: "隐藏",
    licensePlateColor: "车牌颜色",
    name: "名称",
})

formData.value = {
    tabs:1,
}
setTimeout(() => {
    formData.value = {
        info: "信息1",
        carBrand: "车品牌1",
        carColor: "车颜色1",
        carType: ["小型汽车", "SUV"],
        faceImg: "http://img.likebizhi.com/uploads/likebizhi/up/2022/10/bfd3a04549c751eba445faaf0c9eefb1704.jpg",
        hidden: "隐藏3",
        licensePlateColor: "车牌颜色4",
        name: "名称5",
        number: "555",
        image: [
            "http://img.likebizhi.com/uploads/likebizhi/up/2022/10/bfd3a04549c751eba445faaf0c9eefb1704.jpg"
        ],
        tabs:"",

    }

    const _data = {
        name: "车牌颜色_data",
        key: "cs",
        value: "555",
        formType: "input",
        placeholder: "请选择性别",
        disabled: false,
        span: 12,
        rules: [{required: true, message: "请选择性别", trigger: "blur"}],
        options: [],
        clearable: true,

    }
    formList.value[0]['children'].push(_data)
    formList.value[0]['children'].push(_data)


}, 10)


const addEditFormRef = ref(null);
const goTo = (key, data) => {
    console.log('example-formModel2', key, data, formList.value);
    if (key === 'onInputSearch') {
        console.log('onInputSearch', data);
    }

    if (key === 'cancel') {
        addEditFormRef.value.formModelRef.clearValidate();
    }
    if (key === 'confirm') {

        // console.log('getFormDataByNoHidden',addEditFormRef.value.getFormDataByNoHidden())
        console.log('getFormData-all', addEditFormRef.value.getFormData())
        console.log('getFormData-noHidden', addEditFormRef.value.getFormData(false))
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

  .formRowClassTest {
    background: red;
  }
}
</style>