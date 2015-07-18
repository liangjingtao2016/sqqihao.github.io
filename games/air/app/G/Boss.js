define(["app/G/Plane", "app/G/EMissile", "app/C/Sprite"], function( Plane, EMissile, Sprite ) {

    var Boss = P(Plane, function (boss, plane) {

        boss.init = function ( opt ) {

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
            this.speedX = typeof opt.speedX === "number" ? opt.speedX : 1;
            this.speedY = opt.speedY || 1;
            this.w = opt.w || 40;
            this.h = opt.h || 40;
            this.blood = opt.blood || 2;
            this.speed = opt.speed || 2;
            this.sprite = new Sprite("testData", 20, 500);
            var taskFn = function() {
                _this.setup();
                _this.draw();
                if(_this.x<-_this.w||_this.x>_this.canvas.width||_this.y<-_this.h||_this.y>_this.canvas.height) {
                    _this.task.removeTask( arguments.callee );
                };
            };

            this.task.addTask( taskFn );
            this.remove = function() {
                _this.task.removeTask( taskFn );
            }
        };

        boss.setup = function () {
            var _this = this;
            this.x += this.speedX;
            this.y += this.speedY;
            //canvas, context, bg, x, y, w ,h , info
            //info { speedX, speedY, damage}
            var now = this.sprite.calc().now;
            if( now==4 ) {
                var eMissile = new this.EMissile(this.canvas, this.context, this.eMissileBg , this.x+((this.w)/2)-(this.eMissileW/2), this.y, this.eMissileW, this.eMissileH, {
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
            if( now == 20 ) {

                if( _this.speedX==0 ) {
                    _this.speedX = 2;
                }else{
                    _this.speedX = -_this.speedX;
                };

            };
            setTimeout(function() {
                _this.speedY = 0;
            },2000);

        };

        boss.draw = function () {

            this.context.drawImage(this.bg, this.x, this.y ,this.w, this.h);

        };

        boss.destory = function () {
            var _this = this;
            plane.destory.apply(_this, arguments);
            setTimeout(function() {
                plane.destory.apply(_this, arguments);

                setTimeout(function() {
                    plane.destory.apply(_this, arguments);

                    setTimeout(function() {
                        plane.destory.apply(_this, arguments);

                        setTimeout(function() {

                            plane.destory.apply(_this, arguments);

                            setTimeout(function() {
                                plane.destory.apply(_this, arguments);

                                setTimeout(function() {
                                    plane.destory.apply(_this, arguments);

                                    setTimeout(function() {
                                        plane.destory.apply(_this, arguments);

                                        setTimeout(function() {
                                            plane.destory.apply(_this, arguments);
                                            window.gb.level++;
                                            alert("进入第"+window.gb.level+"关");
                                            window.g( window.gb.level );
                                        },1000);

                                    },1000);

                                },1000);

                            },1000);

                        },1000);

                    },1000);

                },1000);

            },1000);
        };
    });

    return Boss;
})