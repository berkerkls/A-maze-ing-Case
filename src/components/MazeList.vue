<template>
  <v-card :border="false" class="mx-auto" width="800">
    <v-card-title> Maze List </v-card-title>
    <v-card-subtitle
      >You haven't enter a maze yet, please select a maze and enter the
      maze.</v-card-subtitle
    >
    <v-card-text>
      <v-row>
        <v-col>
          <v-autocomplete
            v-model="selectedMazeName"
            :items="mazeList"
            item-title="name"
            item-value="name"
            label="Select a maze"
          >
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-row>
        <v-col align="center">
          <v-btn
            :disabled="!selectedMazeName"
            @click="enterMaze()"
            color="success"
            variant="flat"
            >Enter Maze</v-btn
          >
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useToast } from 'vue-toastification';
import { useMazeStore } from '@/stores/mazeStore';
import { mapActions } from 'pinia';
import { mapState } from 'pinia';

const toast = useToast();

// services
import { MazesService } from '@/services/MazesService';
// query
import { EnterMazeQuery } from '@/models/EnterMazeQuery';
import { AllMazesDto } from '@/models/AllMazesDto';
import axios, { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';

export default defineComponent({
  name: 'MazeList',
  data() {
    return {
      selectedMazeName: '' as string,
      mazesService: new MazesService(),
      mazeInformation: {} as any,
      mazeList: new Array<AllMazesDto>(),
    };
  },
  computed: {
    ...mapState(useMazeStore, ['enteredMazes']),
  },
  mounted() {
    this.getMazeList();
  },
  methods: {
    getMazeList() {
      this.mazesService
        .getMazes()
        .then((res: AxiosResponse<Array<AllMazesDto>>) => {
          if (res.status == 200) {
            console.log('maze list', res.data);
            this.mazeList = res.data.filter(
              (item: AllMazesDto) => !this.enteredMazes?.includes(item.name)
            );
          }
        });
    },
    ...mapActions(useMazeStore, ['setCurrentMaze', 'setEnteredMazes']),
    enterMaze() {
      let query = new EnterMazeQuery();
      query.mazeName = this.selectedMazeName;
      this.mazesService.enterMaze(query).then((res: AxiosResponse<any>) => {
        console.log('entered maze res', res);
        this.mazeInformation = res.data;
        console.log('maze', this.mazeInformation);
        this.setEnteredMazes(this.selectedMazeName);
        this.setCurrentMaze(this.mazeInformation);
        this.$router.push({ name: 'maze' });
      });
    },
  },
});
</script>
