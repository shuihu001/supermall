<template>
	<div class="goods">
		<goods-list-item v-for="item in goods" :goodsItem="item" class="goods-list-item" :key="item">
		</goods-list-item>

	</div>
</template>

<script>
	import GoodsListItem from "./GoodsListItem.vue"
	
	export default {
		name: "GoodsList",
		components:{
			GoodsListItem
		},
		props: {
			goods: {
				type: Array,
				default(){
					return[]
				}
			}
		}
	}
</script>

<style>
  .goods {
    display: flex;
	/* 包裹，根据宽度设置显示几个 */
    flex-wrap: wrap;
	/* 留白均等分 */
    justify-content: space-around;

    padding: 2px;
  }
</style>
