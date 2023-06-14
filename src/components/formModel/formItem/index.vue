<!--
  author: 戴伟
  date: 017 2022/11/17 16:08:07
  file: src\components\formModel\formItem\index.vue
  des:
    do.....
-->

<template>
    <el-form-item

            ref="formItemRef"
            class="form-item"
            :class="formItemClassCOM"
            :label="item.name"
            :label-width="item.labelWidth"
            :rules="!item.isHiddenRulers ? item.rules : []"
            :prop="[...prop,'value'].join('.')"
    >
        <template v-if="item?.labelCustomName" #label="data">
            <!--          <div>{{data}}</div>-->
            <slot :name="item.labelCustomName" :data="{...item,...data}"></slot>

        </template>

        <template v-if="!item.isText">

            <template v-if="item.formType == 'custom' ">
                <!--        {{item.formType}}-->
                <!--        {{item.customName}}-->
                <slot :name="item.customName" :data="item"></slot>

            </template>


            <template v-if="item.formType == 'line' ">
                <div class="form-line"></div>
            </template>


            <!--         section  Component formTypeKeyMap[item.formType] -->
            <template v-if="formTypeKeyMap[item.formType]">

                <Component
                        :class="componentClassCOM"
                        :is="formTypeKeyMap[item.formType]"
                        v-model="item.value"
                        :uploadFileAPI="isUpload()?(item?.uploadFileAPI || uploadFileAPI):undefined"
                        :size="item?.size"
                        :borderRadius="item?.borderRadius"
                        :accept="item?.accept"
                        :disabled="item?.disabled"
                        :options="optionsCOM"
                        :data="item"
                        :defaultBackground="item?.defaultBackground"
                        :buttonName="item?.buttonName"
                        @change="(data) => { goTo('onChange', { prop: onChangeProp, item, index, data }) }"

                >
                    <template v-if="item.formType == 'input' && item.isSearch" #append>
                        <el-button class="input-search-button" icon="Search"
                                   @click="goTo('onInputSearch', { prop: onChangeProp, item, index, })"></el-button>
                    </template>

                </Component>


            </template>


            <template v-if="item.formType == 'editor'">


                <template v-if="isShowEditor">
                    <!--          <wang-editor-->
                    <!--            v-model="item.value"-->
                    <!--            :height="item.height"-->
                    <!--            :placeholder="item.placeholder"-->
                    <!--            :disabled="item.disabled"-->
                    <!--            :toolbarConfig="item.toolbarConfig?item.toolbarConfig:''"-->
                    <!--            @onChange="(data) => { goTo('onChange', { prop: onChangeProp, item, index, data }) }"-->
                    <!--            @onFocus="(data) => { goTo('onFocus', { prop: onChangeProp, item, index, data }) }"-->
                    <!--            @onBlur="(data) => { goTo('onBlur', { prop: onChangeProp, item, index, data }) }"-->

                    <!--          ></wang-editor>-->
                </template>


            </template>


        </template>

        <template v-else>
            <template v-if="item.formType == 'imageVideoUpload'">
                <Component
                        :class="item.class"
                        :is="formTypeKeyMap[item.formType]"
                        v-model="item.value"
                        :item="item"
                        :data="item"
                        @change="(data) => { goTo('onChange', { prop: onChangeProp, item, index, data }) }"
                />
                <!--        <Component   :is="formTypeKeyMap[item.formType]" :item="item"  />-->

            </template>


            <template v-else-if="item.formType == 'select'">
                {{ selectTextValueCOM(item) }}
            </template>


            <template v-else-if="item.formType == 'datePicker'">
                <template v-if="item.dateType == 'datetimerange' || item.dateType == 'daterange'">
                    {{ item.value?.length > 0 ? `${item.value[0]} - ${item.value[1]}` : '' }}
                </template>
                <template v-else>
                    {{ item.value }}
                </template>
            </template>

            <template v-else-if="item.formType == 'custom' ">
                <!--        {{item.formType}}-->
                <!--        {{item.customName}}-->
                <slot :name="item.customName" :data="item"></slot>

            </template>


            <template v-else>
                {{ item.value }}
            </template>
        </template>


        <!--    <template v-if="item.isShowFormItemButton">-->
        <!--      <el-button style="margin-left:10px" :type="item.formItemButtonType" @click="goTo('onFormItemButtonClick',{item,index})">{{ item.formItemButtonText }}</el-button>-->
        <!--    </template>-->


        <template
                v-for="(bItem, bIndex) in item.buttonList"
                :key="index">
            <el-button
                    class="form-item-button"
                    :class="formItemButtonItemClassCOM(bItem)"
                    :type="bItem.type"
                    :text="bItem.isText"
                    :icon="bItem.icon"
                    :color="bItem.color"
                    :disabled="bItem.disabled"
                    @click="goTo('onFormItemButtonClick', { prop: [...buttonProp, 'buttonList', bIndex], bItem, bIndex, item, index })">
                {{ bItem.name }}
            </el-button>
        </template>


    </el-form-item>
</template>

<script setup>

defineOptions({
    name: 'd-el-form-item',
    isExposed: false
});

import {
    ref,
    reactive,
    computed,
    watch,
    onBeforeUnmount,
    shallowRef,
    onMounted,
    nextTick,
    useSlots
} from "vue"


// import WangEditor from "@/components/wangEditor/index"

// import {isSameObj} from "@/utils/tools"

let slots = useSlots()

// console.log('form-Item-slots', slots)
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
        return _slots
    }
})
const props = defineProps({
    // 配合emits v-model
    modelValue: {
        type: [String, Number, Boolean, Object, Array],
    },
    prop: {
        type: [String, Array]
    },
    item: {
        type: [Object],
        default: {
            childrenSpan: 12,
            clearable: false,
            isText: false,
            isHiddenRulers: false,
            marginBottom: "",
            customName: "",
            value: undefined,
        },
    },
    index: {
        type: [Number]
    },
    // buttonList 的路径 用于 按钮点击的时候找到位置
    buttonProp: {
        type: [String, Array]
    },
    // onChange 的路径 用于 form 触发onChange的时候找到位置是哪个
    onChangeProp: {
        type: [String, Array]
    },
    formModelRef: {
        type: [Object]
    },
    formList: {
        type: [Array]
    },

    uploadFileAPI: {
        type: [Function]
    },
    options: {
        type: [Object, Array]
    }

});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(['onFormItemButtonClick', 'onChange', 'onInputSearch']);
// section formTypeKeyMap
const formTypeKeyMap = ref({
    input: 'd-el-input',
    switch: 'd-el-switch',
    inputNumber: 'd-el-input-number',
    slider: 'd-el-slider',
    radio: 'd-el-radio',
    checkbox: 'd-el-checkbox',
    select: 'd-el-select',
    treeSelect: 'd-el-tree-select',
    cascader: 'd-el-cascader',
    timePicker: 'd-el-time-picker',
    datePicker: 'd-el-date-picker',
    imageVideoUpload: 'd-el-image-video-upload',
    avatarUpload: "d-avatar-upload",
    tag: 'd-el-tag',
    divider: 'd-el-divider',
    cron: 'd-cron',
    tabs: 'd-el-tabs'
})


const formItemRef = ref();


if (props?.item) {
    let _item = props.item;
    _item.prop = [...props.prop, 'value']
}

const optionsCOM = computed(() => {
    let _optionsData = props.options
    let _options = undefined;
    let _data = props.item;
    let _key = _data?.key;
    if (Array.isArray(_optionsData) && _optionsData?.length >= 0) {
        _options = _optionsData
    }
    if (_optionsData?.[_key] && Array.isArray(_optionsData?.[_key]) && _optionsData?.[_key]?.length >= 0) {
        _options = _optionsData?.[_key]
    }
    // console.log('_options',_options)

    return _options;
})


//  section placeholderCOM
const placeholderCOM = computed(() => {
    return (data) => {

        if (data.placeholder) return data.placeholder;
        let _placeholder = '';
        let _selects = ['treeSelect', 'select', 'cascader', 'timePicker', 'datePicker', 'cron'];
        let _inputs = ['input', 'inputNumber', 'textArea'];
        let _placeholderPrefix = ''
        if (_selects.indexOf(data.formType) > -1) {
            _placeholderPrefix = '请选择'
        }
        // console.log(data )
        if (_inputs.indexOf(data.formType) > -1) {
            _placeholderPrefix = '请输入'
        }
        let _name = data?.name || '';
        _placeholder = `${_placeholderPrefix}${_name}`
        return _placeholder;
    }
})

const selectTextValueCOM = computed(() => {

    return (data) => {
        let _str = '';
        // console.log('selectTextValueCOM', data)
        if (data.multiple) {
            let _options = JSON.parse(JSON.stringify(data.options)) || [];
            let _values = JSON.parse(JSON.stringify(data.value))
            let arr = _options?.filter(option => _values.includes(option.value))
            // console.log(arr);
            _str = arr.map(item => item?.label).join(',')
        } else {
            _str = data.options?.find(option => option.value == data.value)?.label
        }

        return _str;
    }
})


const componentClassCOM = computed(() => {
//  item.formType == 'input' && item.isSearch
    let _data = props.item;
    let _class = []

    let _componentClass = _data?.class;
    if (typeof (_componentClass) == 'string') {
        let _bClass = _componentClass?.split(' ')
        _class = [..._class, ..._bClass]
    }
    if (_componentClass?.constructor == Object) {
        let _bClass = Object.keys(_componentClass)?.map(key => {
            // console.log(key)
            return _componentClass[key] ? key : ''
        })
        _class = [..._class, ..._bClass]
    }
    if (_componentClass?.constructor == Array) {
        let _bClass = _componentClass || [];
        _class = [..._class, ..._bClass]
    }

    if (_data.formType == 'input' && _data.isSearch) {
        _class = [..._class, 'input-search']
    }


    return _class;
})


const formItemClassCOM = computed(() => {

    let _data = props.item;
    //{br:item.formType=='br',noFormType:!item.formType,labelPositionLeft:item.labelPosition}
    let _labelPosition = _data?.labelPosition ? _data.labelPosition : 'left';
    let _labelPositionClass = `form-item-label-position-${_labelPosition}`;
    let _formLine = _data?.formType == 'line' ? true : false;
    let _marginBottom = Boolean(_data?.marginBottom || _data?.marginBottom === 0)

    let _class = []
    let _baseClassObject = {
        br: _data.formType == 'br',
        marginBottom: _marginBottom,
        noFormType: !_data.formType,
        [_labelPositionClass]: _data?.labelPosition ? true : false,
        'form-line': _formLine,
    }
    let _baseClass = Object.keys(_baseClassObject)?.map(key => {
        return _baseClassObject[key] ? key : ''
    })
    _class = [..._baseClass]


    let _formClass = _data?.formClass;
    if (typeof (_formClass) == 'string') {
        let _bClass = _formClass?.split(' ')
        _class = [..._class, ..._bClass]
    }
    if (_formClass?.constructor == Object) {
        let _bClass = Object.keys(_formClass)?.map(key => {
            // console.log(key)
            return _formClass[key] ? key : ''
        })
        _class = [..._class, ..._bClass]
    }
    if (_formClass?.constructor == Array) {
        let _bClass = _formClass || [];
        _class = [..._class, ..._bClass]
    }


    return _class;
});


const formItemButtonItemClassCOM = computed(() => {
    return (bItem) => {
        let _data = props.item;
        let _bItem = bItem;
        // console.log("_bItem", _bItem.class)
        let _class = [
            !bItem.name ? 'formItemButtonNoName' : '',
            (!bItem.name && bItem.icon) ? 'formItemButtonOnlyIcon' : '',
        ];

        if (typeof (_bItem.class) == 'string') {
            let _bClass = _bItem.class?.split(' ')
            _class = [..._class, ..._bClass]
        }
        if (_bItem?.class?.constructor == Object) {
            let _bClass = Object.keys(_bItem?.class)?.map(key => {
                // console.log(key)
                return _bItem?.class[key] ? key : ''
            })
            _class = [..._class, ..._bClass]
        }
        if (_bItem?.class?.constructor == Array) {
            let _bClass = _bItem?.class || [];
            _class = [..._class, ..._bClass]
        }

        // console.log('_class', _class)

        // :class="{ formItemButtonNoName: !bItem.name, formItemButtonOnlyIcon: !bItem.name && bItem.icon,...bItem.class }"


        return _class
    }
    // // //{br:item.formType=='br',noFormType:!item.formType,labelPositionLeft:item.labelPosition}
    // // let _labelPosition = _data?.labelPosition ? _data.labelPosition : 'left';
    // // let _labelPositionClass = `form-item-label-position-${_labelPosition}`;
    // // let _formLine = _data?.formType == 'line' ? true : false;
    // // let _marginBottom = Boolean(_data?.marginBottom || _data?.marginBottom === 0)
    // return {
    //
    // }

});


// const test = (data,item)=>{
//   console.log(data,item);
// }


const isShowEditor = ref(true)


watch([() => props.item, () => props.item.toolbarConfig], ([item, toolbarConfig], [preItem, preToolbarConfig]) => {

    setItemData && setItemData()
    if (item?.formType == 'editor') {
        //   toolbarConfig = toolbarConfig || {};
        //   item = JSON.parse(JSON.stringify(item))
        //   toolbarConfig = JSON.parse(JSON.stringify(toolbarConfig))
        //   console.log('item', [item, toolbarConfig],);
        // //   console.log('preItem', [preItem, preToolbarConfig]);
        // //   isShowEditor.value = true;
        //   let _toolbarConfig = toolbarConfig ? toolbarConfig : {};
        //   _toolbarConfig = JSON.parse(JSON.stringify(_toolbarConfig));
        //   let _preToolbarConfig = preToolbarConfig ? preToolbarConfig : {};
        //   _preToolbarConfig = JSON.parse(JSON.stringify(_preToolbarConfig));
        //
        //   // console.log('isSameObj(_toolbarConfig,_preToolbarConfig)', isSameObj(_toolbarConfig, _preToolbarConfig))
        //   if (!isSameObj(_toolbarConfig, _preToolbarConfig)) {
        //     isShowEditor.value = false;
        //     setTimeout(() => {
        //       isShowEditor.value = true
        //
        //     },100)
        //
        //   }

        //
    }


}, {
    deep: true,
    immediate: false
})


const isUpload = () => {
    // item?.uploadFileAPI || uploadFileAPI
    const _item = props.item;
    return _item.formType?.indexOf("Upload") > -1;
}


//section goTo
const goTo = (key, data) => {
    // console.log('formItem', key, data);
    data = JSON.parse(JSON.stringify(data));
    if (key == 'onFormItemButtonClick') {
        emits('onFormItemButtonClick', {key, ...data})
    }
    if (key == 'onChange') {
        console.log(key, data)
        emits('onChange', {...data})
    }
    if (key == 'onInputSearch') {
        emits('onInputSearch', {key, ...data})

    }

    if (key == 'onBlur') {
        // console.log(props.formModelRef.validateField);
        // let _key = data.item.key;
        // _key = [...props.prop, 'value'].join('.')
        // console.log(_key);
        // props.formModelRef?.validateField(_key, () => null)


    }

    if (key == 'onFocus') {

    }


}


const setItemData = () => {

    if (props.item?.formType == 'inputNumber' || props.item?.formType == 'slider') {
        // console.log(props.item?.formType, 'props.item?.formType')
        let _number = props.item.value;
        // console.log('_number', _number)
        // console.log('_number', _number === +_number)

        if (_number === '' || _number === ' ' || _number === undefined || _number === null) {
            _number = undefined
        } else {
            if (_number == +_number) {
                // console.log('_number', _number)
                _number = Number(_number);
            } else {
                _number = isNaN(Number(_number)) ? undefined : Number(_number);
            }
        }
        console.log('_number', _number)

        if (props.item?.formType == 'slider') {
            if (Array.isArray(props.item.value)) {
                _number = props.item.value;
            } else {
                let _min = props.item?.min;
                if (_min === +_min) {

                } else {
                    _min = 0
                }
                let _max = props.item?.max;
                if (_max === +_max) {

                } else {
                    _max = 100
                }
                if (props.item?.range) {
                    if (_number >= _max || _number <= _min) {
                        _number = [_min, _max]
                    }
                    if (_number >= _min && _number <= _max) {
                        _number = [_min, _number]
                    }
                }


                // _number= [_minNumber,_maxNumber]
                // console.log('_number-range', _number)
            }
        }


        props.item.value = _number;

    }


    if (props.item?.formType == 'checkbox') {
        if (props.item.value === "") {
            props.item.value = undefined;
        }


    }


}


// 接口请求方法放这
const init = () => {
    //getList();
    setItemData()
}

// 统一执行初始化方法
init();


</script>

<style scoped
       lang="less">
.el-form-item .el-form-item {
  //margin-bottom: 18px;
}


.form-item-button {
  margin-left: 12px;

  &.formItemButtonNoName {
    margin-left: 6px;

    :deep(span) {
      display: none;
    }
  }

  &.formItemButtonOnlyIcon {
    padding: 8px 6px;
  }
}


:deep(.el-date-editor .el-range-separator) {
  flex: unset;
}

:deep(.el-range-editor .el-range-input) {
  flex: 1;
  padding: 0 5px;
}


.form-item {

  //flex:1;

  &.el-form-item {
    margin-bottom: 18px;
  }

  &.el-form-item.noFormType {
    margin-bottom: 0;
  }

  &.el-form-item.marginBottom {
    margin-bottom: v-bind('item.marginBottom');
  }

  &.el-form-item {
    .el-row {
      .d-form-list-col:last-child .el-form-item {
        margin-bottom: 0;
      }
    }

  }


  &.el-form-item.form-line {
    margin: 12px 0;
  }


  //&.el-form-item.is-success{
  //    :deep(.el-input__wrapper){
  //      box-shadow:0 0 0 1px var(--el-input-hover-border-color) inset ;
  //      .el-input__validateIcon{
  //        color:var(--el-input-icon-color,var(--el-text-color-placeholder));
  //      }
  //
  //    }
  //}
  &.el-form-item {
    :deep(.cron) {
      --el-card-padding: 0px 0px 0px;
      border: none;
    }
  }

  &.el-form-item.is-error {
    :deep(.el-form-item__content) {

      //align-items:flex-start;
      textarea::placeholder {
        color: var(--el-color-danger);
        opacity: 0.6;

      }

      input::placeholder {
        color: var(--el-color-danger);
        opacity: 0.6;
      }

      .el-input__wrapper {
        //box-shadow: var(--el-color-danger);
        box-shadow: 0 0 0 1px var(--el-color-danger) inset;

        .el-input__validateIcon, .el-select__icon {
          color: var(--el-color-danger);
        }

      }


    }

    //.el-select .el-input.is-focus .el-input__wrapper{
    //  box-shadow: var(--el-color-danger);
    //
    //}

    :deep(.d-wangEditor) {
      //box-shadow: 0 0 0 1px var(--el-color-danger) inset;
      border-color: var(--el-color-danger);
      transition: border-color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);;
    }


    :deep(.d-file-upload) {
      .el-upload--picture-card {
        border-color: var(--el-color-danger);
      }

      .el-upload--picture-card i {
        color: var(--el-color-danger);
      }
    }

    :deep(.cron) {
      border-color: var(--el-color-danger);

      .el-input {
        .el-input__wrapper {
          box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;

        }

        input::placeholder {
          color: var(--el-text-color-placeholder);
          opacity: 0.6;
        }
      }

      .el-select {
        .el-select__caret {
          color: var(--el-select-input-color)
        }
      }


      .isError {
        .el-select__caret {
          color: var(--el-color-danger);
        }

        .el-input {
          .el-input__wrapper {
            box-shadow: 0 0 0 1px var(--el-color-danger) inset
          }


          input::placeholder {
            color: var(--el-color-danger);
          }
        }
      }

    }


  }


  :deep(.form-divider) {
    width: auto;
    flex: 1;

    &.el-divider--horizontal {
      margin: 12px 0;
    }

    .el-divider__text {
      line-height: 1;
    }
  }

  .form-line {
    width: auto;
    flex: 1;
    height: 1px;
    //border: 1px solid #E4E9F1;
    background-color: #E4E9F1;
  }


  .form-tag {
    white-space: pre-line;
    word-break: break-all;

    padding: 4px 8px;
    height: auto;
    line-height: 1.3;
    //flex: 1;
    max-width: 100%;
  }

  .form-select {
    width: auto;
    flex: 1;

  }

  .form-tree-select {
    width: auto;
    flex: 1;
  }

  :deep(.form-cascader) {
    width: auto;
    flex: 1;
  }

  .form-time-select {
    width: auto;
    flex: 1;
  }

  :deep(.form-time-picker) {
    width: auto;
    flex: 1;
  }

  .form-input {
    width: auto;
    flex: 1;
  }

  .form-tabs {
    width: auto;
    flex: 1;
    margin-bottom: 2px;
  }


  .form-input-number {
    width: auto;
    flex: 1;

    &.textAlignLeft {
      :deep(.el-input__inner) {
        text-align: left;
      }
    }

    :deep(.el-input__wrapper) {
      padding-left: 11px;
      padding-right: 11px;
    }
  }

  .form-slider {
    padding: 0 calc(var(--el-slider-button-size));
  }

  :deep(.form-date-picker) {
    width: auto;
    flex: 1;
    display: inline-flex;

    &.el-date-editor.el-input__wrapper:hover {
      //box-shadow-color:var(--el-border-color);
      //--el-input-border-color: ;
      //box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset
    }
  }


}


.form-item.el-form-item.form-item-label-position-top {
  display: block;

  :deep(.el-form-item__label) {
    display: block;
  }
}

.form-item.el-form-item.form-item-label-position-left {
  display: flex;

  :deep(.el-form-item__label) {
    display: inline-flex;
    line-height: 32px;
    justify-content: flex-start;
    margin-bottom: 0;
    width: v-bind('item.labelWidth');
  }
}

.form-item.el-form-item.form-item-label-position-right {
  display: flex;

  :deep(.el-form-item__label) {
    display: inline-flex;
    line-height: 32px;
    justify-content: flex-end;
    margin-bottom: 0;
    width: v-bind('item.labelWidth');
  }
}


//.el-col.fixedWidth {
//  max-width: unset;
//  flex: unset;
//}


</style>