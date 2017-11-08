<style scoped>
  .chart {
    width: 90%;
    height: 200px;
    position: relative;
    left: 50%;
    margin-left: -45%;
    box-shadow: 0 0 10px #726dd1;
    border-radius: 10px;
  }
</style>
<template>
  <div :id="_id" class="chart"></div>
</template>

<script>
  import echarts from 'echarts';
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
      _type:String
    },
    watch:{
      _chartData(val){
        switch (this._type){
          case "Sankey":
            drawSankey(val,this._id,this._titleText);
            break
          default:
            // drawLineAndBar(val,this._id,this._titleText,this._xText,this._yText);
            break
        }
      }
    },
    mounted() {
      switch (this._type){
        case "Sankey":
          drawSankey(this._chartData,this._id,this._titleText);
          break
        default:
          // drawLineAndBar(this._chartData,this._id,this._titleText,this._xText,this._yText);
          break
      }
    }
  }
  //绘制函数
  function drawSankey(chartData,_id,titleText) {
    var chart = echarts.init(document.getElementById(_id))
    var sankeyData= chartData.map(function (item) {return item[0]})
    var sankeyLink = chartData.map(function (item) {return item[1]})

    chart.setOption({
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series : [
        {
          type: 'sankey',
          layout:'none',
          data: sankeyData,
          links: sankeyLink,
          itemStyle: {
            normal: {
                borderWidth: 1,
                borderColor: '#aaa'
            }
          },
          lineStyle: {
            normal: {
                curveness: 0.5
            }
          }
        }
      ]
    })
  }


</script>