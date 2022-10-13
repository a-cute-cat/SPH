<template>
	<div class="page">
		<button @click="backAndNext(-1)" v-show="totalPages != 1">上一页</button>
		<ul class="page-list" @click="goPage">
			<!-- 上 -->
			<button v-show="startAndEnd.start> 1" data-page="1" :class="{active: pageNo === 1}">1</button>
			<button v-show="startAndEnd.start > 2">...</button>
			<!-- 中 -->
			<button
				v-for="(page, index) in startAndEnd.end"
				:key="index"
				v-show="page >= startAndEnd.start"
				:data-page="page"
				:class="{active: pageNo === page}"
				>{{ page }}</button
			>
			<!-- 下 -->
			<button v-show="startAndEnd.end < totalPages - 1">...</button>
			<button v-show="startAndEnd.end < totalPages" :data-page="totalPages" :class="{active: pageNo === totalPages}">{{ totalPages }}</button>
		</ul>
		<button @click="backAndNext(1)" v-show="totalPages != 1">下一页</button>
		<select name="" id="" class="select" v-model="size">
			<option value="5">每页5条</option>
			<option value="10">每页10条</option>
			<option value="15">每页15条</option>
			<option value="20">每页20条</option>
		</select>
		<p class="total"
			>共<span>{{ totalPages }}</span
			>页</p
		>
	</div>
</template>

<script>
	export default {
		name: "Pagination",
		data() {
			return {
				size: 5,
				isActive: false
			}
		},
		props: ["pageNo", "pageSize", "total", "continues"],
		computed: {
			totalPages() {
				return Math.ceil(this.total / this.pageSize)
			},
			startAndEnd() {
				let start = null
				let end = null
				if (this.totalPages < this.continues) {
					start = 1
					end = this.totalPages
				} else {
					start = this.pageNo - parseInt(this.continues / 2)
					end = this.pageNo + parseInt(this.continues / 2)
					if (start < 1) {
						start = 1
						end = this.continues
					}
					if (end > this.totalPages) {
						start = this.totalPages - this.continues + 1
						end = this.totalPages
					}
				}
				return { start, end }
			},
		},
		watch: {
			size(newVal, oldVal) {
				this.$bus.$emit('changeSize', parseInt(newVal))
			}
		},
		methods: {
			goPage(e) {
				this.$bus.$emit('changePage', parseInt(e.target.dataset.page));
			},
			backAndNext(num) {
				this.$bus.$emit('backNext', num)
			}
		}
	}
</script>

<style scoped>
	.page {
		display: flex;
		justify-content: center;
		line-height: 20px;
		font-size: 14px;
	}
	.page button {
		padding: 0 8px;
		height: 20px;
		line-height: 20px;
		border: none;
		box-sizing: content-box;
		cursor: pointer;
	}
	.page .page-list {
		display: flex;
		height: 20px;
		margin: 0;
	}
	.page-list button {
		margin: 0 5px;
		cursor: pointer;
	}
	.active {
		/* color: #409eff; */
		background-color: skyblue;
		color: #fff;
	}
	.select {
		height: 20px;
		font-size: 14px;
		margin: 0 20px;
		outline: none;
	}
	.total {
		margin: 0;
	}
</style>
