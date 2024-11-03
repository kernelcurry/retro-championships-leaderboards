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
  <div class="flex place-content-center">
    <!-- Left side: score_head at top and score_sub at bottom -->
    <div v-if="score_head || score_sub" class="flex flex-col justify-between w-3/5">
      <span v-if="score_head" class="text-xl border-b-2 border-r-2 text-center h-full">
        {{formatNumber(score_head) }}
      </span>
      <span v-if="score_sub" class="text-lg border-r-2 text-center h-full">
        {{ formatNumber(score_sub) }}
      </span>
    </div>

    <!-- Right side: Main score, spans entire right side vertically -->
    <div class="flex items-center justify-center w-2/5 relative">
      <span
        class="absolute top-0 left-0 aspect-square h-full flex items-center justify-center text-center bg-slate-600"
        :class="score_sub && score_head ? 'text-3xl' : 'text-4xl'"
        style="clip-path: polygon(0 0, 100% 0, 100% 20%, 80% 50%, 100% 80%, 100% 100%, 0 100%); /* Ticket */">
        {{ formatNumber(score) }}
      </span>
    </div>
  </div>
</template>


<style scoped>

</style>
