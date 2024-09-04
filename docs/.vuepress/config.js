module.exports = {
    // base:配置部署站点的基础路径，后续再介绍
    title: 'Welcome!', // 网站的标题
    description: '欢迎光临我的个人博客', 
    head: [
      	['link', { rel: 'icon', href: '/background.jpg' }] // 需要被注入到当前页面的 HTML <head> 中的标签
    ],

	// 修改静态资源路径
	// TODO 不生效
	// public: "${sourceDir}/public",

    themeConfig: {
		// 配置导航栏
    	logo: '/logo.jpg',
		// 禁用导航栏
		// navbar: false,
		nav: [
			// 直接跳转，'/'为不添加路由，跳转至首页，以/结尾的最终对应的都是/index.html,也就是README.md文件编译后的页面
			{ text: '主页', link: '/' },
			// 对应blog/fontend/README.md
			{ text: '论文笔记', link: '/blog/papers/' },
			{ text: '软件分享', link: '/blog/softwares/' },
			// 对应/guide/guide.md
			{ text: '个人主页', link: '/homepage/homepage' },
		],

		// 配置侧边栏
		// 设置自动生成侧边栏
		// sidebar: 'auto',
		sidebar: {
			//对象的默认路径
			'/blog/softwares/': [
			  '', //侧边栏第一个页面是：/blog/fontend/README.md,、链接文字自动获取(页面的第一个header)，即h1(前端技术)
				['Obsidian', 'Obsidian'], //侧边栏第二个页面是：/blog/fontend/java.md ,指定链接的文字，使用一个格式为 [link, text] 的数组。
				['Notion', 'Notion'],
			]
		},
		sidebarDepth: 3,

		// 设置搜索栏
		search: true, // 设置是否使用导航栏上的搜索框
    	searchMaxSuggestions: 10,  // 搜索框显示的搜索结果数量

		// 更新时间, 基于git
		lastUpdated: false, // string | boolean		
    },
}