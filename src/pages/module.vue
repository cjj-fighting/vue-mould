<template>
	<div>
		<ul class="module-list">
			<li @click="addItem('banner')">banner</li>
			<li @click="addItem('icons')">icons</li>
			<li @click="addItem('shops')">shops</li>
		</ul>

		<!-- <div class="phone">
			<component :is="item" v-for="(item, index) in items" :key="index"></component>
		</div> -->

		<div class="phone">
			<draggable v-model="items" @update="datadragEnd" :options="{animation:500}">
				<transition-group>
					<component :is="item.comp" v-for="(item, index) in items" :index="index" :key="index"></component>
				</transition-group>
			</draggable>
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
				store.dispatch('orderByItem', this.items)
			},
			addItem(item) {
				// 				this.items = this.items.push({
				// 					comp: item
				// 				})
				// 选择模块后将此模块提交
				store.dispatch('setItems', {
					comp: item
				})
				// 也可以直接提交mutations
				// 				store.commit('setItemsObj', {
				// 					comp: item
				// 				})
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
			}
		},
		watch: {
			getItems: function(newVal, oldVal) {
				// console.log(newVal)
				// console.log(oldVal)
				// 监听state变化,更改视图
				this.items = newVal
			}
		},
	}
</script>

<style scoped="scoped">
	.module-list {
		width: 350px;
		float: left;
		background-color: #ECECEC;
		margin-top: 20px;
	}

	li {
		line-height: 40px;
		text-align: center;
		cursor: pointer;
	}

	.phone {
		width: 375px;
		height: 627px;
		border: 1px solid #ccc;
		border-radius: 15px;
		margin: 20px 50px 0 200px;
		padding: 20px 0;
		float: left;
		overflow-y: scroll;
	}

	/* .test{
        border:1px solid #ccc;
    }
    .drag-item{
        width: 200px;
        height: 50px;
        line-height: 50px;
        margin: auto;
        position: relative;
        background: #ddd;
        margin-top:20px;
    }
    .ghostClass{
        opacity: 1;
    }
    .bottom{
        width: 200px;
        height: 50px;
        position: relative;
        background: blue;
        top:2px;
        left: 2px;
        transition: all .5s linear;
    } */
</style>
