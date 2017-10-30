<template>
    <div class="overview common">
        <ul class="overul clearfix">
            <router-link :to="{name:'kpi'}">
                <li>
                   KPI
                </li>
            </router-link>
            <router-link :to="{name:'loss'}">
            <li>
                LOSS
            </li>
            </router-link>
        </ul>
        <div class="overcontent">
            <router-view></router-view>
        </div> 
    </div>   
</template>
<script>
export default {
   
}
</script>
<style lang="sass" scoped>
</style>
