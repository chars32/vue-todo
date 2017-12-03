<template>
  <v-layout row>
    <v-flex xs12>
      <v-list three-line class="algo">
        <template v-for="(item, index) in itemsRefresh">
          <v-card :key="item.title" class="separacion">
            <v-list-tile avatar :class="{active: isActive}">
              <v-list-tile-avatar>
                <v-icon>event</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
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
import items from './../fakeDb/db'
import {eventBus} from './../main'

export default {
  data() {
    return {
      dialog: false,
      selected: [],
      items: items,
      title: 'Tasks Lists',
      idSelected: [],
      itemsDeleted: []
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
          this.idSelected.push(this.items[select].id)
        })
        this.idSelected.map(id => {
          for (let item of items) {
            if (item.id === id) {
              let currentItem = (items.indexOf(item))
              this.itemsDeleted.push(items.slice(currentItem, 1))
              items.splice(currentItem, 1)
            }
          }
        })
        // this.$router.push({name: 'complete', params:{itemsDeleted: this.itemsDeleted}})
        this.selected = []
        this.idSelected = []
        this.itemsDeleted = []
      }
    }
  },
  // Refrescamos la bd de los items por si hay cabios
  computed: {
    itemsRefresh: function () {
      return  this.items
    }
  },
  // Emitimos para cambiar el titulo del header
  created: function() {
      eventBus.$emit('cambiarTitulo', this.title)
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
.general {
  display: block;
}
.separacion {
  margin-bottom: 15px;
}
</style>