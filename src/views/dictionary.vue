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

    import {mapState,mapActions} from "vuex"
    var newCount = 1;
    export default {
        data() {
          return {
            settingKpi: {
              data: {
      					simpleData: {
      						enable: true
      					}
      				},
              view: {
                addHoverDom: this.addHoverDom,
                removeHoverDom: this.removeHoverDom
              },
              edit: {
      					enable: true,
      		      removeTitle: '删除',
      					renameTitle: '编辑'
      				}
            },
            setting: {
              data: {
      					simpleData: {
      						enable: true
      					}
      				},
              view: {
                addHoverDom: this.addHoverDom,
                removeHoverDom: this.removeHoverDom,
                showIcon: false,
              },
              edit: {
      					enable: true,
      		      removeTitle: '删除',
      					renameTitle: '编辑',
                showRemoveBtn: this.hiddenParentBtn,
                showRenameBtn: this.hiddenParentBtn,
      				}
            },
            zNodesKpi: [
              { id: 1, pId: 0, name: "Volume", open: true },
              { id: 101, pId: 1, name: "Volume" },
              { id: 2, pId: 0, name: "Machine", open: true },
              { id: 102, pId: 2, name: "OEE" },
              { id: 3, pId: 0, name: "Material", open: true },
              { id: 103, pId: 3, name: "MatEff" },
              { id: 4, pId: 0, name: "Manpower", open: true },
              { id: 104, pId: 4, name: "OLE" },
              { id: 105, pId: 4, name: "Manlnd" },
              { id: 5, pId: 0, name: "Energy", open: true },
              { id: 106, pId: 5, name: "EneCons" },
              { id: 107, pId: 5, name: "Energy" },
              { id: 6, pId: 0, name: "Packaging", open: true },
              { id: 108, pId: 6, name: "PackEff" },
              { id: 7, pId: 0, name: "Consumables", open: true },
              { id: 109, pId: 7, name: "ConsCons" },
              { id: 8, pId: 0, name: "Fluids", open: true },
              { id: 110, pId: 8, name: "FluidCons" },
              { id: 9, pId: 0, name: "Maintenance", open: true },
              { id: 111, pId: 9, name: "MaintCosts" },
              { id: 10, pId: 0, name: "Subcontractors", open: true },
              { id: 112, pId: 10, name: "SubCost" },
              { id: 11, pId: 0, name: "Logistic", open: true },
              { id: 113, pId: 11, name: "LogCost" },
              { id: 12, pId: 0, name: "Inventory Losses", open: true },
              { id: 114, pId: 12, name: "InvLoss" },
              { id: 13, pId: 0, name: "Logistic Efficiency" , open: true},
              { id: 115, pId: 13, name: "LogEff" },
              { id: 14, pId: 0, name: "Transport", open: true },
              { id: 116, pId: 14, name: "Fillln" },
              { id: 15, pId: 0, name: "Administration", open: true },
              { id: 117, pId: 15, name: "AdmEff" },
              { id: 16, pId: 0, name: "Indirect Staff", open: true },
              { id: 118, pId: 16, name: "IndStaff" },
              { id: 17, pId: 0, name: "Quality", open: true },
              { id: 119, pId: 17, name: "QuaEff" },
              { id: 18, pId: 0, name: "Internal CoNQ", open: true },
              { id: 120, pId: 18, name: "IntCoNQ" },
              { id: 19, pId: 0, name: "Others", open: true },
              { id: 121, pId: 19, name: "OthCost" },
              { id: 20, pId: 0, name: "External CoNQ", open: true },
              { id: 122, pId: 20, name: "ExtCoNQ" },
            ],
            zNodesLoss: [
              { id: 1, pId: 0, name: "Volume", open: true },
              { id: 101, pId: 1, name: "Volume" },
              { id: 2, pId: 0, name: "Machine", open: true },
              { id: 102, pId: 2, name: "OEE", open: true },

              { id: 201, pId: 102, name: "Lack of demand" },
              { id: 202, pId: 102, name: "Preventive Maintenance" },
              { id: 203, pId: 102, name: "Training, Meetings & Shift Breaks" },
              { id: 204, pId: 102, name: "Breakdowns" },
              { id: 205, pId: 102, name: "Short Stops" },
              { id: 206, pId: 102, name: "First Level Maintenance" },
              { id: 207, pId: 102, name: "Lack Of Resources & Waiting" },
              { id: 208, pId: 102, name: "Setup Time & Adjustment" },
              { id: 209, pId: 102, name: "Process Incidents" },
              { id: 210, pId: 102, name: "Speed Loss" },
              { id: 211, pId: 102, name: "Overusage" },

              { id: 3, pId: 0, name: "Material", open: true },
              { id: 103, pId: 3, name: "MatEff" },
              { id: 4, pId: 0, name: "Manpower", open: true },
              { id: 104, pId: 4, name: "OLE" },
              { id: 105, pId: 4, name: "Manlnd" },
              { id: 5, pId: 0, name: "Energy", open: true },
              { id: 106, pId: 5, name: "EneCons" },
              { id: 107, pId: 5, name: "Energy" },
              { id: 6, pId: 0, name: "Packaging", open: true },
              { id: 108, pId: 6, name: "PackEff" },
              { id: 7, pId: 0, name: "Consumables", open: true },
              { id: 109, pId: 7, name: "ConsCons" },
              { id: 8, pId: 0, name: "Fluids", open: true },
              { id: 110, pId: 8, name: "FluidCons" },
              { id: 9, pId: 0, name: "Maintenance", open: true },
              { id: 111, pId: 9, name: "MaintCosts" },
              { id: 10, pId: 0, name: "Subcontractors", open: true },
              { id: 112, pId: 10, name: "SubCost" },
              { id: 11, pId: 0, name: "Logistic", open: true },
              { id: 113, pId: 11, name: "LogCost" },
              { id: 12, pId: 0, name: "Inventory Losses", open: true },
              { id: 114, pId: 12, name: "InvLoss" },
              { id: 13, pId: 0, name: "Logistic Efficiency" , open: true},
              { id: 115, pId: 13, name: "LogEff" },
              { id: 14, pId: 0, name: "Transport", open: true },
              { id: 116, pId: 14, name: "Fillln" },
              { id: 15, pId: 0, name: "Administration", open: true },
              { id: 117, pId: 15, name: "AdmEff" },
              { id: 16, pId: 0, name: "Indirect Staff", open: true },
              { id: 118, pId: 16, name: "IndStaff" },
              { id: 17, pId: 0, name: "Quality", open: true },
              { id: 119, pId: 17, name: "QuaEff" },
              { id: 18, pId: 0, name: "Internal CoNQ", open: true },
              { id: 120, pId: 18, name: "IntCoNQ" },
              { id: 19, pId: 0, name: "Others", open: true },
              { id: 121, pId: 19, name: "OthCost" },
              { id: 20, pId: 0, name: "External CoNQ", open: true },
              { id: 122, pId: 20, name: "ExtCoNQ" },
            ]
          }
        },
        computed:{
            ...mapState([
              "kpiAll"
            //    'localData',
            //    'popularData',
            //    'countryData',
            //    'localshop',
            //    'countryshop'
                ])
        },
        methods:{
            ...mapActions([
              "selectKPIALL"
                // 'getlocalData',
                // 'getpopularData',
                // 'getcountryData',
                // 'getlocalshop',
                // 'getcountryshop'
              ]),
              hiddenParentBtn: function(treeId, treeNode) {
                var level = treeNode.level;
                if(level === 0)
                {
                  return false;
                }
                else{
                  return true;
                }
              },
              addHoverDom: function(treeId, treeNode) {
                if(treeNode.level === 0) return;

          			var sObj = $("#" + treeNode.tId + "_span");
          			if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
          			var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
          				"' title='增加' onfocus='this.blur();'></span>";
          			sObj.after(addStr);
          			var btn = $("#addBtn_" + treeNode.tId);
          			if (btn) btn.bind("click", function() {
          				var zTree = $.fn.zTree.getZTreeObj("treeCategory");
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
    watch:{
        kpiAll: function() { $.fn.zTree.init($("#treeKpi"), this.setting, this.kpiAll );
}
    },

    mounted(){
      this.selectKPIALL();
      $.fn.zTree.init($("#treeCategory"), this.setting, this.zNodesLoss);
        // this.getlocalData()
        // this.getpopularData()
        // this.getcountryData()
        // this.getlocalshop()
        // this.getcountryshop()

    }
}
</script>

<style lang="scss" scoped>

</style>
