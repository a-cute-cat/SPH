<template>
	<div id="footer">
		<div class="container">
			<div class="footer-list" v-show="$route.path !== '/login' && $route.path !== '/register'">
				<div v-for="list in footerList" :key="list.index">
					<h4>{{list.title}}</h4>
					<ul>
						<li v-for="(item, index) in list.items" :key="index">{{item}}</li>
					</ul>
				</div>
				<div>
					<h4>帮助中心</h4>
					<img src="./images/wx_cz.jpg" alt="" />
				</div>
			</div>
			<div class="footer-tips">
				<ul class="tips-list">
					<li v-for="item in footerTips" :key="item.index">{{item}}</li>
				</ul>
				<p>地址：北京市昌平区宏福科技园综合楼6层</p>
				<p>京ICP备19006430号</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Footer",
	data() {
		return {
			footerList: [
				{ title: '购物指南', items: ['购物流程', '会员介绍', '生活旅行/团购', '常见问题', '购物指南'] },
				{ title: '配送方式', items: ['上门自提', '211限时达', ' 配送服务查询', '配送费收取标准', '海外配送'] },
				{ title: '支付方式', items: ['货到付款', '在线支付', '分期付款', '邮局汇款', '公司转账'] },
				{ title: '售后服务', items: ['售后政策', '价格保护', '退款说明', '返修/退换货', '取消订单'] },
				{ title: '特殊服务', items: ['夺宝岛', 'DIY装机', '延保服务', '尚品汇E卡', '尚品汇通信'] },
			],
			footerTips: ['关于我们','联系我们','关于我们','商家入驻','营销中心','友情链接','关于我们','营销中心','友情链接','关于我们']
		}
	}
}
</script>

<style scoped>
#footer {
	background-color: #eaeaea;
}

.footer-list {
	display: flex;
	justify-content: space-between;
	padding: 20px;
	border-bottom: 1px solid #b3aeae;
}

.footer-list h4 {
	font-size: 16px;
	font-weight: 400;
	padding: 8px 0;
}

.footer-list ul {
	font-size: 12px;
}

.footer-list ul li {
	padding: 2px 0;
	color: #333333;
}

.footer-tips {
	font-size: 12px;
	padding: 20px;
}

.tips-list {
	margin: 0 auto;
	display: flex;
	justify-content: center;
}

.tips-list li {
	padding: 0 10px;
	border-left: 1px solid #b3aeae;
}

.tips-list li:first-of-type {
	border-left: none;
}

.footer-tips p {
	text-align: center;
	padding: 10px 0;
}
</style>
