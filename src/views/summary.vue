<template>
    <div class="summary user_common ">
        <div class="summary_content  user_maincontent">
            <div class="showTimeAndArea summaryShow" @click="showlDialog">
                <span :class="isShow?'iconfont icon-drop-down2 rotate':'iconfont icon-drop-down2'"></span>
                <span class="areaAndShift">区域</span>
            </div>
            <v-timearea v-show="isShow"></v-timearea>
            <v-status></v-status>
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
            showlDialog(data){
                this.isShow = !this.isShow 
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
