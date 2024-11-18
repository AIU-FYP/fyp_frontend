export default defineNuxtRouteMiddleware(() => {
    const auth = useAuth()

    if (!auth.isAuthenticated.value) {
        return navigateTo('/login')
    }

})
