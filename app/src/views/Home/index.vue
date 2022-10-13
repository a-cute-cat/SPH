<template>
    <div class="home">
        <TypeNav></TypeNav>
        <div class="container">
            <div class="content">
                <div class="banner">
                    <ListContainer></ListContainer>
                </div>
                <Notice></Notice>
            </div>
            <Recommend></Recommend>
            <Rank></Rank>
            <Like></Like>
            <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
            <Brand></Brand>
        </div>
    </div>
</template>

<script>
import ListContainer from "./listContainer";
import Notice from "./notice";
import Recommend from "./recommend";
import Rank from "./rank";
import Like from "./like";
import Brand from "./brand";
import Floor from "./floor";
import TypeNav from "@/components/TypeNav/index.vue";
import { mapState } from 'vuex';
export default {
    name: 'Home',
    components: {
        ListContainer,
        Notice,
        Recommend,
        Rank,
        Like,
        Brand,
        Floor,
        TypeNav
    },
    mounted() {
        this.$store.dispatch('floorList');
        // this.$store.dispatch('userInfo');
    },
    computed: {
        ...mapState({
            floorList: state => state.home.floorList
        })
    }
}
</script>

<style scoped>
.home {
    width: 100%;
    margin-bottom: 30px;
}

.home .content {
    position: relative;
    height: 476px;
}

.banner {
    width: 700px;
    height: 470px;
    position: absolute;
    left: 230px;
    background-color: plum;
    overflow: hidden;
    margin: 4px 4px 0 4px;
}

.notice {
    width: 262px;
    height: 472px;
    position: absolute;
    right: 0;
    margin-top: 4px;
}
</style>