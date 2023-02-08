export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    if (authStore.user && to.name === 'auth') {
        return navigateTo('/')
    } else if (!authStore.user && to.name !== 'auth') {
        return navigateTo('/auth')
    }
})
