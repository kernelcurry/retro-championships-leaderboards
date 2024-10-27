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


let leaderboardData = leaderboardsStore.generateTestData(10);

</script>

<template>
  <div class="max-w-screen-2xl mx-auto">
    <div class="space-y-4">
      <div class="space-y-4">

        <div class="hidden md:grid grid-cols-3 gap-1 justify-end items-end">

          <!-- 2nd Place-->
          <div class="flex flex-col items-center ">
            <div class="flex items-center flex-col gap-3 font-semibold text-3xl">
              Mr McFace Face
              <div class="flex items-center gap-2"></div>
            </div>
            <div class="flex text-slate-400 flex-col py-2 mb-1 items-center text-3xl">
              <div>32</div>
            </div>

            <!-- Pedestal: Silver -->
            <div class="w-full h-48 bg-gradient-to-b rounded-tl-xl border-slate-700 from-gray-400 flex justify-center items-start text-3xl">
              <div class="grid grid-flow-row xl:grid-cols-5 grid-cols-3 grid-rows-2 gap-2 p-4">
                <LeaderboardRowScore
                  v-for="(score, index) in leaderboardsStore.allFinals[0].scores.slice(1)"
                  :key="index + 1"
                  :score="score.score"
                  :score_head="score.score_head"
                  :score_sub="score.score_sub"
                ></LeaderboardRowScore>
              </div>
            </div>
          </div>

          <!-- 1st Place-->
          <div class="flex flex-col items-center ">
            <div class="flex items-center flex-col gap-3 font-semibold text-3xl">
              The Hulk
              <div class="flex items-center gap-2"></div>
            </div>
            <div class="flex text-slate-400 flex-col py-2 mb-1 items-center text-3xl">
              <div>48</div>
            </div>

            <!-- Pedestal: Gold -->
            <div class="w-full h-60 bg-gradient-to-b rounded-t-xl border-slate-700 from-yellow-500/60 flex justify-center items-start text-3xl">
              <div class="grid grid-flow-row grid-cols-3 grid-rows-2 gap-2 p-4">
                <LeaderboardRowScore
                  v-for="(score, index) in leaderboardsStore.allFinals[0].scores.slice(1)"
                  :key="index + 1"
                  :score="score.score"
                  :score_head="score.score_head"
                  :score_sub="score.score_sub"
                ></LeaderboardRowScore>
              </div>
            </div>
          </div>

          <!-- 3rd Place-->
          <div class="flex flex-col items-center ">
            <div class="flex items-center flex-col gap-3 font-semibold text-3xl">
              Duck Bro
              <div class="flex items-center gap-2"></div>
            </div>
            <div class="flex text-slate-400 flex-col py-2 mb-1 items-center text-3xl">
              <div>28</div>
            </div>

            <!-- Pedestal: Bronze -->
            <div class="w-full h-36 bg-gradient-to-b rounded-tr-xl border-slate-700 from-orange-400/40 flex justify-center items-start text-3xl">
              <div class="grid grid-flow-row grid-cols-3 grid-rows-2 gap-2 p-4">
                <LeaderboardRowScore
                  v-for="(score, index) in leaderboardsStore.allFinals[0].scores.slice(1)"
                  :key="index + 1"
                  :score="score.score"
                  :score_head="score.score_head"
                  :score_sub="score.score_sub"
                ></LeaderboardRowScore>
              </div>
            </div>
          </div>
        </div>

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
