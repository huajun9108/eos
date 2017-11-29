<template>
<div class="project">
    <div class="project_now project_item">
        <span class="pro_title">现进行项目 <i class="icon-add_add project_add" @click = "pro_modal=true"></i></span>
        <div class="pro_item">
            <table class="table text-center table-hover">
            <thead class="fixedThead">
                <tr>
                    <td class="text-center pro_name" width="80%">名称</td>
                    <td class="edit" width="20%"  colspan="2">编辑</td>
                </tr>
            </thead>
            <tbody class="scrollTbody">
            <tr v-for="(item,idx) in this.proNowList" :key="idx" class="text-center"  >
                <td width="80%">{{item.name}}</td>
                <td class="icon-edit" @click = "editpro(item.id)"></td>
                <td class="icon-delete_2" @click = "delpro(item.id)"></td>
            </tr>

            <tr v-if="proNowList.length==0">
                <td colspan="3" class="text-center text-muted">
                    <p>暂无数据...</p>
                </td>
            </tr>
            </tbody>
            </table>
        </div>
    </div>
    <div class="project_detail project_item">
        <span class="pro_title">详细信息</span>
        <div class="pro_itemdetail" >
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
                    <span class="item_title">针对的损失类别</span>
                    <input v-model= "losscategory" class="item_detail" />
                </li>
                <li class="item_li">
                    <span class="item_title">项目状态</span>
                    <input v-model= "status" class="item_detail" />
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
                    <input v-model="objectstarttime" class="item_detail" />
                </li>
                <li class="item_li">
                    <span class="item_title">项目预期结束日期</span>
                    <input v-model="planendtime" class="item_detail" />
                </li>
                <li class="item_li">
                    <span class="item_title">项目阶段</span>
                    <input v-model="stage" class="item_detail" />
                </li>
            </ul>
            <div class="accountinfo_button text-right">
                <span class="button_confirm button" @click="confirm">确认</span>
                <span class="button_cancel button" @click="cancel">取消</span>
            </div>
        </div>
    </div>
    <div class="project_change project_item">
        <span class="pro_title">变更信息</span>
        <div class="pro_itemdetail" >
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
                    <span class="item_title">针对的损失类别</span>
                    <input v-model= "losscategory" class="item_detail" />
                </li>
                <li class="item_li">
                    <span class="item_title">项目状态</span>
                    <input v-model= "status" class="item_detail" />
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
                    <input v-model="objectstarttime" class="item_detail" />
                </li>
                <li class="item_li">
                    <span class="item_title">项目预期结束日期</span>
                    <input v-model="planendtime" class="item_detail" />
                </li>
                <li class="item_li">
                    <span class="item_title">项目阶段</span>
                    <input v-model="stage" class="item_detail" />
                </li>
            </ul>
            <div class="accountinfo_button text-right">
                <span class="button_confirm button" @click="confirm">确认</span>
                <span class="button_cancel button" @click="cancel">取消</span>
            </div>
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
import {mapActions,mapState} from "vuex"
	export default{
        data(){
            return{
                pro_modal:false,
                option:"",
                detailFlag:false,
                proList:[],
                isChoose:false,
                proListItem:"",
                proListId:"",
                arrlength:false,
                leftId:[],
                proNowList:[],
                projectnumber:'',
                projectname:'',
                losscategory:'',
                status:'',
                startperformance:'',
                target:'',
                performance:'',
                objectstarttime:'',
                planendtime:'',
                stage:'',
                addObjId:[],
                validareaList:[],
                linebodyId:''
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
                'validarea'
                
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
                'selectUserById'
            ]),
            ArrayBlank(arr){
                for(var i = 0 ;i<arr.length;i++){
                if(arr[i] == "" || typeof(arr[i]) == "undefined"){
                        arr.splice(i,1);
                        i= i-1;
                }
                }
                return arr;
            },
            cancel(){

            },
            confirm(){
                this.updateImpItemstatus({
                    "lossId": sessionStorage.getItem("lossId"),
                    "linebodyId": this.linebodyId,
                    "projectnumber": this.projectnumber,
                    "projectname":this.projectname,
                    "losscategory": this.losscategory,
                    "status": this.status,
                    "startperformance": this.startperformance,
                    "target": this.target,
                    "performance": this.performance,
                    "objectstarttime": this.objectstarttime,
                    "planendtime": this.planendtime,
                    "stage": this.stage,
                })

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
                console.log(this.proListItem)
                console.log(this.proListId)
                   if(this.arrIsContains(_this.proList,obj)){
                    this.proList.push(obj)
                    this.$refs[obj.id][0].className = "pro_active"
                    this.arrlength = true
                    }else{
                        console.log(1)
                    }
                console.log(this.proList)     
            },
            add_item(){
                this.proList.forEach(item=> {
                    if(this.arrIsContains(this.proNowList,item)){
                        this.proNowList.push(item)
                        this.addObjId.push(item.id)
                    }
                }, this);
                this.arrlength = false
                console.log(this.proListId)
                console.log(this.addObjId)
                this.ArrayBlank(this.addObjId)
                this.addObjectnowBylossid({
                    lossId:this.addObjId.join(","),
                    linebodyId:this.linebodyId
                })
                this.addObjId=[]
            },
            editpro(lossId){
                this.detailFlag = true
                this.showImpItemstatus({
                    lossId:lossId,
                    linebodyId:this.linebodyId
                })
                console.log(lossId);
                sessionStorage.setItem("lossId",lossId)
            },  
            delpro(idx){
                console.log(idx)
                var _this= this
                Ewin.confirm({ message: "确认要删除该项目吗？" }).on(function (e) {
                    _this.proNowList.forEach((item,index)=> {
                        if(item.id==idx){
                            _this.proNowList.splice(index,1)
                            _this.proList.splice(index,1)
                            _this.deleteObjectnowBylossid({lossId:item.id,linebodyId: _this.linebodyId})
                            _this.$refs[idx][0].className = ""
                       
                        };
                        console.log(_this.proNowList)
                        console.log(_this.proList)
                    })
                    
                })
                
            }
            
        },
        watch:{
           improList(newVal){
               let _this = this;
                this.improList.forEach((item,index)=>{
                    item.data.forEach(option=>{
                        this.leftId.push(option.lossid)
                    })
                })
               console.log(this.leftId)
            },
            validarea(newVal) {
                console.log(this.validarea);
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
                console.log(this.linebodyId);
                setTimeout(function(){
                    _this.showObjectnowBylinedyid({linebodyId:_this.linebodyId})
                },10)
            },
            nowline(){
                let _this = this;
                this.proNowList=[]
                if(this.nowline.length>0){
                    this.nowline.forEach((item)=> {
                    if(!this.arrIsContains(this.leftId,item.losstier3Lossid)){
                        _this.$refs[item.losstier3Lossid][0].className = "pro_active"
                    }   
                    this.proNowList.push({id:item.losstier3Lossid,name:item.projectname})
                    this.proList.push({id:item.losstier3Lossid,name:item.projectname})
                    });
                    console.log(this.proNowList)
                }
                
            },
            itemstatus(){
                if(this.itemstatus){
                    this.projectnumber = this.itemstatus.projectnumber
                    this.projectname = this.itemstatus.projectname
                    this.losscategory = this.itemstatus.losscategory
                    this.status = this.itemstatus.status
                    this.startperformance = this.itemstatus.startperformance;
                    this.target = this.itemstatus.target
                    this.performance = this.itemstatus.performance
                    this.objectstarttime = this.itemstatus.objectstarttime
                    this.planendtime = this.itemstatus.planendtime
                    this.stage = this.itemstatus.stage
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
                

            }
           
             
            
        },
        created(){
        },
        mounted(){
            if (sessionStorage.getItem("userid")) {
                this.selectUserById({
                    userid: sessionStorage.getItem("userid")
                })
                
            } else {
                console.log(this.$route);
            }
            let _this = this
            this.showImpItempool()
           
        }
	}
</script>
<style lang="scss" scoped>
    
</style>

