<template>
<div class="area_container">
    <div class="area_nav">
        <div class="nav_header">
        <span class="header_title">产品</span>
        </div>
        <div class="nav_body">
        <ul id="product_tree" class="area_tree_class ztree">
        </ul>
        </div>
    </div>
    <div class="area_content product_content">
        <div class="area_box">
        <div class="area_top">
            <ul class="area_title product_title clearfix">
            <li class="area_tit">产品单价</li>
            </ul>
            <ul class="target_setting product_setting clearfix">
                <li class="target_set">
                    <InputNumber v-model="productPriceVal" size="small" class="target_con" @on-blur="updateProductPrice"
                    @on-focus="productPriceSettingFocus" :disabled="productPriceIsDisabled"></InputNumber>
                    <span class="target_tit">元</span>
                </li>
            </ul>
        </div>
        </div>
    </div>
</div>
</template>
<script type="text/javascript">
import {mapState,mapActions} from "vuex"

export default {

  data() {
    return {
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
            showRemoveBtn: this.hiddenParentBtn,
            showRenameBtn: this.hiddenParentBtn,
            drag: {
                isCopy: false,
                isMove: false,
            }
        }
      },
      oldProductPriceVal: null,
      productPriceVal: null,
      productPriceIsDisabled: true
    }
  },
  computed: {
    ...mapState([
      "productAll",
      "addProductOneRes",
      "updateProductByIdRes",
      "deleteProductByIdRes",
      "selectProductnameByIdRes",
      "updateProductnameByIdRes"
    ])
  },
  methods: {
    ...mapActions([
      "selectProductAll",
      "addProductOne",
      "updateProductById",
      "deleteProductById",
      "selectProductnameById",
      "updateProductnameById"
    ]),
    hiddenParentBtn: function(treeId, treeNode) {
      var level = treeNode.level;
      if (level === 0) {
        return false;
      } else {
        return true;
      }
    },
    addHoverDom: function(treeId, treeNode) {
      if (treeNode.level >= 3) return;
      var sObj = $("#" + treeNode.tId + "_span");
      if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
      var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
        "' title='增加' onfocus='this.blur();'></span>";
      sObj.after(addStr);
      var btn = $("#addBtn_" + treeNode.tId);
      if (btn) btn.bind("click", function() {
        var zTree = $.fn.zTree.getZTreeObj(treeId);
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
        this.deleteProductById({"id": treeNode.id});
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
        _this.$Message.error("产品名称不能为空！");
        return false;
      }
      /*新增节点回车弹框*/
      console.log(treeNode.pId);
      if (!isCancel && treeNode.isNew) {
        if (!confirm("确认添加？")) {
          setTimeout(function() {
            zTree.removeNode(treeNode);
          }, 10);
          return true;
        } else {
          this.addProductOne({"name": newName, "pId": treeNode.pId});
          return true;
        }
      }
      /*已存在节点回车弹框*/
      if (!isCancel && !treeNode.isNew) {
        if (oldName === newName) {
          return true;
        }
        this.updateProductById({"name": newName, "id": treeNode.id});
        return true;
      }
    },
    clickNode(event, treeId, treeNode){
      let reg=/^n/g;
      if(reg.test(treeNode.id)){
        this.productPriceIsDisabled = false;
        this.selectProductnameById({
          "id": treeNode.id
        });
      }else{
        this.productPriceIsDisabled = true;
        this.productPriceVal = null;
      }
    },
    updateProductPrice() {
      if(this.oldProductPriceVal === this.productPriceVal) return;
      let zTree = $.fn.zTree.getZTreeObj("product_tree");
      let nodes = zTree.getSelectedNodes();
      if(nodes.length > 0) {
        if(nodes[0].id.substring(0, 1) !== 'n') return;
        this.updateProductnameById({
          "id": nodes[0].id,
          "price": this.productPriceVal
        })
      }
    },
    productPriceSettingFocus() {
      this.oldProductPriceVal = this.productPriceVal;
    }

  },
  watch: {
    productAll(){
        $.fn.zTree.init($("#product_tree"), this.setting,this.productAll);
    },
    addProductOneRes(newVal){
      const _this = this;
      if(newVal.status === "0") {
        const zTree = $.fn.zTree.getZTreeObj("product_tree");
        const nodes = zTree.getSelectedNodes();
        if(nodes.length === 1){
          let newNode = nodes[0];
          newNode.id = newVal.data.id;
          delete newNode.isNew;
          zTree.updateNode(newNode);
          _this.$Message.success("添加成功");
          let reg=/^n/g;
          if(reg.test(newVal.data.id)){
            this.picked=1
            this.removeEvent(false,_this.tip)
          }else{
            this.picked=null
          }
        } else {
          this.selectProductAll();
          _this.$Message.error("添加失败");
        }
      } else if(newVal.status === "101") {
        this.selectProductAll();
        _this.$Message.error("产品已存在");
      } else {
        this.selectProductAll();
        _this.$Message.error("添加失败");
      }
    },
    updateProductByIdRes(newVal){
      const _this = this;
      if(newVal.status === "0") {
        _this.$Message.success("修改成功");
      } else if(newVal.status === "101") {
        this.selectProductAll();
        _this.$Message.error("产品已存在");
      } else {
        this.selectProductAll();
        _this.$Message.error("修改失败");
      }
    },
    deleteProductByIdRes(newVal){
      const _this = this;
      if(newVal.status === "0") {
        _this.$Message.success("删除成功");
      } else {
        this.selectAreaAll();
        _this.$Message.error("删除失败");
      }
    },
    selectProductnameByIdRes(newVal) {
      if(newVal.status === "0") {
        this.productPriceVal = newVal.data.price;
      }
    },
    updateProductnameByIdRes(newVal) {
      if(newVal.status === "0") {
        this.$Message.success("设置成功");
      }
    }
  },
  mounted() {
    let _this = this
    this.selectProductAll();
  }
}
</script>
<style lang="scss" scoped>


</style>
