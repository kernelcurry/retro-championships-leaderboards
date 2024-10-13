<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="container mx-auto">

    <div class=" flex flex-col md:flex-row">

      <header class="basis-full md:basis-1/3">

        <!--Logo: Retro Championships-->
        <div class="basis-full flex items-center">
          <img alt="Retro Championships Logo" class="" src="@/assets/img/logo-md.png" width="1920" height="1400"/>
        </div>

        <!--Content: Title-->
        <div class="basis-full flex items-center">
          <HelloWorld msg="Coming Soon!"/>
        </div>

        <!--Nav: General-->
        <div class="basis-full flex items-center">
          <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
          </nav>
        </div>
      </header>

      <div class="basis-full md:basis-2/3">
        <RouterView/>
      </div>


    </div>
  </div>
</template>

<style scoped>

</style>
