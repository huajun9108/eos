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
</template>
<script>
import { mapActions, mapState } from "vuex";
import chart from "../components/echarts";
import {GetDateStr} from "../assets/js/tip"
export default {
    components: {
        chart: chart
    },
    props: ['project'],
    data() {
        return {
            statusData: null,
            stageData: null,
            time:GetDateStr(-1)+ " 23:59:59",
            projectData: null,
        };
    },
    computed: {
        ...mapState([
            "projectStatus",
        ]),
    },
    methods: {
       ...mapActions([]),
       clearData(){
         console.log(2);
            this.statusData=null
            this.projectNumber = "无"
            this.beganNumber = "无"
            this.runNumber =  "无"
            this.delayNumber = "无"
            this.followNumber = "无"
            this.closeNumber = "无"
            this.stageData=null
            this.IdentifyProblem ="无"
            this.GraspStatus = "无"
            this.SetGoals =  "无"
            this.AnalysisCause = "无"
            this.CountermeasuresPlan = "无"
            this.Countermeasures = "无"
            this.EffectConfirmation = "无"
            this.ConsolidationResults = "无"
       },
       initChart(){

       }
    },
    watch: {
        projectStatus(newVal){
            console.log(newVal)
            if(newVal.status==="0"){
                if(newVal.data){
                  this.projectData = newVal.data;
                }else{
                    this.clearData()
                }
            }else{
               this.clearData()
            }
        },
        projectData(newVal) {
          if(newVal!=null) {
            this.statusData = this.projectData.status
            this.projectNumber = this.projectData.statusOther.projectNumber
            this.beganNumber = this.projectData.statusOther.beganNumber
            this.runNumber =  this.projectData.statusOther.runNumber
            this.delayNumber = this.projectData.statusOther.delayNumber
            this.followNumber = this.projectData.statusOther.followNumber
            this.closeNumber = this.projectData.statusOther.closeNumber
            this.stageData = this.projectData.stage
            this.IdentifyProblem = this.projectData.stageOther.IdentifyProblem
            this.GraspStatus = this.projectData.stageOther.GraspStatus
            this.SetGoals =  this.projectData.stageOther.SetGoals
            this.AnalysisCause = this.projectData.stageOther.AnalysisCause
            this.CountermeasuresPlan = this.projectData.stageOther.CountermeasuresPlan
            this.Countermeasures = this.projectData.stageOther.Countermeasures
            this.EffectConfirmation = this.projectData.stageOther.EffectConfirmation
            this.ConsolidationResults = this.projectData.stageOther.ConsolidationResults
          } else {
            this.clearData();
          }
        },
        project() {
          this.projectData = null;
        }
    },
    created() {

    },
    mounted() {


    }
};
</script>
<style lang="scss" scoped>

</style>
