<template>
    <div class="floor">
        <div class="container">
            <div class="title">
                <h3>{{ list.name }}</h3>
                <ul class="list">
                    <li v-for="item, index in list.navList" :key="index" :style="index === currentIndex ? styleObj : ''"
                        @click="exhibit(index)">{{ item.text }}</li>
                </ul>
            </div>
            <div class="main">
                <div class="content" v-if="currentIndex === 0">
                    <div class="left">
                        <ul>
                            <li v-for="item in list.keywords" :key="item.index">{{item}}</li>
                        </ul>
                        <img :src="list.imgUrl" alt="">
                    </div>
                    <div class="center">
                        <Carousel :list="list.carouselList"></Carousel>
                    </div>
                    <div class="right">
                        <div class="col1">
                            <img :src="list.recommendList[0]" alt="">
                            <img :src="list.recommendList[1]" alt="">
                        </div>
                        <div class="clo2">
                            <img :src="list.bigImg" alt="">
                        </div>
                        <div class="col3">
                            <img :src="list.recommendList[2]" alt="">
                            <img :src="list.recommendList[3]" alt="">
                        </div>
                    </div>
                </div>
                <div class="content" v-if="currentIndex === 1">1</div>
                <div class="content" v-if="currentIndex === 2">2</div>
                <div class="content" v-if="currentIndex === 3">3</div>
                <div class="content" v-if="currentIndex === 4">4</div>
                <div class="content" v-if="currentIndex === 5">5</div>
                <div class="content" v-if="currentIndex === 6">6</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Floor',
    data() {
        return {
            currentIndex: 0,
            styleObj: {
                color: '#e1251b',
                borderColor: '#e1251b'
            }
        }
    },
    props: ['list'],
    methods: {
        exhibit(index) {
            this.currentIndex = index;
        }
    }
}
</script>

<style scoped>
.floor {
    padding: 10px 0;
}

.title {
    display: flex;
    justify-content: space-between;
    line-height: 50px;
}

.title h3 {
    font-size: 20px;
    color: #c81623;
}

.list {
    display: flex;
    font-size: 12px;
    color: #666;
}

.list li {
    height: 16px;
    line-height: 16px;
    margin: auto 0;
    padding: 0 10px;
    border-right: 1px solid #666;
}

.list li:hover {
    color: #7cc815;
    border-right-color: #7cc815;
}

.list .active {
    color: #e1251b;
    border-right-color: #e1251b;
}

.list li:last-child {
    border-right: none;
}

.content {
    display: flex;
    border-top: 2px solid #e1251b;
}

.left {
    flex: 2;
    font-size: 0;
    color: #333;
    background: #f7f7f7;
}

.left ul {
    /* flex: 2; */
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
    font-family: '宋体';
}

.left ul li {
    width: 80px;
    line-height: 30px;
    border-bottom: 1px solid #e4e4e4;
    margin: 0 10px;
    text-align: center;
}

.left img {
    width: 100%;
    margin-top: 10px;
}

.center {
    flex: 3;
    position: relative;
    overflow: hidden;
}

.banner img {
    width: 300px;
    height: auto;
}

.right {
    flex: 5;
    font-size: 0;
    background-color: plum;
    display: flex;
    align-items: stretch;
}

.right div {
    display: flex;
    flex-direction: column;
}

.right img {
    flex: 1;
}
</style>