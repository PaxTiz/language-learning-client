<template>
  <div class="table-container">
    <div class="table-actions">
      <div class="batch-actions">
        <div class="dropdown-button">
          <button
            class="primary"
            :class="{ disabled: selectedItems.length === 0 }"
            @click="toggleDropdownButton"
          >
            Batch actions ({{ selectedItems.length }} items)
          </button>
          <ul class="dropdown-items" :class="{ hidden: !dropdownOpen }">
            <li>Export selected as CSV</li>
            <li>Export selected as Excel</li>
            <li>Export selected as JSON</li>
            <li>Export all as CSV</li>
            <li>Export all as Excel</li>
            <li>Export all as JSON</li>
            <li class="danger">Delete</li>
          </ul>
        </div>
      </div>
      <SearchInput v-if="searchable" />
    </div>

    <div class="table mt-1">
      <div class="table-header">
        <span v-if="selectable" class="small-column">
          <input type="checkbox" @change="toggleSelectedItems" />
        </span>
        <span v-for="head in headers" :key="head.key">{{ head.title }}</span>
        <span>Actions</span>
      </div>

      <div v-if="loading" class="table-loader">{{ loadingText }}</div>

      <div
        v-for="item in items"
        :key="item.id"
        class="table-row"
        :class="{ selected: selectedItems.includes(item.id) }"
      >
        <span v-if="selectable" class="small-column">
          <input
            type="checkbox"
            :checked="selectedItems.includes(item.id)"
            @change="selectItem(item.id)"
          />
        </span>
        <span v-for="head in headers" :key="head.key">
          {{ item[head.key] }}
        </span>
        <div class="actions">
          <button class="primary" @click="openEditPage(item.id)">
            {{ editText }}
          </button>
          <button class="danger" @click="openDeleteModal(item.id)">
            {{ deleteText }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="paginable" class="pagination">
      <button
        class="primary"
        :class="{ disabled: currentPage === 1 }"
        @click="changePage(currentPage - 1)"
      >
        &lt;
      </button>
      <button
        v-for="i in countPages"
        :key="i"
        :class="{ primary: currentPage === i }"
        @click="changePage(i)"
      >
        {{ i }}
      </button>
      <button
        class="primary"
        :class="{ disabled: currentPage === computeCountPages }"
        @click="changePage(currentPage + 1)"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script>
import SearchInput from '@/components/form/SearchInput.vue'

export default {
  name: 'BasicTable',
  components: {
    SearchInput,
  },

  props: {
    headers: {
      type: Array,
      required: true,
    },
    paginable: {
      type: Boolean,
      default: () => false,
    },
    searchable: {
      type: Boolean,
      default: () => true,
    },
    selectable: {
      type: Boolean,
      default: () => true,
    },
    perPage: {
      type: Number,
      default: () => null,
    },
    endpoint: {
      type: String,
      required: true,
    },
    editText: {
      type: String,
      default: () => 'Edit',
    },
    deleteText: {
      type: String,
      default: () => 'Delete',
    },
    searchText: {
      type: String,
      default: () => 'Search...',
    },
    loadingText: {
      type: String,
      default: () => 'Loading...',
    },
  },

  data: () => ({
    currentPage: 1,
    total: 0,
    items: [],
    selectedItems: [],
    loading: false,
    dropdownOpen: false,
  }),

  computed: {
    computeCountPages() {
      return Math.ceil(this.total / this.perPage)
    },

    countPages() {
      const count = this.computeCountPages
      if (count >= 10) {
        const array = [1, 2, 3, '...']
        for (let i = 2; i >= 0; i--) array.push(count - i)
        return array
      }

      return count
    },

    offset() {
      return this.perPage * (this.currentPage - 1)
    },
  },

  async created() {
    this.items = await this.fetchData()

    await this.fetchData(false).then((items) => {
      this.total = items.length
    })
  },

  methods: {
    async changePage(i) {
      if (i >= 1 && i <= this.computeCountPages) {
        this.currentPage = i
        this.items = await this.fetchData()
      }
    },

    selectItem(value) {
      if (this.selectedItems.includes(value)) {
        this.selectedItems = this.selectedItems.filter((e) => e !== value)
      } else {
        this.selectedItems.push(value)
      }
    },

    toggleSelectedItems() {
      if (this.selectedItems.length === this.items.length) {
        this.selectedItems = []
      } else if (this.selectedItems.length >= 0) {
        this.selectedItems = this.items.map((e) => e.id)
      } else {
        this.selectedItems = []
      }
    },

    toggleDropdownButton() {
      if (this.selectedItems.length > 0) {
        this.dropdownOpen = !this.dropdownOpen
      }
    },

    fetchData(paginate = true) {
      const url = paginate
        ? `${this.endpoint}?_start=${this.offset}&_limit=${this.perPage}`
        : this.endpoint
      return this.callApi(url)
    },

    callApi(url) {
      this.loading = true
      return fetch(url)
        .then((res) => res.json())
        .catch(() => [])
        .finally(() => {
          this.loading = false
        })
    },

    openEditPage(id) {
      this.$router.push({ path: `${this.$route.path}/${id}/edit` })
    },

    openDeleteModal(id) {},
  },
}
</script>