<template>
<div class="lossmapping user_common">
  <div class="lossmappingContainer user_maincontent">
    <div class="titleContainer">
      <span class="titleContent">Loss</span>
    </div>
    <div class="tableContainer">
      <table class="tableBody">
        <tbody>
          <tr v-for="title in testList">
            <td class="firstCol">{{ title.title }}</td>
            <td :id='title.title' class="secordCol" style="width: 600px;height:220px;"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="showTimeAndArea" @click="showFlag=!showFlag">
      <span :class="showFlag?'iconfont icon-drop-down2 rotate':'iconfont icon-drop-down2'"></span>
      <span class="areaAndShift">时间/区域</span>
    </div>
    <transition>
      <div class="TimeAndAreaContainer" :class="showFlag?'showchoose':'hidechoose'">
        <div class="chooseTime box">
          <h1>时间选择</h1>
          <div class="time">
            <span>开始时间</span>
            <date-picker :date="startTime" :option="option" :limit="limit"></date-picker>
          </div>
          <div class="time">
            <span>结束时间</span>
            <date-picker :date="endtime" :option="option" :limit="limit"></date-picker>
          </div>
        </div>
        <div class="chooseArea box">
          <h1>区域选择</h1>
          <div class="area">
            <ul id="treeDemo" class="ztree"></ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</div>
</template>
<script>
import {
  mapState,
  mapActions
} from "vuex";
import router from "../router/index.js";
import echarts from "echarts"
import myDatepicker from 'vue-datepicker'
import chart from '../components/echarts'

export default {
  components: {
    'date-picker': myDatepicker,
    chart
  },
  data: function() {
    return {
      setting: {
        view: {
          selectedMulti: false,
          showIcon: false,
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        check: {
          enable: true,
          chkStyle: "checkbox",
          radioType: "level"
        },
      },
      testList: [],
      accessList:[
        {data1: [{
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
        },
        {
          name: '数据5',
          value: 5
        },
        {
          name: '数据6',
          value: 25,
        }
      ]},{
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
        },
        {
          source: '数据4',
          target: '数据5',
          value: 3
        },
        {
          source: '数据4',
          target: '数据6',
          value: 7
        },
        {
          source: '数据3',
          target: '数据5',
          value: 2
        },
        {
          source: '数据3',
          target: '数据6',
          value: 18
        }
      ]
      }
      ],
      validareaList: [],
      showFlag: false,
      data1: [{
          name: '数据1',
          value: 30,
        },
        {
          name: '数据3',
          value: 20,
        },
        {
          name: '数据4',
          value: 10
        },
        {
          name: '数据5',
          value: 5
        },
        {
          name: '数据6',
          value: 25,
        }
      ],
      links: [{
          source: '数据1',
          target: '数据3',
          value: 20
        },
        {
          source: '数据1',
          target: '数据4',
          value: 10
        },
        {
          source: '数据4',
          target: '数据5',
          value: 3
        },
        {
          source: '数据4',
          target: '数据6',
          value: 7
        },
        {
          source: '数据3',
          target: '数据5',
          value: 2
        },
        {
          source: '数据3',
          target: '数据6',
          value: 18
        }
      ],
      startTime: {
        time: ''
      },
      endtime: {
        time: ''
      },
      option: {
        type: 'day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD',
        placeholder: 'when?',
        inputStyle: {
          'background': '#e1e1e1',
          'display': 'inline-block',
          'width': '150px',
          'line-height': '22px',
          'font-size': '16px',
          'border': 'none',
          'border-radius': '11px',
          'color': '#131313',
          'text-align': 'center'
        },
        color: {
          header: '#ccc',
          headerText: '#f00'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },
      timeoption: {
        type: 'min',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm'
      },
      multiOption: {
        type: 'multi-day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: "YYYY-MM-DD HH:mm"
      },
      limit: [
        // {
        // 	type: 'weekday',
        // 	available: [1, 2, 3, 4, 5]
        // },
        // {
        // 	type: 'fromto',
        // 	from: '2016-02-01',
        // 	to: '2016-02-20'
        // }
      ]
    }

  },
  methods: {
    ...mapActions([
      'selectUserById',
      'selectLossmappingLinebody'
    ]),
    testdata(){
      this.selectLossmappingLinebody()
    },
     send(){
        var x = "类别"+(this.chartData.length+1)
        var y = Math.ceil(Math.random()*100)
        this.chartData.push([x,y])
      },
    initCharts: function() {
      for(let i = 0; i < this.testList.length; i++) {
        console.log(this.testList[i].title);
          var myChart = echarts.init(document.getElementById(this.testList[i].title));
          var option = {
            tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove'
            },
            series: [{
              width:600,
              type: 'sankey',
              layout: 'none',
              data: this.testList[i].data,
              links: this.testList[i].link,
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
          myChart.setOption(option, true);
      }
    }
  },
  computed: {
    ...mapState([
      "validarea",
      'tier2',
      'lossmappingLinebodyAll'
    ])
  },
  watch: {
    validarea(newVal) {
      this.validarea.forEach(
        item => {
          if (item.checked) {
            this.validareaList.push(item);
          }
        }
      );
      $.fn.zTree.init($("#treeDemo"), this.setting, this.validareaList);
    },
  },
  created() {
    this.testdata()
    this.lossmappingLinebodyAll.forEach(
      item => {
        this.testList.push(item);
        console.log(item)
      }
    );
  },
  mounted() {
    this.initCharts();
  }
}
</script>
