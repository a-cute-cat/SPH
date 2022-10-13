<template>
    <div class="notice">
        <div class="main">
            <div class="title">
                <h4>尚品汇快报<span>更多></span></h4>
            </div>
            <ul class="list">
                <li><span>[特惠]</span>备战开学季 全民半价购数码</li>
                <li><span>[公告]</span>备战开学季 全民半价购数码</li>
                <li><span>[特惠]</span>备战开学季 全民半价购数码</li>
                <li><span>[公告]</span>备战开学季 全民半价购数码</li>
                <li><span>[特惠]</span>备战开学季 全民半价购数码</li>
            </ul>
            <ul class="service">
                <div class="col1">
                    <li>
                        <div></div>
                        <p>话费</p>
                    </li>
                    <li>
                        <div></div>
                        <p>机票</p>
                    </li>
                    <li>
                        <div></div>
                        <p>电影票</p>
                    </li>
                </div>
                <div class="col2">
                    <li>
                        <div></div>
                        <p>话费</p>
                    </li>
                    <li>
                        <div></div>
                        <p>机票</p>
                    </li>
                    <li>
                        <div></div>
                        <p>电影票</p>
                    </li>
                </div>
                <div class="col3">
                    <li>
                        <div></div>
                        <p>话费</p>
                    </li>
                    <li>
                        <div></div>
                        <p>机票</p>
                    </li>
                    <li>
                        <div></div>
                        <p>电影票</p>
                    </li>
                </div>
            </ul>
        </div>
        <div class="recommend">
            <img src="../images/ad1.png" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Notice'
}
</script>

<style scoped>
.main {
    border: 1px solid #e4e4e4;
}

.title {
    margin: 0 10px;
    padding: 6px 0;
    font-size: 14px;
    line-height: 24px;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    position: relative;
}

.title span {
    font-weight: lighter;
    font-size: 12px;
    position: absolute;
    right: 0;
}

.list {
    font-size: 14px;
    margin: 0 10px;
    line-height: 28px;
}

.list span {
    font-weight: bolder;
}

.col1,
.col2,
.col3 {
    width: 100%;
    height: 100%;
    display: flex;
}

.col1 li,
.col2 li,
.col3 li {
    height: 66px;
    flex: 1;
    box-sizing: border-box;
    border-left: 1px solid #e4e4e4;
    border-top: 1px solid #e4e4e4;
}

.col1 li:first-of-type,
.col2 li:first-of-type,
.col3 li:first-of-type {
    border-left: none;
}

.col1 li div,
.col2 li div,
.col3 li div {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    background-image: url("@/assets/icons.png");
}

.col1 li div {
    background-position-y: -5px;
}

.col1 li:nth-of-type(1) div {
    background-position-x: -10px;
}

.col1 li:nth-of-type(2) div {
    background-position-x: -75px;
}

.col1 li:nth-of-type(3) div {
    background-position-x: -137px;
}

.col2 li div {
    background-position-y: -75px;
}

.col2 li:nth-of-type(1) div {
    background-position-x: -13px;
}

.col2 li:nth-of-type(2) div {
    background-position-x: -75px;
}

.col2 li:nth-of-type(3) div {
    background-position-x: -137px;
}

.col3 li div {
    background-position-y: -145px;
}

.col3 li:nth-of-type(1) div {
    background-position-x: -13px;
}

.col3 li:nth-of-type(2) div {
    background-position-x: -75px;
}

.col3 li:nth-of-type(3) div {
    background-position-x: -137px;
}

.col1 li p,
.col2 li p,
.col3 li p {
    font-size: 12px;
    text-align: center;
}

.recommend img {
    width: 100%;
    height: 87px;
    margin-top: 6px;
}
</style>