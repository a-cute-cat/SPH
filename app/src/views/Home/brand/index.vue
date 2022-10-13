<template>
    <div class="brand">
        <div class="container">
            <ul class="list">
                <li v-for="item, index in brands" :key="index">
                    <img :src="item" alt="">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Brand',
    data() {
        return {
            brands: [
                require("./images/brand_03.png"),
                require("./images/brand_05.png"),
                require("./images/brand_07.png"),
                require("./images/brand_09.png"),
                require("./images/brand_11.png"),
                require("./images/brand_13.png"),
                require("./images/brand_15.png"),
                require("./images/brand_17.png"),
                require("./images/brand_19.png"),
                require("./images/brand_21.png"),
            ]
        }
    }
}
</script>

<style scoped>
.list {
    display: flex;
    background: #f7f7f7;
    margin: 10px 0;
}

.list li {
    flex: 1;

}

.list li img {
    display: block;
    margin: 14px auto;
    padding: 2px 0;
    border-right: 1px solid #e4e4e4;
}

.list li:last-child img {
    border-right: none;
}
</style>