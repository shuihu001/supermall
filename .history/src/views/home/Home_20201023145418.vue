<template>
	<div id="home">
		<nav-bar class="home-nav">
			<div slot="center">购物车</div>
		</nav-bar>
		<tab-control class="tab-control"
		:titles="['流行','新款','精选']" 
		@tabClick="tabClick" ref="tabControl1" v-show="isFixed"></tab-control>
		<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp='loadMore'>
			<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
			<recommend-view :recommends="recomends"></recommend-view>
			<feature-view></feature-view>
			<tab-control
			:titles="['流行','新款','精选']" 
			@tabClick="tabClick" ref="tabControl2"></tab-control>
			<goods-list :goods="showGoods"></goods-list>
		</scroll>

		<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
	</div>
</template>

<script>
	import HomeSwiper from "./childComps/HomeSwiper.vue"
	import RecommendView from "./childComps/RecommendView.vue"
	import FeatureView from "./childComps/FeatureView.vue"

	import NavBar from "components/common/navbar/NavBar.vue"
	import TabControl from "components/content/tabControl/TabControl.vue"
	import GoodsList from 'components/content/goods/GoodsList.vue'
	import BackTop from 'components/content/backTop/BackTop.vue'

	import Scroll from 'components/common/scroll/Scroll.vue'


	import {
		getHomeMultidata,
		getHomeGoods
	} from "network/home.js"
	import {debounce} from "common/utils.js"


	export default {
		name: "Home",
		components: {
			HomeSwiper,
			RecommendView,
			FeatureView,
			NavBar,
			TabControl,
			GoodsList,
			BackTop,
			Scroll,


		},
		data() {
			return {
				banners: [],
				recomends: [],
				titles: [],
				goods: {
					'pop': {
						page: 0,
						list: []
					},
					'new': {
						page: 0,
						list: []
					},
					'sell': {
						page: 0,
						list: []
					},
				},
				currentType: "pop",
				isShowBackTop: false,
				tabOffsetTop: 0,
				isFixed: false,
				saveY: 0
			}
		},
		computed: {
			showGoods() {
				return this.goods[this.currentType].list
			}
		},
		destroyed() {
			// console.log('home destroyed')
		},
		activated() {
			// console.log('home activated')
			this.$refs.scroll.scrollTo(0, this.saveY,1)
			this.$refs.scroll.refresh()
		},
		deactivated() {
			// console.log('home deactivated')
			this.saveY = this.getSCrollY()
		},
		created() {
			//1.请求多个数据
			this.getHomeMultidata()

			//2.请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')

		},
		mounted() {
			//3.监听item中图片加载完成
			const refresh = debounce(this.$refs.scroll.refresh,500)
			this.$bus.$on('ItemImageLoad', ()=>{
				refresh()
				// this.$refs.scroll.refresh()
				
			})


		},
		methods: {
			// 事件监听相关
			
			debounce(func, delay){
				//设置定时器开关
				let timer = null

				//返回防抖函数
				return function(...args){
					if(timer) clearTimeout(timer)

					timer = setTimeout(() => {
						func.apply(this,...args)

					},delay)

				}

			},
			tabClick(index) {
				// console.log(index)
				switch (index) {
					case 0:
						this.currentType = 'pop'
						break
					case 1:
						this.currentType = 'new'
						break
					case 2:
						this.currentType = 'sell'
						break
				}
				this.$refs.tabControl1.currentIndex = index;
				this.$refs.tabControl2.currentIndex = index;
			},
			backClick() {
				this.$refs.scroll.scrollTo(0, 0, 500);
				// console.log(this.$refs.scroll.message);

			},
			contentScroll(position) {
				// console.log(position);
				//判断BackTop是否显示
				this.isShowBackTop = (-position.y) > 1000
				//判断tabControl是否吸顶
				this.isFixed = (-position.y) > this.tabOffsetTop
			},
			loadMore() {
				// console.log("sljjgd")
				this.getHomeGoods(this.currentType)
					// this.$refs.scroll.scroll.refresh()
			},
			swiperImageLoad(){
				// console.log(this.$refs.tabControl.$el.offsetTop)
			//所有的组件有个属性$el,用于获取组件中的元素
			this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
			},
			getSCrollY(){
				return this.$refs.scroll ? this.$refs.scroll.y : 0
			},

			//网络请求相关
			getHomeMultidata() {
				getHomeMultidata().then(res => {
					// console.log(res);
					// this.result = res;
					this.banners = res.data.banner.list;
					this.recomends = res.data.recommend.list;
					// console.log(this.banners)
				})
			},
			getHomeGoods(type) {
				const page = this.goods[type].page + 1;
				getHomeGoods(type, page).then(res => {
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1
					console.log(this.goods[type]);
					//完成上拉加载更多
					this.$refs.scroll.finishPullUp()
				})
			}
		}
	}
</script>

<style scoped>
	#home {
		height: 100vh;
		/* position: relative; */
	}

	.home-nav {
		background-color: var(--color-tint);
		color: #fff;
/* 		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9; */
	}

	.tab-control {
		position: relative;
		/* top: 44px; */
		z-index: 9;
	}

	/* 	.content{

		height: 500px;
		overflow: hidden;
	} */

	.content {


		overflow: hidden;
		/* margin-top: 44px; */

		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
</style>
