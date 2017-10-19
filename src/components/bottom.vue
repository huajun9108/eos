<template>
    <div id="bottom">
       页脚
    </div>
</template>

<script type="text/javascript">

export default {
    props:{
        title:String
    },
    methods:{
        goback(){
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped lang="scss">
    @import "../styles/mobile.scss";
    header{
        width:100%;
        height:P(90);
        background: #fff;
        text-align:center;
        position:fixed;
        left:0;
        top:0;
        z-index: 10;
        font-size:P(32);
        box-sizing: border-box;
        padding: 0 P(30);
        .goback{
            width:P(90);
            text-align:center;
            line-height: P(90);
            font-size: P(40);
            color:#454545;
            float: left;
        }
        span{
            line-height: P(90);
            font-weight:bold;
        }

    }
</style>