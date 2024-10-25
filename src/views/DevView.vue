<script lang="ts" setup>
import LeaderboardRow from "@/components/leaderboard/LeaderboardRow.vue";
import { useLeaderboardsStore } from '@/stores/leaderboards';

// Use the leaderboards store
const leaderboardsStore = useLeaderboardsStore();

// Getters (state)
const qualifiers = leaderboardsStore.allQualifiers; // Access qualifiers
const finals = leaderboardsStore.allFinals;         // Access finals

// Fetch methods (actions)
const fetchBoth = async () => {
  await leaderboardsStore.fetchScoresFromAPI({ fetchQualifiers: true, fetchFinals: true });
};

const fetchQualifiers = async () => {
  await leaderboardsStore.fetchScoresFromAPI({ fetchQualifiers: true });
};

const fetchFinals = async () => {
  await leaderboardsStore.fetchScoresFromAPI({ fetchFinals: true });
};

// Reset leaderboard
const resetLeaderboard = () => {
  leaderboardsStore.resetScores();
};


let leaderboardData = leaderboardsStore.generateTestData(10);

</script>

<template>
  <div class="max-w-screen-md mx-auto">
    <div class="space-y-4">
      <div class="space-y-4">

        <LeaderboardRow
          v-for="(item, index) in leaderboardsStore.allFinals"
          :key="index"
          :name="item.name"
          :place="item.place"
          :scores="item.scores.reverse()"
          :use-place-styles="true"
        />

      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
