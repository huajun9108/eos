<template>
    <div class="summary user_common ">
        <div class="summary_content  user_maincontent">
            <div class="showTimeAndArea" @click="showlDialog">
                <span :class="isShow?'iconfont icon-drop-down2 rotate':'iconfont icon-drop-down2'"></span>
                <span class="areaAndShift">时间/区域</span>
            </div>
            <v-timearea v-show="isShow"></v-timearea>
            <div class="summary_top">
                <router-link :to="{name:'status'}">
                    <span>项目状态</span>
                </router-link>
                <router-link :to="{name:'phase'}">
                    <span>运行阶段</span>
                </router-link>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import {mapActions,mapState} from "vuex";
    import echarts from "echarts";
    import timearea from "../components/timeArea"
    import chart from '../components/echarts'
    // import status from '../components/status'
    // import phase from '../components/phase'
	export default{
        components: {
            "v-timearea": timearea,
            "chart":chart,
            // "v-status":status,
            // "v-phase":phase
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
               
                
			])
		},
        methods:{
            ...mapActions([
                
            ]),
            go(name){
                this.$router.push({name:name})
            },
            showlDialog(data){
                this.isShow = !this.isShow 
            },
          
           
            
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
            // this.initCharts()
            // let height =  this.$refs.status.offsetHeight
            // let width =  this.$refs.status.offsetWidth
            // console.log(height+"==="+width)
            // // this.$nextTick(() => {
            //     this.$refs.phase.style.height = 300+"px"
            //     console.log(this.$refs.phase.style.height )
            //     this.$refs.phase.style.width = 300+"px"
            //     console.log(this.$refs.phase.style.width )
            // // })
        }
	}
</script>
<style lang="scss" scoped>
	
</style>
