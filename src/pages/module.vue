<template>
	<div>
		<!-- <ul class="module-list">
			<li @click="addItem('banner')">banner</li>
			<li @click="addItem('icons')">icons</li>
			<li @click="addItem('shops')">shops</li>
		</ul> -->

		<div class="module-list">
			<el-tag>点击选择模块:</el-tag>
			<el-tag @click="addItem('banner')" type="success">banner模块</el-tag>
			<el-tag @click="addItem('icons')" type="danger">icons模块</el-tag>
			<el-tag @click="addItem('shops')" type="warning">shops模块</el-tag>
		</div>

		<div class="main">
			<div class="phone">
				<draggable v-model="items" @update="datadragEnd" :options="{animation:500}">
					<transition-group>
						<component :is="item.comp" v-for="(item, index) in items" :class="index" :index="index" :key="index"></component>
					</transition-group>
				</draggable>
			</div>
			<div class="edit">
				<div class="title">修改属性</div>
				<el-form ref="form" :model="form" label-width="80px">

					<el-form-item label="修改宽度">
						<el-input v-model="form.width"></el-input>
					</el-form-item>
					<el-form-item label="修改高度">
						<el-input v-model="form.height"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">修改</el-button>
						<el-button>取消</el-button>
					</el-form-item>
				</el-form>
			</div>

		</div>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	import banner from '../components/banner.vue'
	import icons from '../components/icons.vue'
	import shops from '../components/shops.vue'

	import store from '../store/index.js'

	export default {
		data() {
			return {
				items: [],
				form: {
					width: null,
					height: null
				},

			}
		},
		components: {
			draggable,
			banner,
			icons,
			shops
		},
		methods: {
			datadragEnd(evt) {
				evt.preventDefault();
				// 				console.log('拖动前的索引 :' + evt.oldIndex)
				// 				console.log('拖动后的索引 :' + evt.newIndex)
				// console.log(this.items);
				// 排序后重新提交
				// store.dispatch('orderByItem', this.items)
				store.commit('orderByItemArr', this.items)
			},
			addItem(item) {
				// 				this.items = this.items.push({
				// 					comp: item
				// 				})
				// 选择模块后将此模块提交
				// 				store.dispatch('setItems', {
				// 					comp: item
				// 				})
				// 也可以直接提交mutations
				store.commit('setItemsObj', {
					comp: item
				})
			}
		},
		mounted() {
			//为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
			document.body.ondrop = function(event) {
				event.preventDefault();
				event.stopPropagation();
			}
			// 初始化items
			this.items = store.state.items
			// console.log(store.state.items)
		},
		computed: {
			getItems() {
				// 监听state变化
				return store.state.items
			},

		},
		watch: {
			// 			getItems: function(newVal, oldVal) {
			// 				console.log(newVal)
			// 				console.log(oldVal)
			// 				// 监听state变化,更改视图
			// 				if (newVal !== oldVal) {
			// 					this.items = newVal
			// 				}
			// 			},

			getItems: {
				deep: true,
				handler(newVal) {
					// 由于是异步载入，所以只能在状态值的变化时执行渲染操作
					// 绝不可在mounted中执行render方法
					this.items = newVal
				}
			},
		},
	}
</script>

<style scoped="scoped">
	.module-list {
		/* width: 350px;
		float: left;
		background-color: #ECECEC;
		margin-top: 20px; */
		line-height: 80px;
		background-color: #ECECEC;
		padding-left: 20px;
	}

	li {
		line-height: 40px;
		text-align: center;
		cursor: pointer;
	}
	
	.el-tag{
		cursor: pointer;
	}

	.main {
		width: 80%;
		margin: 0 auto;
	}

	.phone {
		width: 375px;
		height: 627px;
		border: 1px solid #ccc;
		border-radius: 15px;
		margin: 20px 50px 0 0;
		padding: 20px 0;
		overflow-y: scroll;
	}


	.edit {
		background-color: #e6e6e6;
		width: 400px;
		height: auto;
		float: left;
		padding-right: 10px;
		padding-top: 10px;
		margin-top: 20px;
		display: none;
	}

	.title {
		line-height: 40px;
		text-align: center;
		margin-bottom: 15px;

	}
</style>
