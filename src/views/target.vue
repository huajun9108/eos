<template>
    <div class="target">
        <div class="target_nav">
		    <div class="nav_header">
			    <span class="header_title">
				    区域范围
			    </span>
		    </div>
		    <div class="nav_body">
			    <ul id="area_tree" class="area_tree_class ztree">
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
                            <Select
                            :value="targetNo"
                            filterable
                            remote
                            size="large"
                            :remote-method="remoteMethod1"
                            :loading="loading1">
                            <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
                            </Select>
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
            loading1: false,
            options1: [],
            optionsStart:{
                // disabledDate (date) {
                //         return date && date.valueOf() < Date.now() - 86400000;
                //     }
            },
            optionsEnd:{
                // disabledDate (date) {
                //         return date && date.valueOf() < this.dateStart
                //     }
            },
            list: ['Alabama', 
            'Alaska', 'Arizona', 
            'Arkansas', 'California', 'Colorado',
            'Connecticut', 'Delaware', 'Florida', 'Georgia', 
            'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
            'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
            'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 
            'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 
            'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota',
            'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 
            'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 
            'West virginia', 'Wisconsin', 'Wyoming'],
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
        remoteMethod1 (query) {
                if (query !== '') {
                    this.loading1 = true;
                    setTimeout(() => {
                        this.loading1 = false;
                        const list = this.list.map(item => {
                            return {
                                value: item,
                                label: item
                            };
                        });
                        this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 200);
                } else {
                    this.options1 = [];
                }
            },
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
        querySearch(queryString, cb) {
            var targetList = this.targetList;
            var results = queryString ? targetList.filter(this.createFilter(queryString)) : targetList;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (item) => {
            return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll() {
            return [
                { "value": "73", "address": "长宁区新渔路144号" },
                { "value": "74", "address": "上海市长宁区淞虹路661号" },
                { "value": "75", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                { "value": "76 ", "address": "天山西路438号" },
            ];
        },
        handleSelect(item) {
            console.log(item);
            this.targetList = this.loadAll();
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
            $.fn.zTree.init($("#area_tree"), this.setting,this.areaAll);
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
        this.selectAreaAll(),
        this.targetList = this.loadAll();
         console.log(this.targetNo)


	}

}
</script>
<style lang="scss" scoped>

</style>
