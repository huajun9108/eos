<template>
<div class="datainput">
	<div class="tableContainer">
		<table class="table table-hover table-bordered text-center">
			<thead>
				<tr>
					<td>编号</td>
					<td>Tier 1</td>
					<td>Tier 2</td>
					<td>数值</td>
					<td>编辑</td>
				</tr>
			</thead>
      		<tbody>
        		<tr>
					<td>1</td>
					<td>Volume</td>
					<td>Volume</td>
					<td></td>
					<td class="icon-edit"></td>
  				</tr>
				<tr>
					<td>2</td>
					<td>Machine</td>
					<td>OEE</td>
					<td></td>
					<td class="icon-edit"></td>
  				</tr>
  				<tr>
					<td>3</td>
					<td>Material</td>
					<td>MatEff</td>
					<td></td>
					<td class="icon-edit"></td>
				</tr>
				<tr>
					<td rowspan="2">4</td>
					<td rowspan="2">Manpower</td>
					<td>OLE</td>
					<td></td>
					<td class="icon-edit"></td>
				</tr>
				<tr>
					<td>Manlnd</td>
					<td></td>
					<td class="icon-edit"></td>
				</tr>
  				<tr>
					<td rowspan="2">5</td>
					<td rowspan="2">Energy</td>
					<td>EneCons</td>
					<td></td>
					<td class="icon-edit"></td>
  				</tr>
  				<tr>
					<td>Energy</td>
					<td></td>
					<td class="icon-edit"></td>
				</tr>
  			<tr v-for="(d,index) in tableData" :key="index">
  				<td>{{ d.number }}</td>
  				<td>{{ d.Tier1 }}</td>
  				<td>{{ d.Tier2 }}</td>
  				<td></td>
  				<td class="icon-edit"></td>
  			</tr>
      		</tbody>
		</table>
	</div>
</div>
</template>


<script>
import router from "../router/index.js";

export default {
	data: function() {
		return {
			tableData: [{
					"number": 6,
					"Tier1": "Packaging",
					"Tier2": "PackEff"
				},
				{
					"number": 7,
					"Tier1": "Consumables",
					"Tier2": "ConsCons"
				},
				{
					"number": 8,
					"Tier1": "Fluids",
					"Tier2": "FluidCons"
				},
				{
					"number": 9,
					"Tier1": "Maintenance",
					"Tier2": "MaintCosts"
				},
				{
					"number": 10,
					"Tier1": "Subcontractors",
					"Tier2": "SubCost"
				},
				{
					"number": 11,
					"Tier1": "Logistic",
					"Tier2": "LogCost"
				},
				{
					"number": 12,
					"Tier1": "inventory Losses",
					"Tier2": "invLoss"
				},
				{
					"number": 13,
					"Tier1": "Logistic Efficiency",
					"Tier2": "LogEff"
				},
				{
					"number": 14,
					"Tier1": "Transport",
					"Tier2": "Fillln"
				},
				{
					"number": 15,
					"Tier1": "Administration",
					"Tier2": "AdmEff"
				},
				{
					"number": 16,
					"Tier1": "indirect Staff",
					"Tier2": "indStaff"
				},
				{
					"number": 17,
					"Tier1": "Quality",
					"Tier2": "QuaEff"
				},
				{
					"number": 18,
					"Tier1": "Internal CoNQ",
					"Tier2": "intCoNQ"
				},
				{
					"number": 19,
					"Tier1": "Others",
					"Tier2": "OthCost"
				},
				{
					"number": 20,
					"Tier1": "External CoNQ",
					"Tier2": "ExtCoNQ"
				},
			],
		}
	}



}
</script>
