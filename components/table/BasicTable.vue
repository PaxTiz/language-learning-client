<template>
  <div class="table-container">
    <SearchInput v-if="searchable" />

    <div class="table mt-1">
      <div class="table-header">
        <span v-for="head in headers" :key="head.key">{{ head.title }}</span>
        <span>Actions</span>
      </div>
      <div v-for="item in items" :key="item.id" class="table-row">
        <span v-for="head in headers" :key="head.key">
          {{ item[head.key] }}
        </span>
        <div class="actions">
          <button class="primary" @click="openEditPage(item.id)">Edit</button>
          <button class="danger" @click="openDeleteModal(item.id)">
            Delete
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
    perPage: {
      type: Number,
      default: () => null,
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

    fetchData(paginate = true) {
      const url = paginate
        ? `${this.endpoint}?_start=${this.offset}&_limit=${this.perPage}`
        : this.endpoint
      return this.callApi(url)
    },

    callApi(url) {
      return fetch(url).then((res) => res.json())
    },

    openEditPage(id) {
      this.$router.push({ path: `${this.$route.path}/${id}/edit` })
    },

    openDeleteModal(id) {},
  },
}
</script>