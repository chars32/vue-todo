<template>
  <v-app>
    <app-header></app-header>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  components: {
    appHeader: Header
  }
};
</script>
