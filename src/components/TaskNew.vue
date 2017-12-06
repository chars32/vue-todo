<template>
  <v-form>
    <v-text-field
      label="Title"
      v-model="taskTitle"
      :error-messages="titleErrors"      
      @blur="$v.taskTitle.$touch()"
      required
    ></v-text-field>
    <v-text-field
      label="Description"
      v-model="taskDescription"
      :error-messages="descriptionErrors"
      @blur="$v.taskDescription.$touch()"
      required
    ></v-text-field>
    <v-select
      label="Label"
      v-model="select"
      :items="items"
      :error-messages="selectErrors"
     
      @blur="$v.select.$touch()"
      required
    ></v-select>
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
            label="Time"
            v-model="time"
            prepend-icon="access_time"
            readonly
          ></v-text-field>
          <v-time-picker v-model="time" autosave></v-time-picker>
        </v-menu>
      </v-flex>
      <!-- end timepicker -->
    </v-layout>
    <div class="text-xs-right">
      <v-btn @click="submit" fab dark color="green darken-3">
        <v-icon>save</v-icon>
      </v-btn>
    </div>
    <!-- <v-btn @click="clear">clear</v-btn> -->
  </v-form>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import axios from 'axios'

  // import todos from './../fakeDb/db.json'
  import { eventBus } from "./../main"; 

  export default {
    mixins: [validationMixin],
    validations: {
      taskTitle: { required },
      taskDescription: { required },
      select: { required },
      // checkbox: { required }
    },
    data () {
      return {
        title: "Task New",
        dateFormatted: null,
        menu: false,
        date: null,
        time: null,
        menu2: false,
        //----
        completed: false,
        taskTitle: '',
        taskDescription: '',
        select: null,
        items: [
          'Hobby',
          'Work',
          'Shopping',
          'Travel'
        ],
        
        // checkbox: false
      }
    },
    created: function() {
      eventBus.$emit("cambiarTitulo", this.title);
    },
    methods: {
      submit () {
        this.$v.$touch()
        if(this.taskTitle && this.taskDescription && this.select && this.date && this.time){
          console.log('si envia')
          axios.post('http://localhost:3000/data', {
            id: this.id,
            title: this.taskTitle,
            description: this.taskDescription,
            label: this.select,
            date: this.date,
            time: this.time,
            completed: this.completed
          })
          .then((response) => {
            console.log(response)
          })
          .catch(e => {
            this.errors.push(e)
          })
        }else {
          console.log('no se envia')
        }
      },
      formatDate (date) {
        if (!date) {
          return null
      }

      const [day, month, year] = date.split('-')
      return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) {
          return null
      }

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
    },
    computed: {
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('This field is required')
        return errors
      },
      titleErrors () {
        const errors = []
        if (!this.$v.taskTitle.$dirty) return errors
        !this.$v.taskTitle.required && errors.push('This field is required.')
        return errors
      },
      descriptionErrors () {
        const errors = []
        if (!this.$v.taskDescription.$dirty) return errors
        !this.$v.taskDescription.required && errors.push('This field is required')
        return errors
      }
    }
  }
</script>