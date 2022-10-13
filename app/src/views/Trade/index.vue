<template>
	<div class="trade-container">
		<h3 class="title">填写并核对订单信息</h3>
		<div class="content">
			<h5 class="receive">收件人信息</h5>
			<div
				class="address clearFix"
				v-for="adress in adressInfo"
				:key="adress.id"
			>
				<span class="username" :class="{ selected: adress.isDefault == 1 }">{{
					adress.consignee
				}}</span>
				<p @click="changeAdress(adress, adressInfo)">
					<span class="s1">{{ adress.fullAddress }}</span>
					<span class="s2">{{ adress.phoneNum }}</span>
					<span class="s3" v-show="adress.isDefault == 1">默认地址</span>
				</p>
			</div>
			<div class="line"></div>
			<h5 class="pay">支付方式</h5>
			<div class="address clearFix">
				<span class="username selected">在线支付</span>
				<span class="username" style="margin-left: 5px">货到付款</span>
			</div>
			<div class="line"></div>
			<h5 class="pay">送货清单</h5>
			<div class="way">
				<h5>配送方式</h5>
				<div class="info clearFix">
					<span class="s1">天天快递</span>
					<p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
				</div>
			</div>
			<div class="detail">
				<h5>商品清单</h5>
				<ul
					class="list clearFix"
					v-for="detail in detailArrayList"
					:key="detail.id"
				>
					<li>
						<img :src="detail.imgUrl" alt="" />
					</li>
					<li class="item-title">
						<p>{{ detail.skuName }}</p>
						<h4>7天无理由退货</h4>
					</li>
					<li>
						<h3>￥{{ detail.orderPrice }}</h3>
					</li>
					<li>X{{ detail.skuNum }}</li>
					<li>有货</li>
				</ul>
			</div>
			<div class="bbs">
				<h5>买家留言：</h5>
				<textarea
					placeholder="建议留言前先与商家沟通确认"
					class="remarks-cont"
					v-model="message"
				></textarea>
			</div>
			<div class="line"></div>
			<div class="bill">
				<h5>发票信息：</h5>
				<div>普通发票（电子） 个人 明细</div>
				<h5>使用优惠/抵用</h5>
			</div>
		</div>
		<div class="money clearFix">
			<ul>
				<li>
					<p
						><i>{{ orderInfo.totalNum }}</i
						>件商品，总商品金额</p
					>
					<span>¥{{ orderInfo.originalTotalAmount }}</span>
				</li>
				<li>
					<p>返现：</p>
					<span>0.00</span>
				</li>
				<li>
					<p>运费：</p>
					<span>0.00</span>
				</li>
			</ul>
		</div>
		<div class="trade">
			<div class="price"
				>应付金额:　<span>¥{{ orderInfo.totalAmount }}</span></div
			>
			<div class="receiveInfo">
				寄送至:
				<span>{{ sendAdress.fullAddress }}</span>
				收货人：<span>{{ sendAdress.consignee }}</span>
				<span>{{ sendAdress.phoneNum }}</span>
			</div>
		</div>
		<div class="sub clearFix">
			<a class="subBtn" @click="submitOrder">提交订单</a>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: "Trade",
		data() {
			return {
				message: "",
				orderId: "",
				adressInfo: [
					{id: 1001, isDefault: "1", consignee: "占海燕", fullAddress: "湖北省武汉市江夏区湖北经济学院", phoneNum: "13628646891"},
					{id: 1002, isDefault: "0", consignee: "小龙虾", fullAddress: "湖广东惠州", phoneNum: "10086"},
					{id: 1003, isDefault: "0", consignee: "喜羊羊", fullAddress: "安徽合肥", phoneNum: "1010"}
				]
			}
		},
		mounted() {
			this.$store.dispatch("userAdress")
			this.$store.dispatch("orderInfo")
		},
		computed: {
			...mapState({
				// adressInfo: state => state.trade.adress,
				orderInfo: state => state.trade.orderInfo,
				tradeNo: state => state.trade.orderInfo.tradeNo,
				detailArrayList: state => state.trade.orderInfo.detailArrayList,
			}),
			// 用户选中的地址
			sendAdress() {
				return this.adressInfo.find(item => item.isDefault == 1) || {}
			},
		},
		methods: {
			changeAdress(adress, adressInfo) {
				adressInfo.forEach(item => {
					item.isDefault = "0"
				})
				adress.isDefault = "1"
			},
			async submitOrder() {
				let {tradeNo} = this;
				let data = {
					consignee: this.sendAdress.consignee,
					consigneeTel: this.sendAdress.consigneeTel,
					deliveryAddress: this.sendAdress.fullAddress,
					paymentWay: "ONLINE",
					orderComment: this.message,
					orderDetailList: this.orderInfo.detailArrayList
				}
				let result = await this.$API.reqSubmitOrder(tradeNo, data)
				if (result.code === 200) {
					console.log(result)
					this.orderId = result.data;
					this.$router.push(`/pay?orderId=${this.orderId}`)
				} else {
					alert("出错了！")
				}
			},
		},
	}
</script>

<style scoped>
	.trade-container {
		font-size: 14px;
	}
	.trade-container .title {
		width: 1200px;
		margin: 0 auto;
		font-size: 14px;
		line-height: 21px;
	}
	.trade-container .content {
		width: 1200px;
		margin: 10px auto 0;
		border: 1px solid #dddddd;
		padding: 25px;
		box-sizing: border-box;
	}
	.trade-container .content .receive,
	.trade-container .content .pay {
		line-height: 36px;
		margin: 18px 0;
	}
	.trade-container .content .address {
		height: 32px;
		padding-left: 20px;
		margin-bottom: 15px;
		display: flex;
	}
	.trade-container .content .address .username {
		width: 100px;
		height: 32px;
		line-height: 32px;
		text-align: center;
		border: 1px solid #ddd;
		box-sizing: border-box;
		position: relative;
	}
	.trade-container .content .address .username::after {
		content: "";
		display: none;
		width: 13px;
		height: 13px;
		position: absolute;
		right: 0;
		bottom: 0;
		background: url(./images/choosed.png) no-repeat;
	}
	.trade-container .content .address .username.selected {
		border-color: #e1251b;
	}
	.trade-container .content .address .username.selected::after {
		display: block;
	}
	.trade-container .content .address p {
		width: 610px;
		line-height: 32px;
		margin-left: 10px;
		padding-left: 5px;
		cursor: pointer;
	}
	.trade-container .content .address p .s2 {
		margin: 0 5px;
	}
	.trade-container .content .address p .s3 {
		padding: 2px 5px;
		margin-left: 10px;
		background-color: #878787;
		color: #fff;
		text-align: center;
		font-size: 12px;
	}
	.trade-container .content .address p:hover {
		background-color: #ddd;
	}
	.trade-container .content .line {
		height: 1px;
		background-color: #ddd;
	}
	.trade-container .content .way {
		width: 1080px;
		height: 110px;
		background: #f4f4f4;
		padding: 15px;
		margin: 0 auto;
	}
	.trade-container .content .way h5 {
		line-height: 50px;
	}
	.trade-container .content .way .info {
		margin-top: 20px;
	}
	.trade-container .content .way .info .s1 {
		float: left;
		border: 1px solid #ddd;
		width: 120px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		margin-right: 10px;
	}
	.trade-container .content .way .info p {
		line-height: 30px;
	}
	.trade-container .content .detail {
		width: 1080px;
		background: #feedef;
		padding: 15px;
		margin: 2px auto 0;
	}
	.trade-container .content .detail h5 {
		line-height: 50px;
	}
	.trade-container .content .detail .list {
		height: 130px;
		display: flex;
		justify-content: space-between;
	}
	.trade-container .content .detail .list img {
		width: 80px;
		height: 80px;
		background-color: #fff;
	}
	.trade-container .content .detail .list li {
		line-height: 30px;
	}
	.trade-container .content .detail .list li p {
		margin-bottom: 20px;
	}
	.trade-container .content .detail .list li h4 {
		color: #c81623;
		font-weight: 400;
	}
	.trade-container .content .detail .list li h3 {
		color: #e12228;
	}
	.trade-container .content .bbs {
		margin-bottom: 15px;
	}
	.trade-container .content .bbs h5 {
		line-height: 50px;
	}
	.trade-container .content .bbs textarea {
		width: 100%;
		border-color: #e4e2e2;
		line-height: 1.8;
		outline: none;
		resize: none;
	}
	.trade-container .content .bill h5 {
		line-height: 50px;
	}
	.trade-container .content .bill div {
		padding-left: 15px;
	}
	.trade-container .money {
		width: 1200px;
		color: #333;
		font-weight: 100;
		height: 100px;
		margin: 20px auto;
	}
	.trade-container .money ul {
		width: 220px;
		float: right;
	}
	.trade-container .money ul li {
		line-height: 30px;
		display: flex;
		justify-content: space-between;
	}
	.trade-container .money ul li i {
		color: red;
		padding: 0 4px;
		font-weight: 500;
	}
	.trade-container .trade {
		box-sizing: border-box;
		width: 1200px;
		padding: 10px;
		margin: 10px auto;
		text-align: right;
		background-color: #f4f4f4;
		border: 1px solid #ddd;
	}
	.trade-container .trade div {
		line-height: 30px;
	}
	.trade-container .trade .price span {
		color: #e12228;
		font-weight: 700;
		font-size: 14px;
	}
	.trade-container .trade .receiveInfo {
		color: #999;
	}
	.trade-container .sub {
		width: 1200px;
		margin: 0 auto 10px;
		display: flex;
		justify-content: end;
	}
	.trade-container .sub .subBtn {
		width: 164px;
		height: 56px;
		font: 700 18px "微软雅黑";
		line-height: 56px;
		text-align: center;
		color: #fff;
		background-color: #e1251b;
	}
	.trade-container .content .detail .list li.item-title {
		width: 700px;
		/* background-color: paleturquoise; */
	}
	.trade-container .content .detail .list li.item-title p {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
