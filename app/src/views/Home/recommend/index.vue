<template>
    <div class="recommend">
        <div class="container">
            <div class="main">
                <img src="./images/clock.png" alt="">
                <h4>今日推荐</h4>
            </div>
            <ul class="list">
                <li>
                    <img src="./images/today01.png" alt="">
                </li>
                <li>
                    <img src="./images/today02.png" alt="">
                </li>
                <li>
                    <img src="./images/today03.png" alt="">
                </li>
                <li>
                    <img src="./images/today04.png" alt="">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Recommend'
}
</script>

<style scoped>
.recommend .container {
    display: flex;
    font-size: 0;
    margin-top: 10px;
}

.main {
    width: 200px;
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: center;
    font-size: 16px;
    color: #fff;
}

.main img {
    margin: 30px 0 15px 0;
}

.list {
    display: flex;
}

.list li {
    flex: 1;
}
</style>