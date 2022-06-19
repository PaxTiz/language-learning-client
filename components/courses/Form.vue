<template>
  <BasicForm>
    <div v-if="errors.length > 0" class="errors">
      <ul v-for="error in beautifulErrors('courses')" :key="error">
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
        ID can't be empty when updating a course
      </p>
    </label>

    <div class="row">
      <label for="name" :class="{ error: $v.model.name.$error }">
        Name
        <input id="name" v-model="model.name" type="text" />

        <p v-if="!$v.model.name.required">Name is required</p>
        <p v-else-if="!$v.model.name.minLength">Name can't be empty</p>
      </label>

      <label for="language_id" :class="{ error: $v.model.language_id.$error }">
        Language
        <select v-model="model.language_id">
          <option value="">Please select an option</option>
          <option
            v-for="language in languages"
            :key="language.value"
            :value="language.value"
          >
            {{ language.text }}
          </option>
        </select>

        <p v-if="!$v.model.language_id.required">Language is required</p>
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
import { mapGetters } from 'vuex'
import { minLength, required } from 'vuelidate/lib/validators'
import BasicForm from '@/components/form/BasicForm.vue'
import formMixin from '@/mixins/form'
import { requiredIfUpdate } from '@/utils/validations'

export default {
  name: 'CourseForm',

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
        language_id: {
          required,
        },
      },
    }
  },

  computed: {
    ...mapGetters({
      languages: 'languages/languagesOptions',
    }),
  },

  async created() {
    this.model = Object.assign({}, this.form)
    await this.$store.dispatch('languages/findAll')
  },
}
</script>
