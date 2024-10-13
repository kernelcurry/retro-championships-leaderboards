<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="container mx-auto">

    <div class="flex flex-col md:flex-row gap-8 place-items-center">

      <header class="basis-full md:basis-1/3">

        <!--Logo: Retro Championships-->
        <div class="basis-full flex items-center">
          <img alt="Retro Championships Logo" class="" src="@/assets/img/logo-md.png" width="1920" height="1400"/>
        </div>

        <!--Content: Title-->
        <div class="basis-full text-center  pt-4">
            <h1 class="text-3xl text-green-500">Leaderboards Archive</h1>
        </div>

        <!--Nav: General-->
        <div class="basis-full text-center items-center">
          <nav class="items-center pt-6">
            <RouterLink to="/" class="m-4">Home</RouterLink>
            <RouterLink to="/about" class="m-4">About</RouterLink>
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
