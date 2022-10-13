// 设置本地存储token
export const setToken = (myToken) => {
    localStorage.setItem("Token", myToken)
}

// 获取本地存储token
export const getToken = (key) => {
    return localStorage.getItem(key)
}

// 清除本地存储token
export const clearToken = (key) => {
    localStorage.removeItem(key)
}