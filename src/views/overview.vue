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
                            <td class="firstCol" width="10%">OEE</td>
                            <td id="toee" class="secordCol" width="60%">
                                <chart
                                :_id="'oee'"
                                :_titleText="'访问量统计'"
                                :_xText="'类别'"
                                :_yText="'总访问量'"
                                :_chartData="chartData"
                                :_type="'LineAndBar'"></chart>
                            </td>
                            <td width="30%" class="text-left item_td">
                                <div class="item_table item_top">
                                    <div class="item_table_title">
                                        <span class="item_table_no">值</span>
                                        <span class="item_table_value">72</span>
                                    </div>
                                    <ul class="item_table_detail">
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
                                        <span class="top_title">Loss Top 3</span>
                                        <div class="top_detail">
                                            <div class="top_item">
                                                <span class="item_no">1</span><span class="item_value">Lack of demand</span>
                                            </div> 
                                            <div class="top_item">
                                                <span class="item_no">2</span><span class="item_value">Breakdowns</span>
                                            </div> 
                                            <div class="top_item last_ltem">
                                                <span class="item_no">3</span><span class="item_value">First Level Maintenance</span>
                                            </div>  
                                        </div>
                                    </div>
                                    <div class="top">
                                        <span class="top_title">Loss Top 3</span>
                                        <div class="top_detail">
                                            <div class="top_item">
                                                <span class="item_no">1</span><span class="item_value">Lack of demand</span>
                                            </div> 
                                            <div class="top_item">
                                                <span class="item_no">2</span><span class="item_value">Breakdowns</span>
                                            </div> 
                                            <div class="top_item last_ltem">
                                                <span class="item_no">3</span><span class="item_value">First Level Maintenance</span>
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
        isShow:false,
        upColor : '#3670be',
        upBorderColor :'#3670be',
        downColor : '#f3d3a1',
        downBorderColor :'#f3d3a1',
        chartData:[["2013/1/24","10","30","20","10"],["2013/1/25","20","40","22","33"],["2013/1/26","15","22","19","60"]],
        chartDataoee :[
            {
                data0:[
                    ['2013/1/24', 60,30,40,79.5],
                    ['2013/1/25', 22.3,80,40,80],
                    ['2013/1/28', 10,69.5,40,90.6],
                    ['2013/1/29', 20,55.5,40,76.3],
                    ['2013/1/30', 22.5,60,40,70.2],
                    ['2013/1/31', 32.5,55.5,40,80],
                    ['2013/2/1', 70.3,22.2,10.3,30.3],
                    ['2013/2/4', 22.4,59,40,80],
                    ['2013/2/5', 70.3,22.2,10.3,30.3],
                    ['2013/2/6', 22.5,60,40,70.2],
                    ['2013/2/7', 10,69.5,40,90.6],
                    ['2013/2/8', 22.3,80,40,80],
                    ['2013/2/18', 10,69.5,40,90.6],
                    ['2013/2/19', 32.5,55.5,40,80],
                    ['2013/2/20', 10,69.5,40,90.6]
                ],
                vision: [99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],
                target :[80,73.2,65.3,96,77.3,98.3,85.2,85.3,99.3,95.3,85.2,86.3,84.2,94.3,96.3],
                ideal :[99.5,88.3,99.5,88.3,99.5,88.3,99.5,88.3,99.5,99.5,99.5,88.3,99.5,88.3,99.5]
            }
        ]
        

       }
   },
   methods:{
        showlDialog(){
            this.isShow = !this.isShow 
        },
      
   },
   mounted () {
    //    this.initCharts();
   }
}
</script>
<style lang="sass" scoped>
</style>
