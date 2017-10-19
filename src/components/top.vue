<template>
    <div id="top">
        <ul>
            <li>
                <router-link :to="{name:'area'}">
                    区域
                </router-link>
            </li>
            <li>
                <router-link :to="{name:'account'}">
                    个人账户设置
                </router-link></li>
            <li>
                <router-link :to="{name:'kpi'}">
                    kpi
                </router-link>
            </li>
            <li>
                <router-link :to="{name:'lossCategory'}">
                    loss1
                </router-link>
            </li>
            <li>
                <router-link :to="{name:'lossInto'}">
                    loss2
                </router-link>
            </li>
            <li>
                <router-link :to="{name:'login'}">
                    退出
                </router-link>
            </li>
       </ul>
    </div>
</template>

<script>
import {mapState} from "vuex"
export default {
    data(){
        return{
           
        currentIdx:0

        }
       
    },
    // methods:{
    //     changeIdx(n){
    //         this.currentIdx=n
    //     }
    // },
    computed:{
    ...mapState([
        "footList"
        ])
    }
}
</script>
<style lang="scss" scoped>
   
</style>
