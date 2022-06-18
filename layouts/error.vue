<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <a :href="link">Back to home page</a>
  </div>
</template>

<script>
export default {
  name: 'ErrorLayout',
  layout: 'admin',
  props: {
    error: {
      type: Object,
      required: true,
    },
  },

  computed: {
    link() {
      if (this.error.admin) {
        return '/admin'
      }
      return '/'
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2em;
  height: 100%;
}

.container a {
  color: var(--blue);
  font-weight: bold;
}
</style>