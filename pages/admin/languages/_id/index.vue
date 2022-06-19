<template>
  <div>
    <h1 class="mb-xs">Edit language {{ language.name }}</h1>

    <LanguageForm
      :form="form"
      :errors="errors"
      button="Update language"
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

  async asyncData({ error, route, store }) {
    try {
      const language = await store.dispatch(
        'languages/findById',
        route.params.id
      )
      return { language }
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
        id: this.language.id,
        name: this.language.name,
        code: this.language.code,
      }
    },
  },

  methods: {
    async onSubmit(form) {
      await this.$store
        .dispatch('languages/update', { id: this.form.id, form })
        .then(() => {
          this.$store.dispatch('alert/success', 'The language has been updated')
          this.$router.push('/admin/languages')
        })
        .catch((e) => {
          this.errors = e.errors
        })
    },
  },
}
</script>
