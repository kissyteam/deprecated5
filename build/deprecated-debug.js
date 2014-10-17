/**
 * adapter to transform kissy5 to kissy 1.4.x
 * @author yiminghe@gmail.com , benfchen.cf@alibaba-inc.com
 */

/*exported KISSY from modulex*/
var KISSY = (function () {
    var S = {
        version: '5.0.0'
    };
    var EMPTY = '';

    var slice = [].slice;
    S.require = modulex.require;
    S.Env = modulex.Env;
    S.Config = modulex.Config;
    S.config = modulex.config;
    S.log = function(msg, type){
        if(typeof console !== undefined && console.log){
            console[type && console[type] ? type : 'log'](msg);
        }
    }
    S.error = function (str) {
        if (modulex.Config.debug) {
            throw new Error(str);
        }
    };
    S.nodeRequire = modulex.nodeRequire;

    function wrap(fn) {
        function wrapped() {
            var args = slice.call(arguments, 0);
            args.unshift(S);
            return fn.apply(this, args);
        }

        wrapped.toString = function () {
            return fn.toString();
        };
        return wrapped;
    }

    S.add = function () {
        var args = slice.call(arguments, 0);
        for (var i = 0, l = args.length; i < l; i++) {
            if (typeof args[i] === 'function') {
                args[i] = wrap(args[i]);
            }
        }
        modulex.add.apply(this, args);
    };

    S.use = function () {
        var args = slice.call(arguments, 0);
        var callback = args[1];
        if (typeof callback === 'function') {
            args[1] = wrap(args[1]);
        } else if (callback && callback.success) {
            callback.success = wrap(callback.success);
        }
        modulex.use.apply(this, args);
        return S;
    };

    if (typeof module !== 'undefined') {
        module.exports = S;
    }

    if (typeof global !== 'undefined') {
        global.KISSY = S;
    }

    S.modulex = modulex;

    return S;
})();

/*gain compability with api of KISSY@1.4.x */
(function (S) {
    // --no-module-wrap--
    S.use(['util', 'querystring'], function (S, util, querystring) {
        util.mix(S, util);
        S.param = querystring.stringify;
        S.unparam = querystring.parse;
    });

    S.add('event', ['util', 'event-dom', 'event-custom'], function (S, require) {
        var Event = S.Event = {};
        var util = require('util');
        util.mix(Event, require('event-dom'));
        S.EventTarget = Event.Target = require('event-custom').Target;
        S.log('event module is deprecated! please use \'event-dom\' and \'event-dom/gesture/*\' or \'event-custom\' module instead.');
        return Event;
    });

    var mods = {
        ua: 'UA',
        json: 'JSON',
        cookie: 'Cookie',
        'dom/base': 'DOM',
        'anim/timer': 'Anim',
        'anim/transition': 'Anim',
        base: 'Base'
    };

    var configs = {
        core: {
            alias: ['dom', 'event', 'io', 'anim', 'base', 'node', 'json', 'ua', 'cookie']
        },
        io: {
            afterInit: function (v) {
                S.ajax = S.Ajax = S.io = S.IO = v;
            }
        },
        node: {
            afterInit: function (v) {
                S.Node = S.NodeList = v;
                S.one = v.one;
                S.all = v.all;
            }
        }
    };

    for (var m in mods) {
        /*jshint loopfunc:true*/
        (function (m, p) {
            configs[m] = {
                afterInit: function (v) {
                    S[p] = S[p] || v;
                }
            };
        })(m, mods[m]);
    }

    S.config('modules', configs);

    S.namespace = function () {
        var args = S.makeArray(arguments),
            l = args.length,
            o = null,
            i, j, p,
            global = (args[l - 1] === true && l--);

        for (i = 0; i < l; i++) {
            p = ('' + args[i]).split('.');
            o = global ? window : this;
            for (j = (window[p[0]] === o) ? 1 : 0; j < p.length; ++j) {
                o = o[p[j]] = o[p[j]] || {};
            }
        }
        return o;
    };

    KISSY.use('ua', function (S, UA) {
        S.UA = UA;
    });
})(KISSY);