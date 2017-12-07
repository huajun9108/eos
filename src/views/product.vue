<template>
    <div class="target product">
        <div class="target_box clearfix">
            <div class="product_title">
                <span class="target_title">可生产产品</span><i class="icon-add_add project_add" @click = "addProduct()"></i>
            </div>
            <div class="target_top">
                <ul class="target_setting clearfix" v-for = "(item,idx) in productData[idx]" :key = "idx" >
                    <li class="target_set product_set"> 
                        <Select class="productModel product_con" v-model="productModel" clearable placeholder="productModel" @on-change="getProductModel($event)">
                            <Option v-for="(product,idx) in item" :key="idx" :label="product.label" :value="product.value" :ref="product.value">
                                {{product.label}}
                            </Option>
                        </Select>
                        <Select class="productMenu product_con"  v-model="productMenu" clearable placeholder="productList" @on-change="getProductMenu($event)" >
                            <Option v-for="item in productMenuListList" :key="item.tier4id" :label="item.name" :value="item.tier4id">
                            </Option>
                        </Select>
                        <Select class="production product_con"  v-model="product" clearable placeholder="product" >
                            <Option v-for="item in productionListList" :key="item.tier4id" :label="item.name" :value="item.tier4id">
                            </Option>
                        </Select>
                    </li>
                    <li class="target_set"> 
                        <span>CT</span>
                        <Input v-model="vision" size="small" class="target_con"></Input>
                        <span class="seconds">秒</span>
                        <span class="icon-delete_2"></span>
                    </li>
                </ul>
            </div>
            <div class="area_button text-right">
                <span class="button_confirm button" @click="confirm">确认</span>
                <span class="button_cancel button" @click="cancel">取消</span>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions,mapState} from "vuex"
export default{
    data () {
        return {
            productData:[
               
            ],
            productModelList:[
                {value: 1, label: "Machine"}, 
                {value:2, label: "EHS"}, 
                {value: 3, label: "Material"},
            ],
            productModel:'',
            productMenuList:[
                {tier2id: 29, name: "Safety", losstier1Lossid: 2},
                {tier2id: 30, name: "OEE", losstier1Lossid: 1},
                {tier2id: 31, name: "Defect", losstier1Lossid: 3},

            ],
            productMenu:'',
            productMenuListList:[],
            productionList:[
                {lossid: 4, name: "Breakdowns",losstier2Lossid: 30},
                {lossid: 5, name: "Short Stops",losstier2Lossid: 30},
                {lossid: 10, name: "Speed Loss",losstier2Lossid: 30},
                {lossid: 12, name: "First Aids",losstier2Lossid: 29},
                {lossid: 13, name: "Near Miss",losstier2Lossid: 29}
                ,
                {lossid: 14, name: "Unsafe Behavior",losstier2Lossid: 29}

                ,
                {lossid: 15, name: "Dimension out of Spec",losstier2Lossid: 31}

                ,
                {lossid: 16, name: "Function issue",losstier2Lossid: 31}

                ,
                {lossid: 17, name: "Visual check issue",losstier2Lossid: 31}

                ,
                {lossid: 39, name: "Tool Changes",losstier2Lossid: 30},
            ],
            productionListList:[],
            product:''  ,
            count:0 
    

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
        getProductModel(tier) {
            if (!tier) {
                this.productModel = '';
                this.productMenu = '';
                return;
            }
            let tempTier = [];
            this.productMenuListList = [];
            this.productMenu = '';
            for (let val of this.productMenuList) {
                if (tier === val.losstier1Lossid) {
                tempTier.push({
                    "tier4id": val.tier2id,
                    "name": val.name
                });
                }
            }
            this.productMenuListList = tempTier;
        },
        getProductMenu(tier) {
            // if (!tier) {
            //     this.productModel = '';
            //     this.productMenu = '';
            //     return;
            // }
            let tempTier = [];
            this.productionListList = [];
            this.productMenu = '';
            for (let val of this.productionList) {
                if (tier === val.losstier2Lossid) {
                tempTier.push({
                    "tier4id": val.lossid,
                    "name": val.name
                });
                }
            }
            this.productionListList = tempTier;
        },
        addProduct(){
            this.count++;
            const idx = this.count;
            
            this.productData.push(this.productModelList)
            console.log(this.productData)
        },
        confirm(){
            let _this=this
            if(this.validateData()){
                this.updateLinebodyInfById({
                    "id": this.nodeId,
                    "targetValue": this.toPoint(this.targetNo),
                    "targetStrattime":this.dateStart,
                    "targetEndtime": this.dateEnd,
                    "visionValue": this.toPoint(this.vision),
                    "visionStrattime": this.visionStart,
                    "visionEndtime":this.visionEnd,
                    "idealValue": this.toPoint(this.ideal),
                    "idealStrattime": this.idealStart,
                    "idealEndtime":this.idealEnd
                })
            }
            
        },
        cancel(){

        },
        validateData() {
        if (
            this.empty(this.targetNo) ||
            this.empty(this.dateStart) ||
            this.empty(this.dateEnd) ||
            this.empty(this.vision) ||
            this.empty(this.visionStart) ||
            this.empty(this.visionEnd) ||
            this.empty(this.ideal) ||
            this.empty(this.idealStart) ||
            this.empty(this.idealEnd) 
        ) {
            this.$Message.error('线体信息不能为空');
            return false;
        }
            return true;
        },
        clickNode(event, treeId, treeNode){
            let reg=/^l/g;
            if(reg.test(treeNode.id)){
                this.selectLinebodyById({id:treeNode.id})
                this.nodeId = treeNode.id
            }else{
                this.$Message.info("暂无信息")
                this.targetNo="";
                this.dateStart='';
                this.dateEnd='';
                this.vision='';
                this.ideal='';
                this.visionStart = '',
                this.visionEnd = '',
                this.idealStart = '',
                this.idealEnd = ''
            }


        }
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
