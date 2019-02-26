import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)


let store = new vuex.Store({
	state: {
		items: []
	},
	// 	getters: { //这里可以不用
	// 		getItems(state) {
	// 			return state.items
	// 		}
	// 	},

	/**
	 * 直接改变state值,注意必须是同步
	 */
	mutations: {
		setItemsObj(state, obj) {
			state.items.push(obj)
		},
		delItemIndex(state, index) {
			state.items.splice(index, 1)
		},
		orderByItemArr(state, arr) {
			state.items = arr
		}
	},
	/**
	 * actions用于提交mutations,这里面可以一步调用
	 */
	actions: {
		// 添加item
		setItems({
			commit,
			state
		}, obj) {
			commit('setItemsObj', obj)
		},
		// 按照索引删除items中的某一项
		delItem({
			commit,
			state
		}, index) {
			commit('delItemIndex', index)
		},
		// 将排序后的item重新提交
		orderByItem({
			commit,
			state
		}, arr) {
			commit('orderByItemArr', arr)
		},
	},
})

export default store
