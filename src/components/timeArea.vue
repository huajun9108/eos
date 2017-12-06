
<template>
    <transition name="slide-fade">
        <div class="TimeAndAreaContainer showchoose">
            <div class="chooseTime box" v-show="timeFlag">
                <h1 class="choose">时间选择</h1>
                <div class="time">
                    <span>开始时间</span>
                    <DatePicker size="small" v-model="startTime" :options="optionsStart" placement="bottom-end" type="date" 
                    format="yyyy-MM-dd" placeholder="Select date" @on-change="startChange" @on-clear="clearCharts">
                    </DatePicker>
                </div>
                <div class="time">
                    <span>结束时间</span>
                    <DatePicker size="small" v-model="endTime" :options="optionsEnd" placement="bottom-end" type="date"
                    format="yyyy-MM-dd" placeholder="Select date" @on-change="endChange" @on-clear="clearCharts">
                    </DatePicker>
                </div>
            </div>
            <div :class="timeFlag?'chooseArea box':'chooseArea box summaryChoose'">
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
            start:null,
            end:null
        };
    },
    methods: {
        ...mapActions([
            "selectUserById", 
            "selectAllByUserIdAndLinebodyIds",
            "selectProjectStateByTimeAndLinebodyIds"
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
            if(this.routeIsroute("summary")){
                _this.selectProjectStateByTimeAndLinebodyIds({
                linebodyIds: _this.lineBodystr,
                time:this.time,
                });
            }
            if (_this.lineBodys.length <= 0) {
                this.clearCharts();
                return;
            }
            if(!this.startTime||!this.endTime)return
            this.start = new Date(this.startTime.format("yyyy-MM-dd") +" 00:00:00");
            this.end = new Date(this.endTime.format("yyyy-MM-dd") + " 23:59:59");
            this.lossmaping()
        },
        startChange(data) {
            if (!data) return;
            this.start = new Date(data + " 00:00:00");
            if (!this.endTime) return;
            this.end = new Date(this.endTime.format("yyyy-MM-dd") + " 23:59:59");
            this.lossmaping()
        },
        endChange(data) {
            if (!data) return;
            this.end = new Date(data + " 23:59:59");
            if (!this.startTime) return;
            this.start = new Date(this.startTime.format("yyyy-MM-dd") + " 00:00:00");
            this.lossmaping()
        },
        lossmaping(){
            if(this.routeIsroute("lossmaping")){
                if (
                    sessionStorage.getItem("userid") &&
                    this.lineBodystr &&
                    this.start &&
                    this.end
                ) {
                    this.selectAllByUserIdAndLinebodyIds({
                        userId: sessionStorage.getItem("userid"),
                        linebodyIds: this.lineBodystr,
                        startTime: this.start,
                        endTime: this.end
                    });
                }
            }
        },
        clearCharts() {
            this.selectAllByUserIdAndLinebodyIds({
                userId: sessionStorage.getItem("userid")
            });
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
        ...mapState([
            "validarea"
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
            $.fn.zTree.init($("#treeDemo"), this.setting, this.validareaList);
            // _this.selectAllByUserIdAndLinebodyIds({
            //     userId: sessionStorage.getItem("userid")
            // });
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
    .summaryChoose{
        margin-top: P(72);
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