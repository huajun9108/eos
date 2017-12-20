<template>
    <div class="overview user_common">
        <div class="overview_content  user_maincontent">
        <div class="showTimeAndArea" @click="showlDialog">
            <span :class="isShow?'iconfont icon-drop-down2 rotate':'iconfont icon-drop-down2'"></span>
            <span class="areaAndShift">时间/区域</span>
        </div>
        <v-timearea v-show="isShow"></v-timearea>
            <span class="overview_title">Performance</span>
            <div class="over_table">
                <table class="table table-hover text-center overview_tableBody">
                    <tbody>
                        <tr>
                            <td class="firstCol" width="5%">OEE</td>
                            <td id="toee" class="secordCol" width="60%">
                                <chart
                                :_id="'oee'"
                                :_titleText="'访问量统计'"
                                :_xText="'类别'"
                                :_yText="'总访问量'"
                                :_chartData="chartData"
                                :_type="'LineAndBar'"
                                :_dataList = "dataList"
                                @recieveData="showData"></chart>
                            </td>
                            <td width="35%" class="text-left item_td">
                                <div class="item_table item_top">
                                    <ul class="item_table_detail">
                                        <li class="item_table_de">
                                            <div class="item_img">
                                                <i class="current_color"></i>
                                            </div>
                                            <span class="item_table_deno">Current</span>
                                            <span class="item_table_devalue">Current</span>
                                        </li>
                                        <li class="item_table_de">
                                            <div class="item_img">
                                                <img src="../assets/images/yellow.png"  />
                                            </div>
                                            <span class="item_table_deno">Target</span>
                                            <span class="item_table_devalue">Target</span>
                                        </li>
                                        <li class="item_table_de">
                                            <div class="item_img">
                                                <img src="../assets/images/red.png"  />
                                            </div>
                                            <span class="item_table_deno">Vision</span>
                                            <span class="item_table_devalue">Ideal</span>
                                        </li>
                                        <li class="item_table_de">
                                            <div class="item_img">
                                                <img src="../assets/images/blue.png"  />
                                            </div>
                                            <span class="item_table_deno">Ideal</span>
                                            <span class="item_table_devalue">Target</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="item_table item_bottom">
                                    <div class="top top_left">
                                        <span class="top_title">Top Focus</span>
                                        <span class="top_title">Performance</span>
                                        <div class="top_detail">
                                            <div class="top_item">
                                                <span class="item_no">Breakdowns</span><span class="item_value">12%</span>
                                            </div> 
                                            <div class="top_item">
                                                <span class="item_no">Short Stops</span><span class="item_value">8%</span>
                                            </div> 
                                            <div class="top_item last_ltem">
                                                <span class="item_no">Speed Loss</span><span class="item_value">12%</span>
                                            </div>  
                                        </div>
                                    </div>
                                    <div class="top">
                                        <span class="top_title">RCA</span>
                                        <span class="top_title">Improvement</span>
                                        <div class="top_detail">
                                            <div class="top_item">
                                                <span class="item_no">Breakdowns</span><span class="item_value">12%</span>
                                            </div> 
                                            <div class="top_item">
                                                <span class="item_no">Short Stops</span><span class="item_value">8%</span>
                                            </div> 
                                            <div class="top_item last_ltem">
                                                <span class="item_no">Speed Loss</span><span class="item_value">12%</span>
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                         <tr>
                            <td class="firstCol" width="10%">Safety</td>
                            <td id="safety" class="secordCol" style="width: 600px;height:220px;" width="60%">
                                <!-- <chart
                                :_id="'testCharts'"
                                :_titleText="'访问量统计'"
                                :_xText="'类别'"
                                :_yText="'总访问量'"
                                :_chartData="chartData"
                                :_type="'Pie'"></chart> -->
                            </td>
                            <td width="30%"></td>
                        </tr>
                         <tr>
                            <td class="firstCol" width="10%">Defect</td>
                            <td id="defect" class="secordCol" style="width: 600px;height:220px;" width="60%"></td>
                            <td width="30%"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>   
</template>
<script>
import timearea from "../components/timeArea"
import chart from '../components/echarts'
export default {
    components: {
        "v-timearea": timearea,
        "chart":chart
    },
   data(){
       return{
        dataList:null,
        isShow:false,
        chartData:[["2013/1/24","10","30","20","10"],["2013/1/25","20","40","22","33"],["2013/1/26","15","22","19","60"],
        ["2013/1/27","22","40","19","20"],["2013/1/28","10","30","20","10"],["2013/1/29","20","40","22","33"],
        ["2013/1/30","15","22","19","60"],["2013/1/31","22","40","19","20"],["2013/2/1","10","30","20","10"],["2013/2/2","20","40","22","33"],
        ["2013/2/3","15","22","19","60"],["2013/2/4","22","40","19","20"],["2013/2/5","10","30","20","10"],["2013/2/6","20","40","22","33"],
        ["2013/2/7","15","22","19","60"],["2013/2/8","22","40","19","20"],["2013/2/9","10","30","20","10"],["2013/2/10","20","40","22","33"],
        ["2013/2/11","15","22","19","60"],["2013/2/12","22","40","19","20"],["2013/2/13","10","30","20","10"],["2013/2/14","20","40","22","33"],
        ["2013/2/15","15","22","19","60"],["2013/2/16","22","40","19","20"],["2013/2/17","10","30","20","10"],["2013/2/18","20","40","22","33"],
        ["2013/2/19","15","22","19","60"],["2013/2/20","22","40","19","20"],["2013/2/21","10","30","20","10"],["2013/2/22","20","40","22","33"],
        ["2013/2/23","15","22","19","60"],["2013/2/24","22","40","19","20"]],
       }
   },
   methods:{
        showlDialog(){
            this.isShow = !this.isShow 
        },
        showData(data){
            console.log(data)
        }
      
   },
   mounted () {
    //    this.initCharts();
   }
}
</script>
<style lang="sass" scoped>
</style>
