<template>
  <div class="container">
    <div>
      <h1>Welcome To A-maze-ing Game</h1>
      <h3 style="text-align: center">Please enter your name to register</h3>
    </div>
    <div>
      <input v-model="name" type="text" class="input" />
    </div>
    <div>
      <button class="button" @click="registerFunc(name)">Register</button>
    </div>
  </div>
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

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vh;
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
