import {debounce} from "common/utils.js"

import BackTop from 'components/content/backTop/BackTop.vue'

export const itemListenerMixin = {
		components:{
			BackTop
		},
    data(){
        return {
            itemImgListener: null,
						isShowBackTop: false,
        }
    },

    mounted(){
        const refresh = debounce(this.$refs.scroll.refresh,500)
        //对监听的事件进行保存
        this.itemImgListener = ()=>{
        refresh()
      // this.$refs.scroll.refresh()
            }
        this.$bus.$on('ItemImageLoad', this.itemImgListener)
        // console.log('我是混入')
    },
		methods: {
			backClick() {
				this.$refs.scroll.scrollTo(0, 0, 500);
				// console.log(this.$refs.scroll.message);
			
			},
			contentScroll(position) {
				console.log(position)
				//判断是否显示
				this.isShowBackTop = (-position.y) > 1000
				}
		}
}
