<template>
  <v-card width="800" class="mx-auto" :border="false">
    <v-card-title> Welcome To A-maze-ing Game </v-card-title>
    <v-card-subtitle> Please enter your name to register </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field
            v-model="name"
            placeholder="Enter your name"
            type="text"
            @keyup.enter="registerFunc(name)"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-col align="center">
        <v-btn color="success" variant="flat" @click="registerFunc(name)"
          >Register</v-btn
        >
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useToast } from 'vue-toastification';
import axios, { AxiosError } from 'axios';
import { usePlayerStore } from '@/stores/playerStore';
import { mapActions } from 'pinia';
import { mapState } from 'pinia';
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
  mounted() {
    if (this.isRegistered) {
      this.$router.push({ name: 'mazelist' });
    }
  },
  computed: {
    ...mapState(usePlayerStore, ['isRegistered']),
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
          this.$router.push({ name: 'mazelist' });
          toast.success('Registration successfull');
        })
        .catch((err: Error | AxiosError) => {
          if (axios.isAxiosError(err)) {
            this.setIsRegistered(true);
            toast.error(err.response?.data);
          }
        });
    },
  },
});
</script>

<style scoped></style>
