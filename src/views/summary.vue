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
    
    import timearea from "../components/timeArea"
    
	export default{
        components: {
            "v-timearea": timearea,
            
            
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
           
        }
	}
</script>
<style lang="scss" scoped>
	
</style>
