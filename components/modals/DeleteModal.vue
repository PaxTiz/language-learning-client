<template>
  <div v-if="show" class="modal-container">
    <div class="modal">
      <div class="modal-heading">
        <h2 class="modal-title">{{ title }}</h2>
        <p v-if="subtitle">{{ subtitle }}</p>
      </div>

      <div class="modal-actions">
        <button class="primary" @click="confirm">{{ yes }}</button>
        <button class="danger" @click="cancel">{{ no }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteModal',

  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: () => null,
    },
    yes: {
      type: String,
      default: () => 'Yes, I want',
    },
    no: {
      type: String,
      default: () => 'No, cancel this action',
    },
  },

  methods: {
    confirm() {
      this.$emit('ok')
    },
    cancel() {
      this.$emit('cancel')
    },
  },
}
</script>