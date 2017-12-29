<template>
<div class="classHistory openCeremony">
    <div class="history_left">
        <span class="history_data">2017/12/29</span>
        <ul class="history_time">
            <li class="history_detail">08:30:00-11:30:00</li>
            <li class="history_detail">08:30:00-11:30:00</li>
            <li class="history_detail">08:30:00-11:30:00</li>
            <li class="history_detail">08:30:00-11:30:00</li>
        </ul>
        <span class="history_data">2017/12/29</span>
        <ul class="history_time">
            <li class="history_detail">08:30:00-11:30:00</li>
            <li class="history_detail">08:30:00-11:30:00</li>
            <li class="history_detail">08:30:00-11:30:00</li>
            <li class="history_detail">08:30:00-11:30:00</li>
        </ul>
    </div>
    <div class="history_infor">
        <div class="basicInfo">
        <div class="classInfo">
            <span class="classInfoTitle">
                Basic Info
            </span>
            <div class="classInfoTimeContainer">
                <span class="classInfoTimeTitle">本班次时间：</span>
                <DatePicker v-model="lengthShiftTimeValue" :readonly="openCeremonyStatus" type="datetimerange" placeholder="Select date and time" style="width: calc(100% - 80px)" :options="optionsOpenCeremony" @on-clear="lengthShiftTimeClear"></DatePicker>
            </div>
            <div class="classInfoNumAttendance">
                <span>应出勤人数：</span>
                <InputNumber v-model="shouldNumAttendanceValue" :min="1" placeholder="人" :readonly="openCeremonyStatus"></InputNumber>
                <span class="classInfoActualAttendance">实出勤人数：</span>
                <InputNumber v-model="actualNumAttendanceValue" :min="0" :readonly="openCeremonyStatus"></InputNumber>
            </div>
            <div class="classInfoSubmit">
                <!-- <span class="classInfoClearBtn classInfoBtn" @click="clearClassInfoClick">清空</span> -->
                <span class="classInfoConfirmBtn classInfoBtn" @click="addClassInfoClick">确定</span>
            </div>
        </div>
        <div class="productInfo">
            <Table height='218' border :columns="productInfoCols" :data="productInfoData"></Table>
        </div>
        <div class="addProductInfo">
            <i class="icon-add_add flex-item" @click="addProductInfo"></i>
        </div>
    </div>
    <div class="lossContainer">
        <div class="lossRow" v-for="(d,idx) in this.kpiTwoLev.data" :key="idx">
            <div class="lossName">
                <span class="flex-item">{{ d }}</span>
            </div>
            <div class="lossTable">
                <Table border height="200" :columns="lossChildTableCols" :data="datainputLossTableData[idx][d]"></Table>
            </div>
            <div class="lossBtnContainer">
                <span class="addLossBtn flex-item" @click="addLoss(d)">添加loss</span>
            </div>
        </div>
    </div>
  
    <Modal class="lossChoose" v-model="showLossFlag" @on-ok="lossConfirmClick" @on-cancel="lossCancelClick" :closable="false" class-name="loss-vertical-center-modal" width="400">
        <div v-if="editLossDirFlag" class="editLossDir">
            <span>Tier3：</span>
            <span>{{ this.lossTier3BeingEditedVal }}</span>
            <span>Tier4：</span>
            <span>{{ this.lossTier4BeingEditedVal }}</span>
        </div>
        <div v-else class="dirChoose">
            <Select class="dropdownTier" v-model="choosedLossTier3ValByAdd" clearable placeholder="Tier3" @on-change="getTier3($event)">
                <Option v-for="item in this.optionalLossTier3ListByAdd" :key="item.lossid" :label="item.name" :value="item.lossid" :ref="'tierThree' + item.lossid">
                </Option>
            </Select>
            <Select class="dropdownTier" :disabled="choosedLossTier3ValByAdd ===''" v-model="choosedLossTier4ValByAdd" clearable placeholder="Tier4" @on-change="getTier4($event)">
                <Option v-for="item in optionalLossTier4ListByAdd" :key="item.tier4id" :label="item.name" :value="item.tier4id" :ref="'tierFour' + item.tier4id">
                </Option>
            </Select>
        </div>
        <div class="startTimeContainer">
            <span class="timeTitle">开始时间：</span>
            <DatePicker v-model="startTimeValue" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss" :options="optionsStart" @on-ok="startTimeChooseOk">
            </DatePicker>
        </div>
        <div class="durationTimeContainer">
            <span class="timeTitle">持续时间：</span>
            <TimePicker v-model="durationTimeValue" placeholder="任意时间点" format="HH:mm:ss" @on-change="durationTimeValueChange">
            </TimePicker>
        </div>
        <div class="endTimeContainer">
            <span class="timeTitle">结束时间：</span>
            <DatePicker v-model="endTimeValue" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss" :options="optionsEnd" @on-ok="endTimeChooseOk">
            </DatePicker>
        </div>
    </Modal>
    <Modal v-model="showProductInfoFlag" @on-ok="productInfoConfirmClick" @on-cancel="productInfoCancelClick" class-name="product-vertical-center-modal" :closable="false" width="400">
        <div class="productChoose">
            <div v-if="editProductInfoFlag" class="editProductInfoNameContainer">
                <span>产品：</span>
                <span>{{ this.productNameBeingEditedVal }}</span>
            </div>
            <Cascader class="dropdownProduct" v-else :data="optionalProductListByAdd" v-model="choosedProductValByAdd" trigger="hover" placeholder="产品"></Cascader>
        </div>
        <div class="productInfoSetting">
            <span>良品数量：</span>
            <InputNumber v-model="conformProductValue" :min="0"></InputNumber>
            <!-- <span class="cycleTitle">Cycle：</span>
            <InputNumber v-model="normalCycletimeValue" :min="0"></InputNumber> -->
        </div>
    </Modal>

    </div>
    
</div>
</template>
<script>
import {mapState,mapActions} from "vuex";
export default {
    data(){
        return {
            optionsOpenCeremony: {
                disabledDate(date) {}
            },
            optionsStart: {
                disabledDate: (date) => {
                if (!(this.lengthShiftTimeValue[0] && this.lengthShiftTimeValue[1])) return false;
                let end = this.lengthShiftTimeValue[1];
                let beginFormat = this.lengthShiftTimeValue[0].format('yyyy-MM-dd');
                let begin = new Date(beginFormat + ' 00:00:00');
                if (begin && end) {
                    return (date && date.valueOf() > end) || (date && date.valueOf() < begin);
                }
                }
            },
            optionsEnd: {
                disabledDate: (date) => {
                if (!(this.lengthShiftTimeValue[0] && this.lengthShiftTimeValue[1])) return false;
                let end = this.lengthShiftTimeValue[1];
                let beginFormat = this.lengthShiftTimeValue[0].format('yyyy-MM-dd');
                let begin = new Date(beginFormat + ' 00:00:00');
                if (begin && end) {
                    if (this.startTimeValue) {
                    let hour = this.startTimeValue.getHours();
                    let min = this.startTimeValue.getMinutes();
                    let sec = this.startTimeValue.getSeconds();
                    let ms;
                    if (hour + min + sec === 0) {
                        begin = this.startTimeValue;
                        ms = begin.getTime() + ((23 * 60 * 60 + 59 * 60 + 59) * 1000);
                    } else {
                        let startFormat = this.startTimeValue.format('yyyy-MM-dd');
                        begin = new Date(startFormat + ' 00:00:00');
                        ms = begin.getTime() + (24 * 60 * 60 * 1000);
                    }
                    end = new Date(ms);
                    }
                    return (date && date.valueOf() > end) || (date && date.valueOf() < begin);
                }
                }
            },
            openCeremonyFlag: false,
            validareaList: [],
            lineBodys: [],
            /*班次信息变量*/
            lengthShiftTimeValue: [],
            shouldNumAttendanceValue: null,
            actualNumAttendanceValue: null,
            openCeremonyStatus: false,
            classInfoIdList: '',
            /*产品变量*/
            showProductInfoFlag: false,
            editProductInfoFlag: false,
            productNameBeingEditedVal: '',
            choosedProductValByAdd: [],
            productInfoCols: [{
                title: '产品',
                key: 'productname',
                align: 'center'
                },
                {
                title: '良品数量',
                key: 'conformproduct',
                align: 'center'
                },
                {
                title: 'Cycle',
                key: 'normalcycletime',
                align: 'center'
                },
                {
                title: '编辑',
                key: '编辑',
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                    h('i', {
                        attrs: {
                        class: "icon-edit",
                        },
                        style: {
                        marginRight: '20px'
                        },
                        on: {
                        click: () => {
                            this.showProductInfoFlag = true;
                            this.editProduct(params.index)
                        }
                        }
                    }),
                    h('i', {
                        attrs: {
                        class: "icon-delete_2",
                        },
                        style: {},
                        on: {
                        click: () => {
                            this.deleteProductClick(params.index)
                        }
                        }
                    })
                    ]);
                }
                }
            ],
            productInfoData: [],
            optionalProductListByAdd: [],
            conformProductValue: null,
            editProductIndex: null,
            /*loss变量*/
            showLossFlag: false,
            editLossDirFlag: false,
            choosedLossTier3ValByAdd: '',
            choosedLossTier4ValByAdd: '',
            optionalLossTier3ListByAdd: [],
            optionalLossTier4ListByAdd: [],
            lossChildTableCols: [{
                title: 'Tier3',
                key: 'losstier3name',
                className: 'childTableFirstCol',
                align: 'center',
                },
                {
                title: 'Tier4',
                key: 'losstier4name',
                className: 'childTableSecondCol',
                align: 'center',
                },
                {
                title: '开始时间',
                key: 'starttime',
                className: 'childTableThirdCol',
                align: 'center'
                },
                {
                title: '结束时间',
                key: 'endtime',
                className: 'childTableFourthCol',
                align: 'center'
                },
                {
                title: '编辑',
                key: '编辑',
                className: 'childTableFifthCol',
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                    h('i', {
                        attrs: {
                        class: "icon-edit",
                        },
                        style: {
                        marginRight: '20px'
                        },
                        on: {
                        click: () => {
                            this.showLossFlag = true;
                            this.editLoss(params)
                        }
                        }
                    }),
                    h('i', {
                        attrs: {
                        class: "icon-delete_2",
                        },
                        style: {},
                        on: {
                        click: () => {
                            this.deleteLoss(params)
                        }
                        }
                    })
                    ]);
                }
                },
            ],
            startTimeValue: '',
            durationTimeValue: '',
            endTimeValue: '',
            lossTwoLevName: '',
            lossThreeLevStructId: '',
            lossFourLevStructId: '',
            lossTier3BeingEditedVal: '',
            lossTier4BeingEditedVal: '',
            lossParams: null,
        }
    },
    computed: {
        ...mapState([
            "lossTier3",
            "kpiTwoLev",
            "addLosstier4time2Res",
            "datainputLossTableData",
            "addClassinfRes",
            "addProductRes",
            "showProductRes",
            "updateObjectimeAfteraddRes",
            "showProductNameRes",
            "deleteProductRes",
            "updateProductRes",
            "deleteLoss4dataRes"
        ])
    },
    methods: {
        ...mapActions([
            "selectUserById",
            "showLosstier3",
            "showKpitwolev",
            "addLosstier4time2",
            "addClassinf",
            "addProduct",
            "showProduct",
            "updateObjectimeAfteradd",
            "showProductName",
            "deleteProduct",
            "updateProduct",
            "deleteLoss4data"
        ]),
        getTier3: function(tier) {
            if (!tier) {
                this.choosedLossTier3ValByAdd = '';
                this.choosedLossTier4ValByAdd = '';
                return;
            }
            this.lossThreeLevStructId = tier;
            let tempTier = [];
            this.optionalLossTier4ListByAdd = [];
            this.choosedLossTier4ValByAdd = '';
            for (let val of this.lossTier3.data.losstier4) {
                if (tier === val.losstier3Lossid) {
                tempTier.push({
                    "tier4id": val.tier4id,
                    "name": val.name
                });
                }
            }
            this.optionalLossTier4ListByAdd = tempTier;
        },
        getTier4(tier) {
            if (!tier) {
                this.choosedLossTier4ValByAdd = '';
                return;
            }

            this.lossFourLevStructId = tier;
        },
        addLoss: function(name) {
            if (!this.openCeremonyStatus) {
                this.$Message.error("请先选择开班时间");
                return;
            }
            this.lossTwoLevName = name;
            this.showLosstier3({
                "twolevName": name,
            });
            this.editLossDirFlag = false;
            this.showLossFlag = true;
        },
        addProductInfo: function(name) {
            if (!this.openCeremonyStatus) {
                this.$Message.error("请先选择开班时间");
                return;
            }
            this.editProductInfoFlag = false;
            this.showProductInfoFlag = true;
            this.showProductName({
                "linebodyId": this.lineBodys[0]
            })
        },
        deleteLoss(params) {
            this.lossParams = params;
            let _this = this;
            Ewin.confirm({
                message: "确认删除？"
            }).on(function(e) {
                if (!e) {
                return;
                }
                for (let i = 0; i < _this.datainputLossTableData.length; i++) {
                console.log(_this.datainputLossTableData[i]);
                for (let key in _this.datainputLossTableData[i]) {
                    /*此处仅判定了loss3级,若不同的loss2级中有同名的3级时，判断条件需进行修改*/
                    console.log(_this.datainputLossTableData[i][key][_this.lossParams.index]);
                    if (_this.datainputLossTableData[i][key].length > 0) {
                    if (_this.datainputLossTableData[i][key][_this.lossParams.index].losstier3name === params.row["losstier3name"]) {
                        _this.deleteLoss4data({
                        "losstier4DataidList": _this.datainputLossTableData[i][key][_this.lossParams.index].losstier4Dataid
                        })
                    }
                    }
                }
                }
            });
        },
        deleteProductClick(index) {
            const productIdList = this.productInfoData[index].productid;
            let _this = this;
            Ewin.confirm({
                message: "确认删除？"
            }).on(function(e) {
                if (!e) {
                return;
                }
                _this.deleteProduct({
                "productIdList": productIdList,
                "classinfIdList": _this.classInfoIdList,
                "linebodyId": _this.lineBodys[0]
                });
            });
        },
        editProduct(index) {
            this.editProductInfoFlag = true;
            let editInfo = this.productInfoData.slice(index, index + 1);
            this.productNameBeingEditedVal = editInfo[0].productname;
            this.conformProductValue = parseInt(editInfo[0].conformproduct);
            this.editProductIndex = index;
        },
        editLoss(params) {
            this.editLossDirFlag = true;
            this.lossTier3BeingEditedVal = params.row["losstier3name"];
            this.lossTier4BeingEditedVal = params.row["losstier4name"];
            this.startTimeValue = new Date(params.row["starttime"]);
            this.endTimeValue = new Date(params.row["endtime"]);
            this.durationTimeValue = this.timeFormat(this.endTimeValue.getTime() - this.startTimeValue.getTime());
            this.lossParams = params;
        },
        lengthShiftTimeClear() {
            this.lengthShiftTimeValue = [];
        },
        timeFormat: function(mss) {
            var hour = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var min = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
            var sec = (mss % (1000 * 60)) / 1000;
            return `${hour}:${min}:${sec}`;
        },
        timeTranslateDateMs: function(dateObj) {
            if (dateObj) {
                const hour = dateObj.getHours();
                const min = dateObj.getMinutes();
                const sec = dateObj.getSeconds();
                return (hour * 3600 + min * 60 + sec) * 1000;
            }
        },
        timeTranslateArrayMs: function(durationArray) {
            if (durationArray.length > 0) {
                const hour = parseInt(durationArray[0]);
                const min = parseInt(durationArray[1]);
                const sec = parseInt(durationArray[2]);
                return (hour * 3600 + min * 60 + sec) * 1000;
            }
        },
        startTimeChooseOk: function() {
            if (!this.startTimeValue) {
                this.durationTimeValue = '';
                this.endTimeValue = '';
                return;
            }
            const startMs = this.startTimeValue.getTime();
            if (this.durationTimeValue !== '') {
                const durationMs = this.timeTranslateDateMs(this.durationTimeValue);
                this.endTimeValue = new Date(startMs + durationMs);
            } else if (this.endTimeValue !== '') {
                const end = this.endTimeValue;
                const endMs = end.getTime();
                const durationMs = endMs - startMs;
                this.durationTimeValue = this.timeFormat(durationMs);
            }
        },
        durationTimeValueChange: function(val) {
            if (!val) {
                this.startTimeValue = '';
                this.endTimeValue = '';
                return;
            }
            const durationArray = val.split(":");
            const durationMs = this.timeTranslateArrayMs(durationArray);
            if (this.startTimeValue !== '') {
                const start = this.startTimeValue;
                const startMs = start.getTime();
                this.endTimeValue = new Date(startMs + durationMs);
            } else if (this.endTimeValue !== '') {
                const end = this.endTimeValue;
                const endMs = end.getTime();
                this.startTimeValue = new Date(endMs - durationMs);
            }
        },
        endTimeChooseOk() {
            if (!this.endTimeValue) {
                this.startTimeValue = '';
                this.durationTimeValue = '';
                return;
            }
            const endMs = this.endTimeValue.getTime();
            if (this.durationTimeValue !== '') {
                const durationMs = this.timeTranslateDateMs(this.durationTimeValue);
                this.startTimeValue = new Date(endMs - durationMs);
            } else if (this.startTimeValue !== '') {
                const start = this.startTimeValue;
                const startMs = start.getTime();
                const durationMs = endMs - startMs;
                this.durationTimeValue = this.timeFormat(durationMs);
            }
        },
        addClassInfoClick() {
            if (!(this.lengthShiftTimeValue.length === 2 && this.shouldNumAttendanceValue && this.actualNumAttendanceValue)) {
                this.$Message.error("请将班次信息填写完整");
                return;
            }

            if (!this.openCeremonyStatus) {
                this.addClassinf({
                "classStarttime": this.lengthShiftTimeValue[0],
                "classEndtime": this.lengthShiftTimeValue[1],
                "shouldAttendance": this.shouldNumAttendanceValue,
                "actualAttendance": this.actualNumAttendanceValue
                });
            } else {
                this.$Message.error("请勿重复添加班次信息");
            }
        },
        clearClassInfoClick() {
            if (!this.classInfoIdList) {
                this.$Message.error("当前并无班次");
                return;
            }
            let _this = this;
            Ewin.confirm({
                message: "确认清空当前班次信息？"
            }).on(function(e) {
                if (!e) {
                return;
                }
                _this.lengthShiftTimeValue = [];
                _this.shouldNumAttendanceValue = null;
                _this.actualNumAttendanceValue = null;
                _this.showKpitwolev({
                userId: sessionStorage.getItem("userid")
                });
                _this.classInfoIdList = '';
                _this.openCeremonyStatus = false;
                _this.$Message.success("清空成功");
            });

        },
        lossConfirmClick: function() {
            if (this.editLossDirFlag) {
                if (!(this.startTimeValue && this.endTimeValue && this.durationTimeValue)) {
                this.lossTwoLevName = '';
                this.lossThreeLevStructId = '';
                this.lossFourLevStructId = '';
                this.choosedLossTier3ValByAdd = '';
                this.choosedLossTier4ValByAdd = '';
                this.startTimeValue = '';
                this.durationTimeValue = '';
                this.endTimeValue = '';
                this.$Message.error("请将需要修改的loss信息填写完整");
                return;
                }
                this.showLossFlag = false;
                for (let i = 0; i < this.datainputLossTableData.length; i++) {
                for (var key in this.datainputLossTableData[i]) {
                    /*此处仅判定了loss3级,若不同的loss2级中有同名的3级时，判断条件需进行修改*/
                    if (this.datainputLossTableData[i][key].length > 0) {
                    if (this.datainputLossTableData[i][key][this.lossParams.index].losstier3name === this.lossParams.row["losstier3name"]) {
                        this.updateObjectimeAfteradd({
                        "losstier4Dataid": this.datainputLossTableData[i][key][this.lossParams.index].losstier4Dataid,
                        "starttime": this.startTimeValue,
                        "endtime": this.endTimeValue
                        });
                    }
                    }
                }
                }
            } else {
                if (!(this.startTimeValue && this.endTimeValue && this.durationTimeValue && this.choosedLossTier3ValByAdd &&
                    this.choosedLossTier4ValByAdd)) {
                this.lossTwoLevName = '';
                this.lossThreeLevStructId = '';
                this.lossFourLevStructId = '';
                this.choosedLossTier3ValByAdd = '';
                this.choosedLossTier4ValByAdd = '';
                this.startTimeValue = '';
                this.durationTimeValue = '';
                this.endTimeValue = '';
                this.$Message.error("请将需要添加的loss相关信息填写完整");
                return;
                }
                this.showLossFlag = false;
                this.addLosstier4time2({
                "classinfIdList": this.classInfoIdList,
                "twolevName": this.lossTwoLevName,
                "losstier3Id": this.lossThreeLevStructId,
                "losstier4Id": this.lossFourLevStructId,
                "linebodyId": this.lineBodys[0],
                "starttime": this.startTimeValue,
                "endtime": this.endTimeValue
                });
            }
        },
        lossCancelClick: function() {
            this.showLossFlag = false;
            this.lossTwoLevName = '';
            this.lossThreeLevStructId = '';
            this.lossFourLevStructId = '';
            this.choosedLossTier3ValByAdd = '';
            this.choosedLossTier4ValByAdd = '';
            this.durationTimeValue = '';
            this.startTimeValue = '';
            this.endTimeValue = '';
            this.lossParams = null;
        },
        productInfoConfirmClick() {
            if (this.editProductInfoFlag) {
                if (!this.conformProductValue) {
                this.choosedProductValByAdd = [];
                this.conformProductValue = null;
                this.$Message.error("请将需要修改的产品信息填写完整");
                return;
                }
                this.showProductInfoFlag = false;
                this.updateProduct({
                "productIdList": this.productInfoData[this.editProductIndex].productid,
                "conformProduct": this.conformProductValue,
                "classinfIdList": this.classInfoIdList,
                "linebodyId": this.lineBodys[0]
                })
            } else {
                if (!(this.choosedProductValByAdd && this.conformProductValue && this.choosedProductValByAdd.length === 3)) {
                this.choosedProductValByAdd = [];
                this.conformProductValue = null;
                this.$Message.error("请将需要添加的产品信息填写完整");
                return;
                }
                this.showProductInfoFlag = false;
                this.addProduct({
                "classinfIdList": this.classInfoIdList,
                "productNameId": this.choosedProductValByAdd[2],
                "conformProduct": this.conformProductValue,
                "linebodyId": this.lineBodys[0]
                });
            }
            },
            productInfoCancelClick() {
            this.showProductInfoFlag = false;
            this.choosedProductValByAdd = [];
            this.conformProductValue = null;
            this.editProductIndex = null;
        },
    },
    watch: {
        lossTier3(newVal) {
            if (newVal.status === "0") {
                this.optionalLossTier3ListByAdd = newVal.data.losstier3;
            }
        },
        kpiTwoLev(newVal) {},
        addLosstier4time2Res(newVal) {
            if (newVal.status === "0") {
                let addLossData = newVal.data;
                addLossData.starttime = new Date(addLossData.starttime).format('yyyy-MM-dd hh:mm:ss');
                addLossData.endtime = new Date(addLossData.endtime).format('yyyy-MM-dd hh:mm:ss');

                for (let i = 0; i < this.datainputLossTableData.length; i++) {
                for (let key in this.datainputLossTableData[i]) {
                    if (key === addLossData.losstier2name) {
                    this.datainputLossTableData[i][key].push(addLossData);
                    this.$Message.success("添加成功");
                    }
                }
                }
            } else {
                this.$Message.error("添加失败");
            }
            this.lossTwoLevName = '';
            this.lossThreeLevStructId = '';
            this.lossFourLevStructId = '';
            this.choosedLossTier3ValByAdd = '';
            this.choosedLossTier4ValByAdd = '';
            this.startTimeValue = '';
            this.durationTimeValue = '';
            this.endTimeValue = '';
        },
        addClassinfRes(newVal) {
            let classInfoIdArr = [];
            if (newVal.status === "0") {
                this.$Message.success("班次信息添加成功");
                this.openCeremonyStatus = true;
                for (let i = 0; i < newVal.data.length; i++) {
                classInfoIdArr.push(newVal.data[i].classinfid);
                }
                this.classInfoIdList = classInfoIdArr.join(",");
                this.openCeremonyStatus = true;
            } else {
                this.$Message.error("班次信息添加失败");
                this.classInfoIdList = '';
                this.openCeremonyStatus = false;
            }
        },
        addProductRes(newVal) {
            if (newVal.status === "0") {
                this.productInfoData = newVal.data;
                this.$Message.success("添加成功");
            } else {
                this.$Message.error("添加失败");
            }
            this.choosedProductValByAdd = [];
            this.conformProductValue = null;
        },
        showProductRes(newVal) {
            console.log("showProductRes:" + newVal);
        },
        updateObjectimeAfteraddRes(newVal) {
            let editLossData = newVal.data;
            const editLossStartTime = new Date(editLossData.starttime).format('yyyy-MM-dd hh:mm:ss');
            const editLossEndTime = new Date(editLossData.endtime).format('yyyy-MM-dd hh:mm:ss');
            if (newVal.status === "0") {
                for (let i = 0; i < this.datainputLossTableData.length; i++) {
                for (let key in this.datainputLossTableData[i]) {
                    if (key === editLossData.losstier2name) {
                    /*此处仅判定了loss3级,若不同的loss2级中有同名的3级时，判断条件需进行修改*/
                    if (this.datainputLossTableData[i][key][this.lossParams.index].losstier3name === editLossData.losstier3name) {
                        this.datainputLossTableData[i][key][this.lossParams.index].starttime = editLossStartTime;
                        this.datainputLossTableData[i][key][this.lossParams.index].endtime = editLossEndTime;
                        this.$Message.success("修改成功");
                    }
                    }
                }
                }
            } else {
                this.$Message.error("修改失败");
            }
            this.startTimeValue = '';
            this.durationTimeValue = '';
            this.endTimeValue = '';
            this.lossParams = null;
        },
        showProductNameRes(newVal) {
            console.log("showProductNameRes:" + newVal);
            if (newVal.status === "0") {
                this.optionalProductListByAdd = newVal.data;
            }
        },
        deleteProductRes(newVal) {
            if (newVal.status === "0") {
                this.productInfoData = newVal.data;
                this.$Message.success("删除成功");
            } else {
                this.$Message.error("删除失败");
            }
        },
    },
    mounted() {
        if (sessionStorage.getItem("userid")) {
            this.classInfoIdList = '';
            this.selectUserById({
                userid: sessionStorage.getItem("userid")
            });
            this.showKpitwolev({
                userId: sessionStorage.getItem("userid")
            });
        } else {
            console.log(this.$route);
        }
    }
}
</script>
<style lang="sass" scoped>
</style>
