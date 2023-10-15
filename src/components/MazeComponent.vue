<template></template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useToast } from 'vue-toastification';
const toast = useToast();
import axios, { AxiosError } from 'axios';

// services
import { MazeService } from '@/services/MazeService';

export default defineComponent({
  name: 'Maze Component',
  props: ['playerInfo'],
  data() {
    return {
      mazeService: new MazeService(),
    };
  },
  mounted() {
    console.log('info', this.playerInfo);
  },
  methods: {
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
  },
});
</script>
