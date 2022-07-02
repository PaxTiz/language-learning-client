export const state = () => ({
    languages: [],
})

export const getters = {
    languages: state => state.languages,
    languagesOptions: state => state.languages.map(e => ({ text: e.name, value: e.id })),
}

export const mutations = {
    set(state, { property, data }) {
        state[property] = data
    }
}

export const actions = {
    findAll({ commit }) {
        return this.$axios.get('/languages').then(languages => {
            commit('set', { property: 'languages', data: languages })
        })
    },

    findById ({ commit }, id) {
        return this.$axios.get(`/languages/${id}`)
    },

    create ({ commit }, form) {
        return this.$axios.post('/languages', form)
    },

    update ({ commit }, { id, form }) {
        return this.$axios.patch(`/languages/${id}`, form)
    }
}