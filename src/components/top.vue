<template>
    <div id="top">
        <div class="top-con">
            <div class="logo">
                <img src="../assets/images/logo.png" />
                <span>卓越运营系统</span>
            </div>
            <ul class="nav">
                <li>
                    <router-link :to="{name:'area'}">
                        区域范围设置
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'account'}">
                        个人账号设置
                    </router-link></li>
                <li>
                    <router-link :to="{name:'dictionary'}">
                        字典设置
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'productset'}">
                        产品设置
                    </router-link>
                </li>
            </ul>
            <div class="exit">
                <select v-model="selectLan">
				    <option v-for="(lan,idx) in lans" :value="lan.value" :key="idx">{{lan.name}}</option>
			    </select>
                <router-link :to="{name:'login'}">
                    退出
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex"
export default {
    data(){
        return{     
            lan:true,
            lans:[
                {name:"中文",value:"CH"},
                {name:"英文",value:"EN"}
            ],
            selectLan:"CH"
                
            
        }
       
    },
    methods:{
        changeLan(){
            this.lan = !this.lan;
        },
        choose(e){
            this.$refs.lan.innerHTML = e.target.innerHTML;
            this.lan = !this.lan;
        }
    },
    computed:{
   
    }
}
</script>
<style lang="scss">
   
</style>
