/**
 @Author: 戴伟
 @Date: 2023/03/01 15:53:40
 @FilePath: src/example/dialog/config.js
 @LastEditTime: ''
 @LastEditors: ''
 @Description:
 do.....
 */

import dayjs from "dayjs";

// section listQuery中 表单列表
export const listQueryFormList = [
  {
    name: "名称",
    key: "name",
    placeholder: "请输入名称",
    formType: "input",
    clearable: true,
    labelWidth: "4em",
    width: 300,
  },
  {
    name: "状态",
    key: "radio",
    value: 1,
    labelWidth: "4em",
    placeholder: "请选择选项",
    disabled: false,
    formType: "radio",
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
        label: "选项3",
        value: 3,
      },
      {
        label: "选项4",
        value: 4,
      },
    ],
    span: 24,
    buttonList: [
      { name: "查 询", key: "search", type: "primary" },
      { name: "重 置", key: "reset" },
    ],
  },
];
// section listQuery中 表单按钮
export const listQueryButtonList = [
  { name: "新 增", key: "add", type: "primary" },
];

// section table设置列配置
export const tableSettingsConfig = {
  isShow: true,
  label: "设置",
  fixed: "right",
  type: "123123",
  align: "center",
  width: 120,
  buttonList: [
    {
      name: "编辑",
      key: "edit",
      type: "button",
    },
  ],
};
export const tableShowConfig = {
  isShowExpand: false, //是否显示扩展
  isShowSelection: false, //是否显示选项框
  isShowIndex: true, //是否显示序号
};
export const tableKeyList = [
  { label: "id", key: "id", showOverflowTooltip: true },
  { label: "模板名称", key: "templateName", showOverflowTooltip: true },
  { label: "描述", key: "remarks", showOverflowTooltip: true },

];


//  EQ:等于   NE：不等于   LT：小于  LE：小于等于  GT：大于   GE：大于等于
export const operationOptions = {
  options:[
    {
      label:"小于",
      value:"LT",
    },
    {
      label:"小于等于",
      value:"LE",
    },
    {
      label:"大于",
      value:"GT",
    },
    {
      label:"大于等于",
      value:"GE",
    },
    {
      label:"等于",
      value:"EQ",
    },
    {
      label:"不等于",
      value:"NE",
    },

  ],
  map: {

  }
}
// section 弹窗formList
export const addEditDialogFormList = [
  {
    name: "名称",
    key: "templateName",
    placeholder: "请输入名称",
    formType: "input",
    clearable: true,
    labelWidth: "4em",
    span: 24,
    rules: [{ required: true, message: "请输入名称", trigger: "blur" }],
  },
  {
    name: "描述",
    key: "remarks",
    placeholder: "请输入描述",
    formType: "input",
    clearable: true,
    labelWidth: "4em",
    span: 24,
    rules: [{ required: true, message: "请输入描述", trigger: "blur" }],
  },
  {
    name: "触发类型",
    key: "triggerType",
    placeholder: "请选择触发类型",
    formType: "select",
    clearable: true,
    labelWidth: "0",
    span: 24,
    value: '',
    rules: [{ required: true, message: "请选择触发类型", trigger: "blur" }],
    options: [
      //   //触发类型  0:设备触发  1:定时触发 2：手动触发
      {
        label: "设备触发",
        value: 0,
      },
      {
        label: "定时触发",
        value: 1,
      },
      // {
      //   label: "手动触发",
      //   value: 2,
      // },
    ],
  },
  //
  {
    name: "定时器",
    key: "triggerTime",
    value: "",
    placeholder: "请选择",
    formType: "cron",
    span: 24,
    linkageKey: "triggerType",
    linkageValue: 1,
    rules: [{ required: true, message: "请选择", trigger: "blur" }],
  },

  {
    span: 24,
    formType: " ",
    key: "conditionContainer",
    linkageKey: "triggerType",
    linkageValue: 0,
    marginBottom:"0",
    children: [
      {
        key:"conditionWhen",
        formType: "divider",
        contentPosition: "left",
        span: 14,
        value: "当",
        marginBottom: "0",
        childrenSpan: 10,
        class:"dividerWhen",
        children: [
          {
            name: "",
            key: "ruleCondition",
            placeholder: "请选择满足条件",
            formType: "select",
            clearable: true,
            labelWidth: "0",
            span: 24,
            rules: [
              { required: true, message: "请选择满足条件", trigger: "blur" },
            ],
            options: [
              //满足条件 0：任意满足 1：同时满足
              {
                label: "任意满足",
                value: 0,
              },
              {
                label: "同时满足",
                value: 1,
              },
            ],
          },
        ],
      },
      {
        key:"conditionItemContainer",
        formType: "",
        span: 24,
        children: [
        ],
      }
    ],
  },
  {
    span: 24,
    formType: " ",
    key: "actionContainer",
    marginBottom:"0",
    children: [
      {
        key:"actionWhen",
        formType: "divider",
        contentPosition: "left",
        span: 24,
        value: "就",
        marginBottom: "0",
        childrenSpan: 10,
        class:"dividerWhen",

      },
      {
        key:"actionItemContainer",
        formType: "",
        span: 24,
        children: [
        ],
      }
    ],
  },
];
export const actionItem = {
  formType: "",
  key:"actionItem",
  span: 24,
  children: [
    {
      name: "设备类型",
      key: "deviceType",
      placeholder: "请选择名称",
      formType: "select",
      clearable: true,
      labelWidth: "4em",
      span: 12,
      rules: [
        { required: true, message: "请选择名称", trigger: "blur" },
      ],
    },
    {
      name: "位置",
      key: "locations",
      placeholder: "请选择位置",
      formType: "select",
      multiple: true,
      collapseTags: true,
      collapseTagsTooltip: true,
      clearable: true,
      labelWidth: "4em",
      span: 12,
      rules: [
        { required: true, message: "请选择位置", trigger: "blur" },
      ],
    },
    {
      name: "操作",
      key: "action",
      placeholder: "请选择条件",
      formType: "select",
      clearable: true,
      labelWidth: "4em",
      span: 24,
      isSpanTransition:false,
      childrenSpan: 0,
      marginBottom:"24px",
      rules: [
        { required: true, message: "请选择条件", trigger: "blur" },
      ],

    },
    {
      name: "设备参数",
      key: "actionAttributesContainer",
      span: 0,
      childrenSpan: 24,
      children: [

      ]
    },

    {
      formType: "divider",
      contentPosition: "left",
      span: 24,
      value: "↑操作1",
      class:"action-divider",
      key:"actionDivider",
      // marginBottom:"0",
      childrenSpan: 10,
      buttonList:[
        { name: "", class:"dividerButton actionButton add", icon: "Plus", key: "actionAdd", isText: false },
        { name: "", class:"dividerButton actionButton delete", icon: "Delete", type:"danger", key: "actionDelete", isText: false },
      ]
    },
  ],
};
export const actionAttributesItem =  {
  name: "",
  key: "actionAttributesItem",
  span: 0,
  childrenSpan: 24,
  children: [
    {
      name: "",
      key: "identifier",
      value: [],
      placeholder: "请选择选项",
      disabled: false,
      formType: "checkbox",
      span: 6,
      // rules: [{required: true, message: "请选择选项", trigger: "blur"}],
      options: [
        {
          label: "选项1",
          value: 1,
        },
      ]
    },
    {
      name: "",
      key: "deltaValue",
      placeholder: "请输入值",
      formType: "input",
      clearable: true,
      labelWidth: "4em",
      span: 18,
      rules: [{ required: true, message: "请输入值", trigger: "blur" }],
    },
  ]
};



export const conditionItem = {
  formType: "",
  key:"conditionItem",
  span: 24,
  children: [
    {
      name: "设备类型",
      key: "deviceType",
      placeholder: "请选择名称",
      formType: "select",
      clearable: true,
      labelWidth: "4em",
      span: 12,
      rules: [
        { required: true, message: "请选择名称", trigger: "blur" },
      ],
    },
    {
      name: "位置",
      key: "locations",
      placeholder: "请选择位置",
      formType: "select",
      multiple: true,
      collapseTags: true,
      collapseTagsTooltip: true,
      clearable: true,
      labelWidth: "4em",
      span: 12,
      rules: [
        { required: true, message: "请选择位置", trigger: "blur" },
      ],
    },
    {
      name: "条件",
      key: "condition",
      placeholder: "请选择条件",
      formType: "select",
      clearable: true,
      labelWidth: "4em",
      span: 24,
      isSpanTransition:false,
      childrenSpan: 0,
      marginBottom:"24px",
      rules: [
        { required: true, message: "请选择条件", trigger: "blur" },
      ],

    },
    {
      name: "",
      key: "",
      span: 0,
      childrenSpan: 16,
      children: [
        {
          formClass:"condition-no-label",
          name: " ",
          key: "operation",
          placeholder: "请选择",
          formType: "select",
          clearable: true,
          labelWidth: "4em",
          span: 10,
          options:operationOptions.options,
          rules: [{ required: true, message: "请选择", trigger: "blur" }],
          isHidden:true,
          isSpanTransition:false,
        },
        {
          formClass:"condition-no-label",
          name: " ",
          key: "num",
          placeholder: "请输入值",
          formType: "input",
          clearable: true,
          labelWidth: "4em",
          span: 14,
          rules: [{ required: true, message: "请输入值", trigger: "blur" }],
          isHidden:true,
          isSpanTransition:false,

        },
      ]
    },

    {
      formType: "divider",
      contentPosition: "left",
      span: 24,
      value: "↑条件1",
      class:"condition-divider",
      key:"conditionDivider",
      // marginBottom:"0",
      childrenSpan: 10,
      buttonList:[
        { name: "", class:"dividerButton conditionButton add", icon: "Plus", key: "conditionAdd", isText: false },
        { name: "", class:"dividerButton conditionButton delete", icon: "Delete", type:"danger", key: "conditionDelete", isText: false },
      ]
    },
  ],
};


export const deviceOptions = [
  {
    "type": "DZR",
    "@type": [
      "AIR_PURIFIER"
    ],
    "name": "空气消杀设备",
    "models": [
      {
        "name": "环境监控仪(工业空气质量检测仪)",
        "value": "DZR-JCBM2101/L3"
      },
      {
        "name": "环境监控仪（管道消杀机）",
        "value": "DZR-JKQR2101"
      },
      {
        "name": "环境监控仪（新风控制器）",
        "value": "DZR-JKQRX4V-A"
      }
    ],
    "dataProto": 5,
    "nodeType": 1,
    "properties": [
      {
        "id": "humidity",
        "name": "湿度",
        "type": "number",
        "unit": "%",
        "readOnly": true,
        "minimum": 0,
        "maximum": 100
      },
      {
        "id": "mode",
        "name": "模式",
        "type": "string",
        "enum": [
          {
            "name": "手动",
            "value": "MANUAL"
          },
          {
            "name": "自动",
            "value": "AUTO"
          }
        ]
      },
      {
        "id": "temperature",
        "name": "温度",
        "type": "number",
        "unit": "℃",
        "readOnly": true,
        "minimum": -40,
        "maximum": 125
      },
      {
        "id": "tvoc",
        "name": "TVOC",
        "type": "number",
        "unit": "mg/m³",
        "readOnly": true,
        "minimum": 0.22,
        "maximum": 9.99
      },
      {
        "id": "co2",
        "name": "二氧化碳浓度",
        "type": "number",
        "unit": "ppm",
        "readOnly": true,
        "minimum": 400,
        "maximum": 9999
      },
      {
        "id": "fanSpeed",
        "name": "风速档位",
        "type": "number",
        "unit": "档",
        "minimum": 0,
        "maximum": 3
      },
      {
        "id": "pm10",
        "name": "PM10含量",
        "type": "number",
        "unit": "μg/m³",
        "readOnly": true,
        "minimum": 0,
        "maximum": 999
      },
      {
        "id": "pm2.5",
        "name": "PM2.5含量",
        "type": "number",
        "unit": "μg/m³",
        "readOnly": true,
        "minimum": 0,
        "maximum": 999
      },
      {
        "id": "turnOnState",
        "name": "开关状态",
        "type": "string",
        "enum": [
          {
            "name": "开启",
            "value": "ON"
          },
          {
            "name": "关闭",
            "value": "OFF"
          }
        ]
      }
    ],
    "actions": [
      {
        "id": "turnOff",
        "name": "关机"
      },
      {
        "id": "turnOn",
        "name": "开机",
        "input": [
          {
            "id": "mode",
            "name": "模式",
            "type": "string",
            "enum": [
              {
                "name": "手动",
                "value": "MANUAL"
              },
              {
                "name": "自动",
                "value": "AUTO"
              }
            ],
            "required": true
          },
          {
            "id": "fanSpeed",
            "name": "风速档位",
            "type": "number",
            "unit": "档",
            "required": true,
            "minimum": 0,
            "maximum": 3
          },
          {
            "id": "test",
            "name": "布尔测试",
            "type": "boolean"
          }
        ]
      },
      {
        "id": "setFanSpeed",
        "name": "设置风速",
        "input": [
          {
            "id": "fanSpeed",
            "name": "风速档位",
            "type": "number",
            "unit": "档",
            "required": true,
            "minimum": 0,
            "maximum": 3
          }
        ]
      },
      {
        "id": "setMode",
        "name": "设置模式",
        "input": [
          {
            "id": "mode",
            "name": "模式",
            "type": "string",
            "enum": [
              {
                "name": "手动",
                "value": "MANUAL"
              },
              {
                "name": "自动",
                "value": "AUTO"
              }
            ],
            "required": true
          }
        ]
      }
    ]
  },
  {
    "type": "ZR-HC-CJ",
    "@type": [
      "PUSH-BUTTON"
    ],
    "name": "智能场景开关",
    "models": [
      {
        "name": "二联开关",
        "value": "ZR-HC-CJ2"
      },
      {
        "name": "四联开关",
        "value": "ZR-HC-CJ4"
      },
      {
        "name": "六联开关",
        "value": "ZR-HC-CJ6"
      }
    ],
    "dataProto": 6,
    "nodeType": 1
  },
  {
    "type": "a1HI5VlUwUl",
    "@type": [
      "LOCK"
    ],
    "name": "智能门锁一握开（猫眼款）",
    "models": [
      {
        "name": "智能门锁一握开（猫眼款）",
        "value": "ZR-HC-SL5110E-C"
      }
    ],
    "dataProto": 6,
    "nodeType": 1,
    "properties": [
      {
        "id": "electricityCapacity0",
        "name": "0号电池电量",
        "type": "number",
        "unit": "%",
        "readOnly": true,
        "minimum": 0,
        "maximum": 100
      },
      {
        "id": "electricityCapacity1",
        "name": "1号电池电量",
        "type": "number",
        "unit": "%",
        "readOnly": true,
        "minimum": 0,
        "maximum": 100
      },
      {
        "id": "lockState",
        "name": "门锁状态",
        "type": "number",
        "enum": [
          {
            "name": "已上锁",
            "value": "LOCKED"
          },
          {
            "name": "未上锁",
            "value": "UNLOCKED"
          },
          {
            "name": "状态异常",
            "value": "JAMMED"
          }
        ],
        "readOnly": true
      }
    ],
    "events": [
      {
        "id": "lockAlarm",
        "name": "门锁告警",
        "eventType": "event"
      },
      {
        "id": "electricityCapacity0",
        "name": "0号电池电量",
        "type": "number",
        "unit": "%",
        "readOnly": true,
        "minimum": 0,
        "maximum": 100,
        "eventType": "property"
      },
      {
        "id": "electricityCapacity1",
        "name": "1号电池电量",
        "type": "number",
        "unit": "%",
        "readOnly": true,
        "minimum": 0,
        "maximum": 100,
        "eventType": "property"
      },
      {
        "id": "lockState",
        "name": "开关状态",
        "type": "string",
        "enum": [
          {
            "name": "已上锁",
            "value": "LOCKED"
          },
          {
            "name": "未上锁",
            "value": "UNLOCKED"
          },
          {
            "name": "状态异常",
            "value": "JAMMED"
          }
        ],
        "readOnly": true,
        "eventType": "property"
      }
    ]
  },
  {
    "type": "ZR-AS-WG",
    "@type": [
      "GATEWAY"
    ],
    "name": "智能空开网关",
    "models": [
      {
        "name": "智能空开网关",
        "value": "ZR-AS-WG"
      }
    ],
    "dataProto": 2,
    "nodeType": 2
  },
  {
    "type": "ZR-HC-CL",
    "@type": [
      "SWITCH"
    ],
    "name": "智能窗帘开关",
    "models": [
      {
        "name": "一联开关",
        "value": "ZR-HC-CL1"
      },
      {
        "name": "二联开关",
        "value": "ZR-HC-CL2"
      }
    ],
    "dataProto": 6,
    "nodeType": 1
  },
  {
    "type": "ZR-HC-SR60",
    "@type": [
      "HUMAN_DETECTION_RADAR"
    ],
    "name": "人体体征检测雷达",
    "models": [
      {
        "name": "人体体征检测雷达",
        "value": "ZR-HC-SR60"
      }
    ],
    "dataProto": 2,
    "nodeType": 1,
    "properties": [
      {
        "id": "heartRate",
        "name": "心率值",
        "type": "number",
        "unit": "次/分",
        "readOnly": true
      },
      {
        "id": "inBedState",
        "name": "在离床状态",
        "type": "boolean",
        "readOnly": true
      },
      {
        "id": "breathe",
        "name": "呼吸值",
        "type": "number",
        "unit": "次/分",
        "readOnly": true
      }
    ],
    "events": [
      {
        "id": "breatheAbnormal",
        "name": "呼吸异常",
        "eventType": "event"
      },
      {
        "id": "heartBeatAbnormal",
        "name": "心跳异常",
        "eventType": "event"
      },
      {
        "id": "inBedAbnormal",
        "name": "在离床异常",
        "eventType": "event"
      },
      {
        "id": "heartRate",
        "name": "心率值",
        "type": "number",
        "unit": "次/分",
        "readOnly": true,
        "eventType": "property"
      },
      {
        "id": "breathe",
        "name": "呼吸值",
        "type": "number",
        "unit": "次/分",
        "readOnly": true,
        "eventType": "property"
      },
      {
        "id": "inBedState",
        "name": "在离床状态",
        "type": "boolean",
        "readOnly": true,
        "eventType": "property"
      }
    ]
  },
  {
    "type": "ZR-HC-DCK-A",
    "@type": [
      "CURTAIN"
    ],
    "name": "窗帘电机（开合帘）",
    "models": [
      {
        "name": "窗帘电机（开合帘）",
        "value": "ZR-HC-DCJ-Z"
      }
    ],
    "dataProto": 6,
    "nodeType": 1,
    "properties": [
      {
        "id": "percentage",
        "name": "百分比属性",
        "type": "number",
        "unit": "%",
        "minimum": 0,
        "maximum": 100
      },
      {
        "id": "workState",
        "name": "工作状态",
        "type": "string",
        "enum": [
          {
            "name": "停止",
            "value": "STOP"
          },
          {
            "name": "开始",
            "value": "START"
          },
          {
            "name": "暂停",
            "value": "PAUSE"
          }
        ]
      }
    ],
    "actions": [
      {
        "id": "pause",
        "name": "暂停"
      },
      {
        "id": "turnOff",
        "name": "关闭"
      },
      {
        "id": "turnOn",
        "name": "打开"
      },
      {
        "id": "turnOnPercent",
        "name": "打开百分比",
        "input": [
          {
            "id": "deltaValue",
            "name": "调整值",
            "type": "number",
            "unit": "%",
            "minimum": 0,
            "maximum": 100
          }
        ]
      }
    ],
    "events": [
      {
        "id": "workState",
        "name": "工作状态",
        "type": "string",
        "enum": [
          {
            "name": "停止",
            "value": "STOP"
          },
          {
            "name": "开始",
            "value": "START"
          },
          {
            "name": "暂停",
            "value": "PAUSE"
          }
        ],
        "eventType": "property"
      },
      {
        "id": "percentage",
        "name": "百分比属性",
        "type": "number",
        "unit": "%",
        "minimum": 0,
        "maximum": 100,
        "eventType": "property"
      }
    ]
  },
  {
    "type": "ZR-HC-IR-Z",
    "@type": [
      "MOTION_SENSOR"
    ],
    "name": "红外人体移动传感器",
    "models": [
      {
        "name": "红外人体移动传感器",
        "value": "ZR-HC-IR-Z"
      }
    ],
    "dataProto": 6,
    "nodeType": 1,
    "properties": [
      {
        "id": "motionState",
        "name": "红外检测状态",
        "type": "string",
        "enum": [
          {
            "name": "有人",
            "value": "ON"
          },
          {
            "name": "无人",
            "value": "OFF"
          }
        ],
        "readOnly": true
      }
    ],
    "events": [
      {
        "id": "motionState",
        "name": "红外检测状态",
        "type": "string",
        "enum": [
          {
            "name": "有人",
            "value": "ON"
          },
          {
            "name": "无人",
            "value": "OFF"
          }
        ],
        "eventType": "property"
      }
    ]
  },
  {
    "type": "ZR-HC-KG-BUTTON",
    "@type": [
      "SWITCH"
    ],
    "name": "开关按键",
    "models": [
      {
        "name": "开关按键",
        "value": "ZR-HC-KG-BUTTON"
      }
    ],
    "dataProto": 6,
    "nodeType": 3,
    "properties": [
      {
        "id": "turnOnState",
        "name": "开关状态",
        "type": "string",
        "enum": [
          {
            "name": "开启电源",
            "value": "ON"
          },
          {
            "name": "关闭电源",
            "value": "OFF"
          }
        ]
      }
    ],
    "actions": [
      {
        "id": "turnOff",
        "name": "关闭"
      },
      {
        "id": "turnOn",
        "name": "打开"
      }
    ],
    "events": [
      {
        "id": "turnOnState",
        "name": "开关状态",
        "type": "string",
        "enum": [
          {
            "name": "开启电源",
            "value": "ON"
          },
          {
            "name": "关闭电源",
            "value": "OFF"
          }
        ],
        "eventType": "property"
      }
    ]
  },
  {
    "type": "ZR-HC-MC-Z",
    "@type": [
      "DOOR_SENSOR"
    ],
    "name": "门磁传感器",
    "models": [
      {
        "name": "门磁传感器",
        "value": "ZR-HC-MC-Z"
      }
    ],
    "dataProto": 6,
    "nodeType": 1,
    "properties": [
      {
        "id": "turnOnState",
        "name": "开关状态",
        "type": "string",
        "enum": [
          {
            "name": "开启电源",
            "value": "ON"
          },
          {
            "name": "关闭电源",
            "value": "OFF"
          }
        ],
        "readOnly": true
      }
    ],
    "events": [
      {
        "id": "turnOnState",
        "name": "开关状态",
        "type": "string",
        "enum": [
          {
            "name": "开启电源",
            "value": "ON"
          },
          {
            "name": "关闭电源",
            "value": "OFF"
          }
        ],
        "readOnly": true,
        "eventType": "property"
      },
      {
        "id": "tamperAlarm",
        "name": "防撬报警",
        "eventType": "event"
      }
    ]
  },
  {
    "type": "ZR-HC-ZM",
    "@type": [
      "LIGHT"
    ],
    "name": "智能灯",
    "models": [
      {
        "name": "智能灯",
        "value": "ZR-HC-ZM"
      }
    ],
    "dataProto": 6,
    "nodeType": 1,
    "properties": [
      {
        "id": "brightness",
        "name": "亮度",
        "type": "Number",
        "unit": "%",
        "minimum": 0,
        "maximum": 100
      },
      {
        "id": "colorTemperatureInKelvin",
        "name": "色温",
        "type": "Number",
        "unit": "K",
        "minimum": 1000,
        "maximum": 9000
      },
      {
        "id": "turnOnState",
        "name": "开关状态",
        "type": "string",
        "enum": [
          {
            "name": "开启电源",
            "value": "ON"
          },
          {
            "name": "关闭电源",
            "value": "OFF"
          }
        ]
      }
    ],
    "actions": [
      {
        "id": "turnOn",
        "name": "打开"
      },
      {
        "id": "decrementBrightnessPercentage",
        "name": "降低亮度"
      },
      {
        "id": "decrementColorTemperature",
        "name": "降低色温"
      },
      {
        "id": "incrementBrightnessPercentage",
        "name": "调高亮度",
        "input": [
          {
            "id": "deltaValue",
            "name": "亮度调整信息",
            "type": "number",
            "unit": "%"
          }
        ]
      },
      {
        "id": "incrementColorTemperature",
        "name": "调高色温"
      },
      {
        "id": "setBrightness",
        "input": [
          {
            "id": "brightness",
            "name": "亮度",
            "type": "Number",
            "unit": "%",
            "minimum": 0,
            "maximum": 100
          }
        ]
      },
      {
        "id": "setColorTemperature",
        "input": [
          {
            "id": "colorTemperatureInKelvin",
            "name": "色温",
            "type": "Number",
            "unit": "K",
            "minimum": 1000,
            "maximum": 9000
          }
        ]
      },
      {
        "id": "turnOff",
        "name": "关闭"
      }
    ],
    "events": [
      {
        "id": "turnOnState",
        "name": "开关状态",
        "type": "string",
        "enum": [
          {
            "name": "开启电源",
            "value": "ON"
          },
          {
            "name": "关闭电源",
            "value": "OFF"
          }
        ],
        "eventType": "property"
      },
      {
        "id": "brightness",
        "name": "亮度",
        "type": "Number",
        "unit": "%",
        "minimum": 0,
        "maximum": 100,
        "eventType": "property"
      },
      {
        "id": "colorTemperatureInKelvin",
        "name": "色温",
        "type": "Number",
        "unit": "K",
        "minimum": 1000,
        "maximum": 9000,
        "eventType": "property"
      }
    ]
  },
  {
    "type": "ZR-AS-WD",
    "@type": [
      "SWITCH"
    ],
    "name": "智能空开",
    "models": [
      {
        "name": "1P智能空开C型",
        "value": "ZR-AS-WD1C"
      },
      {
        "name": "2P智能空开C型（带漏保）",
        "value": "ZR-AS-WD2CB"
      },
      {
        "name": "2P智能空开C型（带漏检不带漏保）",
        "value": "ZR-AS-WD2CJ"
      },
      {
        "name": "3P智能空开C型",
        "value": "ZR-AS-WD3C"
      },
      {
        "name": "4P智能空开C型（带漏保）",
        "value": "ZR-AS-WD4CB"
      },
      {
        "name": "4P智能空开C型（带漏检不带漏保）",
        "value": "ZR-AS-WD4CJ"
      }
    ],
    "dataProto": 2,
    "nodeType": 3,
    "properties": [
      {
        "id": "turnOnState",
        "name": "开关状态",
        "type": "string",
        "enum": [
          {
            "name": "合闸",
            "value": "ON"
          },
          {
            "name": "分闸",
            "value": "OFF"
          }
        ]
      }
    ],
    "actions": [
      {
        "id": "find",
        "name": "寻找空开"
      },
      {
        "id": "turnOff",
        "name": "分闸"
      },
      {
        "id": "turnOn",
        "name": "合闸"
      }
    ],
    "events": [
      {
        "id": "turnOnState",
        "name": "开关状态",
        "type": "string",
        "enum": [
          {
            "name": "合闸",
            "value": "ON"
          },
          {
            "name": "分闸",
            "value": "OFF"
          }
        ],
        "eventType": "property"
      }
    ]
  },
  {
    "type": "ZR-HC-CJ-BUTTON",
    "@type": [
      "PUSH-BUTTON"
    ],
    "name": "场景按键",
    "models": [
      {
        "name": "场景按键",
        "value": "ZR-HC-CJ-BUTTON"
      }
    ],
    "dataProto": 6,
    "nodeType": 3,
    "properties": [
      {
        "id": "name",
        "name": "场景名称",
        "type": "string"
      }
    ],
    "events": [
      {
        "id": "sceneTrigger",
        "name": "场景触发",
        "eventType": "event"
      }
    ]
  },
  {
    "type": "a108HNvyPXY",
    "@type": [
      "LOCK"
    ],
    "name": "全自动智能门锁",
    "models": [
      {
        "name": "全自动智能门锁",
        "value": " ZR-HC-SL8010EFV-C"
      }
    ],
    "dataProto": 6,
    "nodeType": 1,
    "properties": [
      {
        "id": "lockState",
        "name": "开关状态",
        "type": "string",
        "enum": [
          {
            "name": "已上锁",
            "value": "LOCKED"
          },
          {
            "name": "未上锁",
            "value": "UNLOCKED"
          },
          {
            "name": "状态异常",
            "value": "JAMMED"
          }
        ],
        "readOnly": true
      },
      {
        "id": "electricityCapacity0",
        "name": "0号电池电量",
        "type": "number",
        "unit": "%",
        "readOnly": true,
        "minimum": 0,
        "maximum": 100
      },
      {
        "id": "electricityCapacity1",
        "name": "1号电池电量",
        "type": "number",
        "unit": "%",
        "readOnly": true,
        "minimum": 0,
        "maximum": 100
      }
    ],
    "events": [
      {
        "id": "lockAlarm",
        "name": "门锁告警",
        "eventType": "event"
      },
      {
        "id": "electricityCapacity0",
        "name": "0号电池电量",
        "type": "number",
        "unit": "%",
        "readOnly": true,
        "minimum": 0,
        "maximum": 100,
        "eventType": "property"
      },
      {
        "id": "electricityCapacity1",
        "name": "1号电池电量",
        "type": "number",
        "unit": "%",
        "readOnly": true,
        "minimum": 0,
        "maximum": 100,
        "eventType": "property"
      },
      {
        "id": "lockState",
        "name": "开关状态",
        "type": "string",
        "enum": [
          {
            "name": "已上锁",
            "value": "LOCKED"
          },
          {
            "name": "未上锁",
            "value": "UNLOCKED"
          },
          {
            "name": "状态异常",
            "value": "JAMMED"
          }
        ],
        "readOnly": true,
        "eventType": "property"
      }
    ]
  },
  {
    "type": "ZR-HC-CL-BUTTON",
    "@type": [
      "SWITCH"
    ],
    "name": "窗帘开关按键",
    "models": [
      {
        "name": "窗帘开关按键",
        "value": "ZR-HC-CL-BUTTON"
      }
    ],
    "dataProto": 6,
    "nodeType": 3,
    "properties": [
      {
        "id": "workState",
        "name": "工作状态",
        "type": "string",
        "enum": [
          {
            "name": "停止",
            "value": "STOP"
          },
          {
            "name": "开始",
            "value": "START"
          },
          {
            "name": "暂停",
            "value": "PAUSE"
          }
        ]
      }
    ],
    "actions": [
      {
        "id": "pause",
        "name": "暂停"
      },
      {
        "id": "turnOff",
        "name": "关闭"
      },
      {
        "id": "turnOn",
        "name": "打开"
      }
    ],
    "events": [
      {
        "id": "workState",
        "name": "工作状态",
        "type": "string",
        "enum": [
          {
            "name": "停止",
            "value": "STOP"
          },
          {
            "name": "开始",
            "value": "START"
          },
          {
            "name": "暂停",
            "value": "PAUSE"
          }
        ],
        "eventType": "property"
      }
    ]
  },
  {
    "type": "ZR-HC-FR60",
    "@type": [
      "HUMAN_DETECTION_RADAR"
    ],
    "name": "人体跌倒检测雷达",
    "models": [
      {
        "name": "人体跌倒检测雷达",
        "value": "ZR-HC-FR60"
      }
    ],
    "dataProto": 2,
    "nodeType": 1,
    "properties": [
      {
        "id": "personNumber",
        "name": "人数",
        "type": "number",
        "readOnly": true
      },
      {
        "id": "postureState",
        "name": "摔倒状态",
        "type": "boolean",
        "readOnly": true
      }
    ],
    "events": [
      {
        "id": "fallAlarm",
        "name": "摔倒告警",
        "eventType": "event"
      },
      {
        "id": "numAbnormal",
        "name": "人数异常",
        "eventType": "event"
      },
      {
        "id": "postureState",
        "name": "摔倒状态",
        "type": "boolean",
        "eventType": "property"
      },
      {
        "id": "personNumber",
        "name": "人数",
        "type": "number",
        "eventType": "property"
      }
    ]
  },
  {
    "type": "ZR-HC-EV01-Z",
    "@type": [
      "AIR_QUALITY_SENSOR"
    ],
    "name": "智能环境检测仪",
    "models": [
      {
        "name": "智能环境检测仪",
        "value": "ZR-HC-EV01-Z"
      }
    ],
    "dataProto": 6,
    "nodeType": 1,
    "properties": [
      {
        "id": "electricityCapacity",
        "name": "电池电量",
        "type": "number",
        "unit": "%",
        "readOnly": true
      },
      {
        "id": "formaldehyde",
        "name": "甲醛浓度",
        "type": "number",
        "unit": "mg/m³",
        "readOnly": true
      },
      {
        "id": "humidity",
        "name": "湿度",
        "type": "number",
        "unit": "%",
        "readOnly": true
      },
      {
        "id": "pm2.5",
        "name": "pm2.5",
        "type": "number",
        "unit": "μg/m³",
        "readOnly": true
      },
      {
        "id": "temperature",
        "name": "温度",
        "type": "number",
        "unit": "℃",
        "readOnly": true
      },
      {
        "id": "co2",
        "name": "二氧化碳浓度",
        "type": "number",
        "unit": "ppm",
        "readOnly": true
      }
    ],
    "events": [
      {
        "id": "formaldehyde",
        "name": "甲醛浓度",
        "type": "number",
        "unit": "mg/m³",
        "eventType": "property"
      },
      {
        "id": "humidity",
        "name": "湿度",
        "type": "number",
        "unit": "%",
        "eventType": "property"
      },
      {
        "id": "pm2.5",
        "name": "pm2.5",
        "type": "number",
        "unit": "μg/m³",
        "eventType": "property"
      },
      {
        "id": "temperature",
        "name": "温度",
        "type": "number",
        "unit": "℃",
        "readOnly": true,
        "eventType": "property"
      },
      {
        "id": "electricityCapacity",
        "name": "电池电量",
        "type": "number",
        "unit": "%",
        "eventType": "property"
      },
      {
        "id": "co2",
        "name": "二氧化碳浓度",
        "type": "number",
        "unit": "ppm",
        "eventType": "property"
      }
    ]
  },
  {
    "type": "ZR-HC-GA-Z",
    "@type": [
      "LEAK_SENSOR"
    ],
    "name": "燃气泄漏传感器",
    "models": [
      {
        "name": "燃气泄漏传感器",
        "value": "ZR-HC-GA-Z"
      }
    ],
    "dataProto": 6,
    "nodeType": 1,
    "properties": [
      {
        "id": "gasLeakState",
        "name": "燃气泄漏状态",
        "type": "string",
        "enum": [
          {
            "name": "有燃气泄漏",
            "value": "ON"
          },
          {
            "name": "无燃气泄漏",
            "value": "OFF"
          }
        ],
        "readOnly": true
      }
    ],
    "events": [
      {
        "id": "gasLeakAlarm",
        "name": "燃气泄漏告警",
        "eventType": "event"
      },
      {
        "id": "gasLeakState",
        "name": "泄漏状态",
        "type": "string",
        "enum": [
          {
            "name": "有燃气泄漏",
            "value": "ON"
          },
          {
            "name": "无燃气泄漏",
            "value": "OFF"
          }
        ],
        "eventType": "property"
      }
    ]
  },
  {
    "type": "ZR-HC-KG",
    "@type": [
      "SWITCH"
    ],
    "name": "智能开关",
    "models": [
      {
        "name": "一联开关",
        "value": "ZR-HC-KG1"
      },
      {
        "name": "二联开关",
        "value": "ZR-HC-KG2"
      },
      {
        "name": "三联开关",
        "value": "ZR-HC-KG3"
      },
      {
        "name": "四联开关",
        "value": "ZR-HC-KG4"
      },
      {
        "name": "六联开关",
        "value": "ZR-HC-KG6"
      }
    ],
    "dataProto": 6,
    "nodeType": 1
  },
  {
    "type": "ZR-HC-SO-Z",
    "@type": [
      "PUSH_BUTTON"
    ],
    "name": "SOS紧急按钮",
    "models": [
      {
        "name": "SOS紧急按钮",
        "value": "ZR-HC-SO-Z"
      }
    ],
    "dataProto": 6,
    "nodeType": 1,
    "properties": [
      {
        "id": "electricityCapacity",
        "name": "电池电量",
        "type": "number",
        "unit": "%",
        "readOnly": true
      }
    ],
    "events": [
      {
        "id": "emergencyAlarm",
        "name": "紧急触发报警",
        "eventType": "event"
      },
      {
        "id": "electricityCapacity",
        "name": "电池电量",
        "type": "number",
        "unit": "%",
        "eventType": "property"
      }
    ]
  },
  {
    "type": "ZR-HC-WA-Z",
    "@type": [
      "LEAK_SENSOR"
    ],
    "name": "水浸传感器",
    "models": [
      {
        "name": "水浸传感器",
        "value": "ZR-HC-WA-Z"
      }
    ],
    "dataProto": 6,
    "nodeType": 1,
    "properties": [
      {
        "id": "waterLeakState",
        "name": "水泄漏状态",
        "type": "string",
        "enum": [
          {
            "name": "有水泄漏",
            "value": "ON"
          },
          {
            "name": "无水泄漏",
            "value": "OFF"
          }
        ],
        "readOnly": true
      }
    ],
    "events": [
      {
        "id": "waterLeakState",
        "name": "水泄漏状态",
        "type": "string",
        "enum": [
          {
            "name": "有水泄漏",
            "value": "ON"
          },
          {
            "name": "无水泄漏",
            "value": "OFF"
          }
        ],
        "eventType": "property"
      },
      {
        "id": "waterLeakAlarm",
        "name": "水泄漏告警",
        "eventType": "event"
      }
    ]
  },
  {
    "type": "ZR-HC-CZ",
    "@type": [
      "SOCKET"
    ],
    "name": "智能插座",
    "models": [
      {
        "name": "3系10A白色",
        "value": "ZR-HC-CZ305-W"
      },
      {
        "name": "5系10A金色",
        "value": "ZR-HC-CZ505-G"
      },
      {
        "name": "5系10A灰色",
        "value": "ZR-HC-CZ505-H"
      },
      {
        "name": "3系10A金色",
        "value": "ZR-HC-CZ305-G"
      },
      {
        "name": "3系10A灰色",
        "value": "ZR-HC-CZ305-H"
      }
    ],
    "dataProto": 6,
    "nodeType": 1,
    "properties": [
      {
        "id": "turnOnState",
        "name": "开关状态",
        "type": "string",
        "enum": [
          {
            "name": "开启电源",
            "value": "ON"
          },
          {
            "name": "关闭电源",
            "value": "OFF"
          }
        ]
      }
    ],
    "actions": [
      {
        "id": "turnOff",
        "name": "断开电源"
      },
      {
        "id": "turnOn",
        "name": "打开电源"
      }
    ],
    "events": [
      {
        "id": "turnOnState",
        "name": "开关状态",
        "type": "string",
        "enum": [
          {
            "name": "开启电源",
            "value": "ON"
          },
          {
            "name": "关闭电源",
            "value": "OFF"
          }
        ],
        "eventType": "property"
      }
    ]
  },
  {
    "type": "ZR-HC-DCJ-A",
    "@type": [
      "CURTAIN"
    ],
    "name": "窗帘电机（卷帘）",
    "models": [
      {
        "name": "窗帘电机（卷帘）",
        "value": "ZR-HC-DCJ-A"
      }
    ],
    "dataProto": 6,
    "nodeType": 1,
    "properties": [
      {
        "id": "workState",
        "name": "工作状态",
        "type": "string",
        "enum": [
          {
            "name": "停止",
            "value": "STOP"
          },
          {
            "name": "开始",
            "value": "START"
          },
          {
            "name": "暂停",
            "value": "PAUSE"
          }
        ]
      }
    ],
    "actions": [
      {
        "id": "pause",
        "name": "暂停"
      },
      {
        "id": "turnOff",
        "name": "关闭"
      },
      {
        "id": "turnOn",
        "name": "打开"
      }
    ],
    "events": [
      {
        "id": "workState",
        "name": "工作状态",
        "type": "string",
        "enum": [
          {
            "name": "停止",
            "value": "STOP"
          },
          {
            "name": "开始",
            "value": "START"
          },
          {
            "name": "暂停",
            "value": "PAUSE"
          }
        ],
        "eventType": "property"
      }
    ]
  },
  {
    "type": "ZR-HC-SM-Z",
    "@type": [
      "SMOKE_SENSOR"
    ],
    "name": "烟雾传感器",
    "models": [
      {
        "name": "烟雾传感器",
        "value": "ZR-HC-SM-Z"
      }
    ],
    "dataProto": 6,
    "nodeType": 1,
    "properties": [
      {
        "id": "electricityCapacity",
        "name": "电池电量",
        "type": "number",
        "unit": "%",
        "readOnly": true
      },
      {
        "id": "smokeState",
        "name": "烟感状态",
        "type": "string",
        "enum": [
          {
            "name": "有烟",
            "value": "ON"
          },
          {
            "name": "无烟",
            "value": "OFF"
          }
        ],
        "readOnly": true
      }
    ],
    "events": [
      {
        "id": "electricityCapacity",
        "name": "电池电量",
        "type": "number",
        "unit": "%",
        "eventType": "property"
      },
      {
        "id": "smokeState",
        "name": "烟感状态",
        "type": "string",
        "enum": [
          {
            "name": "有烟",
            "value": "ON"
          },
          {
            "name": "无烟",
            "value": "OFF"
          }
        ],
        "eventType": "property"
      },
      {
        "id": "smokeAlarm",
        "name": "烟雾告警",
        "eventType": "event"
      }
    ]
  },
  {
    "type": "ZR-HC-TH-Z",
    "@type": [
      "TEMPERATURE_SENSOR",
      "HUMIDITY_SENSOR"
    ],
    "name": "温湿度传感器",
    "models": [
      {
        "name": "温湿度传感器",
        "value": "ZR-HC-TH-Z"
      }
    ],
    "dataProto": 6,
    "nodeType": 1,
    "properties": [
      {
        "id": "electricityCapacity",
        "name": "电池电量",
        "type": "number",
        "unit": "%",
        "readOnly": true,
        "minimum": 0,
        "maximum": 100
      },
      {
        "id": "humidity",
        "name": "湿度",
        "type": "number",
        "unit": "%",
        "readOnly": true
      },
      {
        "id": "temperature",
        "name": "温度",
        "type": "number",
        "unit": "℃",
        "readOnly": true
      }
    ],
    "events": [
      {
        "id": "electricityCapacity",
        "name": "电池电量",
        "type": "number",
        "unit": "%",
        "eventType": "property"
      },
      {
        "id": "humidity",
        "name": "湿度",
        "type": "number",
        "unit": "%",
        "eventType": "property"
      },
      {
        "id": "temperature",
        "name": "温度",
        "type": "number",
        "unit": "℃",
        "eventType": "property"
      }
    ]
  }
]


export const detail = {
  "id": "1630740580774088705",
  "templateName": "测试999999",
  "triggerType": 0,
  "deviceTrigger": {
    "ruleCondition": 0,
    "triggers": [
      {
        "deviceType": "ZR-HC-GA-Z",
        "locations": [
          "555",
          "666"
        ],
        "properties": {
          "identifier": "gasLeakState",
          "num": "ON"
        }
      },
      {
        "deviceType": "ZR-HC-EV01-Z",
        "locations": [
          "333",
          "eee"
        ],
        "properties": {
          "identifier": "humidity",
          "unit": "%",
          "num": "54",
          "operation": "NE"
        }
      },
      {
        "deviceType": "ZR-HC-CJ-BUTTON",
        "locations": [
          "eee",
          "555"
        ],
        "events": {
          "identifier": "sceneTrigger"
        }
      }
    ]
  },
  "executes": [
    {
      "deviceType": "ZR-HC-DCK-A",
      "locations": [
        "eee",
        "555"
      ],
      "actions": [
        {
          "identifier": "turnOnPercent",
          "attributes": [
            {
              "identifier": "deltaValue",
              "deltaValue": "55"
            }
          ]
        }
      ]
    },
    {
      "deviceType": "ZR-HC-CZ",
      "locations": [
        "555",
        "测试"
      ],
      "actions": [
        {
          "identifier": "turnOn",
          "attributes": []
        }
      ]
    }
  ],
  "triggerTime": ""
}