<template>
  <div>
    <h1>Me</h1>
    <select v-model="selectedTheme">
      <option v-for="theme in themes" :key="theme.value" :value="theme.value">
        {{ theme.label }}
      </option>
    </select>
    <button class="primary mt-1" @click="saveTheme">Save</button>
  </div>
</template>

<script>
export default {
  name: 'MePage',
  layout: 'admin',

  data: () => ({
    selectedTheme: null,
  }),

  computed: {
    themes() {
      return [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ]
    },
  },

  created() {
    this.selectedTheme = this.$cookies.get('theme') || 'light'
  },

  methods: {
    saveTheme() {
      this.$store.dispatch('cookies/set', {
        key: 'theme',
        value: this.selectedTheme,
      })
      this.$store.dispatch('alert/success', 'The theme has been saved')
      this.$router.go(0)
    },
  },
}
</script>
