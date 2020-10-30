<template>
	<div id="detail">

		<detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="nav" />
		<scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
			<detail-swiper :top-images="topImages" />
			<detail-base-info :goods="goods" />
			<detail-shop-info :shop="shop" />
			<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
			<detail-param-info :param-info="paramInfo" ref="params" />
			<detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
			<goods-list :goods="recommends" ref="recommend" />
		</scroll>
		<detail-bottom-bar @addCart="addToCart"/>
		<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
		
	</div>
</template>

<script>
	import DetailNavBar from './childComponents/DetailNavBar'
	import DetailSwiper from './childComponents/DetailSwiper'
	import DetailBaseInfo from './childComponents/DetailBaseInfo'
	import DetailShopInfo from './childComponents/DetailShopInfo'
	import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
	import DetailParamInfo from './childComponents/DetailParamInfo'
	import DetailCommentInfo from "./childComponents/DetailCommentInfo.vue"
	import DetailBottomBar from "./childComponents/DetailBottomBar.vue"
	import BackTop from 'components/content/backTop/BackTop.vue'
	

	import Scroll from 'components/common/scroll/Scroll'
	import GoodsList from '../../components/content/goods/GoodsList';

	import {
		getDetail,
		Goods,
		Shop,
		GoodsParam,
		getRecommend
	} from "network/detail";
	import {
		debounce
	} from "common/utils.js";
	import {
		itemListenerMixin
	} from 'common/mixin.js'

	export default {
		name: "Detail",
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			Scroll,
			GoodsList,
			DetailBottomBar,
			BackTop
		},
		mixins: [itemListenerMixin],
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommends: [],
				themeTopYs: [],
				getthemeTopy: null,
				currentIndex: 0,
				

			}
		},
		created() {
			// 1.保存传入的iid
			this.iid = this.$route.params.iid
			

			//3.请求推荐数据
			getRecommend().then(res => {
				// console.log(res);
				this.recommends = res.data.list
			})

			// 2.根据iid请求详情数据
			getDetail(this.iid).then(res => {
				// 1.获取顶部的图片轮播数据
				// console.log(res);
				const data = res.result;
				this.topImages = data.itemInfo.topImages

				// 2.获取商品信息
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

				// 3.创建店铺信息的对象
				this.shop = new Shop(data.shopInfo)

				// 4.保存商品的详情数据
				this.detailInfo = data.detailInfo;

				// 5.获取参数的信息
				this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

				//6.获取评论信息
				if (data.rate.cRate !== 0) {
					this.commentInfo = data.rate.list[0]
				}

				this.getthemeTopy = debounce(() => {
					this.themeTopYs = []
					this.themeTopYs.push(0);
					this.themeTopYs.push(this.$refs.params.$el.offsetTop - 50);
					this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
					this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
					this.themeTopYs.push(Number.MAX_VALUE)
					// console.log(this.themeTopYs);
				})


				// this.$nextTick (() => {
				//   this.themeTopYs = []
				//   this.themeTopYs.push(0);
				//   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
				//   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
				//   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
				//   console.log(this.themeTopYs);
				// })


			})

		},
		destroyed() {
			//取消全局事件监听
			this.$bus.$off('ItemImageLoad', this.itemImgListener)
		},
		mounted() {
				console.log(this.iid)

		},
		updated() {
			// this.themeTopYs = []
			// this.themeTopYs.push(0);
			// this.themeTopYs.push(this.$refs.params.$el.offsetTop)
			// this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
			// this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
			// console.log(this.themeTopYs)

		},
		methods: {
			imageLoad() {
				this.$refs.scroll.refresh()
				this.getthemeTopy()

			},

			titleClick(index) {
				// console.log(index)
				this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)

			},
			contentScroll(position) {
				// console.log(position)
				this.isShowBackTop = (-position.y) > 1000
				// 1.获取y值
				const positionY = -position.y
				// 2.positionY和主题中值进行对比
				for (let i in this.themeTopYs.slice(0, -1)) {
					i = parseInt(i)
					// i*=1
					if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
						console.log(i);
						this.currentIndex = i,
							this.$refs.nav.currentIndex = this.currentIndex
						// console.log(this.currentIndex)

					}

				}
			},
			addToCart(){
				// console.log('---')
				// 1.获取购物车需要展示的信息
				const product = {}
				product.image = this.topImages[0];
				product.title = this.goods.title;
				product.desc = this.goods.desc;
				product.price = this.goods.realPrice;
				product.iid = this.iid;
				// console.log(product)
				// 2.将商品添加到购物车
				//调用mutation
				// this.$store.commit('addCart', product)
				
				//调用action
				this.$store.dispatch('addCart', product)

				
			}

		}
	}
</script>

<style scoped>
	#detail {
		position: relative;
		z-index: 9;
		background-color: #fff;
		height: 100vh;
	}

	.detail-nav {
		position: relative;
		z-index: 9;
		background-color: #fff;
	}
	.content{
		height: calc(100% - 44px - 49px);
	}

</style>
