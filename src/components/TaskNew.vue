<template>
  <h1>Task New</h1>
</template>

<script>
  import {eventBus} from './../main'

  export default {
    data() {
      return {
        title: 'Task New'
      }
    },
    created: function() {
      eventBus.$emit('cambiarTitulo', this.title)
    }
  }
</script>