/**
 @Author: 戴伟
 @Date: 2023/03/01 15:40:06
 @FilePath: src/example/dialog/store.js
 @LastEditTime: ''
 @LastEditors: ''
 @Description:
 do.....
 */


import { defineStore } from "pinia";
import {
  listQueryFormList,
  listQueryButtonList,
  tableSettingsConfig,
  tableShowConfig,
  tableKeyList,
  addEditDialogFormList,
  conditionItem,
  actionItem,
  actionAttributesItem,
  deviceOptions,
  detail
} from "./config";
import {  JSONPath } from "jsonpath-plus";
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useDialogStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "dialog",
  // state: 返回对象的函数
  state: () => ({
    count: 1,

    options: {
      operation: {
        options: []
      },
      deviceType: {
        options: [],
        map: {},
      },
      locations: {
        options: [],
        map: {},
      }
    },
    addEditDialogData: {
      ref: null,
      isShow: false,
      isLoading: false,
      title: "",
      type: "",
      detail: {},
      formList: JSON.parse(JSON.stringify(addEditDialogFormList)),
      conditionItem: JSON.parse(JSON.stringify(conditionItem)),
      actionItem: JSON.parse(JSON.stringify(actionItem)),
      actionAttributesItem: JSON.parse(JSON.stringify(actionAttributesItem))
    },
  }),
  getters: {
  },
  actions: {
    init(){
      this.getDeviceOptions();
    },
    // section 设置弹框 formRef
    setAddEditDialogFormRef(el){
      this.addEditDialogData.ref = el;
    },
    // section 设备类型的 选项options
    getDeviceOptions(){
      let _list = deviceOptions
      let _options = _list?.map(item => {
        let _item = item;
        let _events = {
          options: [],
          map: {},
        }
        _events.options = _item?.events?.map(event => {
          let _event = event;
          let _data = {
            ..._event,
            label: _event.name,
            value: _event.id,
          }
          _events.map[_data.value] = _data;
          return _data;
        }) || [];
        let _actions = {
          options: [],
          map: {},
        }
        _actions.options = _item?.actions?.map(action => {
          let _action = action;
          let _data = {
            ..._action,
            label: _action.name,
            value: _action.id,
          }
          _actions.map[_data.value] = _data;
          return _data;
        }) || [];


        let _data = {
          ..._item,
          label: _item.name,
          value: _item.type,
          events: _events,
          actions: _actions,
        }

        this.options.deviceType.map[_data.value] = _data;
        return _data;
      })


      this.options.deviceType.options = _options;

      console.log('根据设备类型获取详细事件、属性、动作', _options)
      this.setConditionItem('deviceType')
      this.setActionItem('deviceType')
    },
    // section 设置条件的选项、表单
    setConditionItem(key, data){
      // console.log(this.addEditDialogData.formList);
      // console.log(this.options);
      let _conditionItem = this.addEditDialogData.conditionItem;

      if (key == 'deviceType') {
        // 获取formList 中所有key 为deviceType 的 formItem
        let _path = `$..[?(@ && @.key == 'deviceType')]`;
        let _formItem = JSONPath({
          json: _conditionItem,
          path: _path
        });
        // console.log('_formItem',_formItem)
        let _options = this.options.deviceType.options;
        _options = _options.filter(option => option?.events?.options?.length > 0)
        _formItem?.map(item => item.options = _options);
      }
      if (key == 'locations') {
        let _path = `$..[?(@ && @.key == 'locations')]`;
        let _formItem = JSONPath({
          json: _conditionItem,
          path: _path
        });
        // console.log('_formItem',_formItem)
        // JSONPath.toPathArray()
        _formItem?.map(item => item.options = this.options.locations.options);
      }
      if (key == 'conditionTitle') {
        let _formList = this.addEditDialogData.formList;
        let _conditionDividerPath = `$..[?(@ && @.key == 'conditionDivider')]`;
        let _conditionDividerItem = JSONPath({
          json: _formList,
          path: _conditionDividerPath,
          wrap: true
        });
        // console.log('_conditionDividerItem',_conditionDividerItem);
        _conditionDividerItem?.map((item, index) => item.value = `↑条件${index + 1}`)
        // console.log(this.addEditDialogData.formList)
      }
      if (key == 'conditionOptions') {
        let _formList = this.addEditDialogData.formList;
        let _prop = data?.prop;
        let _propPath = JSON.parse(JSON.stringify(_prop));
        // console.log(_propPath)
        _propPath = _propPath.splice(0, 5)
        // console.log(_propPath)
        _propPath = ['$', ..._propPath]?.map(item => String(item));
        // 获取当前条件的表单
        let _conditionFormItem = JSONPath({
          json: _formList,
          path: _propPath,
          wrap: false
        });

        let _conditionFormItemChildren = _conditionFormItem?.children || [];
        let _deviceTypePath = `$..[?(@ && @.key == 'deviceType')]`;
        let _deviceTypeItem = JSONPath({
          json: _conditionFormItemChildren,
          path: _deviceTypePath
        });
        // console.log('_item---',_deviceTypeItem)
        let _value = _deviceTypeItem[0]['value'];

        let _conditionPath = `$..[?(@ && @.key == 'condition')]`;
        let _conditionItem = JSONPath({
          json: _conditionFormItemChildren,
          path: _conditionPath
        });

        if (_value) {
          let _deviceTypeMap = this.options.deviceType.map[_value];
          // console.log('_deviceTypeMap',_deviceTypeMap)
          // console.log('_conditionItem',_conditionItem)
          _conditionItem[0]['options'] = _deviceTypeMap?.events?.options || [];
          _conditionItem[0]['map'] = _deviceTypeMap?.events?.map || {};
          _conditionItem[0]['value'] = '';
        } else {
          _conditionItem[0]['options'] = [];
          _conditionItem[0]['map'] = {};
          _conditionItem[0]['value'] = '';

        }

        this.setConditionItem('conditionFormValue', data)

      }


      //  条件变更时 其他表单的调整
      if (key == 'conditionFormValue') {

        let _formList = this.addEditDialogData.formList;
        // let _formList = JSON.parse(JSON.stringify(this.addEditDialogData.formList))
        let _data = data;
        //  如果有传进来就是说明是做数据回填的时候
        let _conditionFormItem = _data?.conditionFormItem || {};
        let _prop = _data?.prop;
        let _isKeepValue = true; // 是否保留原来的值
        // 条件变更的时候
        if (_prop) {
          let _propPath = JSON.parse(JSON.stringify(_prop));
          _propPath = _propPath.slice(0, 5)
          _isKeepValue = false;
          // let _conditionValue = data?.data;
          // let _conditionMapValue = data?.item?.map?.[_conditionValue];
          // console.log('_prop',_prop);
          // console.log('_conditionValue',_conditionValue);

          _propPath = ['$', ..._propPath]?.map(item => String(item));
          // 获取当前条件的表单
          _conditionFormItem = JSONPath({
            json: _formList,
            path: _propPath,
            wrap: false
          });
          _conditionFormItem = _conditionFormItem || {};
        }

        // console.log('conditionFormValue-_conditionFormItem',_conditionFormItem)


        // 条件
        let _conditionPath = `$..[?(@ && @.key == 'condition')]`;
        let _conditionItem = JSONPath({
          json: _conditionFormItem,
          path: _conditionPath
        });
        // console.log('_conditionItem',_conditionItem)
        _conditionItem = _conditionItem?.[0] || {};
        let _conditionValue = _conditionItem?.value;
        let _conditionMapValue = _conditionItem?.map?.[_conditionValue];
        _conditionItem.eventType = _conditionMapValue?.eventType;
        // console.log('_conditionMapValue---当前条件map',_conditionMapValue);


        // 选择符
        let _operationPath = `$..[?(@ && @.key == 'operation')]`;
        let _operationItem = JSONPath({
          json: _conditionFormItem,
          path: _operationPath
        });
        _operationItem = _operationItem?.[0] || {};
        _operationItem.value = _isKeepValue ? _operationItem.value : undefined;

        // 输入 选项 填值
        let _numPath = `$..[?(@ && @.key == 'num')]`;
        let _numItem = JSONPath({
          json: _conditionFormItem,
          path: _numPath
        });
        _numItem = _numItem?.[0] || {}


        _conditionItem.span = 24;
        _operationItem.isHidden = true;
        _operationItem.span = 10;


        // console.log('_numItem',_numItem)
        _numItem.isHidden = true;
        _numItem.eventType = _conditionMapValue?.eventType;
        _numItem.span = 14;
        let _oldNumItemValue = _isKeepValue ? _numItem.value : undefined;




        if (_numItem.eventType != 'property') {
          return false;
        }

        if (_conditionMapValue?.type?.toLowerCase() == 'string') {
          if (_conditionMapValue?.enum?.length > 0) {
            _numItem.formType = 'select';
            _numItem.options = _conditionMapValue?.enum?.map(item => {
              return {
                label: item.name,
                value: item.value,
              }

            })
            _numItem.placeholder = `请选择值`
            _numItem.isHidden = false;
            _conditionItem.span = 8;
            _numItem.span = 24;

            _numItem.value = _oldNumItemValue;

          }
        }
        if (_conditionMapValue?.type?.toLowerCase() == 'number') {
          _operationItem.isHidden = false;
          _numItem.isHidden = false;
          _numItem.formType = 'inputNumber';
          _numItem.max = _conditionMapValue?.maximum;
          _numItem.min = _conditionMapValue?.minimum;
          _numItem.controls = false;
          _numItem.textAlign = 'left';
          _numItem.unit = _conditionMapValue?.unit;
          _conditionItem.span = 8;
          _operationItem.span = 10;
          _numItem.span = 14;
          // _numItem.unit = '次/分';
          _numItem.value = Number(_oldNumItemValue);

        }
        if (_conditionMapValue?.type?.toLowerCase() == 'boolean') {

          _numItem.isHidden = false;
          _numItem.formType = 'switch';
          _conditionItem.span = 8;
          _numItem.span = 24;
          // _numItem.unit = '次/分';
          if(_oldNumItemValue == 'true' || _oldNumItemValue === true){
            _oldNumItemValue = true;
          }
          _numItem.value = _oldNumItemValue


        }


        // console.log('_numItem-set', _numItem)

        // this.addEditDialogData.formList = _formList;
      }


    },

    // section 设置操作的选项、表单
    setActionItem(key, data){
      let _actionItem = this.addEditDialogData.actionItem;

      if (key == 'deviceType') {
        // 获取formList 中所有key 为deviceType 的 formItem
        let _path = `$..[?(@ && @.key == 'deviceType')]`;
        let _formItem = JSONPath({
          json: _actionItem,
          path: _path
        });
        let _options = this.options.deviceType.options;
        _options = _options.filter(option => option?.actions?.options?.length > 0)
        _formItem?.map(item => item.options = _options);
      }
      if (key == 'locations') {
        let _path = `$..[?(@ && @.key == 'locations')]`;
        let _formItem = JSONPath({
          json: _actionItem,
          path: _path
        });
        _formItem?.map(item => item.options = this.options.locations.options);
      }
      if (key == 'actionTitle') {
        let _formList = this.addEditDialogData.formList;
        let _actionDividerPath = `$..[?(@ && @.key == 'actionDivider')]`;
        let _actionDividerItem = JSONPath({
          json: _formList,
          path: _actionDividerPath,
          wrap: true
        });
        // console.log('_actionDividerItem',_actionDividerItem);
        _actionDividerItem?.map((item, index) => item.value = `↑动作${index + 1}`)
        // console.log(this.addEditDialogData.formList)
      }

      if (key == 'actionOptions') {
        let _formList = this.addEditDialogData.formList;
        let _prop = data?.prop;
        let _propPath = JSON.parse(JSON.stringify(_prop));
        // console.log(_propPath)
        _propPath = _propPath.slice(0, 5)
        // console.log(_propPath)
        _propPath = ['$', ..._propPath]?.map(item => String(item));
        // 获取当前条件的表单
        let _actionFormItem = JSONPath({
          json: _formList,
          path: _propPath,
          wrap: false
        });

        let _actionFormItemChildren = _actionFormItem?.children || [];
        let _deviceTypePath = `$..[?(@ && @.key == 'deviceType')]`;
        let _deviceTypeItem = JSONPath({
          json: _actionFormItemChildren,
          path: _deviceTypePath
        });
        console.log('_item---', _deviceTypeItem)
        let _value = _deviceTypeItem[0]['value'];

        let _actionPath = `$..[?(@ && @.key == 'action')]`;
        let _actionItem = JSONPath({
          json: _actionFormItemChildren,
          path: _actionPath
        });
        console.log('_item---', _actionItem)
        _actionItem = _actionItem[0] || {};
        if (_value) {
          let _deviceTypeMap = this.options.deviceType.map[_value];
          console.log('_deviceTypeMap', _deviceTypeMap.actions.options)
          // console.log('_conditionItem',_conditionItem)
          _actionItem['options'] = _deviceTypeMap?.actions?.options || [];
          _actionItem['map'] = _deviceTypeMap?.actions?.map || {};
          _actionItem['value'] = '';
        } else {
          _actionItem['options'] = [];
          _actionItem['map'] = {};
          _actionItem['value'] = '';

        }

        // this.setConditionItem('conditionFormValue',data)

      }


      // 操作变更时候
      if (key == 'actionFormValue') {
        let _formList = this.addEditDialogData.formList;
        // let _formList = JSON.parse(JSON.stringify(this.addEditDialogData.formList));
        let _data = data;
        let _actionFormItem = _data?.actionFormItem || {};
        let _actionData = _data?.actionData || {};
        let _attributesData = _actionData?.actions?.[0]?.attributes || [];
        console.log('_actionData', _actionData)
        let _prop = _data?.prop;
        let _isKeepValue = true; // 是否保留原来的值
        // 动作变更的时候
        if (_prop) {
          _isKeepValue = false;
          let _propPath = JSON.parse(JSON.stringify(_prop));
          _propPath = _propPath.splice(0, 5)
          _propPath = ['$', ..._propPath]?.map(item => String(item));
          // 获取当前条件的表单
          _actionFormItem = JSONPath({
            json: _formList,
            path: _propPath,
            wrap: false
          });
          console.log('_actionFormItem', _actionFormItem)
          _actionFormItem = _actionFormItem || {};
        }


        // 动作
        let _actionPath = `$..[?(@ && @.key == 'action')]`;
        let _actionItem = JSONPath({
          json: _actionFormItem,
          path: _actionPath
        });
        _actionItem = _actionItem?.[0] || {};
        let _actionValue = _actionItem?.value;
        let _actionMapValue = _actionItem?.map?.[_actionValue];
        let _actionMapInput = _actionMapValue?.input


        let _actionAttributesPath = `$..[?(@ && @.key == 'actionAttributesContainer')]`;
        let _actionAttributesFormItem = JSONPath({
          json: _actionFormItem,
          path: _actionAttributesPath,
          wrap: false
        });
        _actionAttributesFormItem = _actionAttributesFormItem?.[0] || {};
        _actionAttributesFormItem.children = [];
        if (_actionMapInput?.length > 0) {
          // console.log('_actionAttributesFormItem', _actionAttributesFormItem)
          _actionMapInput?.map(item => {
            let _inputItem = item;
            let _actionAttributesItem = JSON.parse(JSON.stringify(this.addEditDialogData.actionAttributesItem));
            let _actionAttributesItemData = _attributesData.find(cItem => cItem.identifier == item?.id) || {};
            // console.log('_actionAttributesItemData', _actionAttributesItemData)
            // console.log('_actionAttributesItem', _actionAttributesItem);
            // console.log('_actionMapInput-item', item);
            let _identifierPath = `$..[?(@ && @.key == 'identifier')]`;
            let _identifierFormItem = JSONPath({
              json: _actionAttributesItem,
              path: _identifierPath,
              wrap: false
            });
            _identifierFormItem = _identifierFormItem?.[0] || {};
            let _identifierData = undefined;

            let _deltaValuePath = `$..[?(@ && @.key == 'deltaValue')]`
            let _deltaValueFormItem = JSONPath({
              json: _actionAttributesItem,
              path: _deltaValuePath,
              wrap: false
            });
            _deltaValueFormItem = _deltaValueFormItem?.[0] || {};
            let _deltaValueData = undefined;

            // console.log('_identifierFormItem', _identifierFormItem);
            // console.log('_deltaValueFormItem', _deltaValueFormItem);
            _identifierFormItem.formType = 'checkbox';
            _identifierFormItem.options = [
              {
                label: _inputItem.name,
                value: _inputItem.id,
              }
            ]
            _identifierFormItem.placeholder = `请选择值`
            _identifierFormItem.isHidden = false;
            _identifierFormItem.value = _identifierData;


            _deltaValueFormItem.isHidden = true;
            _deltaValueFormItem.placeholder = '请输入值'
            _deltaValueFormItem.rules = [{
              required: true,
              message: "请输入值",
              trigger: "blur"
            }];
            _deltaValueFormItem.linkageKey = 'prev';
            _deltaValueFormItem.value = _deltaValueData;
            if(_actionAttributesItemData?.identifier && _isKeepValue){
              _identifierData =  _actionAttributesItemData?.identifier
              _identifierFormItem.value = [
                _identifierData
              ]
              _deltaValueData = _actionAttributesItemData?.deltaValue;


            }


            if (_inputItem?.type?.toLowerCase() == 'string') {

              if (_inputItem?.enum?.length > 0) {
                _deltaValueFormItem.formType = 'radio';
                _deltaValueFormItem.options = _inputItem?.enum?.map(item => {
                  return {
                    label: item.name,
                    value: item.value,
                  }

                })
                _deltaValueFormItem.placeholder = '请选择值'
                _deltaValueFormItem.rules = [{
                  required: true,
                  message: "请选择值",
                  trigger: "blur"
                }];

                _deltaValueFormItem.value  = _deltaValueData
              }

            }
            if (_inputItem?.type?.toLowerCase() == 'number') {
              _deltaValueFormItem.formType = 'inputNumber';
              _deltaValueFormItem.max = _inputItem?.maximum;
              _deltaValueFormItem.min = _inputItem?.minimum;
              _deltaValueFormItem.controls = false;
              _deltaValueFormItem.textAlign = 'left';
              _deltaValueFormItem.unit = _inputItem?.unit;
              if (_inputItem?.maximum - _inputItem?.minimum <= 10) {
                _deltaValueFormItem.formType = 'slider';

              }
              _deltaValueData = Number(_deltaValueData);
              _deltaValueFormItem.value  = _deltaValueData


              // _numItem.unit = '次/分';
            }
            if (_inputItem?.type?.toLowerCase() == 'boolean') {

              _deltaValueFormItem.formType = 'switch';

              if(_deltaValueData === 'true' || _deltaValueData === true){
                _deltaValueData = true
              }else{
                _deltaValueData = false;
              }
              _deltaValueFormItem.value  = _deltaValueData


              // _numItem.unit = '次/分';
            }
            _actionAttributesFormItem.children.push(_actionAttributesItem)

          })

        }

        // this.addEditDialogData.formList = _formList;
      }


    },

    // section onFormChange
    onAddEditDialogFormChange(data){
      console.log(data);
      let _data = data;
      let _item = _data?.item;
      let _key = _item.key

      if (_key == "deviceType") {
        // this.getOptionsByDeviceType("", _item.value);
        let _prop = _data?.prop
        console.log(this.options.deviceType)
        let _formList = this.addEditDialogData.formList;
        _prop = _prop.slice(0, 5)
        _prop = ['$', ..._prop];
        let _formItem = JSONPath({
          json: _formList,
          path: _prop,
          wrap: false
        });
        let _key = _formItem?.key;
        if (_key == 'conditionItem') {
          this.setConditionItem('conditionOptions', _data);
        }
        if (_key == 'actionItem') {
          this.setActionItem('actionOptions', _data);
        }
        // console.log(_formItem);
      }
      if (_key == 'condition') {
        // console.log('condition', _data)
        // console.log('item', data.item)
        // console.log(this.options.deviceType)
        this.setConditionItem('conditionFormValue', _data)
      }
      if (_key == 'action') {
        this.setActionItem('actionFormValue', _data);
      }


    },


    // section 添加/删除 条件
    addDeleteAddEditDialogFormCondition(key, formData, conditionData){

      let _formList = this.addEditDialogData.formList;
      let _formData = formData;
      let _conditionData = conditionData;
      // 当前需要添加删除的位置
      let _addDeleteIndex = 0;
      // 是否是删除
      let _isDelete = (key == 'conditionDelete') ? 1 : 0; //
      let _path = `$..[?(@ && @.key == 'conditionItemContainer')]`;
      let _propPath = JSON.parse(JSON.stringify(_formData?.prop || []));
      //  如果有指定位置， 就说明是 点击的按钮
      if (_formData?.prop) {
        let _conditionPathIndex = 4;
        _addDeleteIndex = _propPath[_conditionPathIndex] + 1;
        let _path = _propPath.slice(0, _conditionPathIndex - 1);
        _path = ['$', ..._path]?.map(item => String(item));
      }
      let _formItem = JSONPath({
        json: _formList,
        path: _path,
        wrap: true
      });
      let _conditionFormItem = JSON.parse(JSON.stringify(this.addEditDialogData.conditionItem));
      // console.log('_formItem',_formItem)
      // 如果没有指定位置，说明就是初始化的时候添加的默认值
      if (!_formData?.prop) {
        _addDeleteIndex = _formItem?.[0]?.children?.length + 1 || 0;
      }
      // 有数据带进来 ，做数据回填操作
      if (_conditionData) {
        // console.log('_conditionFormItem',_conditionFormItem)
        // console.log('_conditionData',_conditionData)
        // 条件
        let _deviceTypePath = `$..[?(@ && @.key == 'deviceType')]`;
        let _deviceTypeItem = JSONPath({
          json: _conditionFormItem,
          path: _deviceTypePath
        });
        // console.log('_deviceTypeItem',_deviceTypeItem)
        _deviceTypeItem = _deviceTypeItem?.[0] || {};
        _deviceTypeItem.value = _conditionData?.deviceType;
        let _options = this.options.deviceType.options;
        _deviceTypeItem.options = _options.filter(option => option?.events?.options?.length > 0)

        let _locationsPath = `$..[?(@ && @.key == 'locations')]`;
        let _locationsItem = JSONPath({
          json: _conditionFormItem,
          path: _locationsPath
        });
        // console.log('_locationsItem',_locationsItem)
        _locationsItem = _locationsItem?.[0] || {};
        _locationsItem.value = _conditionData?.locations;


        let _conditionPath = `$..[?(@ && @.key == 'condition')]`;
        let _conditionItem = JSONPath({
          json: _conditionFormItem,
          path: _conditionPath
        });
        _conditionItem = _conditionItem[0] || {};
        _conditionItem.value = _conditionData?.events?.identifier || _conditionData?.properties?.identifier;
        let _deviceTypeMap = this.options.deviceType?.map?.[_deviceTypeItem.value];
        // console.log('this.options.deviceType?.ma',this.options.deviceType?.map)
        // console.log('_conditionItem',_conditionItem)
        _conditionItem['options'] = _deviceTypeMap?.events?.options || [];
        _conditionItem['map'] = _deviceTypeMap?.events?.map || {};

        if (_conditionData?.properties?.identifier) {
          let _operationPath = `$..[?(@ && @.key == 'operation')]`;
          let _operationItem = JSONPath({
            json: _conditionFormItem,
            path: _operationPath
          });
          _operationItem = _operationItem[0] || {};
          _operationItem.value = _conditionData?.properties?.operation

          let _numPath = `$..[?(@ && @.key == 'num')]`;
          let _numItem = JSONPath({
            json: _conditionFormItem,
            path: _numPath
          });
          _numItem = _numItem[0] || {};
          _numItem.value = _conditionData?.properties?.num
          _numItem.unit = _conditionData?.properties?.unit

        }



        this.setConditionItem('conditionFormValue', {conditionFormItem: _conditionFormItem})


      }

      // 添加
      if (_isDelete == 0) {
        _formItem[0]['children'].splice(_addDeleteIndex, _isDelete, _conditionFormItem);
        if (_propPath?.length > 0) {
          let _scrollPath = _propPath;
          _scrollPath[4] = _addDeleteIndex;
          _scrollPath = _scrollPath.slice(0, 7)
          _scrollPath[_scrollPath.length - 3] = _scrollPath[_scrollPath.length - 3] - 1;
          _scrollPath[_scrollPath.length - 1] = 0;
          console.log('_scrollPath', _scrollPath)
          setTimeout(() => {
            this.addEditDialogData.ref.scrollToField([..._scrollPath, 'value'].join('.'))
          }, 10)
        }


      } else {
        if (_formItem[0]['children']?.length < 2) {
          return this.global.message({
            message: '最少有一个条件',
            type: "error"
          });
        }
        let _titlePropPath = JSON.parse(JSON.stringify(_formData?.prop || []));
        _titlePropPath = _titlePropPath.slice(0, 7);
        _titlePropPath = ['$', ..._titlePropPath]?.map(item => String(item));
        // console.log(_path)
        let _titleFormItem = JSONPath({
          json: _formList,
          path: _titlePropPath,
          wrap: false
        });
        // console.log(_titleFormItem)
        let _title = _titleFormItem?.value?.split('↑')
        // let _message = `是否删除条件 ${_title[1]}`;
        let _message = `是否删除当前条件`;
        return this.global.messageBoxConfirm(_message).then((res) => {
          _formItem[0]['children'].splice(_addDeleteIndex - 1, _isDelete)
          this.setConditionItem('conditionTitle')

        });


      }


      this.setConditionItem('conditionTitle')

    },


    // section 添加/删除 动作
    addDeleteAddEditDialogFormAction(key, formData, actionData){
      let _formList = this.addEditDialogData.formList;
      let _formData = formData;
      let _actionData = actionData;
      // 当前需要添加删除的位置
      let _addDeleteIndex = 0;
      // 是否是删除
      let _isDelete = (key == 'actionDelete') ? 1 : 0; //
      let _path = `$..[?(@ && @.key == 'actionItemContainer')]`;
      let _propPath = JSON.parse(JSON.stringify(_formData?.prop || []));
      if (_formData?.prop) {
        let _actionPathIndex = 4;
        _addDeleteIndex = _propPath[_actionPathIndex] + 1;
        let _path = _propPath.slice(0, _actionPathIndex - 1);

        _path = ['$', ..._path]?.map(item => String(item));
      }


      let _formItem = JSONPath({
        json: _formList,
        path: _path,
        wrap: true
      });
      // console.log('action-_formItem', _formItem)
      let _actionFormItem = JSON.parse(JSON.stringify(this.addEditDialogData.actionItem));
      if (!_formData?.prop) {
        _addDeleteIndex = _formItem?.[0]?.children?.length + 1 || 0;
      }

      // 有数据带进来 ，做数据回填操作
      if (_actionData) {
        // console.log('_actionFormItem', _actionFormItem)
        // console.log('_actionData', _actionData)
        let _deviceTypePath = `$..[?(@ && @.key == 'deviceType')]`;
        let _deviceTypeItem = JSONPath({
          json: _actionFormItem,
          path: _deviceTypePath
        });
        _deviceTypeItem = _deviceTypeItem?.[0] || {};
        _deviceTypeItem.value = _actionData?.deviceType;
        let _options = this.options.deviceType.options;
        _deviceTypeItem.options = _options.filter(option => option?.actions?.options?.length > 0)
        // console.log('_deviceTypeItem', _deviceTypeItem)

        let _locationsPath = `$..[?(@ && @.key == 'locations')]`;
        let _locationsItem = JSONPath({
          json: _actionFormItem,
          path: _locationsPath
        });
        // console.log('_locationsItem',_locationsItem)
        _locationsItem = _locationsItem?.[0] || {};
        _locationsItem.value = _actionData?.locations;


        let _actionPath = `$..[?(@ && @.key == 'action')]`;
        let _actionItem = JSONPath({
          json: _actionFormItem,
          path: _actionPath
        });
        _actionItem = _actionItem[0] || {};

        _actionItem.value = _actionData?.actions?.[0]?.identifier
        let _deviceTypeMap = this.options.deviceType?.map?.[_deviceTypeItem.value];
        // console.log('this.options.deviceType?.ma',this.options.deviceType?.map)
        _actionItem['options'] = _deviceTypeMap?.actions?.options || [];
        _actionItem['map'] = _deviceTypeMap?.actions?.map || {};
        // console.log('_actionItem', _actionItem)


        // this.setConditionItem('conditionFormValue', {conditionFormItem:_conditionFormItem})
        this.setActionItem('actionFormValue', { actionFormItem: _actionFormItem, actionData: _actionData });


      }


      if (_isDelete == 0) {

        _formItem[0]['children'].splice(_addDeleteIndex, _isDelete, _actionFormItem)

        // if (_propPath?.length > 0) {
        //   let _scrollPath = _propPath;
        //   _scrollPath[4] = _addDeleteIndex;
        //   _scrollPath = _scrollPath.slice(0, 7)
        //   _scrollPath[_scrollPath.length - 1] = 0
        //   setTimeout(() => {
        //     this.addEditDialogData.ref.scrollToField([..._scrollPath, 'value'].join('.'))
        //   }, 10)
        // }
        if (_propPath?.length > 0) {
          let _scrollPath = _propPath;
          _scrollPath[4] = _addDeleteIndex;
          _scrollPath = _scrollPath.slice(0, 7)
          _scrollPath[_scrollPath.length - 3] = _scrollPath[_scrollPath.length - 3] - 1;
          _scrollPath[_scrollPath.length - 1] = 0;
          // console.log('_scrollPath', _scrollPath)
          setTimeout(() => {
            this.addEditDialogData.ref.scrollToField([..._scrollPath, 'value'].join('.'))
          }, 10)
        }


      } else {
        if (_formItem[0]['children']?.length < 2) {
          return this.global.message({
            message: '最少有一个动作',
            type: "error"
          });
        }
        let _titlePropPath = JSON.parse(JSON.stringify(_formData?.prop || []));
        _titlePropPath = _titlePropPath.slice(0, 7);
        _titlePropPath = ['$', ..._titlePropPath]?.map(item => String(item));
        // console.log(_path)
        let _titleFormItem = JSONPath({
          json: _formList,
          path: _titlePropPath,
          wrap: false
        });
        // console.log(_titleFormItem)
        let _title = _titleFormItem?.value?.split('↑')
        // let _message = `是否删除条件 ${_title[1]}`;
        let _message = `是否删除当前动作`;
        return this.global.messageBoxConfirm(_message).then((res) => {
          _formItem[0]['children'].splice(_addDeleteIndex - 1, _isDelete)
          this.setActionItem('actionTitle')

        });
      }
      this.setActionItem('actionTitle')


    },


    onAddEditDialogFormItemButtonClick(data){
      console.log(data);
      let _key = data?.bItem.key;

      if (_key == "conditionAdd" || _key == "conditionDelete") {
        let _data = data;
        let _prop = data?.prop
        // console.log(_index,_path)
        this.addDeleteAddEditDialogFormCondition(_key, _data);
      }
      if (_key == "actionAdd" || _key == "actionDelete") {
        let _data = data;
        let _prop = data?.prop
        // console.log(_index,_path)
        this.addDeleteAddEditDialogFormAction(_key, _data);
      }

    },


    // section 弹框表单数据回填
    addEditDialogFormFormat(data = {}){

      let _data = data;
      let _formList = this.addEditDialogData.formList
      console.log('详情数据', _data);
      console.log('整体表单', _formList);
      let _templateNamePath = `$..[?(@ && @.key == 'templateName')]`;
      let _templateNameItem = JSONPath({
        json: _formList,
        path: _templateNamePath,
        wrap: true
      });
      _templateNameItem = _templateNameItem[0] || {}
      console.log('_templateNameItem', _templateNameItem);
      _templateNameItem['value'] = _data?.templateName;

      let _remarksPath = `$..[?(@ && @.key == 'remarks')]`;
      let _remarksItem = JSONPath({
        json: _formList,
        path: _remarksPath,
        wrap: true
      });
      _remarksItem = _remarksItem[0] || {}
      console.log('_remarksItem', _remarksItem);
      _remarksItem['value'] = _data?.remarks;

      let _triggerTypePath = `$..[?(@ && @.key == 'triggerType')]`;
      let _triggerTypeItem = JSONPath({
        json: _formList,
        path: _triggerTypePath,
        wrap: true
      });
      _triggerTypeItem = _triggerTypeItem[0] || {}
      console.log('_triggerTypeItem', _triggerTypeItem);
      _triggerTypeItem['value'] = _data?.triggerType;

      let _ruleConditionPath = `$..[?(@ && @.key == 'ruleCondition')]`;
      let _ruleConditionItem = JSONPath({
        json: _formList,
        path: _ruleConditionPath,
        wrap: true
      });
      _ruleConditionItem = _ruleConditionItem[0] || {}
      // console.log('_ruleConditionItem', _ruleConditionItem);
      _ruleConditionItem['value'] = _data?.deviceTrigger?.ruleCondition;

      let _conditionItemContainerPath = `$..[?(@ && @.key == 'conditionItemContainer')]`;
      let _conditionItemContainer = JSONPath({
        json: _formList,
        path: _conditionItemContainerPath,
        wrap: true
      });
      _conditionItemContainer[0]['children'] = [];


      let _triggers = _data?.deviceTrigger?.triggers || [];

      if (_triggers?.length > 0) {
        _triggers?.map(item => {
          this.addDeleteAddEditDialogFormCondition('', '', item)

        })
      } else {
        this.addDeleteAddEditDialogFormCondition()

      }



      let _actionItemContainerPath = `$..[?(@ && @.key == 'actionItemContainer')]`;
      let _actionItemContainer = JSONPath({
        json: _formList,
        path: _actionItemContainerPath,
        wrap: true
      });
      _actionItemContainer[0]['children'] = [];


      let _executes = data?.executes || [];

      if (_executes?.length > 0) {
        _executes?.map(item => {
          this.addDeleteAddEditDialogFormAction('', '', item)

        })
      } else {
        this.addDeleteAddEditDialogFormAction()

      }


      setTimeout(()=> this.addEditDialogData.isLoading = false, 100)


      this.addEditDialogData.ref?.setLinkage()
    },



    // section 获取详情
    getAutomationDetail(){

      setTimeout(()=>{
        this.addEditDialogData.detail = {...detail};
        let _data = this.addEditDialogData.detail
        setTimeout(()=>this.addEditDialogFormFormat(_data), 50)
      },200)
    },

    // section 打开弹框
    openAddEditDialog(type = 'add', data = {}){
      this.addEditDialogData.isShow = true;
      this.addEditDialogData.type = type;
      this.addEditDialogData.isLoading = false;
      this.addEditDialogData.isLoading = true;
      // setTimeout(() => {
      //   // this.isLoading = ElLoading.service({target: this.addEditDialogData.ref  })
      //
      // },10)
      console.log(data);
      if (this.addEditDialogData.type == 'add') {
        this.addEditDialogData.detail = data;
        setTimeout(()=>this.addEditDialogFormFormat(), 50)

      }
      if (this.addEditDialogData.type == 'edit') {
        this.addEditDialogData.detail = data;
        this.getAutomationDetail()
      }


    },
  },



});


