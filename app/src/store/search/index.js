import { reqSearchInfo } from "@/api";

const state = {
    searchList: {}
};
const actions = {
    async searchInfo({commit}, params = {}) {
        let result = await reqSearchInfo(params);
        if (result.code === 200) {
            commit('SEARCHINFO', result.data);
        }
    } 
};
const mutations = {
    SEARCHINFO(state, searchList) {
        state.searchList = searchList;
    }
};
const getters = {
    trademarkList(state) {
        return state.searchList.trademarkList;
    },
    attrsList(state) {
        return state.searchList.attrsList;
    },
    goodsList(state) {
        return state.searchList.goodsList || [];
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}