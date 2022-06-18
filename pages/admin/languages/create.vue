<template>
  <div>
    <h1 class="mb-xs">Create a new language</h1>
    <LanguageForm
      :form="form"
      :update="false"
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
      await this.$store.dispatch('languages/create', form).then(() => {
        this.$router.push('/admin/languages')
      })
    },
  },
}
</script>
