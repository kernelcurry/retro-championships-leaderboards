<script lang="ts" setup>
import { computed, withDefaults } from 'vue';
import LeaderboardRowScore from "@/components/leaderboard/LeaderboardRowScore.vue";

interface Score {
  score: string | number,
  score_head?: string | number,
  score_sub?: string | number
}

// Define props with usePlaceStyles defaulting to false
const props = withDefaults(defineProps<{
  place: string | number,
  name: string,
  scores: Score[],
  usePlaceStyles?: boolean
}>(), {
  usePlaceStyles: false  // Default value for usePlaceStyles
});

// Define place styles and fallback
const placeStyles = [
  "bg-gradient-to-br border-yellow-400 bg-yellow-400/20",  // 1st place
  "bg-gradient-to-br border-gray-100 bg-white/20",         // 2nd place
  "bg-gradient-to-br border-orange-400 bg-orange-400/20"   // 3rd place
];
const placeStylesFallback = "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700";

// Computed property to determine the correct style based on place and usePlaceStyles
const placeStyle = computed(() => {
  // If usePlaceStyles is false, always return the fallback
  if (!props.usePlaceStyles) return placeStylesFallback;

  // Try to convert place to a number
  const numericPlace = Number(props.place);

  // Use fallback if place cannot be parsed into a valid number (isNaN)
  if (isNaN(numericPlace)) return placeStylesFallback;

  // Return style for 1st, 2nd, or 3rd place; otherwise, fallback
  return placeStyles[numericPlace - 1] || placeStylesFallback;
});
</script>


<template>
  <div
    class="flex flex-col md:flex-row gap-x-4 gap-y-2 md:items-center border p-4 text-lg rounded-xl duration-300"
    :class="placeStyle"
  >
    <div class="flex gap-4 flex-grow items-center">
      <div class="text-4xl w-10 text-slate-500">{{ place }}</div>
      <div class="flex items-center gap-3 font-semibold text-2xl">
        {{ name }}
        <div class="flex items-center gap-2 bg-red-300"></div>
      </div>
    </div>
    <div class="flex gap-4 flex-row-reverse">
      <LeaderboardRowScore
        v-for="(score, index) in props.scores"
        :key="index"
        :score="score.score"
        :score_head="score.score_head"
        :score_sub="score.score_sub"
      ></LeaderboardRowScore>
    </div>
  </div>
</template>

<style scoped>

</style>
