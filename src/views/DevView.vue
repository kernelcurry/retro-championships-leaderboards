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
  <LeaderboardRow
    v-for="(item, index) in leaderboardsStore.allFinals"
    :key="'row-' + item.place"
    :name="item.name"
    :place="item.place"
    :scores="item.scores"
    :use-place-styles="true"
  />
</template>

<style scoped>

</style>
