<template>
  <BasicForm>
    <div class="errors">
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
        <p v-else-if="!$v.model.name.minLength">Name can't be empty</p>
      </label>

      <label for="code" :class="{ error: $v.model.code.$error }">
        Code
        <input id="code" v-model="model.code" type="text" />

        <p v-if="!$v.model.code.required">Code is required</p>
        <p v-else-if="!$v.model.code.minLength">Code must be 3 characters</p>
        <p v-else-if="!$v.model.code.maxLength">Code must be 3 characters</p>
      </label>
    </div>

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
import { validationMixin } from 'vuelidate'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'LanguageForm',

  components: {
    BasicForm,
  },

  mixins: [validationMixin, formMixin],

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

  props: {
    form: {
      type: Object,
      required: true,
    },
    errors: {
      type: Array,
      required: true,
    },
    update: {
      type: Boolean,
      default: () => true,
    },
    button: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    model: null,
  }),

  watch: {
    model() {
      this.$v.model.$reset()
    },
  },

  created() {
    this.model = Object.assign({}, this.form)
  },

  methods: {
    submit() {
      this.$v.model.$reset()
      this.$v.model.$touch()
      if (!this.$v.$anyError) {
        this.$emit('submit', this.model)
      }
    },
  },
}
</script>
