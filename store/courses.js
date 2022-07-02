export const state = () => ({
    courses: [],
})

export const getters = {
    courses: state => state.courses,
    coursesOptions: state => state.courses.map(e => ({ text: e.name, value: e.id })),
}

export const mutations = {
    set(state, { property, data }) {
        state[property] = data
    }
}

export const actions = {
    findAll({ commit }) {
        return this.$axios.get('/courses').then(courses => {
            commit('set', { property: 'courses', data: courses })
        })
    },

    findById ({ commit }, id) {
        return this.$axios.get(`/courses/${id}`)
    },

    create ({ commit }, form) {
        return this.$axios.post('/courses', form)
    },

    update ({ commit }, { id, form }) {
        return this.$axios.patch(`/courses/${id}`, form)
    }
}