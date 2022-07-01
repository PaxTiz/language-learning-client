<template>
  <div v-if="isOpen" class="spotlight-page-container">
    <div class="spotlight-container">
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
        this.items = []
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

<style scoped>
.spotlight-page-container {
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
}

.spotlight-container {
  width: 500px;
  height: auto;
  padding: 1em;
  border-radius: var(--radius);
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: var(--white);
  box-shadow: 0 25px 60px 10px rgba(0, 0, 0, 0.3);
}

ul {
  padding: 0;
  margin: 1em 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.75em;
  max-height: 300px;
  overflow-y: scroll;
}

ul li {
  list-style: none;
}

ul li a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  color: var(--black);
}
p {
  margin-bottom: 0;
}

.badge {
  padding: 0.2em 0.5em;
  text-transform: uppercase;
  font-size: 0.8em;
  color: var(--white);
  border-radius: var(--radius);
}
</style>