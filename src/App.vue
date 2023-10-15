<template>
  <RegisterView />
  <!-- <MazeView /> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RegisterView from './views/RegisterView.vue';
import MazeView from './views/MazeView.vue';
import type MazeViewVue from './views/MazeView.vue';

export default defineComponent({
  name: 'App',
  components: {
    RegisterView,
    MazeView,
  },
  data() {
    return {
      name: 'deneme',
    };
  },
});
</script>

<style scoped></style>
