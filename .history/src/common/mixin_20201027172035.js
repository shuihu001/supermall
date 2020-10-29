
import {debounce} from "common/utils.js";
export const itemListenerMixin = {
    mounted(){
        const refresh = debounce(this.$refs.scroll.refresh,500)
        //对监听的事件进行保存
        this.itemImgListener = ()=>{
        refresh()
      // this.$refs.scroll.refresh()
      
            }
        this.$bus.$on('ItemImageLoad', this.itemImgListener)
        // console.log('我是混入')
    }
}
