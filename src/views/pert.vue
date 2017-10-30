<template>
<div class="perfTargetContainer">
	<div class="oeeContainer col-md-4">
		<div id="oeeDashboardId" class="oeeDashboard">

		</div>
		<div class="oeeTable">
			<table class="table">
				<tr>
					<th colspan="2">OEE</th>
				</tr>
				<tr>
					<td>Performance</td>
					<td>72%</td>
				</tr>
				<tr>
					<td>Target</td>
					<td>80%</td>
				</tr>
				<tr>
					<td>Vision</td>
					<td>90%</td>
				</tr>
				<tr>
					<td>Ideal</td>
					<td>99%</td>
				</tr>
			</table>
		</div>
	</div>
	<div class="defectsContainer col-md-4">
		<div id="defectsDashboardId" class="defectsDashboard">

		</div>
		<div class="defectsTable">
			<table class="table">
				<tr>
					<th colspan="2">Defects</th>
				</tr>
				<tr>
					<td>Performance</td>
					<td>72%</td>
				</tr>
				<tr>
					<td>Target</td>
					<td>80%</td>
				</tr>
				<tr>
					<td>Vision</td>
					<td>90%</td>
				</tr>
				<tr>
					<td>Ideal</td>
					<td>99%</td>
				</tr>
			</table>
		</div>
	</div>
	<div class="xxxContainer col-md-4">
		<div id="xxxDashboardId" class="xxxDashboard">

		</div>
		<div class="xxxTable">
			<table class="table">
				<tr>
					<th colspan="2">xxx</th>
				</tr>
				<tr>
					<td>Performance</td>
					<td>72%</td>
				</tr>
				<tr>
					<td>Target</td>
					<td>80%</td>
				</tr>
				<tr>
					<td>Vision</td>
					<td>90%</td>
				</tr>
				<tr>
					<td>Ideal</td>
					<td>99%</td>
				</tr>
			</table>
		</div>
	</div>
	<div class>

	</div>
</div>
</template>
<script type="text/javascript">
import Top from "../components/top.vue";
import echarts from "echarts"
export default {
	name: 'pert',
	components: {
		etop: Top,
	},
	data() {
		return {}
	},
	methods: {
		initCharts: function() {
			var myChart1 = echarts.init(document.getElementById('oeeDashboardId'));
			var myChart2 = echarts.init(document.getElementById('defectsDashboardId'));
			var myChart3 = echarts.init(document.getElementById('xxxDashboardId'));

			var option = {
				series: [{
					name: '业务指标',
					type: 'gauge',
					detail: {
						formatter: '{value}%',
						color: '#292929',
						fontSize: 40,
						offsetCenter: [0, '70%'],
					},
					data: [{
						value: 50,
					}],
					axisLine: {
						show: false,
						lineStyle: {
							width: 15,
							color: [
								[0.7, '#ff7437'],
								[0.8, '#ffd93f'],
								[0.9, '#00ffa8'],
								[1, '#0059d2'],
							]
						}
					},
					axisTick: {
						show: false,
					},
					axisLabel: {
						// show: false,
					}
				}]
			};

			myChart1.setOption(option, true);
			myChart2.setOption(option, true);
			myChart3.setOption(option, true);
		}
	},
	mounted: function() {
		this.initCharts();
	}
}
</script>
