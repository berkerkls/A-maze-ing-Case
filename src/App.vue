<template>
  <v-app>
    <v-row
      align="center"
      justify="center"
      class="fill-height bg-background"
      style="width: 65vw"
    >
      <v-col>
        <RouterView />
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RegisterView from './views/RegisterView.vue';
import MazeView from './views/MazeView.vue';

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
