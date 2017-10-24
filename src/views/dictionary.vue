<template>
    <div class="dictionary">
       <div class="kpi">
         <ul id="treeKpi" class="kpi_tree ztree"></ul>
       </div>
       <div class="loss">
         <ul id="treeLoss" class="loss_tree ztree"></ul>
       </div>
    </div>
</template>
<script type="text/javascript">

    import {mapState,mapActions} from "vuex"
    export default {
        data() {
          return {
            setting: {
              data: {
      					simpleData: {
      						enable: true
      					}
      				},
              view: {
                showLine: true
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
            //    'localData',
            //    'popularData',
            //    'countryData',
            //    'localshop',
            //    'countryshop'
                ])
        },
        methods:{
            ...mapActions([
                // 'getlocalData',
                // 'getpopularData',
                // 'getcountryData',
                // 'getlocalshop',
                // 'getcountryshop'
                ])
    },
    watch:{



    },

    mounted(){
      $.fn.zTree.init($("#treeKpi"), this.setting, this.zNodesKpi);
      $.fn.zTree.init($("#treeLoss"), this.setting, this.zNodesLoss);
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
