<template>
  <div class="search-input">
    <span>
      <SearchIcon />
    </span>

    <input
      type="text"
      placeholder="Search"
      :value="value"
      @keydown.enter="onInput"
    />
  </div>
</template>

<script>
import SearchIcon from '@/components/icons/Search'

export default {
  name: 'SearchInput',
  components: {
    SearchIcon,
  },

  props: {
    value: {
      type: String,
      default: () => '',
    },
  },

  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>