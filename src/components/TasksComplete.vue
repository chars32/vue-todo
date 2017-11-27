<template>
</template>

<script>
  import {eventBus} from './../main'

  export default {
    data() {
      return {
        title: 'Tasks Complete'
      }
    },
    created: function() {
      eventBus.$emit('cambiarTitulo', this.title)
    }
  }
</script>
