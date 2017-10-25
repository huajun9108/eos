<template>
    <div class="content">
        <etop></etop>
        <div class="main-content col-md-8 col-lg-8">
            <router-view></router-view>
        </div>
    </div>
</template>
<script type="text/javascript">
    import Top from "../components/top.vue";
    export default {
        components:{
            etop:Top,
        }
    }
</script>
