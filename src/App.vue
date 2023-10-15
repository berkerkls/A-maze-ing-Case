<template>
  <div class="container">
    <RegisterView />
  </div>
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

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: auto;
}
</style>
