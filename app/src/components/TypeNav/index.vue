<template>
    <div id="typeNav">
        <div class="container">
            <div class="all" @mouseenter="enterShow" @mouseleave="leaveShow">
                <h4>全部商品分类</h4>
                <transition name="sort">
                    <ul class="sort" v-show="show" @click="goSearch">
                        <li v-for="(c1, index) in categoryList" :key="c1.categoryId"
                            :class="{ active: currentIndex === index }" @mouseenter="sensitize(index)">
                            <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName
                            }}</a>
                            <div class="child-sort" :style="{ display: currentIndex === index ? 'block' : 'none' }">
                                <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                    <dt>
                                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{
                                                c2.categoryName
                                        }}</a>
                                    </dt>
                                    <dd>
                                        <span v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                            <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{
                                                    c3.categoryName
                                            }}</a>
                                        </span>
                                    </dd>
                                </dl>
                            </div>
                        </li>
                    </ul>
                </transition>
            </div>
            <ul class="center-nav">
                <li v-for="item in centerNav" :key="item.index">
                    <h4>{{ item }}</h4>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
    name: 'TypeNav',
    data() {
        return {
            centerNav: ['服装城', '美妆馆', '尚品汇超市', '全球购', '闪购', '团购', '有趣', '秒杀'],
            currentIndex: -1,
            show: true
        }
    },
    computed: {
        ...mapState({
            categoryList: state => state.home.categoryList
        })
    },
    methods: {
        sensitize: throttle(function (index) {
            this.currentIndex = index;
        }, 50),
        goSearch(e) {
            let element = e.target;
            let { categoryname, category1id, category2id, category3id } = element.dataset;
            if (categoryname) {
                let location = { name: "search" }
                let query = { categoryName: categoryname };
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else {
                    query.category3Id = category3id;
                }
                // 合并参数
                location.query = query;
                if (this.$route.params) {
                    location.params = this.$route.params;
                }
                this.$router.push(location);
            }
        },
        enterShow() {
            if (this.$route.path != '/home' && this.$route.path != '/') {
                this.show = true;
            }
        },
        leaveShow() {
            this.currentIndex = -1;
            if (this.$route.path != '/home' && this.$route.path != '/') {
                this.show = false;
            }
        }
    },
    mounted() {
        if (this.$route.path != '/home' && this.$route.path != '/') {
            this.show = false;
        }
    }
}
</script>

<style scoped>
#typeNav {
    border-bottom: 2px solid #e1251b;
    z-index: 999;
}

#typeNav .container {
    display: flex;
}

.all {
    width: 230px;
    height: 40px;
    position: relative;
    background-color: #e1251b;
}

.all h4 {
    text-align: center;
    padding: 0 30px;
    color: #fff;
    font-size: 14px;
    line-height: 40px;
}

.sort {
    width: 230px;
    z-index: 999;
    position: absolute;
    top: 40px;
    background-color: #fafafa;
    color: #333333;
    font-size: 14px;
    line-height: 28px;
    height: 476px;
    justify-content: center;
    align-content: space-between;
    align-items: center;
}

.sort-enter {
    height: 0px;
}
.sort-enter-to {
    height: 476px;
}
.sort-enter-active {
    transition: all 0.5s linear;
}

.sort li {
    height: 28px;
    padding: 0 30px;
}

.center-nav {
    height: 40px;
    line-height: 40px;
    display: flex;
}

.center-nav li {
    padding: 0 20px;
    cursor: pointer;
}

.center-nav li h4 {
    font-weight: 500;
}

.child-sort {
    width: 704px;
    min-height: 100%;
    position: absolute;
    top: 0;
    left: 100%;
    background: #f7f7f7;
    border: 1px solid #ddd;
    box-sizing: border-box;
    font-size: 12px;
    color: #555;
}

.fore {
    display: flex;
    margin: 15px 0;
}

.child-sort dt {
    color: #666;
    font-weight: bolder;
    width: 120px;
    text-align: center;
    line-height: 30px;
}

.child-sort dd {
    width: 400px;
    font-size: 0;
    line-height: 24px;
}

.child-sort span {
    padding: 0 7px;
    line-height: 20px;
    font-size: 12px;
    border-left: 1px solid #b3aeae;
    display: inline-block;
}

.sort li:hover .child-sort {
    display: block;
}

.active {
    background-color: skyblue;
}

a {
    cursor: pointer;
}
</style>