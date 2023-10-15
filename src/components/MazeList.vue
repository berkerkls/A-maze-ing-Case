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

const toast = useToast();

// services
import { MazesService } from '@/services/MazesService';
// query
import { EnterMazeQuery } from '@/models/EnterMazeQuery';
import axios, { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';

export default defineComponent({
  name: 'MazeList',
  props: ['mazeList'],
  data() {
    return {
      selectedMazeName: '' as string,
      mazesService: new MazesService(),
      mazeInformation: {} as any,
    };
  },
  methods: {
    enterMaze() {
      let query = new EnterMazeQuery();
      query.mazeName = this.selectedMazeName;
      this.mazesService.enterMaze(query).then((res: AxiosResponse<any>) => {
        console.log('res', res);
        this.mazeInformation = res;
      });
    },
  },
});
</script>
