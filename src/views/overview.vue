<template>
    <div class="overview user_common">
        <div class="overview_content  user_maincontent">
        <div class="showTimeAndArea" @click="showlDialog">
            <span :class="isShow?'iconfont icon-drop-down2 rotate':'iconfont icon-drop-down2'"></span>
            <span class="areaAndShift">时间/区域</span>
        </div>
        <v-timearea v-show="isShow" @clear="clearCharts"></v-timearea>
            <span class="overview_title">Performance</span>
            <div class="over_table">
                <table class="table table-hover text-center overview_tableBody">
                    <tbody>
                        <tr v-for="(item,index) in dataList" :key = "index">
                            <td class="firstCol" width="10%">{{item.name}}</td>
                            <td id="toee" class="secordCol" width="55%">
                                <chart
                                :_id="item.name"
                                :_titleText="'访问量统计'"
                                :_xText="'类别'"
                                :_yText="'总访问量'"
                                :_chartData="item.data"
                                :_type="item.type"
                                @recieveData="showData"></chart>
                                <Spin fix  class="demo-spin-col" v-if="spinShow">
                                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                    <div>Loading</div>
                                </Spin>
                            </td>
                            <td width="35%" class="text-left item_td">
                                <div class="item_table item_top">
                                    <ul class="item_table_detail">
                                        <li class="item_table_de">
                                            <div class="item_img">
                                                <i class="current_color"></i>
                                            </div>
                                            <span class="item_table_deno">Current</span>
                                            <span class="item_table_devalue">{{item.datasList[0]}}</span>
                                        </li>
                                        <li class="item_table_de">
                                            <div class="item_img">
                                                <img src="../assets/images/yellow.png"  />
                                            </div>
                                            <span class="item_table_deno">Target</span>
                                            <span class="item_table_devalue">{{item.datasList[1]}}</span>
                                        </li>
                                        <li class="item_table_de">
                                            <div class="item_img">
                                                <img src="../assets/images/red.png"  />
                                            </div>
                                            <span class="item_table_deno">Vision</span>
                                            <span class="item_table_devalue">{{item.datasList[2]}}</span>
                                        </li>
                                        <li class="item_table_de">
                                            <div class="item_img">
                                                <img src="../assets/images/blue.png"  />
                                            </div>
                                            <span class="item_table_deno">Ideal</span>
                                            <span class="item_table_devalue">{{item.datasList[3]}}</span>
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
                        <!-- <tr>
                            <td class="firstCol" width="10%">Safety</td>
                            <td id="safety" class="secordCol" style="width: 600px;height:220px;" width="60%">
                               
                            </td>
                            <td width="30%"></td>
                        </tr>
                         <tr>
                            <td class="firstCol" width="10%">Defect</td>
                            <td id="defect" class="secordCol" style="width: 600px;height:220px;" width="60%"></td>
                            <td width="30%"></td>
                        </tr> -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>   
</template>
<script>
import timearea from "../components/timeArea"
import chart from '../components/echarts'
import {mapState,mapActions} from "vuex";
export default {
    components: {
        "v-timearea": timearea,
        "chart":chart
    },
   data(){
       return{
        data:null,
        isShow:false,
        spinShow: true,
        dataList:[
            {
                name:"OEE",
                data:null,
                // [
                //         ["2013/1/24","10","30","20","10"],["2013/1/25","20","40","22","33"],["2013/1/26","15","22","19","60"],
                //         ["2013/1/27","22","40","19","20"],["2013/1/28","10","30","20","10"],["2013/1/29","20","40","22","33"],
                //         ["2013/1/30","15","22","19","60"],["2013/1/31","22","40","19","20"],["2013/2/1","10","30","20","10"],["2013/2/2","20","40","22","33"],
                //         ["2013/2/3","15","22","19","60"],["2013/2/4","22","40","19","20"],["2013/2/5","10","30","20","10"],["2013/2/6","20","40","22","33"],
                //         ["2013/2/7","15","22","19","60"],["2013/2/8","22","40","19","20"],["2013/2/9","10","30","20","10"],["2013/2/10","20","40","22","33"],
                //         ["2013/2/11","15","22","19","60"],["2013/2/12","22","40","19","20"],["2013/2/13","10","30","20","10"],["2013/2/14","20","40","22","33"],
                //         ["2013/2/15","15","22","19","60"],["2013/2/16","22","40","19","20"],["2013/2/17","10","30","20","10"],["2013/2/18","20","40","22","33"],
                //         ["2013/2/19","15","22","19","60"],["2013/2/20","22","40","19","20"],["2013/2/21","10","30","20","10"],["2013/2/22","20","40","22","33"],
                //         ["2013/2/23","15","22","19","60"],["2013/2/24","22","40","19","20"]
                //     ],
                type:"LineAndBar",
                datasList:["22","40","19","11"]



        }
        // ,
        // {
        //     name:"Safety",
        //     data:[
        //             ["2013/1/24","10","30","20","10"],["2013/1/25","20","40","22","33"],["2013/1/26","15","22","19","60"],
        //             ["2013/1/27","22","40","19","20"],["2013/1/28","10","30","20","10"],["2013/1/29","20","40","22","33"],
        //             ["2013/1/30","15","22","19","60"],["2013/1/31","22","40","19","20"],["2013/2/1","10","30","20","10"],["2013/2/2","20","40","22","33"],
        //             ["2013/2/3","15","22","19","60"],["2013/2/4","22","40","19","20"],["2013/2/5","10","30","20","10"],["2013/2/6","20","40","22","33"],
        //             ["2013/2/7","15","22","19","60"],["2013/2/8","22","40","19","20"],["2013/2/9","10","30","20","10"],["2013/2/10","20","40","22","33"],
        //             ["2013/2/11","15","22","19","60"],["2013/2/12","22","40","19","20"],["2013/2/13","10","30","20","10"],["2013/2/14","20","40","22","33"],
        //             ["2013/2/15","15","22","19","60"],["2013/2/16","22","40","19","20"],["2013/2/17","10","30","20","10"],["2013/2/18","20","40","22","33"],
        //             ["2013/2/19","15","22","19","60"],["2013/2/20","22","40","19","20"],["2013/2/21","10","30","20","10"],["2013/2/22","20","40","22","33"],
        //             ["2013/2/23","15","22","19","60"],["2013/2/24","22","40","19","20"]
        //         ],
        //     type:"LineAndBar",
        //     datasList:["22","40","19","22"]
        // },{
        //     name:"Defect",
        //     data:[
        //             ["2013/1/24","10","30","20","10"],["2013/1/25","20","40","22","33"],["2013/1/26","15","22","19","60"],
        //             ["2013/1/27","22","40","19","20"],["2013/1/28","10","30","20","10"],["2013/1/29","20","40","22","33"],
        //             ["2013/1/30","15","22","19","60"],["2013/1/31","22","40","19","20"],["2013/2/1","10","30","20","10"],["2013/2/2","20","40","22","33"],
        //             ["2013/2/3","15","22","19","60"],["2013/2/4","22","40","19","20"],["2013/2/5","10","30","20","10"],["2013/2/6","20","40","22","33"],
        //             ["2013/2/7","15","22","19","60"],["2013/2/8","22","40","19","20"],["2013/2/9","10","30","20","10"],["2013/2/10","20","40","22","33"],
        //             ["2013/2/11","15","22","19","60"],["2013/2/12","22","40","19","20"],["2013/2/13","10","30","20","10"],["2013/2/14","20","40","22","33"],
        //             ["2013/2/15","15","22","19","60"],["2013/2/16","22","40","19","20"],["2013/2/17","10","30","20","10"],["2013/2/18","20","40","22","33"],
        //             ["2013/2/19","15","22","19","60"],["2013/2/20","22","40","19","20"],["2013/2/21","10","30","20","10"],["2013/2/22","20","40","22","33"],
        //             ["2013/2/23","15","22","19","60"],["2013/2/24","22","40","19","20"]
        //         ],
        //     type:"LineAndBar",
        //     datasList:["22","40","19","30"]
        // }
        ],
       
       }
   },
   methods:{
        showlDialog(){
            this.isShow = !this.isShow 
        },
        showData(data){
            this.data = data.split(",")
            console.log(this.data)
        },  
        clearCharts() {
            this.dataList[0].data = [];
        },
        overviewData(){
            this.spinShow = true;
            
        }
        
   },
   computed: {
        ...mapState(["selectOverviewByTimesAndLinebodys"])
   },
   watch:{
        data:{
            handler:function(val, oldVal){
                if(val[val.length-1]=="OEE"){
                    this.dataList[0].datasList = val
                }
            console.log(this.dataList[0].datasList)
            },
            deep:true
        },
        selectOverviewByTimesAndLinebodys(newVal){
            this.spinShow = false;
            this.dataList[0].data = newVal
        }
   },
   mounted () {
    //    this.initCharts();
   }
}
</script>
<style lang="scss" scoped>
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
.demo-spin-col{
    // height: 100px;
    position: relative;
    // border: 1px solid #eee;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
</style>
