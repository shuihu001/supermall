<template>
	<div class="bottom-bar">
		<div class="check-content">
			<check-button 
			class="check-button" 
			:is-check="isSelectAll"
			@click.native="checkClick"> </check-button>
			<span>全选</span>
		</div>
		
		<div class="price">
			合计： {{totalPrice}}
		</div>
		
		<div class="calculate">
			去计算({{checkLength}})
		</div>
		
		
	</div>
</template>

<script>
	import CheckButton from "./CheckButton.vue"
	export default {
		name: "CartBootmBar",
		components:{
			CheckButton
		},
		computed:{
			totalPrice(){
				return '￥'+ this.$store.state.cartList.filter(item => {return item.checked}).reduce((pre,item) => {
				return item.price * item.count
			},0)
			},
			checkLength(){
				return this.$store.state.cartList.filter(item => item.checked).length
			},
			isSelectAll(){
				// return !(this.$store.state.cartList.filter(item => !item.checked).length)
				if(this.$store.state.cartList.length === 0) return false
				return !(this.$store.state.cartList.find(item => !item.checked))
			}
		},
		methods:{
			checkClick(){
				//全部选中
				if(this.isSelectAll){
					this.$store.state.cartList.forEach(item => item.checked = false)
				}
				else{
					this.$store.state.cartList.forEach(item => item.checked = true)
				}
			}
		}
	}
</script>

<style>
	.bottom-bar{
		display: flex;
		position: relative;
		line-height: 40px;
		height: 40px;
		background-color: #eee;
		
		
	}
	.check-content{
		display: flex;
		align-items: center;
		margin-left: 10px;
		font-size: 20px;
		width: 80px;
		
	}
	.check-button{
		width: 23px;
		height: 23px;
		line-height: 20px;
		margin-right: 5px;
	}
	.price{
		font-size: 20px;
		margin-left: 20px;
		flex: 1;
	}
	.calculate{
		font-size: 16px;
		background-color: #EB4868;
		color: #fff;
		width: 120px;
		text-align: center;
	}
</style>
