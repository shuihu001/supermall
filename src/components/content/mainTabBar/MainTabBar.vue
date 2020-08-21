<template>
	<tar-bar>
		<tar-bar-item path="/home" activeColor="deeppink">
			<img  src="~assets/imgs/tabbar/home.svg" slot="item-icon" alt=""/>
			<img  src="~assets/imgs/tabbar/home_active.svg" slot="item-icon-active" alt=""/>
			<div slot="item-text">首页</div>
		</tar-bar-item>
		<tar-bar-item path="/category">
			<img slot="item-icon" src="~assets/imgs/tabbar/category.svg" />
			<img  src="~assets/imgs/tabbar/category_active.svg" slot="item-icon-active" alt=""/>				
			<div slot="item-text">分类</div>
		</tar-bar-item>
		<tar-bar-item path="/cart">
			<img slot="item-icon" src="~assets/imgs/tabbar/shopcart.svg" />
			<img  src="~assets/imgs/tabbar/shopcart_active.svg" slot="item-icon-active" alt=""/>				
			<div slot="item-text">购物车</div>
		</tar-bar-item>
		<tar-bar-item path="/profile">
			<img slot="item-icon" src="~assets/imgs/tabbar/profile.svg" />
			<img  src="~assets/imgs/tabbar/profile_active.svg" slot="item-icon-active" alt=""/>
			<div slot="item-text">我的</div>
		</tar-bar-item>
	
	</tar-bar>
		
</template>

<script>
	import TarBar from "../../common/tabbar/TabBar.vue"
	import TarBarItem from "../../common/tabbar/TabBarItem.vue"
	export default {
		name: "MainTabBar",
		components: {
			TarBar,
			TarBarItem
		}
	}
</script>

<style>
</style>
