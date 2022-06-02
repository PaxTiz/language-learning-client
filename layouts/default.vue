<template>
  <div id="app">
    <main class="flex">
      <div class="navbar">
        <h2>Language Learning</h2>

        <div class="search-input mt-2">
          <span>
            <SearchIcon />
          </span>

          <input type="text" placeholder="Search" />
        </div>

        <nav class="mt-1">
          <a class="nav-link active" href="#">
            <DashboardIcon />
            <span>Dashboard</span>
          </a>

          <a class="nav-link" href="#">
            <AccountIcon />
            <span>Accounts</span>
          </a>

          <a class="nav-link" href="#">
            <TicketIcon />
            <span>Tickets</span>
          </a>

          <a class="nav-link" href="#">
            <SettingsIcon />
            <span>Settings</span>
          </a>

          <hr />

          <a class="nav-link" href="#">
            <TicketIcon />
            <span>Tickets</span>
          </a>

          <a class="nav-link" href="#">
            <SettingsIcon />
            <span>Settings</span>
          </a>
        </nav>

        <div class="user mt-2">
          <img
            src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            alt="avatar"
          />
          <h4>John Doe</h4>
        </div>
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
import SearchIcon from '@/components/icons/Search'
import SettingsIcon from '@/components/icons/Settings'
import TicketIcon from '@/components/icons/Ticket'

export default {
  name: 'BaseLayout',
  components: {
    AccountIcon,
    DashboardIcon,
    SearchIcon,
    TicketIcon,
    SettingsIcon,
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
