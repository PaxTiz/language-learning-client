<template>
  <div>
    <h1 class="mb-xs">Languages</h1>

    <Table :headers="headers" :endpoint="languagesEndpoint" paginable />
  </div>
</template>

<script>
import Table from '@/components/table/BasicTable'
import constants from '~/utils/constants'

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
        key: 'name',
        title: 'Name',
        searchable: true,
      },
      {
        key: 'code',
        title: 'Code',
      },
    ],
  }),

  computed: {
    languagesEndpoint() {
      return constants.endpoints.languages
    },
  },
}
</script>