<template>
  <div class="nav-left">
    <ul>
        <router-link :to="{name:'overview'}" ref="overview">
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
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'left-Nav',
    data(){
      return {
        current: '',
        menu: [
          {name:"Overview",label:"/home"},
          {name:"Performance",label:"/designer"},
          {name:"Target",label:"/taskmanger"},
          {name:"Loss Mapping",label:"/node"},
          {name:"Improvement Project",label:"/home"},
          {name:"Saving Book",label:"/designer"},
          {name:"Data Input",label:"/designer"},
          {name:"Account",label:"/taskmanger"},
        ]
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


