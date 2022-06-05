<template>
  <div>
    <h1 class="mb-xs">Posts</h1>

    <Table
      :headers="headers"
      :per-page="10"
      endpoint="https://jsonplaceholder.typicode.com/posts"
      paginable
    />
  </div>
</template>

<script>
import Table from '@/components/table/BasicTable'

export default {
  name: 'AdminLanguages',
  components: {
    Table,
  },
  layout: 'admin',

  data: () => ({
    headers: [
      {
        key: 'id',
        title: 'id',
      },
      {
        key: 'title',
        title: 'title',
        searchable: true,
      },
      {
        key: 'body',
        title: 'content',
      },
    ],
  }),
}
</script>