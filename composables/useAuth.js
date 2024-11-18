export const useAuth = () => {
    const accessToken = useCookie('accessToken'); // Authentication token
    const userRole = useCookie('userRole');       // Role of the user (admin or super-admin)
    const isAuthenticated = computed(() => !!accessToken.value); // Check if logged in

    const login = async (username, password) => {
        console.log(username, password)

        if (username === 'AIU12121212' && password === 'Password123$$') {
            accessToken.value = 'mockAccessToken'
            userRole.value = 'admin';
            return true
        }
         else {
            throw new Error('Invalid username or password')
        }
    }

    const logout = () => {
        accessToken.value = null
    }

    return {
        accessToken,
        userRole,
        isAuthenticated,
        login,
        logout,
    }
}
