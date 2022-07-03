<template>
  <BasicForm>
    <div v-if="errors.length > 0" class="errors">
      <ul v-for="error in beautifulErrors('auth')" :key="error">
        <li>{{ error }}</li>
      </ul>
    </div>

    <label for="email" :class="{ error: $v.model.email.$error }">
      Email
      <input id="email" v-model="model.email" type="email" />

      <p v-if="!$v.model.email.required">Email is required</p>
      <p v-if="!$v.model.email.email">Email is not a valid email address</p>
    </label>

    <label for="password" :class="{ error: $v.model.password.$error }">
      Password
      <input id="password" v-model="model.password" type="password" />

      <p v-if="!$v.model.password.required">Password is required</p>
    </label>

    <button
      class="primary small"
      :class="{ disabled: $v.model.$anyError }"
      @click.prevent="submit"
    >
      {{ button }}
    </button>
  </BasicForm>
</template> 

<script>
/* eslint-disable import/order */
import BasicForm from '@/components/form/BasicForm.vue'
import formMixin from '@/mixins/form'
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'AuthForm',

  components: {
    BasicForm,
  },

  mixins: [formMixin],

  validations() {
    return {
      model: {
        email: { required, email },
        password: { required },
      },
    }
  },

  created() {
    this.model = Object.assign({}, this.form)
  },
}
</script>
