<template>
    <div class="summary user_common ">
        <div class="summary_content  user_maincontent">
            <div class="showTimeAndArea summaryShow" @click="showlDialog">
                <span :class="isShow?'iconfont icon-drop-down2 rotate':'iconfont icon-drop-down2'"></span>
                <span class="areaAndShift">区域</span>
            </div>
            <v-timearea v-show="isShow" @clear="clearChartsData"></v-timearea>
            <v-status :project="projectStatus"></v-status>
        </div>
    </div>
</template>
<script>
    import {mapActions,mapState} from "vuex";
    import timearea from "../components/timeArea"
    import status from "./status"
	export default{
        components: {
            "v-timearea": timearea,
            "v-status":status
        },
        data(){
            return{
                projectStatus:false,
                flag:true,
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
            showlDialog(){
                this.isShow = !this.isShow
            },
            clearChartsData() {
                this.projectStatus = !this.projectStatus;
            },
        },
        watch:{
        },
        created(){
        },
        mounted(){

        }
	}
</script>
<style lang="scss" scoped>

</style>
