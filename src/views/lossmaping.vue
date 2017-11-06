<template>
<div class="lossmapping">
    <div class="titleContainer">
      <span>loss</span>
      <div class="showTimeAndArea" @click="showFlag=!showFlag">
        <span :class="showFlag?'iconfont icon-drop-down2 rotate':'iconfont icon-drop-down2'"></span>
        <span class="areaAndShift">时间/区域</span>
      </div>
    </div>
    <div class="tableContainer">
      <table class="table">
        <tbody>
          <tr>
            <td>OEE</td>
            <td id="oee" style="width: 600px;height:200px;"></td>
          </tr>
          <tr>
            <td>OLE</td>
            <td id="ole" style="width: 600px;height:200px;"></td>
          </tr>
          <tr>
            <td>OLE</td>
            <td id="ole1" style="width: 600px;height:200px;"></td>
          </tr>
          <tr>
            <td>OLE</td>
            <td id="ole2" style="width: 600px;height:200px;"></td>
          </tr>
        </tbody>
      </table>
    </div>
</div>
</template>
<script>
import router from "../router/index.js";
import echarts from "echarts"

export default {
  data: function() {
    return {
      data1: [{
          name: '数据1',
          value: 10
        },
        {
          name: '数据2',
          value: 20
        },
        {
          name: '数据3',
          value: 20
        },
        {
          name: '数据4',
          value: 10
        }
      ],
      links: [{
          source: '数据1',
          target: '数据3',
          value: 9
        },
        {
          source: '数据2',
          target: '数据3',
          value: 11
        },
        {
          source: '数据1',
          target: '数据4',
          value: 1
        },
        {
          source: '数据2',
          target: '数据4',
          value: 9
        }
      ]
    }

  },
  methods: {
    initCharts: function() {
      var myChart1 = echarts.init(document.getElementById('oee'));
      var myChart2 = echarts.init(document.getElementById('ole'));
      var myChart3 = echarts.init(document.getElementById('ole1'));
      var myChart4 = echarts.init(document.getElementById('ole2'));

      var option = {
        // title: {
        //   text: 'Sankey Diagram'
        // },
        width: 500,
        height: 150,
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [{
          type: 'sankey',
          layout: 'none',
          data: this.data1,
          links: this.links,
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#aaa'
            }
          },
          lineStyle: {
            normal: {
              color: 'source',
              curveness: 0.5
            }
          }
        }]
      };
      myChart1.setOption(option, true);
      myChart2.setOption(option, true);
      myChart3.setOption(option, true);
      myChart4.setOption(option, true);

    }
  },
  mounted() {
    this.initCharts();
  }
}
</script>
