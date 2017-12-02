<template>
<div class="datainput user_common">
  <div class="datainputContainer user_maincontent">
    <div class="openCeremony">
      <span class="inputBtn openCeremonyButton" @click="openCeremonyClick">开班</span>
      <span class="inputBtn historyButton">班次历史记录</span>
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
          <InputNumber v-model="shouldNumAttendanceValue"></InputNumber>
          <span class="classInfoActualAttendance">实出勤人数：</span>
          <InputNumber v-model="actualNumAttendanceValue"></InputNumber>
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
          <Option v-for="item in this.lossTier3Array" :key="item.lossid" :label="item.name" :value="item.lossid" :ref="item.lossid">
          </Option>
        </Select>
        <Select class="dropdownTier" :disabled="tierValue ===''" v-model="childTierValue" clearable placeholder="Tier4" @on-change="getTier4($event)">
          <Option v-for="item in childTierMenuData" :key="item.tier4id" :label="item.name" :value="item.tier4id" :ref="item.tier4id">
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
            <Option v-for="item in productList" :value="item.value" :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
      </div>
      <div class="productInfoSetting">
        <span>良品数量：</span>
        <InputNumber v-model="conformProductValue" placeholder="请填写数量"></InputNumber>
        <span class="cycleTitle">Cycle：</span>
        <InputNumber v-model="normalCycletimeValue" placeholder="请填写时间"></InputNumber>
      </div>
      <div class="btnContainer text-right">
        <span class="confirmBtn data_btn" @click="productInfoConfirmClick">确定</span>
        <span class="cancelBtn data_btn" @click="productInfoCancelClick">取消</span>
      </div>
    </div>
  </div>
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
          key: '产品',
          align: 'center'
        },
        {
          title: '良品数量',
          key: '良品数量',
          align: 'center'
        },
        {
          title: 'Cycle',
          key: 'Cycle',
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
                style: {
                },
                on: {
                  click: () => {
                    this.deleteProduct(params.index)
                  }
                }
              })
            ]);
          }
        }
      ],
      productInfoData: [{
          '产品': 'A',
          '良品数量': '100',
          'Cycle': '30s',
        },
        {
          '产品': 'B',
          '良品数量': '150',
          'Cycle': '45s',
        },
        {
          '产品': 'C',
          '良品数量': '200',
          'Cycle': '60s',
        },
        {
          '产品': 'A',
          '良品数量': '100',
          'Cycle': '30s',
        },
        {
          '产品': 'B',
          '良品数量': '150',
          'Cycle': '45s',
        },
        {
          '产品': 'C',
          '良品数量': '200',
          'Cycle': '60s',
        },
        {
          '产品': 'A',
          '良品数量': '100',
          'Cycle': '30s',
        },
        {
          '产品': 'B',
          '良品数量': '150',
          'Cycle': '45s',
        },
        {
          '产品': 'C',
          '良品数量': '200',
          'Cycle': '60s',
        }
      ],
      productList: [{
          value: 'A',
          label: 'A'
        },
        {
          value: 'B',
          label: 'B'
        },
        {
          value: 'C',
          label: 'C'
        }
      ],
      childTabCols: [{
          title: 'Tier3',
          key: 'tier3',
          className: 'childTableFirstCol',
          align: 'center',
        },
        {
          title: 'Tier4',
          key: 'tier4',
          className: 'childTableSecondCol',
          align: 'center',
        },
        {
          title: '开始时间',
          key: '开始时间',
          className: 'childTableThirdCol',
          align: 'center'
        },
        {
          title: '结束时间',
          key: '结束时间',
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
                    this.deleteLoss(params.index)
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
      normalCycletimeValue: null
    }
  },
  computed: {
    ...mapState([
      "validarea",
      "lossTier3",
      "kpiTwoLev",
      "addLosstier4time2Res",
      "datainputLoss",
      "datainputLossId",
      "addClassinfRes",
      "addProductRes"
    ])
  },
  methods: {
    ...mapActions([
      "selectUserById",
      "showLosstier3",
      "showKpitwolev",
      "addLosstier4time2",
      "addClassinf",
      "addProduct"
    ]),
    getTier3: function(tier) {
      if (!tier) {
        this.tierValue = '';
        this.childTierValue = '';
        return;
      }
      this.tier3 = this.$refs[tier][0].label;

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
      this.tier4 = this.$refs[tier][0].label;

      this.lossFourLevStructId = tier;
    },
    addLoss: function(name) {
      this.lossTwoLevName = name;
      this.showLosstier3({
        "twolevName": name,
      });
      // if (this.lengthShiftTimeValue.length <= 0) {
      //   this.$Message.error("请先选择开班时间");
      //   return;
      // }
      this.editLossDirFlag = false;
      this.showLossFlag = true;
    },
    addProductInfo: function(name) {
      this.editProductInfoFlag = false;
      this.showProductInfoFlag = true;
    },
    deleteLoss(index) {
      alert("deleteLoss");
      // this.childTableData.splice(index, 1);
    },
    deleteProduct(index) {
      this.productInfoData.splice(index, 1);
    },
    editProduct(index) {
      this.editProductInfoFlag = true;
      let editInfo = this.productInfoData.slice(index, index + 1);
      console.log(`editInfo: ${editInfo[0]['产品']} ${editInfo[0]['良品数量']} ${editInfo[0].Cycle}`);
      this.productName = editInfo[0]['产品'];
      this.conformProductValue = parseInt(editInfo[0]['良品数量']);
      this.normalCycletimeValue = parseInt(editInfo[0].Cycle);
    },
    editLoss(params) {
      this.editLossDirFlag = true;
      this.editTier3Value = params.row["tier3"];
      this.editTier4Value = params.row["tier4"];
      this.startTimeValue = new Date(params.row["开始时间"]);
      this.endTimeValue = new Date(params.row["结束时间"]);
      this.durationTimeValue = this.timeFormat(this.endTimeValue.getTime() - this.startTimeValue.getTime());
      // for (let i = 0; i < this.datainputLoss.length; i++) {
      //   for (var key in this.datainputLoss[i]) {
      //     if(this.datainputLoss[i][key]) {
      //       for(var k in this.datainputLoss[i][key][params.index]) {
      //         if(this.datainputLoss[i][key][params.index][k] === params.row["tier3"]) {
      //           params.rows[""]
      //         }
      //       }
      //     }
      //   }
      // }
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
      this.shouldNumAttendanceValue = '';
      this.actualNumAttendanceValue = '';
    },
    lossConfirmClick: function() {
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
      const obj = {
        "tier3": this.tier3,
        "tier4": this.tier4,
        "开始时间": this.startTimeValue.format('yyyy-MM-dd hh:mm:ss'),
        "结束时间": this.endTimeValue.format('yyyy-MM-dd hh:mm:ss')
      };
      if (obj) {
        for (let i = 0; i < this.datainputLoss.length; i++) {
          for (var key in this.datainputLoss[i]) {
            if (key === this.lossTwoLevName) {
              this.datainputLoss[i][key].push(obj);
            }
          }
        }
        console.log(this.data);
        this.tierValue = '';
        this.childTierValue = '';
        this.startTimeValue = '';
        this.durationTimeValue = '';
        this.endTimeValue = '';
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
      this.addProduct({
        "classinfIdList": this.classInfoIdList,
        "productType": this.productValue,
        "conformProduct": this.conformProductValue,
        "normalCycletime": this.normalCycletimeValue
    });
      const obj = {
        "产品": this.productValue,
        "良品数量": this.conformProductValue,
        "Cycle": this.normalCycletimeValue + 's',
      };
      if(obj && this.productValue && this.conformProductValue && this.normalCycletimeValue) {
        this.productInfoData.push(obj);
      }
      this.productValue = '';
      this.conformProductValue = '';
      this.normalCycletimeValue = '';
    },
    productInfoCancelClick() {
      this.showProductInfoFlag = false;
      this.productValue = '';
      this.conformProductValue = '';
      this.normalCycletimeValue = '';
    }
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
      console.log(`lossTier3: ${newVal.data.losstier3}`);
      if (newVal.status === "0") {
        this.lossTier3Array = newVal.data.losstier3;
      }
    },
    kpiTwoLev(newVal) {
      // console.log(`kpiTwoLev: ${newVal}`);
    },
    addLosstier4time2Res(newVal) {
      console.log(`addLosstier4time2Res ${newVal}`);
      console.log(`datainputLossId: ${this.datainputLossId}`);
      if(newVal.status === "0") {
        console.log(`${newVal.data.losstier4Dataid} ${newVal.data.losstier2name}`)
        if(newVal.data.losstier4Dataid) {
          console.log(newVal.data.losstier2name);
          for(let i = 0; i < this.datainputLossId.length; i++) {
            for(var key in this.datainputLossId[i]) {
              if(key === newVal.data.losstier2name) {
                console.log(newVal.data.losstier4Dataid);
                console.log(this.datainputLossId[i][key])
                this.datainputLossId[i][key].push(newVal.data.losstier4Dataid);
              }
            }
          }
        }
      }
    },
    addClassinfRes(newVal) {
      console.log(`addClassinfRes ${newVal}`);
      let classInfoIdArr = [];
      if(this.addClassinfRes.status === "0") {
        for(let i = 0; i < this.addClassinfRes.date.length; i++) {
          classInfoIdArr.push(this.addClassinfRes.date[i].classinfid);
        }
      }
      this.classInfoIdList = classInfoIdArr.join(",");
    },
    addProductRes(newVal) {
      console.log(`addProductRes: ${addProductRes}`);
    },
    addProduct(newVal) {
      console.log(`addProduct: ${addProductRes}`);
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
