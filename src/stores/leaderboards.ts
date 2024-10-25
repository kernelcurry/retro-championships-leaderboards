// src/stores/leaderboards.ts
import { defineStore } from 'pinia';

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
      const range = 'output!A2:E';  // Define the range for qualifiers
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
    async fetchScoresFromAPI({ fetchQualifiers = false, fetchFinals = false } = {}) {
      const fetchPromises = [];
      if (fetchQualifiers) fetchPromises.push(this.fetchQualifiersFromAPI());
      if (fetchFinals) fetchPromises.push(this.fetchFinalsFromAPI());

      if (fetchPromises.length > 0) {
        await Promise.all(fetchPromises);
      }
    },

    // Start fetching data every X seconds with options to fetch only qualifiers, finals, or both
    startFetchingScores(intervalSeconds: number = 30, options = { fetchQualifiers: false, fetchFinals: false }) {
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
