<template>
  <div class="navbar">
    <nav>
      <a class="nav-link" :class="{ active: isHomeActive() }" href="/admin">
        <DashboardIcon />
        <span>Dashboard</span>
      </a>

      <a
        class="nav-link"
        :class="{ active: isActive('/languages') }"
        href="/admin/languages"
      >
        <AccountIcon />
        <span>Languages</span>
      </a>

      <a
        class="nav-link"
        :class="{ active: isActive('/courses') }"
        href="/admin/courses"
      >
        <TicketIcon />
        <span>Courses</span>
      </a>

      <a
        class="nav-link"
        :class="{ active: isActive('/lessons') }"
        href="/admin/lessons"
      >
        <SettingsIcon />
        <span>Lessons</span>
      </a>

      <a
        class="nav-link"
        :class="{ active: isActive('/questions') }"
        href="/admin/questions"
      >
        <SettingsIcon />
        <span>Questions</span>
      </a>

      <hr />

      <a
        class="nav-link"
        :class="{ active: isActive('/posts') }"
        href="/admin/posts"
      >
        <TicketIcon />
        <span>Posts</span>
      </a>

      <a
        class="nav-link"
        :class="{ active: isActive('/users') }"
        href="/admin/users"
      >
        <TicketIcon />
        <span>Users</span>
      </a>

      <a
        class="nav-link"
        :class="{ active: isActive('/roles') }"
        href="/admin/roles"
      >
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
</template>

<script>
import AccountIcon from '@/components/icons/Account'
import DashboardIcon from '@/components/icons/Dashboard'
import SettingsIcon from '@/components/icons/Settings'
import TicketIcon from '@/components/icons/Ticket'

export default {
  name: 'AdminNavbar',
  components: {
    AccountIcon,
    DashboardIcon,
    TicketIcon,
    SettingsIcon,
  },

  methods: {
    isHomeActive() {
      return this.$route.path === '/admin'
    },
    isActive(path) {
      return this.$route.path.startsWith(`/admin${path}`)
    },
  },
}
</script>
