<template>
<div class="datainput user_common">
  <div class="datainputContainer user_maincontent">
    <div class="openCeremony">
      <span class="inputBtn openCeremonyButton">开班</span>
      <span class="inputBtn historyButton">班次历史记录</span>
    </div>
    <div class="lengthShift">
      <span class="lengthShiftTime">本班次时间：</span>
      <el-date-picker v-model="value" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
    </div>
    <div class="tableContainer">
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
                <!-- <table class="childTableBody">
                  <tbody>
                    <tr v-for="c in childTableData">
                      <td class="childFirstCol"></td>
                      <td class="childSecondCol"></td>
                      <td class="childThirdCol"></td>
                      <td class="childFourthCol"></td>
                      <td class="childFifthCol"></td>
                    </tr>
                  </tbody>
                </table> -->
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
            <el-dropdown-item  v-for="data in tierMenuData">{{ data.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="startTimeContainer">
        <span class="timeTitle">开始时间：</span>
        <el-date-picker
        v-model="lossTimeValue"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
      </div>
      <div class="durationTimeContainer">
        <span class="timeTitle">持续时间：</span>
        <el-date-picker
        v-model="lossTimeValue"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
      </div>
      <div class="endTimeContainer">
        <span class="timeTitle">结束时间：</span>
        <el-date-picker
        v-model="lossTimeValue"
        type="datetime"
        placeholder="选择日期时间">
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
      tierMenuData: [
        { "name": "Lack of demand" },
        { "name": "Lack of demand" },
        { "name": "Breakdowns"},
      ],
      childTableData: [
        {},
        {},
        {},
        {},
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
      value: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      showFlag: false,
      lossTimeValue: '',
      // setting: {
      //   async: {
      //     enable: true,
      //     url: "http://116.196.113.167:3001/areaAllSet/showAreaAll",
      //     type: "get"
      //   },
      //   view: {
      //     selectedMulti: false,
      //     showIcon: false,
      //   },
      //   data: {
      //     simpleData: {
      //       enable: true
      //     }
      //   },
      //   check: {
      //     enable: true,
      //     chkStyle: "checkbox",
      //     radioType: "level"
      //   },
      // },
    }
  },
  methods: {
    addLoss: function() {
      this.showFlag = !this.showFlag;
    },
    getVirtulData: function(year) {
      year = year || '2017';
      var date = +echarts.number.parseDate(year + '-01-01');
      var end = +echarts.number.parseDate((+year + 1) + '-01-01');
      var dayTime = 3600 * 24 * 1000;
      var data = [];
      for (var time = date; time < end; time += dayTime) {
        data.push([
          echarts.format.formatTime('yyyy-MM-dd', time),
          Math.floor(Math.random() * 1000)
        ]);
      }
      return data;
    },
    confirmClick: function() {
      this.showFlag = !this.showFlag;
    },
    cancelClick: function() {
      this.showFlag = !this.showFlag;
    }
    // initCharts: function() {
    //   var myChart = echarts.init(document.getElementById('shift'));
    //   var option = {
    //     tooltip: {
    //       position: 'top',
    //       formatter: function(p) {
    //         var format = echarts.format.formatTime('yyyy-MM-dd', p.data[0]);
    //         return format + ': ' + p.data[1];
    //       }
    //     },
    //     visualMap: {
    //       min: 0,
    //       max: 1000,
    //       calculable: true,
    //       orient: 'vertical',
    //       left: '670',
    //       top: 'center'
    //     },
    //
    //     calendar: [{
    //         left: 50,
    //         orient: 'vertical',
    //         range: '2016'
    //       },
    //       {
    //         left: 250,
    //         cellSize: [20, 'auto'],
    //         bottom: 10,
    //         orient: 'vertical',
    //         range: '2017',
    //         dayLabel: {
    //           margin: 5
    //         }
    //       }
    //     ],
    //
    //     series: [{
    //       type: 'heatmap',
    //       coordinateSystem: 'calendar',
    //       calendarIndex: 0,
    //       data: this.getVirtulData(2016)
    //     }, {
    //       type: 'heatmap',
    //       coordinateSystem: 'calendar',
    //       calendarIndex: 1,
    //       data: this.getVirtulData(2017)
    //     }]
    //   };
    //   myChart.setOption(option, true);
    // }
  },
  mounted() {
    // this.initCharts();
    // $.fn.zTree.init($("#area"), this.setting);
  }
}
</script>
<style lang="sass" scoped>
</style>
