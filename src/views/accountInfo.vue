<template>
<div class="account">
    <div>
        ID
    </div>
    <div>
        姓名
    </div>
    <div>
        密码
    </div>
    <div>
        职位
    </div>
    <div>
        上司
    </div>
    <h1>可见菜单</h1>
    <div v-for="(city,idx) in showList" :key="idx">
        
        <input  type="checkbox" :id="city.name" :value="city.name" v-model="checkLists">
        <label :for="city.name" >{{city.name}}</label>
        
    </div> 
    <h2>{{checkLists}}</h2>
    <div>
        可视区域
    </div>     
</div>
</template>

<script type="text/javascript">
import {mapState,mapActions} from "vuex";
import Bottom from "../components/bottom.vue";
var cityListTwo = [
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
        components:{
            ebottom:Bottom
        },
        data(){
            return{
                checkLists:"",
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
