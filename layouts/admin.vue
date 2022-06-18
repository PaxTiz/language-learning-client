<template>
  <div id="app">
    <div v-if="alert" class="alert" :class="alert.type">
      <span>{{ alert.text }}</span>
      <span @click="cleanAlert">&times;</span>
    </div>

    <main class="flex">
      <div class="navbar">
        <nav>
          <a class="nav-link active" href="/admin">
            <DashboardIcon />
            <span>Dashboard</span>
          </a>

          <a class="nav-link" href="/admin/languages">
            <AccountIcon />
            <span>Languages</span>
          </a>

          <a class="nav-link" href="/admin/courses">
            <TicketIcon />
            <span>Courses</span>
          </a>

          <a class="nav-link" href="/admin/lessons">
            <SettingsIcon />
            <span>Lessons</span>
          </a>

          <a class="nav-link" href="/admin/questions">
            <SettingsIcon />
            <span>Questions</span>
          </a>

          <hr />

          <a class="nav-link" href="/admin/posts">
            <TicketIcon />
            <span>Posts</span>
          </a>

          <a class="nav-link" href="/admin/users">
            <TicketIcon />
            <span>Users</span>
          </a>

          <a class="nav-link" href="/admin/roles">
            <SettingsIcon />
            <span>Roles</span>
          </a>
        </nav>

        <a class="user mt-2" href="/admin/me">
          <img
            src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            alt="avatar"
          />
          <span>John Doe</span>
        </a>
      </div>

      <div class="application">
        <Nuxt />
      </div>
    </main>

    <footer></footer>
  </div>
</template>

<script>
import AccountIcon from '@/components/icons/Account'
import DashboardIcon from '@/components/icons/Dashboard'
import SettingsIcon from '@/components/icons/Settings'
import TicketIcon from '@/components/icons/Ticket'

export default {
  name: 'BaseLayout',
  components: {
    AccountIcon,
    DashboardIcon,
    TicketIcon,
    SettingsIcon,
  },

  computed: {
    alert() {
      return this.$store.getters['alert/alert']
    },
  },

  methods: {
    cleanAlert() {
      return this.$store.dispatch('alert/set', null)
    },
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
