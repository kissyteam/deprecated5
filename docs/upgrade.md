# KISSY5.0主要升级点
------------------------------

*说明：*这个文档是KISSY5.0相对KISSY1.4.x的升级点介绍，主要分为三个部分：模块更新、新增模块、建议用法。每个部分以模块为单位介绍列出涉及到变化的模块及相关用法。此外，由于变化的点比较多，如果不够全面细致，还请大家多多指出，一起来完善这个文档。非常感谢！

## 模块更新

1. **种子文件 seed**

	1.1 KISSY@5.0 版本去掉了 KISSY 关键词（不再存在KISSY这个全局变量，新版本的全局变量 modulex 作用近似 KISSY），独立出新一代模块加载器[modulex](https://github.com/kissyteam/modulex)，可单独作为纯粹的模块加载器使用。实际上，种子文件seed.js是由 modulex + feature + ua + meta 四部分组成。

		//deprecated usage
		KISSY.config({  });  //配置

		KISSY.add('modName', ['modDep1'], function(S, require, exports, module){  //添加模块

		}); 
		KISSY.use(['json'], function(S, JSON){   //引用模块
			//S === KISSY
		});

		//now usage
		require.config({  });   //配置

		define('modName', ['modDep1'], function(require, exports, module){  //添加模块 

		});

		require(['json'], function(JSON){  //引用模块
			// no `S` here
		})

	1.2 压缩的文件是 *.js，未压缩的是 *-debug.js，与以前的 \*-min.js区分开。

	1.3 去除在引入seed.js的url上加上 `?ks-debug` 来配置 `KISSY.Config.debug` 的逻辑，如要带调试语句直接引用seed-debug.js，不带调试语句（压缩）的引用seed.js

		//deprecated usage
		<script src="seed.js?ks-debug">

		//now usage
		<script src="seed-debug.js">  //for debug
		<script src="seed.js">        //no debug

	1.4 从seed.js里面拆分出`util`模块，替代之前`lang`模块。这样如果只是引入seed.js的话，以前`lang`模块的函数，如 `escapeHTML`、`unique`等函数无法直接使用，需要额外引入`util`模块。此外，`isNull`、`isUndefined`、`fromeUnicode`、`equals`这几个函数被移除。

		//deprecated usage
		KISSY.ready(function(S){
			S.endsWith(str, suffix);
			//use S.XXX
		});

		//now usage
		require(['util'], function(Util){
			Util.endsWith(str, suffix);
			//use Util.XXX
		})

	1.5 Cookie/IO/io/Amim/DOM/JSON/ajax/Ajax 这些接口不再挂在全局对象KISSY下了，需要引用相应模块的时候取得相应的接口来使用。

		//deprecated usage
		KISSY.use('dom,io', function(S){
			//S.DOM.hasClass('#test','clickable')
			//use S.IO() or S.Ajax
		})

		//now usage
		require(['dom', 'io'], function(DOM, IO){
			//DOM.hasClass('#test','clickable')
			//use IO
		})

	1.6 去除 ignorePackageNameInUri 配置 (默认 true) [issue for detail](https://github.com/kissyteam/kissy/issues/593)

		//deprecated usage
		KISSY.config({
			packages : {
				'my-pacakage' : {
					base : 'http://example.com/my-package/',
					ignorePackageNameInUri : true
				}
			}
		})

		//now usage
		require.config({
			packages : {
				'my-pacakage' : {
					base : 'http://example.com/my-package/'
				}
			}
		})

	1.7 现在的seed.js其实是由 modulex + ua + feature + meta 四个部分组成的。
	
		<script src='??modulex.js,ua.js,feature.js,meta.js'></script>
		//相当于
		<script src='seed.js'></script>
	
	1.8 针对上面的1.3和1.4还有下面将说到的event模块拆分3.1，以及KISSY@1.4.x的大部分用法。可以额外引入deprecated.js兼容文件来兼容老用法，[兼容包项目](https://github.com/kissyteam/deprecated5)

		//在引入seed.js同时引入deprecated.js来兼容KISSY@1.4.x的大部分用法
		<script src='http://g.tbcdn.cn/kissy/edge/2014.07.16/??seed.js,deprecated.js'></script>

	1.9 增加包配置 filter，去除自动加载 debug 模块机制。[issue for detail](https://github.com/kissyteam/kissy/issues/604)

		//deprecated usage
		KISSY.config({
			packages : {
				a : {
					debug : true,
					base : 'http://a/'
				},
				b : {
					base : 'http://b/'
				}
			}
		});
		//use('a/a') -> http://a/a-debug.js
		//use('b/b') -> http://b/b.js

		//now usage
		require.config({
			packages : {
				a : {
					filter : 'debug',
					base : 'http://a/'
				},
				b : {
					base : 'http://b/'
				}
			}
		});
		//use('a/a') -> http://a/a-debug.js
		//use('b/b') -> http://b/b.js

2. **anim**模块

	2.1 anim模块被拆分出anim/timer和anim/transition两个模块。use 'anim' 时，对于支持css3的浏览器，KISSY不会加载anim/timer模块，而是使用anim/transition模块。[issue for detail](https://github.com/kissyteam/kissy/issues/582)。此外，如果仅是想对滚动条做动画，又觉得anim/timer模块过大的话可以考虑使用gallery上面的一个小组件[attr-anim](http://gallery.kissyui.com/attr-anim/doc/guide/index.html)

		//deprecated usage
		KISSY.use('anim', function(S){
			var myAnimIns = new S.Anim('#test',{
				width : 200,
				color : '#fff'
			},{
				easing : 'ease-in',
				duration : 3,
				//根据配置项 useTransition 来判断是否使用 css3 transition 来做动画
				useTransition : true   //使用css3 transition提升性能, 默认 false
			});
		})	

		//now usage
		require(['anim'], function(Anim){
			//自动识别，支持css3 transition的浏览器自动加载 anim/transition 模块，否则自动加载 anim/timer 模块
			//use Anim
		})

3. **event**模块
	
	3.1 去掉了`event`模块，细粒化 event。拆分成了三部分：event-dom 、 event-custom 和 event-dom/gesture/* 。

		//deprecated usage
		KISSY.use('event', function(S, Event){
			//dom 事件
			Event.on('#test', 'click', function(ev){
				//do something
			});

			//移动端事件
			Event.on(document, "swipe", function (ev) {
			    alert(ev.type + ' : fired');
			});

			//自定义事件
			var myObj = {};
			S.mix(myObj, Event.Target);
			myObj.on('willBeFired', function(ev){
				alert('I will be fired...');
			})
			myObj.fire('willBeFired');

		});

		//now usage-------------------------

		//dom 事件
		require(['event-dom'], function(DomEvent){  
			DomEvent.on('#test', 'click', function(ev){
				//do something
			});
		});

		//移动端事件
		require(['event-dom', 'event-dom/gesture/swipe'], function(DomEvent, SwipeGesture){
			DomEvent.on(document, SwipeGesture.SWIPE, function(ev){
				alert(ev.type + ' : fired');
			});
		});

		//自定义事件
		require(['util','event-custom'], function(Util, CustomEvent){
			var myObj = {};
			Util.mix(myObj, CustomEvent.Target);
			myObj.on('willBeFired', function(ev){
				alert('I will be fired...');
			})
			myObj.fire('willBeFired');
		});

	3.2 删除 valuechange 事件，支持 input 事件 [issue for detail](https://github.com/kissyteam/kissy/issues/549)

		//deprecated usage
		KISSY.use('event', function(S, Event){
			Event.on('#test', 'valuechange', function(ev){
				//do something
			});
		});

		//now usage
		require(['event-dom'], function(DomEvent){
			DomEvent.on('#test', 'input', function(ev){
				//do something
			});
		});

4. **combobox**模块

	4.1 拆分出combobox/multi-word模块取代以前的ComboBox.MultiValueComboBox，并去掉`Combobox.FilterSelect`

		//deprecated usage
		KISSY.use('combobox', function(S, ComboBox){
			//use ComboBox.MultiValueCombobox
		})

		//now usage
		require(['combobox/multi-word'], function(MultiWord){
			//use MultiWord
		})

5. **xtemplate**模块的使用语法和引用方式都有很大改变，已经完全从KISSY剥离出来。可以单独使用，也可以和KISSY一起使用，在nodejs下使用。具体用法直接看[xtemplate](https://github.com/kissyteam/xtemplate)

6. 去除了 **uri** 模块，即不能再使用 `uri` 模块了。

## 新增模块/功能

2. **util**模块，这是从seed.js里拆分出来的一个underscore的函数集合，相关用法参考 “模块更新 -> 1.3”

3. **node**模块

	2.1 `node`模块兼容jQuery。详情：[issue for detail](https://github.com/kissyteam/kissy/issues/648)

		//以前的用法，现在仍可以使用，不过建议使用新用法
		KISSY.use('node', function(S, Node){
			var $ = Node.all; 
			//use $ like jQuery
		});

		//now usage
		require(['node'], function($){
			//use $ as jQuery
		});

4. 增加 [path](http://docs.kissyui.com/5.0/api/classes/Path.html)/[url](http://docs.kissyui.com/5.0/api/classes/Url.html)/[querystring](http://docs.kissyui.com/5.0/api/classes/Querystring.html) 模块， api 等同 nodejs

5. **event**模块

	5.1 支持drag手势[issue for detail](https://github.com/kissyteam/kissy/issues/573)
		
		//example usage
		var DragType = require('event/gesture/drag');
		node.on([DragType.DRAG_START,DragType.DRAG,DragType.DRAG_END],function(e){
			// e.deltaX;
			// e.deltaY;
			// e.velocityX;
			// e.velocityY;
			// e.pageX;
			// e,pageY;
			// e.startPos;
		});

	5.2 支持edge-drag手势[issue for detail](https://github.com/kissyteam/kissy/issues/597)

		//similar to ios/android notify menu
		var EdgeDragType = require('event/gesture/edge-drag');
		node.on([EdgeDragType .DRAG_START,EdgeDragType .DRAG,EdgeDragType .DRAG_END],function(e){
			// e.direction
			// e.pageX
			// e.pageY
			// e.velocityX
			// e.velocityY
		});

6. **combobox**模块

	6.1 增加placeholder配置，占位符交互同原生行为一致.[issue for detail](https://github.com/kissyteam/kissy/issues/655)

		require(["combobox"], function (ComboBox) {
		  new ComboBox({
                render: "#newNew",
                hasTrigger: false,
                placeholder: 'input number!',
                width: 400
		  });
		});

	6.2 增加清除功能[issue for detail](https://github.com/kissyteam/kissy/issues/617)

7. **overlay**模块增加closeText配置[issue for detail](https://github.com/kissyteam/kissy/issues/657)

		//example
		require(['overlay'], function(Overlay){
			new Overlay({
				closeText : 'click me to close'
			});
		})

8. **scoll-view**模块

	8.1 增加支持pull-up-to-refresh[issue for detail](https://github.com/kissyteam/kissy/issues/625)。[api文档 ScrollView.Plugin.PullToRefresh](http://docs.kissyui.com/5.0/api/classes/ScrollView.Plugin.PullToRefresh.html) 、[demo](http://docs.kissyui.com/5.0/demos/scroll-view/pull-to-refresh.html)

9. **menu**模块

	9.1 增加单选菜单功能[issue for detail](https://github.com/kissyteam/kissy/issues/626)。[Menu.RadioItem api文档](http://docs.kissyui.com/5.0/api/classes/Menu.RadioItem.html) 、[demo](http://docs.kissyui.com/5.0/demos/menu/radio.html)

10. **tabs**模块

	10.1 增加closable配置判断是否出现关闭按钮移除tab项 [issue for detail](https://github.com/kissyteam/kissy/issues/340)。[tabs api文档](http://docs.kissyui.com/5.0/api/classes/Tabs.html) 、[demo](http://docs.kissyui.com/5.0/demos/tabs/index.html)

		//example
		require(['tabs'], function(Tabs){
	        var myTabs = new Tabs({
	            render : '#container',
	            width : '60%',
	            items : [
	                {
	                    title : 'title of tab-1',
	                    content : 'tab-1 content'
	                },
	                {
	                    title : 'title of tab-2',
	                    content : 'tab-2 content',
	                    selected : true   //默认选中这个tab
	                },
	                {
	                    title : 'title of tab-3',
	                    content : 'tab-3 content',
	                    closable : true    //显示关闭按钮，点击删除tab
	                }
	            ]
	        }).render();
	    });

11. 新增 [navigation-view](http://docs.kissyui.com/5.0/guides/navigation-view/index.html) 模块和 [router](http://docs.kissyui.com/5.0/guides/router/index.html) 模块



## 建议用法

1. KISSY@5.0 支持 commonjs 和 amd 模块规范，但是在此建议使用 commonjs 规范

		define('modName', ['modDep1'], function(require, exports, module){  //添加模块 
			var modDep1 = require('modDep1');
			//...
		});

		require(['json'], function(JSON){  //引用模块
			
		});

