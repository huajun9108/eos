<template>
<div class="account">
    用户信息
    <router-link :to="{name:'accountInfo'}">
        编辑
    </router-link>
</div>
</template>

<script type="text/javascript">
import {mapState,mapActions} from "vuex";
var cityListTwo = [
			{name:"可见菜单",value:"overview"},
			{name:"overview",value:"overview"},
			{name:"performance",value:"performance"},
			{name:"target",value:"target"},
			{name:"loss",value:"loss"},
			{name:"projects",value:"projects"},
            {name:"saving",value:"saving"},
			{name:"data",value:"data"},
			{name:"account",value:"account"},
		];
    export default {
        data(){
            return{
                selectCity:"overview",
                showList:cityListTwo
            }
        },
        computed:{
            ...mapState([
                // 'interestData',
                // 'staySwiper',
                // 'currentIndex',
                // 'homeData',
                // 'fireData',
                ])
        },
        methods:{
        
        ...mapActions([
            // 'getinterestData',
            // 'changeIndex',
            // 'gethomeData',
            // 'getfireData',
            // 'gethomeList'
            ])
    },
    watch:{
        // homeData(newValue){
        //     console.log(newValue)
        //     this.$nextTick(()=>{
        //         var myswiper = new Swiper("#swiper",{
        //            	pagination:".swiper-pagination",
        //            	paginationClickable:true,//为true时，点击分页器的指示点分页器会控制Swiper切换。
		// 	        paginationType:"bullets",  //'bullets' 圆点'fraction'分式 'progress'进度条'custom' 自定义
		// 	        paginationHide:false,
		// 	        paginationElement:"div",
		// 	        paginationBulletRender:function(index, className){
		// 	            var txt=["精品民宿","兴趣培养","灵感空间"]
		// 	            var unicode=["&#xe669;","&#xe62c;","&#xe506;"]
		// 	            return"<div class="+className+"><i class='iconfont'>"+unicode[index]+"</i><span>"+txt[index]+"</span></div>"
		// 	        }//渲染分页器小
        //         })
                
        //     })
        // },    
    },

    mounted(){
        // this.getinterestData()
        // this.gethomeData();
        // this.getfireData();
    
    }
}
</script>
<style lang="scss" scoped>
    
    
    
</style>
