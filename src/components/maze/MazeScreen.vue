<template>
  <v-card width="500">
    <v-card-title>
      {{ currentMazeName[0] ? currentMazeName[0] : '' }}
    </v-card-title>
    <v-card-subtitle>{{
      `Potential Score in Maze: ${potentialScoreInMaze} // Current Maze Score in Bag: ${collectedScoreInMaze}`
    }}</v-card-subtitle>
    <v-card-text style="max-height: 40vh">
      <v-row
        v-if="isExitFound && +collectedScoreInMaze === +potentialScoreInMaze"
      >
        <v-col>
          {{
            `You can exit from this path: ${exitPath.map(
              (el: string) => `${el} `
            )}`
          }}
        </v-col>
      </v-row>
      <v-row v-if="gotStuck">
        <v-col>
          {{ `You got stuck, here is the path to start: ${pathToStart}` }}
        </v-col>
      </v-row>
      <v-row v-if="currentMaze.currentScoreInBag">
        <v-col>
          {{
            +potentialScoreInMaze == +currentMaze.currentScoreInBag
              ? `You collected all score, here is the path to exit: ${exitPath}`
              : null
          }}
        </v-col>
      </v-row>
      <v-row v-if="currentMaze.currentScoreInHand">
        <v-col>
          {{
            currentMaze.currentScoreInHand + currentMaze.currentScoreInBag ===
              +potentialScoreInMaze &&
            currentMaze.currentScoreInBag !== +potentialScoreInMaze
              ? `You should collect your scores, here is path to collection point: ${lastScoreCollectionPoint}`
              : null
          }}
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions></v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'pinia';

// types
import type { AllMazesDto } from '@/models/AllMazesDto';
import { MazeInformationDto } from '@/models/MazeInformationDto';
import { MoveActionsDto } from '@/models/MoveActionsDto';
// store
import { useMazeStore } from '@/stores/mazeStore';

export default defineComponent({
  name: 'MazeScreen',
  data() {
    return {
      potentialScoreInMaze: 0 as number,
      currentMazeInfo: new MazeInformationDto(),
      collectedScoreInMaze: 0,
      gotStuck: false,
    };
  },
  computed: {
    ...mapState(useMazeStore, [
      'enteredMazes',
      'currentMazeName',
      'currentMaze',
      'collectedScores',
      'exitPath',
      'isExitFound',
      'pathToStart',
      'exitPath',
      'lastScoreCollectionPoint',
    ]),
  },
  created() {
    let enteredMaze;
    if (this.enteredMazes) {
      enteredMaze = this.enteredMazes.find(
        (item: AllMazesDto) => item.name === this.currentMazeName[0]
      );
    }
    if (this.collectedScores) {
      this.collectedScores.map((item: any) => {
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
      this.currentMazeInfo = this.currentMaze;
    }
  },
  watch: {
    collectedScores: {
      handler() {
        if (this.collectedScores) {
          this.collectedScores.map((item: any) => {
            if (item.mazeName === this.currentMazeName) {
              this.collectedScoreInMaze = item.collectedScore;
            }
          });
        }
      },
      deep: true,
    },
    currentMaze: {
      handler() {
        console.log('changes', this.currentMaze);
        if (this.currentMaze) {
          this.currentMazeInfo = this.currentMaze;
          this.gotStuck = this.currentMaze.possibleMoveActions.every(
            (el: MoveActionsDto) => el.hasBeenVisited === true
          );
        }
      },
      deep: true,
    },
  },
});
</script>
