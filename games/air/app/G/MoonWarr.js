define( ["app/G/Plane", "app/G/Missile" , "app/C/Sprite", "app/util/CommonController"],  function ( Plane, Missile, Sprite, CommonController ) {

    /**
     * @desc 主角的飞机模型;
     * */
    var MoonWarr = P(Plane, function ( moon, plane ) {
        var fireEffect = new GT.Sound({
            id: "sfx-2",
            src: "./app/audio/fireEffect.mp3",
            loop: true,
            volume: 1,
            tag: "sfx",
            channel: 2
        });
        fireEffect.load();
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
                            fireEffect.play();
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
            var commonControll = new CommonController();
            commonControll.run(function( dixX ) {

                _this.x-=_this.speed;
                if( _this.x<0 ) _this.x = 0;
                if( _this.x< dixX) _this.x = dixX;

            }, function ( disY, objY ) {

                _this.y-=_this.speed;
                if( _this.y<0 ) _this.y=0;
                if( _this.y<disY)_this.y=disY;

            }, function ( dixX ) {

                _this.x+=_this.speed;
                if( _this.x>canvas.width-_this.width) _this.x = canvas.width-_this.width;
                if( _this.x>dixX ) _this.x = dixX;

            }, function ( disY, objY ) {

                _this.y+=_this.speed;
                if( _this.y>canvas.height - _this.height ) _this.y = canvas.height - _this.height;
                if( _this.y>disY)_this.y=disY;

            }, function(){},_this);
        }
    });

    return MoonWarr;
})