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
        <FlagIcon />
        <span>Languages</span>
      </a>

      <a
        class="nav-link"
        :class="{ active: isActive('/courses') }"
        href="/admin/courses"
      >
        <ChartIcon />
        <span>Courses</span>
      </a>

      <a
        class="nav-link"
        :class="{ active: isActive('/lessons') }"
        href="/admin/lessons"
      >
        <LandscapeIcon />
        <span>Lessons</span>
      </a>

      <a
        class="nav-link"
        :class="{ active: isActive('/questions') }"
        href="/admin/questions"
      >
        <QuestionIcon />
        <span>Questions</span>
      </a>

      <hr />

      <a
        class="nav-link"
        :class="{ active: isActive('/posts') }"
        href="/admin/posts"
      >
        <PostIcon />
        <span>Posts</span>
      </a>

      <a
        class="nav-link"
        :class="{ active: isActive('/users') }"
        href="/admin/users"
      >
        <AccountIcon />
        <span>Users</span>
      </a>

      <a
        class="nav-link"
        :class="{ active: isActive('/roles') }"
        href="/admin/roles"
      >
        <HierarchyIcon />
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
import ChartIcon from '@/components/icons/Chart'
import DashboardIcon from '@/components/icons/Dashboard'
import FlagIcon from '@/components/icons/Flag'
import HierarchyIcon from '@/components/icons/Hierarchy'
import LandscapeIcon from '@/components/icons/Landscape'
import PostIcon from '@/components/icons/Post'
import QuestionIcon from '@/components/icons/Question'

export default {
  name: 'AdminNavbar',
  components: {
    DashboardIcon,
    FlagIcon,
    ChartIcon,
    LandscapeIcon,
    QuestionIcon,
    PostIcon,
    AccountIcon,
    HierarchyIcon,
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
