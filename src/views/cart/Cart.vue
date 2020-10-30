<template>
	<div class="cart">
		<nav-bar class="nav-bar">
			<div slot="center">购物车({{cartLength}})</div>
		</nav-bar>
		
		<!-- 商品列表 -->
		<scroll class="content" ref="scroll" :probe-type="3"  :pull-up-load="true">
			<cart-list/>
		</scroll>
		
		
		<!-- 底部汇总 -->
		<cart-bottom-bar></cart-bottom-bar>
		
	</div>

	

</template>

<script>
	import NavBar from "../../components/common/navbar/NavBar.vue"
	import CartBottomBar from "./childComps/CartBottomBar.vue"
	import CartList from "./childComps/CartList.vue"
	
	import Scroll from "../../components/common/scroll/Scroll.vue"
	import { mapGetters } from 'vuex'
	export default {
		name: "Cart",
		components:{
			NavBar,
			CartList,
			CartBottomBar,
			Scroll
		},
		activated() {
			this.$refs.scroll.refresh()
		},
		computed:{
			...mapGetters(['cartLength'])
		}
	}
</script>

<style scoped>
	.nav-bar {
		background-color: var(--color-tint);
		color: #fff;
		
	}
	.cart{
		height: 100vh;
	}
	.content{
		overflow: hidden;
		/* position: absolute; */
		height: calc(100% - 44px - 49px - 40px);
/* 		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0; */
	}
</style>
