import Vant from 'vant'
import 'vant/lib/index.css'
export default defineNuxtPlugin((nuxt) => {
    nuxt.vueApp.use(Vant)
})
