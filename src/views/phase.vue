<template>
    <div class="summary_box phase">
        <div class="status_content top">
            <div class="status_echarts">
                <span class="status_pro">项目运行阶段分布&nbsp&nbsp<i class="status_pos">(上)</i></span>
                <div class="charts_status top">
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
                        <input class="item_detail" readonly placeholder="45"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">把握现状</span>
                        <input class="item_detail" readonly placeholder="6"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">设定目标</span>
                        <input class="item_detail" readonly placeholder="12"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">分析根因</span>
                        <input class="item_detail" readonly placeholder="2"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">对策计划</span>
                        <input class="item_detail" readonly placeholder="24"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">对策落实</span>
                        <input class="item_detail" readonly placeholder="12"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">效果确认</span>
                        <input class="item_detail" readonly placeholder="12"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">成果巩固</span>
                        <input class="item_detail" readonly placeholder="12"/>
                    </li>
                </ul>
            </div>
        </div>
        <div class="status_content bottom">
            <div class="status_echarts">
                <span class="status_pro">项目运行阶段分布&nbsp&nbsp<i class="status_pos">(下)</i></span>
                <div class="charts_status bottom">
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
                        <input class="item_detail" readonly placeholder="45"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">把握现状</span>
                        <input class="item_detail" readonly placeholder="6"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">设定目标</span>
                        <input class="item_detail" readonly placeholder="12"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">分析根因</span>
                        <input class="item_detail" readonly placeholder="2"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">对策计划</span>
                        <input class="item_detail" readonly placeholder="24"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">对策落实</span>
                        <input class="item_detail" readonly placeholder="12"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">效果确认</span>
                        <input class="item_detail" readonly placeholder="12"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">成果巩固</span>
                        <input class="item_detail" readonly placeholder="12"/>
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
                    this.phaseData1 = newVal
                    this.projectNumber = newVal.data.statusOther.projectNumber
                    this.beganNumber = newVal.data.statusOther.beganNumber
                    this.runNumber =  newVal.data.statusOther.runNumber
                    this.delayNumber = newVal.data.statusOther.delayNumber
                    this.followNumber = newVal.data.statusOther.followNumber
                    this.closeNumber = newVal.data.statusOther.closeNumber
                }
                
                if(newVal.data.type=="end"){
                    this.phaseData2 = newVal
                    this.projectNumber_b = newVal.data.statusOther.projectNumber
                    this.beganNumber_b = newVal.data.statusOther.beganNumber
                    this.runNumber_b =  newVal.data.statusOther.runNumber
                    this.delayNumber_b = newVal.data.statusOther.delayNumber
                    this.followNumber_b = newVal.data.statusOther.followNumber
                    this.closeNumber_b = newVal.data.statusOther.closeNumber
                }
                
            }else{
                if(newVal.type=="start"){
                    this.phaseData1=newVal
                    this.projectNumber = "无"
                    this.beganNumber = "无"
                    this.runNumber =  "无"
                    this.delayNumber = "无"
                    this.followNumber = "无"
                    this.closeNumber = "无"
                }
                if(newVal.type=="end"){
                    this.phaseData2=newVal
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
        created(){
        },
        mounted(){
           
        }
	}
</script>
<style lang="scss" scoped>
	
</style>

