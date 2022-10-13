<template>
    <Carousel :list="list"></Carousel>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'listContainer',
    mounted() {
        this.$store.dispatch('bannerList');
    },
    computed: {
        ...mapState({
            list: state => state.home.bannerList
        })
    }
}
</script>

<style>

</style>