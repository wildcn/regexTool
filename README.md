#基于js的正则验证工具类
## Test
<p>正在学习正则，写一个工具类，希望不断完善它</p>
<h1>代码介绍</h1>
<p>项目使用json来导入需要验证的配置，json中包括验证码与id，在json中，可以设置回调函数，通过判断参数布尔值，来执行验证后续的操作</p>
<p>目前验证基于onbulr事件，不支持点击验证，且验证后，会自动添加一个span标签，输出验证内容</p>
<h2>new传入两个参数，数据包和点击验证或提交按钮（可选）</h2>
<p>var regex = new regexTool(jsonData, 'click');</p>
<h1>数据包导入格式如下：</h1>
<pre><code>
	var jsonData = {
	'email': {
		id: 'emailtext',
		required: 'true',
		success: {
			serverresponse: function(i, obj) {},
			tips: '服务器，成功！'
		},
		failure: {
			tips: '验证失败'
		},
		fu: function(booleans) {}
	},
	'mobile': {
		id: 'mobileyz',
		fu: function(booleans) {}
	},
	'customword': {
		id: 'shortword',
		wordlength: '{2,10}',
		fn: function() {}
	},
	http: {
		id: 'http'
	},
	'videoname': {
		id: 'vname',
		custom: 'true',
		success: {
			tips: '自定义对'
		},
		failure: {
			tips: "自定义错了"
		},
		fu: function(i, obj) {
			regex.output(true,i);
		}
	}
};
</code></pre>
<p>
	通过初始化数据，绑定id，就可以实现常用的验证，可以使用回调函数，来执行验证后的操作，函数内回传一个布尔值！
</p>
<p>
	custom:属性存在时，函数将不会调用默认正则，可以自定义调用，当然，也可以使用类内的output函数。
</p>
<p>wordlength:属性存在时，允许正则自定义元字符数量，例子是2-10个。</p>
<p>required:属性存在时，将设置为必填项，全部填完后，点击按钮会有函数判断。</p>
<p>
	当success下有serverresponse属性时，支持服务器响应，服务器回传判断true，才继续验证，也可以通过回调函数，来修改响应的tips的文字。
</p>
<h1>目前支持的判断有：</h1>
<p>邮箱验证</p>
<p>手机验证</p>
<p>IP验证</p>
<p>匹配中文</p>
<p>固定电话</p>
<p>QQ验证</p>
<p>短信验证</p>
<p>身份证验证</p>
<p>自定义元字符长度</p>
<p>网址判断</p>
