<template>
	<div>
		<TypeNav></TypeNav>
		<div class="search">
			<div class="container">
				<div class="result">
					<div class="result-tips">
						<a href="">全部结果</a>
					</div>
					<ul class="result-list">
						<li class="result-list-item" v-if="searchParams.categoryName"
							>{{ searchParams.categoryName
							}}<span @click="removeCategoryName">&times;</span></li
						>
						<li class="result-list-item" v-if="searchParams.keyword"
							>{{ searchParams.keyword
							}}<span @click="removeKeyword">&times;</span></li
						>
						<li class="result-list-item" v-if="searchParams.trademark"
							>{{ searchParams.trademark.split(":")[1]
							}}<span @click="removeTradeMark">&times;</span></li
						>
						<li
							class="result-list-item"
							v-for="item in searchParams.props"
							:key="item.index"
							>{{ item.split(":")[2] + "：" + item.split(":")[1]
							}}<span @click="removeAttr(item.index)">&times;</span></li
						>
					</ul>
				</div>
				<div class="selector">
					<SearchSelector
						@tradeMarkInfo="tradeMarkInfo"
						@attrInfo="attrInfo"
					></SearchSelector>
				</div>
				<div class="product">
					<div class="sort">
						<ul class="sort-list">
							<li :class="{ checked: isOne }" @click="changeOrder(1)"
								>综合
								<span
									v-show="isOne"
									class="iconfont"
									:class="{
										'icon-jiantou_qiehuanxiangshang': isAsc,
										'icon-jiantou_qiehuanxiangxia': isDesc,
									}"
								></span>
							</li>
							<li>销量</li>
							<li>新品</li>
							<li>评价</li>
							<li :class="{ checked: isTwo }" @click="changeOrder(2)"
								>价格
								<span
									v-show="isTwo"
									class="iconfont"
									:class="{
										'icon-jiantou_qiehuanxiangshang': isAsc,
										'icon-jiantou_qiehuanxiangxia': isDesc,
									}"
								></span>
							</li>
						</ul>
					</div>
					<div class="product-list">
						<ul class="col">
							<li v-for="item in goodsList" :key="item.id">
								<div class="picture">
									<a href="">
										<router-link :to="`/detail/${item.id}`">
											<img v-lazy="item.defaultImg" alt="" />
										</router-link>
									</a>
								</div>
								<h3 class="price">￥{{ item.price }}</h3>
								<div class="attr">
									<a href="">{{ item.title }}</a>
								</div>
								<p class="commit">已有<span>2000</span>人评价</p>
								<div class="operate">
									<a class="car" href="">加入购物车</a>
									<a class="collect" href="">收藏</a>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<Pagination
					:pageNo="searchParams.pageNo"
					:pageSize="searchParams.pageSize"
					:total="total"
					:continues="5"
				></Pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import SearchSelector from "./searchSelector"
	import { mapGetters, mapState } from "vuex"
	export default {
		name: "Search",
		data() {
			return {
				searchParams: {
					category1Id: "",
					category2Id: "",
					category3Id: "",
					categoryName: "",
					keyword: "",
					order: "1:desc",
					// 1:综合 2：价格 asc：升序 desc：降序
					pageNo: 1,
					pageSize: 5,
					props: [],
					trademark: "",
				},
			}
		},
		components: {
			SearchSelector,
		},
		methods: {
			getData() {
				this.$store.dispatch("searchInfo", this.searchParams)
			},
			// 删除面包屑分类
			removeCategoryName() {
				this.searchParams.categoryName = undefined
				this.searchParams.category1Id = undefined
				this.searchParams.category2Id = undefined
				this.searchParams.category3Id = undefined
				this.getData()
				// 路由跳转，不带参数自己跳自己，改变导航栏地址
				if (this.$route.params) {
					this.$router.push({ name: "search", params: this.$route.params })
				}
			},
			// 删除面包屑关键字
			removeKeyword() {
				this.searchParams.keyword = undefined
				this.getData()
				// 路由跳转，不带参数自己跳自己，改变导航栏地址
				if (this.$route.query) {
					this.$router.push({ name: "search", query: this.$route.query })
				}
				// 通过全局事件总线触发clear事件
				this.$bus.$emit("clear")
			},
			// 自定义函数
			tradeMarkInfo(trademark) {
				this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
				this.getData()
			},
			// 删除面包屑trademark
			removeTradeMark() {
				this.searchParams.trademark = undefined
				this.getData()
			},
			// 自定义函数
			attrInfo(attr, attrValue) {
				// console.log(attr.attrId, attr.attrName, attrValue);
				let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
				if (this.searchParams.props.indexOf(props) === -1) {
					this.searchParams.props.push(props)
				}
				this.getData()
			},
			// 删除面包屑attr
			removeAttr(index) {
				this.searchParams.props.splice(index, 1)
				this.getData()
			},
			changeOrder(flag) {
				let origin = this.searchParams.order.split(":")
				let originSort = origin[0]
				let originOder = origin[1]
				if ("" + flag === originSort) {
					this.searchParams.order = `${originSort}:${
						originOder === "desc" ? "asc" : "desc"
					}`
				} else {
					this.searchParams.order = `${flag}:${originOder}`
				}
				this.getData()
			},
		},
		beforeMount() {
			Object.assign(this.searchParams, this.$route.query, this.$route.params)
		},
		mounted() {
			this.getData()
			this.$bus.$on("changePage", num => {
				this.searchParams.pageNo = num
				this.getData()
			})
			this.$bus.$on("changeSize", size => {
				this.searchParams.pageSize = size
				this.searchParams.pageNo = 1
				this.getData()
			})
			this.$bus.$on("backNext", num => {
				this.searchParams.pageNo += num
				this.getData()
			})
		},
		computed: {
			...mapGetters(["goodsList"]),
			...mapState({
				total: state => state.search.searchList.total
			}),
			isOne() {
				return this.searchParams.order.split(":")[0] === "1"
			},
			isTwo() {
				return this.searchParams.order.split(":")[0] === "2"
			},
			isAsc() {
				return this.searchParams.order.split(":")[1] === "asc"
			},
			isDesc() {
				return this.searchParams.order.split(":")[1] === "desc"
			},
		},
		watch: {
			// 监听路由变化，路由变化说明参数变化，此时重新发送请求
			$route(newVal, oldVal) {
				Object.assign(this.searchParams, this.$route.query, this.$route.params)
				this.getData()
				this.searchParams.category1Id = ""
				this.searchParams.category2Id = ""
				this.searchParams.category3Id = ""
			},
		},
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
		list-style: none;
		text-decoration: none;
	}
	.container {
		width: 1200px;
		margin: 0 auto;
	}
	.search {
		padding: 10px 0;
	}
	.result {
		display: flex;
		flex-wrap: wrap;
		font-size: 12px;
	}
	.result-tips {
		padding: 0 20px 0 0;
		margin: 5px 0;
	}
	.result-tips a {
		color: #666;
	}
	.result-tips a:hover {
		color: #007aff;
	}
	.result-list {
		display: flex;
		flex-wrap: wrap;
	}
	.result-list-item {
		padding: 0 7px;
		color: #000;
		border: 1px solid #dedede;
		margin: 4px 7px 4px 0;
		cursor: pointer;
		background: #f7f7f7;
	}
	.result-list-item:hover {
		color: #007aff;
	}
	.result-list-item span {
		padding-left: 17px;
	}
	.selector {
		margin: 20px 0;
	}
	.sort {
		border: 1px solid #dedede;
		font-size: 0;
	}
	.sort-list {
		font-size: 12px;
		color: #777;
		display: flex;
		margin: 0;
	}
	.sort-list li {
		padding: 11px 15px;
		cursor: pointer;
	}
	.sort-list li span {
		font-size: 16px;
		position: relative;
		top: 0.2rem;
	}
	.checked {
		color: #fff;
		background: #e1251b;
	}
	.product-list {
		margin: 40px -25px 30px 0;
	}
	.product-list ul {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	.product-list ul li {
		margin: 0 25px 20px 0;
		width: 220px;
		/* background-color: plum; */
	}
	.picture {
		width: 90%;
		height: 200px;
		margin: 0 auto;
	}
	.picture img {
		width: 100%;
		height: 100%;
	}
	.price {
		font-size: 18px;
		color: #c81623;
		font-weight: 700;
	}
	.attr {
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		height: 40px;
	}
	.attr a {
		color: #333;
		text-decoration: none;
		font-size: 12px;
		line-height: 20px;
	}
	.commit {
		font-size: 13px;
		color: #a7a7a7;
		margin: 10px 0;
	}
	.commit span {
		font-weight: 700;
		color: #646fb0;
	}
	.operate {
		display: flex;
		font-size: 12px;
		justify-content: space-between;
	}
	.operate a {
		text-decoration: none;
		line-height: 12px;
		text-align: center;
	}
	.car {
		border: 1px solid #e1251b;
		color: #e1251b;
		padding: 5px 14px;
		display: block;
	}
	.car:hover {
		background-color: #e1251b;
		color: #fff;
	}
	.collect {
		border: 1px solid #8c8c8c;
		color: #8c8c8c;
		padding: 5px 28px;
		display: block;
	}
	.collect:hover {
		background-color: #666;
		color: #fff;
	}
</style>
