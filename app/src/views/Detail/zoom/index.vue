<template>
	<div class="zoom">
		<img class="picture" :src="imgObj.imgUrl" alt="" />
		<div class="event" @mousemove="bigGlass" @mouseenter="enter" @mouseleave="leave"></div>
		<div
			class="mask"
			:style="{ top: mask.top + 'px', left: mask.left + 'px' }"
			ref="myMask"
			:class="{enterShow: isShow}"
		></div>
		<div class="big" :class="{enterShow: isShow}">
			<img
				class="big-picture"
				:src="imgObj.imgUrl"
				alt=""
				:style="{ top: big.top + 'px', left: big.left + 'px' }"
			/>
		</div>
		<!-- :style="{ top: mask.top + 'px', left: mask.left + 'px' }" -->
	</div>
</template>

<script>
	export default {
		name: "Zoom",
		data() {
			return {
				mask: {
					top: 0,
					left: 0,
				},
				big: {
					top: 0,
					left: 0,
				},
				isShow: false,
				showIndex: 0
			}
		},
		methods: {
			bigGlass(e) {
                // 获取遮罩层实例对象
				let myMask = this.$refs.myMask
                // 计算遮罩层位置，top(left)=鼠标Y(鼠标X)-遮罩层高(宽)/2
				let top = e.offsetY - myMask.offsetHeight / 2
				let left = e.offsetX - myMask.offsetWidth / 2
                // 遮罩层位置边界判断
				if (top <= 0) {
					top = 0
				} else if (top >= myMask.offsetHeight) {
					top = myMask.offsetHeight
				}
				if (left <= 0) {
					left = 0
				} else if (left >= myMask.offsetWidth) {
					left = myMask.offsetWidth
				}
                // 修改遮罩层位置
				this.mask.top = top
				this.mask.left = left
                // 修改放大图片位置
                this.big.top = - 2 * top
                this.big.left = - 2 * left
			},
			enter() {
				this.isShow = true
			},
			leave() {
				this.isShow = false
			}
		},
		props: ['skuImageList'],
		computed: {
			imgObj() {
				return this.skuImageList[this.showIndex] || {}
			}
		},
		mounted() {
			this.$bus.$on('getIndex', (showIndex) => {
				this.showIndex = showIndex
			})
		}
	}
</script>

<style scoped>
	.zoom {
		width: 400px;
		height: 400px;
		box-sizing: border-box;
		border: 1px solid #ccc;
		position: relative;
		font-size: 0;
		margin-bottom: 3px;
	}
	.event {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 99;
	}
	.picture {
		width: 100%;
		height: 100%;
	}
	.mask {
		position: absolute;
		width: 50%;
		height: 50%;
		background-color: #00ff004d;
		top: 0;
		left: 0;
		display: none;
	}
	.big {
		position: absolute;
		width: 400px;
		height: 400px;
		box-sizing: border-box;
		border: 1px solid #ccc;
		border-left-color: transparent;
		top: -1px;
		left: 100%;
		overflow: hidden;
		display: none;
	}
    .big img {
        position: absolute;
        top: 0;
        left: 0;
    }
	.big-picture {
		width: 200%;
		height: 200%;
	}
	.enterShow {
		display: block;
	}
</style>
