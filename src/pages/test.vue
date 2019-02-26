<template>
	<div>
		<div class="phone">
			<div class="banner" :style="bannerStyle" @click="jumpNew">
				<img style="width: 100%;" src="../../build/xiyang.png" alt="">
				<el-button type="text" class="banner-edit" @click="showBannerEdit">编辑</el-button>
			</div>
			<div class="icon">
				<el-button type="text" class="banner-edit" @click="showIconEdit">编辑</el-button>
				<div v-for="item in icons" class="icon-box" :style="iconStyle">item</div>
			</div>
		</div>
		<div class="edit" v-show="isShowBanner">
			<div class="edit-title">
				编辑
			</div>
			<el-form style="padding-right: 5px;" :model="banner_form" label-width="80px">
				<el-form-item label="修改高度">
					<el-input v-model="banner_form.hight"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button size="mini" type="primary" @click="editBannerHeight">修改</el-button>
					<el-button size="mini" @click="cancleEditBanner">取消</el-button>
				</el-form-item>
			</el-form>
		</div>

		<div class="edit" v-show="isShowIcon">
			<div class="edit-title">
				编辑
			</div>
			<el-form style="padding-right: 5px;" :model="icon_form" label-width="80px">
				<el-form-item label="修改宽度">
					<el-input v-model="icon_form.width"></el-input>
				</el-form-item>
				<el-form-item label="修改高度">
					<el-input v-model="icon_form.height"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button size="mini" type="primary" @click="editIconHeight">修改</el-button>
					<el-button size="mini" @click="cancleEditIcon">取消</el-button>
				</el-form-item>
			</el-form>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				bannerStyle: {},
				iconStyle: {},
				isShowBanner: false,
				isShowIcon: false,
				banner_form: {
					hight: ''
				},
				icon_form: {
					width: '',
					height: ''
				},
				icons: [1, 2, 2, 2, 2, 'a']
			}
		},
		methods: {
			showBannerEdit() {
				this.isShowBanner = true
			},
			cancleEditBanner() {
				this.isShowBanner = !this.isShowBanner
			},
			editBannerHeight() {
				if (this.banner_form.hight) {
					this.bannerStyle = {
						height: this.banner_form.hight + 'px'
					}
				}
			},
			showIconEdit() {
				this.isShowIcon = true
			},
			editIconHeight() {
				if (this.icon_form.width || this.icon_form.height) {
					this.iconStyle = {
						width: this.icon_form.width + 'px',
						height: this.icon_form.height + 'px'
					}
				}
			},
			cancleEditIcon() {
				this.isShowIcon = !this.isShowIcon
			},
			jumpNew() {
				this.$router.push({
					name: 'Href',
					path: '/href'
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.phone {
		width: 375px;
		height: 667px;
		border: 1px solid #ccc;
		border-radius: 15px;
		margin: 50px 50px 0 200px;
		padding: 20px 0;
		float: left;
		overflow: hidden;
		position: relative;
	}

	.el-carousel__item h3 {
		color: #475669;
		font-size: 18px;
		opacity: 0.75;
		line-height: 300px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	.banner,
	.icon {
		width: 100%;
		overflow: hidden;
	}

	.icon {
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

	.edit {
		width: 500px;
		margin-left: 20px;
		background-color: #e6e6e6;
		float: left;
		margin-top: 50px;
	}

	.edit-title {
		line-height: 40px;
		padding-left: 10px;
	}
</style>
