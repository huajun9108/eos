<template>
<div class="area_container">
  <div class="area_nav">
    <div class="nav_header">
      <span class="header_title">区域范围</span>
    </div>
    <div class="nav_body">
      <ul id="area_tree" class="area_tree_class ztree">
      </ul>
    </div>
  </div>
  <div class="area_content">
    <div class="area_box">
      <div class="area_top">
        <ul class="area_title clearfix">
          <li class="area_tit">线体重要程度选择</li>
        <li class="area_set" v-for="(item,idx) in radiopick" :key = "idx">
          <input type="radio" :id="item.name" :value="item.value" v-model="picked" :ref="item.name" class="arearadio">
          <label :for="item.name"  :ref="item.value">{{item.title}}</label>
        </li>
        <li class="area_button text-right">
          <span class="button_confirm button" @click="confirm">确认</span>
          <span class="button_cancel button" @click="cancel">取消</span>
        </li>
        </ul>
      </div>
      <div class="area_top">
        <v-target :nodeId="nodeId"></v-target>
      </div>
      <div class="area_top">
        <v-product></v-product>
      </div>
    </div>
  </div>
</div>
</template>
<script type="text/javascript">
import {mapState,mapActions} from "vuex"
import target from "./target"
import product from "./product"
export default {
  components: {
    "v-target":target,
    "v-product":product
  },
  data() {
    return {
      nodeId:'',
      radiopick:[
        {name:"important",value:"3",title:"重要"},
				{name:"common",value:"2",title:"一般"},
				{name:"unimportance",value:"1",title:"不重要"}
      ],
      picked:"",
      setting: {
        callback: {
          beforeRemove: this.zTreeBeforeRemove,
          beforeRename: this.zTreeBeforeRename,
          onClick:this.clickNode
        },
        view: {
          addHoverDom: this.addHoverDom,
          removeHoverDom: this.removeHoverDom,
          selectedMulti: false,
          showIcon: false,
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        edit: {
          enable: true,
          removeTitle: '删除',
          renameTitle: '编辑',
          drag: {
            isCopy: false,
            isMove: false,
          }
        }
      },
    }
  },
  computed: {
    ...mapState([
      "areaAll",
      "newArea",
      "updateAreaRes",
      "deleteAreaRes",
      "lineBody",
      "updateLinebodyWeight"
    ])
  },
  methods: {
    ...mapActions([
      "selectAreaAll",
      "addAreaOne",
      "updateArea",
      "deleteArea",
      "selectLinebodyById",
      "updateLinebodyWeightById"
    ]),
    addHoverDom: function(treeId, treeNode) {
      if (treeNode.level >= 3) return;
      var sObj = $("#" + treeNode.tId + "_span");
      if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
      var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
        "' title='增加' onfocus='this.blur();'></span>";
      sObj.after(addStr);
      var btn = $("#addBtn_" + treeNode.tId);
      if (btn) btn.bind("click", function() {
        var zTree = $.fn.zTree.getZTreeObj("area_tree");
        var newNodes = zTree.addNodes(treeNode, {
          pId: treeNode.id,
          name: "",
          isNew: true,
        });
        if (newNodes.length > 0) {
          zTree.editName(newNodes[0]);
        }
        return false;
      });
    },
    removeHoverDom: function(treeId, treeNode) {
      $("#addBtn_" + treeNode.tId).unbind().remove();
    },
    zTreeBeforeRemove: function(treeId, treeNode) {
      if (confirm("确认删除？")) {
        this.deleteArea({"id": treeNode.id});
        return true;
      } else {
        return false;
      }
    },
    zTreeBeforeRename: function(treeId, treeNode, newName, isCancel) {
      var _this = this;
      var zTree = $.fn.zTree.getZTreeObj(treeId);
      const oldName = treeNode.name;
      /*新增节点直接取消或编辑后取消*/
      if (isCancel && treeNode.isNew) {
        setTimeout(function() {
          zTree.removeNode(treeNode);
        }, 10);
        return true;
      }
      /*已存在节点直接取消*或编辑后取消*/
      if (isCancel && !treeNode.isNew) {
        return true;
      }
      /*节点名为空*/
      if (!isCancel && newName.length == 0) {
        _this.$Message.error("区域名称不能为空！");
        return false;
      }
      /*新增节点回车弹框*/
      if (!isCancel && treeNode.isNew) {
        if (!confirm("确认添加？")) {
          setTimeout(function() {
            zTree.removeNode(treeNode);
          }, 10);
          return true;
        } else {
          this.addAreaOne({"name": newName, "pId": treeNode.pId});
          return true;
        }
      }
      /*已存在节点回车弹框*/
      if (!isCancel && !treeNode.isNew) {
        if (oldName === newName) {
          return true;
        }
        this.updateArea({"name": newName, "pId": treeNode.pId, "id": treeNode.id});
        return true;
      }
    },
    clickNode(event, treeId, treeNode){
      let reg=/^l/g;
      let _this = this
      this.nodeId = treeNode.id
      if(reg.test(this.nodeId)){
        // this.picked="1"
        this.selectLinebodyById({id:this.nodeId})
        // console.log(this.picked)
        this.removeEvent(false,_this.tip)
      }else{
        let _this = this
        this.picked=""
        this.addEvent(true,_this.tip)
      }
    },
    tip(){
      this.$Message.error("请在线体进行重要性选择")
    },
    removeEvent(flag,fun){
      this.radiopick.forEach(item=>{
        this.$refs[item.name][0].disabled = flag
        this.$refs[item.value][0].removeEventListener("click",
          fun)
      })
    },
    addEvent(flag,fun){
      this.radiopick.forEach(item=>{
        this.$refs[item.name][0].disabled = flag
        this.$refs[item.value][0].addEventListener("click",fun)
      })
    },
    confirm(){
      if(this.picked){
        var zTree = $.fn.zTree.getZTreeObj("area_tree");
        let selectNode = zTree.getSelectedNodes();
        let selectNodeId = selectNode[0].id.substring(1);
        this.updateLinebodyWeightById({"linebodyId": selectNodeId,"weight":this.picked});
      }
    },
    cancel(){

    }
  },
  watch: {
    areaAll(){
        $.fn.zTree.init($("#area_tree"), this.setting,this.areaAll);
    },
    lineBody(newVal){
      this.picked = this.lineBody.weight
    },
    newArea(newVal){
      const _this = this;
      if(newVal.id) {
        const zTree = $.fn.zTree.getZTreeObj("area_tree");
        const nodes = zTree.getSelectedNodes();
        if(nodes.length === 1){
          let newNode = nodes[0];
          newNode.id = newVal.id;
          delete newNode.isNew;
          zTree.updateNode(newNode);
          this.$Message.success("添加成功");
          let reg=/^l/g;
          if(reg.test(newVal.id)){
            this.picked=1
            this.removeEvent(false,_this.tip)
          }else{
            this.picked=null
          }
        } else {
          this.selectAreaAll();
          _this.$Message.error("添加失败");
        }
      } else {
        this.selectAreaAll();
        _this.$Message.error("添加失败");
      }
    },
    updateLinebodyWeight(newVal){
      if(newVal.status==0){
        this.$Message.success("线体权重修改成功");
      }else{
        this.$Message.error("线体权重修改失败，请稍后再试");
      }
    },
    updateAreaRes(newVal){
      const _this = this;
      if(newVal.status === "0") {
        _this.$Message.success("修改成功");
      } else if(newVal.status === "101") {
        this.selectAreaAll();
        _this.$Message.error("区域已存在");
      } else {
        this.selectAreaAll();
        _this.$Message.error("修改失败");
      }
    },
    deleteAreaRes(newVal){
      const _this = this;
      if(newVal.status === "0") {
        _this.$Message.success("删除成功");
      } else {
        this.selectAreaAll();
        _this.$Message.error("删除失败");
      }
    }
  },
  mounted() {
    let _this = this
    this.selectAreaAll();
    this.radiopick.forEach(item=>{
      this.$refs[item.name][0].disabled = true
      this.$refs[item.value][0].addEventListener("click",_this.tip)
    })
  }  
}
</script>
<style lang="scss" scoped>
@import "../styles/mobile.scss";
.scan {
    display: flex;
    flex-direction: column;
    header {
        width: 100%;
        height: P(90);
        background: rgba(0,0,0,.3);
        text-align: center;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        font-size: P(32);
        box-sizing: border-box;
        padding: 0 P(30);
        .goback {
            width: P(90);
            text-align: center;
            line-height: P(90);
            font-size: P(40);
            color: #fff;
            float: left;
        }
        span {
            color: #fff;
            line-height: P(90);
            font-weight: bold;
        }
    }
}
</style>
