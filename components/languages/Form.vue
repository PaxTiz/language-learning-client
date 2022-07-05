<template>
  <BasicForm>
    <div v-if="errors.length > 0" class="errors">
      <ul v-for="error in beautifulErrors('languages')" :key="error">
        <li>{{ error }}</li>
      </ul>
    </div>

    <label for="id" :class="{ error: $v.model.id.$error }">
      ID
      <input
        id="id"
        v-model="model.id"
        type="text"
        placeholder="Automatically generated"
        disabled
      />

      <p v-if="!$v.model.id.requiredIfUpdate">
        ID can't be empty when updating a language
      </p>
    </label>

    <div class="row">
      <label for="name" :class="{ error: $v.model.name.$error }">
        Name
        <input id="name" v-model="model.name" type="text" />

        <p v-if="!$v.model.name.required">Name is required</p>
        <p v-else-if="!$v.model.name.minLength">Name is too short</p>
      </label>

      <label for="code" :class="{ error: $v.model.code.$error }">
        Code
        <input id="code" v-model="model.code" type="text" />

        <p v-if="!$v.model.code.required">Code is required</p>
        <p v-else-if="!$v.model.code.minLength">Code must be 3 characters</p>
        <p v-else-if="!$v.model.code.maxLength">Code must be 3 characters</p>
      </label>
    </div>

    <label for="flag">
      Flag
      <input id="flag" type="file" @input="onSelectFile" />
    </label>
    <img v-if="model.id" :src="flag" />

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
import { requiredIfUpdate } from '@/utils/validations'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'LanguageForm',

  components: {
    BasicForm,
  },

  mixins: [formMixin],

  validations() {
    return {
      model: {
        id: {
          requiredIfUpdate: requiredIfUpdate(this.update),
        },
        name: {
          required,
          minLength: minLength(3),
        },
        code: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(3),
        },
      },
    }
  },

  computed: {
    flag() {
      return `${process.env.NUXT_ENV_API_URL}/languages/${this.model.id}/flag`
    },
  },

  created() {
    this.model = Object.assign({}, this.form)
  },

  methods: {
    onSelectFile(e) {
      if (e.target.files && e.target.files.length === 1) {
        this.model.flag = e.target.files[0]
      }
    },
  },
}
</script>

<style scoped>
img {
  width: min-content;
  max-width: 100%;
}
</style>
