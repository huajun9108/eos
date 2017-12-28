
<template>
<transition name="slide-fade">
  <div class="TimeAndAreaContainer showchoose">
    <div class="chooseTime box" v-show="timeFlag">
      <h1 class="choose">时间选择</h1>
      <div class="time">
        <span>开始时间</span>
        <DatePicker size="small" v-model="startTime" :options="optionsStart" placement="bottom-end" :type="datePickerTypeVal" placeholder="Select date" @on-change="startChange" @on-clear="clearCharts">
        </DatePicker>
      </div>
      <div class="time">
        <span>结束时间</span>
        <DatePicker size="small" v-model="endTime" :options="optionsEnd" placement="bottom-end" :type="datePickerTypeVal" placeholder="Select date" @on-change="endChange" @on-clear="clearCharts">
        </DatePicker>
      </div>
    </div>
    <div :class="timeFlag?'chooseArea box':'chooseArea box summaryChoose'">
      <h1 class="choose">区域选择</h1>
      <div class="area">
        <ul id="treeArea" class="ztree">
        </ul>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
import { mapState,mapActions} from "vuex";
import {GetDateStr} from "../assets/js/tip"
export default {
  data() {
    return {
      timeFlag: null,
      startTime: null,
      endTime: null,
      optionsStart: {
        disabledDate: date => {
          let beginDateVal = this.endTime;
          if (beginDateVal) {
            return date && date.valueOf() > beginDateVal;
          } else {
            return date && date.valueOf() > Date.now();
          }
        }
      },
      optionsEnd: {
        disabledDate: date => {
          let beginDateVal = this.startTime;
          if(beginDateVal) {
            return (
              (date && date.valueOf() < beginDateVal) ||
              (date && date.valueOf() > Date.now())
            );
          } else {
            return date && date.valueOf() > Date.now();
          }
        }
      },
      setting: {
        view: {
          selectedMulti: false,
          showIcon: false
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        check: {
          enable: true,
          chkStyle: "checkbox"
        },
        callback: {
          onCheck: this.zTreeOnCheck
        }
      },
      validareaList: [],
      lineBodys: [],
      lineBodystr: "",
      time: GetDateStr(-1) + " 23:59:59",
      start: null,
      end: null,
      datePickerTypeVal: "date",
      changeFlag:false
    }
  },
  methods: {
    ...mapActions([
      "selectUserById",
      "selectAllByUserIdAndLinebodyIds",
      "selectProjectStateByTimeAndLinebodyIds",
      "selectSavingBookByTimesAndLinebodys",
      "selectOverviewByTimesAndLinebodys"
    ]),
    zTreeOnCheck(event, treeId, treeNode) {
      const _this = this;
      _this.lineBodys = [];
      _this.lineBodystr = '';
      var treeObj = $.fn.zTree.getZTreeObj(treeId);
      var nodes = treeObj.getCheckedNodes(true);
      nodes.forEach(function(node) {
        let reg = /^l/g;
        if (reg.test(node.id)) {
          _this.lineBodys.push(node.id.substring(1));
        }
      });
      _this.lineBodystr = _this.lineBodys.join(",");

      if (_this.lineBodys.length <= 0) {
        this.clearCharts();
        return;
      }
      if (this.routeIsroute("summary")) {
        _this.selectProjectStateByTimeAndLinebodyIds({
          linebodyIds: _this.lineBodystr,
          time: this.time,
        });
        return;
      }
      if(this.routeIsroute("savingbook")) {
        if(!this.start || !this.end) return;
        _this.selectSavingBookByTimesAndLinebodys({
          "startTime": this.start,
          "endTime": this.end,
          "linebodyIds": _this.lineBodystr,
        });
        return;
      }
      if (!this.startTime || !this.endTime) return
      this.start = new Date(this.startTime.format("yyyy-MM-dd") + " 00:00:00");
      this.end = new Date(this.endTime.format("yyyy-MM-dd") + " 24:00:00");
      this.lossmapingAndOverview();
    },
    startChange(data) {
      this.changeFlag = true
      if (!data) return;
      this.savingbook(this.endTime,data)
      this.start = new Date(data + " 00:00:00");
      if (!this.endTime) return;
      this.end = new Date(this.endTime.format("yyyy-MM-dd") + " 24:00:00");
      this.lossmapingAndOverview()
    },
    endChange(data) {
      this.changeFlag = false
      if (!data) return;
      this.savingbook(this.startTime,data)
      this.end = new Date(data + " 23:59:59");
      if (!this.startTime) return;
      this.start = new Date(this.startTime.format("yyyy-MM-dd") + " 00:00:00");
      this.lossmapingAndOverview()
    },
    lossmapingAndOverview() {
      if (
        sessionStorage.getItem("userid") &&
        this.lineBodystr &&
        this.start &&
        this.end
      ) {
        if(this.routeIsroute("lossmaping")){
          this.selectAllByUserIdAndLinebodyIds({
          userId: sessionStorage.getItem("userid"),
          linebodyIds: this.lineBodystr,
          startTime: this.start,
          endTime: this.end
        });
        }else if(this.routeIsroute("overview")){
          this.selectOverviewByTimesAndLinebodys({
          linebodyIds: this.lineBodystr,
          startTime: this.start,
          endTime: this.end
        })
        }
      }
    },
    savingbook(starttime,data){
      if (this.routeIsroute("savingbook")) {
        if(!this.changeFlag){
          if(!starttime) return
          this.start = new Date(starttime.format('yyyy-MM') + '-01 00:00:00');
          const days = this.getEndDays(data);
          this.end = new Date(data + '-' + days.toString() + " 24:00:00");
        }else{
          if(!starttime) return
          this.start = new Date(data + '-01 00:00:00');
          const days = this.getEndDays(starttime.format("yyyy-MM"));
          this.end = new Date(starttime.format("yyyy-MM") + '-' + days.toString() + " 24:00:00");
        }
        this.selectSavingBookByTimesAndLinebodys({
          "startTime": this.start,
          "endTime": this.end,
          "linebodyIds": this.lineBodystr
        })
      }
    },
    clearCharts() {
      console.log("clearCharts");
      this.$emit('clear');
    },
    routeIsroute(route) {
      let reg = this.$route.path.split("/")[2];
      if (reg === route) {
        return true;
      } else {
        return false;
      }
    },
    getDaysInMonth(year, month) {
      const nextMonth = parseInt(month, 10);
      const temp = new Date(year, nextMonth, 0);
      return temp.getDate();
    },
    getEndDays(data){
      const endArr = data.split("-");
      const year = endArr[0];
      const month = endArr[1];
      const days = this.getDaysInMonth(year, month)
      return days;
    }
  },
  computed: {
    ...mapState([
      "validarea",
    ])
  },
  watch: {
    validarea(newVal) {
      const _this = this;
      this.validareaList = [];
      this.validarea.forEach(item => {
        if (item.checked) {
          this.validareaList.push(item);
        }
      });
      _this.lineBodys = [];
      _this.lineBodystr = '';
      this.validareaList.forEach(function(node) {
        let reg = /^l/g;
        if (reg.test(node.id)) {
          _this.lineBodys.push(node.id.substring(1));
        }
      });
      _this.lineBodystr = _this.lineBodys.join(",");
      $.fn.zTree.init($("#treeArea"), this.setting, this.validareaList);
      if (_this.lineBodys.length <= 0) {
        this.clearCharts();
        return;
      }
      if (this.routeIsroute("summary")) {
        _this.selectProjectStateByTimeAndLinebodyIds({
          linebodyIds: _this.lineBodystr,
          time: this.time,
        });
        return;
      }
      if(this.routeIsroute("savingbook")) {
        _this.selectSavingBookByTimesAndLinebodys({
          startTime: this.start,
          endTime: this.end,
          linebodyIds: _this.lineBodystr,
        });
        return;
      }

      if (!this.startTime || !this.endTime) return
      this.start = new Date(this.startTime.format("yyyy-MM-dd") + " 00:00:00");
      this.end = new Date(this.endTime.format("yyyy-MM-dd") + " 24:00:00");
      this.lossmapingAndOverview()
    }
  },
  mounted() {
    if (sessionStorage.getItem("userid")) {
      this.selectUserById({
        userid: sessionStorage.getItem("userid")
      });
      if (this.routeIsroute("lossmaping") || this.routeIsroute("overview")) {
        this.endTime = new Date();
        this.startTime = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);
      }
    }
    if (this.routeIsroute("summary")) {
      this.timeFlag = false;
    } else {
      this.timeFlag = true;
    }

    if (this.routeIsroute("savingbook")) {
      this.datePickerTypeVal = "month";
      const currentDate = new Date().format("yyyy-MM");
      const arr = currentDate.split('-');
      const year = parseInt(arr[0]);
      const month = parseInt(arr[1]);
      this.endTime = new Date(currentDate + "-01 00:00:00");
      const days = this.getDaysInMonth(year, month);
      this.end = new Date(currentDate + "-" + days.toString() + " 24:00:00");
      if(month === 12) {
        this.startTime = new Date(year.toString() + '-01-01 00:00:00');
      } else {
        let beginYear = year - 1;
        let beginMonth = month + 1;
        this.startTime = new Date(beginYear.toString() + '-' + beginMonth.toString() + '-01 00:00:00');
      }
      this.start = this.startTime;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/mobile.scss";
.showchoose {
    display: block;
    width: P(380);
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    background: #eeeeee;
    display: flex;
    flex-direction: column;
    z-index: 100;
    .box {
        width: P(365);
        margin: P(66) auto;
        .choose {
            color: #131313;
            font-size: P(14);
            line-height: P(38);
            padding-left: P(15);
            border-bottom: 1px solid #b4b4b4;
            font-weight: bold;
        }
        .time {
            margin: P(18) auto;
            padding-left: P(15);
            display: flex;
            justify-content: space-around;
            span {
                font-size: P(12);
                line-height: P(30);
                display: inline-block;
            }
            .cov-vue-date {
                display: inline-block;
            }
        }
    }
    .chooseTime {
        margin-bottom: P(26);
    }
    .chooseArea {
        flex: 1;
        padding-left: P(15);
        padding-right: P(15);
        width: 100%;
        margin: 0;
        display: flex;
        flex-direction: column;
        .area {
            padding-left: P(18);
            flex: 1;
            margin-top: P(14);
            width: 100%;
            overflow-y: auto;
        }
    }
    .summaryChoose {
        margin-top: P(72);
    }
}
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>
