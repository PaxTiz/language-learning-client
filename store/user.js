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
    auth ({ commit, dispatch }, value) {
        return this.$axios.post('/auth/login', value).then(res => {
            commit('set', { property: 'user', value: res.user })
            dispatch('cookies/set', { key: 'token', value: res.token }, { root: true })
        })
    },
}