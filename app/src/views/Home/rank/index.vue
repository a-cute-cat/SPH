<template>
    <div class="rank">
        <div class="container">
            <ul class="kind">
                <li class="active">
                    <div class="icon hot"></div>
                    <p>热卖排行</p>
                </li>
                <li>
                    <div class="icon cheap"></div>
                    <p>特价排行</p>
                </li>
                <li>
                    <div class="icon new"></div>
                    <p>新品排行</p>
                </li>
            </ul>
            <ul class="list">
                <li>
                    <a href="#">
                        <img src="./images/1.jpg" alt="" />
                    </a>
                    <div>
                        <a href="#"><span>【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
                                移动联通电信4G手机</span></a>
                    </div>
                    <p>定金：￥100.00</p>
                </li>
                <li>
                    <a href="#">
                        <img src="./images/1.jpg" alt="" />
                    </a>
                    <div>
                        <a href="#"><span>【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
                                移动联通电信4G手机</span></a>
                    </div>
                    <p>定金：￥100.00</p>
                </li>
                <li>
                    <a href="#">
                        <img src="./images/1.jpg" alt="" />
                    </a>
                    <div>
                        <a href="#"><span>【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
                                移动联通电信4G手机</span></a>
                    </div>
                    <p>定金：￥100.00</p>
                </li>
                <li>
                    <a href="#">
                        <img src="./images/1.jpg" alt="" />
                    </a>
                    <div>
                        <a href="#"><span>【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
                                移动联通电信4G手机</span></a>
                    </div>
                    <p>定金：￥100.00</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Rank'
}
</script>

<style scoped>

.kind {
    display: flex;
    justify-content: center;
    padding: 15px 0;
}

.kind li {
    color: #999;
    font-size: 16px;
    text-align: center;
    padding: 0 15px;
}

.kind li:hover {
    font-weight: bolder;
}

.kind .active {
    color: #e60012;
}

.icon {
    width: 35px;
    height: 35px;
    background-image: url("./images/bg0.png");
    background-position: left;
    margin: 0 auto;
    margin-bottom: 10px;
}

.hot {
    background-position: right;
}

.list {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 20px;
}

.list li {
    width: 260px;
    border: 1px solid #e1251b;
    padding: 10px;
}

.list li img {
    width: 100%;
    height: auto;
}

.list li span {
    font-size: 12px;
    color: #333;
}

.list li p {
    color: #e1251b;
    font-size: 20px;
    line-height: 24px;
    margin-top: 10px;
}
</style>