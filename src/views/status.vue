<template>
    <div class="summary_box status">
        <div class="status_content top">
            <span class="status_pro">项目状态</span>
            <div class="status_echarts">
                
                <div class="charts_status">
                    <chart
                        :_id="'statustop'"
                        :_titleText="'访问量统计'"
                        :_xText="'类别'"
                        :_yText="'项目阶段的数量'"
                        :_chartData="statusData"
                        :_type="'Bar'">
                    </chart>
                    <div class="pro_tip" v-if = "statusData==null||statusData==''">暂无数据</div>
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
        <div class="status_content">
            <span class="status_pro">运行阶段</span>
            <div class="status_echarts">
                <div class="charts_status">
                    <chart
                        :_id="'phasetop'"
                        :_titleText="'访问量统计'"
                        :_xText="'类别'"
                        :_yText="'项目阶段的数量'"
                        :_chartData="stageData"
                        :_type="'LineOrBar'">
                    </chart>
                    <div class="pro_tip" v-if = "stageData==null||stageData==''">暂无数据</div>
                </div>
            </div>
            <div class="status_detail">
                <ul class="status_det">
                    <li class="status_li">
                        <span class="status_title">明确问题</span>
                        <input v-model="IdentifyProblem" class="item_detail stage" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">把握现状</span>
                        <input v-model="GraspStatus" class="item_detail stage" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">设定目标</span>
                        <input v-model="SetGoals" class="item_detail stage" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">分析根因</span>
                        <input v-model="AnalysisCause" class="item_detail stage" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">对策计划</span>
                        <input v-model="CountermeasuresPlan" class="item_detail stage" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">对策落实</span>
                        <input v-model="Countermeasures" class="item_detail stage" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">效果确认</span>
                        <input v-model="EffectConfirmation" class="item_detail stage" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">成果巩固</span>
                        <input v-model="ConsolidationResults" class="item_detail stage" readonly placeholder="无"/>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    </div> 
</template>
<script>
import { mapActions, mapState } from "vuex";
import chart from "../components/echarts";
import {GetDateStr} from "../assets/js/tip"
export default {
    components: {
        chart: chart
    },
    data() {
        return {
            statusData: null,
            stageData: null,
            time:GetDateStr(-1)+ " 23:59:59"
        };
    },
    computed: {
        ...mapState(["projectStatus"])
    },
    methods: {
       ...mapActions(["selectProjectStateByTimeAndLinebodyIds"]),
    },
    watch: {
        projectStatus(newVal){
           
            if(newVal.status==="0"){
                if(newVal.data){
                    sessionStorage.setItem("projectStatus",JSON.stringify(newVal))
                    console.log(sessionStorage.getItem("projectStatus"));
                    this.statusData = newVal.data.status
                    this.projectNumber = newVal.data.statusOther.projectNumber
                    this.beganNumber = newVal.data.statusOther.beganNumber
                    this.runNumber =  newVal.data.statusOther.runNumber
                    this.delayNumber = newVal.data.statusOther.delayNumber
                    this.followNumber = newVal.data.statusOther.followNumber
                    this.closeNumber = newVal.data.statusOther.closeNumber
                    this.stageData = newVal.data.stage
                    this.IdentifyProblem = newVal.data.stageOther.IdentifyProblem
                    this.GraspStatus = newVal.data.stageOther.GraspStatus
                    this.SetGoals =  newVal.data.stageOther.SetGoals
                    this.AnalysisCause = newVal.data.stageOther.AnalysisCause
                    this.CountermeasuresPlan = newVal.data.stageOther.CountermeasuresPlan
                    this.Countermeasures = newVal.data.stageOther.Countermeasures
                    this.EffectConfirmation = newVal.data.stageOther.EffectConfirmation
                    this.ConsolidationResults = newVal.data.stageOther.ConsolidationResults
                }else{
                    sessionStorage.setItem("projectStatusEmpty",JSON.stringify(newVal))
                }
            }else{
                this.statusData=null
                this.projectNumber = "无"
                this.beganNumber = "无"
                this.runNumber =  "无"
                this.delayNumber = "无"
                this.followNumber = "无"
                this.closeNumber = "无"
                this.stageData=null
                this.projectNumber_b = "无"
                this.beganNumber_b = "无"
                this.runNumber_b =  "无"
                this.delayNumber_b = "无"
                this.followNumber_b = "无"
                this.closeNumber_b = "无"
            }
            
        }

    },
    created() {
       
    },
    mounted() {
        // let _this = this
        
        console.log(this.time)
        // if(sessionStorage.getItem("projectStatus")){
        //     let projectStatus = JSON.parse(sessionStorage.getItem("projectStatus"))
        //     console.log(status)
        //     this.statusData = projectStatus.data.status
        //     this.projectNumber = projectStatus.data.statusOther.projectNumber
        //     this.beganNumber = projectStatus.data.statusOther.beganNumber
        //     this.runNumber =  projectStatus.data.statusOther.runNumber
        //     this.delayNumber = projectStatus.data.statusOther.delayNumber
        //     this.followNumber = projectStatus.data.statusOther.followNumber
        //     this.closeNumber = projectStatus.data.statusOther.closeNumber
        //     this.stageData = projectStatus.data.stage
        //     this.IdentifyProblem = projectStatus.data.stageOther.IdentifyProblem
        //     this.GraspStatus = projectStatus.data.stageOther.GraspStatus
        //     this.SetGoals =  projectStatus.data.stageOther.SetGoals
        //     this.AnalysisCause = projectStatus.data.stageOther.AnalysisCause
        //     this.CountermeasuresPlan = projectStatus.data.stageOther.CountermeasuresPlan
        //     this.Countermeasures = projectStatus.data.stageOther.Countermeasures
        //     this.EffectConfirmation = projectStatus.data.stageOther.EffectConfirmation
        //     this.ConsolidationResults = projectStatus.data.stageOther.ConsolidationResults
        // }else if(sessionStorage.getItem("projectStatusEmpty")){
            
        // }else{
            this.selectProjectStateByTimeAndLinebodyIds({
                linebodyIds: "58,59,60,61,62,65,66",
                time: "2017-11-29T10:56:27.000Z",
            })
        // }
        
       
    }
};
</script>
<style lang="scss" scoped>

</style>

