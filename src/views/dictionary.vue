<template>
<div class="dictionary">
	<div class="kpiContainer">
		<div class="title">
			KPI
		</div>
		<div class="kpiContent">
			<ul id="treeKpi" class="kpiTree ztree"></ul>
		</div>
	</div>
	<div class="categoryContainer">
		<div class="title">
			loss category
		</div>
		<div class="categoryContent">
			<ul id="treeCategory" class="categoryTree ztree"></ul>
		</div>
	</div>
	<div class="savingDictionaryContainer">
		<div class="title">
			loss saving into dictionary
		</div>
		<div class="savingDictionaryContent">

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
					url: "http://116.196.113.167:3001/KPISet/showKPIAll",
					type: "get"
				},
				callback: {
					beforeRemove: this.zTreeBeforeRemoveKpi,
					beforeRename: this.zTreeBeforeRenameKpi,
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
					renameTitle: '编辑'
				}
			},
			settingCategory: {
				async: {
					enable: true,
					url: "http://116.196.113.167:3001/losscategory/selectLossAll",
					type: "get",
					// dataFilter: this.ajaxDataFilter,
				},
				data: {
					simpleData: {
						enable: true
					}
				},
				view: {
					// addHoverDom: this.addHoverDom,
					// removeHoverDom: this.removeHover,
					showIcon: false,
				},
				edit: {
					enable: true,
					removeTitle: '删除',
					renameTitle: '编辑',
					// showRemoveBtn: this.hiddenParentBtn,
					// showRenameBtn: this.hiddenParentBtn,
				}
			},
		}
	},
	computed: {
		...mapState([
			"kpiAll"
			//    'localData',
			//    'popularData',
			//    'countryData',
			//    'localshop',
			//    'countryshop'
		])
	},
	methods: {
		...mapActions([
			"selectKPIALL",
			"updateKPItwoLev"
			// 'getlocalData',
			// 'getpopularData',
			// 'getcountryData',
			// 'getlocalshop',
			// 'getcountryshop'
		]),
		hiddenParentBtn: function(treeId, treeNode) {
			var level = treeNode.level;
			if (level === 0) {
				return false;
			} else {
				return true;
			}
		},
		zTreeOnAsyncSuccess: function(event, treeId, treeNode, msg) {
			console.log(msg);
		},
		addHoverDomKpi: function(treeId, treeNode) {
			if (treeNode.level >= 1) return;

			var sObj = $("#" + treeNode.tId + "_span");
			if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
			var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
				"' title='增加' onfocus='this.blur();'></span>";
			sObj.after(addStr);
			var btn = $("#addBtn_" + treeNode.tId);
			if (btn) btn.bind("click", function() {
				var zTree = $.fn.zTree.getZTreeObj("treeKpi");
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
		Test: function() {
			console.log("remove");
		},
		zTreeBeforeRenameKpi: function(treeId, treeNode, newName, isCancel) {
			var that = this;
			var zTree = $.fn.zTree.getZTreeObj("treeKpi");
			var oldName = treeNode.name;

			if (isCancel && treeNode.isNew) {
				setTimeout(function() {
					zTree.removeNode(treeNode);
				});
			}
			if (isCancel && !treeNode.isNew) {
				setTimeout(function() {
					zTree.cancelEditName(oldName);
				}, 10);
			}

			if (!isCancel && newName.length == 0) {
				alert("名称不能为空！");
				setTimeout(function() {
					zTree.editName(treeNode);
				}, 10);
				return false;
			}

			if (oldName !== newName && treeNode.isNew) {
				if (!confirm("确认修改？")) {
					setTimeout(function() {
						zTree.cancelEditName(oldName);
					}, 10);
					return false;
				} else {

					var obj = {
						"name": newName,
						"pId": treeNode.pId
					};
					$.post("http://116.196.113.167:3001/KPISet/addKPItwoLev", obj,
						function(data, textStatus) {
							console.log(data);
							if (data.status === "101") {
								alert("该词已存在，请重新输入！");
								setTimeout(function() {
									zTree.editName(treeNode);
								}, 10);
								return false;
							}

							if (data.length > 0) {
								for (let i = 0; i < data.length; i++) {
									if (data[i].name === newName && data[i].pId === treeNode.pId) {
										treeNode.id = data[i].id;
										zTree.updateNode(treeNode);
									}
								}
							}
						})
				}
			} else {
				setTimeout(function() {
					zTree.cancelEditName(oldName);
				}, 10);
			}

			if (oldName !== newName && !treeNode.isNew) {
				if (!confirm("确认修改？")) {
					setTimeout(function() {
						zTree.cancelEditName(oldName);
					}, 10);
					return false;
				} else {
					var obj = {
						"name": newName,
						"pId": treeNode.pId,
						"id": treeNode.id,
					};
					// that.updateKPItwoLev(obj);
					$.post("http://116.196.113.167:3001/KPISet/updateKPItwoLev", obj,
						function(data, textStatus) {
							console.log(data);
							if (data.status === "101") {
								alert("该词已存在，请重新输入！");
								setTimeout(function() {
									zTree.editName(treeNode);
								}, 10);
								return false;
							}

							if (data.length > 0) {
								for (let i = 0; i < data.length; i++) {
									if (data[i].name === newName && data[i].pId === treeNode.pId) {
										treeNode.id = data[i].id;
										zTree.updateNode(treeNode);
									}
								}
							}
						})
				}
			}
			if (treeNode.isNew) {
				delete treeNode.isNew;
			}
		},
		zTreeBeforeRemoveKpi: function(treeId, treeNode) {
			var result = confirm("确认删除？");
			if(result){
				var deleteNode =  treeNode;
				$.get("http://116.196.113.167:3001/KPISet/deleteKPItwoLev", treeNode, function(response, status){

				})
			}
			return result;
		},
	  ajaxDataFilter: function(treeId, parentNode, responseData) {
			console.log("ajaxDataFilter: " + responseData[1].name);
		}

	},
	watch: {
		// kpiAll: function() {
		// 	$.fn.zTree.init($("#treeKpi"), this.setting, this.kpiAll);
		// }
	},

	mounted() {
		// this.selectKPIALL();
		$.fn.zTree.init($("#treeKpi"), this.settingKpi);
		$.fn.zTree.init($("#treeCategory"), this.settingCategory);
		// $.fn.zTree.init($("#treeCategory"), this.setting, this.zNodesLoss);
		// this.getlocalData()
		// this.getpopularData()
		// this.getcountryData()
		// this.getlocalshop()
		// this.getcountryshop()
	}
}
</script>

<style lang="scss" scoped>
// Error: Source sample is missing.
</style>
