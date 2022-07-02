
export default function ({ $axios, app, req, redirect, store }) {
  if (process.server) {
    const mustBeAuth = req.path.startsWith('/admin') && req.path !== '/admin/auth'
    if (mustBeAuth) {
      return $axios.get('/auth/me').then(res => {
        return store.commit('user/set', { property: 'user', value: res })
      }).catch(() => {
        app.$cookies.remove('token')
        store.commit('user/set', { property: 'user', value: null })
        return redirect('/admin/auth')
      })
    }
  }
}
  