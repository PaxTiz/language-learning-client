<template>
  <LoadingOverlay :loading="isLoading">
    <template v-if="!isLoading">
      <div class="form">
        <slot />
      </div>
    </template>
  </LoadingOverlay>
</template> 

<script>
import LoadingOverlay from '@/components/shared/LoadingOverlay'

export default {
  name: 'BasicForm',

  components: {
    LoadingOverlay,
  },

  data: () => ({
    isLoading: false,
  }),

  created() {
    this.isLoading = true
  },

  mounted() {
    this.isLoading = false
  },
}
</script>

<style scoped>
/deep/ .loader {
  height: 300px;
}
/deep/ .form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/deep/ .form label input,
/deep/ .form label select {
  margin-top: 8px;
}

/deep/ .form .row {
  display: flex;
  gap: 2em;
}
@media screen and (max-width: 800px) {
  /deep/ .form .row {
    flex-direction: column;
  }
}
/deep/ .form .row > * {
  width: 100%;
}

/deep/ .form .error {
  color: var(--red);
}
/deep/ .form .error input,
/deep/ .form .error select {
  border: 1px solid var(--red);
}
/deep/ .form label p {
  display: none;
}
/deep/ .form .error p {
  display: block;
  font-size: 0.9em;
  margin-bottom: 0;
}
</style>
