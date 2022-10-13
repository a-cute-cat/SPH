<template>
	<div class="SearchSelector">
		<div class="col brand">
			<div class="title">品牌</div>
			<ul class="content">
				<li class="brand-item" v-for="trademark in trademarkList" :key="trademark.tmId" @click="tradeMarkHandler(trademark)">{{trademark.tmName}}</li>
			</ul>
			<div class="other">
				<a href="" class="multiple">多选</a>
				<a href="" class="more">更多</a>
			</div>
		</div>
		<div class="col" v-for="attr in attrsList" :key="attr.attrId">
			<div class="title">{{attr.attrName}}</div>
			<ul class="content">
				<li v-for="item in attr.attrValueList" :key="item.index" @click="attrHandler(attr, item)">{{item}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
	export default {
		name: "SearchSelector",
		computed: {
			...mapGetters(['trademarkList', 'attrsList'])
		},
		methods: {
			tradeMarkHandler(trademark) {
				this.$emit('tradeMarkInfo', trademark);
			},
			attrHandler(attr, attrValue) {
				this.$emit('attrInfo', attr, attrValue)
			}
		}
	}
</script>

<style scoped>
	.SearchSelector {
		font-size: 12px;
		color: #333;
		margin: 10px 0;
		border: 1px solid #ddd;
		border-bottom: none;
	}
	.col {
		display: flex;
		border-bottom: 1px solid #ddd;
	}
	.title {
		width: 120px;
		background: #f1f1f1;
		text-align: center;
		padding: 10px 0;
	}
	.content {
		display: flex;
		color: #666;
		flex: 1;
		flex-wrap: wrap;
	}
	.content .brand-item {
		border: 1px solid #e4e4e4;
		font-weight: 700;
		color: #e1251b;
		line-height: 52px;
		width: 105px;
		height: 52px;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-style: italic;
		cursor: pointer;
	}
	.content li {
		margin: 10px 0px 10px 15px;
		cursor: pointer;
	}
	.other {
		margin: 10px 4px;
	}
	.other a {
		padding: 2px 7px;
	}
	.other a:hover {
		color: #007aff;
	}
	.other .multiple {
		border: 1px solid #e4e4e4;
	}
</style>
