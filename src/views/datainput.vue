<template>
<div class="datainput user_common">
  <div class="datainputContainer user_maincontent">
    <div class="openCeremony">
      <span class="inputBtn openCeremonyButton" @click="openCeremonyClick">开班</span>
      <span class="inputBtn historyButton">班次历史记录</span>
    </div>
    <div class="lengthShift" :class="openCeremonyFlag?'showchoose':'hidechoose'">
      <span class="lengthShiftTime">本班次时间：</span>
      <DatePicker type="datetimerange" placeholder="Select date and time" style="width: 300px"></DatePicker>
      <!-- <el-date-picker v-model="lengthShiftTimeValue" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="lengthShiftTimeChange" value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker> -->
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
                <Table border height="202" :columns="childTabCols" :data="childTableData"></Table>
                <!-- <div class="childTableTitle">
                  <table>
                    <thead>
                      <tr>
                        <th>Tier3</th>
                        <th>Tier4</th>
                        <th>开始时间</th>
                        <th>结束时间</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div class="childTableBody">
                  <table>
                    <tbody class="">
                      <tr v-for="(c,idx) in childTableData" :key="idx">
                        <td>{{ c.tierValue }}</td>
                        <td>{{ c.childTierValue }}</td>
                        <td>{{ c.startTimeValue }}</td>
                        <td>{{ c.endTimeValue }}</td>
                        <td @click="deleteLoss(idx)"><i class="icon-delete_2"></i></td>
                      </tr>
                    </tbody>
                  </table> -->
                <!-- </div> -->
                <!-- <div class="childTableTitle">
                  <span class="childFirstCol childTableCol">Tier3</span>
                  <span class="childSecondCol childTableCol">Tier4</span>
                  <span class="childThirdCol childTableCol">开始时间</span>
                  <span class="childFourthCol childTableCol">结束时间</span>
                  <span class="childFifthCol childTableCol">操作</span>
                </div>
                <div class="childTableBody">
                  <div class="childTableRow" v-for="(c,idx) in childTableData" :key="idx">
                    <span class="childFirstCol childTableCol">{{ c.tierValue }}</span>
                    <span class="childSecondCol childTableCol">{{ c.childTierValue }}</span>
                    <span class="childThirdCol childTableCol">{{ c.startTimeValue }}</span>
                    <span class="childFourthCol childTableCol">{{ c.endTimeValue }}</span>
                    <span class="childFifthCol childTableCol" @click="deleteLoss(idx)"><i class="icon-delete_2"></i></span>
                  </div>
                </div> -->
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
        <DatePicker v-model="startTimeValue" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss">
        </DatePicker>
      </div>
      <div class="durationTimeContainer">
        <span class="timeTitle">持续时间：</span>
        <TimePicker v-model="durationTimeValue" placeholder="任意时间点" format="HH:mm:ss">
        </TimePicker>
      </div>
      <div class="endTimeContainer">
        <span class="timeTitle">结束时间：</span>
        <DatePicker v-model="endTimeValue" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss">
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
      childTabCols: [
        {
          title: 'Tier3',
          key: 'tier3',
          align: 'center',
        },
        {
          title: 'Tier4',
          key: 'tier4',
          align: 'center',
        },
        {
          title: '开始时间',
          key: '开始时间',
          align: 'center',
        },
        {
          title: '结束时间',
          key: '结束时间',
          align: 'center',
        },
        {
          title: '操作',
          key: '操作',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('i', {
                attrs: {
                  class: "icon-delete_2",
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.deleteLoss(params.index)
                    // this.show(params.index)
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
      console.log(this.childTableData.splice(index, 1));
    },
    lengthShiftTimeChange: function(val) {},
    dateFormat: function(dateObj) {
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate();
      const hour = dateObj.getHours() < 10 ? '0' + dateObj.getHours() : dateObj.getHours();
      const min = dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes() : dateObj.getMinutes();;
      const sec = dateObj.getSeconds() < 10 ? '0' + dateObj.getSeconds() : dateObj.getSeconds();;
      return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    },
    timeFormat: function(mss) {
      var hour = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var min = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
      var sec = (mss % (1000 * 60)) / 1000;
      return `${hour}:${min}:${sec}`;
    },
    timeTranslateMs: function(durationArray) {
      if (durationArray) {
        const hour = parseInt(durationArray[0]);
        const min = parseInt(durationArray[1]);
        const sec = parseInt(durationArray[2]);
        return (hour * 3600 + min * 60 + sec) * 1000;
      }
    },
    startTimeValueChange: function(val) {
      console.log(this.startTimeValue);
      if (!this.startTimeValue) {
        this.durationTimeValue = '';
        this.endTimeValue = '';
        return;
      }
      const start = new Date(this.startTimeValue);
      const startMs = start.getTime();
      console.log(`${start} ${startMs}`);
      if (this.durationTimeValue !== '') {
        const durationArray = this.durationTimeValue.split(":");
        const durationMs = this.timeTranslateMs(durationArray);
        const end = new Date(startMs + durationMs);
        this.endTimeValue = this.dateFormat(end);
      } else if (this.endTimeValue !== '') {
        const end = new Date(this.endTimeValue);
        const endMs = end.getTime();
        const durationMs = endMs - startMs;
        this.durationTimeValue = this.timeFormat(durationMs);
      }
    },
    durationTimeValueChange: function(val) {
      console.log(typeof this.durationTimeValue);
      // if (!this.durationTimeValue) {
      //   this.startTimeValue = '';
      //   this.endTimeValue = '';
      //   return;
      // }
      // const durationArray = this.durationTimeValue.split(":");
      // const durationMs = this.timeTranslateMs(durationArray);
      // if (this.startTimeValue !== '') {
      //   const start = new Date(this.startTimeValue);
      //   const startMs = start.getTime();
      //   const end = new Date(startMs + durationMs);
      //   this.endTimeValue = this.dateFormat(end);
      // } else if (this.endTimeValue !== '') {
      //   const end = new Date(this.endTimeValue);
      //   const endMs = end.getTime();
      //   const start = new Date(endMs - durationMs);
      //   this.startTimeValue = this.dateFormat(start);
      // }
    },
    endTimeValueChange: function(val) {
      if (!this.endTimeValue) {
        this.startTimeValue = '';
        this.durationTimeValue = '';
        return;
      }
      const end = new Date(this.endTimeValue);
      const endMs = end.getTime();
      if (this.durationTimeValue !== '') {
        const durationArray = this.durationTimeValue.split(":");
        const durationMs = this.timeTranslateMs(durationArray);
        const start = new Date(endMs - durationMs);
        this.startTimeValue = this.dateFormat(start);
      } else if (this.startTimeValue !== '') {
        const start = new Date(this.startTimeValue);
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
        "tierValue": this.tierValue,
        "childTierValue": this.childTierValue,
        "startTimeValue": this.startTimeValue,
        "endTimeValue": this.endTimeValue
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
