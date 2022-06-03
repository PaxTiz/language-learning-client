<template>
  <div>
    <h1>Languages</h1>

    <Table
      :headers="headers"
      :items="languages"
      :per-page="3"
      :total="7"
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
        key: 'name',
        title: 'name',
      },
      {
        key: 'code',
        title: 'code',
      },
    ],
  }),

  computed: {
    languages() {
      return [
        {
          id: 'B7446F29-D811-4F80-8D3F-F623016DA79C',
          name: 'Français',
          code: 'FRA',
        },
        {
          id: '4CAB8D6F-6853-459E-8EAF-A665B0B0E737',
          name: 'Anglais',
          code: 'ENG',
        },
        {
          id: '4B9B9485-01B2-425F-A5DE-02DEF8EE9518',
          name: 'Espagnol',
          code: 'ESP',
        },
        {
          id: '2430EF4A-AA66-4D83-972B-93ADB2F772D1',
          name: 'Italien',
          code: 'ITA',
        },
      ]
    },
  },
}
</script>