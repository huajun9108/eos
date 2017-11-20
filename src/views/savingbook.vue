<template>
    <div class="saving user_common">
        <div class="saving_content  user_maincontent">
        <div class="showTimeAndArea" @click="showlDialog">
            <span :class="isShow?'iconfont icon-drop-down2 rotate':'iconfont icon-drop-down2'"></span>
            <span class="areaAndShift">时间/区域</span>
        </div>
        <v-timearea v-show="isShow"></v-timearea>
            <div id="saving_table">
                
            </div>
        </div>
    </div>   
</template>
<script>
import echarts from "echarts"
import timearea from "../components/timeArea"
export default {
    components: {
        "v-timearea": timearea
    },
   data(){
       return{
        isShow:false,
       }
   },
   methods:{
        showlDialog(data){
            this.isShow = !this.isShow 
        },
       initCharts(){
            var myChart1 = echarts.init(document.getElementById('saving_table'));
            var option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:[
                        {name:'完美'}, 
                        {name:'实际'}, 
                        {name:'预测'}
                    ],
                    
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: 'category',
                    boundaryGap : false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value',
                     axisLabel: {  
                        show: true,  
                        interval: 'auto',  
                        formatter: '{value} %'  
                    }, 
                },
                series: [
                    
                    {
                        name:'完美',
                        type:'line',
                        step: 'start',
                        data:[100, 100, 100, 100, 100, 100, 100],
                        itemStyle:{
                            normal:{
                                color:"#bb6e6e"
                            }
                        }
                    },
                    {
                        name:'实际',
                        type:'line',
                        step: 'middle',
                        data:[10, 20, 25, 15, 40, 60, 30],
                        itemStyle:{
                            normal:{
                                color:"#3670be"
                            }
                        }
                    },
                    {
                        name:'预测',
                        type:'line',
                        step: 'end',
                        data:[15,30, 35, 20, 45, 65,55],
                        itemStyle:{
                            normal:{
                                color:"#f3d3a1"
                            }
                        }
                    }
                ]
            };

            myChart1.setOption(option, true);

       },
   },
   mounted () {
       this.initCharts();
   }
}
</script>
<style lang="sass" scoped>
</style>
