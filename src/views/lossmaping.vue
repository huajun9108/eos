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
            <tr v-for="(title,idx) in this.lossmappingLinebodyAll" :key="idx">
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
        testList: [],
      }

    },
    methods: {
      ...mapActions([
        'selectLossmappingLinebody'
      ]),
      showlDialog(data){
        this.isShow = !this.isShow
      },
      initCharts: function() {
        for(let i = 0; i < this.lossmappingLinebodyAll.length; i++) {
          console.log(this.lossmappingLinebodyAll.title);
            var myChart = echarts.init(document.getElementById(this.lossmappingLinebodyAll[i].title));
            var option = {
              tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
              },
              series: [{
                width:600,
                type: 'sankey',
                layout: 'none',
                data: this.lossmappingLinebodyAll[i].data,
                links: this.lossmappingLinebodyAll[i].link,
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
      // lossmappingLinebodyAll(newVal){
      //   this.lossmappingLinebodyAll.forEach(
      //   item => {
      //     this.testList.push(item);
      //     console.log(item)
      //   }
      // );
      // }
    },
    created() {

    },
    mounted() {
      this.selectLossmappingLinebody()
      let _this = this
      setTimeout(function() {
        _this.initCharts();
      }, 800);

    }
  }
  </script>
