<template>
  <RegisterView />
</template>

<script>
import { defineComponent } from 'vue';
import RegisterView from './views/RegisterView.vue';

export default defineComponent({
  name: 'App',
  components: {
    RegisterView,
  },
  data() {
    return {
      name: 'deneme',
    };
  },
  components: { RegisterView },
});
</script>

<style scoped></style>
