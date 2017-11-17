<template>
  <div class="nav-left">
    <!-- <ul>
        <router-link :to="{name:'overview'}" v-show = "showFlag">
          <li>
            <span>Overview</span> 
          </li>
        </router-link>
        <router-link :to="{name:'performance'}">
          <li>
            <span>Performance</span> 
          </li>
        </router-link>
        <router-link :to="{name:'lossmaping'}">
          <li>
           <span>Loss Mapping</span>
          </li>
        </router-link>
        <router-link :to="{name:'improvement'}">
          <li>  
            <span>Improvement Project</span>
          </li>
        </router-link>
        <router-link :to="{name:'savingbook'}">
          <li>
            <span>Saving Book</span>
          </li>
        </router-link>
        <router-link :to="{name:'datainput'}">
          <li>
            <span>Data Input</span>
          </li>
        </router-link>
        <router-link :to="{name:'useraccount'}">
          <li>
            <span>Account</span>
          </li>
        </router-link>

    </ul> -->
    <ul v-for="(item,idx) in validLeft" :key ="idx">
      <router-link :to="{name:item.validmenuname}">
          <li>
            <span>{{item.validmenuname}}</span> 
          </li>
        </router-link>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
  export default {
    data(){
      return{

      }
    },
    computed: {
      ...mapState([
        'validLeft'
      ])
    },
    methods: {
      ...mapActions([
        'selectUserById'
      ]),
    },
    mounted(){
      if(sessionStorage.getItem("userid")) {
        this.selectUserById({userid:sessionStorage.getItem("userid")})
        
        console.log(this.validmenuList)
      }else{
        console.log(this.$route);
      }
    },
    watch: {
      validmenu(){
        console.log(this.validmenu)
      }
    }
  }
</script>


