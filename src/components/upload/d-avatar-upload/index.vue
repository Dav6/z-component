<!--
  @Author: 戴伟
  @Date: 2023-04-20 14:18:58
  @FilePath: src\components\upload\d-avatar-upload\index.vue  
  @LastEditTime: ''
  @LastEditors: ''
  @Description: 
        do.....
-->

<template>
  <el-upload
      ref="avatarUploadRef"
      :disabled="disabled"
      class="d-avatar-upload" :class="uploadClassCOM()" action=""
      :accept="accept"
      :before-upload="beforeUpload"
      :file-list="fileList" :http-request="uploadFile" :limit="limit" :on-exceed="onExceed"
  >
    <template #trigger>
      <d-el-button class="d-avatar-upload-btn" plain type="primary">{{ buttonName }}</d-el-button>
    </template>
    <template #default>
      <div class="d-avatar-upload-image-box" :style="imageStyleCOM">
<!--        {{ _file.url}}-->
        <d-el-image
            class="d-avatar-upload-image"
            :src="_file.url" size="100% 100%" :previewList="fileList?.length>0?[_file.url]:[]"
            :previewTeleported="previewTeleported"
        ></d-el-image>
      </div>
    </template>


  </el-upload>
</template>

<script setup>
// import {Plus,CloseBold} from "@element-plus/icons-vue"
defineOptions({
  name: 'd-avatar-upload',
  isExposed: false
});

import defaultAvatar from "../images/default-avatar.png"

import {ref, reactive, computed, watch, inject, getCurrentInstance} from "vue"
import {
  UPLOAD_FILE_INJECT_KEY
} from "@/injection/keys"




// console.log('UPLOAD_FILE_INJECT_KEY',uploadFileAPI)
// console.log('injectKeys',UPLOAD_FILE_INJECT_KEY)
//
// console.log('getCurrentInstance',getCurrentInstance())
const {appContext} = getCurrentInstance();
// setTimeout(()=>{
//   appContext?.config?.globalProperties?.$message && appContext?.config?.globalProperties?.$message({
//     message:'123123'
//   })
// },500)
const avatarUploadRef = ref()


const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [Object, String],
  },
  disabled: {
    type: [Boolean]
  },
  limit: {
    type: [Number,],
    default: 1,
  },
  previewMode: {
    type: [Boolean]
  },
  size: {
    type: [Number, String],
    default:'80px'
  },
  borderRadius:{
    type: [Number, String],
    default:"50%"
  },
  previewTeleported: {
    type: [Boolean],
    default: true,
  },
  accept: {
    type: [String,Array]
  },
  uploadFileAPI:{
    type:[Function]
  },
  defaultImage:{
    type:[String]
  },

  buttonName:{
    type: [String],
    default:"上传"
  },

});
let uploadFileAPI = inject(UPLOAD_FILE_INJECT_KEY)

if(props.uploadFileAPI){
  uploadFileAPI = props.uploadFileAPI
}

const imageStyleCOM = computed(()=>{
  let _style = {}


  let _size = String(props.size)
  console.log('_size',_size)
  _size = String(_size).split(' ')
  _size = _size?.map((item,index)=>{
    let length =  '80px'
    if (item?.toString()?.trim()?.indexOf('calc') == 0) {
      length = item;
    }
    // 获取当前长度纯数字
    const _lengthNum = parseFloat(item);
    if ((item || item == 0) && _lengthNum >= 0) {
      const _lengthArr = item.toString().split(_lengthNum.toString())
      const _lengthUnit = _lengthArr?.[1] || 'px';
      length = _lengthNum + _lengthUnit
    }
    return length;
  })

  if(_size.length == 0){
    _size = ['80px','80px']
  }
  if(_size.length == 1){
    _size[1] = _size[0]
  }
  const _width = _size[0] || "80px"
  const _height = _size[1] || _size[0] || "80px"



  let _borderRadius = String(props.borderRadius)
  const _borderRadiusNum = parseFloat(_borderRadius);
  if((_borderRadius || _borderRadius == 0) && _borderRadiusNum>=0){
    const _borderRadiusArr = _borderRadius.toString().split(_borderRadiusNum.toString())
    const _borderRadiusUnit = _borderRadiusArr?.[1] || 'px';
    _borderRadius = _borderRadiusNum + _borderRadiusUnit
  }
  // console.log('_borderRadius',_borderRadius)



  _style = {
    ..._style,
    width:_width,
    height:_height,
    borderRadius:_borderRadius
  }

  return _style
})



const emits = defineEmits(["update:modelValue", "change"]);




const uploadClassCOM = computed(() => {
  return () => {
    let _isHiddenUploadBtn = false;
    //
    //
    // if (fileList.value.length >= props.limit) {
    //   _isHiddenUploadBtn = true;
    // }
    // if (props.previewMode) {
    //   _isHiddenUploadBtn = true;
    // }
    // if (props.disabled) {
    //   _isHiddenUploadBtn = true;
    //
    // }
    let _disabled = props.disabled || false;



    return {
      isHiddenUploadBtn: _isHiddenUploadBtn,
      isDisabled:_disabled,
    }
  }
})

const isShowRemoveBtnCOM = computed(() => {
  return () => {
    let _isShow = true
    if (props.previewMode) {
      _isShow = false;
    }
    if (props.disabled) {
      _isShow = false;
    }
    return _isShow;
  }
})

const isHiddenUploadBtnCOM = computed(() => {

  // console.log(props.limit , fileList.value.length)
  // console.log(fileList.value.length>=props.limit)
  let state = false;


  return state;
})

const fileList = ref([]);
let defaultImage = defaultAvatar
if(props.defaultImage){
  defaultImage = props.defaultImage
}

const _file = ref({
  url: defaultImage,
  key: "",
})
// section v-model value处理
watch(() => props.modelValue, (value, preValue) => {
      console.log('watch-props.modelValue', value, preValue);
      let _value = value
      console.log('_value',_value)
      _file.value.url =  defaultImage
      _file.value.key = ""
      if (_value?.url) {
        _file.value.url = _value?.url;
        _file.value.key = _value?.url;
      }
      if (_value && (typeof _value == 'string')) {

        _file.value.url = _value?.url;
        _file.value.key = _value?.url;
      }

      // 只需要一张 ，防止上传第二张 ，清空列表
      fileList.value = [];


      console.log('_file',_file )

      // console.log('_file',_file.value)
      // console.log('avatarUploadRef.value',avatarUploadRef.value)
      // avatarUploadRef.value?.clearFiles([])
      //console.log('oldValue', oldValue);
      // defaultActive = newValue.path;

    },
    {immediate: true, deep: true}
);

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

    let _itemAccept = _item?.split('/')
    let _fileTypes = file.type?.split('/');
    // console.log('_itemAccept',_itemAccept)
    // console.log('_fileTypes',_fileTypes)
    if (_itemAccept?.[0] == _fileTypes?.[0] && _itemAccept?.[1]?.trim() == '*') {
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


  } else {
    const _res = await blobToBase64(params.file);
    // console.log('-----res', _res)
    _fileData.url = _res
  }


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
  handleOnChange(_fileData)
}


const handlePictureCardPreview = (file) => {
  // console.log(fileList.value);
  console.log(file);
  let _fileList = JSON.parse(JSON.stringify(fileList.value));
  _fileList.splice(file.index, 1);

  console.log(_fileList);
  // emits('update:modelValue',_fileList)
  handleOnChange(_fileList)

}

const handleOnChange = (fileList) => {
  emits('update:modelValue', fileList)
  emits('change', fileList);


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


const selectFile = () => {
  // handleStart


  // console.log(avatarUploadRef?.value?.handleStart)
}


// 接口请求方法放这
const init = () => {
  //getList();

}

// 统一执行初始化方法
init();


</script>

<style scoped lang="less">

.d-avatar-upload {
  display: flex;
  flex-direction: column-reverse;
  align-items:center;

  &.isDisabled{
    cursor: not-allowed;
    opacity: 0.6;
    .d-avatar-upload-btn{
      cursor: not-allowed;

    }
  }

  :deep(.el-upload-list.el-upload-list--text) {
    display: none;
  }

  .d-avatar-upload-image-box {
    width: 100px;
    height: 100px;
    margin-bottom: 14px;
    overflow: hidden;
    box-shadow: 0px 4px 8px 0px rgba(72,134,255,0.2);
  }

  .d-avatar-upload-btn {
    display: flex;
    padding: 6px 10px;
  }


}

</style>