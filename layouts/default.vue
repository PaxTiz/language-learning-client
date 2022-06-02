<template>
  <div id="app">
    <main class="flex">
      <div class="navbar">
        <h2>Language Learning</h2>

        <div class="relative mt-6">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon />
          </span>

          <input type="text" placeholder="Search" />
        </div>

        <div class="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <a class="nav-link active" href="#">
              <DashboardIcon />
              <span class="mx-4 font-medium">Dashboard</span>
            </a>

            <a class="nav-link" href="#">
              <AccountIcon />
              <span class="mx-4 font-medium">Accounts</span>
            </a>

            <a class="nav-link" href="#">
              <TicketIcon />
              <span class="mx-4 font-medium">Tickets</span>
            </a>

            <a class="nav-link" href="#">
              <SettingsIcon />
              <span class="mx-4 font-medium">Settings</span>
            </a>

            <hr />

            <a class="nav-link" href="#">
              <TicketIcon />
              <span class="mx-4 font-medium">Tickets</span>
            </a>

            <a class="nav-link" href="#">
              <SettingsIcon />
              <span class="mx-4 font-medium">Settings</span>
            </a>
          </nav>

          <div class="flex items-center px-4 -mx-2">
            <img
              class="object-cover mx-2 rounded-full h-9 w-9"
              src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              alt="avatar"
            />
            <h4
              class="
                mx-2
                font-medium
                text-gray-800
                dark:text-gray-200
                hover:underline
              "
            >
              John Doe
            </h4>
          </div>
        </div>
      </div>

      <div class="w-full px-4 py-8">
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