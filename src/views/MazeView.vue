<template>
  <MazeList v-if="!playerInfo.isInMaze" :mazeList="mazeList" />
  <MazeComponent v-else :playerInfo="playerInfo" />
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
import { usePlayerStore } from '@/stores/playerStore';

// query dto types
import { AllMazesDto } from '@/models/AllMazesDto';
import { PlayerInfoDto } from '@/models/PlayerInfoDto';
import axios, { AxiosError } from 'axios';
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
      mazeList: new Array<AllMazesDto>(),
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
    getPlayerDetail() {
      this.playerService
        .getPlayerInfo()
        .then((res: AxiosResponse<PlayerInfoDto>) => {
          if (res.status == 200) {
            console.log('res', res.data);
            this.playerInfo = res.data;
            if (!res.data.isInMaze) {
              this.getMazeList();
            }
          }
        });
    },
    getMazeList() {
      this.mazesService
        .getMazes()
        .then((res: AxiosResponse<Array<AllMazesDto>>) => {
          if (res.status == 200) {
            console.log('res', res.data);
            this.mazeList = res.data;
          }
        });
    },
  },
});
</script>

<style scoped></style>
