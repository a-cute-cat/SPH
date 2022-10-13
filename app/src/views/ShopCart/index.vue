<template>
	<div class="cart">
		<h4>全部商品</h4>
		<div class="cart-main">
			<div class="cart-th">
				<div class="cart-th1">全部</div>
				<div class="cart-th2">商品</div>
				<div class="cart-th3">单价（元）</div>
				<div class="cart-th4">数量</div>
				<div class="cart-th5">小计（元）</div>
				<div class="cart-th6">操作</div>
			</div>
			<div class="cart-body">
				<ul
					class="cart-list"
					v-for="cartInfo in cartInfoList"
					:key="cartInfo.id"
				>
					<li class="cart-list-con1">
						<input
							type="checkbox"
							name="chk_list"
							:checked="cartInfo.isChecked == 1"
							@change="changeCheck($event, cartInfo)"
						/>
					</li>
					<li class="cart-list-con2">
						<img :src="cartInfo.imgUrl" />
						<div class="item-msg">{{ cartInfo.skuName }}</div>
					</li>
					<li class="cart-list-con4">
						<span class="price">{{ cartInfo.cartPrice }}</span>
					</li>
					<li class="cart-list-con5">
						<a
							href="javascript:void(0)"
							class="mins"
							@click="handler('reduce', -1, cartInfo)"
							>-</a
						>
						<input
							autocomplete="off"
							type="text"
							:value="cartInfo.skuNum"
							minnum="1"
							class="itxt"
							@change="handler('write', $event.target.value * 1, cartInfo)"
						/>
						<a
							href="javascript:void(0)"
							class="plus"
							@click="handler('add', 1, cartInfo)"
							>+</a
						>
					</li>
					<li class="cart-list-con6">
						<span class="sum">{{ cartInfo.cartPrice * cartInfo.skuNum }}</span>
					</li>
					<li class="cart-list-con7">
						<a class="sindelet" @click="deleteCartById(cartInfo.skuId)">删除</a>
						<br />
						<a>移到收藏</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="cart-tool">
			<div class="select-all">
				<input
					class="chooseAll"
					type="checkbox"
					:checked="chosen === cartInfoList.length"
					:disabled="cartInfoList.length < 1"
					@click="selectAll"
				/>
				<span>全选</span>
			</div>
			<div class="option">
				<a @click="deleteChecked">删除选中的商品</a>
				<a>移到我的关注</a>
				<a>清除下柜商品</a>
			</div>
			<div class="money-box">
				<div class="chosed"
					>已选择 <span>{{ chosen }}</span
					>件商品</div
				>
				<div class="sumprice">
					<em>总价（不含运费） ：</em>
					<i class="summoney">{{ totalPrice }}</i>
				</div>
				<div class="sumbtn">
					<router-link class="sum-btn" to="/trade">结算</router-link>
				</div>
			</div>
		</div>
		<div class="clearfix"></div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex"
	import throttle from "lodash/throttle"
	export default {
		name: "ShopCart",
		data() {
			return {}
		},
		mounted() {
			this.getData()
		},
		computed: {
			...mapGetters(["cartList"]),
			cartInfoList() {
				return this.cartList.cartInfoList || []
			},
			// 总价
			totalPrice() {
				let total = 0
				this.cartInfoList.forEach(item => {
					if (item.isChecked == 1) {
						total += item.cartPrice * item.skuNum
					}
				})
				return total
			},
			// 被选中的个数
			chosen() {
				let arr = this.cartInfoList.filter(item => {
					return item.isChecked == 1
				})
				return arr.length
			},
		},
		methods: {
			// 发送请求
			getData() {
				this.$store.dispatch("shopCartList")
				// console.log(this.cartInfoList)
			},
			// 改变单个选中状态
			async changeCheck(e, cart) {
				let isChecked = e.target.checked ? 1 : 0
				try {
					await this.$store.dispatch("updateChecked", {
						skuId: cart.skuId,
						isChecked,
					})
					this.getData()
				} catch (error) {
					alert("出错了！")
				}
			},
			// 全选与全不选
			async selectAll(e) {
				let isChecked = e.target.checked ? 1 : 0
				try {
					await this.$store.dispatch("selectAllOption", isChecked)
					this.getData()
				} catch (error) {
					alert("出错了！")
				}
			},
			// 修改购物车商品加购数量
			handler: throttle(async function (type, disNum, cart) {
				switch (type) {
					case "reduce":
						disNum = cart.skuNum > 1 ? -1 : 0
						break
					case "add":
						disNum = 1
						break
					case "write":
						if (isNaN(disNum) || disNum < 1) {
							disNum = 0
						} else {
							disNum = parseInt(disNum) - cart.skuNum
						}
						break
				}
				try {
					await this.$store.dispatch("addOrUpadateShopCart", {
						skuId: cart.skuId,
						skuNum: disNum,
					})
					// 服务器修改购物车数据成功，需要再次请求购物车数据，进行渲染
					this.getData()
				} catch (error) {
					alert("出错了！")
				}
			}, 1000),
			// 删除单个购物车商品
			async deleteCartById(skuId) {
				try {
					await this.$store.dispatch("deleteCart", skuId)
					// 服务器删除购物车数据成功，再次发送请求购物车数据，进行渲染
					this.getData()
				} catch (error) {
					alert("出错了！")
				}
			},
			// 删除购物车选中的商品
			async deleteChecked() {
				try {
					await this.$store.dispatch("deleteAllChecked")
					// 服务器删除购物车数据成功，再次发送请求购物车数据，进行渲染
					this.getData()
				} catch (error) {
					alert("出错了！")
				}
			},
		},
	}
</script>

<style scoped>
	.cart {
		width: 1200px;
		margin: 0 auto;
		margin-bottom: 20px;
	}
	.cart h4 {
		margin: 9px 0;
		font-size: 14px;
		line-height: 21px;
	}
	.cart .cart-main .cart-th {
		background: #f5f5f5;
		border: 1px solid #ddd;
		padding: 10px;
		overflow: hidden;
	}
	.cart .cart-main .cart-th > div {
		float: left;
	}
	.cart .cart-main .cart-th .cart-th1 {
		width: 25%;
	}
	.cart .cart-main .cart-th .cart-th1 input {
		vertical-align: middle;
	}
	.cart .cart-main .cart-th .cart-th1 span {
		vertical-align: middle;
	}
	.cart .cart-main .cart-th .cart-th2 {
		width: 25%;
	}
	.cart .cart-main .cart-th .cart-th3,
	.cart .cart-main .cart-th .cart-th4,
	.cart .cart-main .cart-th .cart-th5,
	.cart .cart-main .cart-th .cart-th6 {
		width: 12.5%;
	}
	.cart .cart-main .cart-body {
		margin: 15px 0;
		border: 1px solid #ddd;
	}
	.cart .cart-main .cart-body .cart-list {
		padding: 10px;
		border-bottom: 1px solid #ddd;
		overflow: hidden;
	}
	.cart .cart-main .cart-body .cart-list > li {
		float: left;
	}
	.cart .cart-main .cart-body .cart-list .cart-list-con1 {
		width: 15%;
	}
	.cart .cart-main .cart-body .cart-list .cart-list-con1 input {
		cursor: pointer;
	}
	.cart .cart-main .cart-body .cart-list .cart-list-con2 {
		width: 35%;
	}
	.cart .cart-main .cart-body .cart-list .cart-list-con2 img {
		width: 82px;
		height: 82px;
		float: left;
	}
	.cart .cart-main .cart-body .cart-list .cart-list-con2 .item-msg {
		float: left;
		width: 150px;
		margin: 0 10px;
		line-height: 18px;
		font-size: 14px;
	}
	.cart .cart-main .cart-body .cart-list .cart-list-con4 {
		width: 10%;
	}
	.cart .cart-main .cart-body .cart-list .cart-list-con5 {
		width: 17%;
	}
	.cart .cart-main .cart-body .cart-list .cart-list-con5 .mins {
		border: 1px solid #ddd;
		border-right: 0;
		float: left;
		color: #666;
		width: 6px;
		text-align: center;
		height: 33px;
		line-height: 33px;
		width: 20px;
	}
	.cart .cart-main .cart-body .cart-list .cart-list-con5 input {
		border: 1px solid #ddd;
		width: 40px;
		height: 33px;
		float: left;
		text-align: center;
		font-size: 14px;
		outline: none;
	}
	.cart .cart-main .cart-body .cart-list .cart-list-con5 .plus {
		border: 1px solid #ddd;
		border-left: 0;
		float: left;
		color: #666;
		width: 6px;
		text-align: center;
		height: 33px;
		line-height: 33px;
		width: 20px;
	}
	.cart .cart-main .cart-body .cart-list .cart-list-con6 {
		width: 10%;
	}
	.cart .cart-main .cart-body .cart-list .cart-list-con6 .sum {
		font-size: 16px;
	}
	.cart .cart-main .cart-body .cart-list .cart-list-con7 {
		width: 13%;
	}
	.cart .cart-main .cart-body .cart-list .cart-list-con7 a {
		color: #666;
	}
	.cart .cart-tool {
		overflow: hidden;
		border: 1px solid #ddd;
		/* line-height: 52px; */
	}
	.cart .cart-tool .select-all {
		padding: 0 10px;
		overflow: hidden;
		float: left;
		height: 52px;
		line-height: 49px;
		box-sizing: border-box;
	}
	.cart .cart-tool .select-all input,
	.cart .cart-tool .select-all span {
		vertical-align: middle;
		cursor: pointer;
	}
	.cart .cart-tool .select-all input {
		vertical-align: middle;
	}
	.cart .cart-tool .option {
		/* padding: 10px; */
		overflow: hidden;
		float: left;
		line-height: 52px;
	}
	.cart .cart-tool .option a {
		float: left;
		padding: 0 10px;
		color: #666;
		cursor: pointer;
	}
	.cart .cart-tool .money-box {
		float: right;
	}
	.cart .cart-tool .money-box .chosed {
		line-height: 52px;
		float: left;
		padding: 0 10px;
	}
	.cart .cart-tool .money-box .sumprice {
		line-height: 52px;
		float: left;
		padding: 0 10px;
	}
	.cart .cart-tool .money-box .sumprice .summoney {
		color: #c81623;
		font-size: 16px;
	}
	.cart .cart-tool .money-box .sumbtn {
		float: right;
	}
	.cart .cart-tool .money-box .sumbtn a {
		display: block;
		position: relative;
		width: 96px;
		height: 52px;
		line-height: 52px;
		color: #fff;
		text-align: center;
		font-size: 18px;
		font-family: "Microsoft YaHei";
		background: #e1251b;
		overflow: hidden;
	}
</style>
