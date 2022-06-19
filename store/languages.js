import http from '@/http'

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
        return http.get('/languages').then(languages => {
            commit('set', { property: 'languages', data: languages })
        })
    },

    findById ({ commit }, id) {
        return http.get(`/languages/${id}`)
    },

    create ({ commit }, form) {
        return http.post('/languages', form)
    },

    update ({ commit }, { id, form }) {
        return http.patch(`/languages/${id}`, form)
    }
}