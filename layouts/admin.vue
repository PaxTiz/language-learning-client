<template>
  <div id="app">
    <BasicAlert />

    <main class="flex">
      <AdminNavbar />

      <div class="application">
        <Nuxt />
      </div>
    </main>

    <footer></footer>
  </div>
</template>

<script>
import AdminNavbar from '@/components/shared/AdminNavbar'
import BasicAlert from '@/components/shared/BasicAlert'

export default {
  name: 'BaseLayout',
  components: {
    AdminNavbar,
    BasicAlert,
  },
}
</script>

<style lang="scss">
main {
  display: flex;
  max-height: 100vh;
  overflow: hidden;
}

.application {
  width: 100%;
  padding: 2rem;
  overflow: scroll;
}
</style>
