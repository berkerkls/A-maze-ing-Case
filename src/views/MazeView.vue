<template>
  <div class="container"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MazeService } from '@/services/MazeService';

export default defineComponent({
  data() {
    return {
      name: '',
      mazeService: new MazeService(),
    };
  },
  mounted() {
    this.getPossibleActions();
  },
  methods: {
    getPossibleActions() {
      this.mazeService.getPossibleActions();
    },
  },
});
</script>

<style scoped></style>
