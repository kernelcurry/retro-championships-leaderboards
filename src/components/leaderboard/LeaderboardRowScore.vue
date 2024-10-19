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
  <div class="flex flex-col items-center justify-center">
    <span v-if="score_head" class="text-xs">{{ formatNumber(score_head) }}</span>
    <span :class="score_sub && score_head ? 'text-xl' : 'text-2xl'">{{ formatNumber(score) }}</span>
    <span v-if="score_sub" class="text-xs">{{ formatNumber(score_sub) }}</span>
  </div>
</template>

<style scoped>

</style>
