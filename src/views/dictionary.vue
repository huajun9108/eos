<template>
<div class="dictionary">
  <div class="kpiContainer dictionary_box">
    <div class="title">
      KPI
    </div>
    <div class="kpiContent dictionary_content">
      <ul id="treeKpi" class="kpiTree ztree"></ul>
    </div>
  </div>
  <div class="categoryContainer dictionary_box">
    <div class="title">
      LOSS CATEGORY
    </div>
    <div class="categoryContent dictionary_content">
      <ul id="treeCategory" class="categoryTree ztree"></ul>
    </div>
  </div>
  <div class="savingDictionaryContainer dictionary_box">
    <div class="title">
      LOSS INTO SAVING DICTIONARY
    </div>
    <div class="savingDictionaryContent dictionary_content">

    </div>
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
      settingKpi: {
        callback: {
          beforeRemove: this.zTreeBeforeRemoveKpi,
          beforeRename: this.zTreeBeforeRenameKpi,
          onRemove: this.zTreeOnModifyKpi,
          onRename: this.zTreeOnModifyKpi,
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        view: {
          addHoverDom: this.addHoverDomKpi,
          removeHoverDom: this.removeHoverDom
        },
        edit: {
          enable: true,
          removeTitle: '删除',
          renameTitle: '编辑',
          showRemoveBtn: this.hiddenParentBtn,
          showRenameBtn: this.hiddenParentBtn,
          drag: {
            isCopy: false,
            isMove: false,
          }
        }
      },
      settingCategory: {
        callback: {
          beforeRemove: this.zTreeBeforeRemoveCategory,
          beforeRename: this.zTreeBeforeRenameCategory,
          onRemove: this.zTreeOnModifyCategory,
          onRename: this.zTreeOnModifyCategory,
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        view: {
          addHoverDom: this.addHoverDomCategory,
          removeHoverDom: this.removeHoverDom,
          showIcon: false,
        },
        edit: {
          enable: true,
          removeTitle: '删除',
          renameTitle: '编辑',
          showRemoveBtn: this.hiddenParentBtn,
          showRenameBtn: this.hiddenParentBtn,
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
      "kpiAll",
      "addKpiRes",
      "updateKpiRes",
      "delKpiRes",
      "lossAll",
      "addLossRes",
      "updateLossRes",
      "deleteLossRes"
    ])
  },
  methods: {
    ...mapActions([
      "showKPIALL",
      "addKPItwoLev",
      "updateKPItwoLev",
      "deleteKPItwoLev",
      "selectLossAll",
      "addLossOne",
      "updateLossById",
      "deleteLossById"
    ]),
    hiddenParentBtn: function(treeId, treeNode) {
      var level = treeNode.level;
      if (level === 0) {
        return false;
      } else {
        return true;
      }
    },
    addHoverDomKpi: function(treeId, treeNode) {
      if (treeNode.level >= 1) return;
      var zTree = $.fn.zTree.getZTreeObj("treeKpi");
      this.addHoverDom(treeId, treeNode, zTree);
    },
    addHoverDomCategory: function(treeId, treeNode) {
      if (treeNode.level >= 2) return;
      var zTree = $.fn.zTree.getZTreeObj("treeCategory");
      this.addHoverDom(treeId, treeNode, zTree);
    },
    addHoverDom: function(treeId, treeNode, zTree) {
      var sObj = $("#" + treeNode.tId + "_span");
      if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
      var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
        "' title='增加' onfocus='this.blur();'></span>";
      sObj.after(addStr);
      var btn = $("#addBtn_" + treeNode.tId);
      if (btn) btn.bind("click", function() {
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
    zTreeBeforeRenameKpi: function(treeId, treeNode, newName, isCancel) {
      var _this = this;
      var zTree = $.fn.zTree.getZTreeObj(treeId);

      if (isCancel && treeNode.isNew) {
        setTimeout(function() {
          zTree.removeNode(treeNode);
        }, 10);
        return true;
      }
      if (isCancel && !treeNode.isNew) {
        return true;
      }

      if (!isCancel && newName.length == 0) {
        _this.$Message.error("名称不能为空！");
        return false;
      }

      if (!isCancel && treeNode.isNew) {
        if (!confirm("确认添加？")) {
          setTimeout(function() {
            zTree.removeNode(treeNode);
          }, 10);
          return true;
        } else {
          this.addKPItwoLev({"name": newName, "pId": treeNode.pId});
          return true;
        }
      }

      const oldName = treeNode.name;
      if (!isCancel && !treeNode.isNew) {
        if (oldName === newName) {
          return true;
        }
        this.updateKPItwoLev({"name": newName, "pId": treeNode.pId, "id": treeNode.id});
        return true;
      }
    },
    zTreeBeforeRenameCategory: function(treeId, treeNode, newName, isCancel) {
      var _this = this;
      var zTree = $.fn.zTree.getZTreeObj(treeId);

      if (isCancel && treeNode.isNew) {
        setTimeout(function() {
          zTree.removeNode(treeNode);
        }, 10);
        return true;
      }
      if (isCancel && !treeNode.isNew) {
        return true;
      }

      if (!isCancel && newName.length == 0) {
        _this.$Message.error("名称不能为空！");
        return false;
      }

      if (!isCancel && treeNode.isNew) {
        if (!confirm("确认添加？")) {
          setTimeout(function() {
            zTree.removeNode(treeNode);
          }, 10);
          return true;
        } else {
          this.addLossOne({"name": newName, "pId": treeNode.pId});
          return true;
        }
      }

      const oldName = treeNode.name;
      if (!isCancel && !treeNode.isNew) {
        if (oldName === newName) {
          return true;
        }
        this.updateLossById({"name": newName, "pId": treeNode.pId, "id": treeNode.id});
        return true;
      }
    },
    zTreeBeforeRemoveKpi: function(treeId, treeNode) {
      if (confirm("确认删除？")) {
        this.deleteKPItwoLev({"id": treeNode.id});
        return true;
      } else {
        return false;
      }
    },
    zTreeBeforeRemoveCategory: function(treeId, treeNode) {
      var _this = this;
      var zTree = $.fn.zTree.getZTreeObj(treeId);
      if (confirm("确认删除？")) {
        this.deleteLossById({"id": treeNode.id});
      } else {
        return false;
      }
    },
    zTreeOnModifyKpi: function(event, treeId, treeNode) {
      setTimeout(function() {
        console.log("zTreeOnModifyBegin");
        var zTree = $.fn.zTree.getZTreeObj("treeCategory");
        zTree.reAsyncChildNodes(null, "refresh");
        console.log("zTreeOnModifyEnd");
      }, 1000);
    },
    zTreeOnModifyCategory: function(event, treeId, treeNode) {
      setTimeout(function() {
        console.log("zTreeOnModifyBegin");
        var zTree = $.fn.zTree.getZTreeObj("treeKpi");
        zTree.reAsyncChildNodes(null, "refresh");
        console.log("zTreeOnModifyEnd");
      }, 1000);
    },
  },
  watch: {
    kpiAll() {
      $.fn.zTree.init($("#treeKpi"), this.settingKpi, this.kpiAll);
    },
    addKpiRes(newVal){
      console.log(newVal);
      const _this = this;
      if(newVal.status === "0" && newVal.data.id) {
        const zTree = $.fn.zTree.getZTreeObj("treeKpi");
        const nodes = zTree.getSelectedNodes();
        if(nodes.length === 1){
          let newNode = nodes[0];
          newNode.id = newVal.data.id;
          delete newNode.isNew;
          zTree.updateNode(newNode);
          _this.$Message.success("添加成功");
        } else {
          _this.$Message.error("添加失败");
          $.fn.zTree.init($("#treeKpi"), this.settingKpi, this.kpiAll);
        }
      } else if(newVal.status === "101") {
        $.fn.zTree.init($("#treeKpi"), this.settingKpi, this.kpiAll);
        _this.$Message.error("名称已存在");
      } else {
        _this.$Message.error("添加失败");
        $.fn.zTree.init($("#treeKpi"), this.settingKpi, this.kpiAll);
      }
    },
    updateKpiRes(newVal){
      console.log(newVal);
      const _this = this;
      if(newVal.status === "0") {
        _this.$Message.success("修改成功");
      } else if(newVal.status === "101") {
        $.fn.zTree.init($("#treeKpi"), this.settingKpi, this.kpiAll);
        _this.$Message.error("名称已存在");
      } else {
        _this.$Message.error("修改失败");
        $.fn.zTree.init($("#treeKpi"), this.settingKpi, this.kpiAll);
      }
    },
    delKpiRes(newVal) {
      console.log(newVal);
      const _this = this;
      if(newVal.status === "0") {
        _this.$Message.success("删除成功");
      } else {
        $.fn.zTree.init($("#treeKpi"), this.settingKpi, this.kpiAll);
        _this.$Message.error("删除失败");
      }
    },
    lossAll() {
      $.fn.zTree.init($("#treeCategory"), this.settingCategory, this.lossAll);
    },
    addLossRes(newVal) {
      const _this = this;
      if(newVal.status === "0" && newVal.data.id) {
        const zTree = $.fn.zTree.getZTreeObj("treeCategory");
        const nodes = zTree.getSelectedNodes();
        if(nodes.length === 1){
          let newNode = nodes[0];
          newNode.id = newVal.data.id;
          delete newNode.isNew;
          zTree.updateNode(newNode);
          _this.$Message.success("添加成功");
        } else {
          _this.$Message.error("添加失败");
          $.fn.zTree.init($("#treeCategory"), this.settingCategory, this.lossAll);
        }
      } else if(newVal.status === "101") {
        $.fn.zTree.init($("#treeCategory"), this.settingCategory, this.lossAll);
        _this.$Message.error("名称已存在");
      } else {
        _this.$Message.error("添加失败");
        $.fn.zTree.init($("#treeCategory"), this.settingCategory, this.lossAll);
      }
    },
    updateLossRes(newVal) {
      const _this = this;
      if(newVal.status === "0") {
        _this.$Message.success("修改成功");
      } else if(newVal.status === "101") {
        $.fn.zTree.init($("#treeCategory"), this.settingCategory, this.lossAll);
        _this.$Message.error("名称已存在");
      } else {
        _this.$Message.error("修改失败");
        $.fn.zTree.init($("#treeCategory"), this.settingCategory, this.lossAll);
      }
    },
    deleteLossRes(newVal) {
      console.log(newVal);
      const _this = this;
      if(newVal.status === "0") {
        _this.$Message.success("删除成功");
      } else {
        $.fn.zTree.init($("#treeCategory"), this.settingCategory, this.lossAll);
        _this.$Message.error("删除失败");
      }
    }
  },
  mounted() {
    this.showKPIALL();
    this.selectLossAll();
  }
}
</script>

<style lang="scss" scoped>
</style>
