export const useAuth = () => {
    const accessToken = useCookie('accessToken')
    const userRole = useCookie('userRole')
    const isAuthenticated = computed(() => !!accessToken.value)


    const login = async (username, password) => {
        console.log(username, password)

        if (username === 'AIU12121212' && password === 'Password123$$') {
            accessToken.value = 'mockAccessToken'
            userRole.value = 'admin'
            return true
        } else if (username === 'AIU12121222' && password === 'Password123$$$') {
            accessToken.value = 'mockAccessToken'
            userRole.value = 'superAdmin'
            return true
        } else {
            throw new Error('Invalid username or password')
        }
    }

    const logout = () => {
        accessToken.value = null
        userRole.value = null
    }

    return {
        accessToken,
        isAuthenticated,
        userRole,
        login,
        logout,
    }
}
