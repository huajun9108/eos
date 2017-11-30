<style scoped>
    .chart {
        width: 100%;
        height: 90%;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
    }
</style>
<template>
    <div :id="_id" class="chart"></div>
</template>

<script>
    import {mapActions,mapState} from "vuex";
    import echarts from 'echarts';
    var startChart,endChart;
    export default {
    data() {
        return {
        }
    },
    props:{
        _id:String,
        _titleText:String,
        _xText:String,
        _yText:String,
        _chartData:Object,
        _type:String
    },
    methods: {
         
    },
    watch:{
      _chartData(val){
        switch (this._type){
            // case "LineAndBar":
            // drawLineAndBar(val,this._id,this._titleText,this._xText,this._yText);
            // break
            // case "LineOrBar":
            // drawLineOrBar(val,this._id,this._titleText,this._xText,this._yText);
            // break
            // case "Pie":
            // drawPie(val,this._id,this._titleText,this._xText,this._yText);
            // break
            // case "Candlestick":
            // drawCandlestick(val,this._id,this._titleText,this._xText,this._yText);
            // break
            case "Bar":
            drawBar(val,this._id,this._titleText,this._xText,this._yText);
            break
            // default:
            // drawLineAndBar(val,this._id,this._titleText,this._xText,this._yText);
            // break
        }
      }
    },
    computed: {
        ...mapState(["projectStatus"])
    },
    mounted() {
        
      switch (this._type){
            // case "LineAndBar":
            // drawLineAndBar(this._chartData,this._id,this._titleText,this._xText,this._yText);
            // break
            // case "LineOrBar":
            // drawLineOrBar(this._chartData,this._id,this._titleText,this._xText,this._yText);
            // break
            // case "Pie":
            // drawPie(this._chartData,this._id,this._titleText,this._xText,this._yText);
            // break
            // case "Candlestick":
            // drawCandlestick(this._chartData,this._id,this._titleText,this._xText,this._yText);
            // break
            case "Bar":
            drawBar(this._chartData,this._id,this._titleText,this._xText,this._yText);
            break
            // default:
            // drawLineAndBar(this._chartData,this._id,this._titleText,this._xText,this._yText);
            // break
        }
    }
  }
  //绘制函数
    function drawLineAndBar(chartData,id,titleText,xText,yText) {
        var chart = echarts.init(document.getElementById(id))
        var xAxisData = chartData.map(function (item) {return item[0]})
        var yAxisData = chartData.map(function (item) {return item[1]})
        chart.setOption({
        backgroundColor: '#0f375f',
        title: {
            text: titleText,
            subtext: ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'shadow',
            label: {
                show: true,
                backgroundColor: '#333'
            }
            }
        },
        toolbox: {
            feature: {
            saveAsImage: {show: true}
            },
            top: 10,
            right: 40
        },
        legend: {
            data: ['line', 'bar'],
            textStyle: {
            color: '#ccc'
            }
        },
        xAxis: {
            data: xAxisData,
            axisLine: {
            lineStyle: {
                color: '#ccc'
            }
            }
        },
        yAxis: {
            splitLine: {show: false},
            axisLine: {
            lineStyle: {
                color: '#ccc'
            }
            }
        },
        series: [{
            name: yText,
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 15,
            data: yAxisData
        }, {
            name: yText,
            type: 'bar',
            barWidth: 10,
            itemStyle: {
            normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#14c8d4'},
                    {offset: 1, color: '#43eec6'}
                ]
                )
            }
            },
            data: yAxisData
        }]
        })
    }
    function drawLineOrBar(chartData,id,titleText,xText,yText) {
        var chart = echarts.init(document.getElementById(id))
        var xAxisData = chartData.map(function (item) {return item[0]})
        var yAxisData = chartData.map(function (item) {return item[1]})
        chart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            // orient: 'horizontal',
            // left: 'left',
            data: [{name:yText}]
        },
        grid: {
            left: '3%',
            right: '6%',
            // bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xAxisData,
                axisTick:{
                    show:false
                },
            },
            
        ],
        yAxis: [
            {
                type: 'value',
                axisTick:{
                    show:false
                },
            }
        ],
        series: [
            {
            name: yText,
            type: 'bar',
            itemStyle: {
                normal: {
                color: '#3670be',
                }
            },
            data: yAxisData
            }
        ]
        })
    }
    function drawBar(chartData,id,titleText,xText,yText) {
        console.log(chartData)
        if(!chartData){
            console.log(1)
            return
        }
        if(chartData.status==1){
            startChart.dispose();
            endChart.dispose();
        }
        
        if(chartData.status==0){
            if(chartData.data.type=="start"){
                if (startChart != null && startChart != "" && startChart != undefined) {
                    startChart.dispose();
                }
                var chart = echarts.init(document.getElementById(id))
                startChart = chart
            }
            if(chartData.data.type=="end"){
                if (endChart != null && endChart != "" && endChart != undefined) {
                    endChart.dispose();
                }
                var chart = echarts.init(document.getElementById(id))
                endChart = chart
            }
        }
        if(chartData=== ""){
          return;
        }
        var keys = [];
        var xAxisData = chartData.data.status.map(function (item) {
                return item.key
            })
        var yAxisData = chartData.data.status.map(function (item) {
                return item.value;
            })
        let machineColor ='#3670be';
        let materialColor ='#ffd189';
        let humanColor = '#b7b7b7';
        chart.setOption({
            noDataLoadingOption: {
                text: '暂无数据',
                effect: 'bubble',
                effectOption: {
                    effect: {
                        n: 0
                    }
                }
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data:xAxisData
            },
            grid: {
                left: 0,
                containLabel: true
            },
            xAxis:  {
                type: 'category',
                data: ['项目池','准备启动','实施运行','实施延迟','成果跟踪','项目关闭'],
                axisTick:{
                    show:false
                }
            },
            yAxis: {
                type: 'value',
                axisTick:{
                    show:false
                },
            },
            series: [
                {
                    name: xAxisData[0],
                    type: 'bar',
                    stack: '总量',
                    itemStyle:{
                        normal:{
                            color:machineColor
                        }
                    },
                    data: yAxisData[0]
                },
                {
                    name: xAxisData[1],
                    type: 'bar',
                    stack: '总量',
                    itemStyle:{
                        normal:{
                            color:materialColor
                        }
                    },
                    data: yAxisData[1]
                },
                {
                    name: xAxisData[2],
                    type: 'bar',
                    stack: '总量',
                    itemStyle:{
                        normal:{
                            color:humanColor
                        }
                    },
                    data:  yAxisData[2]
                },
            ]
                    
                
        },true)
    }
    function drawPie(chartData,id,titleText,xText,yText) {
        var chart = echarts.init(document.getElementById(id))
        var xAxisData = chartData.map(function (item) {return item[0]})
        var pieData = []
        chartData.forEach((v,i)=>{
        pieData.push({
            name:v[0],
            value:v[1]
        })
        })
        chart.setOption({
        title : {
            text: titleText,
            subtext: '',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: xAxisData
        },
        series : [
            {
            name: xText,
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:pieData,
            itemStyle: {
                emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
            }
        ]
        })
    }
    function splitData(rawData) {
        var categoryData = [];
        var values = []
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i])
        }
        return {
            categoryData: categoryData,
            values: values
        };
    }
    function drawCandlestick(chartData,id,titleText,xText,yText) {
        let upColor ='#3670be';
        let upBorderColor ='#3670be';
        let downColor = '#f3d3a1';
        let downBorderColor = '#f3d3a1';
        let _this = this
        let chart = echarts.init(document.getElementById(id))
        let data0 = splitData(chartData[0].data0)
        let vision = chartData[0].vision
        let target = chartData[0].target
        let ideal = chartData[0].ideal
        chart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            grid: {
                left: '10%',
                right: '10%',
                // bottom: '15%'
            },
            xAxis: {
                type: 'category',
                data: data0.categoryData,
                scale: true,
                boundaryGap : false,
                axisLine: {
                    onZero: false,
                    lineStyle:{
                        color:"#e4e4e4"
                    }
                },
                splitLine: {show: false},
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax',
                axisLabel:{
                    color:"#040404"
                }
        
                
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 100,
                splitArea: {
                    show: true
                },
                axisLine: {
                    lineStyle:{
                        color:"#e4e4e4"
                    }
                },
                axisLabel:{
                    color:"#040404",
                    formatter: '{value} %'  
                }

            },
            series: [
                {
                    type: 'candlestick',
                    data: data0.values,
                    itemStyle: {
                        normal: {
                            color: upColor,
                            color0: downColor,
                            borderColor:upBorderColor,
                            borderColor0: downBorderColor
                        }
                    },
                    // markPoint: {
                    //     tooltip: {
                    //         formatter: function (param) {
                    //             return param.name + '<br>' + (param.data.coord || '');
                    //         }
                    //     }
                    // },
                },
                {
                    name: 'vision',
                    type: 'line',
                    data:  vision,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            opacity: 0.5,
                            color:"#a54141"
                        }
                    },
                    itemStyle:{
                        normal:{
                            color:"#a54141"
                        }
                    },

                },
                {
                    name: 'target',
                    type: 'line',
                    data: target,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            opacity: 0.5,
                            color:"#cb8b2e"
                        }
                    },
                    itemStyle:{
                        normal:{
                            color:"#cb8b2e"
                        }
                    },
                },
                {
                    name: 'ideal',
                    type: 'line',
                    data: ideal,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            opacity: 0.5,
                            color:"#476f7b"
                        }
                    },
                    itemStyle:{
                        normal:{
                            color:"#476f7b"
                        }
                    },
                },
            ]
            
        })
    }
</script>
