<template>
    <div class="target">
        <div class="target_nav">
		    <div class="nav_header">
			    <span class="header_title">区域范围</span>
		    </div>
		    <div class="nav_body">
			    <ul id="target_tree" class="area_tree_class ztree">
			    </ul>
		    </div>
	    </div>
	    <div class="target_content">
            <div class="target_box">
                <div class="target_top">
                    <ul class="target_title clearfix">
                        <li class="target_tit">Target</li>
                        <li class="target_tit">开始时间</li>
                        <li class="target_tit">结束时间</li>
                    </ul>
                    <ul class="target_setting clearfix">
                        <li class="target_set"> 
                            <AutoComplete
                                v-model="targetNo"
                                placeholder="input here"
                                >
                                <Option v-for="item in targetList" :value="item" :key="item">{{ item }}</Option>
                            </AutoComplete>
                        </li>
                        <li class="target_set">
                            <DatePicker type="date" v-model="dateStart" placeholder="Select date" :options="optionsStart"></DatePicker>
                        </li>
                        <li class="target_set">
                            <DatePicker type="date" v-model="dateEnd" placeholder="Select date" :options="optionsEnd"></DatePicker>
                        </li>
                    </ul>
                    <ul class="target_title clearfix">
                        <li class="target_tit">Vision</li>
                    </ul>
                     <ul class="target_setting clearfix">
                        <li class="target_set"><input class="target_no" type="text" v-model="vision"/></li>
                    </ul>
                     <ul class="target_title clearfix">
                        <li class="target_tit">Ideal</li>
                    </ul>
                     <ul class="target_setting clearfix">
                        <li class="target_set"><input class="target_no" type="text"  v-model="ideal"/></li>
                    </ul>
                </div>
                <div class="accountinfo_button text-right">
                    <span class="button_confirm button" @click="confirm">确认</span>
                    <span class="button_cancel button" @click="cancel">取消</span>
                </div>
            </div>
	    </div>
    </div>
</template>
<script>
import {mapActions,mapState} from "vuex"
export default{
    data () {
        return {
            targetList:[],
            targetNo:'',
            dateStart:'',
            dateEnd:'',
            vision:'',
            ideal:'',
            optionsStart:{
                disabledDate: (date) => {
                let beginDateVal = this.dateEnd;
                if (beginDateVal) {
                    return date && date.valueOf() > beginDateVal;
                }
            }
            },
            optionsEnd:{
                disabledDate: (date) => {
                let beginDateVal = this.dateStart;
                if (beginDateVal) {
                    return date && date.valueOf() < beginDateVal
                }
            }
            },
            setting: {
                view: {
                    selectedMulti: false,
                    showIcon: false,
                },
                data: {
                    simpleData: {
                    enable: true
                    }
                },
                callback:{
                    onClick:this.clickNode
                }
            },
            nodeId:'',
            targetList: ['82', '83', '87'],
        }
    },

    computed:{
        ...mapState([
            'areaAll',
            'lineBody'

        ])
    },
    methods:{
        ...mapActions([
            'selectAreaAll',
            'selectLinebodyById',
            'updateLinebodyInfById'
        ]),
        confirm(){
            let _this=this
            this.updateLinebodyInfById({
                "id": this.nodeId,
                "targetValue": this.targetNo,
                "targetStrattime":this.dateStart,
                "targetEndtime": this.dateEnd,
                "visionValue": this.vision,
                "visionStrattime": '2010-10-21',
                "visionEndtime":'2010-10-21',
                "idealValue": this.ideal,
                "idealStrattime": '2010-10-21',
                "idealEndtime":'2010-10-21'
            })
            console.log(this.nodeId+"--"+this.targetNo+"---"+typeof(this.dateStart)+"--"+this.dateEnd+"--"+this.vision+"--"+this.ideal)
        },
        cancel(){

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
            }


        }
    },
    watch: {
        areaAll(){
            $.fn.zTree.init($("#target_tree"), this.setting,this.areaAll);
        },
        lineBody(newVal){
            this.targetNo=newVal.targetvalue;
            this.dateStart= newVal.targetstrattime;
            this.dateEnd = newVal.targetendtime;
            this.vision = newVal.visionvalue;
            this.ideal = newVal.idealvalue
            console.log(this.targetNo)
        },
        targetNo(){
            console.log(this.targetNo)
        }
    },
    mounted() {
        this.selectAreaAll()
	}

}
</script>
<style lang="scss" scoped>

</style>
