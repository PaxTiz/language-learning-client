<template>
  <div>
    <PageHeader title="Languages" button="Create" to="/languages/create" />

    <Table :headers="headers" :endpoint="languagesEndpoint" />
  </div>
</template>

<script>
import PageHeader from '@/components/shared/PageHeader'
import Table from '@/components/table/BasicTable'
import constants from '~/utils/constants'

export default {
  name: 'AdminLanguages',
  components: {
    Table,
    PageHeader,
  },
  layout: 'admin',

  data: () => ({
    headers: [
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