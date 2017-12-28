<template>
    <div class="saving user_common">
        <div class="saving_content  user_maincontent">
        <div class="showTimeAndArea" @click="showlDialog">
            <span :class="isShow?'iconfont icon-drop-down2 rotate':'iconfont icon-drop-down2'"></span>
            <span class="areaAndShift">时间/区域</span>
        </div>
        <v-timearea v-show="isShow" @clear="clearCharts"></v-timearea>
            <div id="saving_table">
                <chart
                    :_id="'saving_chart'"
                    :_titleText="'saving统计'"
                    :_xText="'类别'"
                    :_yText="'saving'"
                    :_chartData="savingData"
                    :_type="'Line'"></chart>
               <div class="pro_tip" v-if = "savingData==null||savingData==''">暂无数据</div>
            </div>
        </div>
    </div>
</template>
<script>
import timearea from "../components/timeArea"
import chart from '../components/echarts'
import {
  mapState,
  mapActions
} from "vuex";
export default {
    components: {
        "v-timearea": timearea,
        "chart":chart
    },
   data(){
       return{
        isShow:false,
        savingData:[],
       }
   },
   methods:{
        showlDialog(){
            this.isShow = !this.isShow
        },
        clearCharts() {
          this.savingData = [];
        }
   },
   computed: {
     ...mapState([
       "selectSavingBookByTimesAndLinebodysRes"
     ])
   },
   watch: {
     selectSavingBookByTimesAndLinebodysRes(newVal) {
       if(newVal.status === "0") {
         this.savingData = newVal.data;
       }
     }
   },
   mounted () {
   }
}
</script>
<style lang="sass" scoped>
</style>
