<template>
  <div>
    <h1 class="mb-xs">Create a new course</h1>
    <CourseForm
      :form="form"
      :update="false"
      :errors="errors"
      button="Create a new course"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import CourseForm from '@/components/courses/Form.vue'

export default {
  name: 'LanguageEdit',

  components: {
    CourseForm,
  },

  layout: 'admin',

  data: () => ({
    errors: [],
  }),

  computed: {
    form() {
      return {
        id: undefined,
        name: undefined,
        language_id: undefined,
      }
    },
  },

  methods: {
    async onSubmit(form) {
      await this.$store
        .dispatch('courses/create', form)
        .then(() => {
          this.$store.dispatch('alert/success', 'The course has been created')
          this.$router.push('/admin/courses')
        })
        .catch((e) => {
          this.errors = e.errors
        })
    },
  },
}
</script>
