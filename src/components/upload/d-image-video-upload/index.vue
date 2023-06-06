<!--
  author: 戴伟
  date: 011 2022/07/11 10:28:18
  file: src\components\upload\fileUpload.vue
  des:
    do.....
-->

<template>
  <el-upload
    class="d-file-upload" :class="uploadClassCOM()" action="" list-type="picture-card"
    multiple
    :accept="accept"
    :before-upload="beforeUpload"
    :file-list="fileList" :http-request="uploadFile" :limit="limit" :on-exceed="onExceed">
    <template #default>
      <template v-if="uploadIcon">
        <d-el-image :src="uploadIcon" size="100% 100%"></d-el-image>

      </template>

      <template v-else>
        <el-icon>

          <Plus/>
        </el-icon>
      </template>
    </template>


    <template #file="{ file }">
      <div class="file-item">
        <d-el-image :src="file.url" size="100% 100%" :previewList="[file.url]" :previewTeleported="previewTeleported">
        </d-el-image>


        <template v-if="isShowRemoveBtnCOM()">
          <div class="file-item-remove" @click="handlePictureCardPreview(file)">
            <el-icon>
              <CloseBold/>
            </el-icon>
          </div>

        </template>


        <!--          <img class="el-upload-list__item-thumbnail" :src="file.url"  alt=""/>-->
        <!--          <span class="el-upload-list__item-actions">-->
        <!--          <span-->
        <!--            class="el-upload-list__item-preview"-->
        <!--            @click="handlePictureCardPreview(file)"-->
        <!--          >-->
        <!--            <el-icon><zoom-in/></el-icon>-->
        <!--          </span>-->
        <!--          <span-->
        <!--            v-if="!disabled"-->
        <!--            class="el-upload-list__item-delete"-->
        <!--            @click="handleDownload(file)"-->
        <!--          >-->
        <!--            <el-icon><Download/></el-icon>-->
        <!--          </span>-->
        <!--          <span-->
        <!--            v-if="!disabled"-->
        <!--            class="el-upload-list__item-delete"-->
        <!--            @click="handleRemove(file)"-->
        <!--          >-->
        <!--            <el-icon><Delete/></el-icon>-->
        <!--          </span>-->
        <!--        </span>-->
      </div>
    </template>
  </el-upload>
</template>

<script setup>
// import {Plus,CloseBold} from "@element-plus/icons-vue"
defineOptions({
  name: 'd-image-video-upload',
  isExposed:false
});

import {ref, reactive, computed, watch,inject,getCurrentInstance} from "vue"
import {
  UPLOAD_FILE_INJECT_KEY
} from "@/injection/keys"
const uploadFileAPI = inject(UPLOAD_FILE_INJECT_KEY)
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



const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [Array, String],
  },
  disabled: {
    type: [Boolean]
  },
  limit: {
    type: [Number,],
  },
  previewMode: {
    type: [Boolean]
  },
  size: {
    type: [Number, String]
  },
  uploadIcon: {
    type: [String]
  },
  previewTeleported: {
    type: [Boolean],
    default:true,
  },
  accept:{
    type:[String]
  }

});

const sizeCOM = computed(() => {
  let _unit = 'px';
  let _size = String(props.size)
  _size = String(_size).split('px')[0]
  if (_size >= 0) {

  } else {
    _size = 150;
  }

  return `${_size}${_unit}`;
})


const emits = defineEmits(["update:modelValue", "change"]);

const defaultCOM = computed(() => {
  return '';
});

const fileList = ref([])

const uploadClassCOM = computed(() => {
  return () => {
    let _isHiddenUploadBtn = false;


    if (fileList.value.length >= props.limit) {
      _isHiddenUploadBtn = true;
    }
    if (props.previewMode) {
      _isHiddenUploadBtn = true;
    }
    if (props.disabled) {
      _isHiddenUploadBtn = true;

    }


    return {
      isHiddenUploadBtn: _isHiddenUploadBtn
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


watch( () => props.modelValue, (value, preValue) => {
    console.log('value,preValue', value, preValue);
    fileList.value = [];
    if (Array.isArray(value)) {
      if (value?.length > 0) {
        fileList.value = value?.map((item, index) => {
          item.index = index;
          return item;
        })
      }
    }

    if (typeof value == 'string' && value) {
      fileList.value = [
        {
          url: value
        }
      ];
    }


    //console.log('oldValue', oldValue);
    // defaultActive = newValue.path;

  },
  {immediate: true, deep: true}
);

const beforeUpload = async (file)=>{
  console.log(file);


  console.log(props.accept);

  //
  // let dat = props.accept.match(/^(.*)(\.)(.{1,8})$/)[3]
  // console.log(dat)
  // console.log(/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(props.accept))

  let _accepts = props.accept?.split(',');

  if(!_accepts?.length > 0){

    return  true;
  }

  // console.log(_accepts);
  // console.log(file.type);

  let _isPass = false;
  let _msg = ''
  _accepts?.map(item=>{
    // console.log(item);
    // accept: ".jpeg,.jpg",
    // accept: "image/jpeg,image/jpg",
    // 两种格式的验证
    let _item = item.match(/^(.*)(\.)(.{1,8})$/)?item.match(/^(.*)(\.)(.{1,8})$/)[3] : item ;
    console.log(_item);
    console.log(file.type);
    if(file.type.indexOf(_item) > -1){
      // console.log('验证成功')
      _isPass = true;
    }

    let _itemAccept = _item?.split('/')
    let _fileTypes = file.type?.split('/');
    // console.log('_itemAccept',_itemAccept)
    // console.log('_fileTypes',_fileTypes)
    if(_itemAccept?.[0] == _fileTypes?.[0] && _itemAccept?.[1]?.trim() == '*'){
      _isPass = true;

    }




  })
  if(!_isPass){
    _msg = `请上传${props.accept}格式`
    console.error(_msg)
    // store.dispatch('mineMessage', {message: _msg, type: 'warning',})

    appContext?.config?.globalProperties?.$message && appContext?.config?.globalProperties?.$message({
      message:_msg,
      type:'warning',
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
    reader.onload =  (evt) =>{
      console.log('onload',evt)
      let _base64 = evt.target.result;
      // cb(_base64);
    };
    reader.onloadend = (evt)=>{
      // console.log('onloadend',evt)
      let _res = evt?.target?.result || '';
      resolve(_res);
    }
    reader.readAsDataURL(blob);
  })


};

const uploadFile = async (params) => {
  console.log('uploadFile-params', params);
  // console.log(inject);

  // console.log(URL.createObjectURL(params.file))

  // let _res = URL.createObjectURL(params.file);
  let _res  = ''
  if(uploadFileAPI){
     _res = await uploadFileAPI(params.file);
    // console.log(res);
  }else{
     _res  = await blobToBase64(params.file);
  }

   // _res = params.file

  // let res = await uploadFileApi(params.file);
  // console.log(res);
  let url = _res;
  // console.log(document.location)
  // if (process.env.NODE_ENV == "development") {
  //   url = `${process.env.VUE_APP_BASE_API1}${url}`
  // }else{
  //   let hostname = document.location.origin;
  //   url = `${hostname}${url}`
  // }
  // console.log(fileList);

  let _fileList = JSON.parse(JSON.stringify(fileList.value));
  _fileList.push({url: url})

  // let _fileList = fileList.value.map(item=>{
  //   console.log(item);
  //   if(item.uid == params.file.uid){
  //     item.url = url;
  //   }
  //   return item;
  // })


  // emits('update:modelValue',_fileList)
  handleOnChange(_fileList)
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
    message:_msg,
    type:'warning',
  })
  // store.dispatch('mineMessage', {message: _msg, type: 'warning',})


}


// 接口请求方法放这
const init = () => {
  //getList();

}

// 统一执行初始化方法
init();


</script>

<style scoped lang="less">
.d-file-upload {
  overflow: hidden;

  :deep(.el-upload-list.el-upload-list--picture-card) {
    --el-upload-list-picture-card-size: v-bind('sizeCOM');
  }

  :deep(.el-upload--picture-card) {
    --el-upload-picture-card-size: v-bind('sizeCOM');
    margin-bottom: 8px;
  }

  &.isHiddenUploadBtn :deep(.el-upload--picture-card) {
    display: none;
  }



  :deep(.el-upload--picture-card:hover){
    i{
      color:var(--el-color-primary);
    }

  }

  // el-list-leave-from el-list-leave-active

  //


  :deep(.el-upload-list.el-upload-list--picture-card) {
    .is-success {
      //position:relative;
      z-index: 10;
    }


    .el-list-leave-active {
      //position: relative !important;
    }

    .el-list-enter-from,
    .el-list-leave-to {
      opacity: 0;
      //transform: translateY(-30px);
    }


    .el-list-enter-from.el-list-enter-active {
    }

    .el-list-leave-from.el-list-leave-active {
    }

    .is-success.el-list-enter-from.el-list-enter-active {
      //position: absolute !important;
    }

    //.is-success.el-list-leave-from.el-list-leave-active{
    //  z-index:1;
    //  opacity: 0;
    //  //position: absolute !important;
    //  //display:none;
    //  transform: translateY(-30px);
    //
    //}


    .el-upload-list__item {
      //transition:none;
      //transition: all .5s cubic-bezier(.55,0,.1,1);
      transform: translateY(0px);

    }

    .el-upload-list__item.is-success {
      transform: translateY(0px);

    }

    .el-upload-list__item.is-success.el-list-move {
      //transition:none;
      //transform: translateY(-30px);

    }

    .is-success.el-list-leave-from.el-list-leave-active {
      //transition: all .5s cubic-bezier(.55,0,.1,1);

    }

    .is-success.el-list-leave-active.el-list-leave-to {
      disabled: none;
      transition: none;
    }

    .is-success.el-list-enter-active.el-list-enter-to {
      transform: translate(0);

    }


    .is-ready.el-list-leave-from.el-list-leave-active {
      z-index: 1;
      opacity: 0;
      //position: absolute !important;
    }


    //.el-upload--picture-card
    .el-upload.el-upload--picture-card.el-list-move {
      //display:none;
    }

  }


  .file-item {
    position: relative;
    width: 100%;
    height: 100%;

    .file-item-remove {
      position: absolute;
      top: 0;
      right: 0;
      line-height: 1;
      padding: 3px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      border-bottom-left-radius: 6px;
      cursor: pointer;
      opacity: 0;
      transition: all 0.22s ease-in-out;

      &:hover {
        background: #fff;
        color: #000;
      }
    }

    &:hover {
      .file-item-remove {
        opacity: 1;

      }
    }
  }


}
</style>