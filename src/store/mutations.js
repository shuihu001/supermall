import{
	ADD_COUNTER,
	ADD_TO_CART
} from "./mutation-types.js"

export default {
	//唯一的目的就是修改state中的状态
	//每个方法尽可能完成单一的事件
	[ADD_COUNTER](state, payload){
		payload.count++
	},
	[ADD_TO_CART](state, payload){
			payload.checked = true
			state.cartList.push(payload)
	}
}