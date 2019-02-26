<template>
	<div class="shops"  @mouseenter="showCover" @mouseleave="hideCover">
		<div class="shop-img">
			<img src="../../build/logo.png" alt="">
		</div>
		<div class="shop-desc">
			<p class="title">这是商品标题</p>
			<span class="desc">这是商品描述......这是商品描述......这是商品描述......这是商品描述......这是商品描述......这是商品描述......这是商品描述......</span>
		</div>


		<div class="cover" v-show="isShow" @click="delSelf(index)">删除</div>
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
		z-index: 2018;
		color: #fff;
		text-align: center;
		cursor: pointer;
	}
</style>
