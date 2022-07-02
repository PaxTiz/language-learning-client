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
            <li @click="exportItems('csv')">Export selected as CSV</li>
            <li @click="exportItems('excel')">Export selected as Excel</li>
            <li @click="exportItems('json')">Export selected as JSON</li>
            <li @click="exportItems('csv', true)">Export all as CSV</li>
            <li @click="exportItems('excel', true)">Export all as Excel</li>
            <li @click="exportItems('json', true)">Export all as JSON</li>
            <li class="danger">Delete</li>
          </ul>
        </div>
      </div>

      <SearchInput
        v-if="searchable"
        :value="searchQuery"
        @input="searchItems"
      />
    </div>

    <div class="table mt-1">
      <div class="table-header">
        <span v-if="selectable" class="small-column">
          <input
            type="checkbox"
            :checked="
              !loading &&
              items.length > 0 &&
              selectedItems.length === items.length
            "
            @change="toggleSelectedItems"
          />
        </span>
        <span v-for="head in headers" :key="head.key">{{ head.title }}</span>
        <span>Actions</span>
      </div>

      <div v-if="loading" class="table-loader">
        <LoadingIndicator />
      </div>
      <template v-else-if="items.length > 0">
        <div
          v-for="item in items"
          :key="item.id"
          class="table-row"
          :class="{ selected: selectedItems.includes(item.id) }"
        >
          <span v-if="selectable" class="small-column">
            <input v-model="selectedItems" :value="item.id" type="checkbox" />
          </span>
          <span v-for="head in headers" :key="head.key">
            {{ valueOf(item, head.key) }}
          </span>
          <div class="actions">
            <a class="button primary" :href="openEditPage(item.id)">
              <PencilIcon />
            </a>
            <button class="danger" @click="openDeleteModal(item.id)">
              <TrashIcon />
            </button>
          </div>
        </div>
      </template>
      <div v-else class="table-row empty">
        <p>No results</p>
      </div>
    </div>

    <div v-if="paginable" class="pagination">
      <button
        class="primary icon"
        :class="{ disabled: currentPage === 1 }"
        @click="changePage(currentPage - 1)"
      >
        <ChevronLeft />
      </button>
      <button
        v-for="i in paginationPages"
        :key="i"
        :class="{ primary: currentPage === i }"
        @click="changePage(i)"
      >
        {{ i }}
      </button>
      <button
        class="primary icon"
        :class="{ disabled: currentPage === computePaginationPages }"
        @click="changePage(currentPage + 1)"
      >
        <ChevronRight />
      </button>
    </div>

    <DeleteModal
      title="Do you want to delete this item ?"
      :show="showDeleteModal"
      @ok="deleteItem"
      @cancel="closeDeleteModal"
    />
  </div>
</template>

<script>
import SearchInput from '@/components/form/SearchInput.vue'
import ChevronLeft from '@/components/icons/ChevronLeft'
import ChevronRight from '@/components/icons/ChevronRight'
import LoadingIndicator from '@/components/icons/LoadingIndicator'
import PencilIcon from '@/components/icons/Pencil'
import TrashIcon from '@/components/icons/Trash'
import DeleteModal from '@/components/modals/DeleteModal'

export default {
  name: 'BasicTable',
  components: {
    SearchInput,
    DeleteModal,
    PencilIcon,
    TrashIcon,
    LoadingIndicator,
    ChevronLeft,
    ChevronRight,
  },

  props: {
    headers: {
      type: Array,
      required: true,
    },
    paginable: {
      type: Boolean,
      default: () => true,
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
      default: () => 20,
    },
    endpoint: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    currentPage: 1,
    total: 0,
    items: [],
    selectedItems: [],
    loading: false,
    dropdownOpen: false,
    searchableFields: [],
    searchQuery: '',
    showDeleteModal: false,
    currentId: null,
  }),

  computed: {
    computePaginationPages() {
      return Math.ceil(this.total / this.perPage)
    },

    paginationPages() {
      const count = this.computePaginationPages
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
    this.searchableFields = this.headers
      .filter((e) => e.searchable)
      .map((e) => e.key)

    this.searchQuery = this.$route.query.query || ''
    const page = parseInt(this.$route.query.page) || 1
    await this.changePage(page)
  },

  methods: {
    valueOf(item, key) {
      return key.split('.').reduce((p, c) => (p && p[c]) || null, item)
    },

    async changePage(i) {
      this.total = await this.countData()
      if (this.total === 0) {
        this.items = []
      }

      const index = i > 0 && i <= this.computePaginationPages ? i : 1
      this.currentPage = index
      this.items = await this.fetchData()
      this.selectedItems = []

      const { page, query } = this.$route.query
      if (parseInt(page) !== index || query !== this.searchQuery) {
        this.$router.replace({
          path: this.$route.path,
          query: {
            page: index,
            query: this.searchQuery,
          },
        })
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

    async searchItems(query = '') {
      this.searchQuery = query
      await this.changePage(1)
    },

    fetchData() {
      const params = new URLSearchParams({
        offset: this.offset,
        limit: this.perPage,
        q: this.searchQuery,
      })
      return this.callApi(`${this.endpoint}?${params}`, [])
    },

    countData() {
      return this.callApi(`${this.endpoint}/count?name=${this.searchQuery}`, 0)
    },

    callApi(url, defaultValue) {
      this.loading = true
      return this.$axios
        .get(url)
        .catch(() => defaultValue)
        .finally(() => {
          this.loading = false
        })
    },

    openEditPage(id) {
      return `${this.$route.path}/${id}`
    },

    openDeleteModal(id) {
      this.currentId = id
      this.showDeleteModal = true
    },

    async deleteItem() {
      await this.$axios
        .delete(`${this.endpoint}/${this.currentId}`)
        .then(async () => {
          this.$store.dispatch('alert/success', 'The item has been deleted')
          this.closeDeleteModal()
          await this.searchItems()
        })
    },

    closeDeleteModal() {
      this.currentId = null
      this.showDeleteModal = false
    },

    exportItems(format, all) {
      const params = new URLSearchParams({ format })
      if (all) {
        params.set('all', true)
      } else {
        this.selectedItems.forEach((e) => params.append('languages[]', e))
      }

      window.open(`${this.endpoint}/export?${params}`, '_blank')
      this.dropdownOpen = false
      this.selectedItems = []
    },
  },
}
</script>
