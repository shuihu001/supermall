<template>
	<div class="tab-bar-item" @click="itemClick">
		<div v-if="isActive"><slot name="item-icon-active"></slot></div>
		<div v-else><slot name="item-icon"></slot></div>
		<div :style="activeStyly"><slot name="item-text"></slot></div>
		
<!-- 		<img src="../../../assets/imgs/tabbar/home.svg" />
		<div>首页</div> -->
		</div>
</template>

<script>
	export default {
		name: "TabBarItem",
		props:{
			path: String,
			activeColor: {
				type: String,
				default: 'red'
			}
		},
		data(){
			return {
				// isActive: true,
			}
		},
		computed:{
			isActive(){
				return this.$route.path.indexOf(this.path) !==-1
			},
			activeStyly(){
				return this.isActive ? {color: this.activeColor} : {}
			}
		}, 
		methods:{
			itemClick(){
				this.$router.push(this.path).catch(()=>{})
			}
		}
	}
</script>

<style scoped>
	.tab-bar-item{
		flex: 1;
		text-align: center;
		height: 49px;
		font-size: 14px;
	}
	.tab-bar-item img {
		width: 24px;
		height: 24px;
		margin-top: 3px;
		vertical-align: middle;
	}
</style>
