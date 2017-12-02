<template>
    <div class="summary_box phase">
        <div class="status_content top">
            <div class="status_echarts">
                <span class="status_pro">项目运行阶段分布&nbsp&nbsp<i class="status_pos">(上)</i></span>
                <div class="charts_status">
                    <chart
                        :_id="'phasetop'"
                        :_titleText="'访问量统计'"
                        :_xText="'类别'"
                        :_yText="'项目阶段的数量'"
                        :_chartData="phaseData1"
                        :_type="'LineOrBar'">
                    </chart>
                    <div class="pro_tip" v-if = "phaseData1==null||phaseData1==''||phaseData1.status!='0'">暂无数据</div>
                </div>
            </div>
            <div class="status_detail">
                <ul class="status_det">
                    <li class="status_li">
                        <span class="status_title">明确问题</span>
                        <input v-model="IdentifyProblem" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">把握现状</span>
                        <input v-model="GraspStatus" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">设定目标</span>
                        <input v-model="SetGoals" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">分析根因</span>
                        <input v-model="AnalysisCause" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">对策计划</span>
                        <input v-model="CountermeasuresPlan" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">对策落实</span>
                        <input v-model="Countermeasures" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">效果确认</span>
                        <input v-model="EffectConfirmation" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">成果巩固</span>
                        <input v-model="ConsolidationResults" class="item_detail" readonly placeholder="无"/>
                    </li>
                </ul>
            </div>
        </div>
        <div class="status_content bottom">
            <div class="status_echarts">
                <span class="status_pro">项目运行阶段分布&nbsp&nbsp<i class="status_pos">(下)</i></span>
                <div class="charts_status">
                    <chart
                        :_id="'phasebottom'"
                        :_titleText="'访问量统计'"
                        :_xText="'类别'"
                        :_yText="'项目阶段的数量'"
                        :_chartData="phaseData2"
                        :_type="'LineOrBar'">
                    </chart>
                    <div class="pro_tip" v-if = "phaseData2==null||phaseData2==''||phaseData2.status!='0'">暂无数据</div>
                </div>
            </div>
            <div class="status_detail">
                <ul class="status_det">
                    <li class="status_li">
                        <span class="status_title">明确问题</span>
                        <input v-model="IdentifyProblem_b" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">把握现状</span>
                        <input v-model="GraspStatus_b" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">设定目标</span>
                        <input v-model="SetGoals_b" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">分析根因</span>
                        <input v-model="AnalysisCause_b" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">对策计划</span>
                        <input v-model="CountermeasuresPlan_b" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">对策落实</span>
                        <input v-model="Countermeasures_b" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">效果确认</span>
                        <input v-model="EffectConfirmation_b" class="item_detail" readonly placeholder="无"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">成果巩固</span>
                        <input v-model="ConsolidationResults_b" class="item_detail" readonly placeholder="无"/>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions,mapState} from "vuex";
    import chart from '../components/echarts'
	export default{
        components: {
            "chart":chart
        },
        data(){
            return{
                phaseData1:null,
                phaseData2:null,
            }
                
        },
		computed:{
			...mapState([
               "projectStatus"
                
			])
		},
        methods:{
            ...mapActions([
                
            ]),

           
           
            
        },
        watch:{
           projectStatus(newVal){
            if(newVal.status==="0"){
                if(newVal.data.type=="start"){
                    sessionStorage.setItem("phaseStart",JSON.stringify(newVal))
                    this.phaseData1 = newVal
                    this.IdentifyProblem = newVal.data.stageOther.IdentifyProblem
                    this.GraspStatus = newVal.data.stageOther.IdentifyProblem
                    this.SetGoals =  newVal.data.stageOther.SetGoals
                    this.AnalysisCause = newVal.data.stageOther.AnalysisCause
                    this.CountermeasuresPlan = newVal.data.stageOther.CountermeasuresPlan
                    this.Countermeasures = newVal.data.stageOther.Countermeasures
                    this.EffectConfirmation = newVal.data.stageOther.EffectConfirmation
                    this.ConsolidationResults = newVal.data.stageOther.ConsolidationResults
                }
                
                if(newVal.data.type=="end"){
                    sessionStorage.setItem("phaseEnd",JSON.stringify(newVal))
                    this.phaseData2 = newVal
                    this.IdentifyProblem_b = newVal.data.stageOther.IdentifyProblem
                    this.GraspStatus_b = newVal.data.stageOther.IdentifyProblem
                    this.SetGoals_b =  newVal.data.stageOther.SetGoals
                    this.AnalysisCause_b = newVal.data.stageOther.AnalysisCause
                    this.CountermeasuresPlan_b = newVal.data.stageOther.CountermeasuresPlan
                    this.Countermeasures_b = newVal.data.stageOther.Countermeasures
                    this.EffectConfirmation_b = newVal.data.stageOther.EffectConfirmation
                    this.ConsolidationResults_b = newVal.data.stageOther.ConsolidationResults
                }
                
            }else{
                if(newVal.type=="start"){
                    this.phaseData1=newVal
                    this.IdentifyProblem ="无"
                    this.GraspStatus = "无"
                    this.SetGoals =  "无"
                    this.AnalysisCause = "无"
                    this.CountermeasuresPlan = "无"
                    this.Countermeasures = "无"
                    this.EffectConfirmation = "无"
                    this.ConsolidationResults = "无"
                }
                if(newVal.type=="end"){
                    this.phaseData2=newVal
                    this.IdentifyProblem_b ="无"
                    this.GraspStatus_b = "无"
                    this.SetGoals_b =  "无"
                    this.AnalysisCause_b = "无"
                    this.CountermeasuresPlan_b = "无"
                    this.Countermeasures_b = "无"
                    this.EffectConfirmation_b = "无"
                    this.ConsolidationResults_b = "无"
                }
            }
            
        }
        },
        created(){
        },
        mounted(){
           if(sessionStorage.getItem("phaseStart")){
                let status = JSON.parse(sessionStorage.getItem("phaseStart"))
                console.log(status)
                this.phaseData1 = status
                this.IdentifyProblem = status.data.stageOther.IdentifyProblem
                this.GraspStatus = status.data.stageOther.IdentifyProblem
                this.SetGoals =  status.data.stageOther.SetGoals
                this.AnalysisCause = status.data.stageOther.AnalysisCause
                this.CountermeasuresPlan = status.data.stageOther.CountermeasuresPlan
                this.Countermeasures = status.data.stageOther.Countermeasures
                this.EffectConfirmation = status.data.stageOther.EffectConfirmation
                this.ConsolidationResults = status.data.stageOther.ConsolidationResults
            }
            if(sessionStorage.getItem("phaseEnd")){
                let status = JSON.parse(sessionStorage.getItem("phaseEnd"))
                console.log(status)
                this.phaseData2 = status
                this.IdentifyProblem_b = status.data.stageOther.IdentifyProblem
                this.GraspStatus_b = status.data.stageOther.IdentifyProblem
                this.SetGoals_b =  status.data.stageOther.SetGoals
                this.AnalysisCause_b = status.data.stageOther.AnalysisCause
                this.CountermeasuresPlan_b = status.data.stageOther.CountermeasuresPlan
                this.Countermeasures_b = status.data.stageOther.Countermeasures
                this.EffectConfirmation_b = status.data.stageOther.EffectConfirmation
                this.ConsolidationResults_b = status.data.stageOther.ConsolidationResults
            }
        }
	}
</script>
<style lang="scss" scoped>
	
</style>

