<script lang="ts" setup>
import LeaderboardRow from "@/components/leaderboard/LeaderboardRow.vue";

function generateLeaderboardData(useFinals: boolean, numEntries: number) {
  const fakeNames = ["Alice", "Bobby", "Charlie", "David", "Eve", "Frank", "Grace", "Hank", "Ivy", "Jack"];  // Example names
  let leaderboardData = [];

  for (let i = 1; i <= numEntries; i++) {
    // Random name from the fakeNames array
    const randomName = fakeNames[Math.floor(Math.random() * fakeNames.length)];

    let scores;
    let totalScore;
    if (useFinals) {
      // Generate finals scores
      scores = [
        { score: Math.floor(Math.random() * 10), score_head: "1990 NWC", score_sub: Math.floor(Math.random() * 2000000) },
        { score: Math.floor(Math.random() * 10), score_head: "1991 CC", score_sub: Math.floor(Math.random() * 2000000) },
        { score: Math.floor(Math.random() * 10), score_head: "1992 CC", score_sub: Math.floor(Math.random() * 2000000) },
        { score: Math.floor(Math.random() * 10), score_head: "1993 SFSW", score_sub: Math.floor(Math.random() * 2000000) },
        { score: Math.floor(Math.random() * 10), score_head: "1994 PF", score_sub: Math.floor(Math.random() * 2000000) },
        { score: Math.floor(Math.random() * 10), score_head: "1995 DKCC", score_sub: Math.floor(Math.random() * 2000000) }
      ];

      // Calculate the sum of all score_sub values
      totalScore = scores.reduce((total, game) => total + (game.score || 0), 0);

      // Add the final score object with the total sum
      scores.push({ score: totalScore });
    } else {
      // Generate quals scores (single score)
      scores = [{ score: Math.floor(Math.random() * 2000000) }];

      // The single score is the total score for quals
      totalScore = scores[0].score;
    }

    leaderboardData.push({
      name: randomName,
      scores,
      totalScore  // Keep track of the total score for sorting
    });
  }

  // Sort the leaderboard by totalScore in descending order
  leaderboardData.sort((a, b) => b.totalScore - a.totalScore);

  // Assign the place based on sorted totalScore
  leaderboardData = leaderboardData.map((entry, index) => ({
    ...entry,
    place: index + 1  // The index + 1 gives the correct place (1st, 2nd, etc.)
  }));

  return leaderboardData;
}



let scores_finals = [
  {score: 8, score_head: "1990 NWC", score_sub: 1581600},
  {score: 8, score_head: "1991 CC", score_sub: 19474000},
  {score: 7, score_head: "1992 CC", score_sub: 5860450},
  {score: 8, score_head: "1993 SFSW", score_sub: 151856},
  {score: 8, score_head: "1994 PF", score_sub: 1581600},
  {score: 8, score_head: "1995 DKCC", score_sub: 5008},
  {score: 39}
];

let leaderboardData = generateLeaderboardData(true,8);

// let leaderboardData = generateLeaderboardData(false,20);
</script>

<template>
  <div class="max-w-screen-md mx-auto">
    <div class="space-y-4">
      <div class="space-y-4">

        <LeaderboardRow
          v-for="(item, index) in leaderboardData"
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
