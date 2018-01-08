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
                    <tbody class="over_body">
                        <tr v-for="(item,index) in dataList" :key = "index">
                            <td class="firstCol" width="10%">{{item.title}}</td>
                            <td :id="item.order" class="secordCol" width="55%">
                                <chart
                                :_id="item.title"
                                :_titleText="'访问量统计'"
                                :_xText="'类别'"
                                :_yText="'总访问量'"
                                :_chartData="item.data"
                                :_type="'LineAndBar'"
                                :_index="index"
                                @recieveData="showData"></chart>
                                <div class="data_tip" v-if = "item.data==null||item.data==''">暂无数据</div>
                            </td>
                            <td width="35%" class="text-left item_td">
                                <div class="item_table item_top">
                                    <ul class="item_table_detail">
                                        <!-- <li class="item_table_de" v-for="(item,index) in item.dataDetail" :key="index">
                                            <div class="item_img">
                                                <img src="../assets/images/current.png"  />
                                            </div>
                                            <span class="item_table_deno">{{item.name}}</span>
                                            <span class="item_table_devalue">{{item.value}}</span>
                                        </li> -->
                                        <li class="item_table_empty"  v-if="item.value==null||item.value==undefined||item.value==''">
                                            <span class="item_table_emptyData">暂无数据</span>
                                        </li>
                                        <li class="item_table_de" v-if="item.value">
                                            <div class="item_img">
                                                <img src="../assets/images/current.png"  />
                                            </div>
                                            <span class="item_table_deno">Current</span>
                                            <span class="item_table_devalue">{{item.value?item.value[0]:"无"}}</span>
                                        </li>
                                        <li class="item_table_de" v-if="item.value">
                                            <div class="item_img">
                                                <img src="../assets/images/target.png"  />
                                            </div>
                                            <span class="item_table_deno">Target</span>
                                            <span class="item_table_devalue">{{item.value?item.value[1]:"无"}}</span>
                                        </li>
                                        <li class="item_table_de" v-if="item.value">
                                            <div class="item_img">
                                                <img src="../assets/images/vision.png"  />
                                            </div>
                                            <span class="item_table_deno">Vision</span>
                                            <span class="item_table_devalue">{{item.value?item.value[2]:"无"}}</span>
                                        </li>
                                        <li class="item_table_de" v-if="item.value">
                                            <div class="item_img">
                                                <img src="../assets/images/ideal.png"  />
                                            </div>
                                            <span class="item_table_deno">Ideal</span>
                                            <span class="item_table_devalue">{{item.value?item.value[3]:"无"}}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="item_table item_bottom">
                                    <div class="top top_left">
                                        <div class="top_head">Top3 Loss</div>
                                        <div class="top_title">
                                            <span class="title_detail">名称</span>
                                            <span class="title_detail">值</span>
                                        </div>
                                        <div class="top_detail" >
                                            <div class="top_item" v-for = "(item,index) in item.losstier3" :key="index">
                                                <span class="item_no">{{item.name}}</span><span class="item_value">{{item.value}}</span>
                                                <span class="item_no" v-if="item==null||item==undefined||item==''">无</span>
                                            </div> 
                                            <div class="top_empty" v-if="item.losstier3==null||item.losstier3==undefined||item.losstier3==''">
                                                <span class="item_empty">暂无数据</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="top">
                                        <div class="top_head">Top3 Project</div>
                                        <div class="top_title">
                                            <span class="title_detail">名称</span>
                                            <span class="title_detail">预期每月收益</span>
                                        </div>
                                        <div class="top_detail">
                                            <!-- <div class="top_item">
                                                <span class="item_no_project" title="总拼线Dimension out of Spec2018-01-05">总拼线Dimension out of Spec2018-01-05</span>
                                                <span class="item_value">12%</span>
                                            </div> 
                                            <div class="top_item">
                                                <span class="item_no_project">Short Stops</span><span class="item_value">8%</span>
                                            </div> 
                                            <div class="top_item last_ltem">
                                                <span class="item_no_project">Speed Loss</span><span class="item_value">12%</span>
                                            </div>   -->
                                            <div class="top_item" v-for = "(item,index) in item.impprojectTop" :key="index">
                                                <span class="item_no_project" :title="item.name">{{item.name}}</span><span class="item_value">{{item.value}}</span>
                                                <span class="item_no" v-if="item==null||item==undefined||item==''">无</span>
                                            </div> 
                                            <div class="top_empty" v-if="item.impprojectTop==null||item.impprojectTop==undefined||item.impprojectTop==''">
                                                <span class="item_empty">暂无数据</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="emptytd" v-if = "this.dataList==null||this.dataList==''">
                            <td class="emptydata">暂无数据</td>
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
        dataList:null,
       
       }
   },
   methods:{
        showlDialog(){
            this.isShow = !this.isShow 
        },
        showData(data){
            console.log(data.split)
            if(isNaN(data.split(",")[0])) return;
            this.dataList[0].dataDetail= data.split(",")
            console.log(data)
        },  
        clearCharts() {
            // this.dataList[0].data = null;
            // this.dataList[0].dataDetail=null;
            // this.dataList[0].topLoss =null
            // this.dataList[0].topProject =null
            this.dataList=null
        },  
    },
    computed: {
        ...mapState(["selectOverviewByTimesAndLinebodys"])
    },
    watch:{
        data:{
            handler:function(val, oldVal){
                if(val[val.length-1]=="OEE"){
                    this.dataList[0].dataDetail = val
                }
            console.log(this.dataList[0].dataDetail)
            },
            deep:true
        },
        selectOverviewByTimesAndLinebodys(newVal){
            if(newVal.status=="0"){
                this.dataList=newVal.data
            }
            console.log(newVal)
            
            // this.dataList[0].dataDetail = newVal.value
            // this.dataList[0].topLoss =newVal.losstier3
            // this.dataList[0].topProject=newVal.impprojectTop
        }
    },
    mounted () {
    }
}
</script>
