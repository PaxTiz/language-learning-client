<template>
  <div
    v-if="isOpen"
    ref="spotlight-page-container"
    class="spotlight-page-container"
  >
    <div ref="spotlight-container" class="spotlight-container">
      <SearchInput :focus="true" @input="search" />
      <ul v-if="items.length > 0">
        <li v-for="item in items" :key="item.id">
          <a :href="`/admin${item.target}`">
            <span>{{ item.title }}</span>
            <span class="badge" :style="badge(item)">{{ item.category }}</span>
          </a>
        </li>
      </ul>
      <p v-else>No results..</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable import/order */
import SearchInput from '@/components/form/SearchInput'
import { mapGetters } from 'vuex'

export default {
  name: 'BasicSpotlight',

  components: {
    SearchInput,
  },

  data: () => ({
    isOpen: false,
  }),

  computed: {
    ...mapGetters({
      items: 'spotlight/items',
    }),
  },

  watch: {
    isOpen() {
      this.$nextTick(() => {
        const container = this.$refs['spotlight-container']
        if (container) {
          container.parentElement.addEventListener('click', (e) => {
            if (e.target === this.$refs['spotlight-page-container']) {
              this.toggleSpotlight()
            }
          })
        }
      })
    },
  },

  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'k' && e.metaKey) {
        this.toggleSpotlight()
      }
    })
  },

  methods: {
    toggleSpotlight() {
      if (this.isOpen) {
        this.isOpen = false
        this.$store.dispatch('spotlight/close')
      } else {
        this.isOpen = true
      }
    },

    badge(item) {
      return `background-color: var(--${item.categoryColor})`
    },

    search(value) {
      this.$store.dispatch('spotlight/search', value)
    },
  },
}
</script>
