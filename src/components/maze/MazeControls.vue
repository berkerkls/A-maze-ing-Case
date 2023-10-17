<template>
  <v-card class="pa-20" rounded="true" width="500" max-height="50%">
    <v-card-actions>
      <v-row>
        <v-col
          v-if="
            currentMazeInfo.canCollectScoreHere &&
            +currentMazeInfo.currentScoreInHand > 0
          "
        >
          <v-badge :content="currentMazeInfo.currentScoreInHand">
            <v-btn
              @click="collectScore()"
              size="small"
              variant="flat"
              color="success"
              >Collect Score</v-btn
            >
          </v-badge>
        </v-col>
        <v-col v-if="currentMazeInfo.canExitMazeHere">
          <v-btn @click="exitMaze" size="small" variant="flat" color="error">
            Exit Maze
          </v-btn>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="1" align="start">
          <v-btn
            :disabled="!canMoveLeft"
            @click="toggleMoveButton('Left')"
            size="x-large"
            variant="text"
            icon="mdi-arrow-left-bold-box"
          ></v-btn>
        </v-col>
        <v-col cols="1" align="center">
          <v-row>
            <v-col>
              <v-btn
                :disabled="!canMoveUp"
                @click="toggleMoveButton('Up')"
                size="x-large"
                variant="text"
                icon="mdi-arrow-up-bold-box"
              ></v-btn>
            </v-col>
            <v-col>
              <v-btn
                :disabled="!canMoveDown"
                @click="toggleMoveButton('Down')"
                size="x-large"
                icon="mdi-arrow-down-bold-box"
              ></v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="1" align="end">
          <v-btn
            :disabled="!canMoveRight"
            @click="toggleMoveButton('Right')"
            size="x-large"
            variant="text"
            icon="mdi-arrow-right-bold-box"
          ></v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
    <v-card-subtitle>
      <v-row v-for="(item, index) in currentMazeInfo.possibleMoveActions">
        <v-col v-if="item.rewardOnDestination">
          <span>{{
            item.rewardOnDestination
              ? `For Destination ${item.direction} the reward is ${
                  item.rewardOnDestination
                } ${
                  item.allowsScoreCollection
                    ? 'and collectable'
                    : 'but uncollectable'
                }`
              : null
          }}</span>
        </v-col>
        <v-col v-if="item.hasBeenVisited">
          <span>{{
            `Destination ${item.direction} is visited ${
              item.allowsScoreCollection ? 'but collectable' : ''
            }`
          }}</span>
        </v-col>
        <v-col v-if="item.allowsExit">
          <span>{{ `You can exit from ${item.direction}` }}</span>
        </v-col>
      </v-row></v-card-subtitle
    >
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useMazeStore } from '@/stores/mazeStore';
import { mapState } from 'pinia';
import { mapActions } from 'pinia';

// services
import { MazeService } from '@/services/MazeService';

// query
import { MoveSuppliedDirectionQuery } from '@/models/moveSuppliedDirectionQuery';
import axios, { AxiosResponse } from 'axios';
import { MazeInformationDto } from '@/models/MazeInformationDto';

export default defineComponent({
  name: 'MazeControls',
  data() {
    return {
      mazeService: new MazeService(),
      currentMazeInfo: new MazeInformationDto(),
      canMoveLeft: false,
      canMoveRight: false,
      canMoveUp: false,
      canMoveDown: false,
      leftReward: 0,
      rightReward: 0,
      upReward: 0,
      downReward: 0,
    };
  },
  computed: {
    ...mapState(useMazeStore, ['currentMaze', 'currentMazeName']),
  },
  mounted() {
    if (this.currentMaze[0]) {
      this.setActions(this.currentMaze[0]);
      this.currentMazeInfo = this.currentMaze[0];
    }
  },
  methods: {
    ...mapActions(useMazeStore, ['setCurrentMaze', 'setCollectedScores']),
    toggleMoveButton(direction: string) {
      let query = new MoveSuppliedDirectionQuery();
      query.direction = direction;
      this.mazeService
        .moveSuppliedDirection(query)
        .then((res: AxiosResponse<any>) => {
          console.log('res', res);
          if (res.status == 200) {
            this.currentMazeInfo = res.data;
            this.setCurrentMaze(res.data);
            this.setActions(res.data);
          }
        });
    },
    setActions(currentMaze: object) {
      this.canMoveUp = false;
      this.canMoveDown = false;
      this.canMoveLeft = false;
      this.canMoveRight = false;
      currentMaze.possibleMoveActions.forEach((item: any) => {
        if (item.direction == 'Up') {
          this.canMoveUp = true;
          this.upReward = item.rewardOnDestination;
        }
        if (item.direction == 'Down') {
          this.canMoveDown = true;
          this.downReward = item.rewardOnDestination;
        }
        if (item.direction == 'Left') {
          this.canMoveLeft = true;
          this.leftReward = item.rewardOnDestination;
        }
        if (item.direction == 'Right') {
          this.canMoveRight = true;
          this.rightReward = item.rewardOnDestination;
        }
      });
    },
    collectScore() {
      this.mazeService.collectScore().then((res: AxiosResponse<any>) => {
        if (res.status == 200) {
          let collectedScore = {
            mazeName: this.currentMazeName[0],
            collectedScore: +this.currentMazeInfo.currentScoreInHand,
          };
          this.setCollectedScores(collectedScore);
          this.setCurrentMaze(res.data);
          this.setActions(res.data);
        }
      });
    },
    exitMaze() {
      this.mazeService.exitMaze().then((res: any) => {
        if (res.status == 200) {
          localStorage.removeItem('currentMaze');
          localStorage.removeItem('currentMazeName');
          localStorage.removeItem('collectedScores');
          this.$router.push({ name: 'mazelist' });
        }
      });
    },
  },
});
</script>
