<template>
    <div class="summary user_common ">
        <div class="summary_content  user_maincontent">
            <div class="summary_top">
                <span :class="flag?'summary_title active':'summary_title'" @click="flag=true">项目状态</span>
                <span :class="flag?'summary_title':'summary_title active'" @click="flag=false">运行阶段</span>
            </div>
            <div class="summary_box status" v-show = "flag">
                <div class="status_content top">
                    <div class="status_echarts">
                        <span class="status_pro">项目状态分布&nbsp&nbsp<i class="status_pos">(上)</i></span>
                        <div id="charts_status_top">

                        </div>
                    </div>
                    <div class="status_detail">
                        <ul class="status_det">
                            <li class="status_li">
                                <span class="status_title">项目池中的项目数量</span>
                                <input class="item_detail" readonly placeholder="45"/>
                            </li>
                            <li class="status_li">
                                <span class="status_title">准备启动的项目数量</span>
                                <input class="item_detail" readonly placeholder="6"/>
                            </li>
                            <li class="status_li">
                                <span class="status_title">实施运行的项目数量</span>
                                <input class="item_detail" readonly placeholder="12"/>
                            </li>
                            <li class="status_li">
                                <span class="status_title">实施延迟的项目数量</span>
                                <input class="item_detail" readonly placeholder="2"/>
                            </li>
                            <li class="status_li">
                                <span class="status_title">成果跟踪的项目数量</span>
                                <input class="item_detail" readonly placeholder="24"/>
                            </li>
                            <li class="status_li">
                                <span class="status_title">当年度关闭项目数量</span>
                                <input class="item_detail" readonly placeholder="12"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="status_content bottom">
                    <div class="status_echarts">
                        <span class="status_pro">项目状态分布&nbsp&nbsp<i class="status_pos">(下)</i></span>
                        <div id="charts_status_bottom">

                        </div>
                    </div>
                    <div class="status_detail">
                        <ul class="status_det">
                            <li class="status_li">
                                <span class="status_title">项目池中的项目数量</span>
                                <input class="item_detail" readonly placeholder="45"/>
                            </li>
                            <li class="status_li">
                                <span class="status_title">准备启动的项目数量</span>
                                <input class="item_detail" readonly placeholder="6"/>
                            </li>
                            <li class="status_li">
                                <span class="status_title">实施运行的项目数量</span>
                                <input class="item_detail" readonly placeholder="12"/>
                            </li>
                            <li class="status_li">
                                <span class="status_title">实施延迟的项目数量</span>
                                <input class="item_detail" readonly placeholder="2"/>
                            </li>
                            <li class="status_li">
                                <span class="status_title">成果跟踪的项目数量</span>
                                <input class="item_detail" readonly placeholder="24"/>
                            </li>
                            <li class="status_li">
                                <span class="status_title">当年度关闭项目数量</span>
                                <input class="item_detail" readonly placeholder="12"/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> 
            <div class="summary_box phase" v-show = "!flag">
                <div class="status_content top">
                    <div class="status_echarts">
                        <span class="status_pro">项目运行阶段分布&nbsp&nbsp<i class="status_pos">(上)</i></span>
                        <div id="phaseCharts_top">
                            <chart
                                :_id="'phasetop'"
                                :_titleText="'访问量统计'"
                                :_xText="'类别'"
                                :_yText="'项目阶段的数量'"
                                :_chartData="chartData"
                                :_type="'LineOrBar'">
                            </chart>
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
                            <chart
                                :_id="'phasebottom'"
                                :_titleText="'访问量统计'"
                                :_xText="'类别'"
                                :_yText="'项目阶段的数量'"
                                :_chartData="chartData1"
                                :_type="'LineOrBar'">
                            </chart>
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
        </div>
    </div>
</template>
<script>
    import {mapActions,mapState} from "vuex";
    import echarts from "echarts";
    import timearea from "../components/timeArea"
    import chart from '../components/echarts'
	export default{
        components: {
            "v-timearea": timearea,
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
                ["对策落实",20],["效果确认",10],["成果巩固",20]]
            }
                
        },
		computed:{
			...mapState([
               
                
			])
		},
        methods:{
            ...mapActions([
                
            ]),
             initCharts(){
                var myChart1 = echarts.init(document.getElementById("charts_status_top"));
                var myChart2 = echarts.init(document.getElementById("charts_status_bottom"));
                var option = {
                    // title: {
                    //     text: '项目状态分布(上)',
                    //     // subtext: 'From ExcelHome',
                    //     // sublink: 'http://e.weibo.com/1341556070/AjQH99che'
                    //     textStyle:{
                    //         color: '#333',
                    //     }
                    // },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: [
                            {
                                name:'设备损失',
                                backgroundColor:'#3670be'
                            }, 
                            {
                                name:'物料损失',
                                backgroundColor:'#3670be'
                            },
                            {
                                name:'人力损失',
                                backgroundColor:'#3670be'
                            }
                            ]
                    },
                    grid: {
                        left: 0,
                        // right: '4%',
                        // bottom: '3%',
                        // top:'-3%',
                        containLabel: true
                    },
                    xAxis:  {
                        type: 'category',
                        data: ['项目池','准备启动','实施运行','实施延迟','成果跟踪','项目关闭'],
                        axisTick:{
                            show:false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        // data: ['项目池','','周三','周四','周五','周六','周日']
                        axisTick:{
                            show:false
                        },
                        // splitNumber: 5,
                    },
                    series: [
                        {
                            name: '设备损失',
                            type: 'bar',
                            stack: '总量',
                            itemStyle:{
                                normal:{
                                    color:"#3670be"
                                }
                            },
                            data: [39, 4, 9, 1, 22,8]
                        },
                        {
                            name: '物料损失',
                            type: 'bar',
                            stack: '总量',
                            itemStyle:{
                                normal:{
                                    color:"#ffd189"
                                }
                            },
                            data: [5, 2, 3, 1, 2, 4]
                        },
                        {
                            name: '人力损失',
                            type: 'bar',
                            stack: '总量',
                            itemStyle:{
                                normal:{
                                    color:"#b7b7b7"
                                }
                            },
                            data: [1, 3, 2 , 1 , 2, 2]
                        },
                        // {
                        //     name: '视频广告',
                        //     type: 'bar',
                        //     stack: '总量',
                        //     label: {
                        //         normal: {
                        //             show: true,
                        //             position: 'insideRight'
                        //         }
                        //     },
                        //     data: [150, 212, 201, 154, 190, 330]
                        // },
                        // {
                        //     name: '搜索引擎',
                        //     type: 'bar',
                        //     stack: '总量',
                        //     label: {
                        //         normal: {
                        //             show: true,
                        //             position: 'insideRight'
                        //         }
                        //     },
                        //     data: [820, 832, 901, 934, 1290, 1330]
                        // }
                    ]
                    
                }
                myChart1.setOption(option, true);
                myChart2.setOption(option, true);
            }
           
            
        },
        watch:{
           
           
             
            
        },
        created(){
        },
        mounted(){
            // if (sessionStorage.getItem("userid")) {
            //     this.selectUserById({
            //         userid: sessionStorage.getItem("userid")
            //     })
                
            // } else {
            //     console.log(this.$route);
            // }
            // let _this = this
            // this.showImpItempool()
            this.initCharts()
           
        }
	}
</script>
<style lang="scss" scoped>
	
</style>
