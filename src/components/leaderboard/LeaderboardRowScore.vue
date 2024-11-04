<script setup lang="ts">
defineProps<{
  score: string | number,
  score_head?: string | number
  score_sub?: string | number
}>()

// Single function to check and format numbers or numeric strings
const formatNumber = (value: string | number) => {
  // If the value is already a number, format it
  if (typeof value === 'number') {
    return new Intl.NumberFormat().format(value);
  }

  // If the value is a string, check if it's numeric and then format
  if (typeof value === 'string' && /^\d+(\.\d+)?$/.test(value)) {
    return new Intl.NumberFormat().format(parseFloat(value));
  }

  // If it's neither a number nor a numeric string, return it as is
  return value;
}
</script>

<template>
  <div class="flex items-center justify-center">
    <!-- Head section, right-aligned to be close to the score -->
    <span v-if="score_head" class="text-lg w-7/12 text-right bg-slate-800 bg-opacity-60 pr-2 border-t-2 border-b-2 border-l-2 rounded-l-full text-nowrap overflow-hidden">
      {{ formatNumber(score_head) }}
    </span>

    <!-- Main score section, centered and twice as large -->
    <!-- With Head OR Sub -->
    <span v-if="score_sub || score_head" class="font-bold text-center content-center bg-slate-800 bg-opacity-100 aspect-square w-12 border-2 rounded-xl text-4xl">
      {{ formatNumber(score) }}
    </span>

    <!-- Without Head OR Sub -->
    <span v-if="!score_sub && !score_head" class="font-bold text-center content-center text-6xl">
      {{ formatNumber(score) }}
    </span>

    <!-- Sub section, left-aligned to be close to the score -->
    <span v-if="score_sub" class="text-lg flex-grow text-left bg-slate-800 bg-opacity-60 pl-2 border-t-2 border-b-2 border-r-2 rounded-r-full">
      {{ formatNumber(score_sub) }}
    </span>
  </div>
</template>



<style scoped>

</style>
