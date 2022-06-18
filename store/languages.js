import http from '@/http'

export const actions = {
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