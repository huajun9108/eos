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
          <input class="input_accountinfo" type="text" :value="this.$route.query.userid ? userinfor.username : ''" placeholder="用户名" ref="name">
        </div>
				<div class="accountinfo_name accountinfo">
          <i class="icon-User-name"></i>
          <input class="input_accountinfo" type="text"  :value="this.$route.query.userid? userinfor.userabbname : ''" placeholder="姓名" ref="abbname">
        </div>
        <div class="accountinfo_password accountinfo">
          <i class="icon-password"></i>
          <input class="input_accountinfo" type="text" :value="this.$route.query.userid ? userinfor.userpsd : ''" placeholder="密码" ref="pwd">
        </div>
        <div class="accountinfo_position accountinfo">
          <i class="icon-position"></i>
          <input class="input_accountinfo" type="text"  :value="this.$route.query.userid? userinfor.userjob : ''" placeholder="职位"  ref="job">
        </div>
        <div class="accountinfo_boss dropdown accountinfo">
          <i class="icon-superior"></i>
          <input class="input_accountinfo" type="text"  :value="this.$route.query.userid? userinfor.userleader : ''" placeholder="直线上司"  ref="leader">
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
          <span class="button_confirm button" @click="userExist">确认</span>
          <span class="button_cancel button">取消</span>
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
      postOptions:null,           // 初渲染所有选项
      post:null    ,    // 提交选项也是已选中选项
      checkLists: "",
      setting: {
        view: {
          // addHoverDom: this.addHoverDom,
          // removeHoverDom: this.removeHoverDom,
          selectedMulti: false
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
    };
  },
  computed: {
    ...mapState([
      "userinfor",
      "validmenu",
      "validmenuList",
      "areaAll"
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
    // addHoverDom: function(treeId, treeNode) {
    //   var sObj = $("#" + treeNode.tId + "_span");
    //   if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0)
    //     return;
    //   var addStr =
    //     "<span class='button add' id='addBtn_" +
    //     treeNode.tId +
    //     "' title='add node' onfocus='this.blur();'></span>";
    //   sObj.after(addStr);
    //   var btn = $("#addBtn_" + treeNode.tId);
    //   if (btn)
    //     btn.bind("click", function() {
    //       var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    //       zTree.addNodes(treeNode, {
    //         // id: 100 + newCount,
    //         pId: treeNode.id,
    //         name: "new node" + newCount++
    //       });
    //       return false;
    //     });
    // },
    // removeHoverDom: function(treeId, treeNode) {
    //   $("#addBtn_" + treeNode.tId)
    //     .unbind()
    //     .remove();
    // },
    userExist() {
      var username = this.$refs.name.value;
      var abbname = this.$refs.abbname.value;
      var pwd = this.$refs.pwd.value;
      var job = this.$refs.job.value;
      var leader = this.$refs.leader.value;
      var zTree = $.fn.zTree.getZTreeObj("treeDemo");
      var checkedNodes = zTree.getCheckedNodes(true);
      var data = this.clone(checkedNodes, {id:1, pId:1, name:1});
      this.ArrayBlank(this.postOptions)
      if (this.$route.query.userid) {
        this.update({
          userId: this.$route.query.userid,
          userName: username,
          userPsd: pwd,
          userAbbName: abbname,
          userJob: job,
          userLeader: leader,
          valiMmenu:this.postOptions.join(",")
        });
        console.log(this.postOptions)
      } else {

        this.confirmClick({
          userName: username,
          userPsd: pwd,
          userAbbName: abbname,
          userJob: job,
          userLeader: leader,
          validMenu:this.postOptions.join(","),
          validArea: JSON.stringify(data),
        });
         console.log(this.postOptions);
         console.log("hello");
         console.log(data);
      }
    },
    update(obj) {
      var username = this.$refs.name.value;
      var abbname = this.$refs.abbname.value;
      var pwd = this.$refs.pwd.value;
      var job = this.$refs.job.value;
      var leader = this.$refs.leader.value;
      if (
        this.empty(username) ||
        this.empty(abbname) ||
        this.empty(pwd) ||
        this.empty(job) ||
        this.empty(leader)
      ) {
        alert("输入不能为空");
      } else {
        this.updateUserById(obj);
      }
    },
    confirmClick(obj) {
      var username = this.$refs.name.value;
      var abbname = this.$refs.abbname.value;
      var pwd = this.$refs.pwd.value;
      var job = this.$refs.job.value;
      var leader = this.$refs.leader.value;
      if (
        this.empty(username) ||
        this.empty(abbname) ||
        this.empty(pwd) ||
        this.empty(job) ||
        this.empty(leader)
      ) {
        alert("输入不能为空");
      } else {
        this.addUser(obj);
      }
    }
  },
  watch: {
    validmenu(newVal){
      this.getOptions()
    },
    areaAll(){
       $.fn.zTree.init($("#area_tree"), this.setting, this.areaAll) 
    }
  },

  mounted() {
    if (this.$route.query.userid) {
      this.selectUserById({userid:this.$route.query.userid})
    } else {
      console.log(this.$route);
      this.selectAreaAll();
      $.fn.zTree.init($("#treeDemo"), this.setting, this.areaAll);
    }

  }
};
</script>
<style lang="scss" scoped>

</style>
