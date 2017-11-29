<template>
    <div class="summary_box status">
        <div class="status_content top">
            <div class="status_echarts">
                <span class="status_pro">项目状态分布&nbsp&nbsp<i class="status_pos">(上)</i></span>
                <div id="charts_status_top"  ref="status">
                     <chart
                        :_id="'statustop'"
                        :_titleText="'访问量统计'"
                        :_xText="'类别'"
                        :_yText="'项目阶段的数量'"
                        :_chartData="chartData1"
                        :_type="'Bar'">
                    </chart>
                </div>
            </div>
            <div class="status_detail">
                <ul class="status_det">
                    <li class="status_li">
                        <span class="status_title">项目池中的项目数量</span>
                        <input class="item_detail" readonly placeholder="45"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">准备启动的项目数量</span>
                        <input class="item_detail" readonly placeholder="6"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">实施运行的项目数量</span>
                        <input class="item_detail" readonly placeholder="12"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">实施延迟的项目数量</span>
                        <input class="item_detail" readonly placeholder="2"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">成果跟踪的项目数量</span>
                        <input class="item_detail" readonly placeholder="24"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">当年度关闭项目数量</span>
                        <input class="item_detail" readonly placeholder="12"/>
                    </li>
                </ul>
            </div>
        </div>
        <div class="status_content bottom">
            <div class="status_echarts">
                <span class="status_pro">项目状态分布&nbsp&nbsp<i class="status_pos">(下)</i></span>
                <div id="charts_status_bottom">
                     <chart
                        :_id="'statusbottom'"
                        :_titleText="'访问量统计'"
                        :_xText="'类别'"
                        :_yText="'项目阶段的数量'"
                        :_chartData="chartData2"
                        :_type="'Bar'">
                    </chart>
                </div>
            </div>
            <div class="status_detail">
                <ul class="status_det">
                    <li class="status_li">
                        <span class="status_title">项目池中的项目数量</span>
                        <input class="item_detail" readonly placeholder="45"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">准备启动的项目数量</span>
                        <input class="item_detail" readonly placeholder="6"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">实施运行的项目数量</span>
                        <input class="item_detail" readonly placeholder="12"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">实施延迟的项目数量</span>
                        <input class="item_detail" readonly placeholder="2"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">成果跟踪的项目数量</span>
                        <input class="item_detail" readonly placeholder="24"/>
                    </li>
                    <li class="status_li">
                        <span class="status_title">当年度关闭项目数量</span>
                        <input class="item_detail" readonly placeholder="12"/>
                    </li>
                </ul>
            </div>
        </div>
    </div> 
</template>
<script>
import { mapActions, mapState } from "vuex";
import chart from "../components/echarts";
export default {
  components: {
    chart: chart
  },
  data() {
    return {
      chartData1: [
        {
          key: "设备损失",
          value: [39, 4, 9, 1, 22, 8]
        },

        {
          key: "物料损失",
          value: [5, 2, 3, 1, 2, 4]
        },
        {
          key: "人力损失",
          value: [1, 3, 2, 1, 2, 2]
        }
      ],
      chartData2: [
        {
          key: "设备损失",
          value: [39, 4, 9, 1, 22, 8]
        },

        {
          key: "物料损失",
          value: [5, 2, 3, 1, 2, 4]
        },
        {
          key: "人力损失",
          value: [1, 3, 2, 1, 2, 2]
        }
      ]
    };
  },
  computed: {
    ...mapState([])
  },
  methods: {
    ...mapActions([]),
    showlDialog(data) {
      this.isShow = !this.isShow;
    }
  },
  watch: {},
  created() {},
  mounted() {
    // if (sessionStorage.getItem("userid")) {
    //     this.selectUserById({
    //         userid: sessionStorage.getItem("userid")
    //     })
    // } else {
    //     console.log(this.$route);
    // }
    // let _this = this
    // this.showImpItempool()
    // let height =  this.$refs.status.offsetHeight
    // let width =  this.$refs.status.offsetWidth
    // console.log(height+"==="+width)
    // // this.$nextTick(() => {
    //     this.$refs.phase.style.height = 300+"px"
    //     console.log(this.$refs.phase.style.height )
    //     this.$refs.phase.style.width = 300+"px"
    //     console.log(this.$refs.phase.style.width )
    // // })
  }
};
</script>
<style lang="scss" scoped>

</style>

