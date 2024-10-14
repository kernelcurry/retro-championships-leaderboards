<script lang="ts" setup>
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <div class="container mx-auto">

    <div class="flex flex-col xl:flex-row gap-12">

      <header class="basis-full xl:basis-2/5 mt-12">

        <!--Logo: Retro Championships-->
        <div class="basis-full flex items-center">
          <img alt="Retro Championships Logo" class="px-16" height="1400" src="@/assets/img/logo-md.png" width="1920"/>
        </div>

        <!--Content: Title-->
        <div class="basis-full text-center  pt-4">
          <h1 class="text-3xl  font-bold upper">Leaderboards Archive</h1>
        </div>

        <!--Nav: General-->
        <div class="basis-full text-center items-center">
          <nav class="items-center pt-6">
            <RouterLink activeClass="underline"
                        class="m-4 hover:text-white"
                        to="/">Home
            </RouterLink>
            <RouterLink activeClass="underline"
                        class="m-4 hover:text-white"
                        to="/about">About
            </RouterLink>
          </nav>
        </div>
      </header>

      <!--Content: Page Main-->
      <div class="basis-full xl:basis-3/5 place-content-center">
        <RouterView/>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>
