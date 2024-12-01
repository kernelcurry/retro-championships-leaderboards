<script lang="ts" setup>
import {computed} from 'vue';
import LeaderboardRow from "@/components/leaderboard/LeaderboardRow.vue";
import {useLeaderboardsStore} from '@/stores/leaderboards';
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

// Test data generation
// let leaderboardData = leaderboardsStore.generateTestData(8);
let leaderboardData = leaderboardsStore.startFetchingScores(30, {fetchQualifiers: false, fetchFinals: true})


// Computed properties for sliced data
const pedestalLeft = computed(() => leaderboardsStore.allFinals.slice(1, 2));
const pedestalCenter = computed(() => leaderboardsStore.allFinals.slice(0, 1));
const pedestalRight = computed(() => leaderboardsStore.allFinals.slice(2, 3));
const topThreeRows = computed(() => leaderboardsStore.allFinals.slice(0, 3));
const remainingRows = computed(() => leaderboardsStore.allFinals.slice(3));

</script>

<template>
  <div class="max-w-screen-2xl mx-auto">
    <div class="hidden xl:grid grid-cols-3 gap-x-0.5 justify-end items-end">
      <LeaderboardRow
        v-for="(item, index) in pedestalLeft"
        :key="'pedestal-' + item.place"
        :name="item.name"
        :place="item.place"
        :scores="item.scores"
        :use-place-styles="true"
        :is-pedestal="true"
      />
      <LeaderboardRow
        v-for="(item, index) in pedestalCenter"
        :key="'pedestal-' + item.place"
        :name="item.name"
        :place="item.place"
        :scores="item.scores"
        :use-place-styles="true"
        :is-pedestal="true"
      />
      <LeaderboardRow
        v-for="(item, index) in pedestalRight"
        :key="'pedestal-' + item.place"
        :name="item.name"
        :place="item.place"
        :scores="item.scores"
        :use-place-styles="true"
        :is-pedestal="true"
      />
    </div>

    <div class="space-y-0">

      <LeaderboardRow
        v-for="(item, index) in topThreeRows"
        :key="'row-' + item.place"
        :name="item.name"
        :place="item.place"
        :scores="item.scores"
        :use-place-styles="true"
        :class="['xl:hidden']"
      />

      <LeaderboardRow
        v-for="(item, index) in remainingRows"
        :key="'row-' + item.place"
        :name="item.name"
        :place="item.place"
        :scores="item.scores"
        :use-place-styles="true"
      />
    </div>

  </div>
</template>

<style scoped>

</style>
