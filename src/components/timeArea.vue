<template>
<transition name="slide-fade">
    <div class="TimeAndAreaContainer showchoose">
        <div class="chooseTime box">
            <h1 class="choose">时间选择</h1>
            <div class="time">
            <span>开始时间</span>
                <DatePicker size="small" 
                v-model="startTime"  
                :options="optionsStart" 
                placement="bottom-end" 
                type="date" 
                placeholder="Select date"  
                @on-change="startChange"></DatePicker>
            </div>
            <div class="time">
            <span>结束时间</span>
            <DatePicker size="small" 
            v-model="endTime" 
            type="date" 
            :options="optionsEnd" 
            placement="bottom-end" 
            placeholder="Select date"
            @on-change="endChange"></DatePicker>
            </div>
        </div>
        <div class="chooseArea box">
            <h1 class="choose">区域选择</h1>
            <div class="area">
                <ul id="treeDemo" class="ztree"></ul>
            </div>
        </div>
  </div>
</transition>
</template>
<script>
import { mapState, mapActions } from "vuex";
 export default {
    data () {
      return {
        startTime:null,
        endTime:null,
        optionsStart:{
            disabledDate: (date) => {
                let beginDateVal = this.endTime;
                if (beginDateVal) {
                    return date && date.valueOf() > beginDateVal;
                }else{
                    return date && date.valueOf() > Date.now();
                }
            }
        },
        optionsEnd:{
            disabledDate: (date) => {
                let beginDateVal = this.startTime;
                if (beginDateVal) {
                    return (date && date.valueOf() < beginDateVal)||(date && date.valueOf()>Date.now());
                }else{
                    return date && date.valueOf() > Date.now();
                }
            }
        },
        
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
            },
            callback: {
                onCheck: this.zTreeOnCheck,
                beforeCheck:this.zTreeBeforeCheck
	        }
        },
      validareaList: [],
      lineBodys: [],
      lineBodystr:''
    }
  },
  methods: {
    ...mapActions([
      "selectUserById",
      "selectAllByUserIdAndLinebodyIds"
    ]),
    zTreeOnCheck(event, treeId, treeNode) {
      const _this = this;
      _this.lineBodys = [];
      var treeObj = $.fn.zTree.getZTreeObj(treeId);
      var nodes = treeObj.getCheckedNodes(true);
      nodes.forEach(function(node) {
        let reg = /^l/g;
        if (reg.test(node.id)) {
          _this.lineBodys.push(node.id.substring(1));
        }
      });
      _this.lineBodystr=_this.lineBodys.join(",");
      console.log(_this.lineBodystr);
      _this.selectAllByUserIdAndLinebodyIds({"userId":sessionStorage.getItem("userid"), "linebodyIds": _this.lineBodystr});
      // console.log(nodes)
    },
    startChange(data){
        this.startTime = data
        console.log(this.startTime)
    },
    endChange(data){
        this.endTime = data
        console.log(this.endTime)
    }

  },
  computed: {
    ...mapState([
      "validarea",
    ])
  },
  watch: {
    // startTime(newVal) {
    //   console.log(1)
    // },
    // endTime(newVal) {
    //   console.log(newVal)
    // },
    validarea(newVal) {
      const _this = this;
      this.validareaList=[]
      this.validarea.forEach(item => {
        if (item.checked) {
          this.validareaList.push(item)
        }
      });
      this.validareaList.forEach(function(node) {
        let reg = /^l/g;
        if(reg.test(node.id)) {
          _this.lineBodys.push(node.id.substring(1));
        }
      });
      _this.lineBodystr=_this.lineBodys.join(",");
      $.fn.zTree.init($("#treeDemo"), this.setting, this.validareaList);
      _this.selectAllByUserIdAndLinebodyIds({"userId":sessionStorage.getItem("userid"), "linebodyIds": _this.lineBodystr});
    }
  },
  mounted() {
    if (sessionStorage.getItem("userid")) {
      this.selectUserById({
        userid: sessionStorage.getItem("userid")
      })
    } else {
      console.log(this.$route);
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../styles/mobile.scss";

.showchoose {
    display: block;
    width: P(360);
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    background: #eeeeee;
    display: flex;
    flex-direction: column;
    z-index: 100;
    .box {
        width: P(320);
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
            justify-content: space-between;
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
    transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
/* .slide-fade-leave-active for below version 2.1.8 */
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>
