<template>
	<div id="header">
		<div class="header-nav">
			<div class="container">
				<ul class="left-nav">
					<li>北京 尚品汇欢迎您！请</li>
					<template v-if="!userName">
						<li>
							<router-link to="/login">登录</router-link>
						</li>
						<li>
							<router-link to="/register">免费注册</router-link>
						</li>
					</template>
                    <template v-else>
                        <li>{{userName}}</li>
                        <li @click="logout">
                            退出登录
                        </li>
                    </template>
				</ul>
				<ul class="right-nav">
					<li @click="toMyCenter">我的订单</li>
					<li @click="toMyShopCart">我的购物车</li>
					<li>我的尚品汇</li>
					<li>尚品汇会员</li>
					<li>企业采购</li>
					<li>关注尚品汇</li>
					<li>合作招商</li>
					<li>商家后台</li>
				</ul>
			</div>
		</div>
		<div class="header-main">
			<div class="container">
				<img class="header-logo" src="./images/logo.png" alt="" />
				<div class="header-search">
					<input type="text" v-model="keyWord" />
					<button @click="goSearch">搜索</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
	export default {
		name: "Header",
		data() {
			return {
				keyWord: "",
			}
		},
		methods: {
			goSearch() {
				let location = {
					name: "search",
					params: { keyword: this.keyWord || undefined },
				}
				// 合并参数
				if (this.$route.query) {
					location.query = this.$route.query
				}
				this.$router.push(location)
			},
			async logout() {
				try {
					await this.$store.dispatch("userLogout")
					this.$router.push("/home")
				} catch (error) {
					alert('出错了!')
				}
			},
			toMyShopCart() {
				this.$router.push("/shopCart")
			},
			toMyCenter() {
				this.$router.push("/center")
			}
		},
		mounted() {
			// 通过全局事件总线监听clear事件，清除搜索框关键字
			this.$bus.$on("clear", () => {
				this.keyWord = ""
			})
		},
        computed: {
            ...mapState({
                userName: state => state.user.userInfo.name
            })
        }
	}
</script>

<style scoped>
	.header-nav {
		height: 40px;
		background-color: #eaeaea;
		color: #666;
	}

	.header-nav .container {
		display: flex;
		justify-content: space-between;
	}

	.header-nav .container ul {
		display: flex;
		padding: 10px 0;
		line-height: 20px;
	}

	ul li {
		padding: 0 12px;
		color: #666;
		font-size: 14px;
		border-left: 1px solid #b3aeae;
	}

	.right-nav li:first-of-type {
		border-left: none;
	}

	.header-main .container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header-logo {
		width: 180px;
		height: 77px;
		padding: 30px 45px;
	}

	.header-search input {
		width: 572px;
		height: 40px;
		line-height: 40px;
		padding: 0 10px;
		outline: none;
		border: 2px solid #e1251b;
		font-size: 16px;
		vertical-align: middle;
		box-sizing: border-box;
	}

	.header-search button {
		width: 70px;
		height: 40px;
		line-height: 40px;
		border: none;
		background-color: #e1251b;
		color: #fff;
		font-size: 18px;
		vertical-align: middle;
		cursor: pointer;
	}

	a {
		color: #666;
	}
	li {
		cursor: pointer;
	}
</style>
