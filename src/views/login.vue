<template>
<div class="page">
	<div class="login" ref="log">
		<div class="login-con">
            <div class="title">
                <img src="../assets/images/logo.png" />
                <span>卓越运营系统</span>
            </div>
            <div class="userinfo">
                <div>
                    <i class="iconfont icon-User-name"></i><input type="text" placeholder="请输入用户名" ref="user" v-model="user" @input="btnBac"/>
                </div>
                <div>
                    <i class="iconfont icon-password"></i><input :type="seen?'password':'text'" placeholder="请输入密码" v-model="pwd" @input="btnBac"/>
                    <i :class="seen?'iconfont icon-eye_x':'iconfont icon-eye'" @click="changeSeen"></i>
                </div>
                    <input type="radio"  id="admin-radio" value="0" v-model="picked" class="myradio"><label for="admin-radio">管理员</label>
                    <input type="radio"  id="user-radio" value="1" v-model="picked" class="myradio"><label for="user-radio">用户</label>
                
                <button type="button" @keyup.13="tologin()" @click="tologin" class="btn" ref="btn" >登&nbsp&nbsp录</button>
                <div class="hint hide" ref="hint">
                    <i class="iconfont icon-hint"></i><span class="tips" ref="tip"/></span>
                </div>
            </div>		          
		</div> 
        <div class="foot"> 
            <span>Shionto Technologies All Rights Reserved. 慎独科技，版权所有 沪ICP备15031714号-2</span>
        </div>        		
    </div>   
</div>
</template>
<script>
import {mapState,mapActions} from "vuex";
export default{
    data(){
        return{
            pwd:"",
            user:"",
            seen:true,
            picked:"0",
        }
    },
    computed:{
        ...mapState([
            'loginResult'
        ]),
    },
    methods:{
        ...mapActions([
            'adminLogin',
            'userLogin'
        ]),
        changeSeen(){
            this.seen = !this.seen;
        },
        
        tologin(){
            if(this.empty(this.user)){
                this.$refs.hint.setAttribute("class","hint show")
                this.$refs.tip.innerHTML="用户名不能为空"
                 setTimeout(()=>{
                    this.$refs.hint.setAttribute("class","hint fadeOut hide")
                },3000) 
            }else if(this.empty(this.pwd)){
                this.$refs.hint.setAttribute("class","hint show")
                this.$refs.tip.innerHTML="密码不为空"
                 setTimeout(()=>{
                    this.$refs.hint.setAttribute("class","hint fadeOut hide")
                },3000) 
            }else if(this.picked=="0"){
                
                this.adminLogin({user:this.user,pwd:this.pwd})
            }else{
                this.userLogin({user:this.user,pwd:this.pwd})
            }
        },
        btnBac(){
            if(!this.empty(this.user)&&!this.empty(this.pwd)){
               this.$refs.btn.style.background="#1b3867"
            }else{
                 this.$refs.btn.style.background="#bfbfbf"
            }
        },
        empty(val){
            var reg= /^\s+$/gi;
            if (reg.test(val ) || val.length==0) {
                return true;
            };
        }
       
    },
    created () {
        let that = this;
        document.onkeydown = function(){
            var key = window.event.keyCode
            if(key==13){
                that.tologin();
            }
        }    
    },
    watch:{
        loginResult(newVal){
            if(newVal.status=="0"){
                if(this.picked=="0"){
                    localStorage.setItem("user",newVal.data.adminname);
                    this.$router.push({name:"area"})
                }else{
                    sessionStorage.setItem("userid",newVal.data.userid);
                    this.$router.push({name:"Account",params:{userid:sessionStorage.getItem("userid")}}) 
                }
            }else if(newVal.status=="2"){
                this.$refs.hint.setAttribute("class","hint show")
                this.$refs.tip.innerHTML="账号或密码错误"
                setTimeout(()=>{
                    this.$refs.hint.setAttribute("class","hint fadeOut hide")
                },3000)
            }else{
                this.$Message.error('登录失败,请稍后再试');
            }
        },
    }
}

</script>

<style lang="scss" scoped>
	
</style>
