<template>
<div class="area">
    区域图表设置
</div> 
</template>
<script type="text/javascript">
import {mapState,mapActions} from "vuex"
    export default {
        data(){
            return{
                sFlag:true,
            }
        },
        computed:{
            ...mapState([
               
                ])
        },
        methods:{
        ...mapActions([
            
            ]),


    },
    watch:{
        homeList(newValue){
            console.log(newValue)
            this.$nextTick(()=>{
            	var myswiper = new Swiper("#swiper",{
                   	speed:600,
			    	autoplay:4000,
			    	loop:true,
			    	autoplayDisableOnInteraction:!1,
			    	resistanceRatio:0,
			    	pagination:".swiper-pagination",
			    	paginationClickable:true,
			        paginationType:"bullets",
			        paginationElement:"li",
                })
             
            })
        }
        
    },
    mounted(){
        
      	
        
    }
}
</script>
<style lang="scss" scoped>
    @import "../styles/mobile.scss";
    .scan{
        display: flex;
        flex-direction: column;
        header{
            width:100%;
            height:P(90);
            background: rgba(0,0,0,.3);
            text-align:center;
            position:fixed;
            left:0;
            top:0;
            z-index: 10;
            font-size:P(32);
            box-sizing: border-box;
            padding: 0 P(30);
            .goback{
                width:P(90);
                text-align:center;
                line-height: P(90);
                font-size: P(40);
                color:#fff;
                float: left;
            }
            span{
                color: #fff;
                line-height: P(90);
                font-weight:bold;
            }

        }
    }
</style>