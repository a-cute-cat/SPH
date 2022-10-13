<template>
	<div class="register-container">
		<!-- 注册内容 -->
		<div class="register">
			<h3
				>注册新用户
				<span class="go"
					>我有账号，去 <a href="login.html" target="_blank">登陆</a>
				</span>
			</h3>
			<div class="content">
				<label>手机号:</label>
				<input
					placeholder="请输入你的手机号"
					v-model="phone"
					name="phone"
					v-validate="{
						required: true,
						regex:
							/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
					}"
					:class="{ invalid: errors.has('phone') }"
				/>
				<span class="error-msg">{{ errors.first("phone") }}</span>
			</div>
			<div class="content">
				<label>验证码:</label>
				<input
					placeholder="请输入你的验证码"
					v-model="code"
					name="code"
					v-validate="{ required: true, regex: /^\d{6}$/ }"
					:class="{ invalid: errors.has('code') }"
				/>
				<span class="sendCode" @click="sendCode" v-if="type === 'send'"
					>发送验证码</span
				>
				<span class="sendCode" v-else-if="type === 'going'"
					>{{ time }} 秒后重发</span
				>
				<span class="error-msg">{{ errors.first("code") }}</span>
			</div>
			<div class="content">
				<label>登录密码:</label>
				<input
					placeholder="请输入你的密码"
					v-model="password"
					name="password"
					v-validate="{ required: true, regex: /(?=.*[a-z_])(?=.*\d)(?=.*[^a-z0-9_])[\S]{8,}/i }"
					:class="{ invalid: errors.has('password') }"
				/>
				<span class="error-msg">{{ errors.first("password") }}</span>
			</div>
			<div class="content">
				<label>确认密码:</label>
				<input
					placeholder="请确认你的密码"
					v-model="passwordAgin"
					name="passwordAgin"
					v-validate="{ required: true, is: password }"
					:class="{ invalid: errors.has('passwordAgin') }"
				/>
				<span class="error-msg">{{ errors.first("passwordAgin") }}</span>
			</div>
			<div class="controls">
				<input
					type="checkbox"
					v-model="agree"
					name="agree"
					v-validate="{ required: true, tongyi: true }"
					:class="{ invalid: errors.has('agree') }"
				/>
				<span>同意协议并注册《尚品汇用户协议》</span>
				<span class="error-msg">{{ errors.first("agree") }}</span>
			</div>
			<div class="btn">
				<button @click="completeRegister">完成注册</button>
			</div>
		</div>
		<Pop :popShow="popShow" :message="message"></Pop>
	</div>
</template>

<script>
	import { mapState } from "vuex"
	import Pop from "@/components/Pop"
	export default {
		name: "Register",
		data() {
			return {
				phone: "",
				code: "",
				password: "",
				passwordAgin: "",
				agree: false,
				time: 60,
				type: "send",
				popShow: false,
				message: "",
			}
		},
		methods: {
			async sendCode() {
				if (!this.phone && this.type === "send") {
					return
				}
				this.type = "going"
				let timebar = setInterval(() => {
					if (this.time > 0) {
						this.time--
					} else {
						clearInterval(timebar)
						this.type = "send"
					}
				}, 1000)
				try {
					await this.$store.dispatch("userCode", this.phone)
					this.popShow = true
					this.message = `验证码：${this.userCode}`
				} catch (error) {
					alert("出错了")
				}
				this.time = 60
			},
			async completeRegister() {
				// 验证全部表单，验证全部通过才可以发请求
				const success = await this.$validator.validateAll()
				if (success) {
					try {
						const { phone, code, password, passwordAgin } = this
						console.log(phone && code && password === passwordAgin)
						phone &&
							code &&
							password === passwordAgin &&
							(await this.$store.dispatch("userRegister", {
								phone,
								code,
								password,
							}))
						this.$router.push("/login")
					} catch (error) {
						alert("出错了！")
					}
				}
			},
		},
		computed: {
			...mapState({
				userCode: state => state.user.userCode,
			}),
		},
		components: {
			Pop,
		},
		mounted() {
			this.$bus.$on("popMakeSure", () => {
				this.popShow = false
			})
		},
	}
</script>

<style scoped>
	.register-container .register {
		width: 1200px;
		height: 445px;
		border: 1px solid #dfdfdf;
		margin: 0 auto;
	}
	.register-container .register h3 {
		background: #ececec;
		margin: 0;
		padding: 6px 15px;
		color: #333;
		border-bottom: 1px solid #dfdfdf;
		font-size: 20.04px;
		line-height: 30.06px;
	}
	.register-container .register h3 span {
		font-size: 14px;
		float: right;
	}
	.register-container .register h3 span a {
		color: #e1251b;
	}
	.register-container .register div:nth-of-type(1) {
		margin-top: 40px;
	}
	.register-container .register .content {
		padding-left: 390px;
		margin-bottom: 18px;
		position: relative;
	}
	.register-container .register .content label {
		font-size: 14px;
		width: 96px;
		text-align: right;
		display: inline-block;
	}
	.register-container .register .content input {
		width: 270px;
		height: 38px;
		padding-left: 8px;
		box-sizing: border-box;
		margin-left: 5px;
		outline: none;
		border: 1px solid #999;
		vertical-align: middle;
	}
	.register-container .register .content img {
		vertical-align: sub;
	}
	.register-container .register .content .error-msg {
		position: absolute;
		top: 100%;
		left: 495px;
		color: red;
		font-size: 12px;
	}
	.register-container .register .controls {
		text-align: center;
		position: relative;
	}
	.register-container .register .controls input {
		vertical-align: middle;
		cursor: pointer;
	}
	.register-container .register .controls .error-msg {
		position: absolute;
		top: 100%;
		left: 495px;
		color: red;
	}
	.register-container .register .btn {
		text-align: center;
		line-height: 36px;
		margin: 17px 0 0 55px;
	}
	.register-container .register .btn button {
		outline: none;
		width: 270px;
		height: 36px;
		background: #e1251b;
		border: none;
		color: #fff !important;
		display: inline-block;
		font-size: 16px;
		cursor: pointer;
	}
	.sendCode {
		line-height: 38px;
		padding: 0 6px;
		vertical-align: middle;
		font-size: 12px;
		display: inline-block;
		/* background-color: skyblue; */
		background-color: #e1251b;
		color: #fff;
		cursor: pointer;
	}
</style>
