import { reqUserCode, reqUserInfo, reqUserLogin, reqUserRegister, reqUserLogout } from "@/api"
import { setToken, getToken, clearToken } from "@/utils/token"

const state = {
    userCode: '',
    token: getToken("Token"),
    userInfo: {}
}
const actions = {
    // 注册验证码
    async userCode({commit}, phone) {
        let result = await reqUserCode(phone)
        if (result.code === 200) {
            commit("USERCODE", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    // 注册成功
    async userRegister({commit}, user) {
        let result = await reqUserRegister(user)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    // 登录成功
    async userLogin({commit}, user) {
        let result = await reqUserLogin(user) 
        if (result.code === 200) {
            commit("USERLOGIN", result.data.token)
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    // 获取用户信息
    async userInfo({commit}) {
        let result = await reqUserInfo()
        if (result.code === 200) {
            commit("USERINFO", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    // 退出登录
    async userLogout({commit}) {
        let result = await reqUserLogout()
        if (result.code === 200) {
            commit("USERLOGOUT")
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
}
const mutations = {
    USERCODE(state, userCode) {
        state.userCode = userCode
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    USERLOGOUT(state) {
        state.token = ''
        state.userInfo = {}
        clearToken("Token")
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}