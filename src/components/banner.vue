<template>
	<div class="banner" @mouseenter="showCover" @mouseleave="hideCover">
		<img src="../../build/xiyang.png" alt="">
		<div class="cover" v-show="isShow">
			<span @click="delSelf(index)">删除</span>
			<span>编辑</span>
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
				isShow: false
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
				// console.log(store.state.items)
			}
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
		z-index: 2018;
		color: #fff;
		text-align: center;
		cursor: pointer;
	}
</style>
