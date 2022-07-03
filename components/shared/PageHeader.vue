<template>
  <div class="page-header">
    <h1>{{ title }}</h1>
    <a v-if="button" class="button primary" :href="link">
      {{ button }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',

  props: {
    title: {
      type: String,
      required: true,
    },
    button: {
      type: String,
      default: () => null,
    },
    to: {
      type: String,
      default: () => null,
    },
  },

  computed: {
    link() {
      let link = this.to
      if (link.startsWith('/')) link = link.slice(1)
      return `/admin/${link}`
    },
  },
}
</script>
