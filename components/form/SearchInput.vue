<template>
  <div class="search-input">
    <span>
      <SearchIcon />
    </span>

    <input type="text" placeholder="Search" @keydown.enter="onInput" />
  </div>
</template>

<script>
import SearchIcon from '@/components/icons/Search'

export default {
  name: 'SearchInput',
  components: {
    SearchIcon,
  },

  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>