<template>
	<div class="popMask" v-show="popShow">
		<div class="pop">
			<p><span class="iconfont icon-envelope"></span>{{ message }}</p>
			<button @click="sure">确定</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Pop",
		props: ["message", "popShow"],
		methods: {
			sure() {
				this.$bus.$emit("popMakeSure")
			},
		},
	}
</script>

<style scoped>
.popMask {
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
	.pop {
		position: absolute;
		top: 50px;
		left: 50%;
        margin-left: -200px;
        /* margin: 0 auto; */
		z-index: 1000;
		width: 400px;
		background-color: #fee9eb;
		color: #e1251b;
		box-sizing: border-box;
		padding: 20px;
		font-size: 14px;
		line-height: 20px;
		font-family: "宋体";
	}
	.pop .icon-envelope {
		/* background-color: plum; */
		vertical-align: middle;
		margin-right: 10px;
		font-size: 18px;
	}
	.pop button {
		padding: 0px 10px;
		line-height: 24px;
		font-size: 14px;
		color: #fff;
		background-color: #e1251b;
		border: none;
		border-radius: 5px;
		display: block;
		margin-left: 300px;
		margin-top: 10px;
		font-family: "宋体";
	}
</style>
