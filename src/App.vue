<template>
  <v-app>
    <app-header></app-header>
  </v-app>
</template>

<script>
  import Header from './components/Header.vue'

  export default {
    components: {
      appHeader: Header
    }
  }
</script>
