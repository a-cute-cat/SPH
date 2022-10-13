<template>
    <div class="like">
        <div class="container">
            <div class="title">
                <h3>猜你喜欢</h3>
                <div class="change">
                    <a href="#">换一换</a>
                    <div class="update"></div>
                </div>
            </div>
            <ul class="list">
                <li v-for="item,index in likes" :key="index">
                    <a href="#">
                        <img :src="item.src" alt="">
                    </a>
                    <div class="intro">
                        <p>{{item.title}}</p>
                        <h4>{{item.price}}</h4>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Like',
    data() {
        return {
            likes: [
                {
                    src: require("./images/like_01.png"),
                    title: "阳光美包新款单肩包女包时尚子母包四件套女",
                    price: "￥116.00"
                },
                {
                    src: require("./images/like_02.png"),
                    title: "爱仕达 30CM炒锅不粘锅NWG8330E电磁炉炒",
                    price: "￥116.00"
                },
                {
                    src: require("./images/like_03.png"),
                    title: "捷波朗（jabra）BOOSI劲步",
                    price: "￥236.00"
                },
                {
                    src: require("./images/like_01.png"),
                    title: "阳光美包新款单肩包女包时尚子母包四件套女",
                    price: "￥116.00"
                },
                {
                    src: require("./images/like_02.png"),
                    title: "捷波朗（jabra）BOOSI劲步",
                    price: "￥236.00"
                },
                {
                    src: require("./images/like_03.png"),
                    title: "三星（G5500）移动联通双网通",
                    price: "￥566.00"
                }
            ]
        }
    }
}
</script>

<style scoped>
.title {
    display: flex;
    justify-content: space-between;
    line-height: 50px;
}

.title h3 {
    font-size: 20px;
    color: #333333;
}

.change {
    display: flex;
    font-size: 12px;
    color: #666;
}

.update {
    width: 30px;
    height: 30px;
    margin: auto 0;
    background-image: url("./images/icons.png");
    background-repeat: no-repeat;
    background-position: -414px -102px;
}

.list {
    border: 1px solid #e4e4e4;
    display: flex;
}

.list li {
    padding: 10px;
    flex: 1;
}

.list li img {
    width: 90%;
    height: auto;
}

.list p {
    font-size: 12px;
    height: 30px;
}

.list h4 {
    font-size: 20px;
    color: #df3033;
}

.intro {
    border-right: 1px solid #e4e4e4;
}
.list li:last-child .intro {
    border-right: none;
}

.intro h4 {
    line-height: 40px;
}
</style>