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

        <template v-if="!item.isText">

          <template v-if="item.formType == 'custom' ">
            <!--        {{item.formType}}-->
            <!--        {{item.slotName}}-->
            <slot :name="item.slotName" :data="item"></slot>

          </template>

          <template v-if="item.formType == 'tag' ">
            <!--        {{item.formType}}-->
            <!--        {{item.slotName}}-->
            <el-tag
              class="form-tag"
              :size="item.size"
              :type="item.type"
              v-html="item.value"
            ></el-tag>

          </template>

          <template v-if="item.formType == 'line' ">
            <div class="form-line"></div>
          </template>
          <template v-if="item.formType == 'divider'">

            <el-divider
              class="form-divider"
              :border-style="item.borderStyle"
              :content-position="item.contentPosition"
            >{{item.value}}</el-divider>
          </template>


          <template v-if="item.formType == 'radio' ">
            <el-radio-group v-model="item.value"
                            :disabled="item.disabled"
                            @change="(data)=>{goTo('onChange',{prop:onChangeProp,item,index,data})}"

            >
              <el-radio v-for="(oItem,oIndex) in item.options" :key="oIndex" :label="oItem.value">

                {{ oItem.label }}
              </el-radio>
            </el-radio-group>
          </template>

          <template v-if="item.formType == 'radioButton'">
            <el-radio-group v-model="item.value" :disabled="item.disabled"
                            @change="(data) => { goTo('onChange', { prop: onChangeProp, item, index, data }) }">
              <el-radio-button v-for="(oItem, oIndex) in item.options" :key="oIndex" :label="oItem.value">
                {{ oItem.label }}
              </el-radio-button>
            </el-radio-group>
          </template>

          <template v-if="item.formType == 'input'">

            <el-input class="form-input"
                      :disabled="item.disabled"
                      v-model="item.value"
                      :clearable="item.clearable"
                      :max="item.max" :min="item.min" :maxlength="item.maxlength" :minlength="item.minlength"
                      :show-word-limit="item.showWordLimit" :show-password="item.showPassword"
                      :prefix-icon="item.prefixIcon"
                      :suffix-icon="item.suffixIcon"
                      @change="(data) => { goTo('onChange', { prop: onChangeProp, item, index, data }) }"

                      :placeholder="placeholderCOM(item)"/>
          </template>

          <template v-if="item.formType == 'inputNumber'">
            <el-input-number class="form-input-number" :class="{ textAlignLeft: item.textAlign == 'left' }"
                             :disabled="item.disabled" v-model="item.value" :min="item.min" :max="item.max"
                             :step="item.step"
                             :precision="item.precision" :clearable="item.clearable" :placeholder="placeholderCOM(item)"
                             :controls="item.controls" :controls-position="item.controlsPosition"
                             @change="(data) => { goTo('onChange', { prop: onChangeProp, item, index, data }) }"/>

          </template>

          <template v-if="item.formType == 'textArea'">
            <el-input :disabled="item.disabled" v-model="item.value" :maxlength="item.maxlength ? item.maxlength : 1000"
                      :rows="item.rows ? item.rows : 5" :placeholder="placeholderCOM(item)"
                      :show-word-limit="item.showWordLimit"
                      type="textarea"
                      @change="(data) => { goTo('onChange', { prop: onChangeProp, item, index, data }) }"/>
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


          <template v-if="item.formType == 'imageVideoUpload' ">
            <d-image-video-upload v-model="item.value" :limit="item.limit"
                                  :size="item.size"
                                  :uploadIcon="item.uploadIcon"
                                  :disabled="item.disabled"
                                  :previewTeleported="item.previewTeleported"
                                  :accept="item.accept"
                                  @change="(data)=>{goTo('onChange',{prop:onChangeProp,item,index,data})}"
            ></d-image-video-upload>

          </template>

          <template v-if="item.formType == 'select'">

            <el-select class="form-select"
                       v-model="item.value"
                       :value-key="item.valueKey"
                       :disabled="item.disabled"
                       :multiple="item.multiple"
                       :collapse-tags="item.collapseTags"
                       :collapse-tags-tooltip="item.collapseTagsTooltip"
                       :placeholder="placeholderCOM(item)"
                       :clearable="item.clearable"
                       :filterable="item.filterable"
                       @change="(data) => { goTo('onChange', { prop: onChangeProp, item, index, data }) }">
              <el-option v-for="(oItem, oIndex) in item.options" :key="oIndex" :label="oItem.label"
                         :disabled="oItem.disabled" :value="oItem.value"/>

            </el-select>
          </template>
          <template v-if="item.formType == 'treeSelect'">
            <el-tree-select
              class="form-tree-select"
              v-model="item.value"
              :data="item?.options?.length>0?item.options:[]"
              :props="item.props"
              :multiple="item.multiple"
              :collapse-tags="item.collapseTags"
              :collapse-tags-tooltip="item.collapseTagsTooltip"
              :treeNodeKey="item.treeNodeKey"
              :check-on-click-node="item.checkOnClickNode"
              :check-strictly="item.checkStrictly"
              :render-after-expand="item.renderAfterExpand"
              :show-checkbox="item.showCheckbox"
              :disabled="item.disabled"
              :filterable="item.filterable"
              :placeholder="placeholderCOM(item)"

              @change="(data) => { goTo('onChange', { prop: onChangeProp, item, index, data }) }"
            >

            </el-tree-select>
          </template>


          <template v-if="item.formType == 'cascader'">

            <el-cascader class="form-cascader" style="width: 100%;" v-model="item.value"
                         :options="item.options" :clearable="item.clearable"
                         :placeholder="placeholderCOM(item)"
                         :disabled="item.disabled"
                         :props="item.props"/>

          </template>


          <template v-if="item.formType == 'timePicker'">

            <el-time-picker
              :disabled="item.disabled" class="form-time-picker" v-model="item.value"
              :clearable="item.clearable" :placeholder="placeholderCOM(item)"
              :format="item.format ? item.format : 'HH:mm:ss'"
              :value-format="item.valueFormat ? item.valueFormat : 'HH:mm:ss'"


              @change="(data) => { goTo('onChange', { prop: onChangeProp, item, index, data }) }"/>
          </template>

          <template v-if="item.formType == 'datePicker'">
            <el-date-picker
              style="box-sizing: border-box " class="form-date-picker" :clearable="item.clearable"
              v-model="item.value" :type="item.dateType"
              :disabled="item.disabled"
              :range-separator="item.rangeSeparator ? item.rangeSeparator : '-'"
              :format="item.format ? item.format : 'YYYY-MM-DD HH:mm:ss'"
              :value-format="item.valueFormat ? item.valueFormat : 'YYYY-MM-DD HH:mm:ss'"
              :shortcuts="item.shortcuts ? item.shortcuts : getShortcut(item.dateType)"
              :placeholder="placeholderCOM(item)"
              :start-placeholder="item.startPlaceholder" :end-placeholder="item.endPlaceholder"
              :disabled-date="(date) => dateChangeDisabled.disabledDate(date, item)"
              @calendar-change="(date) => dateChangeDisabled.calendarChange(date)"
              @change="(data) => { goTo('onChange', { prop: onChangeProp, item, index, data }) }"/>

          </template>


        </template>

        <template v-else>
          <template v-if="item.formType == 'imageVideoUpload'">
            <d-image-video-upload
              v-model="item.value" :limit="item.limit"
              :size="item.size"
              :uploadIcon="item.uploadIcon"
              :disabled="item.disabled"
              :previewTeleported="item.previewTeleported"

              :previewMode="item.isText"
              :accept="item.accept"
              @change="(data)=>{goTo('onChange',{prop:onChangeProp,item,index,data})}"
            ></d-image-video-upload>

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
            <!--        {{item.slotName}}-->
            <slot :name="item.slotName" :data="item"></slot>

          </template>


          <template v-else>
            {{ item.value }}
          </template>
        </template>


        <!--    <template v-if="item.isShowFormItemButton">-->
        <!--      <el-button style="margin-left:10px" :type="item.formItemButtonType" @click="goTo('onFormItemButtonClick',{item,index})">{{ item.formItemButtonText }}</el-button>-->
        <!--    </template>-->


        <template v-for="(bItem, bIndex) in item.buttonList" :key="index">
          <el-button
            class="form-item-button"
            :class="{ formItemButtonNoName: !bItem.name, formItemButtonOnlyIcon: !bItem.name && bItem.icon }"
            :type="bItem.type"
            :text="bItem.isText" :icon="bItem.icon" :color="bItem.color"
            @click="goTo('onFormItemButtonClick', { propPath: [...buttonProp, 'buttonList', bIndex], bItem, bIndex, item, index })">
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

import {ref, reactive, computed, watch, onBeforeUnmount, shallowRef, onMounted, nextTick, useSlots} from "vue"


// import WangEditor from "@/components/wangEditor/index"

// import {isSameObj} from "@/utils/tools"
import dayjs from "dayjs";

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
    return _slots
  }
})
const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String, Boolean],
  },
  prop: {
    type: [String, Array]
  },
  item: {
    type: [Object],
    default: {
      ownSpan:12,
      childrenSpan:12,
      clearable: false,
      isText: false,
      isHiddenRulers: false,
      marginBottom: "",
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
  }

});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(['onFormItemButtonClick', 'onChange']);
const formItemRef = ref()
const placeholderCOM = computed(() => {
  return (data) => {

    if (data.placeholder) return data.placeholder;
    let _placeholder = '';
    let _selects = ['treeSelect', 'select', 'cascader', 'timePicker', 'datePicker'];
    let _inputs = ['input', 'inputNumber', 'textArea'];
    let _placeholderPrefix = ''
    if (_selects.indexOf(data.formType) > -1) {
      _placeholderPrefix = '请选择'
    }
    // console.log(data )
    if (_inputs.indexOf(data.formType) > -1) {
      _placeholderPrefix = '请输入'
    }
    _placeholder = `${_placeholderPrefix}${data.name}`
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


const formItemClassCOM = computed(() => {

  let _data = props.item;
  //{br:item.formType=='br',noFormType:!item.formType,labelPositionLeft:item.labelPosition}
  let _labelPosition = _data?.labelPosition ? _data.labelPosition : 'left';
  let _labelPositionClass = `form-item-label-position-${_labelPosition}`;
  let _formLine = _data?.formType == 'line' ? true : false;
  let _marginBottom = Boolean(_data?.marginBottom || _data?.marginBottom === 0)
  return {
    br: _data.formType == 'br',
    marginBottom: _marginBottom,
    noFormType: !_data.formType,
    [_labelPositionClass]: _data?.labelPosition ? true : false,
    'form-line': _formLine,
  }

});


const dateChangeDisabled = computed(() => {
  let currentValue = [];
  return {
    disabledDate(data, item){
      // console.log(data);
      // item.disabledDate
      if ((typeof item?.disabledDate) == 'function') {
        return item?.disabledDate(data, currentValue);
      }
    },
    calendarChange(date){
      // console.log(date);
      currentValue = date;
    }

  }
})


// const test = (data,item)=>{
//   console.log(data,item);
// }


const shortcut = [


  {
    text: '一周前',
    value: () => {
      // const date = new Date()
      // date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return dayjs().subtract(1, 'week')
    },
  },
  {
    text: '昨天',
    value: () => {
      // const date = new Date()
      // date.setTime(date.getTime() - 3600 * 1000 * 24)
      return dayjs().subtract(1, 'day')

    },
  },
  {
    text: '今天',
    value: dayjs(),
  },
  {
    text: '明天',
    value: () => {
      // const date = new Date()
      // date.setTime(date.getTime() + 3600 * 1000 * 24 * 1)
      return dayjs().add(1, 'day')
    },
  },
  {
    text: '一周后',
    value: () => {
      // const date = new Date()
      // date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
      return dayjs().add(1, 'week')
    },
  },
  {
    text: '一年后',
    value: () => {
      // const date = new Date()
      // date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)

      return dayjs().add(1, 'year')
    },
  },
]

const shortcuts = [

  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

const getShortcut = (type) => {
  // <!--   year/month/date/datetime/ week/datetimerange/daterange	-->
  let _shortcut = shortcut;
  if (type == 'datetimerange' || type == 'daterange') {
    _shortcut = shortcuts
  }
  return _shortcut;
}

const isShowEditor = ref(true)

watch([() => props.item, () => props.item.toolbarConfig], ([item, toolbarConfig], [preItem, preToolbarConfig]) => {


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


}, {deep: true, immediate: false})

//section goTo
const goTo = (key, data) => {
  // console.log(key, data);
  data = JSON.parse(JSON.stringify(data));
  if (key == 'onFormItemButtonClick') {
    emits('onFormItemButtonClick', {key, ...data})
  }
  if (key == 'onChange') {


    emits('onChange', {...data})
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


// 接口请求方法放这
const init = () => {
  //getList();

}

// 统一执行初始化方法
init();


</script>

<style scoped lang="less">
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


  }



  .form-divider{
    width: auto;
    flex: 1;
    &.el-divider--horizontal{
      margin:12px 0;
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

  .form-cascader {
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

  :deep(.form-date-picker) {
    width: auto;
    flex: 1;
    display: inline-flex;

    &.el-date-editor.el-input__wrapper:hover {
      //box-shadow-color:var(--el-border-color);
      //--el-input-border-color: ;
      box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset
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