<template>
	<div class="tab-control">
		<div v-for="(item,index) in titles" class="tab-control-item" 
		:class="{active: index===currentIndex}" @click="itemClick(index)" :key="index">
			<span>{{item}}</span>
		</div>

	</div>
</template>

<script>
	export default {
		name: "TabControl",
		props:{
			titles: {
				type: Array,
				default(){
					return[]
				}
			}
		},
		data(){
			return{
				currentIndex: 0
			}
		},
		methods:{
			itemClick(index){
				this.currentIndex = index;
				this.$emit('tabClick', index)
			}
		}
	}
</script>

<style>
	.tab-control{
		display: flex;
		text-align: center;
		font-size: 16px;
		background-color: #fff;
	}
	.tab-control-item{
		flex: 1;
		height: 2.5rem;
		line-height: 2.5rem;
		
	}
	.tab-control-item span {
		padding: 5px;
	}
	.active{
		color: var(--color-high-text);
		
	}
	.active span{
		/* 加下划线：宽度，样式（groove\dotted），颜色 */
		border-bottom: 3px dotted var(--color-tint);
	}
</style>
