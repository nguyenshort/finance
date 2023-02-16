import { CheckSigned } from '~/apollo/queries/__generated__/CheckSigned'
import { CHECK_SIGNED } from '~/apollo/queries/user.query'

export default defineNuxtRouteMiddleware(async () => {
    const { $apollo } = useNuxtApp()
    try {
        // @ts-ignore
        const { data } = await $apollo.defaultClient.query<CheckSigned>({
            query: CHECK_SIGNED
        })
        if(!data.me?.loan?.signature) {
            return navigateTo('/')
        }
    } catch (e) {
        return navigateTo('/')
    }
})
