import errors from '@/utils/errors'

export default {
    methods: {
        beautifulErrors (prefix) {
            return this.errors.map(e => errors[prefix][e.msg])
        }
    }
}