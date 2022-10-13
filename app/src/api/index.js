import requests from "./ajax";
import mockRequests from "./mockAjax"

// 获取商品三级分类数据CategoryList
export const reqCategoryList = () => {
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}
// 获取轮播图数据BannerList
export const reqBannerList = () => {
    return mockRequests({
        url: '/banner',
        method: 'get'
    })
}

// 获取轮播图数据FloorList
export const reqFloorList = () => {
    return mockRequests({
        url: '/floor',
        method: 'get'
    })
}

// 获取搜索页数据SearchInfo
export const reqSearchInfo = (params) => {
    return requests({
        url: '/list',
        method: 'post',
        data: params
    })
}

// 获取商品详情页数据GoodInfo
export const reqGoodList = (skuId) => {
    return requests({
        url: `/item/${skuId}`,
        method: 'get'
    })
}

// 加入或更新购物车
export const reqAddUpdateShopCar = (skuId, skuNum) => {
    return requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post'
    })
}

// 获取购物车数据CarList
export const reqCartList = () => {
    return requests({
        url: '/cart/cartList',
        method: 'get'
    })
}

// 删除购物车数据DeleteCartList
export const reqDeleteCartList = (skuId) => {
    return requests({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete'
    })
}

// 获取商品选中状态
export const reqUpdateChecked = (skuId, isChecked) => {
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}

// 用户获取注册验证码
export const reqUserCode = (phone) => {
    return requests({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get'
    })
}

// 用户注册
export const reqUserRegister = (data) => {
    return requests({
        url: '/user/passport/register',
        data,
        method: 'post'
    })
}

// 用户登录
export const reqUserLogin = (data) => {
    return requests({
        url: '/user/passport/login',
        data,
        method: 'post'
    })
}

// 获取用户信息
export const reqUserInfo = () => {
    return requests({
        url: '/user/passport/auth/getUserInfo',
        method: 'get'
    })
}

// 用户退出登录
export const reqUserLogout = () => {
    return requests({
        url: '/user/passport/logout',
        method: 'get'
    })
}

// 获取用户地址信息
export const reqUserAdress = () => {
    return requests({
        url: '/user/userAddress/auth/findUserAddressList',
        method: 'get'
    })
}

// 获取用户商品清单
export const reqOrderInfo = () => {
    return requests({
        url: '/order/auth/trade',
        method: 'get'
    })
}

// 用户提交订单
export const reqSubmitOrder = (tradeNo, data) => {
    return requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method: 'post'
    })
}

// 获取订单支付信息
export const reqPayInfo = (orderId) => {
    return requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'get'
    })
}

// 获取用户订单支付状态
export const reqPayStatus = (orderId) => {
    return requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: 'get'
    })
}

// 获取我的订单数据
export const reqMyOrderList = (page, limit) => {
    return requests({
        url: `/order/auth/${page}/${limit}`,
        method: 'get'
    })
}