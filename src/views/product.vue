<template>
    <div class="target product">
        <div class="target_box clearfix">
            <div class="product_title">
                <span class="target_title">可生产产品</span><i class="icon-add_add project_add" @click = "addProduct()"></i>
            </div>
            <div class="target_top">
                <ul class="target_setting clearfix" v-for = "(item,idx) in this.modelList[0].result" :key = "idx" v-show = "modelList[0].result.length>0&&!productFlag">
                    <li class="target_set product_set"> 
                        <span class="target_tit">产品选择</span>
                        <Cascader :disabled="productFlag" :data="data" trigger="hover" v-model = "item.label1" class="product_con" @on-change = "handleChange" :ref="'result'+idx"></Cascader>
                    </li>
                    <li class="target_set">
                        <span>CT</span>
                        <Input :disabled="productFlag" size="small" v-model = "item.label2" class="target_con" type = "number" :ref ="'input'+idx"></Input>
                        <span class="seconds">秒</span>
                        <span class="icon-delete_2"></span>
                    </li>
                </ul>
                <ul class="target_setting clearfix" v-for = "(item,idx) in this.modelList[0].data" :key = "idx" v-show = "!productFlag">
                    <li class="target_set product_set"> 
                        <span class="target_tit">产品选择</span>
                        <Cascader :data="data" trigger="hover" :value = "'data'+idx" class="product_con" :ref ="'data'+idx"></Cascader>
                    </li>
                    <li class="target_set">
                        <span>CT</span>
                        <Input  size="small" class="target_con" :value = "'datainput'+idx" type = "number" :ref ="'datainput'+idx"></Input>
                        <span class="seconds">秒</span>
                        <span class="icon-delete_2"></span>
                    </li>
                </ul>
            </div>
            <div class="area_button text-right">
                <span class="button_confirm button" @click="confirm">确认</span>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions,mapState} from "vuex"
export default{
    props: [
        'nodeId',
    ],
    data () {
        return {
            productFlag:true,
           
            result:[],
            // model1:'',
            // model2:''
        }

    },

    computed:{
        ...mapState([
            "modelList",
            "data"
        ])
    },
    methods:{
        ...mapActions([


        ]),
        empty(val) {
            var reg = /^\s+$/gi;
            if (reg.test(val) || val.length == 0) {
                return true;
            }
        },
        addProduct(){
            this.modelList[0].data.push(this.data)
            console.log(this.modelList)
        },
        confirm(){
            this.modelList[0].result.forEach((item,idx)=>{
                console.log(item)
                console.log(idx)
            })
            this.modelList[0].data.forEach((item,idx)=>{
                console.log(this.$refs["data"+idx][0].selected)
                console.log(this.$refs["datainput"+idx][0].currentValue)
            })
        },
        cancel(){

        },
        handleChange (value, selectedData,idx) {
            console.log(value)
            // console.log(idx)
            // console.log(selectedData)
            let obj = {}
            console.log(selectedData.map(o => o.label).join(', '));
            this.modelList[0].result.forEach((item,idx)=>{
                console.log(item)
                console.log(idx)
            })
            // obj={
            //     label1:this.$refs["result"+idx][0].value,
            //     label2:this.$refs["input"+idx][0].value
            // };
            // this.modelList[0].result.push(obj)
            console.log(obj)
        },
    },
    watch: {
        nodeId(newVal){
            console.log(newVal)
            let reg=/^l/g;
            if(reg.test(newVal)){
                this.productFlag = false
                // this.selectLinebodyById({id:newVal})
            }else{
                this.productFlag = true
                // this.targetNo="";
                // this.dateStart='';
                // this.dateEnd='';
                // this.vision='';
                // this.ideal='';
                // this.visionStart = '',
                // this.visionEnd = '',
                // this.idealStart = '',
                // this.idealEnd = ''
            }

        }
    },
    mounted() {
        console.log(this.modelList)
	}

}
</script>
<style lang="scss" scoped>

</style>
