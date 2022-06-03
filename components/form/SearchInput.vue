<template>
  <div class="search-input mt-2">
    <span>
      <SearchIcon />
    </span>

    <input type="text" placeholder="Search" />
  </div>
</template>

<script>
import SearchIcon from '@/components/icons/Search'

export default {
  name: 'SearchInput',
  components: {
    SearchIcon,
  },
}
</script>