<template>
    <div class="account user_common">
      <div class="account_content user_maincontent">
      <div class="userinfor acommon">
        <h1>个人信息</h1>
        <div class="info-content">
        <div class="information">
          <div class="tip">
              <span class="bef">用户名</span><span class="in">{{userinfor.username}}</span>
          </div>
          <div class="tip pwd">
             <span class="bef">密码</span><input type="password" v-model="userinfor.userpsd" ref="user" class="in" readonly/>
            <div class="img" @click="showFlag=true">
               <img src="../assets/images/edit .png">
            </div>
            <div v-if="showFlag" class="showbox">
            <div class="oldpwd">
              <span>原密码</span><input class="in" type="password" placeholder="请输入当前密码" @blur="isShow" v-model="oldPwd" @focus="oldPwdFlag=false">
              <span class="pwdtip" v-if="oldPwdFlag">
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
          <table class="table table-hover text-left">
            <thead>
              <tr>
                <td class="text-center" width="5%">编号</td>
                <td width="95%" colspan="2">参数</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,idx) in this.tier2List" :key="idx">
                <td class="text-center num" width="5%">{{idx+1}}</td>
                <td width="80%" class="tier2item">{{item.name}}</td>
                <td width="15%" class="text-center img_td" :data="item.name" >
                  <div class="move_click">
                    <img class="move up" src="../assets/images/move_up.png" @click="moveUp({'userId':userinfor.userid,
                    'changeId':item.kpitwoid,'changeOrder':item.userKpitwolev.sequence,'index':idx})"/>
                    <img class="move down" src="../assets/images/move_down.png" @click="moveDown({'userId':userinfor.userid,
                    'changeId':item.kpitwoid,'changeOrder':item.userKpitwolev.sequence,'index':idx})"/>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
      tier2List:null
    } 
  },
  computed:{
    ...mapState([
      "userinfor",
      "validarea",
      'updatePwdResult',
      'tier2',
      'updateUserKpiTwolveByIdRes'
      ])
  },
  methods: {
    ...mapActions([
      "selectUserById",
      'updateUserPsdById',
      'updateUserKpiTwolveById'
    ]),
    show(tip){
      if(tip){
        return true
      }else{
        return false
      }
    },
    isShow(){
      if(this.show(this.oldPwd)){
        this.oldPwdFlag=false
        return true
      }else{
        this.oldPwdFlag=true
        return false
      }
    },
    isNewShow(){
      if(this.show(this.newPwd)){
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
    clearData(){
      this.oldPwd='';
      this.newPwd='';
      this.newPwdCheck=''
    },
    cancel(){
      let _this = this
      if(this.isShow()&&this.isNewShow()&&this.checkNew()!=0){
        Ewin.confirm({message:'确认要取消编辑吗？'}).on(function(e){
          _this.$Message.info('已取消编辑');
          _this.showFlag=false;
          _this.clearData()
        })    
      }else{
        _this.showFlag=false;
        _this.oldPwdFlag=false;
        _this.newPwdFlag = false
        _this.checkPwd = false;
        _this.clearData()
      }
    },
    confirm(){
      if(this.isShow()&&this.isNewShow()&&this.checkNew()){
        this.updateUserPsdById({
          userId:this.userinfor.userid,
          userPsd:this.oldPwd,
          userNewPsd:this.newPwdCheck
        })
        this.clearData()
      }else{
         this.$Message.error('用户信息填写错误');
      }

    },
    moveUp(obj){
      if(obj.index == 0) { 
        this.$Message.warning("到顶啦！"); 
      }else{
        let changedid = this.tier2List[obj.index-1].kpitwoid
        let changedOrder = this.tier2List[obj.index-1].userKpitwolev.sequence
        this.updateUserKpiTwolveById({
          "userId":obj.userId,
          "changeId":obj.changeId,
          "changeOrder":obj.changeOrder,
          "changedId":changedid,
          "changedOrder":changedOrder

        })
        // this.tier2.splice(obj.index-1,0,(this.tier2[obj.index])); 
        // //删除后一项 
        // this.tier2.splice(obj.index+1,1); 
        // console.log(obj.changeId+","+obj.changeOrder+","+changedid+","+obj.changedOrder)
      } 
    },
    moveDown:function(obj) { 
      if(obj.index == this.tier2.length-1) { 
        this.$Message.warning("已经是最后一项啦！"); 
        return
      }
      let changedid = this.tier2List[obj.index+1].kpitwoid
      let changedOrder = this.tier2List[obj.index+1].userKpitwolev.sequence
      this.updateUserKpiTwolveById({
          "userId":obj.userId,
          "changeId":obj.changeId,
          "changeOrder":obj.changeOrder,
          "changedId":changedid,
          "changedOrder":changedOrder

        })
    //在下一项插入该项 
    // this.tier2.splice(obj.index+2,0,(this.tier2[obj.index])); 
    // // 删除前一项 
    // this.tier2.splice(obj.index,1); 
    }
    
  },
  watch: {
    validarea(newVal){
      this.validareaList=[]
      this.validarea.forEach(item=> {
        if(item.checked){
        this.validareaList.push(item)
        }
      });
      $.fn.zTree.init($("#treeDemo"), this.setting, this.validareaList);
    },
    updatePwdResult(newVal){
      if(newVal.status==2){
        this.$Message.error('原密码输入不一致');
      }else if(newVal.status==0){
        this.$Message.success('密码修改成功');
        this.showFlag = false
      }
    },
    updateUserKpiTwolveByIdRes(newVal){
      if(newVal.status=="0"){
        this.tier2List = newVal.data
        this.$Message.success('顺序修改成功');
      }else{
        this.$Message.error('顺序修改失败，请稍后再试');
      }
    },
    tier2(newVal){
      this.tier2List = newVal
    }
  },
  mounted() {
    if (sessionStorage.getItem("userid")) {
      this.selectUserById({userid:sessionStorage.getItem("userid")})
    } else {
      console.log(this.$route);
    }
  }
  
}
</script> 