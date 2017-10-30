<template>
<div class="accountinfo_container">
  <div class="accountinfo_interface">
    <div class="accountinfo_title">
      <span>帐户设置</span>
    </div>

    <div class="accountinfo_setting">
      <div class="setting_left">
        <div class="accountinfo_username accountinfo">
          <i class="icon-User-name"></i>
          <!-- <input type="hidden" value=> -->
          <input class="input_accountinfo" type="text" v-model="name" placeholder="用户名" ref="name">
        </div>
				<div class="accountinfo_name accountinfo">
          <i class="icon-User-name"></i>
          <input class="input_accountinfo" type="text" v-model="abbname"  placeholder="姓名" ref="abbname">
        </div>
        <div class="accountinfo_password accountinfo">
          <i class="icon-password"></i>
          <input class="input_accountinfo" type="text" v-model="pwd" placeholder="密码" ref="pwd">
        </div>
        <div class="accountinfo_position accountinfo">
          <i class="icon-position"></i>
          <input class="input_accountinfo" type="text" v-model="job"  placeholder="职位"  ref="job">
        </div>
        <div class="accountinfo_boss dropdown accountinfo">
          <i class="icon-superior"></i>
          <input class="input_accountinfo" type="text" v-model="leader"  placeholder="直线上司"  ref="leader">
        </div>
        <div class="accountinfo_effectivemenu">
          <i class="icon-Effective-menu"></i>
          <div class="menu_container">
            <div class="menu_title">
              有效菜单
            </div>
            <div class="menu_option">
              <div class="input_menuoption" v-for='(option,index) in validmenuList' :key="index">
                  <input  v-model="postOptions" :value="option.validmenuid" :id='"menu"+index' type="checkbox" class="mycheck">
                  <label :for='"menu"+index' v-text='option.name' ></label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accountinfo_areacontainer">
        <div class="visablearea_title">
          <span><i class="icon-Viewing-area"></i>可视区域范围</span>
        </div>
        <div class="visablearea_tree">
          <ul id="treeDemo" class="ztree"></ul>
        </div>

      </div>
      </div>
      <div class="accountinfo_button text-right">
          <input  v-model="continueAdd" id='continueCheck' :checked="this.check" type="checkbox" class="mycheck">
          <label v-show = "flag" for='continueCheck' >连续添加</label>
          <span class="button_confirm button" @click="confirm">确认</span>
          <span class="button_cancel button" @click="cancel">取消</span>
      </div>
  </div>

</div>
</template>

<script type="text/javascript">
import axios from "axios";
import qs from "qs";

import { mapState, mapActions } from "vuex";
import Bottom from "../components/bottom.vue";
import "../assets/js/jquery-1.4.4.min.js";
import "../assets/js/jquery.ztree.core.js";
import "../assets/js/jquery.ztree.excheck.js";
import "../assets/js/jquery.ztree.exedit.js";
export default {
  created: function(){
    this.getOptions()
  },
  components: {
    ebottom: Bottom
  },
  data() {
    return {
      flag:false,
      check:false,
      continueAdd:"",
      name:"",
      abbname:'',
      job:'',
      pwd:'',
      leader:'',
      postOptions:[],           // 初渲染所有选项
      post:null    ,    // 提交选项也是已选中选项
      checkLists: "",
      settingNewConstruction: {
        async: {
          enable: true,
          type: 'get',
          url: 'http://116.196.113.167:3001/areaAllSet/showAreaAll',
        },
        view: {
          // addHoverDom: this.addHoverDom,
          // removeHoverDom: this.removeHoverDom,
          selectedMulti: false,
          showIcon: false,
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        check: {
          enable: true,
          chkStyle: "checkbox",
          radioType: "level"
        },
        // edit: {
        //   enable: true
        // }
      },
      settingEdit: {
        view: {
          selectedMulti: false,
          showIcon: false,
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        check: {
          enable: true,
          chkStyle: "checkbox",
          radioType: "level"
        },
      },
    };
  },
  computed: {
    ...mapState([
      "userinfor",
      "validmenu",
      "validmenuList",
      "areaAll",
      "validarea",
      "addResult"
    ])
  },
  methods: {
    ...mapActions(["addUser", "updateUserById","selectUserById","selectAreaAll"]),
    empty(val) {
      var reg = /^\s+$/gi;
      if (reg.test(val) || val.length == 0) {
        return true;
      }
    },
    getOptions(){
      var _this = this;
      if(this.$route.query.userid){
         _this.options = this.validmenuList;
        this.postOptions =this.validmenu.split(',');
      }else{
        this.postOptions =[];
      }


    },
    ArrayBlank(arr){
        for(var i = 0 ;i<arr.length;i++){
           if(arr[i] == "" || typeof(arr[i]) == "undefined"){
                arr.splice(i,1);
                i= i-1;
           }
        }
        return arr;
    },
    isArray: function(arr) {
      return Object.prototype.toString.apply(arr) === "[object Array]";
    },
    clone: function(obj, attrs) {
      if(obj === null) return null;
      var objIsArray = this.isArray(obj);
      var o = objIsArray ? [] : {};
      for(var i in obj){
        if(objIsArray || attrs[i]) {
          o[i] = (obj[i] instanceof Date) ? newDate(obj[i].getTime()) :(typeof obj[i] === "object" ?
          this.clone(obj[i], attrs) : obj[i]);
        }
      }
      return o;
    },
    confirm() {
      var zTree = $.fn.zTree.getZTreeObj("treeDemo");
      var nodes = zTree.getCheckedNodes(true);
      var checkedNodes=[];
      console.log(nodes.length);
      for(let i = 0; i < nodes.length; i++){
        if(nodes[i].getCheckStatus().half==false){
          checkedNodes.push(nodes[i]);
        }
      }
      var data = this.clone(checkedNodes, {id:1, pId:1, name:1});
      this.ArrayBlank(this.postOptions)
      if (this.$route.query.userid) {
        this.updateOption({
          userId: this.$route.query.userid,
          userName: this.name,
          userPsd: this.pwd,
          userAbbName: this.abbname,
          userJob: this.job,
          userLeader: this.leader,
          validMenu:this.postOptions.join(",")
        });
        console.log(this.postOptions)
      } else {
        this.addOption({
          userName: this.name,
          userPsd: this.pwd,
          userAbbName: this.abbname,
          userJob: this.job,
          userLeader: this.leader,
          validMenu:this.postOptions.join(","),
          validArea: JSON.stringify(data),
        });
         console.log(this.postOptions);
         console.log(data);
      }
    },
    updateOption(obj) {
      var _this = this;
      if(this.validateData()) {
        Ewin.confirm({ message: "确认要更新数据吗？" }).on(function (e) {
          _this.updateUserById(obj);
        });
      }
    },
    cancel(){
      var that=this;
      if (!this.empty(this.name) 
            || !this.empty(this.abbname) 
            || !this.empty(this.pwd) 
            || !this.empty(this.job) 
        ) {
        Ewin.confirm({ message: "确认要取消编辑吗？" }).on(function (e) {
          that.$router.push({name:"account"});
        });
      }else{
        that.$router.push({name:"account"});
      } 
    },

    validateData() {
      //if (this.empty(this.username)) alert("用户情况不能为空"); this.        
      if (
        this.empty(this.name) ||
        this.empty(this.abbname) ||
        this.empty(this.pwd) ||
        this.empty(this.job) 
      ) {
        alert("输入不能为空");
        return false;
      } 
      return true;
    },
    addOption(obj) {
    var _this = this;
      if(this.validateData()) {
          _this.addUser(obj);
      } 
    }
  },
  watch: {
    validmenu(newVal){
      this.getOptions()
    },
    // areaAll(newVal){
    //    $.fn.zTree.init($("#area_tree"), this.setting, this.areaAll)
    // },
    // validarea(newVal){
    //     $.fn.zTree.init($("#treeDemo"), this.setting, this.validarea);
    // },
    userinfor(){
      this.name=this.userinfor.username;
      this.pwd=this.userinfor.userpsd;
      this.abbname=this.userinfor.userabbname;
      this.job=this.userinfor.userjob;
      this.leader=this.userinfor.userleader;
    },
    addResult(newVal){
      if(newVal==3){
        alert("用户名已存在");
      }else{
        alert("添加成功");
      }
    }
  },

  mounted() {
    if (this.$route.query.userid) {
      this.selectUserById({userid:this.$route.query.userid});
      console.log(this.validarea);
      $.fn.zTree.init($("#treeDemo"), this.settingEdit, this.validarea);
    } else {
      this.flag=!this.flag;
      console.log(this.$route);
      // this.selectAreaAll();
      $.fn.zTree.init($("#treeDemo"), this.settingNewConstruction);
    }
  }
};
</script>
<style lang="scss" scoped>

</style>
