<template>
  <v-layout wrap>
    <!-- menu lateral -->
      <v-layout>
        <v-flex xs12>
          <v-card>
            <v-toolbar color="white">
              <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
              <h3>{{ title }}</h3>
            </v-toolbar>
          </v-card>
        </v-flex>
      </v-layout>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      light
      absolute
    >
      <v-list class="pa-3">
        <h1 class="text-xs-center">Todo List</h1>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile class="pt-1" v-for="item in items" :key="item.title" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!-- termina menu lateral -->
  </v-layout>
</template>

<script>
import {eventBus} from './../main'

export default {
  data() {
    return {
      title: 'Tasks Listss',
      drawer: null,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ],
    };
  },
  // Escuchamos para cambiar el titulo
  created: function() {
    eventBus.$on('cambiarTitulo', (titulo) => {
      this.title = titulo;
    })
  }
};
</script>