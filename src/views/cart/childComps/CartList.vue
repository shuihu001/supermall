<template>
	<div class="cart-list">
			<cart-list-item v-for="(item, index) in cartList" :item-info="item"></cart-list-item>
		
	</div>
</template>

<script>
	import CartListItem from "./CartListItem.vue"
	
	import { mapGetters } from 'vuex'
	export default {
		name: "CartList",
		components:{
			CartListItem
		},
		computed:{
			...mapGetters(['cartList'])
		},

	}
</script>

<style scoped>


</style>
