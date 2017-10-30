<template>
<div id="app">
    <div class="main-container">
        <router-view></router-view>
    </div>
</div>
</template>
<script type="text/javascript">
    import "./libs/flexible/flexible"
    import Top from "./components/top.vue";
    // import Bottom from "./components/bottom.vue";
    import store from './vuex/store';

    export default {
        components:{
            etop:Top,
            // ebottom:Bottom
        },
        store,
        vuex: {
            actions: {

            }
        },
        ready() {

        }
    }
</script>
<style lang="sass">
    @import "./styles/awesome.scss"
    @import "./styles/mobile.scss"
    @import "./styles/index.scss"
    @import "./styles/z-login.scss"

    @import "./styles/area.scss"
    @import "./styles/accountinfo.scss"

    @import "./styles/z-top.scss"
    @import "./styles/z-account.scss"
    @import "./styles/dictionary.scss"
    @import "./styles/user.scss"
    @import "./styles/overview.scss"
    @import "./styles/useraccount.scss"
    @import "./styles/pert.scss"
    @import "./styles/datainput.scss"
</style>
