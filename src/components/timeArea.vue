<template>
    <transition name="slide-fade">
    <div class="TimeAndAreaContainer showchoose">
        <div class="chooseTime box">
            <h1>时间选择</h1>
            <div class="time">
            <span>开始时间</span>
                <el-date-picker
                    class="start"
                    v-model="startTime"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerBeginDateBefore">
                </el-date-picker>
            </div>
            <div class="time">
            <span>结束时间</span>
            <el-date-picker
                v-model="endTime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :picker-options="pickerBeginDateAfter">
            </el-date-picker>
            </div>
        </div>
        <div class="chooseArea box">
            <h1>区域选择</h1>
            <div class="area">
                <ul id="treeDemo" class="ztree"></ul>
            </div>
        </div>
    </div>
    </transition>
</div>
</template>
<script>
import { mapState, mapActions } from "vuex";
 export default {
    data () {
      return {
        startTime:null,
        endTime:null,
        pickerBeginDateBefore:{
            disabledDate: (time) => {
                let beginDateVal = this.endTime;
                if (beginDateVal) {
                    return time.getTime() < beginDateVal;
                }
            }
        },
        pickerBeginDateAfter:{
            disabledDate: (time) => {
                let beginDateVal = this.startTime;
                if (beginDateVal) {
                    return time.getTime() > beginDateVal;
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
		        onCheck: this.zTreeOnCheck
	        }
        },
        validareaList:[],
        }
    },
    props: {
        props:['invitor'],
    },
    methods: {
       ...mapActions([
        "selectUserById",
        ]),
        zTreeOnCheck(){
            var treeObj = $.fn.zTree.getZTreeObj("treeDemo  ");
            var nodes = treeObj.getCheckedNodes(true);
            console.log(nodes)
        }
    },
    computed:{
        ...mapState([
        "validarea",
        ])
    },
    watch:{
        startTime(newVal){
            console.log(newVal)
        },
        endTime(newVal){
            console.log(newVal)
        },
        validarea(newVal){
            this.validarea.forEach(item=> {
                if(item.checked){
                    this.validareaList.push(item)
                }
            });
            $.fn.zTree.init($("#treeDemo"), this.setting, this.validareaList);
        }
    },
    mounted(){
        if (sessionStorage.getItem("userid")) {
            this.selectUserById({userid:sessionStorage.getItem("userid")})
            //  $.fn.zTree.init($("#treeDemo"), this.setting, this.validarea);
        } else {
            console.log(this.$route);
            // this.selectAreaAll();
            // $.fn.zTree.init($("#treeDemo"), this.setting, this.areaAll);
        }
    }
}

</script>
<style lang="scss" scoped>
@import "../styles/mobile.scss";

.showchoose {
    display: block;
    width: P(316);
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    background: #eeeeee;
    display: flex;
    flex-direction: column;
    .box {
        width: P(266);
        margin: P(66) auto;
        h1 {
            color: #131313;
            font-size: P(14);
            line-height: P(36);
            padding-left: P(18);
            border-bottom: 1px solid #b4b4b4;
            font-weight: bold;
        }
        .time {
            margin: P(18) auto;
            padding-left: P(18);
            display: flex;
            justify-content: space-between;
            span {
                font-size: P(14);
                line-height: P(22);
                display: inline-block;
            }
            .cov-vue-date {
                display: inline-block;
            }
        }
    }
    .chooseArea {
        flex: 1;
        padding-left: P(18);
        width: 100%;
        height: auto;
        margin: 0;
        display: flex;
        flex-direction: column;
        .area {
            padding-left: P(18);
            flex: 1;
            margin-top: P(14);
            width: 100%;
            height: auto;
            overflow-y: auto;
        }
    }
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>