define(["app/G/Missile","app/C/Sprite"] ,function ( Missile ,Sprite) {

    var explodeEffect = new GT.Sound({
        id: "explodeEffect-2",
        src: "./app/audio/explodeEffect.mp3",
        loop: false,
        volume: 1,
        tag: "explodeEffect",
        channel: 2
    });
    explodeEffect.load();

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
                plane.blood--;
                //if( (plane.blood--)===0 ) {
                plane.destory&&plane.destory();
                plane.remove&&plane.remove();
                //};
                //播放爆炸声;
                explodeEffect.play();
                this.remove&&this.remove();
                console.log("collision");
            }
        };

    });

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

    return EMissile;
})