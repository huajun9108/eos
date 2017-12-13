//state  唯一数据源  存储组件的数据
//获取state  store.state.count
export default {
    loginResult: "",
    groupAll: "",
    userinfor: "",
    validmenu: "",
    validmenuList: [
        { name: "overview", validmenuid: "1" },
        { name: "saving book", validmenuid: "5" },
        { name: "loss mapping", validmenuid: "2" },
        { name: "data input", validmenuid: "6" },
        { name: "account", validmenuid: "7" },
        { name: "improvement", validmenuid: "3" },
        { name: "project summary", validmenuid: "4" },
    ],
    areaAll: "",
    newArea: "",
    updateAreaRes: "",
    deleteAreaRes: "",
    kpiAll: "",
    addKpiRes: "",
    updateKpiRes: "",
    delKpiRes: "",
    lossAll: "",
    addLossRes: "",
    updateLossRes: "",
    deleteLossRes: "",
    validarea: "",
    userAll: "",
    addResult: "",
    delUserRes: '',
    deleteUserByUserIds: '',
    updatePwdResult: '',
    lineBody: '',
    updatelineBodyRes: '',
    tier2: [],
    improList: [],
    nowline: '',
    itemstatus: '',
    updateItemResult: '',
    lossmappingLinebodyAll: [],
    addObject: '',
    deleteObject: '',
    validLeft: [],
    updateLinebodyWeight: '',
    lossTier3: '',
    addLosstier4time2Res: '',
    kpiTwoLev: '',
    datainputLossTableData: [],
    projectStatus: [],
    addClassinfRes: '',
    addProductRes: '',
    showProductRes: '',
    updateObjectimeAfteraddRes: '',
    showProductNameRes: '',
    deleteProductRes: '',
    updateProductRes: '',
    deleteLoss4dataRes: '',
    productAll: null,
    modelList: [{
        result: [
            // {
            //     "label1": ['1', '2', '4'],
            //     "label2": 112
            // },
            // {
            //     "label1": ['beijing', 'gugong'],
            //     "label2": 110
            // }
        ],
        data: []
    }],
    data: [{
        value: 'beijing',
        label: '北京',
        children: [{
                value: 'gugong',
                label: '故宫'
            },
            {
                value: 'tiantan',
                label: '天坛'
            },
            {
                value: 'wangfujing',
                label: '王府井'
            }
        ]
    }, {
        value: '1',
        label: '江苏',
        children: [{
                value: 'nanjing',
                label: '南京',
                children: [{
                    value: 'fuzimiao',
                    label: '夫子庙',
                }]
            },
            {
                value: '2',
                label: '苏州',
                children: [{
                        value: '3',
                        label: '拙政园',
                    },
                    {
                        value: '4',
                        label: '狮子林',
                    }
                ]
            }
        ],
    }],
}