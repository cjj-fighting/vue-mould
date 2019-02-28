<template>
	<div class="shops" @mouseenter="showCover" @mouseleave="hideCover">
		<div class="shop-img">
			<img src="../../build/logo.png" alt="">
		</div>
		<div class="shop-desc">
			<p class="title">这是商品标题</p>
			<span class="desc">这是商品描述......这是商品描述......这是商品描述......这是商品描述......这是商品描述......这是商品描述......这是商品描述......</span>
		</div>
		<div class="cover" v-show="isShow">
			<span @click="delSelf(index)">删除</span>
			<span @click="moveUp(index)">上移</span>
			<span @click="moveDown(index)">下移</span>
		</div>

	</div>
</template>

<script>
	import store from '../store/index.js'
	export default {
		props: ['index'],
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
					store.dispatch('delItem', index)
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
				if (index === 0) {
					this.$message.warning("已经是第一个了,不能再上移了")
					return
				}
				let items = store.state.items
				let tempA = items[index].comp
				let tempB = items[index - 1].comp
				items[index - 1].comp = tempA
				items[index].comp = tempB
				store.commit('orderByItemArr', items)
			},
			moveDown(index) {
				let length = store.state.items.length
				if (index === length - 1) {
					this.$message.warning("已经是最后一个了,不能再下移了")
					return
				}
				let items = store.state.items
				let tempA = items[index].comp
				let tempB = items[index + 1].comp
				items[index + 1].comp = tempA
				items[index].comp = tempB
				store.commit('orderByItemArr', items)
			}
		},
	}
</script>

<style scoped="scoped">
	.shops {
		margin: 10px 0;
		overflow: hidden;
		padding: 5px 10px;
		position: relative;
	}

	.shop-img {
		width: 50px;
		float: left;
		margin-right: 5px;
	}

	.shop-desc {
		margin-left: 55px;
	}

	.title {
		font-weight: bold;
	}

	.desc {
		font-size: 14px;
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
