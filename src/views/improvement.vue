<template>
    <div class="improvement">
        <div class="improve_content">
            <div class="project_pool">
                <span class="pro_title">项目池</span>
                <div class="pro_table">
                    <table class="table table-hover text-center">
                        <tbody class="pro_Tbody" v-for="(item,idx) in improList" :key="idx">
                            <tr v-if="item.data.length>0">
                                <td :rowspan="item.data.length">{{item.name}}</td>
                                <td @click="choose">{{item.data[0].name}}</td>
                            </tr>
                            <tr v-if="item.data.length==0">
                                <td>{{item.name}}</td>
                                <td></td>
                            </tr>
                            <tr v-for="(option,index) in item.data" v-if="index!=0">
                                <td @click="choose">{{option.name}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="project_icon">
                <span class="pro_title"></span>
                <div class="project_iconfont">
                    <i class="icon-add_add" @click = "add_item"></i>
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
                                <td width="75%">{{item}}</td>
                                <td class="icon-edit" @click = "editpro"></td>
                                <td class="icon-delete_2" @click = "delpro"></td>
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
                    <div class="pro_itemdetail" v-show="detailFlag">
                        <ul class="item_det">
                            <li class="item_li">
                                <span class="item_title">状态</span>
                                <span class="item_detail"></span>
                            </li>
                            <li class="item_li">
                                <span class="item_title">项目编号</span>
                                <span class="item_detail"></span>
                            </li>
                            <li class="item_li">
                                <span class="item_title">项目名称</span>
                                <span class="item_detail"></span>
                            </li>
                            <li class="item_li">
                                <span class="item_title">所属车间</span>
                                <span class="item_detail"></span>
                            </li>
                            <li class="item_li">
                                <span class="item_title">项目方法</span>
                                <span class="item_detail"></span>
                            </li>
                            <li class="item_li">
                                <span class="item_title">负责人</span>
                                <span class="item_detail"></span>
                            </li>
                            <li class="item_li">
                                <span class="item_title">团队成员</span>
                                <span class="item_detail"></span>
                            </li>
                            <li class="item_li">
                                <span class="item_title">计划开始</span>
                                <span class="item_detail"></span>
                            </li>
                            <li class="item_li">
                                <span class="item_title">实际开始</span>
                                <span class="item_detail"></span>
                            </li>
                            <li class="item_li">
                                <span class="item_title">计划结束</span>
                                <span class="item_detail"></span>
                            </li>
                            <li class="item_li">
                                <span class="item_title">实际结束</span>
                                <span class="item_detail"></span>
                            </li>
                            <li class="item_li">
                                <span class="item_title">目标</span>
                                <span class="item_detail"></span>
                            </li>
                             <li class="item_li">
                                <span class="item_title">当前值</span>
                                <span class="item_detail"></span>
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
                proNowList:[],
                isChoose:false,
            }
        },
		computed:{
			...mapState([
                'improList'
				
			])
		},
        methods:{
            ...mapActions([
                'showImpItempool'
            ]),
            cancel(){

            },
            confirm(){

            },
            arrIsContains(arr, obj) {  
                var i = arr.length;  
                while (i--) {  
                    if (arr[i] === obj) {  
                        return true;  
                    }  
                }  
                return false;  
            },
            choose($event){
                var _this = this;
                var pro = $event.currentTarget.innerHTML
                
                if(!this.arrIsContains(this.proList,pro)){
                    this.proList.push(pro)
                    $event.currentTarget.className = "pro_active"
                }else{
        
                }
              
                 
                
            },
            add_item(){
                 var _this = this;
                console.log(1)
                this.proNowList=this.proList;
            },
            editpro(){
                this.detailFlag = true
            },
            delpro(){
                this.proNowList.splice(this.idx, 1);
                this.proList = this.proNowList
                console.log(this.proList)
            }
            
        },
        mounted(){
            this.showImpItempool()
        }
	}
</script>
<style lang="scss" scoped>
	
</style>
