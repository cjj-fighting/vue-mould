<template>
	<div class="banner" @mouseenter="showCover" @mouseleave="hideCover">
		<img src="../../build/xiyang.png" alt="">
		<div class="cover" v-show="isShow">
			<span @click="delSelf(index)">删除</span>
			<!-- <span>编辑</span> -->
			<!-- <span v-show="index !== 0" @click="moveUp(index)">上移</span>
			<span v-show="index !== store.state.items.length - 1" @click="moveDown(index)">下移</span> -->
			<span @click="moveUp(index)">上移</span>
			<span @click="moveDown(index)">下移</span>
		</div>

	</div>
</template>

<script>
	import store from '../store/index.js'
	export default {
		props: [
			'index'
		],
		data() {
			return {
				isShow: false,
			}
		},
		methods: {
			showCover() {
				this.isShow = true
			},
			hideCover() {
				this.isShow = false
			},
			delSelf(index) {
				// console.log(index)
				this.$confirm('此操作将删除该模块, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// store.dispatch('delItem', index)
					store.commit('delItemIndex', index)
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},
			moveUp(index) {
				if(index === 0){
					this.$message.warning("已经是第一个了,不能再上移了")
					return
				}
				let items = store.state.items
				let tempA = items[index].comp
				let tempB = items[index - 1].comp
				items[index - 1].comp = tempA
				items[index].comp = tempB
				// store.dispatch('orderByItem', items)
				store.commit('orderByItemArr', items)
			},
			moveDown(index) {
				let length = store.state.items.length
				if(index === length - 1){
					this.$message.warning("已经是最后一个了,不能再下移了")
					return
				}
				let items = store.state.items
				let tempA = items[index].comp
				let tempB = items[index + 1].comp
				items[index + 1].comp = tempA
				items[index].comp = tempB
				// store.dispatch('orderByItem', items)
				store.commit('orderByItemArr', items)
			}
		},
		computed: {
		},
		watch: {
		},
		mounted() {
		}
	}
</script>

<style scoped>
	.banner {
		width: 100%;
		height: auto;
		margin: 0 auto;
		overflow: hidden;
		position: relative;
	}

	img {
		width: 100%;
	}

	.cover {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
		color: #fff;
		text-align: center;
		cursor: pointer;
	}
</style>
