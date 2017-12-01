<template>
    <div class="summary_box status">
        <div class="status_content top">
            <div class="status_echarts">
                <span class="status_pro">项目状态分布&nbsp&nbsp<i class="status_pos">(上)</i></span>
                <div class="charts_status">
                    <chart
                        :_id="'statustop'"
                        :_titleText="'访问量统计'"
                        :_xText="'类别'"
                        :_yText="'项目阶段的数量'"
                        :_chartData="statusData1"
                        :_type="'Bar'">
                    </chart>
                    <div class="pro_tip" v-if = "statusData1==null||statusData1==''||statusData1.status!='0'">暂无数据</div>
                </div>
            </div>
            <div class="status_detail">
                <ul class="status_det">
                    <li class="status_li">
                        <span class="status_title">项目池中的项目数量</span>
                        <input v-model="projectNumber" class="item_detail" readonly placeholder="无" />
                    </li>
                    <li class="status_li">
                        <span class="status_title">准备启动的项目数量</span>
                        <input v-model="beganNumber" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">实施运行的项目数量</span>
                        <input v-model="runNumber" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">实施延迟的项目数量</span>
                        <input v-model="delayNumber" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">成果跟踪的项目数量</span>
                        <input v-model="followNumber" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">当年度关闭项目数量</span>
                        <input v-model="closeNumber" class="item_detail" readonly placeholder="无"/>
                    </li>
                </ul>
            </div>
        </div>
        <div class="status_content bottom">
            <div class="status_echarts">
                <span class="status_pro">项目状态分布&nbsp&nbsp<i class="status_pos">(下)</i></span>
                <div class="charts_status">
                    <chart
                        :_id="'statusbottom'"
                        :_titleText="'访问量统计'"
                        :_xText="'类别'"
                        :_yText="'项目阶段的数量'"
                        :_chartData="statusData2"
                        :_type="'Bar'">
                    </chart>
                    <div class="pro_tip" v-if = "statusData2==''||statusData2==null||statusData2.status!='0'">暂无数据</div>
                </div>
            </div>
            <div class="status_detail">
                <ul class="status_det">
                    <li class="status_li">
                        <span class="status_title">项目池中的项目数量</span>
                        <input v-model="projectNumber_b" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">准备启动的项目数量</span>
                        <input v-model="beganNumber_b" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">实施运行的项目数量</span>
                        <input v-model="runNumber_b" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">实施延迟的项目数量</span>
                        <input v-model="delayNumber_b" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">成果跟踪的项目数量</span>
                        <input v-model="followNumber_b" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">当年度关闭项目数量</span>
                        <input v-model="closeNumber_b" class="item_detail" readonly placeholder="无"/>
                    </li>
                </ul>
            </div>
        </div>
    </div> 
</template>
<script>
import { mapActions, mapState } from "vuex";
import chart from "../components/echarts";
export default {
  components: {
    chart: chart
  },
  data() {
        return {
            statusData1: null,
            statusData2: null
        };
    },
    computed: {
        ...mapState(["projectStatus"])
    },
    methods: {
       
    },
    watch: {
        projectStatus(newVal){
           
            if(newVal.status==="0"){
                if(newVal.data.type=="start"){
                    sessionStorage.setItem("statusStart",JSON.stringify(newVal))
                    console.log(sessionStorage.getItem("statusStart"));
                    this.statusData1 = newVal
                    this.projectNumber = newVal.data.statusOther.projectNumber
                    this.beganNumber = newVal.data.statusOther.beganNumber
                    this.runNumber =  newVal.data.statusOther.runNumber
                    this.delayNumber = newVal.data.statusOther.delayNumber
                    this.followNumber = newVal.data.statusOther.followNumber
                    this.closeNumber = newVal.data.statusOther.closeNumber
                }
                
                if(newVal.data.type=="end"){
                    this.statusData2 = newVal
                    this.projectNumber_b = newVal.data.statusOther.projectNumber
                    this.beganNumber_b = newVal.data.statusOther.beganNumber
                    this.runNumber_b =  newVal.data.statusOther.runNumber
                    this.delayNumber_b = newVal.data.statusOther.delayNumber
                    this.followNumber_b = newVal.data.statusOther.followNumber
                    this.closeNumber_b = newVal.data.statusOther.closeNumber
                }
                
            }else{
                if(newVal.type=="start"){
                    this.statusData1=newVal
                    this.projectNumber = "无"
                    this.beganNumber = "无"
                    this.runNumber =  "无"
                    this.delayNumber = "无"
                    this.followNumber = "无"
                    this.closeNumber = "无"
                }
                if(newVal.type=="end"){
                    this.statusData2=newVal
                    this.projectNumber_b = "无"
                    this.beganNumber_b = "无"
                    this.runNumber_b =  "无"
                    this.delayNumber_b = "无"
                    this.followNumber_b = "无"
                    this.closeNumber_b = "无"
                }
            }
            
        }
    },
    created() {
       
    },
    mounted() {
        if(sessionStorage.getItem("statusStart")){
            let status = JSON.parse(sessionStorage.getItem("statusStart"))
            // let a = JSON.stringify(tatus)
            console.log(status)
            this.statusData1 = status
            this.projectNumber = status.data.statusOther.projectNumber
            this.beganNumber = status.data.statusOther.beganNumber
            this.runNumber =  status.data.statusOther.runNumber
            this.delayNumber = status.data.statusOther.delayNumber
            this.followNumber = status.data.statusOther.followNumber
            this.closeNumber = status.data.statusOther.closeNumber
        }
        
    }
};
</script>
<style lang="scss" scoped>

</style>

