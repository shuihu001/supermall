<template>
	<div class="nav-bar">
		<div class="left"><slot name="left"></slot></div>
		<div class="center"><slot name="center"></slot></div>
		<div class="right"><slot name="righr"></slot></div>
		
	</div>
</template>

<script>
	export default {
		name: "NavNar"
	}
</script>

<style>
	.nav-bar{
		display: flex;
		height: 44px;
		line-height: 44px;
		text-align: center;
		/* 添加阴影 */
		box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);

	}
	.left, .right{
		width: 60px;

	}
	.center{
		flex: 1;

	}
</style>
