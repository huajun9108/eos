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
    <div :id="_id" class="chart" @click="sendData"></div>
</template>

<script>
    import echarts from 'echarts';
    var barChart,lineOrBarChart,lineChart,LineAndBarChart=[],oldLineAndBarChart=[],oldIndex=-1;
    var LineAndBarData
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
        _chartData:Array,
        _type:String,
        _index: Number,
    },
    methods: {
        sendData(){
            this.$emit("recieveData",LineAndBarData+","+this._id)
        }
    },
    watch:{
      _chartData(val){
        switch (this._type){
            case "Line":
            drawLine(val,this._id,this._titleText,this._xText,this._yText);
            break
            case "LineAndBar":
            drawLineAndBar(val,this._id,this._titleText,this._xText,this._yText,this._index);
            break
            case "LineOrBar":
            drawLineOrBar(val,this._id,this._titleText,this._xText,this._yText);
            break
            case "Bar":
            drawBar(val,this._id,this._titleText,this._xText,this._yText);
            break
        }
      },
      listData(newVal) {
        _this.dataList = newVal;
      }
    },
    computed: {

    },
    mounted() {
      switch (this._type){
            case "Line":
            drawLine(this._chartData,this._id,this._titleText,this._xText,this._yText);
            break
            case "LineOrBar":
            drawLineOrBar(this._chartData,this._id,this._titleText,this._xText,this._yText);
            break
            case "LineAndBar":
            drawLineAndBar(this._chartData,this._id,this._titleText,this._xText,this._yText,this._index);
            break
            case "Bar":
            drawBar(this._chartData,this._id,this._titleText,this._xText,this._yText);
            break
        }
    }
  }
  //绘制函数
    function drawLine(chartData,id,titleText,xText,yText) {
        if (lineChart != null && lineChart != "" && lineChart != undefined) {
            lineChart.dispose();
        }
        if(!chartData){
            return
        }
        lineChart = echarts.init(document.getElementById(id))
        var xAxisData = chartData.map(function (item) {return item[0]})
        var factData = chartData.map(function (item) {return item[1]})
        var expectData = chartData.map(function (item) {return item[2]})
        lineChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'shadow',
            label: {
                show: true,
            }
            }
        },
        legend: {
            data: ['实际',"预测"],
            textStyle: {
            color: '#ccc'
            }
        },
        xAxis: {
            data: xAxisData,
            axisTick:{
                show:false
            },
        },
        yAxis: {
            splitLine: {show: false},
            axisTick:{
                show:false
            },
        },
        series: [{
            name: "预测",
            type: 'line',
            data: expectData,
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
        },{
            name: "实际",
            type: 'line',
            data: factData,
            lineStyle: {
                normal: {
                    opacity: 0.5,
                    color:"#3670be"
                }
            },
            itemStyle:{
                normal:{
                    color:"#3670be"
                }
            },
        },]
        })
    }
    function drawLineAndBar(chartData,id,titleText,xText,yText,index) {
        if(index === 0 && oldIndex === 2) {
            oldLineAndBarChart = LineAndBarChart;
            LineAndBarChart = [];
        }
        if (oldLineAndBarChart[index] != null && oldLineAndBarChart[index]!= "" && oldLineAndBarChart[index] != undefined) {
            oldLineAndBarChart[index].dispose();
        }
        if(index === 2 ) {
            oldLineAndBarChart=[];
        }
        var charts = echarts.init(document.getElementById(id));
        LineAndBarChart.push(charts);
        oldIndex = index;
        if(chartData.length<=0){
            return
        }
        var xAxisData = chartData.map(function (item) {return item[0]})
        var currentData = chartData.map(function (item) {return item[1]})
        var targetData = chartData.map(function (item) {return item[2]})
        var visionData = chartData.map(function (item) {return item[3]})
        var idealData = chartData.map(function (item) {return item[4]})
        if(!xAxisData) return;
        var option = {
        tooltip: {
            trigger: 'axis',
            show:true,
            axisPointer: {
                type: 'shadow',
                label: {
                    show: false,
                }
            },
            textStyle:{
            align:'left'
            },
        },
        xAxis: {
            data: xAxisData,
            axisTick:{
                show:false
            },
        },
        yAxis: {
            splitLine: {show: false},
            axisTick:{
                show:false
            },
            axisLabel:{
                color:"#040404",
                formatter: '{value} %'
            }
        },
        dataZoom: [{
            textStyle: {
                color: '#8392A5'
            },
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            dataBackground: {
                areaStyle: {
                    color: '#8392A5'
                },
                lineStyle: {
                    opacity: 0.8,
                    color: '#8392A5'
                }
            },
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }, {
            type: 'inside'
        }],
        series: [
            {
                name: "KPI",
                type: 'bar',
                smooth: true,
                symbolSize: 10,
                data: currentData,
                lineStyle: {
                    normal: {
                        opacity: 0.5,
                        color:"#3670be"
                    }
                },
                itemStyle:{
                    normal:{
                        color:"#3670be"
                    }
                },
            },
            {
                name: 'target',
                type: 'line',
                data: targetData,
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
                name: 'vision',
                type: 'line',
                data:  visionData,
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
                name: 'ideal',
                type: 'line',
                data: idealData,
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
            }
            ]
        }
        charts.setOption(option)
        charts.on('click',function(params){ // 控制台打印数据的名称
            let arr=[]
            option.series.forEach(item=>{
                arr.push(item.data[params.dataIndex])
            })
            LineAndBarData = arr
        })
    }
    function drawLineOrBar(chartData,id,titleText,xText,yText) {
        if (lineOrBarChart != null && lineOrBarChart != "" && lineOrBarChart != undefined) {
            lineOrBarChart.dispose();
            lineOrBarChart = null;
        }
        if(!chartData){
            return
        }
        lineOrBarChart = echarts.init(document.getElementById(id))
        let xAxisData = chartData.map(function (item) {return item.key})
        let yAxisData = chartData.map(function (item) {return item.value})
        lineOrBarChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: [{name:yText}]
        },
        grid: {
            left: '3%',
            right: '3%',
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
            barWidth : 30,//柱图宽度
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
        if (barChart != null && barChart != "" && barChart != undefined) {
            barChart.dispose();
            barChart = null;
        }
        if(!chartData){
            return
        }
        let keys = [];
        barChart = echarts.init(document.getElementById(id))
        let xAxisData = chartData.map(function (item) {
                return item.key
            })
        let yAxisData = chartData.map(function (item) {
                return item.value;
            })
        let machineColor ='#3670be';
        let materialColor ='#ffd189';
        let humanColor = '#b7b7b7';
        barChart.setOption({
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
                left: '3%',
                right: '3%',
                containLabel: true
            },
            xAxis:  {
                type: 'category',
                data: ['项目池','准备启动','实施运行','成果跟踪','项目关闭'],
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
                    barWidth : 30,
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
                    barWidth : 30,
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
                    barWidth : 30,
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
