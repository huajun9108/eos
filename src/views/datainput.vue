<template>
<div class="overview common">
	<ul class="overul clearfix">
		<router-link :to="{name:'kpi'}">
			<li>
				KPI
			</li>
		</router-link>
		<router-link :to="{name:'loss'}">
			<li>
				LOSS
			</li>
		</router-link>
	</ul>
	<div class="overcontent">
		<div class="showAreaAndShift" @click="showFlag=!showFlag">
			<span :class="showFlag?'iconfont icon-drop-down2 rotate':'iconfont icon-drop-down2'"></span>
			<span class="areaAndShift">区域/班次</span>
		</div>
		<div :class="showFlag?'showchoose':'hidechoose'">
			<div class="chooseArea box">
				<span class="title">区域选择</span>
				<ul id="area" class="ztree"></ul>
			</div>
			<div class="chooseShift box">
				<span class="title">班次选择</span>
				<div id="shift" style="width: 600px;height:400px;">
				</div>
			</div>
		</div>
		<router-view></router-view>
	</div>

</div>
</template>
<script>
import echarts from "echarts"

export default {
	data: function() {
		return {
			showFlag: false,
      setting: {
				async: {
					enable: true,
					url: "http://116.196.113.167:3001/areaAllSet/showAreaAll",
					type: "get"
				},
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
		}
	},
  methods: {
		getVirtulData: function(year) {
			year = year || '2017';
			var date = +echarts.number.parseDate(year + '-01-01');
			var end = +echarts.number.parseDate((+year + 1) + '-01-01');
			var dayTime = 3600 * 24 * 1000;
			var data = [];
			for (var time = date; time < end; time += dayTime) {
				data.push([
					echarts.format.formatTime('yyyy-MM-dd', time),
					Math.floor(Math.random() * 1000)
				]);
			}
			return data;
		},
		initCharts: function() {
			var myChart = echarts.init(document.getElementById('shift'));
			var option = {
				tooltip: {
					position: 'top',
					formatter: function(p) {
						var format = echarts.format.formatTime('yyyy-MM-dd', p.data[0]);
						return format + ': ' + p.data[1];
					}
				},
				visualMap: {
					min: 0,
					max: 1000,
					calculable: true,
					orient: 'vertical',
					left: '670',
					top: 'center'
				},

				calendar: [
					{
            left: 50,
						orient: 'vertical',
						range: '2016'
					},
					{
						left: 250,
						cellSize: [20, 'auto'],
						bottom: 10,
						orient: 'vertical',
						range: '2017',
						dayLabel: {
							margin: 5
						}
					}
				],

				series: [{
					type: 'heatmap',
					coordinateSystem: 'calendar',
					calendarIndex: 0,
					data: this.getVirtulData(2016)
				}, {
					type: 'heatmap',
					coordinateSystem: 'calendar',
					calendarIndex: 1,
					data: this.getVirtulData(2017)
				}]
			};
			myChart.setOption(option, true);
		}
	},
  mounted() {
    this.initCharts();
    $.fn.zTree.init($("#area"), this.setting);
  }
}
</script>
<style lang="sass" scoped>
</style>
