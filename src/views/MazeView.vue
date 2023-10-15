<template>
  <h1>deneme</h1>
</template>

<script lang="ts">
import { useToast } from 'vue-toastification';
const toast = useToast();
import { defineComponent } from 'vue';
import { MazeService } from '@/services/MazeService';
import axios, { AxiosError } from 'axios';
import { usePlayerStore } from '@/stores/playerStore';
import { mapState } from 'pinia';

export default defineComponent({
  name: 'MazeView',
  data() {
    return {
      name: '',
      mazeService: new MazeService(),
    };
  },
  mounted() {
    if (!this.isRegistered) {
      this.$router.push({ name: 'register' });
    }
    console.log('register', this.isRegistered);
    // this.getPossibleActions();
  },
  computed: {
    ...mapState(usePlayerStore, ['isRegistered']),
  },
  methods: {
    // getPossibleActions() {
    //   this.mazeService
    //     .getPossibleActions()
    //     .then((res: unknown) => {
    //       console.log(res, 'res');
    //       if (res) {
    //         toast.info(res);
    //       }
    //     })
    //     .catch((err: Error | AxiosError) => {
    //       if (axios.isAxiosError(err)) {
    //         toast.info(err.response?.data);
    //       }
    //     });
    // },
  },
});
</script>

<style scoped></style>
