# KISSY5.0��Ҫ������
------------------------------

*˵����*����ĵ���KISSY5.0���KISSY1.4.x����������ܣ���Ҫ��Ϊ�������֣�ģ����¡�����ģ�顢�����÷���ÿ��������ģ��Ϊ��λ�����г��漰���仯��ģ�鼰����÷������⣬���ڱ仯�ĵ�Ƚ϶࣬�������ȫ��ϸ�£������Ҷ��ָ����һ������������ĵ����ǳ���л��

## ģ�����

1. **�����ļ� seed**

	1.1 KISSY@5.0 �汾ȥ���� KISSY �ؼ��ʣ����ٴ���KISSY���ȫ�ֱ������°汾��ȫ�ֱ��� modulex ���ý��� KISSY������������һ��ģ�������[modulex](https://github.com/kissyteam/modulex)���ɵ�����Ϊ�����ģ�������ʹ�á�ʵ���ϣ������ļ�seed.js���� modulex + feature + ua + meta �Ĳ�����ɡ�

		//deprecated usage
		KISSY.config({  });  //����

		KISSY.add('modName', ['modDep1'], function(S, require, exports, module){  //���ģ��

		}); 
		KISSY.use(['json'], function(S, JSON){   //����ģ��
			//S === KISSY
		});

		//now usage
		require.config({  });   //����

		define('modName', ['modDep1'], function(require, exports, module){  //���ģ�� 

		});

		require(['json'], function(JSON){  //����ģ��
			// no `S` here
		})

	1.2 ѹ�����ļ��� *.js��δѹ������ *-debug.js������ǰ�� \*-min.js���ֿ���

	1.3 ȥ��������seed.js��url�ϼ��� `?ks-debug` ������ `KISSY.Config.debug` ���߼�����Ҫ���������ֱ������seed-debug.js������������䣨ѹ����������seed.js

		//deprecated usage
		<script src="seed.js?ks-debug">

		//now usage
		<script src="seed-debug.js">  //for debug
		<script src="seed.js">        //no debug

	1.4 ��seed.js�����ֳ�`util`ģ�飬���֮ǰ`lang`ģ�顣�������ֻ������seed.js�Ļ�����ǰ`lang`ģ��ĺ������� `escapeHTML`��`unique`�Ⱥ����޷�ֱ��ʹ�ã���Ҫ��������`util`ģ�顣���⣬`isNull`��`isUndefined`��`fromeUnicode`��`equals`�⼸���������Ƴ���

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

	1.5 Cookie/IO/io/Amim/DOM/JSON/ajax/Ajax ��Щ�ӿڲ��ٹ���ȫ�ֶ���KISSY���ˣ���Ҫ������Ӧģ���ʱ��ȡ����Ӧ�Ľӿ���ʹ�á�

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

	1.6 ȥ�� ignorePackageNameInUri ���� (Ĭ�� true) [issue for detail](https://github.com/kissyteam/kissy/issues/593)

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

	1.7 ���ڵ�seed.js��ʵ���� modulex + ua + feature + meta �ĸ�������ɵġ�
	
		<script src='??modulex.js,ua.js,feature.js,meta.js'></script>
		//�൱��
		<script src='seed.js'></script>
	
	1.8 ��������1.3��1.4�������潫˵����eventģ����3.1���Լ�KISSY@1.4.x�Ĵ󲿷��÷������Զ�������deprecated.js�����ļ����������÷���[���ݰ���Ŀ](http://gitlab.alibaba-inc.com/kissy/deprecated-5)

		//������seed.jsͬʱ����deprecated.js������KISSY@1.4.x�Ĵ󲿷��÷�
		<script src='http://g.tbcdn.cn/kissy/edge/2014.07.16/??seed.js,deprecated.js'></script>

	1.9 ���Ӱ����� filter��ȥ���Զ����� debug ģ����ơ�[issue for detail](https://github.com/kissyteam/kissy/issues/604)

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

2. **anim**ģ��

	2.1 animģ�鱻��ֳ�anim/timer��anim/transition����ģ�顣use 'anim' ʱ������֧��css3���������KISSY�������anim/timerģ�飬����ʹ��anim/transitionģ�顣[issue for detail](https://github.com/kissyteam/kissy/issues/582)�����⣬���������Թ��������������־���anim/timerģ�����Ļ����Կ���ʹ��gallery�����һ��С���[attr-anim](http://gallery.kissyui.com/attr-anim/doc/guide/index.html)

		//deprecated usage
		KISSY.use('anim', function(S){
			var myAnimIns = new S.Anim('#test',{
				width : 200,
				color : '#fff'
			},{
				easing : 'ease-in',
				duration : 3,
				//���������� useTransition ���ж��Ƿ�ʹ�� css3 transition ��������
				useTransition : true   //ʹ��css3 transition��������, Ĭ�� false
			});
		})	

		//now usage
		require(['anim'], function(Anim){
			//�Զ�ʶ��֧��css3 transition��������Զ����� anim/transition ģ�飬�����Զ����� anim/timer ģ��
			//use Anim
		})

3. **event**ģ��
	
	3.1 ȥ����`event`ģ�飬ϸ���� event����ֳ��������֣�event-dom �� event-custom �� event-dom/gesture/* ��

		//deprecated usage
		KISSY.use('event', function(S, Event){
			//dom �¼�
			Event.on('#test', 'click', function(ev){
				//do something
			});

			//�ƶ����¼�
			Event.on(document, "swipe", function (ev) {
			    alert(ev.type + ' : fired');
			});

			//�Զ����¼�
			var myObj = {};
			S.mix(myObj, Event.Target);
			myObj.on('willBeFired', function(ev){
				alert('I will be fired...');
			})
			myObj.fire('willBeFired');

		});

		//now usage-------------------------

		//dom �¼�
		require(['event-dom'], function(DomEvent){  
			DomEvent.on('#test', 'click', function(ev){
				//do something
			});
		});

		//�ƶ����¼�
		require(['event-dom', 'event-dom/gesture/swipe'], function(DomEvent, SwipeGesture){
			DomEvent.on(document, SwipeGesture.SWIPE, function(ev){
				alert(ev.type + ' : fired');
			});
		});

		//�Զ����¼�
		require(['util','event-custom'], function(Util, CustomEvent){
			var myObj = {};
			Util.mix(myObj, CustomEvent.Target);
			myObj.on('willBeFired', function(ev){
				alert('I will be fired...');
			})
			myObj.fire('willBeFired');
		});

	3.2 ɾ�� valuechange �¼���֧�� input �¼� [issue for detail](https://github.com/kissyteam/kissy/issues/549)

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

4. **combobox**ģ��

	4.1 ��ֳ�combobox/multi-wordģ��ȡ����ǰ��ComboBox.MultiValueComboBox����ȥ��`Combobox.FilterSelect`

		//deprecated usage
		KISSY.use('combobox', function(S, ComboBox){
			//use ComboBox.MultiValueCombobox
		})

		//now usage
		require(['combobox/multi-word'], function(MultiWord){
			//use MultiWord
		})

5. **xtemplate**ģ���ʹ���﷨�����÷�ʽ���кܴ�ı䣬�Ѿ���ȫ��KISSY������������Ե���ʹ�ã�Ҳ���Ժ�KISSYһ��ʹ�ã���nodejs��ʹ�á������÷�ֱ�ӿ�[xtemplate](https://github.com/kissyteam/xtemplate)

6. ȥ���� **uri** ģ�飬��������ʹ�� `uri` ģ���ˡ�

## ����ģ��/����

2. **util**ģ�飬���Ǵ�seed.js���ֳ�����һ��underscore�ĺ������ϣ�����÷��ο� ��ģ����� -> 1.3��

3. **node**ģ��

	2.1 `node`ģ�����jQuery�����飺[issue for detail](https://github.com/kissyteam/kissy/issues/648)

		//��ǰ���÷��������Կ���ʹ�ã���������ʹ�����÷�
		KISSY.use('node', function(S, Node){
			var $ = Node.all; 
			//use $ like jQuery
		});

		//now usage
		require(['node'], function($){
			//use $ as jQuery
		});

4. ���� [path](http://docs.kissyui.com/5.0/api/classes/Path.html)/[url](http://docs.kissyui.com/5.0/api/classes/Url.html)/[querystring](http://docs.kissyui.com/5.0/api/classes/Querystring.html) ģ�飬 api ��ͬ nodejs

5. **event**ģ��

	5.1 ֧��drag����[issue for detail](https://github.com/kissyteam/kissy/issues/573)
		
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

	5.2 ֧��edge-drag����[issue for detail](https://github.com/kissyteam/kissy/issues/597)

		//similar to ios/android notify menu
		var EdgeDragType = require('event/gesture/edge-drag');
		node.on([EdgeDragType .DRAG_START,EdgeDragType .DRAG,EdgeDragType .DRAG_END],function(e){
			// e.direction
			// e.pageX
			// e.pageY
			// e.velocityX
			// e.velocityY
		});

6. **combobox**ģ��

	6.1 ����placeholder���ã�ռλ������ͬԭ����Ϊһ��.[issue for detail](https://github.com/kissyteam/kissy/issues/655)

		require(["combobox"], function (ComboBox) {
		  new ComboBox({
                render: "#newNew",
                hasTrigger: false,
                placeholder: 'input number!',
                width: 400
		  });
		});

	6.2 �����������[issue for detail](https://github.com/kissyteam/kissy/issues/617)

7. **overlay**ģ������closeText����[issue for detail](https://github.com/kissyteam/kissy/issues/657)

		//example
		require(['overlay'], function(Overlay){
			new Overlay({
				closeText : 'click me to close'
			});
		})

8. **scoll-view**ģ��

	8.1 ����֧��pull-up-to-refresh[issue for detail](https://github.com/kissyteam/kissy/issues/625)��[api�ĵ� ScrollView.Plugin.PullToRefresh](http://docs.kissyui.com/5.0/api/classes/ScrollView.Plugin.PullToRefresh.html) ��[demo](http://docs.kissyui.com/5.0/demos/scroll-view/pull-to-refresh.html)

9. **menu**ģ��

	9.1 ���ӵ�ѡ�˵�����[issue for detail](https://github.com/kissyteam/kissy/issues/626)��[Menu.RadioItem api�ĵ�](http://docs.kissyui.com/5.0/api/classes/Menu.RadioItem.html) ��[demo](http://docs.kissyui.com/5.0/demos/menu/radio.html)

10. **tabs**ģ��

	10.1 ����closable�����ж��Ƿ���ֹرհ�ť�Ƴ�tab�� [issue for detail](https://github.com/kissyteam/kissy/issues/340)��[tabs api�ĵ�](http://docs.kissyui.com/5.0/api/classes/Tabs.html) ��[demo](http://docs.kissyui.com/5.0/demos/tabs/index.html)

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
	                    selected : true   //Ĭ��ѡ�����tab
	                },
	                {
	                    title : 'title of tab-3',
	                    content : 'tab-3 content',
	                    closable : true    //��ʾ�رհ�ť�����ɾ��tab
	                }
	            ]
	        }).render();
	    });

11. ���� [navigation-view](http://docs.kissyui.com/5.0/guides/navigation-view/index.html) ģ��� [router](http://docs.kissyui.com/5.0/guides/router/index.html) ģ��



## �����÷�

1. KISSY@5.0 ֧�� commonjs �� amd ģ��淶�������ڴ˽���ʹ�� commonjs �淶

		define('modName', ['modDep1'], function(require, exports, module){  //���ģ�� 
			var modDep1 = require('modDep1');
			//...
		});

		require(['json'], function(JSON){  //����ģ��
			
		});