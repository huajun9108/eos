<template>
    <div class="improvement user_common ">
        <div class="improve_content  user_maincontent">
            <div class="project_pool">
                <span class="pro_title">项目池</span>
                <div class="pro_table">
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
                            <tr v-for="(option,index) in item.data" v-if="index!=0">
                                <td @click="choose({id:option.lossid,name:option.name})" :ref="option.lossid">{{option.name}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="project_icon">
                <span class="pro_title"></span>
                <div class="project_iconfont">
                    <i :class="this.arrlength?'icon-add_add project_add_active':'icon-add_add project_add'" @click = "add_item"></i>
                </div>
            </div> 
            <div class="project_now">
                <span class="pro_title">现进行项目</span>
                <div class="pro_detail">
                    <div class="pro_item">
                        <div class="sti-tbl-header" style="padding-right:18px">
                            <table class="table text-center">
                            <thead class="fixedThead">
                                <tr>
                                <td class="text-center" width="75%">名称</td>
                                <td width="25%"  colspan="2">编辑</td>
                                </tr>
                            </thead>
                            </table>
                        </div>
                        <div class="sti-tbl-body">
                            <table class="table table-hover">
                            <tbody class="scrollTbody">
                            <tr v-for="(item,idx) in this.proNowList" :key="idx" class="text-center"  >
                                <td width="75%">{{item.name}}</td>
                                <td class="icon-edit" @click = "editpro(item.id)"></td>
                                <td class="icon-delete_2" @click = "delpro(item.id)"></td>
                            </tr>

                            <!-- <tr v-if="proNowList.length==0">
                                <td colspan="4" class="text-center text-muted">
                                    <p>暂无数据...</p>
                                </td>
                            </tr> -->
                            </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="pro_itemdetail" v-show="detailFlag">
                        <ul class="item_det">
                            <li class="item_li">
                                <span class="item_title">状态</span>
                                <input v-model= "status" class="item_detail" />
                            </li>
                            <li class="item_li">
                                <span class="item_title">项目编号</span>
                                <input v-model= "number" class="item_detail" />
                            </li>
                            <li class="item_li">
                                <span class="item_title">项目名称</span>
                                <input v-model= "proname" class="item_detail" />
                            </li>
                            <li class="item_li">
                                <span class="item_title">所属车间</span>
                                <input v-model= "areablong" class="item_detail" />
                            </li>
                            <li class="item_li">
                                <span class="item_title">项目方法</span>
                                <input v-model="projectmethod" class="item_detail" />
                            </li>
                            <li class="item_li">
                                <span class="item_title">负责人</span>
                                <input  v-model="projectmanager" class="item_detail" />
                            </li>
                            <li class="item_li">
                                <span class="item_title">团队成员</span>
                                <input v-model="teammember" class="item_detail" />
                            </li>
                            <li class="item_li">
                                <span class="item_title">计划开始</span>
                                <input v-model="planstart" class="item_detail" />
                            </li>
                            <li class="item_li">
                                <span class="item_title">实际开始</span>
                                <input v-model="actualstart" class="item_detail" />
                            </li>
                            <li class="item_li">
                                <span class="item_title">计划结束</span>
                                <input v-model="planend" class="item_detail" />
                            </li>
                            <li class="item_li">
                                <span class="item_title">实际结束</span>
                                <input v-model="actualend" class="item_detail" />
                            </li>
                            <li class="item_li">
                                <span class="item_title">目标</span>
                                <input v-model="target" class="item_detail" />
                            </li>
                            <li class="item_li">
                                <span class="item_title">当前值</span>
                                <input v-model="actualvalue" class="item_detail" />
                            </li>

                        </ul>
                        <div class="accountinfo_button text-right">
                            <span class="button_confirm button" @click="confirm">确认</span>
                            <span class="button_cancel button" @click="cancel">取消</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	import {mapActions,mapState} from "vuex"
	export default{
        data(){
            return{
                option:"",
                detailFlag:false,
                proList:[],
                isChoose:false,
                proListItem:"",
                proListId:"",
                arrlength:false,
                leftId:[],
                proNowList:[],
                status:'',
                number:'',
                proname:'',
                areablong:'',
                projectmethod:'',
                projectmanager:'',
                teammember:'',
                planstart:'',
                actualstart:'',
                planend:'',
                actualend:'',
                target:'',
                actualvalue:''
            }
                
        },
		computed:{
			...mapState([
                'improList',
                'nowline',
                'itemstatus',
                'updateItemResult'
				
			])
		},
        methods:{
            ...mapActions([
                'showImpItempool',
                'showObjectnowBylinedyid',
                'showImpItemstatus',
                'updateImpItemstatus'
            ]),
            cancel(){

            },
            confirm(){
                this.updateImpItemstatus({
                    "lossId": sessionStorage.getItem("lossId"),
                    "status": this.status,
                    "projectNumber":this.number,
                    "projectName": this.proname,
                    "areaBlong": this.areablong,
                    "projectMethod": this.projectmethod,
                    "projectManager": this.projectmanager,
                    "teamMember": this.teammember,
                    "planStart": this.planstart,
                    "actualStart": this.actualstart,
                    "planEnd": this.planend,
                    "actualEnd": this.actualend,
                    "target":this.target,
                    "actualValue": this.actualvalue
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
                    }
                }, this);
                this.arrlength = false
            },
            editpro(lossId){
                this.detailFlag = true
                this.showImpItemstatus({
                    lossId:lossId
                })
                console.log(lossId);
                sessionStorage.setItem("lossId",lossId)
            },  
            delpro(idx){
                console.log(idx)
                this.proNowList.forEach((item,index)=> {
                    if(item.id==idx){
                        this.proNowList.splice(index,1)
                        this.proList.splice(index,1)
                    }
                }, this);
               
                this.$refs[idx][0].className = ""
                console.log(this.proNowList)
                console.log(this.proList)
            }
            
        },
        watch:{
           improList(){
               let _this = this;
                this.improList.forEach((item,index)=>{
                    item.data.forEach(option=>{
                        this.leftId.push(option.lossid)
                    })
                })
                this.nowline.forEach((item)=> {
                    if(!this.arrIsContains(this.leftId,item.losscategoryLossid)){
                       
                        setTimeout(function() {
                            _this.$refs[item.losscategoryLossid][0].className = "pro_active"
                            // _this.proList=this.nowLine
                        }, 800);
                        
                    }
                });
               console.log(this.leftId)
            },
            nowline(){
                this.nowline.forEach((item)=> {
                    this.proNowList.push({id:item.objectid,name:item.name})
                    this.proList.push({id:item.objectid,name:item.name})
                }, this);
                console.log(this.proNowList)
            },
            itemstatus(){
                if(this.itemstatus){
                    this.status = this.itemstatus.status
                    this.number = this.itemstatus.projectnumber
                    this.proname = this.itemstatus.projectname
                    this.areablong = this.itemstatus.areablong
                    this.projectmethod = this.itemstatus.projectmethod;
                    this.projectmanager = this.itemstatus.projectmanager
                    this.teammember = this.itemstatus.teammember
                    this.planstart = this.itemstatus.planstart
                    this.actualstart = this.itemstatus.actualstart
                    this.planend = this.itemstatus.planend
                    this.actualend = this.itemstatus.actualend
                    this.target = this.itemstatus.target
                    this.actualvalue = this.itemstatus.actualvalue
                }else{
                    this.status = ''
                    this.number = ''
                    this.proname = ''
                    this.areablong ='' 
                    this.projectmethod = '' 
                    this.projectmanager = ''
                    this.teammember = ''
                    this.planstart = ''
                    this.actualstart = '' 
                    this.planend = ''
                    this.actualend = '' 
                    this.target = ''
                    this.actualvalue = '' 
                }
                

            }
           
             
            
        },
        created(){
            
            
            // console.log(this.proList)
        },
        mounted(){
            this.showImpItempool()
            this.showObjectnowBylinedyid()
            console.log((this.nowline) instanceof Array)
            
           
        }
	}
</script>
<style lang="scss" scoped>
	
</style>
