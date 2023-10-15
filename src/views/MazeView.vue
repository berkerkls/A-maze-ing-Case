<template>
  <div class="container"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      name: '',
    };
  },
  methods: {
    registerFunc(name: string) {
      console.log('name', name);
    },
  },
});
</script>

<style scoped></style>
