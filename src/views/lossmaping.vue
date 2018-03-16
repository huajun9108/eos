  <template>
  <div class="lossmapping user_common">
    <div class="lossmappingContainer user_maincontent">
      <div class="showTimeAndArea" @click="showlDialog">
            <span :class="isShow?'iconfont icon-drop-down2 rotate':'iconfont icon-drop-down2'"></span>
            <span class="areaAndShift">时间/区域</span>
        </div>
        <v-timearea v-show="isShow" @clear="clearChartsData"></v-timearea>
      <div class="titleContainer">
        <span class="titleContent">Loss</span>
      </div>
      <div class="tableContainer">
        <table class="tableBody">
          <tbody>
            <tr v-if = "this.lossmappingDataList.data==null||this.lossmappingDataList.data==''">
              <td class="emptydata">暂无数据</td>
            </tr>
            <tr  v-else v-for="(title,idx) in this.lossmappingDataList.data" :key="idx">
              <td class="firstCol">{{ title.title }}</td>
              <td :id='title.title' class="secordCol" :style="{ width: sankeyWidth + 'px', height: sankeyHeight + 'px' }" v-if="title.data.length > 0">
              </td>
              <td v-else>暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </template>
  <script>
  import {mapState,mapActions} from "vuex";
  import echarts from "echarts";
  import timearea from "../components/timeArea";

  export default {
    components: {
      "v-timearea": timearea
    },
    data(){
      return{
        isShow:false,
        chartList:[],
        lossmappingDataList: [],
        sankeyWidth: 600,
        sankeyHeight: 600,
      }
    },
    methods:{
      clearChartsData(){
        this.lossmappingDataList=[];
      },
      showlDialog(){
        this.isShow = !this.isShow
      },
      initCharts(){
        for(let i=0; i<this.chartList.length; i++) {
          if (this.chartList[i] != null && this.chartList[i] != "" && this.chartList[i] != undefined){
            this.chartList[i].dispose();
          }
        }
        if(this.lossmappingDataList.status === "1"){
          return;
        }
        if(!Array.isArray(this.lossmappingDataList.data)){
          return;
        }
        this.chartList = [];
        for(let i = 0; i < this.lossmappingDataList.data.length; i++) {
            if(this.lossmappingDataList.data[i].data.length <= 0 || this.lossmappingDataList.data[i].link.length <= 0) {
              continue;
            }

            var myChart = echarts.init(document.getElementById(this.lossmappingDataList.data[i].title));
            this.chartList.push(myChart);
            var option = {
              tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
              },
              series: [{
                width: 600,
                type: 'sankey',
                layout: 'none',
                data: this.lossmappingDataList.data[i].data,
                links: this.lossmappingDataList.data[i].link,
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
            let len = this.lossmappingDataList.data[i].link.length;
            let canvasHeight = len > 60 ? (len * 20) : 600;
            this.sankeyHeight = canvasHeight + 100;
            myChart.resize({height: canvasHeight});
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
        this.lossmappingDataList = newVal;
        let _this = this


        setTimeout(function() {
          _this.initCharts();
        }, 800);
      }
    },
    created() {

    },
    mounted() {
    }
  }
  </script>
<style lang="scss" scoped>

</style>
