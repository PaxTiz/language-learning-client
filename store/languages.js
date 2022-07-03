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
        const formData = new FormData()
        for (const [k, v] of Object.entries(form)) {
            formData.append(k, v)
        }
        return this.$axios.post('/languages', formData)
    },

    update ({ commit }, { id, form }) {
        const formData = new FormData()
        for (const [k, v] of Object.entries(form)) {
            formData.append(k, v)
        }
        if (typeof form.flag === 'string') {
            formData.delete('flag')
        }
        return this.$axios.patch(`/languages/${id}`, formData)
    }
}