import {useApi} from "../composables/useApi";

export default defineNuxtPlugin(() => {
    return {
        provide: {
            axios: () => {
                return useApi()
            }
        }
    }
})