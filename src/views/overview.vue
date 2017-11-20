<template>
    <div class="overview user_common">
        <div class="overview_content  user_maincontent">
        <div class="showTimeAndArea" @click="showlDialog">
            <span :class="isShow?'iconfont icon-drop-down2 rotate':'iconfont icon-drop-down2'"></span>
            <span class="areaAndShift">时间/区域</span>
        </div>
        <v-timearea v-show="isShow"></v-timearea>
            <span class="overview_title">Performance</span>
            <div class="over_table">
                <table class="table table-hover text-center overview_tableBody">
                    <tbody>
                        <tr>
                            <td class="firstCol" width="10%">OEE</td>
                            <td id="oee" class="secordCol" width="60%"></td>
                            <td width="30%" class="text-left item_td">
                                <div class="item_table item_top">
                                    <div class="item_table_title">
                                        <span class="item_table_no">值</span>
                                        <span class="item_table_value">72</span>
                                    </div>
                                    <ul class="item_table_detail">
                                        <li class="item_table_de">
                                            <div class="item_img">
                                                <img src="../assets/images/yellow.png"  />
                                            </div>
                                            <span class="item_table_deno">Target</span>
                                            <span class="item_table_devalue">Target</span>
                                        </li>
                                        <li class="item_table_de">
                                            <div class="item_img">
                                                <img src="../assets/images/red.png"  />
                                            </div>
                                            <span class="item_table_deno">Vision</span>
                                            <span class="item_table_devalue">Ideal</span>
                                        </li>
                                        <li class="item_table_de">
                                            <div class="item_img">
                                                <img src="../assets/images/blue.png"  />
                                            </div>
                                            <span class="item_table_deno">Ideal</span>
                                            <span class="item_table_devalue">Target</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="item_table item_bottom">
                                    <div class="top top_left">
                                        <span class="top_title">Loss Top 3</span>
                                        <div class="top_detail">
                                            <div class="top_item">
                                                <span class="item_no">1</span><span class="item_value">Lack of demand</span>
                                            </div> 
                                            <div class="top_item">
                                                <span class="item_no">2</span><span class="item_value">Breakdowns</span>
                                            </div> 
                                            <div class="top_item last_ltem">
                                                <span class="item_no">3</span><span class="item_value">First Level Maintenance</span>
                                            </div>  
                                        </div>
                                    </div>
                                    <div class="top">
                                        <span class="top_title">Loss Top 3</span>
                                        <div class="top_detail">
                                            <div class="top_item">
                                                <span class="item_no">1</span><span class="item_value">Lack of demand</span>
                                            </div> 
                                            <div class="top_item">
                                                <span class="item_no">2</span><span class="item_value">Breakdowns</span>
                                            </div> 
                                            <div class="top_item last_ltem">
                                                <span class="item_no">3</span><span class="item_value">First Level Maintenance</span>
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                         <tr>
                            <td class="firstCol" width="10%">OEE</td>
                            <td id="oee" class="secordCol" style="width: 600px;height:220px;" width="60%"></td>
                            <td width="30%"></td>
                        </tr>
                         <tr>
                            <td class="firstCol" width="10%">OEE</td>
                            <td id="oee" class="secordCol" style="width: 600px;height:220px;" width="60%"></td>
                            <td width="30%"></td>
                        </tr>
                         <tr>
                            <td class="firstCol" width="10%">OEE</td>
                            <td id="oee" class="secordCol" style="width: 600px;height:220px;" width="60%"></td>
                            <td width="30%"></td>
                        </tr>
                         <tr>
                            <td class="firstCol" width="10%">OEE</td>
                            <td id="oee" class="secordCol" style="width: 600px;height:220px;" width="60%"></td>
                            <td width="30%"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>   
</template>
<script>
import echarts from "echarts"
import timearea from "../components/timeArea"
export default {
    components: {
        "v-timearea": timearea
    },
   data(){
       return{
        isShow:false,
        upColor : '#3670be',
        upBorderColor :'#3670be',
        downColor : '#f3d3a1',
        downBorderColor :'#f3d3a1',
        data0 :this.splitData([
            ['2013/1/24', 60,30,40,79.5],
            ['2013/1/25', 22.3,80,40,80],
            ['2013/1/28', 10,69.5,40,90.6],
            ['2013/1/29', 20,55.5,40,76.3],
            ['2013/1/30', 22.5,60,40,70.2],
            ['2013/1/31', 32.5,55.5,40,80],
            ['2013/2/1', 70.3,22.2,10.3,30.3],
            ['2013/2/4', 22.4,59,40,80],
            ['2013/2/5', 70.3,22.2,10.3,30.3],
            ['2013/2/6', 22.5,60,40,70.2],
            ['2013/2/7', 10,69.5,40,90.6],
            ['2013/2/8', 22.3,80,40,80],
            ['2013/2/18', 10,69.5,40,90.6],
            ['2013/2/19', 32.5,55.5,40,80],
            ['2013/2/20', 10,69.5,40,90.6],
            // ['2013/2/21',60,59,40,80],
            // ['2013/2/22', 60,59,40,80],
            // ['2013/2/25', 60,59,40,80],
            // ['2013/2/26', 60,59,40,80],
            // ['2013/2/27', 60,59,40,80],
            // ['2013/2/28', 60,59,40,80],
            // ['2013/3/1', 60,59,40,80],
            // ['2013/3/4', 60,59,40,80],
            // ['2013/3/5', 60,59,40,80],
            // ['2013/3/6', 60,59,40,80],
            // ['2013/3/7', 60,59,40,80],
            // ['2013/3/8', 60,59,40,80],
            // ['2013/3/11',60,59,40,80],
            // ['2013/3/12',60,59,40,80],
            // ['2013/3/13',60,59,40,80],
            // ['2013/3/14',60,59,40,80],
            // ['2013/3/15', 60,59,40,80],
            // ['2013/3/18', 60,59,40,80],
            // ['2013/3/19', 60,59,40,80],
            // ['2013/3/20', 60,59,40,80],
            // ['2013/3/21', 60,59,40,80],
            // ['2013/3/22', 60,59,40,80],
            // ['2013/3/25', 60,59,40,80],
            // ['2013/3/26', 60,59,40,80],
            // ['2013/3/27', 60,59,40,80],
            // ['2013/3/28', 60,59,40,80],
            // ['2013/3/29', 60,59,40,80],
            // ['2013/4/1', 60,59,40,80],
            // ['2013/4/2', 60,59,40,80],
            // ['2013/4/3',60,59,40,80],
            // ['2013/4/8', 60,59,40,80],
            // ['2013/4/9', 60,59,40,80],
            // ['2013/4/10', 60,59,40,80],
            // ['2013/4/11', 60,59,40,80],
            // ['2013/4/12', 60,59,40,80],
            // ['2013/4/15', 60,59,40,80],
            // ['2013/4/16', 60,59,40,80],
            // ['2013/4/17',60,59,40,80],
            // ['2013/4/18', 60,59,40,80],
            // ['2013/4/19', 60,59,40,80],
            // ['2013/4/22',60,59,40,80],
            // ['2013/4/23', 60,59,40,80],
            // ['2013/4/24', 60,59,40,80],
            // ['2013/4/25',70,59,20,80],
            // ['2013/4/26', 2203.89,2177.91,2173.86,2210.58],
            // ['2013/5/2', 2170.78,2174.12,2161.14,2179.65],
            // ['2013/5/3', 2179.05,2205.5,2179.05,2222.81],
            // ['2013/5/6', 2212.5,2231.17,2212.5,2236.07],
            // ['2013/5/7', 2227.86,2235.57,2219.44,2240.26],
            // ['2013/5/8', 2242.39,2246.3,2235.42,2255.21],
            // ['2013/5/9', 2246.96,2232.97,2221.38,2247.86],
            // ['2013/5/10', 2228.82,2246.83,2225.81,2247.67],
            // ['2013/5/13', 2247.68,2241.92,2231.36,2250.85],
            // ['2013/5/14', 2238.9,2217.01,2205.87,2239.93],
            // ['2013/5/15', 2217.09,2224.8,2213.58,2225.19],
            // ['2013/5/16', 2221.34,2251.81,2210.77,2252.87],
            // ['2013/5/17', 2249.81,2282.87,2248.41,2288.09],
            // ['2013/5/20', 2286.33,2299.99,2281.9,2309.39],
            // ['2013/5/21', 2297.11,2305.11,2290.12,2305.3],
            // ['2013/5/22', 2303.75,2302.4,2292.43,2314.18],
            // ['2013/5/23', 2293.81,2275.67,2274.1,2304.95],
            // ['2013/5/24', 2281.45,2288.53,2270.25,2292.59],
            // ['2013/5/27', 2286.66,2293.08,2283.94,2301.7],
            // ['2013/5/28', 2293.4,2321.32,2281.47,2322.1],
            // ['2013/5/29', 2323.54,2324.02,2321.17,2334.33],
            // ['2013/5/30', 2316.25,2317.75,2310.49,2325.72],
            // ['2013/5/31', 2320.74,2300.59,2299.37,2325.53],
            // ['2013/6/3', 2300.21,2299.25,2294.11,2313.43],
            // ['2013/6/4', 2297.1,2272.42,2264.76,2297.1],
            // ['2013/6/5', 2270.71,2270.93,2260.87,2276.86],
            // ['2013/6/6', 2264.43,2242.11,2240.07,2266.69],
            // ['2013/6/7', 2242.26,2210.9,2205.07,2250.63],
            // ['2013/6/13', 2190.1,2148.35,2126.22,2190.1]
        ]),

       }
   },
   methods:{
        showlDialog(data){
            this.isShow = !this.isShow 
        },
        splitData(rawData) {
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
        },
        calculateMA(dayCount) {
            var result = [];
            for (var i = 0, len = this.data0.values.length; i < len; i++) {
                if (i < dayCount) {
                    result.push('-');
                    continue;
                }
                var sum = 0;
                for (var j = 0; j < dayCount; j++) {
                    sum += this.data0.values[i - j][1];
                }
                result.push(sum / dayCount);
            }
            return result;
        },
       initCharts(){
            var myChart1 = echarts.init(document.getElementById('oee'));
            var option = {
                // title: {
                //     text: '上证指数',
                //     left: 0
                // },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                // legend: {
                //     data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
                // },
                grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '15%'
                },
                xAxis: {
                    type: 'category',
                    data: this.data0.categoryData,
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
                    // scale: true,
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
                // dataZoom: [
                //     {
                //         type: 'inside',
                //         start: 50,
                //         end: 100
                //     },
                //     {
                //         show: true,
                //         type: 'slider',
                //         y: '90%',
                //         start: 50,
                //         end: 100
                //     }
                // ],
                series: [
                    {
                        name: '日K',
                        type: 'candlestick',
                        data: this.data0.values,
                        itemStyle: {
                            normal: {
                                color: this.upColor,
                                color0: this.downColor,
                                borderColor:this.upBorderColor,
                                borderColor0: this.downBorderColor
                            }
                        },
                        markPoint: {
                            // label: {
                            //     normal: {
                            //         formatter: function (param) {
                            //             return param != null ? Math.round(param.value) : '';
                            //         }
                            //     }
                            // },
                            data: [
                                // {
                                //     name: 'XX标点',
                                //     coord: ['2013/5/31', 2300],
                                //     value: 2300,
                                //     itemStyle: {
                                //         normal: {color: 'rgb(41,60,85)'}
                                //     }
                                // },
                                // {
                                //     name: 'highest value',
                                //     type: 'max',
                                //     valueDim: 'highest'
                                // },
                                // {
                                //     name: 'lowest value',
                                //     type: 'min',
                                //     valueDim: 'lowest'
                                // },
                                // {
                                //     name: 'average value on close',
                                //     type: 'average',
                                //     valueDim: 'close'
                                // }
                            ],
                            tooltip: {
                                formatter: function (param) {
                                    return param.name + '<br>' + (param.data.coord || '');
                                }
                            }
                        },
                        // markLine: {
                        //     symbol: ['none', 'none'],
                        //     data: [
                        //         [
                        //             {
                        //                 name: 'from lowest to highest',
                        //                 type: 'min',
                        //                 valueDim: 'lowest',
                        //                 symbol: 'circle',
                        //                 symbolSize: 10,
                        //                 label: {
                        //                     normal: {show: false},
                        //                     emphasis: {show: false}
                        //                 }
                        //             },
                        //             {
                        //                 type: 'max',
                        //                 valueDim: 'highest',
                        //                 symbol: 'circle',
                        //                 symbolSize: 10,
                        //                 label: {
                        //                     normal: {show: false},
                        //                     emphasis: {show: false}
                        //                 }
                        //             }
                        //         ],
                        //         {
                        //             name: 'min line on close',
                        //             type: 'min',
                        //             valueDim: 'close'
                        //         },
                        //         {
                        //             name: 'max line on close',
                        //             type: 'max',
                        //             valueDim: 'close'
                        //         }
                        //     ]
                        // }
                    },
                    {
                        name: 'vision',
                        type: 'line',
                        data: [99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],
                        smooth: true,
                        lineStyle: {
                            normal: {
                                opacity: 0.5,
                                color:"#a54141"
                            }
                        }
                    },
                    {
                        name: 'target',
                        type: 'line',
                        data: [80,73.2,65.3,96,77.3,98.3,85.2,85.3,99.3,95.3,85.2,86.3,84.2,94.3,96.3],
                        smooth: true,
                        lineStyle: {
                            normal: {
                                opacity: 0.5,
                                color:"#cb8b2e"
                            }
                        }
                    },
                    {
                        name: 'ideal',
                        type: 'line',
                        data: [99.5,88.3,99.5,88.3,99.5,88.3,99.5,88.3,99.5,99.5,99.5,88.3,99.5,88.3,99.5],
                        smooth: true,
                        lineStyle: {
                            normal: {
                                opacity: 0.5,
                                color:"#476f7b"
                            }
                        }
                    },
                    // {
                    //     name: 'MA30',
                    //     type: 'line',
                    //     data: this.calculateMA(30),
                    //     smooth: true,
                    //     lineStyle: {
                    //         normal: {opacity: 0.5}
                    //     }
                    // },

                ]
            }
            myChart1.setOption(option, true);

       },
   },
   mounted () {
       this.initCharts();
   }
}
</script>
<style lang="sass" scoped>
</style>
