export const actions = {
    set({ commit }, { key, value }) {
        this.$cookies.set(key, value, {
            path: '/',
            maxAge: 60 * 60,
            secure: true,
            domain: process.env.NUXT_ENV_COOKIE_WEB_URL,
        })
    }
}