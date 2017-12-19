<template>
<div class="project">
    <div class="project_now project_item">
        <span class="pro_title">现进行项目 <i class="icon-add_add project_add" @click = "pro_modal=true"></i></span>
        <div class="pro_item">
            <table class="table text-center table-hover">
            <thead class="fixedThead">
                <tr>
                    <td class="text-center pro_name" width="40%">名称</td>
                    <td class="text-center pro_date" width="20%">下次review日期</td>
                    <td class="text-center pro_status" width="20%">当前状态</td>
                    <td class="edit" width="20%"  colspan="2">编辑</td>
                </tr>
            </thead>
            <tbody class="scrollTbody">
            <tr v-for="(item,idx) in this.proNowList" :key="idx" class="text-center"  >
                <td width="40%">{{item.name}}</td>
                <td width="20%">{{item.status}}</td>
                <td width="20%">{{item.status}}</td>
                <td width="10%" class="icon-edit" @click = "editpro(item.id)"></td>
                <td width="10%" class="icon-delete_2" @click = "delpro({id:item.id,name:item.name})"></td>
            </tr>

            <tr v-if="proNowList.length==0">
                <td colspan="4" class="text-center text-muted">
                    <p>暂无数据...</p>
                </td>
            </tr>
            </tbody>
            </table>
        </div>
    </div>
    <div class="project_detail project_item">
        <span class="pro_title">详细信息</span>
        <div class="pro_itemdetail" v-show="detailFlag">
            <ul class="item_det" >
                <li class="item_li">
                    <span class="item_title">改进项目编号</span>
                    <input v-model= "projectnumber" class="item_detail" />
                </li>
                <li class="item_li">
                    <span class="item_title">改进项目名称</span>
                    <input v-model= "projectname" class="item_detail" />
                </li>
                <li class="item_li">
                    <span class="item_title">损失类别</span>
                    <input v-model= "losscategory" class="item_detail" />
                </li>
                <li class="item_li">
                    <span class="item_title">项目状态</span>
                    <Select v-model="status" clearable size="small" style="width:90px">
                        <Option  v-for="(item,idx) in statusList" :key = "idx" :value="item.value">{{ item.label }}</Option>
                    </Select>
                </li>
                <li class="item_li">
                    <span class="item_title">项目阶段</span>
                    <Select :disabled="this.status!='2'" v-model="stage" clearable size="small" style="width:90px">
                        <Option v-for="(item,idx) in stageList" :key = "idx" :value="item.value">{{ item.label }}</Option>
                    </Select>
                </li>
                <li class="item_li">
                    <span class="item_title">起点绩效值</span>
                    <input v-model="startperformance" class="item_detail" />
                </li>
                <li class="item_li">
                    <span class="item_title">目标</span>
                    <input  v-model="target" class="item_detail" />
                </li>
                <li class="item_li">
                    <span class="item_title">当前绩效</span>
                    <input v-model="performance" class="item_detail" />
                </li>
                <li class="item_li">
                    <span class="item_title">项目开始日期</span>
                    <DatePicker size="small" v-model="objectstarttime" :options="optionsStart" placement="bottom-end"
                    class="item_detail" placeholder="Select date" @on-change="startChange" @on-clear="clearCharts">
                    </DatePicker>
                </li>
                <li class="item_li">
                    <span class="item_title">预期结束日期</span>
                    <DatePicker size="small" width="90%" v-model="planendtime" :options="optionsStart" placement="bottom-end"
                    class="item_detail" placeholder="Select date" @on-change="startChange" @on-clear="clearCharts">
                    </DatePicker>
                </li>
                
            </ul>
            <div class="area_button text-right">
                <span class="button_confirm button" @click="confirm">确认</span>
                <span class="button_cancel button" @click="cancel">取消</span>
            </div>
        </div>
    </div>
    <div class="project_change project_item">
        <span class="pro_title">变更信息</span>
        <div class="pro_itemdetail" >
            <ul class="item_det" v-for="(item,index) in showLog" :key = "index">
                <li class="item_li clearfix">
                    <span class="item_status">{{item.message}}从{{item.before}}变为{{item.now}}</span>
                    <span class="item_time">{{item.time}}&nbsp;&nbsp;{{item.date}}</span>
                </li>
            </ul>
        </div>
    </div>
    <Modal
        v-model="pro_modal"
        title="项目池"
        :closable="false"
        :mask-closable="false"
        @on-ok="add_item"
        class-name="vertical-center-modal">
        <table class="table table-hover text-center">
            <tbody class="pro_Tbody" v-for="(item,idx) in improList" :key="idx">
                <tr v-if="item.data.length>0">
                    <td :rowspan="item.data.length">{{item.name}}</td>
                    <td @click="choose({id:item.data[0].lossid,name:item.data[0].name})" :ref="item.data[0].lossid">{{item.data[0].name}}</td>
                </tr>
                <tr v-if="item.data.length==0">
                    <td>{{item.name}}</td>
                    <td></td>
                </tr>
                <tr v-for="(option,index) in item.data" :key="index" v-if="index!=0">
                    <td @click="choose({id:option.lossid,name:option.name})" :ref="option.lossid">{{option.name}}</td>
                </tr>
            </tbody>
        </table>
    </Modal>
</div>
</template>
<script>
import {mapActions,mapState} from "vuex";
import { stageRes, statusRes } from "../assets/js/tip"
	export default{
        data(){
            return{
                pro_modal:false,
                detailFlag:false,
                proList:[],
                proListItem:"",
                proListId:"",
                leftId:[],
                proNowList:[],
                projectnumber:'',
                projectname:'',
                losscategory:'',
                status:'',
                statusResult:'',
                startperformance:'',
                target:'',
                performance:'',
                objectstarttime:'',
                planendtime:'',
                stage:'',
                addObjId:[],
                validareaList:[],
                linebodyId:'',
                statusList:[
                    {
                        value: 1,
                        label: '准备启动'
                    },
                    {
                        value: 2,
                        label: '实施运行'
                    },
                    {
                        value: 3,
                        label: '成果跟踪'
                    },
                    {
                        value: 4,
                        label: '项目关闭'
                    },
                   
                ],
                stageList:[
                     {
                        value: 'a',
                        label: '明确问题'
                    },
                    {
                        value: 'b',
                        label: '把握现状'
                    },
                    {
                        value: 'c',
                        label: '设定目标'
                    },
                    {
                        value: 'd',
                        label: '分析根因'
                    },
                    {
                        value: 'e',
                        label: '对策计划'
                    },
                    {
                        value: 'f',
                        label: '对策落实'
                    },
                    {
                        value: 'g',
                        label: '效果确认'
                    },
                    {
                        value: 'h',
                        label: '成果巩固'
                    },
                ],
                statusId:'',
                showLog:null
            }

        },
		computed:{
			...mapState([
                'improList',
                'nowline',
                'itemstatus',
                'updateItemResult',
                'addObject',
                'deleteObject',
                'validarea',
                'showImpItemhistoryRes'

			])
		},
        methods:{
            ...mapActions([
                'showImpItempool',
                'showObjectnowBylinedyid',
                'showImpItemstatus',
                'updateImpItemstatus',
                'addObjectnowBylossid',
                'deleteObjectnowBylossid',
                'selectUserById',
                'showImpItemhistory'
            ]),
            cancel(){

            },
            confirm(){
                let _this = this;
                if(this.validateData()) {
                    console.log(1)
                    _this.updateImpItemstatus({
                        "id": _this.statusId,
                        "linebodyId": _this.linebodyId,
                        "projectnumber": _this.projectnumber,
                        "projectname":_this.projectname,
                        "losscategory": _this.losscategory,
                        "status": _this.status,
                        "startperformance": _this.startperformance,
                        "target": _this.target,
                        "performance": _this.performance,
                        "objectstarttime": _this.objectstarttime,
                        "planendtime": _this.planendtime,
                        "stage": _this.stage,
                    })
                    setTimeout(function(){
                        
                        _this.showObjectnowBylinedyid({linebodyId:_this.linebodyId})
                    },10)
                    setTimeout(function(){
                        _this.showImpItemhistory({linebodyId:_this.linebodyId})
                    
                    },20)
                }else{
                    console.log(2)
                }
                
            },
            arrIsContains(arr, obj) {
                if(JSON.stringify(arr).indexOf(JSON.stringify(obj))!=-1){
                    return false
                }else{
                    return true
                }
            },
            choose(obj){
                let _this = this;
                this.proListItem = this.$refs[obj.id][0].innerHTML
                this.proListId = obj.id
                   if(this.arrIsContains(_this.proList,obj)){
                    this.proList.push(obj)
                    this.$refs[obj.id][0].className = "pro_active"
                    }else{
                        console.log(1)
                    }
            },
            add_item(){
                this.addObjId=[]
                this.proList.forEach(item=> {
                    if(this.arrIsContains(this.proNowList,item)){
                        this.addObjId.push(item.id)
                    }
                }, this);
                this.addObjectnowBylossid({
                    lossId:this.addObjId.join(","),
                    linebodyId:this.linebodyId
                })
                this.addObjId=[]
                this.proList=[]
            },
            editpro(lossId){
                this.detailFlag = true
                this.showImpItemstatus({
                    lossId:lossId,
                    linebodyId:this.linebodyId
                })
            },
            delpro(obj){
                var _this= this
                Ewin.confirm({ message: "确认要删除该项目"+obj.name+"吗？" }).on(function (e) {
                    if (!e) {
                        return;
                    }
                    _this.proNowList.forEach((item,index)=> {

                        if(item.id==obj.id){
                            _this.proNowList.splice(index,1)
                            _this.proList.splice(index,1)
                            _this.deleteObjectnowBylossid({lossId:item.id,linebodyId: _this.linebodyId})
                            _this.$refs[obj.id][0].className = ""
                        };
                    })
                })
            },
            empty(val) {
                let reg = /^\s+$/gi;
                if (reg.test(val)||val===null||val===''||val===undefined||val.length==0) {
                    return true;
                }
            },
            validateData() {
                if(this.status==2){
                    if (
                    this.empty(this.projectnumber) ||
                    this.empty(this.projectname) ||
                    this.empty(this.losscategory) ||
                    this.empty(this.status) ||
                    this.empty(this.stage) ||
                    this.empty(this.startperformance) ||
                    this.empty(this.target) ||
                    this.empty(this.performance) ||
                    this.empty(this.objectstarttime) ||
                    this.empty(this.planendtime) 
                    ) {
                        console.log("kong")
                        this.$Message.error('线体相关信息不能为空');
                        return false;
                    }
                     
                }else if(this.status!=2){
                    if (
                    this.empty(this.projectnumber) ||
                    this.empty(this.projectname) ||
                    this.empty(this.losscategory) ||
                    this.empty(this.status) ||
                    this.empty(this.startperformance) ||
                    this.empty(this.target) ||
                    this.empty(this.performance) ||
                    this.empty(this.objectstarttime) ||
                    this.empty(this.planendtime) 
                    ) {
                        console.log("kong")
                        this.$Message.error('线体相关信息不能为空');
                        return false;
                    }
                }
                return true;   
            }
        },
        watch:{
           improList(newVal){
               let _this = this;
                newVal.forEach((item,index)=>{
                    item.data.forEach(option=>{
                        this.leftId.push(option.lossid)
                    })
                })
            },
            validarea(newVal) {
                let _this = this;
                this.validareaList = []
                this.validarea.forEach(item => {
                    if (item.checked) {
                    this.validareaList.push(item)
                    }
                });
                this.validareaList.forEach(function(node) {
                    let reg = /^l/g;
                    if (reg.test(node.id)) {
                    _this.linebodyId=node.id.substring(1)
                    }
                })
                setTimeout(function(){
                    _this.showObjectnowBylinedyid({linebodyId:_this.linebodyId})
                },10)
                this.showImpItemhistory({linebodyId:this.linebodyId})
            },
            nowline(newVal){
                let _this = this;
                this.proNowList=[]
                if(newVal.length>0){
                    newVal.forEach((item)=> {
                    if(!this.arrIsContains(this.leftId,item.losstier3Lossid)){
                        _this.$refs[item.losstier3Lossid][0].className = "pro_active"
                    }
                    this.proNowList.push({id:item.losstier3Lossid,name:item.projectname,status:statusRes(item.status,this.statusResult)})
                    });
                }
                
            },
            itemstatus(newVal){
                if(newVal){
                    this.statusId = newVal.id
                    this.projectnumber = newVal.projectnumber
                    this.projectname = newVal.projectname
                    this.losscategory = newVal.losscategory
                    this.status = newVal.status
                    this.startperformance = newVal.startperformance;
                    this.target = newVal.target
                    this.performance = newVal.performance
                    this.objectstarttime = newVal.objectstarttime
                    this.planendtime = newVal.planendtime
                    this.stage = newVal.stage
                }else{
                    this.projectnumber = ''
                    this.projectname = ''
                    this.losscategory = ''
                    this.status =''
                    this.startperformance = ''
                    this.target = ''
                    this.performance = ''
                    this.objectstarttime = ''
                    this.planendtime = ''
                    this.stage = ''
                }
            },
            deleteObject(newVal){
                if(newVal.status==="0"){
                    this.$Message.success("删除成功")
                }else{
                    this.$Message.error("删除失败，请稍后再试") 
                }
            },
            status(newVal){
                if(newVal!=2){
                    this.stage=""
                }
            },
            showImpItemhistoryRes(newVal){
                if(newVal.status==="0"){
                    let arr = []
                    newVal.data.forEach(item => {
                        let stageObj = {};
                        let statusObj = {};
                        let statusResult = null
                        if (item.beforstatus == 2 || item.status == 2) {
                            if (item.beforstatus == item.status) {
                                stageObj["message"] = "项目阶段"
                                stageObj["before"] = stageRes(item.beforstage, statusResult)
                                stageObj["now"] = stageRes(item.stage, statusResult)
                                stageObj["date"] = new Date(item.createdAt).format("yyyy-MM-dd")
                                stageObj["time"] = new Date(item.createdAt).format("hh:mm")
                                arr.push(stageObj)
                            } else {
                                statusObj["message"] = "项目状态"
                                statusObj["before"] = statusRes(item.beforstatus, statusResult)
                                statusObj["now"] = statusRes(item.status, statusResult)
                                statusObj["date"] = new Date(item.createdAt).format("yyyy-MM-dd")
                                statusObj["time"] = new Date(item.createdAt).format("hh:mm")
                                arr.push(statusObj)
                                stageObj["message"] = "项目阶段"
                                stageObj["before"] = stageRes(item.beforstage, statusResult)
                                stageObj["now"] = stageRes(item.stage, statusResult)
                                stageObj["date"] = new Date(item.createdAt).format("yyyy-MM-dd")
                                stageObj["time"] = new Date(item.createdAt).format("hh:mm")
                                arr.push(stageObj)
                            }
                        }
                        if (item.beforstatus != 2 && item.status != 2) {
                            statusObj["message"] = "项目状态"
                            statusObj["before"] = statusRes(item.beforstatus, statusResult)
                            statusObj["now"] = statusRes(item.status, statusResult)
                            statusObj["date"] = new Date(item.createdAt).format("yyyy-MM-dd")
                            statusObj["time"] = new Date(item.createdAt).format("hh:mm")
                            arr.push(statusObj)
                        }

                    })
                    console.log(arr)
                    this.showLog= arr
                }

            },
            addObject(newVal){
                let _this = this;
                if(newVal.status==="0"){
                    newVal.data.forEach(item => {
                        let obj = {}
                        obj["id"] = item.losstier3Lossid
                        obj["name"] = item.projectname
                        obj["status"] = statusRes(item.status,this.statusResult)
                        this.proNowList.push(obj)
                    })
                }else if(newVal.status==="101"){
                    this.$Message.error("项目已存在请勿重复添加")
                }else{
                    this.$Message.error("添加失败请稍后再试")
                }
            }



        },
        created(){
           
        },
        mounted(){
            if (sessionStorage.getItem("userid")) {
                this.selectUserById({
                    userid: sessionStorage.getItem("userid")
                })
                this.showImpItempool({userid: sessionStorage.getItem("userid")})
                
            } else {
                console.log(this.$route);
            }
        }
	}
</script>
<style lang="scss" scoped>

</style>
