<template>
    <div class="target product">
        <div class="target_box clearfix">
            <div class="product_title">
                <span class="target_title">可生产产品</span><i class="icon-add_add project_add" @click = "addProduct()"></i>
            </div>
            <div class="target_top">
                <ul class="target_setting clearfix" v-for = "(item,idx) in this.modelList" :key = "idx">
                    <li class="target_set product_set"> 
                        <span class="target_tit">产品选择</span>
                        <Cascader :data="data" trigger="hover" v-model = "modelList[idx].label1" class="product_con" @on-change = "handleChange" :ref ="'model'+idx"></Cascader>
                    </li>
                    <li class="target_set">
                        <span>CT</span>
                        <Input  size="small" class="target_con" type = "number" :ref ="'input'+idx"></Input>
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
    data () {
        return {
            value2: ['jiangsu', 'suzhou', 'zhuozhengyuan'],
            modelList:[
                {
                    "label1":['jiangsu', 'suzhou', 'zhuozhengyuan'],
                    "label2":112
                }
            ],
            data: [{
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
                }],
           
            result:[],
            // model1:'',
            // model2:''
        }

    },

    computed:{
        ...mapState([

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
            this.modelList.push(this.data)
            console.log(this.modelList)
        },
        confirm(){
            this.result=[]
            this.modelList.forEach((item,idx)=>{
                let obj={}
                console.log(this.$refs["model"+idx][0].value)
                console.log(this.$refs["input"+idx][0].value)
                obj={
                    val1:this.$refs["model"+idx][0].value,
                    val2:this.$refs["input"+idx][0].value
                }
                this.result.push(obj)
            })
            console.log(this.result)
        },
        cancel(){

        },
        handleChange (value, selectedData) {
            let obj = {}
            console.log(selectedData.map(o => o.label).join(', '));
            obj={
                label1:this.$refs["model"+idx][0].value,
                label2:this.$refs["input"+idx][0].value
            },
            this.modelList.push(obj)
        },
    },
    watch: {

    },
    mounted() {
        // this.selectAreaAll()
	}

}
</script>
<style lang="scss" scoped>

</style>
