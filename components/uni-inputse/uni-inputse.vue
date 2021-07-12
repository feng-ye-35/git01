<template>
	<view>
		<!-- 搜索实现 -->
		<view class="input-group">
			<input :placeholder="placeholder" @input="search($event,btmenu_name)" v-model="search_val"
				@confirm="search_con" />
			<view class="ul">
				<view class="li" v-for="(item,index) in list" :key="index" @click="select(item)">
					<view>
						{{item.title}}
						作者:{{item.writer}}
					</view>
				</view>
			</view>
		</view>

		<!-- 搜索栏下方,内容显示 -->
		<!-- 没搜索时显示全部 → 搜索时显示提示栏的内容 → 搜索完成回车，显示对应名称的内容 -->
		<view class="search_content" v-for="(item,index) in dataSource" :key="index" v-if="search_no">
			<!-- @click="btcontent(item)" -->
			<view class="se_content">
				<image :src="item.img" mode="" style="width: 175px;height: 175px;margin-top: 6px;">
					<view class="se_text">
						<view>标题:{{item.title}} &#12288&#12288&#12288 作者:{{item.writer}}</view>
						简介:{{item.writer}}
					</view>
			</view>

		</view>
		<view class="search_content" v-for="(item,index) in search_content" :key="index" v-if="search_ing">
			<!-- @click="btcontent(item)" -->
			<view class="se_content">
				<image :src="item.img" mode="" style="width: 175px;height: 175px;margin-top: 6px;">
					<view class="se_text">
						<view>标题:{{item.title}} &#12288&#12288&#12288 作者:{{item.writer}}</view>
						简介:{{item.writer}}
					</view>
			</view>
		</view>
		<view class="search_content" v-for="(item,index) in list" :key="index" v-if="search_on">
			<!-- @click="btcontent(item)" -->
			<view class="se_content">
				<image :src="item.img" mode="" style="width: 175px;height: 175px;margin-top: 6px;">
					<view class="se_text">
						<view>标题:{{item.title}} &#12288&#12288&#12288 作者:{{item.writer}}</view>
						简介:{{item.writer}}
					</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			placeholder: String, //默认提示
			searchKey: String, //模糊搜索的key值
			// 从父组件uni-botnav得到的数据
			dataSource: {
				type: Array,
				default: function() {
					return [];
				},
			},
			btmenu_name: {
				type: String,
				default: function(value) {
					return value;
				},
			},
		},
		data() {
			return {
				search_val: '', // 绑定的搜索输入框的值

				list: [], // 用于放置提示栏信息的数组

				search_content: [], // 用于搜索内容的数组

				// 控制云函数搜索数据库索引
				search_tool: '', // 开发工具限制
				search_frame: '', // 开发框架限制
				search_language: '', // 开发语言限制
				// 控制内容栏各时段显示
				search_no: true,
				search_ing: false,
				search_on: false,
			};
		},
		destroyed() {
			clearTimeout(this.t);
		},
		methods: {
			// @input，输入数据时触发
			search(e, value) {
				console.log("输入框变动:", e)
				console.log("value:", value)
				let val = e.detail.value;
				let {
					dataSource
				} = this;
				let arr = [];
				// 如果索引为空，默认搜索标题dataSource[i].name；索引为作者搜索关键字改为writer
				if (value == '') {
					for (let i = 0; i < dataSource.length; i++) {
						if (dataSource[i].title.indexOf(val) !== -1) {
							arr.push(dataSource[i]);
							// push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
						}
					}
				}
				if (value == 'search_writer') {
					for (let i = 0; i < dataSource.length; i++) {
						if (dataSource[i].writer.indexOf(val) !== -1) {
							arr.push(dataSource[i]);
						}
					}
				}
				if (!val) {
					this.list = [];
				} else {
					this.list = arr;
					this.search_content = this.list;
					// 显示搜索中内容
					this.search_no = false;
					this.search_ing = true;
					this.search_on = false;
				}
			},
			// @click，点击提示栏时触发
			select(item) {
				this.search_val = item.title;
				this.list = [];
				this.$emit('select', item);
				// 此处对search_val赋值无法触发@input，必须输入
				// 那么如何实现点击进行搜索呢？
				let val = this.search_val;
				let {
					search_content
				} = this;
				let arr = [];
				for (let i = 0; i < search_content.length; i++) {
					if (search_content[i].title.indexOf(val) !== -1) {
						arr.push(search_content[i]);
					}
				}
				if (!val) {
					this.list = [];
				} else {
					this.list = arr;
					// 显示搜索结束后内容
					this.search_no = false;
					this.search_ing = false;
					this.search_on = true;
				}
				
			},
			// @confirm，回车时触发
			search_con(e) {
				console.log("e:", e)
				let val = e.detail.value;
				let {
					search_content
				} = this;
				let arr = [];
				for (let i = 0; i < search_content.length; i++) {
					if (search_content[i].title.indexOf(val) !== -1) {
						arr.push(search_content[i]);
					}
				}
				if (!val) {
					this.list = [];
				} else {
					this.list = arr;
					// 显示搜索结束后内容
					this.search_no = false;
					this.search_ing = false;
					this.search_on = true;
				}
			},
			// @click，点击搜索内容触发跳转详细页面,数据库ID唯一带ID跳转；测试的带标题和用户号跳转
			// btcontent(item) {
			// 	// 无数据库，用标题和用户号
			// 	console.log(item)
			// 	uni.navigateTo({
			// 		url: '../../pages/book_content/book_content?id=' + item.user_accounts + "&writer=" + item
			// 			.writer + "&title=" + item.title
			// 	})
			// 	// // 调用数据库用ID查询
			// 	// uni.navigateTo({
			// 	// 	url: "../../pages/book_content/book_content?id=" +item._id
			// 	// })
			// }
		}
	}
</script>


<style lang="scss">
	// 搜索输入框控制
	.input-group {
		position: relative;

		input {
			border: 1upx solid gray;
			height: 90upx;
			width: 80%;
			padding-left: 10upx;
			font-size: 30upx;
			box-sizing: border-box;
			border: 2px solid #333333;
			margin-left: 2px;
		}

		.ul {
			position: absolute;
			left: 0;
			top: 100%;
			width: 100%;
			z-index: 10;
			background: #eaeaea;

			.li {
				border-bottom: 1upx solid gray;
				line-height: 60upx;
				z-index: 11;
			}
		}
	}

	// 搜索显示控制
	.search_content {
		display: flex;
		flex-direction: column;

		.se_content {
			display: flex;
			flex-direction: row;
		}

		.se_text {
			display: flex;
			flex-direction: column;
		}
	}
</style>
