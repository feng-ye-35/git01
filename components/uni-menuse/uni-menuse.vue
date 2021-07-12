<template>
	<!-- 书库页面的索引栏，该页面为父组件，连接子组件搜索栏；子组件搜索内容栏 -->
	<view>
		<view class="">
			<view class="top_nav">
				<view class="nav-box">
					<view class="search_btmenu" v-for="(item,index) in dataList" :key="index">
						<button type="default" @click="click(item.clickBtn)"
							:name="item.clickBtn">{{item.name}}</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 搜索栏子组件 -->
			<uni-inputse :dataSource="dataSource" :btmenu_name="btmenu_name" placeholder="请输入商品名称"/>
	</view>
</template>

<script>
	export default {
		props: {
			dataSource: {
				type: Array,
				// 从页面的到数据
				default: function() { //数据源
					return [];
				},
				// 默认值：function（）{
				// 返回[]；
				// }
			},
			},
		data() {
			return {
				btmenu_name: '', // 搜索的索引名字，例如:作者，标题
				// 搜索的索引控制
				// 作者和标题可作为索引；
				// 如果点击工具、框架等，会弹出输入框，根据输入框填入信息。例如:工具名称，传输Date数据给云函数
				// 云函数查询工具名称数据得到数组；返回给页面。
				// 页面将数组赋值给查询用的空数组；之后查询数组内就全是那个工具的
				dataList: [{
					"name": "作者",
					"clickBtn": "writer",
				}, {
					"name": "标题",
					"clickBtn": "title"
				}, {
					"name": "工具",
					"clickBtn": "builder_tool"
				}, {
					"name": "框架",
					"clickBtn": "builder_frame"
				}, {
					"name": "语言",
					"clickBtn": "builder_language"
				}],
			};
		},
		methods: {
			// 点击索引筛选
			click: function(e) {
				this[e]();
			},
			writer: function() {
				console.log("当前索引为作者")
				this.btmenu_name = "search_writer"
				uni.showToast({
					title: '当前索引为作者',
					duration: 2000
				});
			},
			title: function() {
				console.log("当前索引为标题")
				this.btmenu_name = ''
				uni.showToast({
					title: '当前索引为标题',
					duration: 2000
				});
			},
			builder_tool: function() {
				uni.showActionSheet({
					itemList: ['HBuilderX', '暂无', '暂无'],
					success: function(res) {
						// console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						// tapIndex	Number	用户点击的按钮，从上到下的顺序，从0开始
						if (res.tapIndex == 0) {
							this.search_tool = "HBuilderX"
							console.log("限制开发工具为", this.search_tool)
							// 提示索引信息
							if (this.btmenu_name == '') {
								console.log("当前索引为标题")
							} else {
								console.log("当前索引为作者")
							}
							// 调用数据库获取开发工具为HBuildrX的书籍信息
							uni.showLoading({
								title: '只显示开发工具为' + this.search_tool + '的内容',
							});
							// uniCloud.callFunction({
							// 	name:"get_HBuildrXbook_message",
							// 	data:{
							// 		builder_tool:"HBuilderX",
							// 	},
							// 	success: (res) => {
							// 		console.log(res)
							// 		this.dataSource = res.result.data;
							// 		console.log("dataSource:",this.dataSource)
							// 		// console.log("获得书籍信息:",this.data)
							// 	},
							// 	fail: (err) => {
							// 		console.log(err)
							// 	}
							// })
							setTimeout(function() {
								uni.hideLoading();
							}, 2000);
						}
						if (res.tapIndex == 1) {
							uni.showModal({
								title: '提示',
								content: '暂时作者没学其他',
								success: (res) => {}
							})
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			// 框架索引
			builder_frame: function() {
				uni.showActionSheet({
					itemList: ['uni-app', 'vue.js', '暂无'],
					success: function(res) {
						// console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						// tapIndex	Number	用户点击的按钮，从上到下的顺序，从0开始
						if (res.tapIndex == 0) {
							this.search_frame = "uni-app"
							console.log("限制开发框架为", this.search_frame)
							// 提示索引信息,this.name为空则默认是标题，反之则是作者
							if (this.btmenu_name == '') {
								console.log("当前索引为标题")
							} else {
								console.log("当前索引为作者")
							}
							// 调用数据库
							uni.showLoading({
								title: '只显示开发框架为' + this.search_frame + '的内容'
							});

							setTimeout(function() {
								uni.hideLoading();
							}, 2000);

						}
						if (res.tapIndex == 1) {
							uni.showModal({
								title: '提示',
								content: '暂时作者没学其他',
								success: (res) => {

								}
							})
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			builder_language: function() {
				uni.showActionSheet({
					itemList: ['JS', 'CSS', '暂无'],
					success: function(res) {
						// console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						// tapIndex	Number	用户点击的按钮，从上到下的顺序，从0开始
						if (res.tapIndex == 0) {
							this.search_language = "JS"
							console.log("限制开发语言为", this.search_language)
							// 提示索引信息,this.name为空则默认是标题，反之则是作者
							if (this.btmenu_name == '') {
								console.log("当前索引为标题")
							} else {
								console.log("当前索引为作者")
							}
							// 调用数据库
							uni.showLoading({
								title: '只显示开发语言为' + this.search_language + '的内容'
							});
							setTimeout(function() {
								uni.hideLoading();
							}, 2000);

						}
						if (res.tapIndex == 1) {
							this.search_language = "CSS"
							console.log("限制开发语言为", this.search_language)
							// 提示索引信息,this.name为空则默认是标题，反之则是作者
							if (this.btmenu_name == '') {
								console.log("当前索引为标题")
							} else {
								console.log("当前索引为作者")
							}
							// 调用数据库
							uni.showLoading({
								title: '只显示开发语言为' + this.search_language + '的内容'
							});
							setTimeout(function() {
								uni.hideLoading();
							}, 2000);
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	// 顶部索引控制
	.top_nav {
		position: relative;
		top: 0;
		width: 100%;
		box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.06);
		background: #fff;
		z-index: 10;
		// position: fixed;
		// /* 元素的位置相对于浏览器窗口是固定位置。即使窗口是滚动的它也不会移动： */
		// top: 10;
		// left: 0;
		// right: 0;
		// width: 100%;
		// /* height: $navHeight; */
		// box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.06);
		// margin:0px 20px 0px 0px;
		// // 上.下.右.左
		// background: #fff;
		// z-index: 10;
	}

	.nav-box {
		display: flex;
		width: 100%;
		box-sizing: border-box;
	}

	.search_btmenu {
		width: 33.3%;
	}
</style>
