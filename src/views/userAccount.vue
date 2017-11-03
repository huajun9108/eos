<template>
    <div class="account">
      <div class="userinfor acommon">
        <h1>个人信息</h1>
        <div class="info-content">
        <div class="information">
          <div class="tip">
              <span class="bef">用户名</span><span class="in">{{userinfor.username}}</span>
          </div>
          <div class="tip pwd">
             <span class="bef">密码</span><input type="password" v-model="userinfor.userpsd" ref="user" class="in" @focus="showFlag=true"/>
            <div class="img" @click="showFlag=!showFlag">
               <img src="../assets/images/edit .png">
            </div>
            <div v-show="showFlag" class="showbox">
            <div class="oldpwd">
              <span>原密码</span><input class="in" type="password" placeholder="请输入当前密码" @blur="isShow" v-model="oldPwd" @focus="oldPwdFlag=false">
              <span class="pwdtip" v-show="oldPwdFlag">
                <i class="icon-hint"></i>
                密码不能为空
              </span>
            </div>
            <div class="newpwd">
             <span>新密码</span><input type="password" placeholder="请输入新密码" class="in"  v-model="newPwd" @blur="isNewShow" @focus="newPwdFlag=false"/>
             <span class="pwdtip" v-show="newPwdFlag">
                <i class="icon-hint"></i>
                密码不能为空
              </span>
            </div>
            <div class="confirm_pwd">
              <span>确认密码</span><input type="password" class="in" placeholder="请再次输入新密码" v-model="newPwdCheck" @blur="checkNew">
              <span class="pwdtip" v-show="checkPwd">
                <i class="icon-hint"></i>
                两次输入密码不一致
              </span>
            </div>
            <span class="pwdButton cancel" @click="cancel">取消</span><span class="pwdButton confirm" @click="confirm">确定</span>
          </div>
          </div>
          <div class="tip">
              <span class="bef">职位</span><span class="in">{{userinfor.userjob}}</span>
          </div>
          <div class="tip">
              <span class="bef">直线上司</span><span class="in">{{userinfor.userleader?userinfor.userleader:"无"}}</span>
          </div>
          
        </div>
        <div class="area">
          <div class="title">
            <span>可视区域</span>
          </div>
          <div class="tree">
            <ul id="treeDemo" class="ztree"></ul>
          </div>
        </div>
        </div>
      </div>
      <div class="lan acommon">
        <h1>语言偏好</h1>
        <div class="info-content">
        <div class="information laninfo">
          <div class="tip">
            <span class="bef">中文/英文</span>
            <div class="wrap">
            <my-switch size="lg" v-model="toggle" open-name	="CN" close-name="EN" ></my-switch>
            </div>
        </div>
      </div>
      </div>
    </div>
    <div class="tier2 acommon">
        <h1>Tier2参数顺序</h1>
        <div class="sti-tbl-container">
          <div class="sti-tbl-header" style="padding-right:45px;">
            <table class="table text-left">
              <thead class="fixedThead">
                <tr>
                  <td class="text-center" width="5%">编号</td>
                  <td width="95%" colspan="3">参数</td>
                </tr>
              </thead>
            </table>
          </div>
          <div class="sti-tbl-body">
            <table class="table table-hover">
            <tbody class="scrollTbody">
              <tr v-for="(item,idx) in tier2List" :key="idx">
                  <td class="text-center num" width="5%">{{idx+1}}</td>
                  <td width="80%" class="tier2item">{{item.tier2}}</td>
                  <td width="15%" class="text-right img_td" :data="item.userid" >
                    <img class="move up" src="../assets/images/move_up.png" @click="moveUp(idx,item.tier2)"/>
                    <img class="move down" src="../assets/images/move_down.png" @click="moveDown(idx,item.tier2)"/>
                  </td>
              </tr>
            </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
</template>
<script type="text/javascript">
import mySwitch from 'vue-switch/switch-2.vue';
import { mapState, mapActions } from "vuex";
export default {
  components: {
    'my-switch': mySwitch
  },
  data(){
    return{
      newPwdCheck:'',
      newPwd:'',
      checkPwd:false,
      oldPwd:'',
      oldPwdFlag:false,
      newPwdFlag:false,
      showFlag:false,
      toggle: true,
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
      },
      validareaList:[],
      tier2List: [{
					"number": 1,
					"Tier1": "Packaging",
					"tier2": "Volume"
				},
				{
					"number": 2,
					"Tier1": "Consumables",
					"tier2": "OEE"
				},
				{
					"number": 3,
					"Tier1": "Fluids",
					"tier2": "MatEff"
				},
				{
					"number": 4,
					"Tier1": "Maintenance",
					"tier2": "MaintCosts"
				},
				{
					"number": 5,
					"Tier1": "Subcontractors",
					"tier2": "SubCost"
				},
				{
					"number": 6,
					"Tier1": "Logistic",
					"tier2": "LogCost"
				},
				{
					"number": 7,
					"Tier1": "inventory Losses",
					"tier2": "invLoss"
				},
				{
					"number": 8,
					"Tier1": "Logistic Efficiency",
					"tier2": "LogEff"
				},
				{
					"number": 9,
					"Tier1": "Transport",
					"tier2": "Fillln"
				},
				{
					"number": 10,
					"Tier1": "Administration",
					"tier2": "AdmEff"
				},
				{
					"number": 11,
					"Tier1": "indirect Staff",
					"tier2": "indStaff"
				},
				{
					"number": 12,
					"Tier1": "Quality",
					"tier2": "QuaEff"
				},
				{
					"number": 13,
					"Tier1": "Internal CoNQ",
					"tier2": "intCoNQ"
				},
				{
					"number": 14,
					"Tier1": "Others",
					"tier2": "OthCost"
				},
				{
					"number": 15,
					"Tier1": "External CoNQ",
					"tier2": "ExtCoNQ"
				},
			],
    } 
  },
  computed:{
    ...mapState([
      "userinfor",
      "validarea",
      'updatePwdResult'
      ])
  },
  methods: {
    ...mapActions([
      "selectUserById",
      'updateUserPsdById'
    ]),
    fun(){
      alert()
    },
    show(obj){
      if(obj.option){
        obj.flag=false
        // return true
      }else{
        obj.flag=true
        // return false
      }
    },
    isShow(){
      var _this=this
      _this.show({option:_this.oldPwd,flag:_this.oldPwdFlag})
    },
    isNewShow(){
      if(this.newPwd){
        this.newPwdFlag=false
        return true
      }else{
        this.newPwdFlag=true
        return false
      }
    },
    checkNew(){
      if(this.newPwd==this.newPwdCheck){
        this.checkPwd=false
        return true
      }else{
        this.checkPwd=true
        return false
      }
    },
    cancel(){

    },
    confirm(){
      if(this.isShow()&&this.isNewShow()&&this.checkNew()){
        this.updateUserPsdById({
          userId:this.userinfor.userid,
          userPsd:this.oldPwd,
          userNewPsd:this.newPwdCheck
        })
        console.log(this.oldPwd+"--"+this.newPwd+"--"+this.newPwdCheck)
      }else{
        alert("false")
      }

    },
    moveUp(idex,item){
      this.tier2List.splice(idex-1,0,(this.tier2List[idex])); 
      //删除后一项 
      this.tier2List.splice(idex+1,1); 
      if(idex == 0) { 
        alert("到顶啦！"); 
      } 
    },
    moveDown:function(index,item) { 
    //在下一项插入该项 
    this.tier2List.splice(index+2,0,(this.tier2List[index])); 
    // 删除前一项 
    this.tier2List.splice(index,1); 
      if(index == this.tier2List.length-1) { 
        alert("已经是最后一项啦！"); 
      } 
    }
    
  },
  watch: {
     validarea(newVal){
        this.validarea.forEach(item=> {
         if(item.checked){
          this.validareaList.push(item)
         }
       });
       $.fn.zTree.init($("#treeDemo"), this.setting, this.validareaList);
    },
    updatePwdResult(newVal){
      if(newVal.status==2){
          this.$message.error('原密码输入不一致');
      }else if(newVal.status==0){
          this.$message.success('密码修改成功');
          this.showFlag = false
      }
    }
  },
  mounted() {
    if (sessionStorage.getItem("userid")) {
      this.selectUserById({userid:sessionStorage.getItem("userid")})
      //  $.fn.zTree.init($("#treeDemo"), this.setting, this.validarea);
    } else {
      console.log(this.$route);
      // this.selectAreaAll();
      // $.fn.zTree.init($("#treeDemo"), this.setting, this.areaAll);
    }
  }
  
}
</script> 