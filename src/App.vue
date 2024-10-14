<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="container mx-auto">

    <div class="flex flex-col md:flex-row gap-12 place-items-center">

      <header class="basis-full 2xl:basis-2/5">

        <!--Logo: Retro Championships-->
        <div class="basis-full flex items-center">
          <img alt="Retro Championships Logo" class="px-16" src="@/assets/img/logo-md.png" width="1920" height="1400"/>
        </div>

        <!--Content: Title-->
        <div class="basis-full text-center  pt-4">
            <h1 class="text-3xl text-green-500">Leaderboards Archive</h1>
        </div>

        <!--Nav: General-->
        <div class="basis-full text-center items-center">
          <nav class="items-center pt-6">
            <RouterLink to="/"
                        activeClass="underline"
                        class="m-4 hover:text-white">Home</RouterLink>
            <RouterLink to="/about"
                        activeClass="underline"
                        class="m-4 hover:text-white">About</RouterLink>
          </nav>
        </div>
      </header>

      <div class="basis-full 2xl:basis-3/5">
        <RouterView/>
      </div>


    </div>
  </div>
</template>

<style scoped>

</style>
