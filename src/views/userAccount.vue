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
              <tr v-for="(item,idx) in tier2" :key="idx">
                  <td class="text-center num" width="5%">{{idx+1}}</td>
                  <td width="80%" class="tier2item">{{item.name}}</td>
                  <td width="15%" class="text-right img_td" :data="item.name" >
                    <img class="move up" src="../assets/images/move_up.png" @click="moveUp({'userId':userinfor.userid,
                    'changeId':item.kpitwoid,'changeOrder':item.userKpitwolev.sequence,'index':idx,'changedOrder':item.userKpitwolev.sequence-1})"/>
                    <img class="move down" src="../assets/images/move_down.png" @click="moveDown({'userId':userinfor.userid,
                    'changeId':item.kpitwoid,'changeOrder':item.userKpitwolev.sequence,'index':idx,'changedOrder':item.userKpitwolev.sequence+1})"/>
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
  
    } 
  },
  computed:{
    ...mapState([
      "userinfor",
      "validarea",
      'updatePwdResult',
      'tier2'
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
      if(this.isShow()&&this.isNewShow()&&this.checkNew()!=0){
        this.$confirm('确认放弃之前的修改吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
             type: 'info',
            message: '已取消编辑'
          });
          this.showFlag=false;
          this.clearData()
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消编辑'
          // });  
          this.showFlag=false;  
          this.clearData()      
        })
      }else{
        this.showFlag=false;
        this.oldPwdFlag=false;
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
         this.$message.error('用户信息填写错误');
      }

    },
    moveUp(obj){
      if(obj.index == 0) { 
        alert("到顶啦！"); 
      }else{
        let changedid = this.tier2[obj.index-1].kpitwoid
        this.updateUserKpiTwolveById({
          "userId":obj.userId,
          "changeId":obj.changeId,
          "changeOrder":obj.changeOrder,
          "changedId":changedid,
          "changedOrder":obj.changedOrder

        })
        this.tier2.splice(obj.index-1,0,(this.tier2[obj.index])); 
        //删除后一项 
        this.tier2.splice(obj.index+1,1); 
        console.log(obj.changeId+","+obj.changeOrder+","+changedid+","+obj.changedOrder)
      } 
    },
    moveDown:function(obj) { 
      let changedid = this.tier2[obj.index+1].kpitwoid
      this.updateUserKpiTwolveById({
          "userId":obj.userId,
          "changeId":obj.changeId,
          "changeOrder":obj.changeOrder,
          "changedId":changedid,
          "changedOrder":obj.changedOrder

        })
    //在下一项插入该项 
    this.tier2.splice(obj.index+2,0,(this.tier2[obj.index])); 
    // 删除前一项 
    this.tier2.splice(obj.index,1); 
      if(obj.index == this.tier2.length-1) { 
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
    },
    tier2(newVal){

      
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