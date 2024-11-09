import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: null,
        refreshToken: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.accessToken,
    },
    actions: {
        login(accessToken, refreshToken) {
            this.accessToken = accessToken
            this.refreshToken = refreshToken
        },
        logout() {
            this.accessToken = null
            this.refreshToken = null
        },
    },
})
