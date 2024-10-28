<script lang="ts" setup>
import LeaderboardRow from "@/components/leaderboard/LeaderboardRow.vue";
import {useLeaderboardsStore} from '@/stores/leaderboards';
import { computed } from 'vue';
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


let leaderboardData = leaderboardsStore.generateTestData(16);

// Computed properties to split leaderboard data for two columns
const leftColumnRows = computed(() => leaderboardsStore.allFinals.filter((_, index) => index < 8));
const rightColumnRows = computed(() => leaderboardsStore.allFinals.filter((_, index) => index >= 8 && index < 16));


</script>

<template>
  <div class="grid gap-4 ml-4 mr-4 grid-cols-1 xl:grid-cols-2">
    <!-- Left Column (1-8) and Right Column (9-16) on larger screens, single column on smaller screens -->

    <LeaderboardRow
      v-for="(item, index) in leftColumnRows"
      :key="'row-left-' + item.place"
      :name="item.name"
      :place="item.place"
      :scores="item.scores"
      :use-place-styles="true"
    />

    <LeaderboardRow
      v-for="(item, index) in rightColumnRows"
      :key="'row-right-' + item.place"
      :name="item.name"
      :place="item.place"
      :scores="item.scores"
      :use-place-styles="true"
    />
  </div>

<!--  <div class="grid lg:grid-cols-2 grid-cols-1 lg:grid-rows-4 gap-4 ml-4 mr-4">-->
<!--    &lt;!&ndash; Loop through the first 16 items in the leaderboard &ndash;&gt;-->
<!--    <LeaderboardRow-->
<!--      v-for="(item, index) in leaderboardsStore.allFinals.slice(0, 16)"-->
<!--      :key="'row-' + item.place"-->
<!--      :name="item.name"-->
<!--      :place="item.place"-->
<!--      :scores="item.scores"-->
<!--      :use-place-styles="true"-->
<!--      :class="[-->
<!--        index < 8 ? 'col-start-1 row-start-' + (index + 1) : 'col-start-2 row-start-' + (index - 7)-->
<!--      ]"-->
<!--    />-->
<!--  </div>-->
</template>

<style scoped>

</style>
