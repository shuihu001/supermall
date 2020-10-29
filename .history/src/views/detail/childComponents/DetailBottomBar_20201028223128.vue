<template>
    <div class="bottom-bar"> 
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" />
            <van-goods-action-icon icon="shop-o" text="店铺" info="" />
            <van-goods-action-icon icon="star-o" text="收藏" />
            <van-goods-action-button type="warning" text="加入购物车" @click="addToCart" />
            <van-goods-action-button type="danger" text="立即购买" />
        </van-goods-action>
    </div>
</template>

<script>
export default {
    name: "DetailBottomBar",
        methods:{
        addToCart() {
            // console.log("点击添加到购物车")
            this.$emit('addCart')
        }
    }
}
</script>

<style scoped lang = "less">
    .van-goods-action{
        border-top: 1px solid #FBFBFB;
    }
/* .bottom-bar{
    height: 49px;
    background-color: red;

    position: relative;
    bottom: 49px;
    /* z-index: 1000; */
    /* position: fixed;
    left: 0;
    right: 0;
    bottom: 0; */
} */

</style>