import {
    reqAddUpdateShopCar,
    reqGoodList
} from "@/api";
import { getUUID } from "@/utils/uuid_token";

const state = {
    goodInfoList: {},
    // 通过uuid包生成一个唯一的id给游客，并存储在用户的本地存储，实现游客购物车
    uuid_token: getUUID()
};
const actions = {
    async goodInfo({
        commit
    }, skuId) {
        let result = await reqGoodList(skuId);
        if (result.code === 200) {
            commit('GOODINFO', result.data);
        }
    },
    async addOrUpadateShopCart({commit}, {skuId, skuNum}) {
        let result = await reqAddUpdateShopCar(skuId, skuNum);
        // 说明服务器加入购物车成功
        if (result.code === 200) {
            return "ok"
        } else {
        // 说明服务器加入购物车失败
            return Promise.reject(new Error("fail"));
        }
    }
};
const mutations = {
    GOODINFO(state, goodInfoList) {
        state.goodInfoList = goodInfoList;
    }
};
const getters = {
    categoryView(state) {
        return state.goodInfoList.categoryView || {};
    },
    skuInfo(state) {
        return state.goodInfoList.skuInfo || {};
    },
    spuSaleAttrList(state) {
        return state.goodInfoList.spuSaleAttrList || [];
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}