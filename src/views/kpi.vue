<template>
    <div class="list">
       kpi显示
    </div>
</template>
<script type="text/javascript">
    
    import {mapState,mapActions} from "vuex"
    export default {
        computed:{
            ...mapState([
            //    'localData',
            //    'popularData',
            //    'countryData',
            //    'localshop',
            //    'countryshop'
                ])
        },
        methods:{
            ...mapActions([
                // 'getlocalData',
                // 'getpopularData',
                // 'getcountryData',
                // 'getlocalshop',
                // 'getcountryshop'
                ])
    },
    watch:{
        
        
        
    },

    mounted(){
        // this.getlocalData()
        // this.getpopularData()
        // this.getcountryData()
        // this.getlocalshop()
        // this.getcountryshop()
       
    }
}
</script>

<style lang="scss" scoped>
    
</style>
