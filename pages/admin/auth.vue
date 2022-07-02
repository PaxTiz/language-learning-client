<template>
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
</template>

<script>
import Form from '@/components/auth/Form'

export default {
  name: 'AuthPage',

  components: {
    Form,
  },

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

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.form {
  padding: 2em;
  border-radius: var(--radius);
  background-color: var(--grey-extra-light);
}
</style>
