<template>
    <div class="account common">
      <div class="userinfor acommon">
        <h1>个人信息</h1>
        <div class="info-content">
        <div class="information">
          <div class="tip">
              <span class="bef">用户名</span><span class="in">{{userinfor.username}}</span>
          </div>
          <div class="tip pwd">
             <span class="bef">密码</span><input type="password" :value="userinfor.username" ref="user" class="in"/>
            <div class="img">
               <img src="../assets/images/edit .png">
            </div>
          </div>
          <div class="tip">
              <span class="bef">职位</span><span class="in">{{userinfor.userjob}}</span>
          </div>
          <div class="tip">
              <span class="bef">直线上司</span><span class="in">{{userinfor.userleader}}</span>
          </div>
        </div>
        <div class="area">
          <div class="title">
            <span>可视区域</span>
          </div>
          <div class="tree">
            <ul id="treeDemo" class="ztree"></ul>
          </div>
        </div>
        </div>
      </div>
      <div class="lan acommon">
        <h1>语言偏好</h1>
        <div class="info-content">
        <div class="information">
          <div class="tip">
            <span class="bef">中文/英文</span>
            <div class="wrap">
            <my-switch size="lg" v-model="toggle" open-name	="CN" close-name="EN" ></my-switch>
            </div>
        </div>
      </div>
      </div>
    </div>
    </div>
</template>
<script type="text/javascript">
import mySwitch from 'vue-switch/switch-2.vue';
import { mapState, mapActions } from "vuex";
export default {
  components: {
    'my-switch': mySwitch
  },
  data(){
    return{
      toggle: true,
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
      },
      validareaList:[]
    } 
  },
  computed:{
    ...mapState([
      "userinfor",
      "validarea"
      ])
  },
  methods: {
    ...mapActions([
      "selectUserById"
    ]),
    
  },
  watch: {
     validarea(newVal){
        this.validarea.forEach(item=> {
         if(item.checked){
          this.validareaList.push(item)
         }
       });
       $.fn.zTree.init($("#treeDemo"), this.setting, this.validareaList);
    },
  },
  mounted() {
    if (this.$route.params.userid) {
      this.selectUserById({userid:this.$route.params.userid})
      //  $.fn.zTree.init($("#treeDemo"), this.setting, this.validarea);
    } else {
      console.log(this.$route);
      // this.selectAreaAll();
      // $.fn.zTree.init($("#treeDemo"), this.setting, this.areaAll);
    }
  }
  
}
</script> 