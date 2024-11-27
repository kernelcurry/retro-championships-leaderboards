<script lang="ts" setup>
import LeaderboardRow from "@/components/leaderboard/LeaderboardRow.vue";
import {useLeaderboardsStore} from '@/stores/leaderboards';
import {computed} from 'vue';
import LeaderboardRowScore from "@/components/leaderboard/LeaderboardRowScore.vue";

// Use the leaderboards store
const leaderboardsStore = useLeaderboardsStore();

// Getters (state)
const qualifiers = leaderboardsStore.allQualifiers; // Access qualifiers
const finals = leaderboardsStore.allFinals;         // Access finals

// Fetch methods (actions)
const fetchBoth = async () => {
  await leaderboardsStore.fetchScoresFromAPI({fetchQualifiers: true, fetchFinals: true});
};

const fetchQualifiers = async () => {
  await leaderboardsStore.fetchScoresFromAPI({fetchQualifiers: true});
};

const fetchFinals = async () => {
  await leaderboardsStore.fetchScoresFromAPI({fetchFinals: true});
};

// Reset leaderboard
const resetLeaderboard = () => {
  leaderboardsStore.resetScores();
};


let leaderboardData = leaderboardsStore.startFetchingScores(30, {fetchQualifiers: true})

// Computed properties to split leaderboard data for two columns
const leftColumnRows = computed(() => leaderboardsStore.allQualifiers.filter((_, index) => index < 8));
const rightColumnRows = computed(() => leaderboardsStore.allQualifiers.filter((_, index) => index >= 8 && index < 16));

// Top 1
const Top1 = computed(() => leaderboardsStore.allQualifiers.slice(0, 1));

// 2-8
const Top2to8 = computed(() => leaderboardsStore.allQualifiers.slice(1, 8));

// Top 3
const Top3 = computed(() => leaderboardsStore.allQualifiers.slice(0, 3));

// 4-8
const Top4to8 = computed(() => leaderboardsStore.allQualifiers.slice(3, 8));

// Top 8
const Top8 = computed(() => leaderboardsStore.allQualifiers.slice(0, 8));

// Top 16
const Top16 = computed(() => leaderboardsStore.allQualifiers.slice(0, 16));

// 9-16
const Top9to16 = computed(() => leaderboardsStore.allQualifiers.slice(8, 16));

// 17+
const Top17Plus = computed(() => leaderboardsStore.allQualifiers.slice(16));


</script>

<template>
  <div class="score-container">
  <div class="max-w-screen-2xl mx-auto">
    <div class="m-4">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <div class="col-span-1 md:col-span-2 xl:col-span-4 w-full text-center bg-slate-900 border-2 border-slate-400 rounded-t-xl py-2">
          <span class="inline-block w-full text-3xl font-bold">Top 8 Qualify for Finals!</span>
          <span class="inline-block text-xl font-normal">(Sunday @ 12:00)</span>
        </div>
        <LeaderboardRow
          v-for="(item, index) in Top8"
          :key="'qual-row-' + item.place"
          :class="['border-r-2', 'border-l-2', 'border-b-2', 'border-slate-400']"
          :name="item.name"
          :place="item.place"
          :scores="item.scores"
          :use-place-styles="false"
        />
      </div>
    </div>

    <div class="m-4">
      <div class="grid grid-flow-row grid-rows-none md:grid-cols-2 lg:grid-cols-3 xl:grid-flow-col xl:grid-cols-3 xl:grid-rows-9 2xl:grid-rows-9">
        <div class="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 w-full text-center bg-slate-900 border-2 border-slate-400 rounded-t-xl py-2">
          <span class="inline-block w-full text-3xl font-bold">Top 9 - 32</span>
          <span class="inline-block text-xl font-normal">Some inspirational quote here... YAY we Did it!</span>
        </div>
        <LeaderboardRow
          v-for="(item, index) in Top9to16"
          :key="'qual-row-' + item.place"
          :name="item.name"
          :place="item.place"
          :scores="item.scores"
          :use-place-styles="true"
        />
        <LeaderboardRow
          v-for="(item, index) in Top17Plus"
          :key="'qual-row-' + item.place"
          :name="item.name"
          :place="item.place"
          :scores="item.scores"
          :use-place-styles="true"
        />
      </div>
    </div>

  </div>
  </div>
</template>

<style scoped>

</style>
