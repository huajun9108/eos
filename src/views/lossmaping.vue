  <template>
  <div class="lossmapping user_common">
    <div class="lossmappingContainer user_maincontent">
      <div class="showTimeAndArea" @click="showlDialog">
            <span :class="isShow?'iconfont icon-drop-down2 rotate':'iconfont icon-drop-down2'"></span>
            <span class="areaAndShift">时间/区域</span>
        </div>
        <v-timearea v-show="isShow"></v-timearea>
      <div class="titleContainer">
        <span class="titleContent">Loss</span>
      </div>
      <div class="tableContainer">
        <table class="tableBody">
          <tbody>
            <tr v-for="(title,idx) in this.lossmappingLinebodyAll.data" :key="idx">
              <td class="firstCol">{{ title.title }}</td>
              <td :id='title.title' class="secordCol" style="width: 600px;height:220px;"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </template>
  <script>
  import {
    mapState,
    mapActions
  } from "vuex";
  import echarts from "echarts"
  import timearea from "../components/timeArea"
  export default {
    components: {
      "v-timearea": timearea
    },
    data: function() {
      return {
        isShow:false,
        chartList: []
      }
    },
    methods: {
      ...mapActions([
      ]),
      showlDialog(data){
        this.isShow = !this.isShow
      },
      initCharts: function() {
        // console.log(this.lossmappingLinebodyAll);
        for(let i = 0; i < this.chartList.length; i++) {
          // console.log(this.chartList[i]);
          if (this.chartList[i] != null && this.chartList[i] != "" && this.chartList[i] != undefined)
          this.chartList[i].dispose();
        }
        if(this.lossmappingLinebodyAll.status === "1"){
          console.log("参数错误");
          this.$Message.error("未选择线体");
          return;
        }
        if(this.lossmappingLinebodyAll.data.length === []) {
          console.log("数据为空");
          return;
        }
        this.chartList = [];
        for(let i = 0; i < this.lossmappingLinebodyAll.data.length; i++) {
            var myChart = echarts.init(document.getElementById(this.lossmappingLinebodyAll.data[i].title));
            this.chartList.push(myChart);
            var option = {
              tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
              },
              series: [{
                width:600,
                type: 'sankey',
                layout: 'none',
                data: this.lossmappingLinebodyAll.data[i].data,
                links: this.lossmappingLinebodyAll.data[i].link,
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
        'lossmappingLinebodyAll'
      ])
    },
    watch: {
      lossmappingLinebodyAll(newVal){
        let _this = this
        setTimeout(function() {
          _this.initCharts();
        }, 800);
      }
    },
    created() {

    },
    mounted() {
      let _this = this
      setTimeout(function() {
        _this.initCharts();
      }, 800);

    }
  }
  </script>
