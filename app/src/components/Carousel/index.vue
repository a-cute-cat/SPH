<template>
    <div class="swiper" ref="mySwiper" @mouseenter="enterShow" @mouseleave="leaveShow">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in list" :key="item.id">
                <img :src="item.imgUrl" alt="">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev" v-show="show"></div>
        <div class="swiper-button-next" v-show="show"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';
export default {
    name: 'Carousel',
    data() {
        return {
            mySwiper: null,
            show: false
        }
    },
    props: ['list'],
    methods: {
        enterShow() {
            this.show = true;
            this.mySwiper.autoplay.stop();
        },
        leaveShow() {
            this.show = false;
            this.mySwiper.autoplay.start();
        }
    },
    watch: {
        list: {
            immediate: true,
            handler(newVal, oldVal) {
                this.$nextTick(() => {
                    this.mySwiper = new Swiper(this.$refs.mySwiper, {
                        autoplay: true,
                        loop: true, // 循环模式选项

                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        },

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    })
                })
            }
        }
    }
}
</script>

<style scoped>
.swiper {
    width: 100%;
    height: 100%;
}

.swiper img {
    width: 100%;
    height: 100%;
}

.swiper>>>.swiper-button-prev,
.swiper>>>.swiper-button-next {
    background-color: rgba(0, 0, 0, 0.5);
    color: rgba(250, 250, 250, 0.8);
}

.swiper>>>.swiper-pagination-bullet-active {
    background-color: rgba(250, 250, 250, 0.8);
    width: 20px;
    border-radius: 20px;
}
</style>