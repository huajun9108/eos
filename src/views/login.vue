<template>
<div class="container">
	<div class="login" ref="log">
		<div class="login-con">
            <div class="userinfo">
                <div>
                    <i class="iconfont">用: </i><input type="" placeholder="请输入用户名" ref="tel" v-model="user"/>
                </div>
                <div>
                    <i class="iconfont">密: </i><input :type="seen?'password':''" placeholder="请输入密码" v-model="pwd" ref="pwd"/>
                    <i class="iconfont" @click="changeSeen">{{seen?"明文":"暗文"}}</i>
                </div>
                <input type="button" @click="login({user:user,pwd:pwd})" class="btn" value="登  录"/>
                <div class="hint hide" ref="hint">
                    <i class="iconfont">!</i><span class="tips" ref="tip"/></span>
                </div>
            </div>		          
		</div>         		
    </div>
    <!-- <div class="foot"> 
        <span>Shionto Technologies All Rights Reserved. 慎独科技，版权所有 沪ICP备15031714号-2</span>
    </div> -->
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
       
    },
    watch:{
        // pwdInput(newVal){
        //     this.$refs.pwd.value=newVal
        //     console.log(newVal)
        // },
        loginResult(newVal){
            console.log(newVal.status)
            if(newVal.status==2){
                this.$refs.hint.setAttribute("class","tips show")
                this.$refs.tip.innerHTML="账号或密码错误"
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
