<template>
	<swiper>
		<swiper-item v-for="item in topImages" class="swiper-item">
			<img :src="item" />
		</swiper-item>
	</swiper>
</template>

<script>
	import {
		Swiper,
		SwiperItem
	} from 'components/common/swiper'

	export default {
		name: "HomeSwiper",
		components: {
			Swiper,
			SwiperItem
		},
		props: {
			topImages: {
				type: Array,
				default () {
					return []
				}
			}
		}
	}
</script>

<style>
	.swiper-item {
		height: 300px;
		overflow: hidden;
	}
</style>
