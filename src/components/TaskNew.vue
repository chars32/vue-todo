<template>
  <v-form v-model="valid">
    <v-text-field
      label="Title"
      v-model="tasktitle"
      required
    ></v-text-field>
    <v-text-field
      label="Description"
      v-model="taskdescription"
      required
    ></v-text-field>
    
    <v-layout row wrap>
      <!-- datepicker -->
      <v-flex xs6 sm5>
        <v-menu
          lazy
          :close-on-content-click="false"
          v-model="menu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            label="Date"
            v-model="dateFormatted"
            prepend-icon="event"
            @blur="date = parseDate(dateFormatted)"
          ></v-text-field>
          <v-date-picker v-model="date" @input="dateFormatted = formatDate($event)" no-title scrollable actions>
            <template slot-scope="{ save, cancel }">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                <v-btn flat color="primary" @click="save">OK</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <!-- end datepicker -->
      <!-- timepicker -->
      <v-flex xs6 sm5>
        <v-menu
          lazy
          :close-on-content-click="false"
          v-model="menu2"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            label="Picker in menu"
            v-model="time"
            prepend-icon="access_time"
            readonly
          ></v-text-field>
          <v-time-picker v-model="time" autosave></v-time-picker>
        </v-menu>
      </v-flex>
      <!-- end timepicker -->
      <!-- labelspicker -->
       <v-flex xs12 sm5>
        <v-list>
          <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
            <v-list-tile slot="item" @click="">
              <v-list-tile-action>
                <v-icon>{{ item.action }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.title" @click="algo(subItem.title)">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-flex>
      <!-- end labelspicker -->
    </v-layout>
    
  </v-form>
</template>

<script>
import { eventBus } from "./../main";

export default {
  data() {
    return {
      title: "Task New",
      valid: false,
      tasktitle: "",
      taskdescription: "",
      date: null,
      dateFormatted: null,
      menu: false,
      time: null,
      menu2: false,
      modal2: false,
      items: [
        {
          action: 'local_offer',
          title: 'Label',
          items: [
            { title: 'Hobby' },
            { title: 'Travel'},
            { title: 'Shopping'}
          ]
        }
      ]
    };
  },
  created: function() {
    eventBus.$emit("cambiarTitulo", this.title);
  },
  methods: {
    algo (eso) {
      console.log(eso)
    },
    formatDate (date) {
      if (!date) {
        return null
      }

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) {
        return null
      }

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
};
</script>