<template>
  <div class="loading-overlay">
    <div v-if="loading" class="loader">
      <LoadingIndicator />
    </div>
    <slot v-else />
  </div>
</template>

<script>
import LoadingIndicator from '@/components/icons/LoadingIndicator.vue'

export default {
  name: 'LoadingOverlay',
  components: { LoadingIndicator },

  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped>
.loading-overlay {
  position: relative;
  width: 100%;
  height: 100%;
}
.loader {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loader svg {
  width: 48px;
  height: 48px;
}
</style>