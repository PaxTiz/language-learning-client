<template>
  <div>
    <h1 class="mb-xs">Create a new language</h1>
    <LanguageForm
      :form="form"
      :update="false"
      :errors="errors"
      button="Create a new language"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import LanguageForm from '@/components/languages/Form.vue'

export default {
  name: 'LanguageEdit',

  components: {
    LanguageForm,
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
        code: undefined,
      }
    },
  },

  methods: {
    async onSubmit(form) {
      await this.$store
        .dispatch('languages/create', form)
        .then(() => {
          this.$store.dispatch('alert/success', 'The language has been created')
          this.$router.push('/admin/languages')
        })
        .catch((e) => {
          this.errors = e.errors
        })
    },
  },
}
</script>
