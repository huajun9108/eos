<template>
<div class="area_container">
  <div class="area_nav">
    <div class="nav_header">
      <span class="header_title">
				区域范围
			</span>
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
        async: {
          enable: true,
          url: "http://116.62.10.199:3001/areaAllSet/showAreaAll",
          type: "get"
        },
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
      "newArea"
    ])
  },
  methods: {
    ...mapActions([
      "selectAreaAll",
      "addFactoryOne",
      "updateArea"
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
      var _this = this;
      if (confirm("确认删除？")) {
        var zTree = $.fn.zTree.getZTreeObj("area_tree");
        var obj = {
          "id": treeNode.id,
        };
        $.get("http://116.62.10.199:3001/areaAllSet/deleteArea", obj, function(response, status) {
          console.log(response);
          if (status !== "success") {
            _this.$message.error("服务器请求失败");
          }
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
    zTreeBeforeRename: function(treeId, treeNode, newName, isCancel) {
      var _this = this;
      var zTree = $.fn.zTree.getZTreeObj("area_tree");
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
        _this.$message.error("区域名称不能为空！");
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
          var obj = {
            "name": newName,
            "pId": treeNode.pId
          };
          console.log(obj);
          $.post("http://116.62.10.199:3001/areaAllSet/addAreaOne", obj,
            function(data, textStatus) {
              console.log(data);
              if (textStatus !== "success") {
                _this.$message.error("服务器请求失败");
                zTree.reAsyncChildNodes(null, "refresh");
              }
              if (data.status === "101") {
                _this.$message.error("该区域已存在，请重新输入！");
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
      /*已存在节点回车弹框*/
      if (!isCancel && !treeNode.isNew) {
        if (oldName === newName) {
          return true;
        }
        var obj = {
          "name": newName,
          "pId": treeNode.pId,
          "id": treeNode.id,
        };
        $.post("http://116.62.10.199:3001/areaAllSet/updateArea", obj,
          function(data, textStatus) {
            console.log(data);
            if (textStatus !== "success") {
              _this.$message.error("服务器请求失败");
              zTree.reAsyncChildNodes(null, "refresh");
            }
            if (data.status === "101") {
              _this.$message.error("该区域已存在！");
              zTree.reAsyncChildNodes(null, "refresh");
            } else if (data.status === "0") {
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
  },
  watch: {},
  mounted() {
    $.fn.zTree.init($("#area_tree"), this.setting);
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
