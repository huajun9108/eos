<template>
<div class="datainput">
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
              <table class="childTableBody">
                <tbody>
                  <tr>
                    <td class="childFirstCol">Tier3</td>
                    <td class="childSecondCol">Tier4</td>
                    <td class="childThirdCol">开始时间</td>
                    <td class="childFourthCol">结束时间</td>
                    <td class="childFifthCol">操作</td>
                  </tr>
                  <tr v-for="c in childTableData">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
          <td class="fourthCol">
            <span class="addLossBtn" @click="addLoss">添加loss</span>
          </td>
        </tr>

      </tbody>
    </table>
  </div>
  <div class="LossChoose" :class="showFlag?'showchoose':'hidechoose'">
    addLoss
  </div>
</div>
</template>
<script>
import echarts from "echarts"

export default {
  data: function() {
    return {
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
      const h = this.$createElement;
      this.$msgbox({
        title: '消息',
        message: h('p', null, [
          h('span', null, '内容可以是 '),
          h('i', {
            style: 'color: teal'
          }, 'VNode')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      });
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
