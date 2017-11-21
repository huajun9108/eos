<template>
<div class="datainput user_common">
  <div class="datainputContainer user_maincontent">
    <div class="openCeremony">
      <span class="inputBtn openCeremonyButton" @click="openCeremonyClick">开班</span>
      <span class="inputBtn historyButton">班次历史记录</span>
    </div>
    <div class="lengthShift" :class="openCeremonyFlag?'showchoose':'hidechoose'">
      <span class="lengthShiftTime">本班次时间：</span>
      <DatePicker v-model="lengthShiftTimeValue" type="datetimerange" placeholder="Select date and time" style="width: 300px"
      :options="optionsOpenCeremony" @on-change="lengthShiftTimeChange"></DatePicker>
    </div>
    <div class="tableContainer" :class="openCeremonyFlag?'showchoose':'hidechoose'">
      <table class="tableBody">
        <tbody>
          <tr v-for="d in tableData">
            <td class="firstCol">{{ d.tier }}</td>
            <td class="secondCol">
              <textarea class="textArea"></textarea>
            </td>
            <td class="thirdCol">
              <div class="childTableContainer">
                <Table border width="646" height="202" :columns="childTabCols" :data="childTableData"></Table>
              </div>
            </td>
            <td class="fourthCol">
              <span class="addLossBtn" @click="addLoss">添加loss</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="shade" :class="showFlag?'showchoose':'hidechoose'"></div>
    <div class="lossChoose" :class="showFlag?'showchoose':'hidechoose'">
      <div class="dirChoose">
        <Select class="dropdownTier" v-model="tierValue" clearable placeholder="Tier3" @on-change="getTier($event)">
          <Option v-for="item in tierMenuData" :key="item.value" :label="item.label" :value="item.value">
          </Option>
        </Select>
        <Select class="dropdownTier" :disabled="tierValue ===''" v-model="childTierValue" clearable placeholder="Tier4">
          <Option v-for="item in childTierMenuData" :key="item.value" :label="item.label" :value="item.value">
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
        <span class="confirmBtn data_btn" @click="confirmClick">确定</span>
        <span class="cancelBtn data_btn" @click="cancelClick">取消</span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import echarts from "echarts"
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
        disabledDate(date) {
        }
      },
      optionsStart: {
        disabledDate: (date) => {
          if(!(this.lengthShiftTimeValue[0] && this.lengthShiftTimeValue[1])) return false;
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
          if(!(this.lengthShiftTimeValue[0] && this.lengthShiftTimeValue[1])) return false;
          let end = this.lengthShiftTimeValue[1];
          let beginFormat = this.lengthShiftTimeValue[0].format('yyyy-MM-dd');
          let begin = new Date(beginFormat + ' 00:00:00');
          if (begin && end) {
            if (this.startTimeValue) {
              let hour = this.startTimeValue.getHours();
              let min = this.startTimeValue.getMinutes();
              let sec = this.startTimeValue.getSeconds();
              let ms;
              if(hour+min+sec === 0) {
                begin = this.startTimeValue;
                ms = begin.getTime() + ((23 * 60 * 60 + 59 * 60 + 59) * 1000);
              }else {
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
      tierMenuData: [{
          "value": "Lack of demand",
          "label": "Lack of demand"
        },
        {
          "value": "Preventive Maintenance",
          "label": "Preventive Maintenance"
        },
        {
          "value": "Training, Meetings & Shift Breaks",
          "label": "Training, Meetings & Shift Breaks"
        },
        {
          "value": "Breakdowns",
          "label": "Breakdowns"
        },
        {
          "value": "Short Stops",
          "label": "Short Stops"
        },
        {
          "value": "First Level Maintenance",
          "label": "First Level Maintenance"
        },
        {
          "value": "Lack Of Resources & Waiting",
          "label": "Lack Of Resources & Waiting"
        },
        {
          "value": "Setup Time & Adjustment",
          "label": "Setup Time & Adjustment"
        },
        {
          "value": "Process Incidents",
          "label": "Process Incidents"
        },
        {
          "value": "Speed Loss",
          "label": "Speed Loss"
        },
        {
          "value": "Overusage",
          "label": "Overusage"
        },
      ],
      allChildTier: [{
          "tier": "Lack of demand",
          "label": "Lack"
        },
        {
          "tier": "Preventive Maintenance",
          "label": "Preventive"
        },
        {
          "tier": "Training, Meetings & Shift Breaks",
          "label": "Training"
        },
        {
          "tier": "Breakdowns",
          "label": "Breakdowns"
        },
        {
          "tier": "Short Stops",
          "label": "Short"
        },
        {
          "tier": "First Level Maintenance",
          "label": "First"
        },
        {
          "tier": "Lack Of Resources & Waiting",
          "label": "Lack Of"
        },
        {
          "tier": "Setup Time & Adjustment",
          "label": "Setup"
        },
        {
          "tier": "Process Incidents",
          "label": "Process"
        },
        {
          "tier": "Speed Loss",
          "label": "Speed"
        },
        {
          "tier": "Overusage",
          "label": "Overusage"
        },
      ],
      tierValue: '',
      childTierMenuData: [],
      childTierValue: '',
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
          title: '操作',
          key: '操作',
          className: 'childTableFifthCol',
          align: 'center',
          render: (h, params) => {
            return h('div', [
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
              }),
            ]);
          }
        },
      ],
      childTableData: [{
          "tier3": "a",
          "tier4": "aa",
          "开始时间": "2017-10-11 10:00:00",
          "结束时间": "2017-10-12 11:00:00",
        },
        {
          "tier3": "b",
          "tier4": "bb",
          "开始时间": "2017-10-11 10:00:00",
          "结束时间": "2017-10-12 11:00:00",
        },
        {
          "tier3": "c",
          "tier4": "cc",
          "开始时间": "2017-10-11 10:00:00",
          "结束时间": "2017-10-12 11:00:00"
        },
        {
          "tier3": "d",
          "tier4": "dd",
          "开始时间": "2017-10-11 10:00:00",
          "结束时间": "2017-10-12 11:00:00"
        },
        {
          "tier3": "a",
          "tier4": "aa",
          "开始时间": "2017-10-11 10:00:00",
          "结束时间": "2017-10-12 11:00:00",
        },
        {
          "tier3": "b",
          "tier4": "bb",
          "开始时间": "2017-10-11 10:00:00",
          "结束时间": "2017-10-12 11:00:00",
        },
        {
          "tier3": "c",
          "tier4": "cc",
          "开始时间": "2017-10-11 10:00:00",
          "结束时间": "2017-10-12 11:00:00"
        },
        {
          "tier3": "d",
          "tier4": "dd",
          "开始时间": "2017-10-11 10:00:00",
          "结束时间": "2017-10-12 11:00:00"
        },
      ],
      tableData: [{
          "tier": "OEE"
        },
        {
          "tier": "OLE"
        },
        {
          "tier": "MaintCosts"
        },
        {
          "tier": "OEE"
        },
        {
          "tier": "OLE"
        },
        {
          "tier": "MaintCosts"
        },
        {
          "tier": "OEE"
        },
        {
          "tier": "OLE"
        },
        {
          "tier": "MaintCosts"
        },
      ],
      lengthShiftTimeValue: [],
      startTimeValue: '',
      durationTimeValue: '',
      endTimeValue: '',
      openCeremonyFlag: false,
      showFlag: false,
    }
  },
  methods: {
    getTier: function(tier) {
      let tempTier = [];
      this.childTierMenuData = [];
      this.childTierValue = '';
      for (let val of this.allChildTier) {
        if (tier === val.tier) {
          tempTier.push({
            "label": val.label,
            "value": val.label
          });
        }
      }
      this.childTierMenuData = tempTier;
    },
    deleteLoss(index) {
      this.childTableData.splice(index, 1);
    },
    lengthShiftTimeChange: function(val) {
      console.log(val);
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
    addLoss: function() {
      this.showFlag = !this.showFlag;
    },
    openCeremonyClick: function() {
      this.openCeremonyFlag = !this.openCeremonyFlag;
    },
    confirmClick: function() {
      this.showFlag = !this.showFlag;
      const obj = {
        "tier3": this.tierValue,
        "tier4": this.childTierValue,
        "开始时间": this.startTimeValue.format('yyyy-MM-dd hh:mm:ss'),
        "结束时间": this.endTimeValue.format('yyyy-MM-dd hh:mm:ss')
      };
      if (obj) {
        this.childTableData.push(obj);
        this.tierValue = '';
        this.childTierValue = '';
        this.startTimeValue = '';
        this.durationTimeValue = '';
        this.endTimeValue = '';
      }
    },
    cancelClick: function() {
      this.showFlag = !this.showFlag;
      this.tierValue = '';
      this.childTierValue = '';
      this.durationTimeValue = '';
      this.startTimeValue = '';
      this.endTimeValue = '';
    }
  },
  mounted() {}
}
</script>
<style lang="sass" scoped>
</style>
