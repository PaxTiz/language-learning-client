export const state = () => ({
    user: null,
})

export const getters = {
    user: state => state.user,
    isAuth: state => state.user !== null,
}

export const mutations = {
    set (state, { property, value }) {
        state[property] = value
    }
}

export const actions = {
    auth ({ commit }, value) {
        return this.$axios.post('/auth/login', value).then(res => {
            commit('set', { property: 'user', value: res.user })
            this.$cookies.set('token', res.token, {
                path: '/',
                maxAge: 60 * 60
            })
        })
    },
}