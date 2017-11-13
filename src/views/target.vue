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
                        <li class="target_set"> <el-autocomplete
                            class="inline-input"
                            v-model="targetNo"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入"
                            @select="handleSelect"
                            ></el-autocomplete></li>
                        <li class="target_set">
                            <el-date-picker
                            v-model="dateStart"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                            </el-date-picker>
                        </li>
                        <li class="target_set"><el-date-picker
                            v-model="dateEnd"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                            </el-date-picker>
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
            targetNo:null,
            dateStart:'',
            dateEnd:'',
            vision:'',
            ideal:'',
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
                this.$message.info("暂无信息")
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
            this.targetNo=JSON.stringify(newVal.targetvalue);
            this.dateStart= newVal.targetstrattime;
            this.dateEnd = newVal.targetendtime;
            this.vision = newVal.visionvalue;
            this.ideal = newVal.idealvalue
        }
    },
    mounted() {
        this.selectAreaAll(),
        this.targetList = this.loadAll();


	}

}
</script>
<style lang="scss" scoped>

</style>
