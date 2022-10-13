<template>
	<div class="detail">
		<TypeNav></TypeNav>

		<div class="container">
			<div class="sort">
				<span v-show="categoryView.category1Name">{{
					categoryView.category1Name
				}}</span>
				<span v-show="categoryView.category2Name">{{
					categoryView.category2Name
				}}</span>
				<span v-show="categoryView.category3Name">{{
					categoryView.category3Name
				}}</span>
			</div>
			<div class="main">
				<div class="previewWrap">
					<Zoom :skuImageList="skuImageList"></Zoom>
					<ImageList :skuImageList="skuImageList"></ImageList>
				</div>
				<div class="infoWrap">
					<h3 class="title">{{ skuInfo.skuName }}</h3>
					<p class="news">{{ skuInfo.skuDesc }}</p>
					<div class="priceArea">
						<div class="priceArea1">
							<div class="price">
								<p class="price-title">价格</p>
								<div class="price-info">
									<span class="sign">￥</span>
									<span class="money">{{ skuInfo.price }}</span>
									<span class="message">降价通知</span>
								</div>
							</div>
							<div class="commit">
								<p>累计评价65545</p>
							</div>
						</div>
						<div class="priceArea2">
							<div class="sale">
								<p class="sale-title">促销</p>
								<div class="sale-info">
									<p
										><span class="add-price">加购价</span
										>满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</p
									>
								</div>
							</div>
						</div>
					</div>
					<div class="tips">
						<p
							><span class="tips-title"
								>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span
							>以旧换新，闲置手机回收 4G套餐超值抢 礼品购</p
						>
						<p><span class="tips-title">配 送 至</span>广东省 深圳市 宝安区</p>
					</div>
					<div class="select">
						<dl
							class="color"
							v-for="spuSaleAttr in spuSaleAttrList"
							:key="spuSaleAttr.id"
						>
							<dt class="select-title">{{ spuSaleAttr.saleAttrName }}</dt>
							<!-- <dd class="item active">冰雾白</dd> -->
							<dd
								class="item"
								@click="
									changeStyle(
										spuSaleAttr.spuSaleAttrValueList,
										spuSaleAttrValue
									)
								"
								:class="{ active: spuSaleAttrValue.isChecked == 1 }"
								v-for="spuSaleAttrValue in spuSaleAttr.spuSaleAttrValueList"
								:key="spuSaleAttrValue.id"
								>{{ spuSaleAttrValue.saleAttrValueName }}</dd
							>
						</dl>
					</div>
					<div class="add">
						<div class="add-num">
							<button @click="skuNum++">+</button>
							<input v-model="skuNum" @change="writeSkuNum" />
							<button @click="skuNum > 1 ? skuNum-- : 1">-</button>
						</div>
						<div class="add-car" @click="addShopCart">
							<a>加入购物车</a>
						</div>
					</div>
				</div>
			</div>
			<div class="product-detail">
				<div class="aside">
					<div class="tabWraped">
						<h4 class="kind active">相关分类</h4>
						<h4 class="brand">推荐品牌</h4>
					</div>
					<div class="tabContent">
						<ul class="partList">
							<li>手机</li>
							<li>手机壳</li>
							<li>内存卡</li>
							<li>Iphone配件</li>
							<li>贴膜</li>
							<li>手机耳机</li>
							<li>移动电源</li>
							<li>平板电脑</li>
						</ul>
						<ul class="goodList">
							<li>
								<div class="picture">
									<img src="./images/itemlike01.png" alt="" />
								</div>
								<p>Apple苹果iPhone 6s (A1699)</p>
								<span class="money">￥6088.00</span>
								<a>加入购物车</a>
							</li>
							<li>
								<div class="picture">
									<img src="./images/itemlike01.png" alt="" />
								</div>
								<p>Apple苹果iPhone 6s (A1699)</p>
								<span class="money">￥6088.00</span>
								<a>加入购物车</a>
							</li>
							<li>
								<div class="picture">
									<img src="./images/itemlike01.png" alt="" />
								</div>
								<p>Apple苹果iPhone 6s (A1699)</p>
								<span class="money">￥6088.00</span>
								<a>加入购物车</a>
							</li>
							<li>
								<div class="picture">
									<img src="./images/itemlike01.png" alt="" />
								</div>
								<p>Apple苹果iPhone 6s (A1699)</p>
								<span class="money">￥6088.00</span>
								<a>加入购物车</a>
							</li>
							<li>
								<div class="picture">
									<img src="./images/itemlike01.png" alt="" />
								</div>
								<p>Apple苹果iPhone 6s (A1699)</p>
								<span class="money">￥6088.00</span>
								<a>加入购物车</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="content">
					<div class="fitting">
						<h4 class="title">选择搭配</h4>
						<div class="good-suits">
							<div class="master">
								<img src="./images/l-m01.png" alt="" />
								<p>￥5299</p>
								<span>+</span>
							</div>
							<ul class="suits">
								<li class="suits-item">
									<img src="./images/dp01.png" alt="" />
									<p>Feless费勒斯VR</p>
									<input type="checkbox" name="" id="suit-check" />
									<label for="suit-check">39</label>
								</li>
								<li class="suits-item">
									<img src="./images/dp02.png" alt="" />
									<p>Feless费勒斯VR</p>
									<input type="checkbox" name="" id="suit-check" />
									<label for="suit-check">39</label>
								</li>
								<li class="suits-item">
									<img src="./images/dp03.png" alt="" />
									<p>Feless费勒斯VR</p>
									<input type="checkbox" name="" id="suit-check" />
									<label for="suit-check">39</label>
								</li>
								<li class="suits-item">
									<img src="./images/dp04.png" alt="" />
									<p>Feless费勒斯VR</p>
									<input type="checkbox" name="" id="suit-check" />
									<label for="suit-check">39</label>
								</li>
							</ul>
							<div class="result">
								<p class="result-checked">已选购0件商品</p>
								<p class="result-price">套餐价</p>
								<p class="result-money">￥5299</p>
								<button class="result-add">加入购物车</button>
							</div>
						</div>
					</div>
					<div class="intro">
						<ul class="intro-title">
							<li class="active"><a href="">商品介绍</a></li>
							<li><a href="">规格与包装</a></li>
							<li><a href="">售后保障</a></li>
							<li><a href="">商品评价</a></li>
							<li><a href="">手机社区</a></li>
						</ul>
						<ul class="intro-detail">
							<li>分辨率：1920*1080(FHD)</li>
							<li>后置摄像头：1200万像素</li>
							<li>前置摄像头：500万像素</li>
							<li>核 数：其他</li>
							<li>频 率：以官网信息为准</li>
							<li>品牌： Apple</li>
							<li>商品名称：APPLEiPhone 6s Plus</li>
							<li>商品编号：1861098</li>
							<li>商品毛重：0.51kg</li>
							<li>商品产地：中国大陆</li>
							<li>热点：指纹识别，Apple Pay，金属机身，拍照神器</li>
							<li>系统：苹果（IOS）</li>
							<li>像素：1000-1600万</li>
							<li>机身内存：64GB</li>
						</ul>
						<img src="./images/intro01.png" alt="" />
						<img src="./images/intro02.png" alt="" />
						<img src="./images/intro03.png" alt="" />
					</div>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
</template>

<script>
	import TypeNav from "@/components/TypeNav"
	import Zoom from "@/views/Detail/zoom"
	import ImageList from "@/views/Detail/imageList"
	import { mapGetters, mapState } from "vuex"

	export default {
		name: "Detail",
		data() {
			return {
				skuNum: 1,
			}
		},
		components: { TypeNav, Zoom, ImageList },
		mounted() {
			this.$store.dispatch("goodInfo", this.$route.params.skuid)
		},
		computed: {
			...mapGetters(["categoryView", "skuInfo", "spuSaleAttrList"]),
			skuImageList() {
				return this.skuInfo.skuImageList || []
			},
		},
		methods: {
			// 商品属性被选择时，改变边框样式
			changeStyle(arr, spuSaleAttrValue) {
				// 排他法
				arr.forEach(item => {
					item.isChecked = "0"
				})
				spuSaleAttrValue.isChecked = "1"
			},
			writeSkuNum(e) {
				let value = e.target.value * 1
				if (isNaN(value) || value < 1) {
					this.skuNum = 1
				} else {
					this.skuNum = parseInt(value)
				}
			},
			// 加入购物车
			async addShopCart() {
				try {
					await this.$store.dispatch("addOrUpadateShopCart", {
						skuId: this.$route.params.skuid,
						skuNum: this.skuNum,
					})
					// 服务器加入购物车成功，可以进行路由跳转了
					this.$router.push({
						name: "addCartSuccess",
					})
				} catch (error) {
					alert("出错了！")
				}
				// 获取加入购物车商品的属性信息并存贮为字符串
				let detail = ""
				let arr = this.spuSaleAttrList
				arr.forEach(item => {
					item.spuSaleAttrValueList.forEach(child => {
						if (child.isChecked == 1) {
							// console.log(child.saleAttrName, child.saleAttrValueName)
							detail += `${child.saleAttrValueName} `
						}
					})
				})
				let addCartSuccessData = {
					img: this.skuInfo.skuDefaultImg,
					title: this.skuInfo.skuName,
					detail,
					num: this.skuNum,
				}
				sessionStorage.setItem(
					"addCartSuccessData",
					JSON.stringify(addCartSuccessData)
				)
			},
		},
	}
</script>

<style scoped>
	.clearfix {
		clear: both;
	}
	.sort {
		margin: 20px 0;
	}
	.sort span {
		font-size: 12px;
		color: #333;
	}
	.sort span:not(.sort span:first-of-type)::before {
		content: "/\a0";
		padding: 0 5px;
		color: #ccc;
	}
	.main {
		display: flex;
		justify-content: space-between;
		height: 460px;
	}
	.main .previewWrap {
		width: 400px;
		/* background-color: palegoldenrod; */
	}
	.main .infoWrap {
		width: 700px;
	}
	.main .infoWrap .title {
		font-size: 14px;
	}
	.main .infoWrap .news {
		color: #e12228;
		font-size: 12px;
		margin: 15px 0 10px 0;
	}
	.main .infoWrap .priceArea {
		background: #fee9eb;
		padding: 10px 7px;
		margin: 13px 0;
	}
	.priceArea {
		font-size: 12px;
		color: #333;
	}
	.priceArea1 {
		display: flex;
		justify-content: space-between;
	}
	.price-title,
	.sale-title {
		letter-spacing: 1.5rem;
		line-height: 40px;
	}
	.price {
		display: flex;
		line-height: 40px;
	}
	.priceArea1 .price-info {
		color: #c81623;
	}
	.priceArea1 .sign {
		font-size: 16px;
	}
	.priceArea1 .money {
		font-size: 24px;
		font-weight: 700;
	}
	.priceArea1 .message {
		font-size: 12px;
	}
	.priceArea2 .sale {
		display: flex;
	}
	.priceArea2 .sale .add-price {
		background-color: #c81623;
		color: #fff;
		padding: 3px;
	}
	.sale-info {
		line-height: 30px;
	}
	.sale-info p {
		width: 500px;
	}
	.tips {
		color: #999;
		font-size: 12px;
		line-height: 36px;
		padding-bottom: 10px;
		border-bottom: 1px solid #ededed;
	}
	.tips p {
		display: flex;
	}
	.tips .tips-title {
		width: 60px;
		color: #333;
		display: flex;
		justify-content: space-between;
	}
	.infoWrap .select {
		font-size: 12px;
		color: #333;
		margin: 20px 0 0 0;
	}
	.infoWrap .color,
	.infoWrap .version {
		display: flex;
		margin-bottom: 15px;
	}
	.infoWrap .select .item {
		color: #666;
		border-top: 1px solid #eee;
		border-right: 1px solid #bbb;
		border-bottom: 1px solid #bbb;
		border-left: 1px solid #eee;
		display: block;
		padding: 2px 14px;
		line-height: 24px;
		margin-right: 20px;
		line-height: 24px;
		/* cursor: pointer; */
	}
	.infoWrap .select-title {
		margin-right: 20px;
		line-height: 30px;
	}
	.infoWrap .select .active {
		color: green;
		border: 1px solid green;
	}
	.infoWrap .add {
		display: flex;
		margin-top: 20px;
	}
	.infoWrap .add-num {
		width: 140px;
		font-size: 0;
	}
	.infoWrap .add-num input {
		width: 20px;
		height: 32px;
		padding: 0 10px;
		outline: none;
		text-align: center;
		border: 1px solid #bbb;
		border-left: none;
		border-right: none;
	}
	.infoWrap .add-num button {
		height: 32px;
		box-sizing: content-box;
		padding: 0 10px;
		border: 1px solid #bbb;
		cursor: pointer;
	}
	.infoWrap .add-car {
		background-color: #e1251b;
		padding: 0 25px;
		font-size: 16px;
		color: #fff;
		height: 34px;
		line-height: 34px;
		display: block;
		cursor: pointer;
	}
	.product-detail {
		margin: 30px 0;
	}
	.product-detail .aside {
		width: 210px;
		float: left;
		border: 1px solid #ccc;
	}
	.product-detail .aside .tabWraped {
		font-weight: 400;
		display: flex;
	}
	.product-detail .aside .tabWraped h4 {
		display: block;
		flex: 1;
		border-bottom: 1px solid #ccc;
		line-height: 37px;
		text-align: center;
		font-size: 12px;
		color: #333;
	}
	.product-detail .aside .tabWraped h4.active {
		border-top: 3px solid #e1251b;
		border-bottom: none;
		font-weight: 400;
	}
	.product-detail .aside .partList {
		display: flex;
		flex-wrap: wrap;
		font-size: 12px;
		color: #333;
		padding: 0 10px;
	}
	.product-detail .aside .partList li {
		width: 95px;
		border-bottom: 1px dashed #ededed;
		line-height: 28px;
		white-space: nowrap;
	}
	.product-detail .aside .goodList {
		font-size: 12px;
		color: #333;
	}
	.product-detail .aside .goodList li {
		border-bottom: 1px dashed #ededed;
		margin-bottom: 20px;
		padding: 0 10px;
	}
	.product-detail .aside .goodList li .picture {
		width: 152px;
		height: 133px;
		margin: 0 auto;
	}
	.product-detail .aside .goodList li .picture img {
		width: 100%;
		height: 100%;
	}
	.product-detail .aside .goodList .money {
		font-size: 16px;
		color: #c81623;
	}
	.product-detail .aside .goodList a {
		width: 60px;
		padding: 2px 14px;
		line-height: 18px;
		border: 1px solid #8c8c8c;
		color: #8c8c8c;
		display: block;
		margin: 10px auto;
		cursor: pointer;
	}
	.product-detail .aside .goodList a:hover {
		color: #c81623;
		text-decoration: underline;
	}
	.product-detail .content {
		width: 980px;
		float: left;
		margin-left: 8px;
	}
	.product-detail .content .fitting {
		border: 1px solid #ddd;
	}
	.product-detail .content .title {
		border-bottom: 1px solid #ddd;
		background: #f1f1f1;
		color: #333;
		padding: 5px 0 5px 15px;
		font-size: 12px;
	}
	.product-detail .content .good-suits {
		font-size: 12px;
		color: #333;
		display: flex;
		padding: 10px 0;
	}
	.product-detail .content .good-suits .master {
		width: 140px;
		font-size: 16px;
		position: relative;
	}
	.product-detail .content .good-suits .master img {
		width: 87px;
		height: 128px;
		display: block;
		margin: 0 auto;
	}
	.product-detail .content .good-suits .master p {
		color: #c81623;
		font-weight: 700;
		text-align: center;
		margin-top: 10px;
	}
	.product-detail .content .good-suits .master span {
		position: absolute;
		top: 50%;
		margin-top: -10px;
		line-height: 20px;
		right: -6px;
	}
	.product-detail .content .good-suits .suits {
		flex: 1;
		display: flex;
	}
	.product-detail .content .good-suits .suits .suits-item {
		flex: 1;
		text-align: center;
	}
	.product-detail .content .good-suits .suits .suits-item p {
		margin-top: 10px;
	}
	.product-detail .content .good-suits .suits .suits-item input {
		vertical-align: middle;
	}
	.product-detail .content .good-suits .suits .suits-item label {
		vertical-align: middle;
	}
	.product-detail .content .good-suits .suits .suits-item img {
		width: 120px;
		height: 130px;
		display: block;
		margin: 0 auto;
	}
	.product-detail .content .good-suits .result {
		width: 175px;
		border-left: 1px solid #ddd;
	}
	.product-detail .content .good-suits .result .result-checked {
		font-size: 14px;
		margin-bottom: 10px;
		margin-top: 10px;
	}
	.product-detail .content .good-suits .result .result-price {
		font-weight: 700;
		margin-bottom: 10px;
	}
	.product-detail .content .good-suits .result .result-money {
		color: #b1191a;
		font-size: 16px;
		margin-bottom: 10px;
	}
	.product-detail .content .good-suits .result .result-add {
		background-color: #e1251b;
		border: 1px solid #e1251b;
		padding: 10px 25px;
		font-size: 16px;
		color: #fff;
		display: inline-block;
		box-sizing: border-box;
	}
	.product-detail .intro-title {
		display: flex;
	}
	.product-detail .intro-title a {
		color: #666;
	}
	.product-detail .intro {
		margin-top: 20px;
		font-size: 0;
	}
	.product-detail .intro-title {
		background: #ededed;
	}
	.product-detail .intro-title li {
		padding: 0 11px;
		height: 40px;
		line-height: 40px;
		color: #666;
		font-size: 12px;
		background: #fcfcfc;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		border-right: 1px solid #ddd;
		cursor: pointer;
	}
	.product-detail .intro-title li.active,
	.product-detail .intro-title li.active a {
		padding: 0 11px;
		height: 40px;
		line-height: 40px;
		background: #e1251b;
		color: #fff;
	}
	.product-detail .intro-detail li {
		font-size: 12px;
		color: #333;
		line-height: 26px;
		margin-left: 10px;
	}
</style>
