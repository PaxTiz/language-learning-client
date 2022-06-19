<template>
  <div>
    <h1 class="mb-xs">Edit course {{ course.name }}</h1>

    <CourseForm
      :form="form"
      :errors="errors"
      button="Update course"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import CourseForm from '@/components/courses/Form.vue'

export default {
  name: 'CourseEdit',

  components: {
    CourseForm,
  },

  layout: 'admin',

  async asyncData({ error, route, store }) {
    try {
      const course = await store.dispatch('courses/findById', route.params.id)
      return { course }
    } catch (e) {
      return error({ statusCode: e.response.status, admin: true })
    }
  },

  data: () => ({
    errors: [],
  }),

  computed: {
    form() {
      return {
        id: this.course.id,
        name: this.course.name,
        language_id: this.course.language_id,
      }
    },
  },

  methods: {
    async onSubmit(form) {
      await this.$store
        .dispatch('courses/update', { id: this.form.id, form })
        .then(() => {
          this.$store.dispatch('alert/success', 'The course has been updated')
          this.$router.push('/admin/courses')
        })
        .catch((e) => {
          this.errors = e.errors
        })
    },
  },
}
</script>
