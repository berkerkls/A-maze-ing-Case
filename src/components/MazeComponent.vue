<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
    "
  >
    <v-col align="center">
      <v-btn @click="forgetPlayer" color="error" variant="flat"
        >Start Over</v-btn
      >
    </v-col>
    <MazeScreen />
    <MazeControls />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useToast } from 'vue-toastification';
import { mapActions } from 'pinia';
import MazeScreen from './maze/MazeScreen.vue';
import MazeControls from './maze/MazeControls.vue';
const toast = useToast();
import axios, { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';

// services
import { MazeService } from '@/services/MazeService';
import { PlayerService } from '@/services/PlayerService';

// store
import { usePlayerStore } from '@/stores/playerStore';

export default defineComponent({
  name: 'Maze Component',
  components: {
    MazeScreen,
    MazeControls,
  },
  data() {
    return {
      mazeService: new MazeService(),
      playerService: new PlayerService(),
    };
  },
  methods: {
    ...mapActions(usePlayerStore, ['setIsRegistered']),
    getPossibleActions() {
      this.mazeService
        .getPossibleActions()
        .then((res: unknown) => {
          console.log(res, 'res');
          if (res) {
            toast.info(res);
          }
        })
        .catch((err: Error | AxiosError) => {
          if (axios.isAxiosError(err)) {
            toast.info(err.response?.data);
          }
        });
    },
    forgetPlayer() {
      this.playerService
        .forgetCurrentProgress()
        .then((res: AxiosResponse<string>) => {
          this.$router.push({ name: 'register' });
          this.setIsRegistered(false);
        });
    },
  },
});
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
