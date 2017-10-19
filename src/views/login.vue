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
                    <i class="iconfont icon-User-name"></i><input type="text" placeholder="请输入用户名" ref="tel" v-model="user"/>
                </div>
                <div>
                    <i class="iconfont icon-password"></i><input v-bind:type="seen?'password':'text'" placeholder="请输入密码" v-model="pwd" ref="pwd"/>
                    <i :class="seen?'iconfont icon-eye_x':'iconfont icon-eye'" @click="changeSeen"></i>
                </div>
                <input type="button" @click="tologin" class="btn" value="登  录" ref="btn"/>
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
        }
    },
    computed:{
        ...mapState([
            // 'pwdInput',
            'loginResult'
        ]),
    },
    methods:{
        ...mapActions([
            'login'
        ]),
        changeSeen(){
            this.$refs.pwd.value=this.pwdInput
            this.seen = !this.seen;
        },
        
        tologin(){
            var regUser = /^\s*$/g;
            var regPwd = /^[a-zA-Z0-9]{6,20}$/;
            if(this.user=="" || regUser.test(this.user)){
                this.$refs.hint.setAttribute("class","hint show")
                this.$refs.tip.innerHTML="用户名不能为空"
                 setTimeout(()=>{
                    this.$refs.hint.setAttribute("class","hint fadeOut hide")
                },3000) 
            }else if(!regPwd.test(this.pwd)){
                this.$refs.hint.setAttribute("class","hint show")
                this.$refs.tip.innerHTML="密码格式6-20位,英文数字组合"
                 setTimeout(()=>{
                    this.$refs.hint.setAttribute("class","hint fadeOut hide")
                },3000) 
            }else{
                
                this.login({user:this.user,pwd:this.pwd})
            }
        },
       
    },
    watch:{
        // pwdInput(newVal){
        //     this.$refs.pwd.value=newVal
        //     console.log(newVal)
        // },
        loginResult(newVal){
            console.log(newVal.status)
            if(newVal.status==2){
                this.$refs.hint.setAttribute("class","hint show")
                this.$refs.tip.innerHTML="账号或密码错误"
                //  setTimeout(()=>{
                //     this.$refs.hint.setAttribute("class","hint fadeOut hide")
                // },3000) 
            }else{
                localStorage.setItem("user",this.user);
                this.$router.push({name:"area"})
            }
        }
    }
}

</script>

<style lang="scss" scoped>
	
</style>
