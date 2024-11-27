// src/stores/leaderboards.ts
import {defineStore} from 'pinia';

// Define the Score interface
interface Score {
  score: string | number;
  score_head?: string | number;  // Can be either string or number
  score_sub?: string | number;
}

// Define the LeaderboardRow interface
interface LeaderboardRow {
  place: number;
  name: string;
  scores: Score[];
}

// Access environment variables for Spreadsheet IDs and API Key
const QUALIFIERS_SPREADSHEET_ID = import.meta.env.VITE_QUALIFIERS_SPREADSHEET_ID;
const FINALS_SPREADSHEET_ID = import.meta.env.VITE_FINALS_SPREADSHEET_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

export const useLeaderboardsStore = defineStore('Leaderboards', {
  // State holds the leaderboard rows
  state: () => ({
    leaderboards: {
      qualifiers: [] as Array<LeaderboardRow>, // Array of qualifier rows
      finals: [] as Array<LeaderboardRow> // Array of finals rows
    },
    fetchInterval: null as number | null  // Holds the interval ID for API requests
  }),

  // Getters allow computed-like access to the state
  getters: {
    allQualifiers(state) {
      return state.leaderboards.qualifiers;
    },
    allFinals(state) {
      return state.leaderboards.finals;
    }
  },

  // Actions to modify state
  actions: {
    // Add a qualifier leaderboard row
    addQualifierRow(place: number, name: string, scores: Score[]) {
      this.leaderboards.qualifiers.push({
        place,
        name,
        scores
      });
    },

    // Add a finals leaderboard row
    addFinalsRow(place: number, name: string, scores: Score[]) {
      this.leaderboards.finals.push({
        place,
        name,
        scores
      });
    },

    // Generate and populate test data for both qualifiers and finals
    generateTestData(numEntries: number) {
      // List of unique names (both real names and gamer tags)
      const uniqueNames = ["ArcticFury", "BlazeFurySquad", "BlazePhoenix", "CelestialNomad", "CosmicScepter",
        "CrimsonBlazeZ", "CrimsonRogueX", "CrypticFalcon99", "CrystalVortex", "CyberWolf21", "Dragonbreath",
        "EchoStormX", "ElectricHusky21", "EmberDragon32", "EmberWolf88", "FrostbiteHunter", "FrostedNinja3",
        "GalacticRogue", "InfernoBlade", "LunaWolf12", "MysticFuryX", "MysticNinja95", "NebulaVoyager", "NeonHavoc",
        "NeoNinja", "NeonNova22", "NeonTalons12", "PixelGuardian", "PixelNinja", "QuantumNova22", "RogueFireball21",
        "ShadowGaleX", "ShadowPine95", "SolarEcho", "SteelStorm89", "StellarProwler", "StormChaser413", "ThunderBlade",
        "TurboTalon", "VenomousFalcon", "VoidSovereign", "VortexEcho7", "VortexNova", "XenoWolf32"
      ];

      // Shuffle names to ensure a random order each time
      const shuffledNames = uniqueNames.sort(() => Math.random() - 0.5);
      const maxEntries = Math.min(numEntries, shuffledNames.length);

      // Helper function to generate scores for finals or qualifiers
      const generateScores = (useFinals: boolean): Score[] => {
        if (useFinals) {
          const scores: Score[] = [
            // { score: Math.floor(Math.random() * 10), score_head: "1990 NWC", score_sub: Math.floor(Math.random() * 2000000) },
            {
              score: Math.floor(Math.random() * 10),
              score_head: "Campus Challenge '91",
              score_sub: Math.floor(Math.random() * 2000000)
            },
            {
              score: Math.floor(Math.random() * 10),
              score_head: "Campus Challenge '92",
              score_sub: Math.floor(Math.random() * 2000000)
            },
            {
              score: Math.floor(Math.random() * 10),
              score_head: "Star Fox: Super Weekend '93",
              score_sub: Math.floor(Math.random() * 2000000)
            },
            {
              score: Math.floor(Math.random() * 10),
              score_head: "PowerFest '94",
              score_sub: Math.floor(Math.random() * 2000000)
            },
            {
              score: Math.floor(Math.random() * 10),
              score_head: "DK Country Competition '95",
              score_sub: Math.floor(Math.random() * 2000000)
            }
          ];
          const totalScore = scores.reduce((total, game) => total + (Number(game.score) || 0), 0);
          scores.push({score: totalScore});
          return scores;
        } else {
          const scoreValue = Math.floor(Math.random() * 2000000);
          return [{score: scoreValue}];
        }
      };

      // Generate leaderboard entries and add rows
      const generateLeaderboardRows = (useFinals: boolean) => {
        const leaderboardData = [];
        for (let i = 0; i < maxEntries; i++) {
          const name = shuffledNames[i];
          const scores = generateScores(useFinals);
          const totalScore = useFinals ? scores[scores.length - 1].score : scores[0].score;

          leaderboardData.push({
            name,
            scores,
            totalScore
          });
        }

        // Sort by totalScore in descending order and assign places
        leaderboardData.sort((a, b) => Number(b.totalScore) - Number(a.totalScore));
        leaderboardData.forEach((entry, index) => {
          const place = index + 1;
          if (useFinals) {
            this.leaderboards.finals.push({place, name: entry.name, scores: entry.scores});
          } else {
            this.leaderboards.qualifiers.push({place, name: entry.name, scores: entry.scores});
          }
        });
      };

      // Reset current data and populate qualifiers and finals with test data
      this.leaderboards.qualifiers = [];
      this.leaderboards.finals = [];
      generateLeaderboardRows(false); // Populate qualifiers
      generateLeaderboardRows(true);  // Populate finals
    },

    // Reset all scores in both leaderboards
    resetScores() {
      this.leaderboards.qualifiers = [];
      this.leaderboards.finals = [];
    },

    // Private method to process the qualifiers API response and update the state
    _processQualifiersResponse(data: any) {
      this.leaderboards.qualifiers = data.map((item: any) => ({
        place: item[0],  // Assuming column A has the place
        name: item[1],   // Assuming column B has the name
        scores: [
          {
            score: item[2],      // Assuming column C has the score
            score_head: item[3], // Assuming column D has score_head
            score_sub: item[4]   // Assuming column E has score_sub
          }
        ]
      }));
    },

    // Private method to process the finals API response and update the state
    _processFinalsResponse(data: any) {
      this.leaderboards.finals = data.map((item: any) => ({
        place: item[0],  // Assuming column A has the place
        name: item[1],   // Assuming column B has the name
        scores: [
          {
            score: item[2],      // Assuming column C has the score
            score_head: item[3], // Assuming column D has score_head
            score_sub: item[4]   // Assuming column E has score_sub
          }
        ]
      }));
    },

    // Shared method to fetch data from Google Sheets API using the provided Spreadsheet ID and range
    async fetchFromGoogleSheets(spreadsheetId: string, range: string) {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${API_KEY}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data.values || [];  // Return the values from the response
      } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        return [];
      }
    },

    // Fetch and process qualifiers from Google Sheets API
    async fetchQualifiersFromAPI() {
      const range = 'output!A2:B';  // Define the range for qualifiers
      const rows = await this.fetchFromGoogleSheets(QUALIFIERS_SPREADSHEET_ID, range);  // Fetch data from the qualifiers sheet
      this._processQualifiersResponse(rows);  // Process the response
    },

    // Fetch and process finals from Google Sheets API
    async fetchFinalsFromAPI() {
      const range = 'output!A2:E';  // Define the range for finals
      const rows = await this.fetchFromGoogleSheets(FINALS_SPREADSHEET_ID, range);  // Fetch data from the finals sheet
      this._processFinalsResponse(rows);  // Process the response
    },

    // Fetch both qualifiers and finals, defaulting to not fetching anything unless configured
    async fetchScoresFromAPI({fetchQualifiers = false, fetchFinals = false} = {}) {
      const fetchPromises = [];
      if (fetchQualifiers) fetchPromises.push(this.fetchQualifiersFromAPI());
      if (fetchFinals) fetchPromises.push(this.fetchFinalsFromAPI());

      if (fetchPromises.length > 0) {
        await Promise.all(fetchPromises);
      }
    },

    // Start fetching data every X seconds with options to fetch only qualifiers, finals, or both
    startFetchingScores(intervalSeconds: number = 30, options = {fetchQualifiers: false, fetchFinals: false}) {
      if (this.fetchInterval) {
        clearInterval(this.fetchInterval);  // Clear any existing intervals
      }

      this.fetchScoresFromAPI(options);  // Fetch immediately on initialization

      // Set the interval to fetch data every X seconds, only if options allow
      this.fetchInterval = setInterval(() => {
        this.fetchScoresFromAPI(options);
      }, intervalSeconds * 1000);
    },

    // Stop fetching data
    stopFetchingScores() {
      if (this.fetchInterval) {
        clearInterval(this.fetchInterval);
        this.fetchInterval = null;
      }
    }
  }
});
