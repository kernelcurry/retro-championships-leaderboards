<script lang="ts" setup>
import {computed, withDefaults} from 'vue';
import LeaderboardRowScore from "@/components/leaderboard/LeaderboardRowScore.vue";

import pedestalGold from '@/assets/img/pedestal-gold.png';
import pedestalSilver from '@/assets/img/pedestal-silver.png';
import pedestalBronze from '@/assets/img/pedestal-bronze.png';
import tileRock from '@/assets/img/tile-rock.png';
import trophyGold from '@/assets/img/trophy-gold.png';
import trophySilver from '@/assets/img/trophy-silver.png';
import trophyBronze from '@/assets/img/trophy-bronze.png';

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
  "pb-[128px] bg-gradient-to-b rounded-t-xl border-yellow-400 border-2 from-yellow-500/60",  // 1st place
  "pb-[64px] bg-gradient-to-b rounded-tl-xl border-gray-100 border-2 from-gray-400",      // 2nd place
  "pb-[16px] bg-gradient-to-b rounded-tr-xl border-orange-400 border-2 from-orange-400/40"   // 3rd place
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

// Define place classes and fallback
const pedestalColor = [
  "#facc15",  // 1st place
  "#f3f4f6",  // 2nd place
  "#fb923c"   // 3rd place
];
const pedestalColorFallback = "#cbd0d6";

// Computed property to determine the correct style based on place and usePlaceStyles
const pedestalColorHex = computed(() => {
  // If usePlaceStyles is false, always return the fallback
  if (!props.usePlaceStyles) return pedestalColorFallback;

  // Try to convert place to a number
  const numericPlace = Number(props.place);

  // Use fallback if place cannot be parsed into a valid number (isNaN)
  if (isNaN(numericPlace)) return pedestalColorFallback;

  // Return style for 1st, 2nd, or 3rd place; otherwise, fallback
  return pedestalColor[numericPlace - 1] || pedestalColorFallback;
});

// Determine which image to use based on place
const pedestalImage = computed(() => {
  if (props.place === 1) return pedestalGold;
  if (props.place === 2) return pedestalSilver;
  if (props.place === 3) return pedestalBronze;
  return null; // Fallback or default image, if any
});

// Computed property to determine the correct trophy image based on place
const trophyImage = computed(() => {
  if (props.place === 1) return trophyGold;
  if (props.place === 2) return trophySilver;
  if (props.place === 3) return trophyBronze;
  return null; // No trophy for other places
});

const trophyImageWidth = computed(() => {
  if (props.place === 1) return 'w-20';
  if (props.place === 2) return 'w-14';
  if (props.place === 3) return 'w-8';
  return null; // No trophy for other places
});

// Compute the background image URL based on place
const placeClass = computed(() => {
  if (props.place === 1) return 'pedestal-gold';
  if (props.place === 2) return 'pedestal-silver';
  if (props.place === 3) return 'pedestal-bronze';
  return '';
});

const totalScore = computed(() => props.scores.slice(-1)[0]); // Gets the last score
const gameScores = computed(() => props.scores.slice(0, -1)); // Gets all but the last score

</script>

<template>
  <div v-bind="$attrs" class="root-element-class">

    <!-- Pedestal -->
    <div v-if="isPedestal" class="flex flex-col items-center">

      <div class="flex items-center flex-col gap-3 font-semibold text-4xl green pb-2"
           :style="{ color: pedestalColorHex}">
        {{ name }}
      </div>
      <!--    <div class="flex text-slate-400 flex-col py-2 mb-1 items-center text-3xl">-->
      <!--      <div>{{ scores[0].score }}</div>-->
      <!--    </div>-->

      <div class="w-full flex justify-center items-start text-3xl relative"
           :class="['pedestal', placeClass, pedestalClass]">
        <div class="flex flex-col w-[98%] z-10">
          <LeaderboardRowScore
            v-for="(score, index) in scores"
            :key="place + '-score-pedestal-' + (index + 1)"
            :score="score.score"
            :score_head="score.score_head"
            :score_sub="score.score_sub"
            :class="['pt-1']"
          ></LeaderboardRowScore>
        </div>
        <!-- Trophy images for bottom-left and bottom-right -->
        <img v-if="trophyImage" :src="trophyImage" alt="Trophy" class="absolute bottom-2 left-2 h-auto z-10"
             :class="trophyImageWidth">
        <img v-if="trophyImage" :src="trophyImage" alt="Trophy" class="absolute bottom-2 right-2 h-auto z-10"
             :class="trophyImageWidth">
      </div>
    </div>

    <!-- Row -->
    <div
      class="score-row flex flex-col md:flex-row md:items-center border-gray-400 border-x-2 border-b-2 text-lg duration-300"
      :class="placeStyle"
      v-if="!isPedestal"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full items-baseline">

        <!-- Player Tag & Overview -->
        <div class="flex row-span-2 pr-4 h-20 max-h-20">
          <!-- Place -->
          <div class="aspect-square h-full text-center content-center bg-slate-800 bg-opacity-90 border-gray-400 border-r-2"
               :class="[(gameScores.length > 1 ? 'border-b-2 rounded-br-xl' : '')]">
            <span class="font-semibold"
                  :class="[(gameScores.length > 1 ? 'text-5xl' : 'text-3xl')]">#{{ place }}</span>
          </div>
          <!-- Name & Total Score -->
          <div class="flex-grow content-center">
            <div class="w-full flex flex-wrap">
              <span class="pl-2 w-full h-1/2 font-bold text-3xl border-gray-400 border-b-2 leading-none" >{{ name }}</span>
              <span class="pl-2 w-full h-1/2 font-normal text-2xl">{{ totalScore.score }}</span>
            </div>
          </div>
        </div>

        <LeaderboardRowScore
          v-for="(score, index) in gameScores"
          :key="place + '-score-' + index"
          :score="score.score"
          :score_head="score.score_head"
          :score_sub="score.score_sub"
          :class="['row-span-2 px-1']"
        ></LeaderboardRowScore>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pedestal {
  position: relative;
  overflow: hidden;
  z-index: 1; /* Ensures that the content appears above the ::before element */
}

/* The ::before pseudo-element for the background image */
.pedestal::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1; /* Adjust the opacity of the background image here */
  z-index: -10; /* Ensures the background is behind the content */
  pointer-events: none; /* Prevents the pseudo-element from interfering with content interactions */
}

/* Specific classes for each place */
.pedestal-gold::before {
  background-image: url('@/assets/img/tile-rock.png');
  background-size: 32px 32px;
}

.pedestal-silver::before {
  background-image: url('@/assets/img/tile-rock.png');
  background-size: 32px 32px;
}

.pedestal-bronze::before {
  background-image: url('@/assets/img/tile-rock.png');
  background-size: 32px 32px;
}

.score-row {
  position: relative;
  overflow: hidden;
  z-index: 1; /* Ensures that the content appears above the ::before element */
}

/* The ::before pseudo-element for the background image */
.score-row::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1; /* Adjust the opacity of the background image here */
  z-index: -10; /* Ensures the background is behind the content */
  pointer-events: none; /* Prevents the pseudo-element from interfering with content interactions */
  background-image: url('@/assets/img/tile-rock.png');
  background-size: 32px 32px;
}
</style>
