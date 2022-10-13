import { reqCartList, reqDeleteCartList, reqUpdateChecked } from "@/api"
import { Promise } from "core-js"
const state = {
    shopCartList: []
}
const actions = {
    // 购物车数据
    async shopCartList({commit}) {
        let result = await reqCartList()
        if (result.code === 200) {
            commit("SHOPCARTLIST", result.data)
        }
    },
    // 删除购物车数据
    async deleteCart({commit}, skuId) {
        let result = await reqDeleteCartList(skuId)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 删除购物车多条数据
    async deleteAllChecked({dispatch, getters}) {
        let cartInfoList = await getters.cartList.cartInfoList;
        let promiseAll = [];
        cartInfoList.forEach((item) => {
            if (item.isChecked === 1) {
                let result = dispatch("deleteCart", item.skuId)
                promiseAll.push(result)
            }
        })
        return Promise.all(promiseAll);
    },
    // 更新购物车商品选中状态
    async updateChecked({commit}, {skuId, isChecked}) {
        let result = await reqUpdateChecked(skuId, isChecked)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 全选与全不选
    async selectAllOption({dispatch, getters}, isChecked) {
        let cartInfoList = getters.cartList.cartInfoList;
        let promiseAll = [];
        await cartInfoList.forEach(item => {
            let result = dispatch("updateChecked", {skuId: item.skuId, isChecked})
            promiseAll.push(result)
        });
        return Promise.all(promiseAll);
    }
}
const mutations = {
    SHOPCARTLIST(state, shopCartList) {
        state.shopCartList = shopCartList
    }
}
const getters = {
    cartList(state) {
        return state.shopCartList[0] || {}
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}