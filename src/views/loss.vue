<template>
    <div class="loss">
        <div class="sti-tbl-container">
			<div class="sti-tbl-header" style="padding-right:17px;">
				<table class="table table-hover table-bordered text-center">
					<thead class="fixedThead">
						<tr>
							<td >编号</td>
							<td >Tier 1</td>
							<td >Tier 2</td>
							<td >Tier 3</td>
							<td >开始时间</td>
							<td >结束时间</td>
							<td >备注</td>
						</tr>
					</thead>
				</table>
			</div>
			<div class="sti-tbl-body">
				<table class="table table-bordered">
					<tbody class="scrollTbody">
						<tr>
							<td>1</td>
							<td>Volume</td>
							<td>Volume</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td rowspan="10">2</td>
							<td rowspan="10">Machine</td>
							<td rowspan="10">OEE</td>
							<td>Lack of demand</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Preventive Maintenance</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Training, Meetings & Shift Breaks</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Breakdowns</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Short Stops</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>First Level Maintenance</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Lack Of Resources & Waiting</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Setup Time & Adjustment</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Process Incidents</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Speed Loss</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>3</td>
							<td>Material</td>
							<td>MatEff</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td rowspan="2">4</td>
							<td rowspan="2">Manpower</td>
							<td>OLE</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Manlnd</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>     
						</tr>
						<tr>
							<td rowspan="2">5</td>
							<td rowspan="2">Energy</td>
							<td>EneCons</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Energy</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td> 
						</tr>
						<tr v-for="(d,index) in tableData" :key="index">
							<td>{{ d.number }}</td>
							<td>{{ d.tier1 }}</td>
							<td>{{ d.tier3 }}</td>
							<td></td>
							<td></td>
							<td></td>	
							<td></td>
						</tr>
					</tbody>
				</table>
			</table>
		</div>
	</div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data(){
           return{
               tableData: [{
					"number": 6,
					"tier1": "Packaging",
					"tier3": "PackEff"
				},
				{
					"number": 7,
					"tier1": "Consumables",
					"tier3": "ConsCons"
				},
				{
					"number": 8,
					"tier1": "Fluids",
					"tier3": "FluidCons"
				},
				{
					"number": 9,
					"tier1": "Maintenance",
					"tier3": "MaintCosts"
				},
				{
					"number": 10,
					"tier1": "Subcontractors",
					"tier3": "SubCost"
				},
				{
					"number": 11,
					"tier1": "Logistic",
					"tier3": "LogCost"
				},
				{
					"number": 12,
					"tier1": "Inventory Losses",
					"tier3": "InvLoss"
				},
				{
					"number": 13,
					"tier1": "Logistic Efficiency",
					"tier3": "LogEff"
				},
				{
					"number": 14,
					"tier1": "Transport",
					"tier3": "Fillln"
				},
				{
					"number": 15,
					"tier1": "Administration",
					"tier3": "AdmEff"
				},
				{
					"number": 16,
					"tier1": "Indirect Staff",
					"tier3": "IndStaff"
				},
				{
					"number": 17,
					"tier1": "Quality",
					"tier3": "QuaEff"
				},
				{
					"number": 18,
					"tier1": "Internal CoNQ",
					"tier3": "IntCoNQ"
				},
				{
					"number": 19,
					"tier1": "Others",
					"tier3": "OthCost"
				},
				{
					"number": 20,
					"tier1": "External CoNQ",
					"tier3": "ExtCoNQ"
				},
			],
           }
        }
    }
</script>
