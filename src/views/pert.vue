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
	<div class="showTimeAndArea" @click="showFlag=!showFlag">
		<span :class="showFlag?'iconfont icon-drop-down2 rotate':'iconfont icon-drop-down2'"></span>
		<span class="areaAndTime">区域/时间</span>
	</div>
	<transition>
	<div :class="showFlag?'showchoose':'righthide'">
		<div class="chooseTime box">
			<h1>时间选择</h1>
			<div class="time">
				<span>开始时间</span>
				<date-picker :date="startTime" :option="option" :limit="limit"></date-picker>
			</div>
			<div class="time">
				<span>结束时间</span>
				<date-picker :date="endtime" :option="option" :limit="limit"></date-picker>
			</div>
		</div>
		<div class="chooseArea box">
			<h1>区域选择</h1>
			<div class="area">
				<ul id="treeDemo" class="ztree"></ul>
			</div>
		</div>
	</div>
	</transition>
</div>
</template>
<script type="text/javascript">
import { mapState, mapActions } from "vuex";
import myDatepicker from 'vue-datepicker'
import echarts from "echarts"
export default {
	components: {
		'date-picker': myDatepicker
	},
	data() {
		return {
			setting: {
			view: {
			selectedMulti: false,
			showIcon: false,
			},
			data: {
			simpleData: {
				enable: true
			}
			},
			check: {
			  enable: true,
			  chkStyle: "checkbox",
			  radioType: "level"
			},
			},
			validareaList:[],
			showFlag:false,
			startTime: {
				time: ''
			},
			endtime: {
				time: ''
			},
			option: {
				type: 'day',
				week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
				month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				format: 'YYYY-MM-DD',
				placeholder: 'when?',
				inputStyle: {
					'background':'#e1e1e1',
					'display': 'inline-block',
					'width': '150px',
					'line-height': '22px',
					'font-size': '16px',
					'border': 'none',
					'border-radius': '11px',
					'color': '#131313',
					'text-align':'center'
				},
				color: {
				header: '#ccc',
				headerText: '#f00'
				},
				buttons: {
				ok: 'Ok',
				cancel: 'Cancel'
				},
				overlayOpacity: 0.5, // 0.5 as default
				dismissible: true // as true as default
			},
			timeoption: {
				type: 'min',
				week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
				month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				format: 'YYYY-MM-DD HH:mm'
			},
			multiOption: {
				type: 'multi-day',
				week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
				month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				format:"YYYY-MM-DD HH:mm"
			},
			limit: [
				// {
				// 	type: 'weekday',
				// 	available: [1, 2, 3, 4, 5]
				// },
				// {
				// 	type: 'fromto',
				// 	from: '2016-02-01',
				// 	to: '2016-02-20'
				// }
			]
		}	
	},
	methods: {
		...mapActions([
			'selectUserById',
			]),
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
								[0.9, '#25ddbd'],
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
	computed: {
		...mapState([
      		"validarea"
      	])
	},
	watch: {
		validarea(newVal){
			this.validarea.forEach(item=> {
				if(item.checked){
					this.validareaList.push(item)
				}
			});
			$.fn.zTree.init($("#treeDemo"), this.setting, this.validareaList);
    	},
	},
	mounted: function() {

		this.initCharts();
		if (sessionStorage.getItem("userid")) {
		this.selectUserById({userid:sessionStorage.getItem("userid")})
		//  $.fn.zTree.init($("#treeDemo"), this.setting, this.validarea);
		} else {
		console.log(this.$route);
		// this.selectAreaAll();
		// $.fn.zTree.init($("#treeDemo"), this.setting, this.areaAll);
		}
	}
}
</script>
