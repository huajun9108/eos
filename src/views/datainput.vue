<template>
<div class="datainput user_common">
  <div class="datainputContainer user_maincontent">
    <div class="openCeremony">
      <span class="inputBtn openCeremonyButton" @click="openCeremonyClick">开班</span>
      <span class="inputBtn historyButton">班次历史记录</span>
    </div>
    <div class="lengthShift" :class="openCeremonyFlag?'showchoose':'hidechoose'">
      <span class="lengthShiftTime">本班次时间：</span>
      <el-date-picker v-model="lengthShiftTimeValue" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="lengthShiftTimeChange" value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>
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
                <div class="childTableTitle">
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
                </div>
<<<<<<< HEAD
                
=======
>>>>>>> sponge
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
        <el-select class="dropdownTier" v-model="tierValue" clearable placeholder="Tier3" @change="getTier($event)">
          <el-option v-for="item in tierMenuData" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select class="dropdownTier" :disabled="tierValue ===''" v-model="childTierValue" clearable placeholder="Tier4">
          <el-option v-for="item in childTierMenuData" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <!-- <el-dropdown-item v-for="(data, index) in tierMenuData" :key="index">{{ data.name }}</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown> -->
      </div>
      <div class="startTimeContainer">
        <span class="timeTitle">开始时间：</span>
        <el-date-picker v-model="startTimeValue" type="datetime" placeholder="选择日期时间" @change="startTimeValueChange" value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </div>
      <div class="durationTimeContainer">
        <span class="timeTitle">持续时间：</span>
        <el-time-picker v-model="durationTimeValue" :picker-options="{
        selectableRange: '00:00:00 - 23:59:59'
        }" placeholder="任意时间点" @change="durationTimeValueChange" value-format="HH:mm:ss">
        </el-time-picker>
      </div>
      <div class="endTimeContainer">
        <span class="timeTitle">结束时间：</span>
        <el-date-picker v-model="endTimeValue" type="datetime" placeholder="选择日期时间" @change="endTimeValueChange" value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </div>
      <div class="btnContainer text-right">
        <span class="confirmBtn btn" @click="confirmClick">确定</span>
        <span class="cancelBtn btn" @click="cancelClick">取消</span>
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
      childTableData: [{
          "tierValue": "a",
          "childTierValue": "aa",
          "startTimeValue": "2017-10-11 10:00:00",
          "endTimeValue": "2017-10-12 11:00:00"
        },
        {
          "tierValue": "b",
          "childTierValue": "bb",
          "startTimeValue": "2017-10-11 10:00:00",
          "endTimeValue": "2017-10-12 11:00:00"
        },
        {
          "tierValue": "c",
          "childTierValue": "cc",
          "startTimeValue": "2017-10-11 10:00:00",
          "endTimeValue": "2017-10-12 11:00:00"
        },
        {
          "tierValue": "d",
          "childTierValue": "dd",
          "startTimeValue": "2017-10-11 10:00:00",
          "endTimeValue": "2017-10-12 11:00:00"
        },
        // { "name": "a" },
        // { "name": "b" },
        // { "name": "c" },
        // { "name": "d" },
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
      // alert(val);
      // const timeString = JSON.stringify(val);
      // const timeStringFilter1 = timeString.replace('[', '');
      // const timeStringFilter2 = timeStringFilter1.replace(']', '');
      // const timeArray = timeStringFilter2.split(",");
      // if(timeArray.length > 0) {
      //   this.startTimeValue = timeArray[0];
      //   this.endTimeValue = timeArray[1];
      // }
    },
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
      if (!this.startTimeValue) {
        this.durationTimeValue = '';
        this.endTimeValue = '';
        return;
      }
      const start = new Date(this.startTimeValue);
      const startMs = start.getTime();
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
      if (!this.durationTimeValue) {
        this.startTimeValue = '';
        this.endTimeValue = '';
        return;
      }
      const durationArray = this.durationTimeValue.split(":");
      const durationMs = this.timeTranslateMs(durationArray);
      if (this.startTimeValue !== '') {
        const start = new Date(this.startTimeValue);
        const startMs = start.getTime();
        const end = new Date(startMs + durationMs);
        this.endTimeValue = this.dateFormat(end);
      } else if (this.endTimeValue !== '') {
        const end = new Date(this.endTimeValue);
        const endMs = end.getTime();
        const start = new Date(endMs - durationMs);
        this.startTimeValue = this.dateFormat(start);
      }
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
    // getVirtulData: function(year) {
    //   year = year || '2017';
    //   var date = +echarts.number.parseDate(year + '-01-01');
    //   var end = +echarts.number.parseDate((+year + 1) + '-01-01');
    //   var dayTime = 3600 * 24 * 1000;
    //   var data = [];
    //   for (var time = date; time < end; time += dayTime) {
    //     data.push([
    //       echarts.format.formatTime('yyyy-MM-dd', time),
    //       Math.floor(Math.random() * 1000)
    //     ]);
    //   }
    //   return data;
    // },
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
