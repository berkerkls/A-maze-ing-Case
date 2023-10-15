<template>
  <div class="container">
    <div class="form">
      <div>
        <h1>Welcome To A-maze-ing Game</h1>
        <h3 style="text-align: center">Please enter your name to register</h3>
      </div>
      <div>
        <input
          v-model="name"
          placeholder="Enter Your Name"
          type="text"
          class="input"
          @keyup.enter="registerFunc(name)"
        />
      </div>
      <div>
        <button class="button" @click="registerFunc(name)">Register</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useToast } from 'vue-toastification';
import axios, { AxiosError } from 'axios';
import { usePlayerStore } from '@/stores/playerStore';
import { mapActions } from 'pinia';
const toast = useToast();
import { PlayerService } from '@/services/PlayerService';
import { RegisterPlayerQuery } from '@/models/RegisterPlayerQuery';

export default defineComponent({
  name: 'RegisterView',
  data() {
    return {
      name: '',
      playerService: new PlayerService(),
    };
  },
  methods: {
    ...mapActions(usePlayerStore, ['setIsRegistered']),
    registerFunc(name: string) {
      let query = new RegisterPlayerQuery();
      query.name = name;
      this.playerService
        .registerPlayer(query)
        .then((res: unknown) => {
          this.setIsRegistered(true);
          this.$router.push({ name: 'maze' });
          toast.success('Registration successfull');
        })
        .catch((err: Error | AxiosError) => {
          if (axios.isAxiosError(err)) {
            toast.error(err.response?.data);
          }
        });
    },
  },
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input {
  border: 1px solid #000;
  padding: 10px 40px;
  border-radius: 5px;
}
.button {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #4bb543;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
</style>
