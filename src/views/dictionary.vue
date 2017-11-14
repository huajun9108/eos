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
        async: {
          enable: true,
          url: "http://116.62.10.199:3001/KPISet/showKPIAll",
          type: "get",
        },
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
        async: {
          enable: true,
          url: "http://116.62.10.199:3001/losscategory/selectLossAll",
          type: "get",
        },
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
      "kpiAll"
    ])
  },
  methods: {
    ...mapActions([
      "selectKPIALL",
      "updateKPItwoLev"
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
      this.cancelEdit(treeId, treeNode, isCancel);
      this.zTreeAdd(treeId, treeNode, newName, isCancel, "http://116.62.10.199:3001/KPISet/addKPItwoLev");
      this.zTreeUpdate(treeId, treeNode, newName, isCancel, "http://116.62.10.199:3001/KPISet/updateKPItwoLev");
    },
    zTreeBeforeRenameCategory: function(treeId, treeNode, newName, isCancel) {
      this.cancelEdit(treeId, treeNode, isCancel);
      this.zTreeAdd(treeId, treeNode, newName, isCancel, "http://116.62.10.199:3001/losscategory/addLossOne");
      this.zTreeUpdate(treeId, treeNode, newName, isCancel, "http://116.62.10.199:3001/losscategory/updateLossById");
    },
    zTreeBeforeRemoveKpi: function(treeId, treeNode) {
      this.zTreeBeforeRemove(treeId, treeNode, "http://116.62.10.199:3001/KPISet/deleteKPItwoLev");
    },
    zTreeBeforeRemoveCategory: function(treeId, treeNode) {
      this.zTreeBeforeRemove(treeId, treeNode, "http://116.62.10.199:3001/losscategory/deleteLossById");
    },
    zTreeBeforeRemove: function(treeId, treeNode, url) {
      var _this = this;
      if (confirm("确认删除？")) {
        var obj = {
          "id": treeNode.id,
        };
        $.get(url, obj, function(response, status) {
          if (response.status === "0") {
            _this.$message.success("删除成功");
            zTree.removeNode(treeNode);
          } else {
            _this.$message.error("删除失败");
            zTree.reAsyncChildNodes(null, "refresh");
          }
        })
      } else {
        _this.$message.error("删除失败");
        return false;
      }
    },
    cancelEdit: function(treeId, treeNode, isCancel) {
      console.log(treeId);
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
    },
    zTreeAdd: function(treeId, treeNode, newName, isCancel, url) {
      var _this = this;
      var zTree = $.fn.zTree.getZTreeObj(treeId);

      if (!isCancel && newName.length == 0) {
        _this.$message.error("名称不能为空！");
        return false;
      }

      if (!isCancel && treeNode.isNew) {
        if (!confirm("确认添加？")) {
          setTimeout(function() {
            zTree.removeNode(treeNode);
          }, 10);
          return true;
        } else {
          var obj = {
            "name": newName,
            "pId": treeNode.pId
          };
          $.post(url, obj,
            function(data, textStatus) {
              if (textStatus !== "success") {
                _this.$message.error("服务器请求失败");
                zTree.reAsyncChildNodes(null, "refresh");
              }

              if (data.status === "101") {
                _this.$message.error("该词已存在，请重新输入！");
                setTimeout(function() {
                  zTree.editName(treeNode);
                }, 10);
              }
              if (data.id && treeNode.isNew) {
                treeNode.id = data.id;
                delete treeNode.isNew;
                zTree.updateNode(treeNode);
                _this.$message.success("添加成功");
              }
            })
          return true;
        }
      }
    },
    zTreeUpdate: function(treeId, treeNode, newName, isCancel, url) {
			var _this = this;
      var zTree = $.fn.zTree.getZTreeObj(treeId);
      const oldName = treeNode.name;
      if (!isCancel && !treeNode.isNew) {
        if (oldName === newName) {
          return true;
        }
        var obj = {
          "name": newName,
          "pId": treeNode.pId,
          "id": treeNode.id,
        };
        $.post(url, obj,
          function(data, textStatus) {
            console.log(data);
            if (textStatus !== "success") {
              _this.$message.error("服务器请求失败");
              zTree.reAsyncChildNodes(null, "refresh");
            }
            if (data.status === "101") {
              _this.$message.error("该词已存在！");
              zTree.reAsyncChildNodes(null, "refresh");
              return false;
            }
            if (data.status === "0") {
              _this.$message.success("修改成功");
              zTree.cancelEditName(newName);
            } else {
              _this.$message.error("修改失败");
              zTree.reAsyncChildNodes(null, "refresh");
            }
          })
        return true;
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
  watch: {},

  mounted() {
    $.fn.zTree.init($("#treeKpi"), this.settingKpi);
    $.fn.zTree.init($("#treeCategory"), this.settingCategory);
  }
}
</script>

<style lang="scss" scoped>
</style>
