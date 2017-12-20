<template>
    <div class="saving user_common">
        <div class="saving_content  user_maincontent">
        <div class="showTimeAndArea" @click="showlDialog">
            <span :class="isShow?'iconfont icon-drop-down2 rotate':'iconfont icon-drop-down2'"></span>
            <span class="areaAndShift">时间/区域</span>
        </div>
        <v-timearea v-show="isShow"></v-timearea>
            <div id="saving_table">
                <chart
                    :_id="'saving_chart'"
                    :_titleText="'saving统计'"
                    :_xText="'类别'"
                    :_yText="'saving'"
                    :_chartData="savingData"
                    :_type="'Line'"></chart>
            </div>
        </div>
    </div>   
</template>
<script>
import timearea from "../components/timeArea"
import chart from '../components/echarts'
export default {
    components: {
        "v-timearea": timearea,
        "chart":chart
    },
   data(){
       return{
        isShow:false,
        savingData:[["2013/1/24","1000000","3000000"],["2013/1/25","1500000","2500000"],["2013/1/26","900000","900000"]],
       }
   },
   methods:{
        showlDialog(){
            this.isShow = !this.isShow 
        },
   },
   mounted () {
   }
}
</script>
<style lang="sass" scoped>
</style>
