<template>
  <div class="form">
    <slot />
  </div>
</template> 

<script>
export default {
  name: 'BasicForm',
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form label input {
  margin-top: 8px;
}

.form .row {
  display: flex;
  gap: 2em;
}
.form .row > * {
  width: 100%;
}

.form .error {
  color: var(--red);
}
.form .error input {
  border: 1px solid var(--red);
}
.form label p {
  display: none;
}
.form .error p {
  display: block;
  font-size: 0.9em;
  margin-bottom: 0;
}
</style>
