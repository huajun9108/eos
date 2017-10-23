<template>
<div class="accountinfo_container">
  <div class="accountinfo_interface">
    <br>
    <div class="accountinfo_title">
      <span>帐户设置</span>
      <hr>
    </div>

    <div class="accountinfo_setting">
      <div class="setting_left">
        <div class="accountinfo_username">
          <i class="icon-User-name"></i>
          <input class="input_accountinfo" type="text" :value="user ? user.username : ''" placeholder="用户名" ref="name">
          <hr>
        </div>
				<div class="accountinfo_name">
          <i class="icon-User-name"></i>
          <input class="input_accountinfo" type="text"  :value="user ? user.userabbname : ''" placeholder="姓名" ref="abbname">
          <hr>
        </div>
        <div class="accountinfo_password">
          <i class="icon-password"></i>
          <input class="input_accountinfo" type="text" :value="user ? user.userpsd : ''" placeholder="密码" ref="pwd">
          <hr>
        </div>
        <div class="accountinfo_position">
          <i class="icon-position"></i>
          <input class="input_accountinfo" type="text"  :value="user? user.userjob : ''" placeholder="职位"  ref="job">
          <hr>
        </div>
        <div class="accountinfo_boss dropdown">
          <i class="icon-superior"></i>
          <input class="input_accountinfo" type="text"  :value="user? user.userleader : ''" placeholder="直线上司"  ref="leader">
          <hr>
        </div>
        <div class="accountinfo_effectivemenu">
          <i class="icon-Effective-menu"></i>
          <div class="menu_container">
            <div class="menu_title">
              有效菜单
            </div>
            <div class="menu_option">
              <div class="input_menuoption" v-for="(city,idx) in showList" :key="idx">
                  <input type="checkbox" :id="city.name" :value="city.name" v-model="checkLists">
                  <label :for="city.name" >{{city.name}}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accountinfo_areacontainer">
        <div class="visablearea_title">
          <i class="icon-Viewing-area"></i>
          可视区域范围
        </div>
        <ul id="treeDemo" class="ztree"></ul>
      </div>
      </div>
      <div class="accountinfo_button text-right">
          <span class="button_confirm" @click="userExist">确认</span>
          <span class="button_cancel">取消</span>
      </div>
  </div>

</div>
</template>

<script type="text/javascript">

import axios from "axios"
import qs from 'qs'

import {mapState,mapActions} from "vuex";
import Bottom from "../components/bottom.vue";
import "../assets/js/jquery-1.4.4.min.js"

import "../assets/js/jquery.ztree.core.js"
import "../assets/js/jquery.ztree.excheck.js"
import "../assets/js/jquery.ztree.exedit.js"

var newCount = 1;

var cityListTwo = [
			{name:"overview",value:"overview"},
			{name:"saving book",value:"saving book"},
			{name:"performance",value:"performance"},
			{name:"data input",value:"data input"},
			{name:"target",value:"target"},
      {name:"account",value:"account"},
			{name:"loss mapping",value:"loss mapping"},
			{name:"improvement project",value:"improvement project"},
		];
    export default {
        components:{
            ebottom:Bottom
        },
        data(){
            return{
								user:"",
                checkLists:"",
                showList:cityListTwo,
                setting: {
          				view: {
          					addHoverDom: this.addHoverDom,
          					removeHoverDom: this.removeHoverDom,
          					selectedMulti: false
          				},
          				data: {
          					simpleData: {
          						enable: true
          					}
          				},
                  check: {
                    enable: true,
                    chkStyle: 'checkbox',
                    radioType: "level"
                  },
          				edit: {
          					enable: true
          				}
          			},
          			zNodes: [{
          					id: 1,
          					pId: 0,
          					name: "pNode 1",
          					open: true
          				},
          				{
          					id: 11,
          					pId: 1,
          					name: "pNode 11"
          				},
          				{
          					id: 111,
          					pId: 11,
          					name: " sNode 111"
          				},
          				{
          					id: 112,
          					pId: 11,
          					name: "sNode 112"
          				},
          				{
          					id: 113,
          					pId: 11,
          					name: "sNode 113"
          				},
          				{
          					id: 114,
          					pId: 11,
          					name: "sNode 114"
          				},
          				{
          					id: 12,
          					pId: 1,
          					name: "pNode 12"
          				},
          				{
          					id: 121,
          					pId: 12,
          					name: "sNode 121"
          				},
          				{
          					id: 122,
          					pId: 12,
          					name: "sNode 122"
          				},
          				{
          					id: 123,
          					pId: 12,
          					name: "sNode 123"
          				},
          				{
          					id: 124,
          					pId: 12,
          					name: "sNode 124"
          				},
          				{
          					id: 13,
          					pId: 1,
          					name: "pNode 13",
          					isParent: true
          				},
          				{
          					id: 2,
          					pId: 0,
          					name: "pNode 2"
          				},
          				{
          					id: 21,
          					pId: 2,
          					name: "pNode 21",
          					open: true
          				},
          				{
          					id: 211,
          					pId: 21,
          					name: "sNode 211"
          				},
          				{
          					id: 212,
          					pId: 21,
          					name: "sNode 212"
          				},
          				{
          					id: 213,
          					pId: 21,
          					name: "sNode 213"
          				},
          				{
          					id: 214,
          					pId: 21,
          					name: "sNode 214"
          				},
          				{
          					id: 22,
          					pId: 2,
          					name: "pNode 22"
          				},
          				{
          					id: 221,
          					pId: 22,
          					name: "sNode 221"
          				},
          				{
          					id: 222,
          					pId: 22,
          					name: "sNode 222"
          				},
          				{
          					id: 223,
          					pId: 22,
          					name: "sNode 223"
          				},
          				{
          					id: 224,
          					pId: 22,
          					name: "sNode 224"
          				},
          				{
          					id: 23,
          					pId: 2,
          					name: "pNode 23"
          				},
          				{
          					id: 231,
          					pId: 23,
          					name: "sNode 231"
          				},
          				{
          					id: 232,
          					pId: 23,
          					name: "sNode 232"
          				},
          				{
          					id: 233,
          					pId: 23,
          					name: "sNode 233"
          				},
          				{
          					id: 234,
          					pId: 23,
          					name: "sNode 234"
          				},
          				{
          					id: 3,
          					pId: 0,
          					name: "pNode 3",
          					isParent: true
          				}
          			],
            }
        },
        computed:{
            ...mapState([
                ])
        },
        methods:{
					
        ...mapActions([
					]),
					empty(val){
            var reg= /^\s+$/gi;
            if (reg.test(val ) || val.length==0) {
                return true;
            };
        	},
          addHoverDom: function(treeId, treeNode) {
      			var sObj = $("#" + treeNode.tId + "_span");
      			if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
      			var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
      				"' title='add node' onfocus='this.blur();'></span>";
      			sObj.after(addStr);
      			var btn = $("#addBtn_" + treeNode.tId);
      			if (btn) btn.bind("click", function() {
      				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
      				zTree.addNodes(treeNode, {
      					id: (100 + newCount),
      					pId: treeNode.id,
      					name: "new node" + (newCount++)
      				});
      				return false;
      			});
      		},
      		removeHoverDom: function(treeId, treeNode) {
      			$("#addBtn_" + treeNode.tId).unbind().remove();
					},
					userExist(){
							var username = this.$refs.name.value;
							var abbname = this.$refs.abbname.value;
							var pwd = this.$refs.pwd.value;
							var job = this.$refs.job.value;
							var leader = this.$refs.leader.value;
							if(this.$route.query.userid){
								this.update({
									"userId":this.$route.query.userid,
									"userName": username,
									"userPsd": pwd,
									"userAbbName":abbname,
									"userJob":job,
									"userLeader":leader})
							}else{

								this.confirmClick({
									"userName": username,
									"userPsd": pwd,
									"userAbbName":abbname,
									"userJob":job,
									"userLeader":leader})
							}
					},
					update(obj) {
							var username = this.$refs.name.value;
							var abbname = this.$refs.abbname.value;
							var pwd = this.$refs.pwd.value;
							var job = this.$refs.job.value;
							var leader = this.$refs.leader.value;
						if(this.empty(username)||this.empty(abbname)||this.empty(pwd)||this.empty(job)){
							alert("输入不能为空")
						}else{
								axios.post("/user/updateUserById ",qs.stringify({
									"userId":obj.userId,
									"userName":  obj.userName,
									"userPsd": obj.userPsd,
									"userAbbName":obj.userAbbName,
									"userJob":obj.userJob,
									"userLeader":obj.userLeader
							})
							).then(res=>{
										console.log(res.data)
										return res.data
							}).catch(error=>{
								console.log(error);
				
							})
						}

					},
          confirmClick(obj){
							var username = this.$refs.name.value;
							var abbname = this.$refs.abbname.value;
							var pwd = this.$refs.pwd.value;
							var job = this.$refs.job.value;
							var leader = this.$refs.leader.value;
						if(this.empty(name)||this.empty(username)||this.empty(name)||this.empty(username)){
							alert("输入不能为空")
						}else{
							axios.post("/user/addUserOne",qs.stringify({
            	"userName": obj.userName,
							"userPsd": obj.userPsd,
							"userAbbName":obj.userAbbName,
							"userJob":obj.userJob,
							"userLeader":obj.userLeader
						
        		})
       	 		).then(res=>{
                console.log(res.data)
                return res.data
        		}).catch(error=>{
            	console.log(error);
    
        		})

						}
						

          }
    },
    watch:{
 
    },

    mounted(){
			 
			if(this.$route.query.userid){
				axios.post("/user/selectUserById ",qs.stringify({
            "userId":this.$route.query.userid,
        })
        ).then(res=>{
            console.log(res.data.data)
            return this.user=res.data.data
        }).catch(error=>{
            console.log(error);
        })
			}else{
				this.user=""
			}
        
        $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
    }
}
</script>
<style lang="scss" scoped>



</style>
