import { reqUserAdress, reqOrderInfo } from "@/api"

const state = {
    adress: [],
    orderInfo: {}
}
const actions = {
    async userAdress({commit}) {
        let result = await reqUserAdress()
        if (result.code === 200) {
            commit("USERADRESS", result.data)
        }
    },
    async orderInfo({commit}) {
        let result = await reqOrderInfo()
        if (result.code === 200) {
            commit("ORDERINFO", result.data)
        }
    }
}
const mutations = {
    USERADRESS(state, adress) {
        state.adress = adress
    },
    ORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}