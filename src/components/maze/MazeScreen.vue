<template>
  <v-card width="500">
    <v-card-title>
      {{ currentMazeName[0] }}
    </v-card-title>
    <v-card-subtitle>{{
      `Potential Score in Maze: ${potentialScoreInMaze} // Current Maze Score in Bag: ${collectedScoreInMaze}`
    }}</v-card-subtitle>
    <v-card-text></v-card-text>
    <v-card-actions></v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'pinia';

// types
import type { AllMazesDto } from '@/models/AllMazesDto';
import { MazeInformationDto } from '@/models/MazeInformationDto';
// store
import { useMazeStore } from '@/stores/mazeStore';

export default defineComponent({
  name: 'MazeScreen',
  data() {
    return {
      potentialScoreInMaze: 0 as number,
      currentMazeInfo: new MazeInformationDto(),
      collectedScoreInMaze: 0,
    };
  },
  computed: {
    ...mapState(useMazeStore, [
      'enteredMazes',
      'currentMazeName',
      'currentMaze',
      'collectedScores',
    ]),
  },
  mounted() {
    let enteredMaze = this.enteredMazes.find(
      (item: AllMazesDto) => item.name === this.currentMazeName[0]
    );
    if (this.collectedScores) {
      this.collectedScores[0].map((item: any) => {
        if (item.mazeName == this.currentMazeName) {
          this.collectedScoreInMaze = item.collectedScore;
        }
      });
    }
    if (enteredMaze) {
      this.potentialScoreInMaze = enteredMaze.potentialReward;
      console.log('potential score in maze', enteredMaze);
    }
    if (this.currentMaze) {
      this.currentMazeInfo = this.currentMaze[0];
    }
  },
  methods: {},
  watch: {
    collectedScores: {
      handler() {
        this.collectedScores[0].map((item: any) => {
          if (item.mazeName === this.currentMazeName) {
            this.collectedScoreInMaze = item.collectedScore;
          }
        });
      },
      deep: true,
    },
  },
});
</script>
