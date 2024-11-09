export const useAuth = () => {
    const accessToken = useCookie('accessToken')
    const isAuthenticated = computed(() => !!accessToken.value)

    const login = async (username, password) => {
        console.log(username, password)

        if (username === 'AIU12121212' && password === 'Password123$$') {
            accessToken.value = 'mockAccessToken'
            return true
        } else {
            throw new Error('Invalid username or password')
        }
    }

    const logout = () => {
        accessToken.value = null
    }

    return {
        accessToken,
        isAuthenticated,
        login,
        logout,
    }
}
