<script lang="ts" setup>
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


let leaderboardData = leaderboardsStore.generateTestData(8);

</script>

<template>
  <div class="max-w-screen-2xl mx-auto">
      <div class="hidden xl:grid grid-cols-3 gap-1 justify-end items-end">
        <LeaderboardRow
          v-for="(item, index) in leaderboardsStore.allFinals.slice(1, 2)"
          :key="index"
          :name="item.name"
          :place="item.place"
          :scores="item.scores"
          :use-place-styles="true"
          :is-pedestal="true"
        />
        <LeaderboardRow
          v-for="(item, index) in leaderboardsStore.allFinals.slice(0, 1)"
          :key="index"
          :name="item.name"
          :place="item.place"
          :scores="item.scores"
          :use-place-styles="true"
          :is-pedestal="true"
        />
        <LeaderboardRow
          v-for="(item, index) in leaderboardsStore.allFinals.slice(2, 3)"
          :key="index"
          :name="item.name"
          :place="item.place"
          :scores="item.scores"
          :use-place-styles="true"
          :is-pedestal="true"
        />
      </div>

      <div class="xl:hidden space-y-4 mb-4">
        <LeaderboardRow
          v-for="(item, index) in leaderboardsStore.allFinals.slice(0,3)"
          :key="index"
          :name="item.name"
          :place="item.place"
          :scores="item.scores.reverse()"
          :use-place-styles="true"
        />
      </div>

    <div class="space-y-4">
      <LeaderboardRow
        v-for="(item, index) in leaderboardsStore.allFinals.slice(3)"
        :key="index"
        :name="item.name"
        :place="item.place"
        :scores="item.scores.reverse()"
        :use-place-styles="true"
      />
    </div>

  </div>
</template>

<style scoped>

</style>
