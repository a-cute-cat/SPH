<template>
	<div class="swiper" ref="mySwiper">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(item, index) in skuImageList" :key="item.id" @click="changeCurrentIndex(index)">
				<img :src="item.imgUrl" alt="" :class="{active: currentIndex === index}" />
			</div>
				<!-- <div class="swiper-slide">
					<img class="active" src="../images/dp01.png" alt="" />
				</div>
				<div class="swiper-slide">
					<img src="../images/dp02.png" alt="" />
				</div>
				<div class="swiper-slide">
					<img src="../images/dp03.png" alt="" />
				</div>
				<div class="swiper-slide">
					<img src="../images/dp04.png" alt="" />
				</div>
				<div class="swiper-slide">
					<img src="../images/dp01.png" alt="" />
				</div>
				<div class="swiper-slide">
					<img src="../images/dp02.png" alt="" />
				</div>
				<div class="swiper-slide">
					<img src="../images/dp03.png" alt="" />
				</div>
				<div class="swiper-slide">
					<img src="../images/dp04.png" alt="" />
				</div> -->
		</div>

		<!-- 如果需要导航按钮 -->
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
	</div>
</template>

<script>
	import Swiper from "swiper"
	export default {
		name: "ImageList",
		data() {
			return {
				currentIndex: 0
			}
		},
		watch: {
			skuImageList: {
				handler(newVal, oldVal) {
					this.$nextTick(() => {
						var mySwiper = new Swiper(this.$refs.mySwiper, {
							// 如果需要前进后退按钮
							navigation: {
								nextEl: ".swiper-button-next",
								prevEl: ".swiper-button-prev",
							},

							// 一次展示5个
							slidesPerView: 5,
							// 一次切换5个
							slidesPerGroup: 5,
						})
					})
				},
			},
		},
		props: ["skuImageList"],
		methods: {
			changeCurrentIndex(index) {
				this.currentIndex = index;
				this.$bus.$emit('getIndex', this.currentIndex);
			}
		}
	}
</script>

<style scoped>
	.swiper {
		width: 400px;
		height: 56px;
		position: relative;
		overflow: hidden;
		padding: 0 20px;
		box-sizing: border-box;
	}
	.swiper-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.swiper-slide {
		height: 56px;
		width: 72px;
	}
	.swiper-slide img {
		width: 56px;
		height: 56px;
		box-sizing: border-box;
		border: 1px solid #ccc;
		display: block;
	}
	.swiper-slide img.active {
		border: 2px solid #f60;
	}
	.swiper-button-prev,
	.swiper-button-next {
		margin: 0;
		top: 0;
		right: 0;
		width: 20px;
		height: 56px;
		background-color: #c81623;
	}
	.swiper-button-prev {
		left: 0;
	}
	.swiper-button-prev::after,
	.swiper-button-next::after {
		font-size: 20px;
		color: #fff;
	}
</style>
