export default {
    data: () => ({
        currentTheme: null,
    }),

    created() {
        this.currentTheme = this.$cookies.get('theme')
    },
}