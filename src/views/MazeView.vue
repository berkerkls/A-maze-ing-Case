<template>
  <v-row>
    <v-col align="center" cols="5">
      <v-btn @click="forgetPlayer" color="error" variant="flat"
        >Start Over</v-btn
      >
    </v-col>
  </v-row>
  <MazeList v-if="!playerInfo.isInMaze" />
</template>

<script lang="ts">
import { useToast } from 'vue-toastification';
const toast = useToast();
import { defineComponent } from 'vue';
// services
import { MazeService } from '@/services/MazeService';
import { PlayerService } from '@/services/PlayerService';
import { MazesService } from '@/services/MazesService';

// store
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { usePlayerStore } from '@/stores/playerStore';

// query dto types
import { PlayerInfoDto } from '@/models/PlayerInfoDto';
import type { AxiosResponse } from 'axios';

// components
import MazeList from '@/components/MazeList.vue';
import MazeComponent from '@/components/MazeComponent.vue';

export default defineComponent({
  name: 'MazeView',
  components: {
    MazeList,
    MazeComponent,
  },
  data() {
    return {
      name: '',
      mazeService: new MazeService(),
      playerService: new PlayerService(),
      mazesService: new MazesService(),
      playerInfo: new PlayerInfoDto(),
    };
  },
  mounted() {
    if (!this.isRegistered) {
      this.$router.push({ name: 'register' });
    } else {
      this.getPlayerDetail();
    }
  },
  computed: {
    ...mapState(usePlayerStore, ['isRegistered']),
  },
  methods: {
    ...mapActions(usePlayerStore, ['setIsRegistered']),
    getPlayerDetail() {
      this.playerService
        .getPlayerInfo()
        .then((res: AxiosResponse<PlayerInfoDto>) => {
          if (res.status == 200) {
            console.log('res', res.data);
            this.playerInfo = res.data;
            if (res.data.isInMaze) {
              this.$router.push({ name: 'maze' });
            }
          }
        });
    },
    forgetPlayer() {
      this.playerService
        .forgetCurrentProgress()
        .then((res: AxiosResponse<string>) => {
          this.$router.push({ name: 'register' });
          this.setIsRegistered(false);
          localStorage.removeItem('isRegistered');
          localStorage.removeItem('currentMaze');
          localStorage.removeItem('enteredMazes');
        });
    },
  },
});
</script>

<style scoped></style>
