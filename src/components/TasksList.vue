<template>
  <v-layout row>
    <v-flex xs12>
      <v-list three-line class="algo">
        <template v-for="(todo, index) in todos">
          <v-card v-if="todo.completed === false" :key="todo.title" :id="todo.id" class="separacion animated fadeInLeft">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <v-icon>event</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="todo.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="todo.label"></v-list-tile-sub-title>
                <div class="fecha">
                  <v-list-tile-sub-title v-html="todo.date"></v-list-tile-sub-title>
                  <v-list-tile-sub-title v-html="todo.time"></v-list-tile-sub-title>
                </div>
              </v-list-tile-content>

              <v-list-tile
              @click="toggle(index)"
              >
                <v-icon
                  v-if="selected.indexOf(index) < 0"
                  >
                    check_box_outline_blank
                </v-icon>
                <v-icon
                  color="green darken-2"
                  v-else
                >
                  check_box
                </v-icon>
              </v-list-tile>

            </v-list-tile>
            </v-card>
        </template>
      </v-list>
    </v-flex>

    <div class="boton text-xs-right">
      <div v-if="selected.length === 0">
        <v-btn @click="btnAction" fab dark color="blue accent-3">
          <v-icon>add</v-icon>
        </v-btn>
      </div>
      <div v-else>     
        <v-btn @click="btnAction" fab dark color="green darken-3">
            <v-icon color="white">star</v-icon>
        </v-btn>
      </div>
    </div>
  </v-layout>
</template>

<script>
import todos from './../fakeDb/db'
import {eventBus} from './../main'

export default {
  data() {
    return {
      dialog: false,
      selected: [],
      todos,
      title: 'Tasks Lists',
    };
  },

  methods: {
    toggle(index) {
      const i = this.selected.indexOf(index);
      // Eliminamos el index del array selected
      // 
      if (i > -1) {
        this.selected.splice(i, 1);
      } else {
        // Agregamos a la lista selected al presionar el recuadro
        this.selected.push(index);
      }
    },

    btnAction() {
      if (this.selected.length === 0) {
        this.$router.push('/tasknew')
      } else {
        this.selected.map(select => {
          let id = todos[select].id
          todos[select].computed = true
          document.getElementById(id).setAttribute('class', 'animated fadeOutRight')
          setTimeout(() => {
            document.getElementById(id).setAttribute('class', 'ocultar')
          }, 500);
        })
        console.log(this.todos)
        // this.$router.push('/taskscomplete')
        this.selected = []
      }
    }
  },
  // Emitimos para cambiar el titulo del header
  created: function() {
      eventBus.$emit('cambiarTitulo', this.title)
      this.todos = todos
    }
};
</script>

<style scoped>
.algo {
  background-color: transparent;
}
.boton {
  height: 100vh;
  position: fixed;
  top: 85%;
  width: 90vw;
}
.fecha {
  display: flex;
  width: 100%;
}
.general {
  display: block;
}
.separacion {
  margin-bottom: 15px;
}

.ocultar {
  display: none;
}
</style>