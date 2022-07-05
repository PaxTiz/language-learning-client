<template>
  <div id="app">
    <BasicAlert />

    <main class="flex" :class="{ dark: currentTheme === 'dark' }">
      <Spotlight />
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
import Spotlight from '@/components/shared/Spotlight'
import theme from '@/mixins/theme'

export default {
  name: 'BaseLayout',
  components: {
    AdminNavbar,
    BasicAlert,
    Spotlight,
  },
  mixins: [theme],
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
