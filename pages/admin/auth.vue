<template>
  <div class="auth" :class="{ dark: currentTheme === 'dark' }">
    <div class="container">
      <div class="form">
        <Form
          :form="form"
          :update="false"
          :errors="errors"
          button="Login"
          @submit="onSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Form from '@/components/auth/Form'
import theme from '@/mixins/theme'

export default {
  name: 'AuthPage',

  components: {
    Form,
  },
  mixins: [theme],

  data: () => ({
    errors: [],
  }),

  computed: {
    form() {
      return {
        email: undefined,
        password: undefined,
      }
    },
  },

  created() {
    this.$store.commit('user/set', { property: 'user', value: null })
  },

  methods: {
    async onSubmit(form) {
      await this.$store
        .dispatch('user/auth', form)
        .then(() => {
          this.$store.dispatch(
            'alert/success',
            "You've been logged successfully"
          )
          this.$router.push('/admin')
        })
        .catch((e) => {
          this.errors = e.errors
        })
    },
  },
}
</script>
