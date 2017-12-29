<template>
<div class="datainput user_common">
  <div class="datainputContainer user_maincontent">
    <div class="datainput_top">
      <span :class="ceremonyFlag?'inputBtn activeBtn':'inputBtn'" @click="openCeremonyClick">开班</span>
      <span :class="historyFlag?'inputBtn activeBtn':'inputBtn'" @click="openHistoryClick">班次历史记录</span>
    </div>
    <div class="datainput_content">
      <v-ceremony v-show="ceremonyFlag"></v-ceremony>
      <v-history v-show="historyFlag"></v-history>
    </div>
  </div>
</div>
</template>
<script>
import ceremony from "./openCeremony.vue"
import history from "./classHistory.vue"
export default {
  components: {
    "v-ceremony":ceremony,
    "v-history":history
  },
  data(){
    return{
      ceremonyFlag:false,
      historyFlag:false
    }
  },
  methods: {
    openCeremonyClick(){
      if (this.ceremonyFlag) {
        this.$Message.error("请勿重复点击开班");
      }
      this.ceremonyFlag =true
      this.historyFlag =false
    },
    openHistoryClick(){
      this.ceremonyFlag =false
      this.historyFlag =true
    }
  },
}
</script>
<style lang="sass" scoped>
</style>
