<template>
    <transition name="slide-fade">
    <div class="TimeAndAreaContainer showchoose">
        <div class="chooseTime box">
            <h1 class="choose">时间选择</h1>
            <div class="time">
            <span>开始时间</span>
                <DatePicker size="small" v-model="startTime"  :options="optionsStart" placement="bottom-end" type="date" placeholder="Select date"></DatePicker>
            </div>
            <div class="time">
            <span>结束时间</span>
            <DatePicker size="small" v-model="endTime" type="date" :options="optionsEnd" placement="bottom-end" placeholder="Select date"></DatePicker>
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
</div>
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
        validareaList:[],
        }
    },
    methods: {
       ...mapActions([
        "selectUserById",
        ]),
        zTreeOnCheck(event,treeId,treeNode){
            let _this = this
            var nodes = treeNode.children
            var checked = false
             $.each(nodes,function(i,n){
                if(checked){
                    n.checked = false
                    if(n.children!=null){
                        _this.cancelSonCheck(n)
                    }
                }else{
                    checked=true;
                    if(n.children!=null){
                        _this.checkSonCheck(n)
                    }
                }
            })
        },
        zTreeBeforeCheck(treeId,treeNode){
            if(treeNode.checked){
                return
            }
            var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            var nodes = treeObj.getCheckedNodes(true);
            $.each(nodes,function(i,n){
                n.checked = false
            })

        },
        cancelSonCheck(treeNode){  
            let _this = this
            var nodes = treeNode.children
             $.each(nodes,function(i,n){
                n.checked = false
                if(n.children!=null){
                    _this.cancelSonCheck(n)
                }
            })
        },
        checkSonCheck(treeNode){
            let _this = this
            var nodes = treeNode.children;
            var checked = false;
            $.each(nodes,function(i,n){
                if(checked){
                    n.checked = false
                    if(n.children!=null){
                        _this.cancelSonCheck(n)
                    }
                }else{
                    if(n.children!=null){
                        _this.checkSonCheck(n)
                    }
                }
            })
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
            this.validareaList=[]
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
    .chooseTime{
        margin-bottom: P(26)
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