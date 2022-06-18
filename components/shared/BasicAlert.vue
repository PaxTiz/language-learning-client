<template>
  <div v-if="alert" class="alert" :class="alert.type">
    <span>{{ alert.text }}</span>
    <span @click="cleanAlert">&times;</span>
  </div>
</template>

<script>
export default {
  name: 'BasicAlert',

  computed: {
    alert() {
      return this.$store.getters['alert/alert']
    },
  },

  methods: {
    cleanAlert() {
      return this.$store.dispatch('alert/set', null)
    },
  },
}
</script>
