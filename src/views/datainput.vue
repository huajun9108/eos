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
                  <div class="childTableRow" v-for="c in childTableData">
                    <span class="childFirstCol childTableCol">{{ c.name }}</span>
                    <span class="childSecondCol childTableCol">{{ c.name }}</span>
                    <span class="childThirdCol childTableCol">{{ c.name }}</span>
                    <span class="childFourthCol childTableCol">{{ c.name }}</span>
                    <span class="childFifthCol childTableCol">{{ c.name }}</span>
                  </div>
                </div>
                <!-- <div class="childTableBody">
                  <table>
                    <tbody>
                      <tr v-for="c in childTableData">
                        <td class="childFirstCol">{{ c.name }}</td>
                        <td class="childSecondCol">{{ c.name }}</td>
                        <td class="childThirdCol">{{ c.name }}</td>
                        <td class="childFourthCol">{{ c.name }}</td>
                        <td class="childFifthCol">{{ c.name }}</td>
                      </tr>
                    </tbody>
                  </table>
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
        <el-dropdown class="dropdownTier">
          <span class="el-dropdown-link">
            Tier3<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="data in tierMenuData">{{ data.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="dropdownTier">
          <span class="el-dropdown-link">
            Tier4<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="data in tierMenuData">{{ data.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
          "name": "Lack of demand"
        },
        {
          "name": "Lack of demand"
        },
        {
          "name": "Breakdowns"
        },
      ],
      childTableData: [{
          "name": "a"
        },
        {
          "name": "b"
        },
        {
          "name": "c"
        },
        {
          "name": "d"
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
      lengthShiftTimeValue: [new Date(2017, 11, 12, 8, 0, 0), new Date(2017, 11, 12, 18, 0, 0)],
      startTimeValue: '',
      durationTimeValue: '',
      endTimeValue: '',
      openCeremonyFlag: false,
      showFlag: false,
    }
  },
  methods: {
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
    startTimeValueChange: function(val) {
      this.startTimeValue = val;
    },
    durationTimeValueChange: function(val) {
      this.durationTimeValue = val;
      if (this.startTimeValue !== '') {
        const start = new Date(this.startTimeValue);
        const durationArray = this.durationTimeValue.split(":");
        const startMs = start.getTime();
        var durationMs;
        if (durationArray) {
          const hour = parseInt(durationArray[0]);
          const min = parseInt(durationArray[1]);
          const sec = parseInt(durationArray[2]);
          durationMs = (hour * 3600 + min * 60 + sec) * 1000;
        }
        const end = new Date(startMs + durationMs);
        this.endTimeValue = end;
      }
    },
    endTimeValueChange: function(val) {
      this.endTimeValue = val;
      // if(this.startTimeValue !== '') {
      //   const start = new Date(this.startTimeValue);
      //   const end = new Date(this.endTimeValue);
      //   const startMs = start.getTime();
      //   const endMs = start.getTime();
      //   const durationMs = endMs - startMs;
      // alert(durationMs);
      // }
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
    },
    cancelClick: function() {
      this.showFlag = !this.showFlag;
    }
  },
  mounted() {}
}
</script>
<style lang="sass" scoped>
</style>
