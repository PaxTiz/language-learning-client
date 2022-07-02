import http from '@/http'

export const state = () => ({
    items: [],
})

export const getters = {
    items: state => state.items,
}

export const mutations = {
    set (state, { property, value }) {
        state[property] = value
    }
}

export const actions = {
    search ({ commit }, value) {
        if (value.length === 0) {
            commit('set', { property: 'items', value: [] })
        } else {
            return http.get(`/spotlight?search=${value}`).then(res => {
                commit('set', { property: 'items', value: res })
            })
        }
    },

    close({ commit }) {
        commit('set', { property: 'items', value: [] })
    }
}