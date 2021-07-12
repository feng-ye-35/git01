# 使用教程
## 一、插件代码拷贝
### 下载后把components目录下uni-inputse和uni-menuse文件夹拷贝到自己项目目录下
## 二、组件的注册
### 1.组件引入使用easycom。[easycom——HBuilderX官方](https://uniapp.dcloud.io/collocation/pages?id=easycom)只需要两步(HBuilderX 2.5.5起支持easycom组件模式.只要命名符合格式就不需注册@/components/uni-$1/uni-$1.vue)
```
<!-- pages.json页面内添加 -->
"easycom": {
		"autoscan": true,
		"custom": {
			"^uni-(.*)": "@/components/uni-$1/uni-$1.vue", // 匹配components目录内的vue文件
			"^vue-file-(.*)": "packageName/path/to/vue-file-$1.vue" // 匹配node_modules内的vue文件
		}
	}
<!-- index页面 -->
<view>
		<uni-menuse :dataSource="dataSource" placeholder="请输入商品名称" />
</view>
<!-- 用于测试的数据 -->
return {
				dataSource: [{
						// id: 1,
						title: '轮椅1', // 文章标题
						img: '../../static/logo.png', // 文章封面
						writer: '陆01',// 作者名称(昵称)
						builder_tool: "HBuilder",// 开发工具
						builder_frame: "uni-app+vue",// 开发框架
						builder_language: "JS、CSS",// 开发工具语言
						// 用于全局管理
						root:"all",
						// 例如有需要封禁的
						// root:"ban",
					},
					{
						// id: 2,
						title: '黄豆1',
						img: '../../static/logo.png', 
						user_accounts: '13999999999',
						writer: '陆12',
						builder_tool: "HBuilder",
						builder_frame: "H5",
						builder_language: "JS、CSS",
						root:"all",
					},
					{
						// id: 3,
						title: '豆腐花1',
						img: '../../static/logo.png', 
						user_accounts: '1399999995',
						writer: '陆03',
						builder_tool: "HBuilderX",
						builder_frame: "uni-app+vue",
						builder_language: "JAVA",
						root:"all",
					}],
			}
```
--------------------------------------------------
### 1.组件引入也可以使用全局注册或局部注册。[全局注册——HBuilderX官方](https://uniapp.dcloud.io/collocation/pages?id=全局注册)
```
<!-- main页面 -->
import uni-menuse from './components/uni-menuse/uni-menuse.vue'
import uni-inputse from './components/uni-inputse/uni-inputse.vue'

Vue.component('uni-menuse', uni-menuse)
Vue.component('uni-inputse', uni-inputse)

<!-- index页面 -->
<view>
		<uni-menuse :dataSource="dataSource" placeholder="请输入商品名称" />
</view>
<!-- 用于测试的数据 -->
return {
				dataSource: [{
						// id: 1,
						title: '轮椅1', // 文章标题
						img: '../../static/logo.png', // 文章封面
						writer: '陆01',// 作者名称(昵称)
						builder_tool: "HBuilder",// 开发工具
						builder_frame: "uni-app+vue",// 开发框架
						builder_language: "JS、CSS",// 开发工具语言
						// 用于全局管理
						root:"all",
						// 例如有需要封禁的
						// root:"ban",
					},
					{
						// id: 2,
						title: '黄豆1',
						img: '../../static/logo.png', 
						user_accounts: '13999999999',
						writer: '陆12',
						builder_tool: "HBuilder",
						builder_frame: "H5",
						builder_language: "JS、CSS",
						root:"all",
					},
					{
						// id: 3,
						title: '豆腐花1',
						img: '../../static/logo.png', 
						user_accounts: '1399999995',
						writer: '陆03',
						builder_tool: "HBuilderX",
						builder_frame: "uni-app+vue",
						builder_language: "JAVA",
						root:"all",
					}],
			}
```
## 三、css样式用到了lang="scss"。[官方文档](https://uniapp.dcloud.net.cn/collocation/uni-scss?id=collocation)
```
<style lang="scss">
</style>
<!-- 如果不想用需要麻烦自行修改 -->
```
