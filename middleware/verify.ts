import {VerifiedData} from "~/apollo/queries/__generated__/VerifiedData";
import {VERIFIED_DATA} from "~/apollo/queries/loan.query";
export default defineNuxtRouteMiddleware(async () => {
    const { $apollo } = useNuxtApp()
    // @ts-ignore
    const { data } = await $apollo.defaultClient.query<VerifiedData>({
        query: VERIFIED_DATA
    })
    if(data.info && data.bank && data.identity) {
        return navigateTo('/loan')
    }
})
