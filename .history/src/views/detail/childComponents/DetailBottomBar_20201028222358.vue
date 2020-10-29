<template>
    <div class="bottom-bar"> 底部工具栏</div>
</template>

<script>
export default {
    name: "DetailBottomBar"
}
</script>

<style scoped>
.bottom-bar{
    height: 49px;
    background-color: red;

    position: relative;
    bottom: -49px;
    z-index: -1000;
    /* position: fixed;
    left: 0;
    right: 0;
    bottom: 0; */
}

</style>