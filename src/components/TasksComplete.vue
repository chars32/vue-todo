<template>
  <div>
    <h1 class="animated fadeInLeft">Probando</h1>
  </div>
</template>

<script>
  import {eventBus} from './../main'

  export default {
    props: ['itemsillos'],
    data() {
      return {
        title: 'Tasks Completed',
        status: false
        // algo: this.$route.params
      }
    },
    created: function() {
      eventBus.$emit('cambiarTitulo', this.title)
      this.status = true
    }
  }
</script>

<style>
</style>

