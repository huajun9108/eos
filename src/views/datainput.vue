<template>
<div class="datainput user_common">
  <div class="datainputContainer user_maincontent">
    <div class="openCeremony">
      <span class="inputBtn openCeremonyButton" @click="openCeremonyClick">开班</span>
      <span class="inputBtn historyButton">班次历史记录</span>
      <Button type="primary" @click="modal1 = true">choose Loss</Button>
      <Button type="primary" @click="modal2 = true">choose product</Button>
    </div>
    <div class="basicInfo" :class="openCeremonyFlag?'showOpenCeremony':'hideOpenCeremony'">
      <div class="classInfo">
        <span class="classInfoTitle">
          Basic Info
        </span>
        <div class="classInfoTime">
          <span>本班次时间：</span>
          <DatePicker v-model="lengthShiftTimeValue" type="datetimerange" placeholder="Select date and time" style="width: 300px" :options="optionsOpenCeremony" @on-clear="lengthShiftTimeClear"></DatePicker>
        </div>
        <div class="classInfoNumAttendance">
          <span>应出勤人数：</span>
          <InputNumber v-model="shouldNumAttendanceValue" :min="1"></InputNumber>
          <span class="classInfoActualAttendance">实出勤人数：</span>
          <InputNumber v-model="actualNumAttendanceValue" :min="0"></InputNumber>
        </div>
        <div class="classInfoSubmit">
          <span class="classInfoClearBtn classInfoBtn" @click="clearClassInfoClick">清空</span>
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
    <div class="lossContainer" :class="openCeremonyFlag?'showOpenCeremony':'hideOpenCeremony'">
      <div class="lossRow" v-for="(d,idx) in this.kpiTwoLev.data" :key="idx">
        <div class="lossName">
          <span class="flex-item">{{ d }}</span>
        </div>
        <div class="lossTable">
          <Table border height="200" :columns="childTabCols" :data="datainputLoss[idx][d]"></Table>
        </div>
        <div class="lossBtnContainer">
          <span class="addLossBtn flex-item" @click="addLoss(d)">添加loss</span>
        </div>
      </div>
    </div>
    <div class="lossShade" :class="showLossFlag?'showLossChoose':'hideLossChoose'"></div>
    <div class="productInfoShade" :class="showProductInfoFlag?'showProductInfoChoose':'hideProductInfoChoose'"></div>
    <div class="lossChoose" :class="showLossFlag?'showLossChoose':'hideLossChoose'">
      <div v-if="editLossDirFlag" class="editLossDir">
        <span>Tier3：</span>
        <span>{{ this.editTier3Value }}</span>
        <span>Tier4：</span>
        <span>{{ this.editTier4Value }}</span>
      </div>
      <div v-else class="dirChoose">
        <Select class="dropdownTier" v-model="tierValue" clearable placeholder="Tier3" @on-change="getTier3($event)">
          <Option v-for="item in this.lossTier3Array" :key="item.lossid" :label="item.name" :value="item.lossid" :ref="'tierThree' + item.lossid">
          </Option>
        </Select>
        <Select class="dropdownTier" :disabled="tierValue ===''" v-model="childTierValue" clearable placeholder="Tier4" @on-change="getTier4($event)">
          <Option v-for="item in childTierMenuData" :key="item.tier4id" :label="item.name" :value="item.tier4id" :ref="'tierFour' + item.tier4id">
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
      <div class="btnContainer text-right">
        <span class="confirmBtn data_btn" @click="lossConfirmClick">确定</span>
        <span class="cancelBtn data_btn" @click="lossCancelClick">取消</span>
      </div>
    </div>
    <div class="productInfoAddContainer" :class="showProductInfoFlag?'showProductInfoChoose':'hideProductInfoChoose'">
      <div class="productChoose">
        <div v-if="editProductInfoFlag" class="editProductInfoNameContainer">
          <span>产品：</span>
          <span>{{ this.productName }}</span>
        </div>
        <Select v-else v-model="productValue" class="dropdownProduct" clearable placeholder="产品">
            <Option v-for="item in productList" :value="item.id" :key="item.id" :label="item.name" :ref="productName">
              {{ item.name }}
            </Option>
          </Select>
      </div>
      <div class="productInfoSetting">
        <span>良品数量：</span>
        <InputNumber v-model="conformProductValue" placeholder="请填写数量" :min="0"></InputNumber>
        <span class="cycleTitle">Cycle：</span>
        <InputNumber v-model="normalCycletimeValue" placeholder="请填写时间" :min="0"></InputNumber>
      </div>
      <div class="btnContainer text-right">
        <span class="confirmBtn data_btn" @click="productInfoConfirmClick">确定</span>
        <span class="cancelBtn data_btn" @click="productInfoCancelClick">取消</span>
      </div>
    </div>
  </div>
  <Modal class="lossChoose" v-model="modal1" @on-ok="ok" @on-cancel="cancel" :closable="false">
    <div v-if="editLossDirFlag" class="editLossDir">
      <span>Tier3：</span>
      <span>{{ this.editTier3Value }}</span>
      <span>Tier4：</span>
      <span>{{ this.editTier4Value }}</span>
    </div>
    <div v-else class="dirChoose">
      <Select class="dropdownTier" v-model="tierValue" clearable placeholder="Tier3" @on-change="getTier3($event)">
            <Option v-for="item in this.lossTier3Array" :key="item.lossid" :label="item.name" :value="item.lossid" :ref="'tierThree' + item.lossid">
            </Option>
          </Select>
      <Select class="dropdownTier" :disabled="tierValue ===''" v-model="childTierValue" clearable placeholder="Tier4" @on-change="getTier4($event)">
            <Option v-for="item in childTierMenuData" :key="item.tier4id" :label="item.name" :value="item.tier4id" :ref="'tierFour' + item.tier4id">
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
  <Modal v-model="modal2" @on-ok="ok" @on-cancel="cancel" class-name="product-vertical-center-modal" :closable="false" width="498">
    <div class="productChoose">
      <div v-if="editProductInfoFlag" class="editProductInfoNameContainer">
        <span>产品：</span>
        <span>{{ this.productName }}</span>
      </div>
      <Select v-else v-model="productValue" class="dropdownProduct" clearable placeholder="产品">
              <Option v-for="item in productList" :value="item.id" :key="item.id" :label="item.name" :ref="productName">
                {{ item.name }}
              </Option>
            </Select>
    </div>
    <div class="productInfoSetting">
      <span>良品数量：</span>
      <InputNumber v-model="conformProductValue" placeholder="请填写数量" :min="0"></InputNumber>
      <span class="cycleTitle">Cycle：</span>
      <InputNumber v-model="normalCycletimeValue" placeholder="请填写时间" :min="0"></InputNumber>
    </div>
  </Modal>
</div>
</template>
<script>
import {
  mapState,
  mapActions
} from "vuex";
Date.prototype.format = function(format) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}
export default {
  data: function() {
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
      tierValue: '',
      childTierMenuData: [],
      childTierValue: '',
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
      productList: [],
      childTabCols: [{
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
      lengthShiftTimeValue: [],
      startTimeValue: '',
      durationTimeValue: '',
      endTimeValue: '',
      openCeremonyFlag: false,
      showLossFlag: false,
      showProductInfoFlag: false,
      validareaList: [],
      lineBodys: [],
      lossTwoLevDataId: [],
      lossThreeLevStructId: '',
      lossThreeLevDataId: '',
      lossFourLevStructId: '',
      lossFourLevDataId: '',
      tier3: '',
      tier4: '',
      lossTwoLevName: '',
      lossTier3Array: [],
      productValue: '',
      shouldNumAttendanceValue: null,
      actualNumAttendanceValue: null,
      editProductInfoFlag: false,
      editLossDirFlag: false,
      editTier3Value: '',
      editTier4Value: '',
      classInfoIdList: '',
      conformProductValue: null,
      normalCycletimeValue: null,
      lossIndex: null,
      lossParams: null,
      modal1: false,
      modal2: false,
      deleteProductIndex: null,
      editProductIndex: null
    }
  },
  computed: {
    ...mapState([
      "validarea",
      "lossTier3",
      "kpiTwoLev",
      "addLosstier4time2Res",
      "datainputLoss",
      // "datainputLossId",
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
    ok() {
      this.$Message.info('Clicked ok');
    },
    cancel() {
      this.$Message.info('Clicked cancel');
    },
    getTier3: function(tier) {
      if (!tier) {
        this.tierValue = '';
        this.childTierValue = '';
        return;
      }
      this.tier3 = this.$refs['tierThree' + tier][0].label;

      this.lossThreeLevStructId = tier;
      let tempTier = [];
      this.childTierMenuData = [];
      this.childTierValue = '';
      for (let val of this.lossTier3.data.losstier4) {
        if (tier === val.losstier3Lossid) {
          tempTier.push({
            "tier4id": val.tier4id,
            "name": val.name
          });
        }
      }
      this.childTierMenuData = tempTier;
    },
    getTier4(tier) {
      if (!tier) {
        this.childTierValue = '';
        return;
      }
      this.tier4 = this.$refs['tierFour' + tier][0].label;

      this.lossFourLevStructId = tier;
    },
    addLoss: function(name) {
      this.lossTwoLevName = name;
      this.showLosstier3({
        "twolevName": name,
      });
      if (this.lengthShiftTimeValue.length <= 0) {
        this.$Message.error("请先选择开班时间");
        return;
      }
      this.editLossDirFlag = false;
      this.showLossFlag = true;
    },
    addProductInfo: function(name) {
      this.editProductInfoFlag = false;
      this.showProductInfoFlag = true;
      this.showProductName({
        "linebodyId": this.lineBodys[0]
      })
    },
    deleteLoss(params) {
      for(let i = 0; i < this.datainputLoss.length; i++) {
        for(let key in this.datainputLoss[i]) {
          for(let j = 0; j < this.datainputLoss[i][key].length; j++) {
            if(this.datainputLoss[i][key][j].losstier3name === params.row["losstier3name"]) {
              this.deleteLoss4data({
                "losstier4Dataid": this.datainputLoss[i][key][j].losstier4Dataid
              })
            }
          }
        }
      }
      this.lossIndex = params.index;
      this.lossParams = params
    },
    deleteProductClick(index) {
      const productIdList = this.productInfoData[index].productid;
      this.deleteProduct({"productIdList": productIdList});
      this.deleteProductIndex = index;
    },
    editProduct(index) {
      this.editProductInfoFlag = true;
      let editInfo = this.productInfoData.slice(index, index + 1);
      let timeArr = editInfo[0].normalcycletime.split(':');
      if(timeArr.length === 3) {
        let hour = parseInt(timeArr[0]);
        let min = parseInt(timeArr[1]);
        let sec = parseInt(timeArr[2]);
        this.normalCycletimeValue = hour * 3600 + min * 60 + sec;
      }
      this.productName = editInfo[0].productname;
      this.conformProductValue = parseInt(editInfo[0].conformproduct);
      this.editProductIndex = index;
    },
    editLoss(params) {
      this.editLossDirFlag = true;
      this.editTier3Value = params.row["losstier3name"];
      this.editTier4Value = params.row["losstier4name"];
      this.startTimeValue = new Date(params.row["starttime"]);
      this.endTimeValue = new Date(params.row["endtime"]);
      this.durationTimeValue = this.timeFormat(this.endTimeValue.getTime() - this.startTimeValue.getTime());
      this.lossIndex = params.index;
      this.lossParams = params
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
    openCeremonyClick: function() {
      this.openCeremonyFlag = true;
    },
    addClassInfoClick() {
      this.addClassinf({
        "classStarttime": this.lengthShiftTimeValue[0],
        "classEndtime": this.lengthShiftTimeValue[1],
        "shouldAttendance": this.shouldNumAttendanceValue,
        "actualAttendance": this.actualNumAttendanceValue
      });
    },
    clearClassInfoClick() {
      this.lengthShiftTimeValue = '';
      this.shouldNumAttendanceValue = null;
      this.actualNumAttendanceValue = null;
      this.showKpitwolev({
        userId: sessionStorage.getItem("userid")
      });
    },
    lossConfirmClick: function() {
      this.showLossFlag = false;
      if (this.editLossDirFlag) {
        for(let i = 0; i < this.datainputLoss.length; i++) {
          for(var key in this.datainputLoss[i]) {
            for(let j = 0; j < this.datainputLoss[i][key].length; j++) {
              if(this.datainputLoss[i][key][j].losstier3name === this.lossParams.row["losstier3name"]) {
                this.updateObjectimeAfteradd({
                  "losstier4Dataid": this.datainputLoss[i][key][j].losstier4Dataid,
                  "starttime": this.startTimeValue,
                  "endtime": this.endTimeValue
                });
              }
            }
          }
        }
      } else {
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
      this.tierValue = '';
      this.childTierValue = '';
      this.durationTimeValue = '';
      this.startTimeValue = '';
      this.endTimeValue = '';
    },
    productInfoConfirmClick() {
      this.showProductInfoFlag = false;
      if(this.editProductInfoFlag) {
        this.updateProduct({
          "productIdList": this.productInfoData[this.editProductIndex].productid,
          "conformProduct": this.conformProductValue,
          "normalCycletime": this.normalCycletimeValue
        })
      } else {
        this.addProduct({
          "classinfIdList": this.classInfoIdList,
          "productNameId": this.productValue,
          "conformProduct": this.conformProductValue,
          "normalCycletime": this.normalCycletimeValue
        });
      }
    },
    productInfoCancelClick() {
      this.showProductInfoFlag = false;
      this.productValue = '';
      this.conformProductValue = '';
      this.normalCycletimeValue = '';
    },
  },
  watch: {
    validarea(newVal) {
      const _this = this;
      this.validareaList = []
      this.validarea.forEach(item => {
        if (item.checked) {
          this.validareaList.push(item)
        }
      });
      _this.lineBodys = [];
      this.validareaList.forEach(function(node) {
        let reg = /^l/g;
        if (reg.test(node.id)) {
          _this.lineBodys.push(node.id.substring(1));
        }
      });
    },
    lossTier3(newVal) {
      if (newVal.status === "0") {
        this.lossTier3Array = newVal.data.losstier3;
      }
    },
    kpiTwoLev(newVal) {
    },
    addLosstier4time2Res(newVal) {
      if (newVal.status === "0") {
        let addLossData = newVal.data;
        addLossData.starttime = new Date(addLossData.starttime).format('yyyy-MM-dd hh:mm:ss');
        addLossData.endtime = new Date(addLossData.endtime).format('yyyy-MM-dd hh:mm:ss');

        for(let i = 0; i < this.datainputLoss.length; i++) {
          for(let key in this.datainputLoss[i]) {
            if(key === addLossData.losstier2name) {
              this.datainputLoss[i][key].push(addLossData);
              this.$Message.success("添加成功");
              console.log(this.datainputLoss);
            }
          }
        }
      } else {
        this.$message.error("添加失败");
      }
      this.tierValue = '';
      this.childTierValue = '';
      this.startTimeValue = '';
      this.durationTimeValue = '';
      this.endTimeValue = '';
    },
    addClassinfRes(newVal) {
      let classInfoIdArr = [];
      if (newVal.status === "0") {
        this.$Message.success("班次信息添加成功");
        for (let i = 0; i < this.addClassinfRes.date.length; i++) {
          classInfoIdArr.push(this.addClassinfRes.date[i].classinfid);
        }
        this.classInfoIdList = classInfoIdArr.join(",");
      } else {
        this.$Message.error("班次信息添加失败");
      }
    },
    addProductRes(newVal) {
      if (newVal.status === "0") {
        this.productInfoData = newVal.data;
        this.$Message.success("添加成功");
      } else {
        this.$Message.error("添加失败");
      }
      this.productValue = '';
      this.conformProductValue = '';
      this.normalCycletimeValue = '';
    },
    showProductRes(newVal) {
      console.log("showProductRes:" + newVal);
    },
    updateObjectimeAfteraddRes(newVal) {
      console.log("updateObjectimeAfteraddRes:" + newVal);
      let editLossData = newVal.data;
      const editLossStartTime = new Date(editLossData.starttime).format('yyyy-MM-dd hh:mm:ss');
      const editLossEndTime = new Date(editLossData.endtime).format('yyyy-MM-dd hh:mm:ss');
      if (newVal.status === "0") {
        for(let i = 0; i < this.datainputLoss.length; i++) {
          for(let key in this.datainputLoss[i]) {
            if(key === editLossData.losstier2name) {
              if(this.datainputLoss[i][key][this.lossIndex].losstier4Dataid === editLossData.losstier4Dataid) {
                this.datainputLoss[i][key][this.lossIndex].starttime = editLossStartTime;
                this.datainputLoss[i][key][this.lossIndex].endtime = editLossEndTime;
                this.$Message.success("修改成功");
              }
            }
          }
        }
      } else {
        this.$Message.error("修改失败");
      }
      this.tierValue = '';
      this.childTierValue = '';
      this.startTimeValue = '';
      this.durationTimeValue = '';
      this.endTimeValue = '';
    },
    showProductNameRes(newVal) {
      console.log("showProductNameRes:" + newVal);
      if (newVal.status === "0") {
        this.productList = newVal.data;
      }
    },
    deleteProductRes(newVal) {
      console.log("deleteProductRes:" + newVal);
      if(newVal.status === "0") {
        this.productInfoData.splice(this.deleteProductIndex, 1);
      }
      this.deleteProductIndex = null;
    },
    updateProductRes(newVal) {
      if(newVal.status === "0") {
        console.log(newVal.data.conformproduct);
        console.log(newVal.data.normalcycletime);

        this.productInfoData[this.editProductIndex].conformproduct = newVal.data.conformproduct;
        this.productInfoData[this.editProductIndex].normalcycletime = newVal.data.normalcycletime;
        console.log(this.productInfoData);
      }
      this.editProductIndex = null;
    },
    deleteLoss4dataRes(newVal) {
      if(newVal.status === "0") {
        for(let i = 0; i < this.datainputLoss.length; i++) {
          for(let key in this.datainputLoss[i]) {
            for(let j = 0; j < this.datainputLoss[i][key].length; j++) {
              if(this.datainputLoss[i][key][j].losstier3name === this.lossParams.row["losstier3name"]) {
                this.datainputLoss[i][key].splice(j, 1);
              }
            }
          }
        }
      }
    }
  },
  mounted() {
    if (sessionStorage.getItem("userid")) {
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
