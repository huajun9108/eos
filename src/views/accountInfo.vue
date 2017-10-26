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
          <input class="input_accountinfo" type="text" :value="this.$route.query.userid ? userinfor.username : ''" placeholder="用户名" ref="name">
          <hr>
        </div>
				<div class="accountinfo_name">
          <i class="icon-User-name"></i>
          <input class="input_accountinfo" type="text"  :value="this.$route.query.userid? userinfor.userabbname : ''" placeholder="姓名" ref="abbname">
          <hr>
        </div>
        <div class="accountinfo_password">
          <i class="icon-password"></i>
          <input class="input_accountinfo" type="text" :value="this.$route.query.userid ? userinfor.userpsd : ''" placeholder="密码" ref="pwd">
          <hr>
        </div>
        <div class="accountinfo_position">
          <i class="icon-position"></i>
          <input class="input_accountinfo" type="text"  :value="this.$route.query.userid? userinfor.userjob : ''" placeholder="职位"  ref="job">
          <hr>
        </div>
        <div class="accountinfo_boss dropdown">
          <i class="icon-superior"></i>
          <input class="input_accountinfo" type="text"  :value="this.$route.query.userid? userinfor.userleader : ''" placeholder="直线上司"  ref="leader">
          <hr>
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
          <span class="button_confirm" @click="userExist">确认</span>
          <span class="button_cancel">取消</span>
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

var newCount = 1;
// var testOptions = [ '1','2','3','4','5' ],    // 测试数据-所有选项
//     testOptionsRender = '3,4';                // 测试数据-已选中的选项
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
      zNodes: [
        {
          id: 1,
          pid: 0,
          name: "大良造菜单",
          open: true,
          nocheck: false,
          children: [
            { id: 11, pid: 1, name: "当前项目" },
            {
              id: 12,
              pid: 1,
              name: "工程管理",
              open: true,
              children: [
                { id: 121, pid: 12, name: "我的工程" },
                { id: 122, pid: 12, name: "施工调度" },
                { id: 1211, pid: 12, name: "材料竞价" }
              ]
            },
            {
              id: 13,
              pid: 1,
              name: "录入管理",
              open: true,
              children: [
                { id: 131, pid: 13, name: "用工录入" },
                { id: 132, pid: 13, name: "商家录入" },
                { id: 1314, pid: 13, name: "机构列表" }
              ]
            },
            {
              id: 14,
              pid: 1,
              name: "审核管理",
              open: true,
              children: [
                { id: 141, pid: 14, name: "用工审核" },
                { id: 142, pid: 14, name: "商家审核" },
                { id: 145, pid: 14, name: "机构审核" }
              ]
            },
            {
              id: 15,
              pid: 1,
              name: "公司管理",
              open: true,
              children: [
                { id: 1517, pid: 15, name: "我的工程案例" },
                { id: 1518, pid: 15, name: "联系人设置" },
                { id: 1519, pid: 15, name: "广告设置" }
              ]
            },
            {
              id: 16,
              pid: 1,
              name: "业务管理",
              open: true,
              children: [
                { id: 164, pid: 16, name: "合同范本" },
                { id: 165, pid: 16, name: "合同列表" },
                { id: 166, pid: 16, name: "需求调度" }
              ]
            },
            {
              id: 17,
              pid: 1,
              name: "订单管理",
              open: true,
              children: [
                { id: 171, pid: 17, name: "商品订单" },
                { id: 172, pid: 17, name: "用工订单" },
                { id: 175, pid: 17, name: "供应菜单" }
              ]
            },
            {
              id: 18,
              pid: 1,
              name: "我的功能",
              open: true,
              children: [
                { id: 181, pid: 18, name: "免费设计" },
                { id: 182, pid: 18, name: "装修报价" },
                { id: 1817, pid: 18, name: "项目用工" }
              ]
            },
            {
              id: 19,
              pid: 1,
              name: "分润管理",
              open: true,
              children: [{ id: 191, pid: 19, name: "分润列表" }]
            },
            {
              id: 110,
              pid: 1,
              name: "运营管理",
              open: true,
              children: [
                { id: 1101, pid: 110, name: "代理列表" },
                { id: 1102, pid: 110, name: "代售商品" }
              ]
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapState([
      "userinfor",
      "validmenu",
      "validmenuList",
      // "postOptions",
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
      /* --- axios skip over --- */
      _this.options = this.validmenuList;
      this.postOptions =this.validmenu.split(',');

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
      // if (
      //   this.empty(username) ||
      //   this.empty(abbname) ||
      //   this.empty(pwd) ||
      //   this.empty(job) ||
      //   this.empty(leader)
      // ) {
      //   alert("输入不能为空");
      // } else {
        this.addUser(obj);
      // }
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
