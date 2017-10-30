<template>
    <div class="loss">
        <div class="tableContainer">
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
  				<td>{{ d.Tier1 }}</td>
  				<td>{{ d.Tier2 }}</td>
  				<td></td>
                <td></td>
                <td></td>
  				<td></td>
  			</tr>
      		</tbody>
		</table>
	</div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data(){
           return{
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
					"Tier1": "Inventory Losses",
					"Tier2": "InvLoss"
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
					"Tier1": "Indirect Staff",
					"Tier2": "IndStaff"
				},
				{
					"number": 17,
					"Tier1": "Quality",
					"Tier2": "QuaEff"
				},
				{
					"number": 18,
					"Tier1": "Internal CoNQ",
					"Tier2": "IntCoNQ"
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
