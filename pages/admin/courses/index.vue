<template>
  <div>
    <PageHeader
      title="Courses"
      button="Create a new course"
      to="/courses/create"
    />

    <Table :headers="headers" :endpoint="coursesEndpoint" />
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
        key: 'id',
        title: 'id',
      },
      {
        key: 'name',
        title: 'Name',
        searchable: true,
      },
      {
        key: 'language.name',
        title: 'Language',
      },
    ],
  }),

  computed: {
    coursesEndpoint() {
      return constants.endpoints.courses
    },
  },
}
</script>