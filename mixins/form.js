import { validationMixin } from 'vuelidate'
import errors from '@/utils/errors'

export default {
    mixins: [validationMixin],

    props: {
        form: {
          type: Object,
          required: true,
        },
        errors: {
          type: Array,
          default: () => [],
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

    methods: {
        beautifulErrors (prefix) {
            return this.errors.map(e => {
                if (errors[prefix]) return errors[prefix][e.msg]
                return e
            })
        },

        submit() {
            this.$v.model.$reset()
            this.$v.model.$touch()
            if (!this.$v.$anyError) {
              this.$emit('submit', this.model)
            }
        },
    },
}