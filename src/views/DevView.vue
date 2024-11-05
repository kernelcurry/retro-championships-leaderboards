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


let leaderboardData = leaderboardsStore.generateTestData(44);

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
  <div class="max-w-screen-2xl mx-auto">
    <div class="p-4 bg-gray-100/20 bg-gradient-to-b from-gray-500/60 border-gray-100 border-2 rounded-xl">
      <div class="grid grid-cols-1 gap-0">
        <LeaderboardRow
          v-for="(item, index) in Top8"
          :key="'qual-row-' + item.place"
          :class="['']"
          :name="item.name"
          :place="item.place"
          :scores="item.scores"
          :use-place-styles="true"
        />
      </div>
    </div>

    <div
      class="grid grid-flow-row m-4 grid-rows-none md:grid-cols-2 lg:grid-cols-3 xl:grid-flow-col xl:grid-cols-none xl:grid-rows-8 2xl:grid-rows-8">
      <!--      <div class="grid grid-flow-row m-4 grid-cols-1 md:grid-cols-2 lg:grid-flow-col lg:grid-rows-10 lg:grid-cols-3 xl:grid-rows-8 xl:grid-cols-4 2xl:grid-rows-6 2xl:grid-cols-5">-->
      <LeaderboardRow
        v-for="(item, index) in Top8"
        :key="'qual-row-' + item.place"
        :class="['']"
        :name="item.name"
        :place="item.place"
        :scores="item.scores"
        :use-place-styles="true"
      />
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
</template>

<style scoped>

</style>
