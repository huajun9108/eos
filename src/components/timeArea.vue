<template>
<transition name="slide-fade">
  <div class="TimeAndAreaContainer showchoose">
    <div class="chooseTime box">
      <h1 class="choose">时间选择</h1>
      <div class="time">
        <span>{{timeFlag?'开始时间':'选择时间点(上)'}}</span>
        <DatePicker size="small" v-model="startTime" :options="timeFlag?optionsStart:optionsStarts" placement="bottom-end" :type="timeFlag?'date':'datetime'" 
        :format="timeFlag?'yyyy-MM-dd':'yyyy-MM-dd HH:mm:ss'"
        placeholder="Select date" @on-change="startChange" @on-ok="startOk" @on-clear="clearStart"></DatePicker>
      </div>
      <div class="time">
        <span>{{timeFlag?'结束时间':'选择时间点(下)'}}</span>
        <DatePicker size="small" v-model="endTime" :options="timeFlag?optionsEnd:optionsEnds" placement="bottom-end" :type="timeFlag?'date':'datetime'"
        :format="timeFlag?'yyyy-MM-dd':'yyyy-MM-dd HH:mm:ss'"
        placeholder="Select date" @on-change="endChange" @on-ok="endOk" @on-clear="clearEnd"></DatePicker>
      </div>
    </div>
    <div class="chooseArea box">
      <h1 class="choose">区域选择</h1>
      <div class="area">
        <ul id="treeDemo" class="ztree">
        </ul>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
import { mapState, mapActions } from "vuex";
Date.prototype.format = function(format) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return format;
};
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
      optionsStarts: {
        disabledDate: (date) => {
          if(this.endTime){
            let beginFormat = this.endTime.format('yyyy-MM-dd');
            return date && date.valueOf() >new Date(beginFormat+" 00:00:00");
          }else{
            return date && date.valueOf() >Date.now()
          }
        }
      },
      optionsStarts: {
        disabledDate: (date) => {
          if(this.endTime){
            let endFormat = this.endTime.format('yyyy-MM-dd');
            return date && date.valueOf() >new Date(endFormat+" 00:00:00");
          }else{
            return date && date.valueOf() >Date.now()
          }
        }
      },
      optionsEnd: {
        disabledDate: date => {
          let beginDateVal = this.startTime;
          if (beginDateVal) {
            return (
              (date && date.valueOf() < beginDateVal) ||
              (date && date.valueOf() > Date.now())
            );
          } else {
            return date && date.valueOf() > Date.now();
          }
        }
      },
      optionsEnds: {
        disabledDate: (date) => {
          if(this.startTime){
            let startFormat = this.startTime.format('yyyy-MM-dd');
            return (
              (date && date.valueOf() < new Date(startFormat+" 00:00:00")) ||
              (date && date.valueOf() > Date.now())
            );
          }else{
            return date && date.valueOf() >Date.now()
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
      lineBodystr: ""
    };
  },
  methods: {
    ...mapActions(["selectUserById", "selectAllByUserIdAndLinebodyIds","selectProjectStateByTimeAndLinebodyIds"]),
    zTreeOnCheck(event, treeId, treeNode) {
      console.log("zTreeOnCheck");
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
      if (!this.startTime || !this.endTime) return;
      if (_this.lineBodys.length <= 0) {
        this.clearCharts();
        return;
      }
      _this.lineBodystr = _this.lineBodys.join(",");
      const start = this.startTime.format("yyyy-MM-dd") + " 08:00:00";
      const end = new Date(this.endTime.format("yyyy-MM-dd") + " 23:59:59");
      if (
        sessionStorage.getItem("userid") &&
        _this.lineBodystr &&
        start &&
        end
      ) {
        const endMs = end.getTime() + 8 * 60 * 60 * 1000;
        const startTime = new Date(start);
        const endTime = new Date(endMs);
        _this.selectAllByUserIdAndLinebodyIds({
          userId: sessionStorage.getItem("userid"),
          linebodyIds: _this.lineBodystr,
          startTime: startTime,
          endTime: endTime
        });
      }
    },
    startChange(data) {
      // if (!data) return;
      // const start = data + " 08:00:00";
      // if (!this.endTime) return;
      // const end = new Date(this.endTime.format("yyyy-MM-dd") + " 23:59:59");
      // if (
      //   sessionStorage.getItem("userid") &&
      //   this.lineBodystr &&
      //   start &&
      //   end
      // ) {
      //   const endMs = end.getTime() + 8 * 60 * 60 * 1000;
      //   const startTime = new Date(start);
      //   const endTime = new Date(endMs);
      //   this.selectAllByUserIdAndLinebodyIds({
      //     userId: sessionStorage.getItem("userid"),
      //     linebodyIds: this.lineBodystr,
      //     startTime: startTime,
      //     endTime: endTime
      //   });
      // }
      
      
    },
    startOk(){
      if(this.routeIsroute("summary")){
        if (sessionStorage.getItem("userid") 
        && this.lineBodystr
        && this.startTime){
          let startTime = new Date(this.startTime.getTime()+ 8 * 60 * 60 * 1000)
          this.selectProjectStateByTimeAndLinebodyIds({
            linebodyIds: this.lineBodystr,
            time: startTime,
            type:"start"
            
          })
        }
      }
    },
    endOk(){
      if(this.routeIsroute("summary")){
        if (sessionStorage.getItem("userid") 
        && this.lineBodystr
        && this.endTime){
          let endTime = new Date(this.endTime.getTime()+ 8 * 60 * 60 * 1000)
          this.selectProjectStateByTimeAndLinebodyIds({
            linebodyIds: this.lineBodystr,
            time: endTime,
            type:"end"
            
          })
        }
      }
    },
    endChange(data) {
      // if (!data) return;
      // const end = new Date(data + " 23:59:59");
      // if (!this.startTime) return;
      // const start = this.startTime.format("yyyy-MM-dd") + " 08:00:00";
      // if (
      //   sessionStorage.getItem("userid") &&
      //   this.lineBodystr &&
      //   start &&
      //   end
      // ) {
      //   const startTime = new Date(start);
      //   const endMs = end.getTime() + 8 * 60 * 60 * 1000;
      //   const endTime = new Date(endMs);
      //   this.selectAllByUserIdAndLinebodyIds({
      //     userId: sessionStorage.getItem("userid"),
      //     linebodyIds: this.lineBodystr,
      //     startTime: startTime,
      //     endTime: endTime
      //   });
      // }
    
    },
  
    clearEnd() {
      this.selectAllByUserIdAndLinebodyIds({
        userId: sessionStorage.getItem("userid")
      });
      if(this.routeIsroute("summary")){
        this.selectProjectStateByTimeAndLinebodyIds({
        type:"end"
      })
      }
    },
    clearStart() {
      this.selectAllByUserIdAndLinebodyIds({
        userId: sessionStorage.getItem("userid")
      });
      sessionStorage.removeItem("statusStart")
      if(this.routeIsroute("summary")){
        this.selectProjectStateByTimeAndLinebodyIds({
        type:"start"
      })
      }
    },
   
    routeIsroute(route){
      let reg = this.$route.path.split("/")[2];
      if (reg == route) {
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {
    ...mapState(["validarea"])
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
      $.fn.zTree.init($("#treeDemo"), this.setting, this.validareaList);
      _this.selectAllByUserIdAndLinebodyIds({
        userId: sessionStorage.getItem("userid")
      });
    }
  },
  mounted() {
    if (sessionStorage.getItem("userid")) {
      this.selectUserById({
        userid: sessionStorage.getItem("userid")
      });
    } else {
    }
    
    if(this.routeIsroute("summary")){
      this.timeFlag = false;
    }else{
      this.timeFlag = true;
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
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
/* .slide-fade-leave-active for below version 2.1.8 */
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
