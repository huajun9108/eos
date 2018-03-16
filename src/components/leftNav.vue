<template>
  <div class="nav-left">
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
