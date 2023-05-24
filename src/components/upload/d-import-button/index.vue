<!--
  @Author: 戴伟
  @Date: 2023-04-23 14:18:58
  @FilePath: src\components\global\g-import-export-button\index.vue  
  @LastEditTime: ''
  @LastEditors: ''
  @Description: 
        do.....
-->
<template>
    <d-el-button
        class="default-width"
        type="primary"
        plain
        @click="goTo('import')"
        v-bind="$attrs"

    >{{ name }}</d-el-button>
    <d-el-dialog
            v-model="isShow"
            :before-close="(done) => goTo('close', '')"
            :title="title"
            :append-to-body="true"
            width="480px"
    >
        <el-upload
                class="import-upload"
                :class="{'have':fileData?.uid}"
                ref="importUploadRef"
                drag
                v-model:file-lis="fileList"
                :http-request="uploadFile"
                :accept="accept"
                :on-change="onChange"
                :before-upload="beforeUpload"
                :multiple="multiple"
                :limit="limit"
                :on-exceed="onExceed"
                :show-file-list="false"
                :auto-upload="false"
        >
            <!--      <el-icon class="el-icon&#45;&#45;upload"><upload-filled /></el-icon>-->
            <div class="import-upload-image-box" >
                <d-el-image
                        class="import-upload-image"
                        :src="fileData?.uid?haveFileIcon :defaultIcon" size="100% 100%"
                ></d-el-image>
            </div>

            <div class="el-upload__text">
                {{ fileData?.name ? fileData?.name : '点击或将文件拖拽到这里上传' }}
            </div>

            <template #tip>
                <!--        <div class="el-upload__tip">-->
                <!--          jpg/png files with a size less than 500kb-->
                <!--        </div>-->
                <div class="import-upload-tip">
                    <d-el-image
                            class="import-upload-tip-icon"
                            :src="downloadIcon" size="16 16"
                    ></d-el-image>
                    <div class="import-upload-tip-text">请下载导入模板</div>
                </div>

            </template>
        </el-upload>
        <template #footer>
            <el-button @click="goTo('close','')">取消</el-button>
            <el-button
                    type="primary"
                    :loading="isLoading"
                    @click="goTo('confirm', '')"
            >导入
            </el-button
            >
        </template>
    </d-el-dialog>
</template>

<script setup>

defineOptions({
    name: "d-import-button",
    isExposed: false
});


import {ref, reactive, computed, watch, useSlots, getCurrentInstance} from "vue";
import defaultIcon from "./images/default-icon.png"
import haveFileIcon from "./images/have-file-icon.png"
import downloadIcon from "./images/download-icon.png"

const _componentInfo = ref({
    name: "d-el-dialog",
});
let slots = useSlots();
// console.log('d-el-dialog-slots',slots)

const slotListCOM = computed(() => {
    return () => {
        let _slots = [];
        _slots = Object.keys(slots) || [];
        _slots = _slots?.map((item) => {
            return {
                name: item,
            };
        });
        return _slots;
    };
});

const props = defineProps({
    // 配合emits v-model
    modelValue: {
        type: [String, Boolean, Number, Object, Array],
    },
    // item: {
    //   type: [Object],
    // }
    name:{
      type:[String],
      default:'+导入'
    },
    title: {
        type: [String],
        default: '导入'
    },
    accept: {
        type: [String, Array]
    },
    limit: {
        type: [Number,],
        default: 2, // 用于可以重复上传
    },
    multiple: {
        type: [Boolean],
        default: false,
    },
    defaultIcon: {
        type: [String],
        default: defaultIcon
    },
    uploadFileAPI:{
        type:[Function]
    }
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(["update:modelValue", "change"]);

const {appContext} = getCurrentInstance();

const isShow = ref(false)
const isLoading = ref(false)
const fileList = ref([]);
let uploadFileAPI;
if (props.uploadFileAPI) {
    uploadFileAPI = props.uploadFileAPI
}

const importUploadRef = ref()


const fileData = ref({})

watch(() => isShow.value, (isShow) => {
    if (!isShow.value) {
        setTimeout(() => {
            fileData.value = {}
            importUploadRef.value?.clearFiles();
        }, 300)

    }
})


const onChange = (uploadFile, uploadFiles) => {
    console.log('onChange-uploadFile', uploadFile)
    console.log('onChange-uploadFiles', uploadFiles)
    fileData.value = uploadFile

    if (uploadFiles?.length >= 2) {
        uploadFiles.splice(0, 1)
    }

    // importUploadRef?.value?.clearFiles();
}


const beforeUpload = async (file) => {
    console.log(file);


    // console.log(props.accept);

    //
    // let dat = props.accept.match(/^(.*)(\.)(.{1,8})$/)[3]
    // console.log(dat)
    // console.log(/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(props.accept))

    let _accepts = props.accept?.split(',');

    if (!_accepts?.length > 0) {

        return true;
    }

    // console.log(_accepts);
    // console.log(file.type);

    let _isPass = false;
    let _msg = ''
    _accepts?.map(item => {
        // console.log(item);
        // accept: ".jpeg,.jpg",
        // accept: "image/jpeg,image/jpg",
        // 两种格式的验证
        let _item = item.match(/^(.*)(\.)(.{1,8})$/) ? item.match(/^(.*)(\.)(.{1,8})$/)[3] : item;
        console.log(_item);
        console.log(file.type);
        if (file.type.indexOf(_item) > -1) {
            // console.log('验证成功')
            _isPass = true;
        }
        const _names = file.name?.split('.')
        console.log('names',_names);
        if(_item === _names?.[_names?.length-1]){
            _isPass = true;
        }


        let _itemAccept = _item?.split('/')
        let _fileTypes = file.type?.split('/');
        // console.log('_itemAccept',_itemAccept)
        // console.log('_fileTypes',_fileTypes)
        if (_itemAccept?.[0] === _fileTypes?.[0] && _itemAccept?.[1]?.trim() === '*') {
            _isPass = true;

        }


    })
    if (!_isPass) {
        _msg = `请上传${props.accept}格式`
        console.error(_msg)
        // store.dispatch('mineMessage', {message: _msg, type: 'warning',})

        appContext?.config?.globalProperties?.$message && appContext?.config?.globalProperties?.$message({
            message: _msg,
            type: 'warning',
        })
    }


    return _isPass;
}


/**
 * file转base64
 */
const blobToBase64 = (blob, cb) => {

    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (evt) => {
            console.log('onload', evt)
            let _base64 = evt.target.result;
            // cb(_base64);
        };
        reader.onloadend = (evt) => {
            // console.log('onloadend',evt)
            let _res = evt?.target?.result || '';
            resolve(_res);
        }
        reader.readAsDataURL(blob);
    })


};


// section uploadFile
const uploadFile = async (params) => {
    console.log('uploadFile-params', params);
    // console.log(inject);

    // console.log(URL.createObjectURL(params.file))

    // let _res = URL.createObjectURL(params.file);
    const _fileData = {
        url: "",
        key: ""
    }
    if (uploadFileAPI) {
        const _res = await uploadFileAPI(params.file);
        // console.log(res);
        _fileData.url = _res?.url || "";
        _fileData.key = _res?.key || "";

        isShow.value = false;
        return true;
    }

    isShow.value = false;

    // console.log('uploadFile-fileData',_fileData)
    // // fileList.value.push(_fileData)
    //
    //
    // // importUploadRef?.value?.abort()
    //
    // return new Promise((resolve, reject) => {
    //
    // })
    // _res = params.file

    // let res = await uploadFileApi(params.file);
    // console.log(res);
    // let url = _res;
    // console.log(document.location)
    // if (process.env.NODE_ENV == "development") {
    //   url = `${process.env.VUE_APP_BASE_API1}${url}`
    // }else{
    //   let hostname = document.location.origin;
    //   url = `${hostname}${url}`
    // }
    // console.log(fileList);

    // let _fileList = JSON.parse(JSON.stringify(fileList.value));
    // _fileList.push({url: url})

    // let _fileList = fileList.value.map(item=>{
    //   console.log(item);
    //   if(item.uid == params.file.uid){
    //     item.url = url;
    //   }
    //   return item;
    // })

    // emits('update:modelValue',_fileList)
    // handleOnChange(_fileData)
}


const onExceed = (file) => {
    // console.log(file);


    let _msg = `最多只能上传 ${props.limit} 张图片`
    console.error(_msg)
    appContext?.config?.globalProperties?.$message && appContext?.config?.globalProperties?.$message({
        message: _msg,
        type: 'warning',
    })
    // store.dispatch('mineMessage', {message: _msg, type: 'warning',})


}

const handleOnChange = (fileList) => {
    emits('update:modelValue', fileList)
    emits('change', fileList);
}


const goTo = (key, data) => {
    console.log(key, data)
    isShow.value = true


    if (key === 'confirm') {
        console.log(importUploadRef.value)
        console.log('fileData', fileData)
        console.log('fileList',fileList)
        importUploadRef?.value?.submit()

    }


    if (key === 'close') {
        isShow.value = false;
    }

}

// 接口请求方法放这
const init = () => {
    //getList();
};

// 统一执行初始化方法
init();
</script>

<style scoped lang="less">

.import-upload{
    width:400px;
    margin:0 auto;
    :deep(.el-upload-dragger){
        width: 100%;
        height: 160px;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        border-color:var(--el-color-primary);

        &:before{
            content:" ";
            display: block;
            position:absolute;
            top:0;
            left:0;
            width: 100%;
            height: 100%;
            background-color: var(--el-color-primary);
            opacity: 0.1;

        }
    }




    .import-upload-image-box {
        width: 72px;
        height: 50px;
        margin: 0 auto;
        position: relative;
        z-index: 10;

    }
    &.have {
        :deep(.el-upload-dragger){
            border-style:solid;
        }
        .import-upload-image-box {
            height: 70px;
        }
    }




    .el-upload__text {
        padding-top: 8px;
        position: relative;
        z-index: 10;
        color:var(--el-color-info);
    }

    .import-upload-tip {
        padding-top: 16px;
        display: flex;
        align-items: center;
        padding-left: 8px;
        color:var(--el-color-info);

        .import-upload-tip-icon {
            display: block;

        }

        .import-upload-tip-text {
            padding-left: 2px;
            cursor: pointer;
        }

    }


}



</style>
