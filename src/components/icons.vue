<template>
	<div class="icon" @mouseenter="showCover" @mouseleave="hideCover">
		<div v-for="item in icons" class="icon-box">item</div>
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
		props:['index'],
		data() {
			return {
				isShow: false,
				icons: [1, 2, 2, 2, 2, 'a']
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
				if(index === 0){
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
				if(index === length - 1){
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
	.icon {
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	.banner-edit {
		position: absolute;
		top: 15px;
		right: 5px;
		z-index: 500000;
	}

	.icon {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 10px 0;
	}

	.icon-box {
		background-color: #42B983;
		width: 100px;
		height: 50px;
		margin: 5px;
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
