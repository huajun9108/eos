<template>
    <div class="improvement user_common ">
        <div class="improve_content  user_maincontent">
            <div class="summary_top">
                <router-link :to="{name:'project'}">
                    <span>Project</span>
                </router-link>
                <router-link :to="{name:'rca'}">
                    <span>RCA</span>
                </router-link>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>

</script>
<style lang="scss" scoped>
	
</style>
