<template>
    <div class="target">
        <div class="target_box clearfix">
            <div class="target_top">
                <span class="target_title">目标</span>
                <ul class="target_setting clearfix">
                    <li class="target_set"> 
                        <span class="target_tit">Target</span>
                        <AutoComplete
                            v-model="targetNo"
                            placeholder="input here"
                            class="target_con"
                            :disabled="targetFlag"
                            >
                            <Option v-for="item in targetList" :value="item" :key="item">{{ item }}</Option>
                        </AutoComplete>
                    </li>
                    <li class="target_set">
                        <span class="target_tit">开始时间</span>
                        <DatePicker :disabled="targetFlag" class="target_con" type="date" placement="bottom-end" v-model="dateStart" placeholder="Select date" :options="optionsStart"></DatePicker>
                    </li>
                    <li class="target_set">
                        <span class="target_tit">结束时间</span>
                        <DatePicker :disabled="targetFlag" class="target_con" type="date" placement="bottom-end" v-model="dateEnd" placeholder="Select date" :options="optionsEnd"></DatePicker>
                    </li>
                </ul>
                <ul class="target_setting clearfix">
                    <li class="target_set">
                        <span class="target_tit">Vision</span>
                        <Input :disabled="targetFlag" v-model="vision" size="small" class="target_con"></Input>
                    </li>
                    <li class="target_set">
                        <span class="target_tit">开始时间</span>
                        <DatePicker :disabled="targetFlag" class="target_con" type="date" placement="bottom-end" v-model="visionStart" placeholder="Select date" :options="visionOptipnStart"></DatePicker>
                    </li>
                    <li class="target_set">
                        <span class="target_tit">结束时间</span>
                        <DatePicker :disabled="targetFlag" class="target_con" type="date" placement="bottom-end" v-model="visionEnd" placeholder="Select date" :options="visionOptipnEnd"></DatePicker>
                    </li>
                </ul>
        
                <ul class="target_setting clearfix">
                    <li class="target_set">
                        <span class="target_tit">Ideal</span>
                        <Input :disabled="targetFlag" v-model="ideal" size="small" class="target_con"></Input>
                    </li>
                    <li class="target_set">
                        <span class="target_tit">开始时间</span>
                        <DatePicker :disabled="targetFlag" class="target_con"  type="date" placement="bottom-end" v-model="idealStart" placeholder="Select date" :options="idealOptipnStart"></DatePicker>
                    </li>
                    <li class="target_set">
                        <span class="target_tit">结束时间</span>
                        <DatePicker :disabled="targetFlag" class="target_con"  type="date" placement="bottom-end" v-model="idealEnd" placeholder="Select date" :options="idealOptipnEnd"></DatePicker>
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
            targetFlag:true,
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
            targetList: ['82%', '83%', '87%'],
        }
    },

    computed:{
        ...mapState([
            'lineBody',
            'updatelineBodyRes'
        ])
    },
    methods:{
        ...mapActions([
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
            let reg=/^l/g;
            if(!reg.test(this.nodeId)){
                this.$Message.error('请选择对应的线体进行操作');
            }else{
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
            }
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
            }else{
                return true;
            }
                
        },

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
        },
        nodeId(newVal){
            console.log(newVal)
            let reg=/^l/g;
            if(reg.test(newVal)){
                this.targetFlag = false
                this.selectLinebodyById({id:newVal})
            }else{
                this.targetFlag = true
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
    mounted() {
        // this.selectAreaAll()
	}

}
</script>
<style lang="scss" scoped>

</style>
