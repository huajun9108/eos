<template>
    <div class="lossInto">
        
        lossInto
        


    </div>
</template> 


<script>
    
import router from "../router/index.js";

export default{

    methods:{
        goback(){
            router.go(-1);

        },
        pay(){
            alert("付款成功")
        },
        add(){
            var price =  this.$refs.price.innerHTML.split("￥")[1]      
            this.$refs.numcount.value= this.$refs.numcount.value*1+1;
            this.$refs.total.innerHTML="￥"+this.$refs.numcount.value*1*price
        },
        desc(){
             var price =  this.$refs.price.innerHTML.split("￥")[1]     
            if(this.$refs.numcount.value <=1){
                return this.$refs.numcount.value = 1;       
            }else{
            this.$refs.numcount.value= this.$refs.numcount.value*1-1;
            this.$refs.total.innerHTML="￥"+this.$refs.numcount.value*1*price
            }

        }
    }


}



</script>
