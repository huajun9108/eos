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
    <div class="area_box"></div>
  </div>
</div>
</template>
<script type="text/javascript">
import {
  mapState,
  mapActions
} from "vuex"
export default {
  data() {
    return {
      sFlag: true,
      setting: {
        callback: {
          beforeRemove: this.zTreeBeforeRemove,
          beforeRename: this.zTreeBeforeRename,
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
    ])
  },
  methods: {
    ...mapActions([
      "selectAreaAll",
      "addAreaOne",
      "updateArea",
      "deleteArea",
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
  },
  watch: {
    areaAll(){
        $.fn.zTree.init($("#area_tree"), this.setting,this.areaAll);
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
          _this.$Message.success("添加成功");
        } else {
          _this.$Message.error("添加失败");
          $.fn.zTree.init($("#area_tree"), this.setting, this.areaAll);
        }
      } else {
        _this.$Message.error("添加失败");
        $.fn.zTree.init($("#area_tree"), this.setting, this.areaAll);
      }
    },
    updateAreaRes(newVal){
      const _this = this;
      if(newVal.status === "0") {
        _this.$Message.success("修改成功");
      } else if(newVal.status === "101") {
        $.fn.zTree.init($("#area_tree"), this.setting, this.areaAll);
        _this.$Message.error("区域已存在");
      } else {
        _this.$Message.error("修改失败");
        $.fn.zTree.init($("#area_tree"), this.setting, this.areaAll);
      }
    },
    deleteAreaRes(newVal){
      const _this = this;
      if(newVal.status === "0") {
        _this.$Message.success("删除成功");
      } else {
        $.fn.zTree.init($("#area_tree"), this.setting,this.areaAll);
        _this.$Message.error("删除失败");
      }
    }
  },
  mounted() {
    this.selectAreaAll();
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
