<template>
<div class="area">
	<div class="area_left">
		区域图表设置
    <hr>
		<ul id="treeDemo" class="ztree"></ul>
	</div>
	<div class="area_right">
		<div class="area_content">
		</div>
	</div>
</div>
</template>
<script type="text/javascript">
import {
	mapState,
	mapActions
} from "vuex"
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
				view: {
					addHoverDom: this.addHoverDom,
					removeHoverDom: this.removeHoverDom,
					selectedMulti: false
				},
				data: {
					simpleData: {
						enable: true
					}
				},
				edit: {
					enable: true
				}
			},
			zNodes: [{
					id: 1,
					pId: 0,
					name: "pNode 1",
					open: true
				},
				{
					id: 11,
					pId: 1,
					name: "pNode 11"
				},
				{
					id: 111,
					pId: 11,
					name: " sNode 111"
				},
				{
					id: 112,
					pId: 11,
					name: "sNode 112"
				},
				{
					id: 113,
					pId: 11,
					name: "sNode 113"
				},
				{
					id: 114,
					pId: 11,
					name: "sNode 114"
				},
				{
					id: 12,
					pId: 1,
					name: "pNode 12"
				},
				{
					id: 121,
					pId: 12,
					name: "sNode 121"
				},
				{
					id: 122,
					pId: 12,
					name: "sNode 122"
				},
				{
					id: 123,
					pId: 12,
					name: "sNode 123"
				},
				{
					id: 124,
					pId: 12,
					name: "sNode 124"
				},
				{
					id: 13,
					pId: 1,
					name: "pNode 13",
					isParent: true
				},
				{
					id: 2,
					pId: 0,
					name: "pNode 2"
				},
				{
					id: 21,
					pId: 2,
					name: "pNode 21",
					open: true
				},
				{
					id: 211,
					pId: 21,
					name: "sNode 211"
				},
				{
					id: 212,
					pId: 21,
					name: "sNode 212"
				},
				{
					id: 213,
					pId: 21,
					name: "sNode 213"
				},
				{
					id: 214,
					pId: 21,
					name: "sNode 214"
				},
				{
					id: 22,
					pId: 2,
					name: "pNode 22"
				},
				{
					id: 221,
					pId: 22,
					name: "sNode 221"
				},
				{
					id: 222,
					pId: 22,
					name: "sNode 222"
				},
				{
					id: 223,
					pId: 22,
					name: "sNode 223"
				},
				{
					id: 224,
					pId: 22,
					name: "sNode 224"
				},
				{
					id: 23,
					pId: 2,
					name: "pNode 23"
				},
				{
					id: 231,
					pId: 23,
					name: "sNode 231"
				},
				{
					id: 232,
					pId: 23,
					name: "sNode 232"
				},
				{
					id: 233,
					pId: 23,
					name: "sNode 233"
				},
				{
					id: 234,
					pId: 23,
					name: "sNode 234"
				},
				{
					id: 3,
					pId: 0,
					name: "pNode 3",
					isParent: true
				}
			],
		}
	},
	computed: {
		...mapState([

		])
	},
	methods: {
		...mapActions([]),
		addHoverDom: function(treeId, treeNode) {
			var sObj = $("#" + treeNode.tId + "_span");
			if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
			var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
				"' title='add node' onfocus='this.blur();'></span>";
			sObj.after(addStr);
			var btn = $("#addBtn_" + treeNode.tId);
			if (btn) btn.bind("click", function() {
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				zTree.addNodes(treeNode, {
					id: (100 + newCount),
					pId: treeNode.id,
					name: "new node" + (newCount++)
				});
				return false;
			});
		},
		removeHoverDom: function(treeId, treeNode) {
			$("#addBtn_" + treeNode.tId).unbind().remove();
		},
	},
	watch: {


	},
	mounted() {
		$.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
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
