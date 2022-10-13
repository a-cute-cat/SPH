<template>
	<div class="cart-complete-wrap">
		<div class="cart-complete">
			<h3><i class="iconfont icon-chenggong"></i>商品已成功加入购物车！</h3>
			<div class="goods">
				<div class="left-good">
					<div class="left-pic">
						<img :src="addCartSuccessData.img" />
					</div>
					<div class="right-info">
						<p class="title"
							>{{ addCartSuccessData.title }}阿达鹌鹑蛋充电器安达市传递传递</p
						>
						<p class="attr"
							>{{ addCartSuccessData.detail }}
							<span>数量:{{ addCartSuccessData.num }}</span></p
						>
					</div>
				</div>
				<div class="right-gocart">
					<a class="sui-btn btn-xlarge" @click="$router.back()"
						>查看商品详情 ></a
					>
					<router-link to="/shopCart"> 去购物车结算 > </router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "AddCartSuccess",
		computed: {
			addCartSuccessData() {
				return JSON.parse(sessionStorage.getItem("addCartSuccessData"))
			},
		},
	}
</script>

<style scoped>
	.cart-complete-wrap {
		background-color: #f4f4f4;
	}

	.cart-complete {
		width: 1200px;
		margin: 0 auto;
	}

	h3 {
		font-weight: 400;
		font-size: 16px;
		color: #6aaf04;
		padding-top: 15px;
		padding-bottom: 15px;
		margin: 0;
	}

	.icon-pc-right {
		background-color: #fff;
		border: 2px solid #6aaf04;
		padding: 3px;
		margin-right: 8px;
		border-radius: 15px;
	}

	.goods {
		overflow: hidden;
		padding: 10px 0;
		display: flex;
		justify-content: space-between;
	}

	.left-pic {
		border: 1px solid #dfdfdf;
		width: 60px;
		float: left;
	}
	.left-pic img {
		width: 60px;
		height: 60px;
	}

	.right-info {
		color: #444;
		float: left;
		margin-left: 10px;
	}

	.title {
		max-width: 700px;
		line-height: 28px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 14px;
	}

	.attr {
		color: #aaa;
		font-size: 12px;
		line-height: 20px;
		margin: 10px 0;
	}

	.attr span {
		color: #e1251b;
		margin-left: 20px;
	}
	.right-gocart {
		display: flex;
		align-items: center;
	}

	a {
		height: 34px;
		padding: 0px 36px;
		font-size: 15px;
		line-height: 34px;
		color: #333;
		background-color: #eee;
		text-decoration: none;
		box-sizing: border-box;
		border: 1px solid #e1e1e1;
		display: block;
		text-align: center;
		margin-left: 20px;
		cursor: pointer;
	}

	a:hover {
		color: #fff;
		background-color: #e1251b;
		/* background-color: #f7f7f7; */
		border: 1px solid #eaeaea;
	}

	a:active {
		background-color: #e1e1e1;
		border: 1px solid #d5d5d5;
	}

	.btn-danger {
		background-color: #e1251b;
		color: #fff;
	}

	.btn-danger:hover {
		background-color: #e1251b;
	}
</style>
