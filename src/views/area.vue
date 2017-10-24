<template>
<div class="area_container">
	<div class="area_content">
		<div class="area_setting col-md-3">
			<br>
			<span class="area_setting_title">区域范围</span>
			<hr>
      <ul id="area_tree" class="area_tree_class ztree">
      </ul>
		</div>
		<div class="area_other col-md-9">
      <div class="area_other_content">
      </div>
		</div>
	</div>

</div>
</template>
<script type="text/javascript">
import {mapState,mapActions} from "vuex"
import "../assets/js/jquery-1.4.4.min.js"
import "../assets/js/jquery.ztree.core.js"
import "../assets/js/jquery.ztree.excheck.js"
import "../assets/js/jquery.ztree.exedit.js"
 var newCount = 1;
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
				},
				data: {
					simpleData: {
						enable: true
					}
				},
				edit: {
					enable: true,
		      removeTitle: '删除',
					renameTitle: '编辑'
				}
			},
			// zNodes: [
			// 	{ id:1,pid:0,name:"大良造菜单",open:true,nocheck:false,
      //           children: [
      //               { id:11,pid:1,name:"当前项目"},
      //               { id:12,pid:1,name:"工程管理",open:true,
      //                   children: [
      //                       { id:121,pid:12,name:"我的工程"},
      //                       { id:122,pid:12,name:"施工调度"},
      //                       { id:1211,pid:12,name:"材料竞价"}
      //                   ]
      //               },
      //               { id:13,pid:1,name:"录入管理",open:true,
      //                   children: [
      //                       { id:131,pid:13,name:"用工录入"},
      //                       { id:132,pid:13,name:"商家录入"},
      //                       { id:1314,pid:13,name:"机构列表"}
      //                   ]
      //               },
      //               { id:14,pid:1,name:"审核管理",open:true,
      //                   children: [
      //                       { id:141,pid:14,name:"用工审核"},
      //                       { id:142,pid:14,name:"商家审核"},
      //                       { id:145,pid:14,name:"机构审核"}
      //                   ]
      //               },
      //               { id:15,pid:1,name:"公司管理",open:true,
      //                   children: [
      //                       { id:1517,pid:15,name:"我的工程案例"},
      //                       { id:1518,pid:15,name:"联系人设置"},
      //                       { id:1519,pid:15,name:"广告设置"}
      //                   ]
      //               },
      //               { id:16,pid:1,name:"业务管理",open:true,
      //                   children: [
      //                       { id:164,pid:16,name:"合同范本"},
      //                       { id:165,pid:16,name:"合同列表"},
      //                       { id:166,pid:16,name:"需求调度"}
      //                   ]
      //               },
      //               { id:17,pid:1,name:"订单管理",open:true,
      //                   children: [
      //                       { id:171,pid:17,name:"商品订单"},
      //                       { id:172,pid:17,name:"用工订单"},
      //                       { id:175,pid:17,name:"供应菜单"}
      //                   ]
      //               },
      //               { id:18,pid:1,name:"我的功能",open:true,
      //                   children: [
      //                       { id:181,pid:18,name:"免费设计"},
      //                       { id:182,pid:18,name:"装修报价"},
      //                       { id:1817,pid:18,name:"项目用工"}
      //                   ]
      //               },
      //               { id:19,pid:1,name:"分润管理",open:true,
      //                   children: [
      //                       { id:191,pid:19,name:"分润列表"}
      //                   ]
      //               },
      //               { id:110,pid:1,name:"运营管理",open:true,
      //                   children: [
      //                       { id:1101,pid:110,name:"代理列表"},
      //                       { id:1102,pid:110,name:"代售商品"}
      //                   ]
      //               },
      //           ]
      //       }
			// ],
		}
	},
	computed: {
		...mapState([
			"groupAll"
		])
	},
	methods: {
		...mapActions([
			"selectAreaAll"
		]),
		addHoverDom: function(treeId, treeNode) {
			var sObj = $("#" + treeNode.tId + "_span");
			if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
			var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
				"' title='增加' onfocus='this.blur();'></span>";
			sObj.after(addStr);
			var btn = $("#addBtn_" + treeNode.tId);
			if (btn) btn.bind("click", function() {
				var zTree = $.fn.zTree.getZTreeObj("area_tree");
				zTree.addNodes(treeNode, {
					id: (100 + newCount),
					pId: treeNode.id,
					name: "新建结点" + (newCount++)
				});
				return false;
			});
		},
		removeHoverDom: function(treeId, treeNode) {
			$("#addBtn_" + treeNode.tId).unbind().remove();
		},
		zTreeBeforeRemove: function(treeId, treeNode){
			var result = confirm("是否删除？");
		  return result;
		},
    zTreeBeforeRename: function(treeId, treeNode, newName, isCancel) {
			var zTree = $.fn.zTree.getZTreeObj("area_tree");
			var oldName = treeNode.name;
      // if(isCancel)
			// {
			// 	setTimeout(function() {
			// 		zTree.cancelEditName();
			// 	}, 10);
			// }

			if(!isCancel && newName.length == 0) {
				alert("名称不能为空！");
				setTimeout(function() {
					zTree.editName(treeNode);
				}, 10);
				return false;
			}

			if(oldName !== newName){
				if(!confirm("确认修改？")){
					setTimeout(function() {
						zTree.cancelEditName(oldName);
					}, 10);
					return false;
				}
			}

		}
	},
	watch: {
		groupAll: function() { $.fn.zTree.init($("#area_tree"), this.setting, this.groupAll); }
	},
	mounted() {
		this.selectAreaAll()
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
