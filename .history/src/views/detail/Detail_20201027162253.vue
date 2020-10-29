<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick='titleClick'/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
			<detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods ="recommends" />
    </scroll>
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

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from '../../components/content/goods/GoodsList';

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {debounce} from "common/utils.js"

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
      GoodsList
    },
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
        themeTopYs: [0, 1000, 2000, 3000],
        itemImgListener: null
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
				if(data.rate.cRate !== 0){
					this.commentInfo = data.rate.list[0]
				}
      })

    },
		deactivated() {
			// console.log('home deactivated')
			//保存Y值
			this.saveY = this.getSCrollY()
			//取消全局事件监听
			this.$bus.$off('ItemImageLoad', this.itemImgListener)
		},
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh,500)
      			//对监听的事件进行保存
			this.itemImgListener = ()=>{
				refresh()
				// this.$refs.scroll.refresh()
				
			}
			this.$bus.$on('ItemImageLoad', this.itemImgListener)

    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      },

      titleClick(index){
        // console.log(index)
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)

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

  .content {
    height: calc(100% - 44px);
  }
</style>
