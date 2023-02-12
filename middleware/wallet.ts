import {GET_BANK} from "~/apollo/queries/bank.query";
import {GetBank} from "~/apollo/queries/__generated__/GetBank";

export default defineNuxtRouteMiddleware(async () => {
    const {$apollo} = useNuxtApp()
    try {
        // @ts-ignore
        const {data} = await $apollo.defaultClient.query<GetBank>({
            query: GET_BANK
        })
        if (!data?.bank) {
            return navigateTo('/verify')
        }
    } catch (e) {
        navigateTo('/404')
    }
})
