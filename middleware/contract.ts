import {GetLoan} from "~/apollo/queries/__generated__/GetLoan";

export default defineNuxtRouteMiddleware(async () => {
    const { $apollo } = useNuxtApp()
    try {
        // @ts-ignore
        const { data } = await $apollo.defaultClient.query<GetLoan>({
            query: GET_LOAN
        })
        if(!data.loan) {
            return navigateTo('/loan')
        }
    } catch (e) {
        //
    }
})
