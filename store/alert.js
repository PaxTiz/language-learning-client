export const state = () => ({
    alert: null,
})

export const getters = {
    alert: state => state.alert,
}

export const mutations = {
    set (state, { property, value }) {
        state[property] = value
    }
}

export const actions = {
    set ({ commit }, alert) {
        if (alert && !alert.type) alert.type = 'info'
        commit('set', {
            property: 'alert',
            value: alert,
        })
        setTimeout(() => {
            commit('set', {
                property: 'alert',
                value: null,
            })
        }, 3000)
    },

    success ({ dispatch }, text) {
        return dispatch('set', { type: 'success', text })
    },

    danger ({ dispatch }, text) {
        return dispatch('set', { type: 'danger', text })
    }
}