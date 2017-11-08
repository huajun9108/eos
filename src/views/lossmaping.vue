<template>
<div class="lossmapping">
  <div class="titleContainer">
    <span class="titleContent">Loss</span>
  </div>
  <div class="tableContainer">
    <table class="tableBody">
      <tbody>
        <tr>
          <td class="firstCol">OEE</td>
          <td id="oee" class="secordCol" style="width: 600px;height:220px;"></td>
        </tr>
        <tr>
          <td class="firstCol">OLE</td>
          <td id="ole" class="secordCol" style="width: 600px;height:220px;"></td>
        </tr>
        <tr>
          <td class="firstCol">OLE</td>
          <td id="ole1" class="secordCol" style="width: 600px;height:220px;"></td>
        </tr>
        <tr>
          <td class="firstCol">OLE</td>
          <td id="ole2" class="secordCol" style="width: 600px;height:220px;"></td>
        </tr>
        <tr>
          <td class="firstCol">OLE</td>
          <td id="ole3" class="secordCol" style="width: 600px;height:220px;"></td>
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
</template>
<script>
import {
  mapState,
  mapActions
} from "vuex";
import router from "../router/index.js";
import echarts from "echarts"
import myDatepicker from 'vue-datepicker'


export default {
  components: {
    'date-picker': myDatepicker
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
      validareaList: [],
      showFlag: false,
      data1: [{
          name: '数据1',
          value: 30
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
    ]),
    initCharts: function() {
      var myChart1 = echarts.init(document.getElementById('oee'));
      var myChart2 = echarts.init(document.getElementById('ole'));
      var myChart3 = echarts.init(document.getElementById('ole1'));
      var myChart4 = echarts.init(document.getElementById('ole2'));
      var myChart5 = echarts.init(document.getElementById('ole3'));


      var option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [{
          width:600,
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
      myChart5.setOption(option, true);

    }
  },
  computed: {
    ...mapState([
      "validarea"
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
    }
  },
  mounted() {
    this.initCharts();
    if (sessionStorage.getItem("userid")) {
      this.selectUserById({
        userid: sessionStorage.getItem("userid")
      })
    } else {
      console.log(this.$route);
    }
  }
}
</script>
