/**
 * @desc 这个是属于整体的配置对象
 * */
var cfg = cfg || {

};
window.gb = window.gb || {

    //所有的用户信息保存这里面
    users : ["app/imgs/s.gif","app/imgs/logo_small.gif","app/imgs/logo_aliyun.jpg","app/imgs/plane8.png",
        "app/imgs/back_img.png","app/imgs/back_img1.png","app/imgs/back_img2.png",
        "app/imgs/flash.png", "app/imgs/life.png", "app/imgs/money.png", "app/imgs/power.png",
        "app/imgs/mybullet1.png", "app/imgs/mybullet2.png", "app/imgs/mybullet3.png",
        "app/imgs/enemy0.png","app/imgs/enemy1.png","app/imgs/enemy2.png","app/imgs/enemy3.png","app/imgs/enemy4.png","app/imgs/enemy5.png",
        "app/imgs/enemybullet1.png","app/imgs/enemybullet.png",
        "app/imgs/hole.png",
        "app/imgs/explosion0.png","app/imgs/explosion1.png","app/imgs/explosion2.png","app/imgs/explosion3.png","app/imgs/explosion4.png"],


    //当用户选择的信息， 这要初始化用户的生命值， 声明条数， 速度， 分数， 金钱数等信息;
    initUserData : function( user ) {
        user = user || "app/imgs/s.gif";
        //重新值用户的值;
        gb.userData = {

            "app/imgs/s.gif" : {
                blood : 10,
                lifes : 4,
                speed : 1,
                score : 0,
                money : 0,
                bg : "app/imgs/s.gif",
                superBomb : 2
            },

            "app/imgs/logo_small.gif" : {
                blood : 10,
                lifes : 4,
                speed : 1,
                score : 0,
                money : 0,
                bg : "app/imgs/logo_small.gif",
                superBomb : 2
            },

            "app/imgs/logo_aliyun.jpg" : {
                blood : 10,
                lifes : 4,
                speed : 1,
                score : 0,
                money : 0,
                bg :"app/imgs/logo_aliyun.jpg",
                superBomb : 2
            }

        }[user];

    },

    userData : {
        blood : 10,
        lifes : 4,
        speed : 1,
        score : 0,
        money : 0,
        bg : "app/imgs/plane8.png"
    }
};

//define(function() {

    /**
     * @desc 进度的加载, 图片的预加载;
     * @param array;
     * @param func ==>> this's callback;
     * @return Object;
     */
    function loadImgs(arr, cb, prog, errorCb) {

        var obj = {};

        for (var i = 0; i < arr.length; i++) {

            (function(i) {
                var img = new Image();
                img.onload = function () {
                    console.log(this.src);
                    obj[arr[i]] = img;
                    done&&done();
                };
                img.src = arr[i];
                img.onerror = function ( ) {
                    console.log("图片加载失败");
                    errorCb&&errorCb();
                };
            })(i);

        };

        var len = arr.length;

        function done(  ){
            len--;
            prog&&prog( (arr.length-len) / arr.length );
            if( len===0 ) {
                cb&&cb( obj );
            };
        };

        return obj;

    };


    /**
     * @desc 这个插件是为了跨浏览器操作的操作而存在的， 在PC端和在移动端中会调用对应传进去的函数；
     * @desc 如果用户在PC端中按”上下左右“方向键， 或者在手机端中移动手势会调用对应方向的函数；
     * @desc 这个插件也解决了在PC端如果用户持续按住一个键时候， 会延迟一段时间触发事件的问题， 这个问题可以参考这里： http://www.w3cfuns.com/article-5593414-1-1.html  ；
     *
     * @param {funciton} 当方向为左时候调用的函数；
     * @param {funciton} 当方向为上时候调用的函数；
     * @param {funciton} 当方向为右时候调用的函数；
     * @param {funciton} 当方向为下时候调用的函数；
     * @param {function} 当函数执行完毕时候执行的回调;
     */
    +function() {
        function addEvent( obj, type, fn ) {
            if (obj.addEventListener)
                obj.addEventListener( type, fn, false );
            else if (obj.attachEvent) {
                obj["e"+type+fn] = fn;
                obj.attachEvent( "on"+type, function() { obj["e"+type+fn](); } );
            };
        };
        function removeEvent( obj, type, fn ) {
            if (obj.removeEventListener)
                obj.removeEventListener( type, fn, false );
            else if (obj.detachEvent) {
                obj.detachEvent( "on"+type, obj["e"+type+fn] );
                obj["e"+type+fn] = null;
            };
        };

        var CommonControl = function() {
            this.timer = null;
        };

        CommonControl.prototype.run = function(leftFn, upFn, rightFn, bottomFn ,callback, obj) {
            typeof document.ontouchstart == "object" ?
                this.mobile.apply(this, arguments) :
                this.PC.apply(this, arguments);
            return this;
        };

        CommonControl.prototype.PC = function(leftFn, upFn, rightFn, bottomFn ,callback) {
            var _this = this;
            var fn;
            //系统默认的keydown是第一次触发，然后间隔一些毫秒再持续重新触发;
            addEvent(window, "keydown", function(ev) {
                clearInterval( _this.timer );
                //65 85 68 83
                switch  (ev.keyCode) {
                    case 65 :
                    case 37 :
                        fn = leftFn;
                        break;
                    case 85 :
                    case 38 :
                        fn = upFn;
                        break;
                    case 68 :
                    case 39 :
                        fn =  rightFn;
                        break;
                    case 83 :
                    case 40 :
                        fn = bottomFn;
                        break;
                };
                _this.timer = setInterval(function() {
                    fn&&fn();
                    callback&&callback();
                }, 10);
            });
            addEvent(window, "keyup", function() {
                clearInterval( _this.timer );
            });
        };

        /**
         * @param obj {
         *  dis : //在这个宽度以内不执行回调
         *  x : x轴方向的距离;
         *  y : y轴方向的距离;
         *  canvas : 绑定事件的元素;
         * }
         * */
        CommonControl.prototype.mobile = function(leftFn, upFn, rightFn, bottomFn ,callback, obj) {
            var _this = this;
            var disX = 0,disY = 0, dirX , dirY;
            var evFn =  function(ev) {
                clearInterval( _this.timer );
                disX = ev.touches&&ev.touches[0].clientX;
                disY = ev.touches&&ev.touches[0].clientY;
                var fns = [];
                //如果点击的距离超过50像素触发事件;
                if( Math.abs(disX-obj.x)>obj.dis ){
                    //如果当前的x大于物体右侧, 就像右走;
                    if(disX > obj.x ) {
                        fns.push( rightFn );
                    }else{
                        fns.push( leftFn );
                    };
                };

                if( Math.abs(disY-obj.y)>obj.dis ){
                    //如果当前的Y大于物体的y轴, 就像下走;
                    if(disY > obj.y ) {
                        fns.push( bottomFn.bind(bottomFn,disY,obj.y) );
                    }else{
                        fns.push( upFn.bind(bottomFn,disY,obj.y) );
                    };
                };
                _this.timer = setInterval(function() {
                    for(var i=0; i<fns.length; i++ ) {
                        fns[i].call(fns[i], obj.el);
                    };
                    callback&&callback();
                }, 10);
            };
            addEvent(obj.canvas ,"touchstart", evFn);
            addEvent(obj.canvas ,"touchmove", evFn);

            addEvent(obj.canvas ,"touchend", function(ev) {
                clearInterval( _this.timer );
            });
        };

        window.CommonControl = CommonControl;
    }();

    var EventBase = function () {};

    EventBase.prototype = {
        /**
         * 注册事件监听器
         * @name addListener
         * @grammar editor.addListener(types,fn)  //types为事件名称，多个可用空格分隔
         * @example
         * editor.addListener('selectionchange',function(){
         *      console.log("选区已经变化！");
         * })
         * editor.addListener('beforegetcontent aftergetcontent',function(type){
         *         if(type == 'beforegetcontent'){
         *             //do something
         *         }else{
         *             //do something
         *         }
         *         console.log(this.getContent) // this是注册的事件的编辑器实例
         * })
         */
        addListener:function (types, listener) {
            types = types.trim().split(' ');
            for (var i = 0, ti; ti = types[i++];) {
                getListener(this, ti, true).push(listener);
            }
        },

        /**
         * 移除事件监听器
         * @name removeListener
         * @grammar editor.removeListener(types,fn)  //types为事件名称，多个可用空格分隔
         * @example
         * //changeCallback为方法体
         * editor.removeListener("selectionchange",changeCallback);
         */
        removeListener:function (types, listener) {
            types = types.trim().split(' ');
            for (var i = 0, ti; ti = types[i++];) {
                removeItem(getListener(this, ti) || [], listener);
            }
        },

        /**
         * 触发事件
         * @name fireEvent
         * @grammar editor.fireEvent(types)  //types为事件名称，多个可用空格分隔
         * @example
         * editor.fireEvent("selectionchange");
         */
        fireEvent:function () {
            var types = arguments[0];
            types = types.trim().split(' ');
            for (var i = 0, ti; ti = types[i++];) {
                var listeners = getListener(this, ti),
                    r, t, k;
                if (listeners) {
                    k = listeners.length;
                    while (k--) {
                        if(!listeners[k])continue;
                        t = listeners[k].apply(this, arguments);
                        if(t === true){
                            return t;
                        }
                        if (t !== undefined) {
                            r = t;
                        }
                    }
                }
                if (t = this['on' + ti.toLowerCase()]) {
                    r = t.apply(this, arguments);
                }
            }
            return r;
        }
    };

    /**
     * 获得对象所拥有监听类型的所有监听器
     * @public
     * @function
     * @param {Object} obj  查询监听器的对象
     * @param {String} type 事件类型
     * @param {Boolean} force  为true且当前所有type类型的侦听器不存在时，创建一个空监听器数组
     * @returns {Array} 监听器数组
     */
    function getListener(obj, type, force) {
        var allListeners;
        type = type.toLowerCase();
        return ( ( allListeners = ( obj.__allListeners || force && ( obj.__allListeners = {} ) ) )
            && ( allListeners[type] || force && ( allListeners[type] = [] ) ) );
    };

    function removeItem(array, item) {
        for (var i = 0, l = array.length; i < l; i++) {
            if (array[i] === item) {
                array.splice(i, 1);
                i--;
            };
        };
    };


    /**
     * @desc 创建TaskList, 可以循环执行task;
     * @method addTask
     * @method removeTask
     * @method run
     * @method setInterval
     * @method clearInterval
     */
    var TaskList = function() {this.list = [], this.timer = null};
    TaskList.tId = 0;

    /**
     * @param {function}
     * */
    TaskList.prototype.addTask = function (fn) {
        fn.tId = TaskList.tId++;
        if(typeof fn === "function")this.list.push(fn);
        return this;
    };

    /**
     * @param {function}
     * */
    TaskList.prototype.removeTask = function(fn) {
        var len = this.list.length;
        while(len--){
            if(fn === this.list[len] || fn.tId === this.list[len].tId) {
                this.list.splice(len,1);
            };
        };
    };

    /**
     * @desc  执行所有的任务
     * */
    TaskList.prototype.run = function() {
        for(var i=0; i<this.list.length; i++ ){
            this.list[i]();
        }
    };
    /**
     * @desc 循环执行任务
     * @param 间隔执行任务的时间
     * */
    TaskList.prototype.setInterval = function ( time ) {
        time = time || 33;
        this.timer = setInterval(this.run.bind(this), time);
    };
    /**
     * @desc 暂停执行任务列表
     * */
    TaskList.prototype.clearInterval = function() {
        clearInterval( this.timer );
    };
    /**
     * TaskList主方法结束*/
    /**
     * 扩展TaskList的存储方法;
     * */
    $.extend(TaskList.prototype, {
        /**
         * 用户飞机实例的缓存
         * */
        plane : function ( p ) {
            if( p ) {
                this.plane = p;
            };
            return this;
        },

        /**
         * getPlaneMissiles
         * 获取用户的子弹信息;
         * */
        getPlaneMissiles : function () {
            return this.planeMissiles;
        },
        /**
         * 用户Missile的缓存;
         * */
        addPlaneMissiles : function( pM ) {
            this.planeMissiles = this.planeMissiles || [];
            this.planeMissiles.push( pM );
            return this;
        },
        /**
         * 用户子弹的删除;
         * */
        removePlaneMissile : function () {
            if( _.contains(this.planeMissiles || [], e) ) {
                var index = this.planeMissiles.indexOf( e );
                this.planeMissiles.splice(index,1);
                return this;
            };
        },

        /**
         * 获取敌机信息
         * */
        getEnemy : function () {
          return this.enemys || [];
        },
           /***
         * 敌机的信息缓存
         * */
        addEnemy : function ( e ) {
            this.enemys = this.enemys || [];
            this.enemys.push( e );
            return this
        },
        removeEnemy : function ( e ) {
            if( _.contains(this.enemys || [], e) ) {
                var index = this.enemys.indexOf( e );
                this.enemys.splice(index,1);
                return this;
            };
        },

        /**
         * 获取敌机的子弹缓存
         * */
        getMissile : function () {
            return this.missiles;
        },
         /**
         * 敌机的子弹缓存
         * */
        addMissile : function ( m ) {
            this.missiles = this.missiles || [];
            this.missiles.push( m );
            return this;
        },
        removeMissile : function ( m ) {
            if( _.contains(this.missiles || [], e) ) {
                var index = this.missiles.indexOf( e );
                this.missiles.splice(index,1);
                return this;
            };
        },
        
        /**
         * 能量块的缓存
         * */
        getPowers : function () {
            return this.powers;
        },
        addPower : function ( power ) {
            this.powers = this.powers || [];
            this.powers.push( power );
            return this;
        },
        removePower : function ( p ) {
            if( _.contains(this.powers || [], p) ) {
                var index = this.powers.indexOf( p );
                this.powers.splice(index,1);
                return this;
            };
        }
     })
    //=====>>>>数据模型开始
    /**
     * @desc 所有界面都要填充到这里， 通过这个进行View的路由控制;
     * @param Page
     */
    var Pages =P(EventBase, function( pages ) {
        var list = [];
        var now = 0;
        /**
         * @desc 所有节目的初始化;
         */
        pages.init = function () {

        };

        /**
         *  @desc 添加page
         */
        pages.add = function ( obj ) {
            if( obj instanceof  Page) {
                if( list.length-1!==-1 ) {
                    list [ list.length-1 ].destory();;
                };
                list.push( obj );
                obj.create();
                return this;
            }else{
                alert("参数错误");
            };
            return this;
        };

        /**
         * @desc 删除page， 从当前的page中删除page， 并调用page的destory方法;
         */
        pages.remove = function ( obj ) {
            var index;
            if( (index = list.indexOf( obj )) !== -1) {
                list.splice(index, 1);
            };
            return this;
        };

        pages.run = function() {
            //把当前的界面删除;
            if( list.length>=2 ) {
                list[ list.length-2 ].destory && list [ list.length-2 ].destory();
            };
            //执行最后一个界面的create方法;
            list[ list.length-1 ].create && list [ list.length-1 ].create();
            return this;
        };

        /**
         * @desc 界面回退
         */
        pages.back = function () {
            var obj = list.pop();
            obj.destory();
            now = (now-1>=0) ? now-1 : 0;
            list[ now ].create.apply(list[ now ], arguments);
            return this;
        };

        /**
         * @desc 界面向前进
         */
        pages.forward = function () {
            if( list[now+1] ) {
                now++;
            };
            list[ now ].create().apply(list[ now ], arguments);
            return this;
        };

        /*
        * @desc 启动路由器;
        * */
        pages.start = function () {
            if( typeof list[ now ] === "function") {
                list[ now ].apply(list[ now ], arguments);
            };
            return this;
        };

        pages.clear = function() {
            list = [];
            now = 0;
            return this;
        };
    });

    /**
     * @desc 界面的构造函数;
     */
    var Page = P(EventBase, function( page ) {

        /**
         * @desc 界面的初始化;
         */
        page.init = function () {

        };

        /**
         * @desc 删除当前界面;
         */
        page.destory = function () {

        };

        /**
         * @desc 界面的创建;
         */
        page.create = function () {

        };

    });

    /**
     * @desc 精灵类;
     * */
    var Sprite = P(EventBase, function( sprite ) {


        sprite.init = function (bg, frames, time) {
            this.date = Date.now();
            this.now = 0;
            this.bg = bg;
            this.frames = frames;
            this.time = time;
        };

        sprite.calc = function () {
            //如果在间隔的时间外，frame就增加;
            if( Date.now() - this.date >= this.time ) {
                this.now++;
                //如果now超过了固定帧，就把now重置为0;
                if (this.now > this.frames) {
                    this.now = 0;
                };
            };
            return {
                bg : this.bg,
                now : this.now
            }
        };

        sprite.destory = function () {

        };
    });

    /**
     * @desc 界面的滚动;
     */
    var Bg = P(EventBase, function ( bg ) {
        var canvas;
        var sprite;
        var context;
        var now;
        var backgrond;
        /**
         * @desc
         */
        bg.init = function ( can, ctx , level) {
            context = ctx;
            canvas = can;
            this.level = 2 || 0;
            //就直接2551帧， 30毫秒走一个像素;
            sprite = [new Sprite( window.gb.imgs["app/imgs/back_img.png"] , 3051-500, 30),
                //1140帧;
                new Sprite( window.gb.imgs["app/imgs/back_img1.png"] , 1640-500, 30),
                //1140帧;
                new Sprite( window.gb.imgs["app/imgs/back_img2.png"] , 1640-500, 30)
            ][this.level];
            backgrond = sprite.calc().bg;
        };

        /**
         * @desc 随着时间的增加， 地图界面的改变;
         */
        bg.setup = function (  ) {
            now =sprite.calc().now;
        };

        /**
         * @desc 在canvas中绘制这个地图;
         */
        bg.draw = function () {
            //随着now的增加, background往上移动;
            context.drawImage(backgrond, 0, [3051,1640,1640][this.level]-now-500, 400,500, 0, 0, canvas.width, canvas.height);
        };

    });

    /**
     * @desc 这里应该包括score；
     * @desc 获取的金币数；
     * @desc 当前的生命值；
     * @desc 当前的生命条数， 这些都可以通过配置设置庅；
     *
     * @method  setup
     * @param Object {
            Number || blood : 10,
            Number || lifes : 4,
            Number || speed : 1,
            Number || score : 0,
            Number || money : 0,
            String || bg : "app/imgs/logo_small.gif"
        }
     * */
    var Info = P(EventBase, function (info) {
        var score = 0;
        var money = 0;
        var blood = 0;
        var lifes = 0;
        var bg = "";
        var canvas;
        var context;
        
        info.init = function ( can ,ctx ) {
            canvas = can;
            context = ctx;
        };

        /*
        * {
             Number || blood : 10,
             Number || lifes : 4,
             Number || score : 0,
             Number || money : 0,
             String || bg : "app/imgs/logo_small.gif"
         }
         */
        info.setup = function ( obj ) {
            score = obj.score;
            money = obj.money;
            blood = obj.blood;
            lifes = obj.lifes;
            bg = obj.bg;
        };

        info.draw = function () {
            context.save();
            context.fillStyle = "#f00";
            context.fillRect( 10, 2, 3 ,9);
            context.fillRect( 14, 2, 3 ,9);
            context.fillRect( 18, 2, 3 ,9);
            context.fillStyle = "#D35400";
            context.textBaseline = "top";
            context.fillText("blood ： ", 24, 0);
            context.fillText(blood, 70, 0);

            context.drawImage( window.gb.imgs["app/imgs/life.png"], 0, 0 ,10, 10, 10,22 , 10, 9 );
            context.fillText("lifes ： ", 24,20);
            context.fillText(lifes, 70,20);

            context.drawImage( window.gb.imgs["app/imgs/money.png"], 0, 0 , 10, 10, 10, 42, 10 , 9);
            context.fillStyle = "#8E44AD";
            context.fillText("money ： ", 24,40);
            context.fillText(money, 70,40);

            context.drawImage( window.gb.imgs["app/imgs/power.png"], 0 ,0 ,16, 16, 10, 62, 10, 9);
            context.fillText("score ： ", 24,60);
            context.fillText(score, 70,60);
            context.restore();
        };

    });

    /**
    * @desc missile 所有的导弹都继承这个类;
    */
    var Missile = P(EventBase , function ( missile ) {

        /**
         * @desc 初始化伤害值， x轴和y轴， 移动的速度， 以及伤害值....等....
         */
        missile.init = function ( canvas, context, bg, x, y, w ,h , info) {

            this.canvas = canvas;
            this.context = context;
            this.bg = bg;
            this.x = x;
            this.y = y;
            this.speedX = info.speedX || 0;
            this.speedY = info.speedY || -3;
            this.damage = info.damage || 1;
            this.task = info.task || {};
            this.w = w;
            this.h = h;

        };

        missile.setup = function () {
            this.x = this.x + this.speedX;
            this.y = this.y + this.speedY;
            //把当前子弹和所有的敌机进行碰撞检测;
            //先获取当前所有的敌机
            var enemys = this.task.getEnemy();
            for(var i=0; i< enemys.length; i++) {
                //如果当前的子弹和某台敌机碰到了;
                if( util.canvasCollision(
                    //子弹的信息;
                    {
                        left : this.x,
                        top : this.y,
                        right : this.x+this.w,
                        bottom : this.y+this.h
                    },
                    {
                        left : enemys[i].x,
                        top : enemys[i].y,
                        right : enemys[i].x+enemys[i].w,
                        bottom : enemys[i].y+enemys[i].h
                    }
                )) {
                    //被一个子弹射中以后， 只要子弹不消失;还会被这个子弹射中
                    if( (enemys[i].blood--)===0 ) {
                        enemys[i].remove&&enemys[i].remove();
                        enemys[i].destory&&enemys[i].destory();
                    };
                    this.remove&&this.remove();
                    console.log("collision");
                }
            };
        };

        /**
         * @desc
         * */
        missile.draw = function() {
            this.context.drawImage(this.bg, this.x, this.y , this.w, this.h);
        };

        missile.destory = function () {

        }

        missile.outOfArea = function() {
            if(this.x<-this.w||this.x>this.canvas.width||this.y<-this.h||this.y>this.canvas.height) {
                return true;
            }
        };

    });

    var EMissile = P(Missile, function (eMissile , missile) {

        /**
         * @param  canvas, context, bg, x, y, w ,h , info
         * @desc info { speedX, speedY, damage}
         * */
        eMissile.init = function() {
            missile.init.apply(this, arguments);
        };
        //重写敌人子弹的setup方法;
        eMissile.setup = function () {
            this.x = this.x + this.speedX;
            this.y = this.y + this.speedY;
            //让该子弹与主战机进行碰撞检测
            var plane = this.task.plane;
            if( util.canvasCollision(
                //子弹的信息;
                {
                    left : this.x,
                    top : this.y,
                    right : this.x+this.w,
                    bottom : this.y+this.h
                },
                {
                    left : plane.x,
                    top : plane.y,
                    right : plane.x+plane.width,
                    bottom : plane.y+plane.height
                }
            )) {
                if( (plane.blood--)===0 ) {
                    plane.destory&&plane.destory();
                    plane.remove&&plane.remove();
                };
                this.remove&&this.remove();
                console.log("collision");
            }
        };

    })
    /**
     * @desc 继承了Missile，让子弹更牛逼;
     * */
    var MissileEqui = P(Missile, function ( missileEqui ,missile ) {

        /**
         * @desc 继承了基本的missile信息;
         * */
        missileEqui.init = function () {
            missile.init.call(this, arguments);
        };
        
    });

    /**
     * @desc 基本的飞机模型;
     * */
    var Plane = P(EventBase, function ( plane  ) {
        plane.init = function ( opt ) {
            this.opt = opt;
            this.bg = "";
            this.speed = 1;
            this.blood = 4;
            /**
             * 后面通过改变speedX和speedY的值，可以形成各种飞机的路线?
             * */
            this.speedX = 0;
            this.speedY = 0;
            this.def = 2;
            var _this = this;
            _this.imgData = [
                {name : window.gb.imgs["app/imgs/explosion1.png"], frames:6, w : 43 ,h : 41},
                {name : window.gb.imgs["app/imgs/explosion0.png"], frames: 8, w : 64 , h : 94},
                {name : window.gb.imgs["app/imgs/explosion2.png"], frames: 7, w : 50 , h : 50},
                {name : window.gb.imgs["app/imgs/explosion3.png"], frames: 6, w : 50 , h : 50},
                {name : window.gb.imgs["app/imgs/explosion4.png"], frames: 14, w : 82 , h : 68}
            ][ Math.floor(Math.random()*5) ];

            this.detorySprite = new Sprite( _this.imgData.name,  _this.imgData.frames, 140 );

        };

        plane.setup = function ( ) {

        };

        plane.draw = function ( ) {

        };

        plane.destory = function ( ) {
            var _this = this;
            //从list中删除飞机;
            _this.task.removeEnemy( _this );

            _this.task.addTask(function() {
                var now = _this.detorySprite.calc().now;
                _this.opt.context.drawImage(_this.imgData.name, now*_this.imgData.w, 0, _this.imgData.w, _this.imgData.h , _this.x, (_this.top )-20,  _this.imgData.w, _this.imgData.h );
                if(now === _this.imgData.frames ) {
                    _this.task.removeTask( arguments.callee );
                }
            });
        };

    });

    /**
     * @desc 主角的飞机模型;
     * */
    var MoonWarr = P(Plane, function ( moon, plane ) {

        //如果把变量定义在这里，会导致一个问题， 所有的实例都会共享这个变量 ， 闭包的另外一种存在方式;

        var sprite;
        var missileSprite;
        moon.init = function ( opt ) {

            opt = opt || {
            };
            plane.init.apply(this, arguments);
            this.opt = opt;
            this.task = opt.task;
            this.y = opt.canvas.height-40;
            this.x = (opt.canvas.width-40)/2;
            this.canvas = opt.canvas;
            this.width = 40;
            this.height = 40;
            this.dis = 50;
            this.speed = opt.speed || 2;
            this.equitsFlag = /*[
                true ,true, true, true ,true ,true ,true ,true,
                false ,false, false, false ,false ,false ,false ,false,
                true
            ];*/
                [
                    false ,false, false, false ,false ,false ,false ,false,
                    true ,true, true, true ,true ,true ,true ,true,
                    true,true,
                    true
                ];
            this.equits = [
                {
                    bg : "app/imgs/mybullet1.png",
                    damage : 1,
                    speedX : 0,
                    speedY : -3,
                    dx : 2,
                    dy : -10,
                    w : 9,
                    h : 15
                },
                {
                    bg : "app/imgs/mybullet1.png",
                    damage : 1,
                    speedX : 0,
                    speedY : -3,
                    dx : 30,
                    dy : -10,
                    w : 9,
                    h : 15
                },
                {
                    bg : "app/imgs/mybullet1.png",
                    damage : 1,
                    speedX : -0.2,
                    speedY : -3,
                    dx : 2,
                    dy : -10,
                    w : 9,
                    h : 15
                },
                {
                    bg : "app/imgs/mybullet1.png",
                    damage : 1,
                    speedX : 0.2,
                    speedY : -3,
                    dx : 30,
                    dy : -10,
                    w : 9,
                    h : 15
                },
                {
                    bg : "app/imgs/mybullet1.png",
                    damage : 1,
                    speedX : -0.4,
                    speedY : -3,
                    dx : 2,
                    dy : -10,
                    w : 9,
                    h : 15
                },
                {
                    bg : "app/imgs/mybullet1.png",
                    damage : 1,
                    speedX : 0.4,
                    speedY : -3,
                    dx : 30,
                    dy : -10,
                    w : 9,
                    h : 15
                },
                {
                    bg : "app/imgs/mybullet1.png",
                    damage : 1,
                    speedX : -0.6,
                    speedY : -3,
                    dx : 2,
                    dy : -10,
                    w : 9,
                    h : 15
                },
                {
                    bg : "app/imgs/mybullet1.png",
                    damage : 1,
                    speedX : 0.6,
                    speedY : -3,
                    dx : 30,
                    dy : -10,
                    w : 9,
                    h : 15
                },
                {
                    bg : "app/imgs/mybullet2.png",
                    damage : 1,
                    speedX : 0,
                    speedY : -3,
                    dx : 2,
                    dy : -10,
                    w : 9,
                    h : 15
                },
                {
                    bg : "app/imgs/mybullet2.png",
                    damage : 1,
                    speedX : 0,
                    speedY : -3,
                    dx : 30,
                    dy : -10,
                    w : 9,
                    h : 15
                },
                {
                    bg : "app/imgs/mybullet2.png",
                    damage : 1,
                    speedX : -0.2,
                    speedY : -3,
                    dx : 2,
                    dy : -10,
                    w : 9,
                    h : 15
                },
                {
                    bg : "app/imgs/mybullet2.png",
                    damage : 1,
                    speedX : 0.2,
                    speedY : -3,
                    dx : 30,
                    dy : -10,
                    w : 9,
                    h : 15
                },
                {
                    bg : "app/imgs/mybullet2.png",
                    damage : 1,
                    speedX : -0.4,
                    speedY : -3,
                    dx : 2,
                    dy : -10,
                    w : 9,
                    h : 15
                },
                {
                    bg : "app/imgs/mybullet2.png",
                    damage : 1,
                    speedX : 0.4,
                    speedY : -3,
                    dx : 30,
                    dy : -10,
                    w : 9,
                    h : 15
                },
                {
                    bg : "app/imgs/mybullet2.png",
                    damage : 1,
                    speedX : -0.6,
                    speedY : -3,
                    dx : 2,
                    dy : -10,
                    w : 9,
                    h : 15
                },
                {
                    bg : "app/imgs/mybullet2.png",
                    damage : 1,
                    speedX : 0.6,
                    speedY : -3,
                    dx : 30,
                    dy : -10,
                    w : 9,
                    h : 15
                },
                {
                    bg:"app/imgs/mybullet3.png",
                    damage : 3,
                    speedX : -0.3,
                    speedY : -4,
                    dx : 4,
                    dy : -20,
                    w : 10,
                    h : 14
                },
                {
                    bg:"app/imgs/mybullet3.png",
                    damage : 3,
                    speedX : 0.3,
                    speedY : -4,
                    dx : 24,
                    dy : -20,
                    w : 10,
                    h : 14
                },
                {
                    bg:"app/imgs/hole.png",
                    damage : 3,
                    speedX : 0,
                    speedY : -4,
                    dx : 4,
                    dy : -20,
                    w : 30,
                    h : 30
                }];
            this.bg = opt.bg;
            sprite = new Sprite( this.bg , 3, 400);
            this.bindEv();

            //初始话子弹的发射, 300毫秒自动发射;
            missileSprite = new Sprite("testData", 16, 400);
        };

        moon.setup = function () {
            if( missileSprite.calc().now === 1 ) {
                var _this = this;
                for(var i=0; i<this.equits.length; i++ ) {

                    if( this.equitsFlag[i] ) {

                        var equit = this.equits[i];
                        (function () {

                            var missile2 = new Missile( this.opt.canvas, this.opt.canvas.getContext("2d"), window.gb.imgs[equit.bg],this.x + equit.dx, this.y + equit.dy, equit.w, equit.h, { speedX : equit.speedX, speedY : equit.speedY, damage : equit.damage, task : _this.task});
                            var missileTask = function () {
                                missile2.setup();
                                missile2.draw();
                                if( missile2.outOfArea() ) {
                                    missile2.destory();
                                    //从task列表删除该函数;
                                    _this.task.removeTask( arguments.callee );
                                };
                            };
                            missile2.remove = function() {
                                _this.task.removeTask( missileTask );
                            }
                            _this.task.addTask( missileTask );
                        }).call(this);
                    }

                };
            };
        };

        moon.draw = function () {
            //this.equits&&this.equits();

            /*
            this.opt.context.fillStyle = "#f00";
            this.opt.context.fillRect(0, 0 , 100, 100);
            */
            var dx = sprite.calc().now;
            this.opt.context.drawImage(this.opt.bg, dx*78, 0, 78, 85, this.x, this.y, this.width, this.height);

        };

        /**
         * @desc
         * */
        moon.raiden = function () {
            //raiden 雷达;
            var orginalDraw = this.draw;
            var _this = this;
            var date = Date.now();
            var frame = 11;
            var dx = 0;
            this.draw = function() {
                orginalDraw.apply(_this, arguments);
                if( Date.now() - date>4000/11) {
                    dx++;
                    date = Date.now();
                };
                _this.opt.context.drawImage( window.gb.imgs["app/imgs/flash.png"],dx*_this.width ,0, 100, 100,_this.x, _this.y, _this.width, _this.height);
            };
            setTimeout( function() {
                _this.draw = orginalDraw;
            },4000);
        };

        /**
         * @desc 让飞机变红;
         * */
        moon.red = function() {
            var orginalDraw = this.draw;
            var _this = this;
            this.draw = function() {
                //_this.opt.context.fillStyle = "rgba(255, 255, 255, "+Math.random()+")";
                _this.opt.context.fillStyle = "#f00";
                _this.opt.context.globalCompositeOperation = "lighter";
                _this.opt.context.fillRect(_this.x, _this.y, _this.width, _this.height);
                orginalDraw.apply(_this, arguments);
            };
            setTimeout( function() {
                _this.draw = orginalDraw;
            },4000);
        };

        /**
         *  @desc flash the plant;
         * */
        moon.flash = function () {
            var orginalDraw = this.draw;
            var _this = this;
            this.draw = function() {
                var random = Math.random();
                _this.opt.context.fillStyle = "rgba(255, 255, 255, "+random+")";
                if( random> 0.3) {
                    orginalDraw.apply(_this, arguments);
                };
            };
            setTimeout( function() {
                _this.draw = orginalDraw;
            },4000);
        };


         /**
         * @desc draw equipment;
         * */
        /**
         * {
         *      bg:"app/imgs/hole.png",
         *      damage : 3,
         *      speedX : 0,
         *      speedY : -3
         *  }
         * */
         var equits = [];
        moon.equits = function () {

            [].splice.call(arguments,0,0,this.x, this.y, this.width, this.height);
            for(var i= 0, len = equits.length; i<len; i++) {
                equits[i].apply( this, arguments);
            };

        };

        /**
         * @desc 为主机添加额外的属性;
         * */
        moon.addEquit = function ( obj ) {
            equits.push( obj );
            return this;
        };

        /**
         * @desc 删除额外属性;
         * */
        moon.removeEquit = function (obj) {
            var index = equits.indexOf( obj );
            if( index !== -1 ) {
                equits.splice(index,1);
            };
            return this;
        };


        moon.drawDashLine = function() {
            var draw = (function () {

                if( Math.random()*10>6 ) {

                    this.opt.context.save();
                    this.opt.context.beginPath();
                    this.opt.context.setLineDash([5]);
                    this.opt.context.strokeStyle = "#EEEEEE";
                    this.opt.context.arc( arguments[0], arguments[1], arguments[2], 0, 2*Math.PI, true );
                    this.opt.context.stroke();
                    this.opt.context.restore();

                };

            }).bind(this);
            var _this = this;

            this.addEquit(draw);
            setTimeout(function() {
                _this.removeEquit( draw );
            }, 4000);
        };

        /**
         * @desc 设置Left值;
         * */
        moon.setLeft = function( left ) {
            moon.x = left;
        };

        /**
         * @desc 设置Top值;
         * */
        moon.setTop = function ( top ) {
            moon.y = top;
        };

        /**
         * @desc 绑定事件, 主要是方向键的绑定;
         * */
        moon.bindEv = function () {
            var _this = this;

            //绑定移动的四个方向;
            var commonControll = new window.CommonControl();
            commonControll.run(function() {

                _this.x-=_this.speed;
                if( _this.x<0 ) _this.x = 0;

            }, function ( disY, objY ) {

                _this.y-=_this.speed;
                if( _this.y<0 ) _this.y=0;
                if( _this.y<disY)_this.y=disY;

            }, function () {

                _this.x+=_this.speed;
                if( _this.x>canvas.width-_this.width) _this.x = canvas.width-_this.width;

            }, function ( disY, objY ) {

                _this.y+=_this.speed;
                if( _this.y>canvas.height - _this.height ) _this.y = canvas.height - _this.height;
                if( _this.y>disY)_this.y=disY;

            }, function(){},_this);
        }
    });


    /**
     * @desc 敌人飞机模型;
     * */
    var Enemy = P(Plane, function ( enemy, plane ) {

        enemy.init = function ( opt ) {

            var _this = this;
            plane.init.apply(this, arguments);
            this.opt = opt || {};
            this.canvas = opt.canvas;
            this.context = opt.context;
            this.task = opt.task;
            this.EMissile = opt.EMissile || EMissile;
            this.eMissileBg = opt.eMissileBg || window.gb.imgs["app/imgs/enemybullet1.png"];
            this.eMissileW = opt.eMissileW || 8;
            this.eMissileH = opt.eMissileH || 8;
            this.eMissileSpeedX = opt.eMissileSpeedX || 0;
            this.eMissileSpeedY = opt.eMissileSpeedY || 3;
            this.eMissileDamage = opt.eMissileDamage || 1;
            this.bg = opt.bg || window.gb.imgs["app/imgs/enmey0.png"];
            this.money = opt.money || 1;
            this.task = opt.task;
            this.x = opt.x || 0;
            this.y = opt.y || 0;
            this.speedX = opt.speedX || 1;
            this.speedY = opt.speedY || 1;
            this.w = opt.w || 40;
            this.h = opt.h || 40;
            this.blood = opt.blood || 2;
            this.speed = opt.speed || 2;
            this.sprite = new Sprite("testData", 20, 500);
            var destroyEnemy = function() {
                _this.setup();
                _this.draw();
                if(_this.x<-_this.w||_this.x>_this.canvas.width||_this.y<-_this.h||_this.y>_this.canvas.height) {
                    _this.task.removeTask( arguments.callee );
                };
            };
            this.task.addTask( destroyEnemy );
            this.remove = function() {
                _this.task.removeTask( destroyEnemy );
            }
        };

        enemy.setup = function () {
            var _this = this;
            this.x += this.speedX;
            this.y += this.speedY;
             //canvas, context, bg, x, y, w ,h , info
             //info { speedX, speedY, damage}
            if( this.sprite.calc().now==4 ) {
                var eMissile = new this.EMissile(this.canvas, this.context, this.eMissileBg , this.x, this.y, this.eMissileW, this.eMissileH, {
                    speedX : this.eMissileSpeedX,
                    speedY : this.eMissileSpeedY,
                    damage : this.eMissileDamage,
                    task : this.task
                });
                var eMTask = function () {
                    eMissile.setup();
                    eMissile.draw();
                    if( eMissile.outOfArea() ) {
                        eMissile.destory();
                        //从task列表删除该函数;
                        _this.task.removeTask( arguments.callee );
                    };
                };
                eMissile.remove = function() {
                    _this.task.removeTask( eMTask );
                };
                _this.task.addTask( eMTask );
            };

        };

        enemy.draw = function () {

            this.context.drawImage(this.bg, this.x, this.y ,this.w, this.h);

        };

    });

    /**
     * @desc Money 打死敌人获取的金钱;
     */
    var Money = P(EventBase , function ( money ) {

        /**
         * @desc 初始化x轴和y轴， 移动的速度，....等....
         */
        money.init = function () {
            this.bg = "";
            this.x = 0;
            this.y = 0;
            this.speedX = 0;
            this.speedY = 0;
            this.w = 1;
            this.h = 1;

        };

        money.setup = function () {

        };

        /**
         * @desc
         * */
        money.draw = function() {

        };

        money.destory = function () {

        }

    });
    //<<<<====数据模型完毕;

    /**
     * @desc 用户控制层；
     * @desc 选择关卡层， 查看帮助层， 游戏设置层， 设置背景音乐；
     * */
    var Con0 = P(EventBase, function ( con0 ) {

    });

    /**
     * @desc 主界面控制层上下左右，wasd， missile是持续放的;
     * @desc 草鸡misille的控制层；
     * @desc 游戏暂停；
     * */
    var Con1 = P(EventBase, function ( con1 ) {

    });

    var Level = P(EventBase, function ( level ) {

    });

    /**
     * requestAnimationFrame ==>> https://technet.microsoft.com/zh-cn/library/hh920765.aspx
     * the demo like this :
     *
         window.handle;
         var fn = function() {
            var el = document.createElement("div");
            el.innerHTML = 1;
            document.body.appendChild( el );
            handle = requestAnimationFrame(fn);
        };
         requestAnimationFrame(fn);
         cancelAnimationFrame(handle);
     * */
    (function() {
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame =
                window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

    var util = {
        domCollision : function ( oDiv, oDiv2 ) {

                var t1 = oDiv.offsetTop;
                var l1 = oDiv.offsetLeft;
                var r1 = oDiv.offsetLeft + oDiv.offsetWidth;
                var b1 = oDiv.offsetTop + oDiv.offsetHeight;

                var t2 = oDiv2.offsetTop;
                var l2 = oDiv2.offsetLeft;
                var r2 = oDiv2.offsetLeft + oDiv2.offsetWidth;
                var b2 = oDiv2.offsetTop + oDiv2.offsetHeight;
                if(b1<t2 || l1>r2 || t1>b2 || r1<l2){// 表示没碰上
                    return false;
                }else{
                    return true;
                };

        },
        canvasCollision : function(obj0, obj1) {
            if( obj0.left>obj1.right || obj0.right<obj1.left || obj0.top>obj1.bottom || obj0.bottom< obj1.top) {
                return false;
            }else{
                return true;
            }
        },
        pointInRect : function ( pointX ,pointY, left, top, width, height ) {
            if( left<pointX && pointX<(left+width) && pointY>top&&(pointY<top+height) ) {
                return true;
            };
            return false
        },
        text : function (canvas, context, left, top, message ) {
            context.save();
            context.font="40px Georgia";
            context.textBaseline = "top";
            context.textAlign="center";
            context.fillText( message, left, top);
            context.save();
        },
        fnId : 0,
        button : function(canvas, context, left, top, message, callback ) {
            callback = callback || function () {
                
            };
            context.save();
            context.font="20px Georgia";
            context.textBaseline = "top";
            context.textAlign="center";
            context.strokeStyle = "#2980B9";
            //context.fillStyle = "#3498DB";
            context.rect(left-40,top-8,80,40);
            //context.fill();
            context.stroke();
            //context
            //context.strokeStyle = "#3498DB";
            context.fillText( message, left, top );
            //context.stroke();
            context.restore();
            var fn = function(ev) {
                var mouseX = ev.pageX - this.offsetLeft;
                var mouseY = ev.pageY - this.offsetTop;
                if( util.pointInRect(mouseX, mouseY, left-40, top-8, 80, 40) ) {
                    callback&&callback();
                    //console.log("on point");
                }else{
                    //console.log("on false")
                }
            };
            util.addEv(canvas, "click", fn);
            return fn;
        },

        drawImage : function( canvas, context, img, left, top, width, height, callback ) {

            callback = callback || function () {

            };
            context.save();
            context.drawImage(img, left, top, width, height );
            context.restore();
            var fn = function(ev) {
                var mouseX = ev.pageX - this.offsetLeft;
                var mouseY = ev.pageY - this.offsetTop;
                if( util.pointInRect(mouseX, mouseY,left, top, width, height) ) {
                    callback&&callback();
                    //console.log("on point");
                }else{
                    //console.log("on false")
                }
            };
            util.addEv(canvas, "click", fn);
            return fn;

        },

        addEv : function(el, name ,fn) {
            el.addEventListener(name, fn, false);
        },

        removeEv : function (el, name ,fn) {
            el.removeEventListener(name, fn, false);
        },

        clear : function( canvas ) {
            canvas.width = canvas.width;
            canvas.height = canvas.height;
        }
    };

var canvas = document.getElementsByTagName("canvas")[0];
var context = canvas.getContext("2d");


var selectPage = P(Page, function ( page ) {
    var plant0,plant1, canvas ;

    page.init = function ( can ) {
        canvas = can;
    };

    page.create = function () {
        var _this = this;
        //创建两个图片的按钮;
        plant0 = util.drawImage(canvas, context, window.gb.imgs["app/imgs/s.gif"], canvas.width/2-40, canvas.height/2 - 100 ,40, 80 ,function() {
            _this.destory();
            window.gb.initUserData("app/imgs/s.gif");
            window.gb.start();
        });

        plant1 = util.drawImage(canvas, context, window.gb.imgs["app/imgs/logo_aliyun.jpg"], canvas.width/2-40, canvas.height/2 ,40, 80 ,function() {
            _this.destory();
            window.gb.initUserData("app/imgs/logo_aliyun.jpg");
            window.gb.start();
        });
    };

    page.destory = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        //清除图片的点击事件;
        util.removeEv(canvas,"click", plant0);
        util.removeEv(canvas,"click", plant1);
    };

});

var HelpPage = P(Page, function ( page ) {

    var backFn, canvas;

    page.init = function ( can ) {
        canvas = can;
    };

    page.create = function () {
        util.clear( canvas );
        backFn = util.button(canvas, context, 60, 10 , "back", function() {
            pages.back();
        });
        context.fillText("help page", canvas.width/2, 10);
    };

    page.destory = function () {
        util.clear( canvas );
        util.removeEv(canvas, "click", backFn);
    };

});

var NamePage = P(Page, function ( namePage ) {

    var backFn , canvas;

    namePage.init = function ( can ) {
        canvas = can;
    };

    namePage.create = function () {

        util.clear( canvas );
        backFn = util.button(canvas, context, 60, 10 , "back", function() {
            pages.back();
        });
        context.fillText("Name page", canvas.width/2, 10);

    };

    namePage.destory = function () {

        util.clear( canvas );
        util.removeEv(canvas, "click", backFn);

    };

});

var Progress = P(EventBase, function ( progress ) {

    progress.init = function ( ) {

    };

    progress.load = function( arr , prog) {

        var _this = this;
        var obj = loadImgs( arr ,function() {

            _this.fireEvent("done", obj);

        }, function( percent ) {

            _this.fireEvent("load", percent);

        });
    };

});

var StartPage =  P(Page, function( startPage ){

    var canvas;
    var startHandle, helpHandle, namesHandle;

    var start = function () {

        pages.add( new selectPage( canvas ) );

    };

    var help = function() {

        pages.add( new HelpPage( canvas ) );

    };

    var names = function() {

        pages.add( new NamePage( canvas ) );

    };


    startPage.init = function( can ) {

        canvas = can;

    };

    startPage.create = function() {
        util.clear( canvas );
        util.text(canvas, context, canvas.width/2, 4 , "info");
        startHandle = util.button(canvas, context, canvas.width/2, canvas.height/2-80 , "start", start);
        helpHandle = util.button(canvas, context, canvas.width/2, canvas.height/2 , "help", help);
        namesHandle = util.button(canvas, context, canvas.width/2, canvas.height/2+80 , "names", names);
    };

    startPage.destory = function () {
        util.removeEv( canvas, "click", startHandle );
        util.removeEv( canvas, "click", helpHandle );
        util.removeEv( canvas, "click", namesHandle );
        util.clear( canvas );
    };

});

/**
 * @desc 预加载图片；
 * */
window.gb.loadGImgsModule = function( callback ) {

    var progress = new Progress();

    //为进度条添加两个自定义事件;
    progress.addListener("done", function(type, imgs) {

        util.clear( canvas );
        //把图片加载放到一个对象里, 作为缓存;
        window.gb && ( window.gb.imgs = imgs );
        console.log("done");
        callback&&callback();

    });

    progress.addListener("load", function ( type, per ) {

        context.save();

        context.fillStyle="#ECF0F1";
        context.fillRect(0, 0, per*canvas.width, canvas.height);

        context.fillStyle = "#7F8C8D";
        context.fillText(parseInt(per*100)+"%",100,100);

        context.restore();

    });

    progress.load( window.gb.users );

};


function g( level ) {

    var LEVELS = {
        0 : {
            1000 : [
                [Enemy,{
                    canvas : canvas,
                    context : canvas.getContext('2d'),
                    bg : window.gb.imgs["app/imgs/enemy0.png"],
                    w : 40,
                    h : 40,
                    x : 0,
                    y : 0,
                    speedX : 3,
                    EMissile : EMissile,
                    eMissileBg :  window.gb.imgs["app/imgs/enemybullet1.png"],
                    eMissileH : 8,
                    eMissileW : 8 ,
                    eMissileSpeedX : 3,
                    eMissileSpeedY : 5,
                    eMissileDamage : 1
                }]
            ],
            2000 : [
                [Enemy,{
                    canvas : canvas,
                    context : canvas.getContext('2d'),
                    bg : window.gb.imgs["app/imgs/enemy0.png"],
                    w : 40,
                    h : 40,
                    x : 0,
                    y : 0,
                    speedX : 3,
                    EMissile : EMissile,
                    eMissileBg :  window.gb.imgs["app/imgs/enemybullet1.png"],
                    eMissileH : 8,
                    eMissileW : 8 ,
                    eMissileSpeedX : 3,
                    eMissileSpeedY : 5,
                    eMissileDamage : 1
                }]
            ],
            3000 : [
                [Enemy,{
                    canvas : canvas,
                    context : canvas.getContext('2d'),
                    bg : window.gb.imgs["app/imgs/enemy0.png"],
                    w : 40,
                    h : 40,
                    x : 0,
                    y : 0,
                    speedX : 3,
                    EMissile : EMissile,
                    eMissileBg :  window.gb.imgs["app/imgs/enemybullet1.png"],
                    eMissileH : 8,
                    eMissileW : 8 ,
                    eMissileSpeedX : 3,
                    eMissileSpeedY : 5,
                    eMissileDamage : 1
                }]
            ],
            4000 : [
                [Enemy,{
                    canvas : canvas,
                    context : canvas.getContext('2d'),
                    bg : window.gb.imgs["app/imgs/enemy0.png"],
                    w : 40,
                    h : 40,
                    x : 0,
                    y : 0,
                    speedX : 3,
                    EMissile : EMissile,
                    eMissileBg :  window.gb.imgs["app/imgs/enemybullet1.png"],
                    eMissileH : 8,
                    eMissileW : 8 ,
                    eMissileSpeedX : 3,
                    eMissileSpeedY : 5,
                    eMissileDamage : 1
                }]
            ],
            5000 : [
                [Enemy,{
                    canvas : canvas,
                    context : canvas.getContext('2d'),
                    bg : window.gb.imgs["app/imgs/enemy0.png"],
                    w : 40,
                    h : 40,
                    x : 0,
                    y : 0,
                    speedX : 3,
                    EMissile : EMissile,
                    eMissileBg :  window.gb.imgs["app/imgs/enemybullet1.png"],
                    eMissileH : 8,
                    eMissileW : 8 ,
                    eMissileSpeedX : 3,
                    eMissileSpeedY : 5,
                    eMissileDamage : 1
                }]
            ],
            6000 : [
                [Enemy,{
                    canvas : canvas,
                    context : canvas.getContext('2d'),
                    bg : window.gb.imgs["app/imgs/enemy0.png"],
                    w : 40,
                    h : 40,
                    x : 0,
                    y : 0,
                    speedX : 3,
                    EMissile : EMissile,
                    eMissileBg :  window.gb.imgs["app/imgs/enemybullet1.png"],
                    eMissileH : 8,
                    eMissileW : 8 ,
                    eMissileSpeedX : 3,
                    eMissileSpeedY : 5,
                    eMissileDamage : 1
                }]
            ],
            7000 : [

                [Enemy,{
                    canvas : canvas,
                    context : canvas.getContext('2d'),
                    bg : window.gb.imgs["app/imgs/enemy1.png"],
                    w : 40,
                    h : 40,
                    x : 0,
                    y : 100,
                    speedX : 3,
                    EMissile : EMissile,
                    eMissileBg :  window.gb.imgs["app/imgs/enemybullet.png"],
                    eMissileH : 8,
                    eMissileW : 8 ,
                    eMissileSpeedX : 3,
                    eMissileSpeedY : 5,
                    eMissileDamage : 1
                }]
            ],
            8000 : [

                [Enemy,{
                    canvas : canvas,
                    context : canvas.getContext('2d'),
                    bg : window.gb.imgs["app/imgs/enemy1.png"],
                    w : 40,
                    h : 40,
                    x : 0,
                    y : 100,
                    speedX : 3,
                    EMissile : EMissile,
                    eMissileBg :  window.gb.imgs["app/imgs/enemybullet.png"],
                    eMissileH : 8,
                    eMissileW : 8 ,
                    eMissileSpeedX : 3,
                    eMissileSpeedY : 5,
                    eMissileDamage : 1
                }]
            ],
            9000 : [

                [Enemy,{
                    canvas : canvas,
                    context : canvas.getContext('2d'),
                    bg : window.gb.imgs["app/imgs/enemy1.png"],
                    w : 40,
                    h : 40,
                    x : 0,
                    y : 100,
                    speedX : 3,
                    EMissile : EMissile,
                    eMissileBg :  window.gb.imgs["app/imgs/enemybullet.png"],
                    eMissileH : 8,
                    eMissileW : 8 ,
                    eMissileSpeedX : 3,
                    eMissileSpeedY : 5,
                    eMissileDamage : 1
                }]
            ],
            10000 : [

                [Enemy,{
                    canvas : canvas,
                    context : canvas.getContext('2d'),
                    bg : window.gb.imgs["app/imgs/enemy1.png"],
                    w : 40,
                    h : 40,
                    x : 0,
                    y : 100,
                    speedX : 3,
                    EMissile : EMissile,
                    eMissileBg :  window.gb.imgs["app/imgs/enemybullet.png"],
                    eMissileH : 8,
                    eMissileW : 8 ,
                    eMissileSpeedX : 3,
                    eMissileSpeedY : 5,
                    eMissileDamage : 1
                }]
            ],
            11000 : [

                [Enemy,{
                    canvas : canvas,
                    context : canvas.getContext('2d'),
                    bg : window.gb.imgs["app/imgs/enemy1.png"],
                    w : 40,
                    h : 40,
                    x : 0,
                    y : 100,
                    speedX : 3,
                    EMissile : EMissile,
                    eMissileBg :  window.gb.imgs["app/imgs/enemybullet.png"],
                    eMissileH : 8,
                    eMissileW : 8 ,
                    eMissileSpeedX : 3,
                    eMissileSpeedY : 5,
                    eMissileDamage : 1
                }]
            ],
            12000 : [

                [Enemy,{
                    canvas : canvas,
                    context : canvas.getContext('2d'),
                    bg : window.gb.imgs["app/imgs/enemy1.png"],
                    w : 40,
                    h : 40,
                    x : 0,
                    y : 100,
                    speedX : 3,
                    EMissile : EMissile,
                    eMissileBg :  window.gb.imgs["app/imgs/enemybullet.png"],
                    eMissileH : 8,
                    eMissileW : 8 ,
                    eMissileSpeedX : 3,
                    eMissileSpeedY : 5,
                    eMissileDamage : 1
                }]
            ]
        }
    }
    for(var i=0; i<400; i++ ) {
        LEVELS[0][ parseInt( Math.floor(Math.random()*200)+"000")  ] = [[Enemy, {
                canvas : canvas,
                context : canvas.getContext('2d'),
                bg : window.gb.imgs[
                    ["app/imgs/enemy0.png","app/imgs/enemy1.png","app/imgs/enemy2.png","app/imgs/enemy3.png","app/imgs/enemy4.png","app/imgs/enemy5.png"][_.random(0,5)]
                    ],
                w : 40,
                h : 40,
                x : [-10,390][_.random(0,1)],
                y : _.random(0,100),
                blood : 2,
                speedX : [1,2,-3,4,-5,6,-3,-3][_.random(0,8)],
                EMissile : EMissile,
                eMissileBg :  window.gb.imgs["app/imgs/enemybullet.png"],
                eMissileH : 8,
                eMissileW : 8 ,
                eMissileSpeedX : [1,2,-3,4,-5,6,-3,-3][_.random(0,8)],
                eMissileSpeedY : 5,
                eMissileDamage : 1
            }]];
        //
    }

    level = level || 0;
    var now = Date.now();
    var task = new TaskList();
    var moonWarr = new MoonWarr({
        bg : window.gb.imgs[window.gb.userData.bg],
        canvas : canvas,
        context : canvas.getContext('2d'),
        task  : task
    });
    var bg = new Bg(canvas, canvas.getContext('2d'), 1);
    moonWarr.flash();
    window.moonWarr = moonWarr;
    var info = new Info( canvas,context );
    task.plane( moonWarr );
    moonWarr.drawDashLine();
    task.addTask( function() {
        util.clear(canvas);
    }).addTask(function() {
        bg.setup();
        bg.draw();
    }).addTask(function () {
        info.setup( window.gb.userData );
    }).addTask(function() {
        info.draw.bind( info )();
    }).addTask(function() {
        moonWarr.setup.bind(moonWarr)();
    }).addTask(function () {
        moonWarr.draw.bind(moonWarr)();
    }).addTask(function() {
        var times = Date.now() - now;
        var timeLine =  (times+"").replace(/\d{3,3}$/,"000");
        var enemys = LEVELS[ level ] [ timeLine ];
        if( enemys ) {
            for(var i=0; i< enemys.length; i++ ) {
                var enemyObj = enemys[i];

                //根据数据信息实例化生成敌机数据;
                enemyObj[1].task = task;
                var enemy =new enemyObj[0]( enemyObj[1] );

                //把敌机的数据保存到task的缓存里面;
                task.addEnemy( enemy );
            };
            delete LEVELS[ level ] [ timeLine ];
        };
        /*
        enemy.setup();
        enemy.draw();*/
    }).setInterval(30);

/*
    var enemy = new Enemy({
        canvas : canvas,
        context : canvas.getContext('2d'),
        task : task
    });
*/

};

window.gb.start = function() {
    console.log(window.gb.userData);
    //又跳过去了;
    g();
};

//for test;
window.gb.loadGImgsModule( function () {

    var test = true;
    if( test ) {
        g();
    }else{
        window.pages = new Pages();
        pages.add( new StartPage( canvas ) );
        pages.start();
    };

});

/*var ev = new MouseEvent("click",{
    bubbles: true,
    cancelable: true,
    view: window,
    pageX : 205,
    pageY : 190
});*/
/*
var ev = document.createEvent();
ev.initEvent("click", true, false);
canvas.dispatchEvent(ev);
*/
//});