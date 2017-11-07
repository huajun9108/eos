<template>
    <div class="improvement">
        <div class="improve_content">
            <div class="project_pool">
                <span class="pro_title">项目池</span>
                <div class="pro_table">
                    <table class="table table-hover">
                        <tbody class="pro_Tbody">
                        <tr v-for="(item,idx) in improList" :key="idx">
                            <td class="text-center num" width="25%">{{item.name}}</td> 
                            <td v-for="(option,idx) in item.data">{{option.name}}</td>  
                        </tr>
                        <!-- <tr v-for="(option,idx) in improList.data" :key="idx">
                            <td @click="choose">{{option.name}}</td>

                        </tr> -->
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="project_icon">
                <span class="pro_title"></span>
                <div class="project_iconfont">
                    <i class="icon-add_add"></i>
                </div>
            </div>  
            <div class="project_now">
                <span class="pro_title">现进行项目</span>
                <div class="pro_detail">
                    <div class="pro_item">
                        <div class="sti-tbl-header">
                            <table class="table text-left">
                            <thead class="fixedThead">
                                <tr>
                                <td class="text-center" width="80%">名称</td>
                                <td width="20%">编辑</td>
                                </tr>
                            </thead>
                            </table>
                        </div>
                        <div class="sti-tbl-body">
                            <table class="table table-hover">
                            <tbody class="scrollTbody">
                            <!-- <tr  :key="idx">
                                <td class="text-center num" width="5%">{{idx+1}}</td>
                                <td width="80%" class="tier2item">{{item.name}}</td>
                                <td width="15%" class="text-right img_td" :data="item.name" >
                                    <img class="move up" src="../assets/images/move_up.png" @click="moveUp({'userId':userinfor.userid,
                                    'changeId':item.kpitwoid,'changeOrder':item.userKpitwolev.sequence,'index':idx,'changedOrder':item.userKpitwolev.sequence-1})"/>
                                    <img class="move down" src="../assets/images/move_down.png" @click="moveDown(idx,item.name)"/>
                                </td>
                            </tr> -->
                            </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="pro_itemdetail">
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
                option:""
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
            choose(e){
                console.log(e.target)
            }
            
        },
        mounted(){
            this.showImpItempool()
        }
	}
</script>
<style lang="scss" scoped>
	
</style>
