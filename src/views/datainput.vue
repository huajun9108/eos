<template>
<div class="datainput user_common">
  <div class="datainputContainer user_maincontent">
    <div class="openCeremony">
      <span class="inputBtn openCeremonyButton" @click="openCeremonyClick">开班</span>
      <span class="inputBtn historyButton">班次历史记录</span>
    </div>
    <div class="lengthShift" :class="openCeremonyFlag?'showchoose':'hidechoose'">
      <span class="lengthShiftTime">本班次时间：</span>
      <DatePicker type="datetimerange" placeholder="Select date and time" style="width: 300px"
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
        <DatePicker v-model="startTimeValue" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss"
        :options="optionsStart" @on-change="startTimeValueChange">
        </DatePicker>
      </div>
      <div class="durationTimeContainer">
        <span class="timeTitle">持续时间：</span>
        <TimePicker v-model="durationTimeValue" placeholder="任意时间点" format="HH:mm:ss" @on-change="durationTimeValueChange">
        </TimePicker>
      </div>
      <div class="endTimeContainer">
        <span class="timeTitle">结束时间：</span>
        <DatePicker v-model="endTimeValue" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss"
        :options="optionsEnd" @on-change="endTimeValueChange">
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

export default {
  data: function() {
    return {
      optionsOpenCeremony: {
        disabledDate (date) {
          // return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      optionsStart: {
        disabledDate: (date) => {
          // let beginDateVal = this.endTimeValue;
          // if(beginDateVal) {
          //   return date && date.valueOf() > beginDateVal;
          // }
        }
      },
      optionsEnd: {
        disabledDate: (date) => {
          // let beginDateVal = this.startTimeValue;
          // if(beginDateVal) {
          //   return (date && date.valueOf() < beginDateVal);
          // }
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
    startTimeValueChange: function(val) {
      if (!val) {
        this.durationTimeValue = '';
        this.endTimeValue = '';
        return;
      }
      const start = new Date(val);
      const startMs = start.getTime();
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
    endTimeValueChange: function(val) {
      if (!val) {
        this.startTimeValue = '';
        this.durationTimeValue = '';
        return;
      }
      const end = new Date(val);
      const endMs = end.getTime();
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
      console.log(typeof this.startTimeValue);
      console.log(this.startTimeValue);
      console.log(typeof this.durationTimeValue);
      console.log(this.durationTimeValue);
      console.log(typeof this.endTimeValue);
      console.log(this.endTimeValue);
      const obj = {
        "tier3": this.tierValue,
        "tier4": this.childTierValue,
        "开始时间": this.startTimeValue,
        "结束时间": this.endTimeValue
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
