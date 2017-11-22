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
                        <li class="target_tit">开始时间</li>
                        <li class="target_tit">结束时间</li>
                    </ul>
                     <ul class="target_setting clearfix">
                        <li class="target_set"><input class="target_no" type="text" v-model="vision"/></li>
                        <li class="target_set">
                            <DatePicker type="date" v-model="visionStart" placeholder="Select date" :options="visionOptipnStart"></DatePicker>
                        </li>
                        <li class="target_set">
                            <DatePicker type="date" v-model="visionEnd" placeholder="Select date" :options="visionOptipnEnd"></DatePicker>
                        </li>
                    </ul>
                     <ul class="target_title clearfix">
                        <li class="target_tit">Ideal</li>
                        <li class="target_tit">开始时间</li>
                        <li class="target_tit">结束时间</li>
                    </ul>
                     <ul class="target_setting clearfix">
                        <li class="target_set"><input class="target_no" type="text"  v-model="ideal"/></li>
                        <li class="target_set">
                            <DatePicker type="date" v-model="idealStart" placeholder="Select date" :options="idealOptipnStart"></DatePicker>
                        </li>
                        <li class="target_set">
                            <DatePicker type="date" v-model="idealEnd" placeholder="Select date" :options="idealOptipnEnd"></DatePicker>
                        </li>
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
            visionStart:'',
            visionEnd:'',
            idealStart:'',
            idealEnd:'',
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
            visionOptipnStart:{
                disabledDate: (date) => {
                    let beginDateVal = this.visionEnd;
                    if (beginDateVal) {
                        return date && date.valueOf() > beginDateVal;
                    }
                }
            },
            visionOptipnEnd:{
                disabledDate: (date) => {
                    let beginDateVal = this.visionStart;
                    if (beginDateVal) {
                        return date && date.valueOf() < beginDateVal
                    }
                }
            },
            idealOptipnStart:{
                disabledDate: (date) => {
                    let beginDateVal = this.idealEnd;
                    if (beginDateVal) {
                        return date && date.valueOf() > beginDateVal;
                    }
                }
            },
            idealOptipnEnd:{
                disabledDate: (date) => {
                    let beginDateVal = this.idealStart;
                    if (beginDateVal) {
                        return date && date.valueOf() < beginDateVal;
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
            targetList: ['82%', '83%', '87%'],
        }
    },

    computed:{
        ...mapState([
            'areaAll',
            'lineBody',
            'updatelineBodyRes'

        ])
    },
    methods:{
        ...mapActions([
            'selectAreaAll',
            'selectLinebodyById',
            'updateLinebodyInfById'
        ]),
        empty(val) {
            var reg = /^\s+$/gi;
            if (reg.test(val) || val.length == 0) {
                return true;
            }
        },
        toPoint(percent){
            var str=percent.replace("%","");
            str= str/100;
            return str;
        },
        toPercent(point){
            var str=Number(point*100).toFixed();
            str+="%";
            return str;
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
            
            // console.log(this.nodeId+"--"+this.targetNo+"---"+typeof(this.dateStart)+"--"+this.dateEnd+"--"+this.visionStart+"--"+this.visionEnd)
        },
        cancel(){

        },
        validateData() {
        //if (this.empty(this.username)) alert("用户情况不能为空"); this.
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
        areaAll(){
            $.fn.zTree.init($("#target_tree"), this.setting,this.areaAll);
        },
        lineBody(newVal){
            this.targetNo = this.toPercent(newVal.targetvalue);
            this.dateStart= newVal.targetstrattime;
            this.dateEnd = newVal.targetendtime;
            this.vision = this.toPercent(newVal.visionvalue);
            this.ideal = this.toPercent(newVal.idealvalue);
            this.visionStart = newVal.visionstrattime,
            this.visionEnd = newVal.visionendtime,
            this.idealStart = newVal.idealstrattime,
            this.idealEnd = newVal.idealendtime
        },
        updatelineBodyRes(newVal){
            if(newVal.status=="0"){
                this.$Message.success("更新成功")
            }else{
                this.$Message.error("更新失败,请选择相应的线体进行操作")
            }
        }
    },
    mounted() {
        this.selectAreaAll()
	}

}
</script>
<style lang="scss" scoped>

</style>
