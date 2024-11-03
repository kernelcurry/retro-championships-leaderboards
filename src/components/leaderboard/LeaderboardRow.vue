<script lang="ts" setup>
import { computed, withDefaults } from 'vue';
import LeaderboardRowScore from "@/components/leaderboard/LeaderboardRowScore.vue";

import pedestalGold from '@/assets/img/pedestal-gold.png';
import pedestalSilver from '@/assets/img/pedestal-silver.png';
import pedestalBronze from '@/assets/img/pedestal-bronze.png';
import tileRock from '@/assets/img/tile-rock.png';

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
  isPedestal?: boolean
}>(), {
  usePlaceStyles: false,
  isPedestal: false
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

// Define place classes and fallback
const pedestalClasses = [
  "h-60 bg-gradient-to-b rounded-t-xl border-yellow-400 border-2 from-yellow-500/60",  // 1st place
  "h-44 bg-gradient-to-b rounded-tl-xl border-gray-100 border-2 from-gray-400",      // 2nd place
  "h-28 bg-gradient-to-b rounded-tr-xl border-orange-400 border-2 from-orange-400/40"   // 3rd place
];
const pedestalClassesFallback = "h-24 bg-gradient-to-b rounded-tl-xl border-slate-700 border-2 from-gray-600";

// Computed property to determine the correct style based on place and usePlaceStyles
const pedestalClass = computed(() => {
  // If usePlaceStyles is false, always return the fallback
  if (!props.usePlaceStyles) return pedestalClassesFallback;

  // Try to convert place to a number
  const numericPlace = Number(props.place);

  // Use fallback if place cannot be parsed into a valid number (isNaN)
  if (isNaN(numericPlace)) return pedestalClassesFallback;

  // Return style for 1st, 2nd, or 3rd place; otherwise, fallback
  return pedestalClasses[numericPlace - 1] || pedestalClassesFallback;
});

// Determine which image to use based on place
const pedestalImage = computed(() => {
  if (props.place === 1) return pedestalGold;
  if (props.place === 2) return pedestalSilver;
  if (props.place === 3) return pedestalBronze;
  return null; // Fallback or default image, if any
});

// Compute the background image URL based on place
const placeClass = computed(() => {
  if (props.place === 1) return 'pedestal-gold';
  if (props.place === 2) return 'pedestal-silver';
  if (props.place === 3) return 'pedestal-bronze';
  return '';
});
</script>


<template>

  <div v-bind="$attrs" class="root-element-class">
  <!-- Pedestal -->
  <div v-if="isPedestal" class="flex flex-col items-center">

    <div class="flex items-center flex-col gap-3 font-semibold text-3xl">
      {{ name }}
      <div class="flex items-center gap-2"></div>
    </div>
<!--    <div class="flex text-slate-400 flex-col py-2 mb-1 items-center text-3xl">-->
<!--      <div>{{ scores[0].score }}</div>-->
<!--    </div>-->

    <div class="w-full flex justify-center items-start text-3xl" :class="['pedestal', placeClass, pedestalClass]">
      <div class="grid grid-flow-row xl:grid-cols-6 grid-cols-3 grid-rows-1 gap-2 p-4">
        <LeaderboardRowScore
          v-for="(score, index) in scores"
          :key="place + '-score-pedestal-' + (index + 1)"
          :score="score.score"
          :score_head="score.score_head"
          :score_sub="score.score_sub"
        ></LeaderboardRowScore>
      </div>
    </div>
  </div>

  <!-- Row -->
  <div
    class="flex flex-col md:flex-row gap-x-4 gap-y-2 md:items-center border p-4 text-lg rounded-xl duration-300"
    :class="placeStyle"
    v-if="!isPedestal"
  >
    <div class="flex gap-4 flex-grow items-center">
      <div class="text-4xl w-10 text-slate-500">{{ place }}</div>
      <div class="flex items-center gap-3 font-semibold text-2xl">
        {{ name }}
        <div class="flex items-center gap-2 bg-red-300"></div>
      </div>
    </div>
    <div class="flex gap-4 flex-row">
      <LeaderboardRowScore
        v-for="(score, index) in props.scores"
        :key="place + '-score-' + index"
        :score="score.score"
        :score_head="score.score_head"
        :score_sub="score.score_sub"
      ></LeaderboardRowScore>
    </div>
  </div>
  </div>
</template>

<style scoped>
.pedestal {
  position: relative;
  overflow: hidden;
  //width: 100%;
  //height: 100%;
  //display: flex;
  //align-items: center;
  //justify-content: center;
  z-index: 2; /* Ensures that the content appears above the ::before element */
}

/* The ::before pseudo-element for the background image */
.pedestal::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  //background-size: contain;
  //background-position: center;
  //background-repeat: no-repeat;
  opacity: 0.4; /* Adjust the opacity of the background image here */
  z-index: 1; /* Ensures the background is behind the content */
  pointer-events: none; /* Prevents the pseudo-element from interfering with content interactions */
}

/* Specific classes for each place */
.pedestal-gold::before {
  background-image: url('@/assets/img/tile-rock.png');
  background-size: 32px 32px;
}

.pedestal-silver::before {
  background-image: url('@/assets/img/tile-rock.png');
  background-size: 48px 48px;
}

.pedestal-bronze::before {
  background-image: url('@/assets/img/tile-rock.png');
  background-size: 60px 60px;
}
</style>
