<template>
    <div id="user">
        <div>
            <ul>
                <router-link :to="{name:'pert'}">
                    <li>
                        performance/target
                    </li>
                </router-link>
                <router-link :to="{name:'lossm'}">
                <li>
                    loss mapping
                </li>
                </router-link>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
   
}
</script>
<style lang="sass" scoped>
</style>
