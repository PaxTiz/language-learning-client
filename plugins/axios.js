export default function ({ $axios, store, $cookies, redirect }) {
  $axios.onRequest((config) => {
    const token = $cookies.get("token")
    config.headers.common.Authorization = `Bearer ${token}`
    return config
  })

  $axios.onResponse((response) => {
    if (process.server && process.env.NODE_ENV !== "production" && response) {
      /* eslint-disable no-console */
      console.log(
        response.config.method.toUpperCase(),
        response.status,
        response.config.url
      )
    }
    if (response.status >= 400) throw response
    return response.data
  })

  $axios.onError((error) => {
    if (error.response.status === 401) {
      $cookies.remove("token")
      store.commit("user/set", { property: "user", value: null })
      return redirect("/admin/auth")
    }
    if (error.response.status === 500) {
      store.dispatch(
        "alert/danger",
        "There was an internal error, please try again later"
      )
    }
    throw error.response.data
  })
}
