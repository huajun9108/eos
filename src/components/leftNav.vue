<template>
  <div class="nav-left">
    <ul>
        <router-link :to="{name:'overview'}">
          <li>
            <span>Overview</span> 
          </li>
        </router-link>
        <router-link :to="{name:'performance'}">
          <li>
            <span>Performance</span> 
          </li>
        </router-link>
        <router-link :to="{name:'target'}">
          <li>
            <span>Target</span>
          </li>
        </router-link>
        <router-link :to="{name:'lossmaping'}">
          <li>
           <span>Loss Mapping</span>
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
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'left-Nav',
    data(){
      return {
        current: '',
        menu: []
      }
    },
    mounted(){
    },
    watch: {
      $route(to, from){
      }
    }
  }
</script>
<<script lang="scss">
export default {
  
}
</script>

