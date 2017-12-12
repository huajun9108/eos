<template>
  <div class="nav-left">
    <!-- <ul>
        <router-link :to="{name:'Overview'}">
          <li>
            <span>Overview</span>
          </li>
        </router-link>
        <router-link :to="{name:'Loss Mapping'}">
          <li>
            <span>Loss Mapping</span>
          </li>
        </router-link>
        <router-link :to="{name:'Improvement'}">
          <li>
           <span>Improvement</span>
          </li>
        </router-link>
        <router-link :to="{name:'Project Summary'}">
          <li>
            <span>Project Summary</span>
          </li>
        </router-link>
        <router-link :to="{name:'Saving Book'}">
          <li>
            <span>Saving Book</span>
          </li>
        </router-link>
        <router-link :to="{name:'Data Input'}">
          <li>
            <span>Data Input</span>
          </li>
        </router-link>
        <router-link :to="{name:'Account'}">
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
    },
    mounted(){
    },
    watch: {

    }
  }
</script>
