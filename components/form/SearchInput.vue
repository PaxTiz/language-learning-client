<template>
  <div class="search-input">
    <span>
      <SearchIcon />
    </span>

    <input
      ref="input"
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

    focus: {
      type: Boolean,
      default: () => false,
    },
  },

  mounted() {
    if (this.focus) {
      this.$refs.input.focus()
    }
  },

  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>