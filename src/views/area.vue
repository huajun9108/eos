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

	</div>
	<!-- <div class="area_content">
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
	</div> -->

</div>
</template>
<script type="text/javascript">
import {mapState,mapActions} from "vuex"
import "../assets/js/jquery-1.4.4.min.js"
import "../assets/js/jquery.ztree.core.js"
import "../assets/js/jquery.ztree.excheck.js"
import "../assets/js/jquery.ztree.exedit.js"
import "../assets/js/tip.js"
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
		}
	},
	computed: {
		...mapState([
			"areaAll"
		])
	},
	methods: {
		...mapActions([
			"selectAreaAll",
			"addFactoryOne",
		]),
		addHoverDom: function(treeId, treeNode) {
			if(treeNode.level >= 3) return;
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
					name: "new code"
				});
				// console.log(newNodes[0].name, newNodes[0].pId);
				// console.log(newNodes.length);
				// if(newNodes.length > 0)
				// {
				// 	var obj = {"name":newNodes[0].name, "pId": newNodes[0].pId};
				// 	that.addFactoryOne(obj);
				// }
				return false;
			});
		},
		removeHoverDom: function(treeId, treeNode) {
			$("#addBtn_" + treeNode.tId).unbind().remove();
		},
		zTreeBeforeRemove: function(treeId, treeNode){
			var result = confirm("清除");
			console.log(result);
			return result;
			// console.log(Ewin.confirm({
			// 				message: "确认要删除选择的数据吗？"
			// 			}).on(function(e) {
			// 				return e;
			// }))

		},
   		 zTreeBeforeRename: function(treeId, treeNode, newName, isCancel) {
			var zTree = $.fn.zTree.getZTreeObj("area_tree");
			var oldName = treeNode.name;

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
		areaAll: function() { $.fn.zTree.init($("#area_tree"), this.setting, this.areaAll); }
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
