<template>
    <div class="summary_box phase">
        <div class="status_content top">
            <div class="status_echarts">
                <span class="status_pro">项目运行阶段分布&nbsp&nbsp<i class="status_pos">(上)</i></span>
                <div id="phaseCharts_top" ref="phase">
                    <!-- <chart
                        :_id="'phasetop'"
                        :_titleText="'访问量统计'"
                        :_xText="'类别'"
                        :_yText="'项目阶段的数量'"
                        :_chartData="chartData"
                        :_type="'LineOrBar'">
                    </chart> -->
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
                <div id="phaseCharts_bottom">
                    <!-- <chart
                        :_id="'phasebottom'"
                        :_titleText="'访问量统计'"
                        :_xText="'类别'"
                        :_yText="'项目阶段的数量'"
                        :_chartData="chartData1"
                        :_type="'LineOrBar'">
                    </chart> -->
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
                flag:true,
                chartData:[["明确问题",10],
                ["把握现状",20],["设定目标",10],
                ["分析根因",20],["对策计划",10],
                ["对策落实",20],["效果确认",10],["成果巩固",20]],
                chartData1:[["明确问题",10],
                ["把握现状",20],["设定目标",10],
                ["分析根因",20],["对策计划",10],
                ["对策落实",20],["效果确认",10],["成果巩固",20]],
                isShow:false,
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
                if(newVal.data){
                    if(newVal.data.type=="end")
                    this.statusData1 = newVal.data.status
                    this.projectNumber = newVal.data.statusOther.projectNumber
                    this.beganNumber = newVal.data.statusOther.beganNumber
                    this.runNumber =  newVal.data.statusOther.runNumber
                    this.delayNumber = newVal.data.statusOther.delayNumber
                    this.followNumber = newVal.data.statusOther.followNumber
                    this.closeNumber = newVal.data.statusOther.closeNumber
                }else{
                    this.statusData1=''
                    this.statusData2=''
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

