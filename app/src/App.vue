<template>
	<div id="app">
		<Header></Header>
		<router-view></router-view>
		<Footer></Footer>
	</div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/views/Home";
export default {
	name: "App",
	components: {
		Header,
		Footer,
		Home
	},
	mounted() {
		this.$store.dispatch('categoryList');
	}
}
</script>

<style>
</style>
