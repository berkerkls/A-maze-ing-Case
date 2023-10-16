<template>
  <v-card class="pa-20" rounded="true" width="500" max-height="50%">
    <v-card-actions>
      <v-row>
        <v-col
          v-if="
            currentMaze.canCollectScoreHere &&
            +currentMaze.currentScoreInHand > 0
          "
        >
          <v-btn size="small" variant="flat" color="success"
            >Collect Score</v-btn
          >
        </v-col>
        <v-col>
          <v-btn size="small" variant="flat" color="error"> Exit Maze </v-btn>
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
                variant="text"
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

export default defineComponent({
  name: 'MazeControls',
  data() {
    return {
      mazeService: new MazeService(),
      canMoveLeft: false,
      canMoveRight: false,
      canMoveUp: false,
      canMoveDown: false,
    };
  },
  computed: {
    ...mapState(useMazeStore, ['currentMaze']),
  },
  mounted() {
    if (this.currentMaze) {
      this.setActions(this.currentMaze[0]);
    }
  },
  methods: {
    ...mapActions(useMazeStore, ['setCurrentMaze']),
    toggleMoveButton(direction: string) {
      let query = new MoveSuppliedDirectionQuery();
      query.direction = direction;
      this.mazeService
        .moveSuppliedDirection(query)
        .then((res: AxiosResponse<any>) => {
          console.log('res', res);
          if (res.status == 200) {
            this.setCurrentMaze(res.data);
            this.setActions(res.data);
          }
        });
    },
    setActions(currentMaze: object) {
      currentMaze.possibleMoveActions.forEach((item: any) => {
        if (item.direction == 'Up') {
          this.canMoveUp = true;
        }
        if (item.direction == 'Down') {
          this.canMoveDown = true;
        }
        if (item.direction == 'Left') {
          this.canMoveLeft = true;
        }
        if (item.direction == 'Right') {
          this.canMoveRight = true;
        }
      });
    },
  },
});
</script>
