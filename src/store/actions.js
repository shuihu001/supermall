	import{
		ADD_COUNTER,
		ADD_TO_CART
	} from "./mutation-types.js"
export default {

	addCart(context, payload) {
		// state.cartList.push(payload)
		// let index = state.cartList.indexOf(payload)
		// 1.查找数组中是否含有该商品
		let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
		// 2.判断oldProduct
		if(oldProduct){
			// oldProduct.count += 1
			context.commit(ADD_COUNTER, oldProduct)
		}else{
			payload.count = 1
			context.commit(ADD_TO_CART, payload)
		}
	}
}