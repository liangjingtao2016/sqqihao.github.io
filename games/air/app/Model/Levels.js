define(["app/G/Enemy", "app/G/EMissile"], function ( Enemy ,EMissile) {
    return function ( canvas) {
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
        };

        for(var i=0; i<400; i++ ) {
            var positionX = [-10,canvas.width-10][_.random(0,1)];
            var positionY = _.random(-20,100);
            var speedX = positionX<0 ? [1, 2, 3, 4, 5, 6][_.random(0,5)] : [-1,-2,-3, -4][_.random(0,5)];
            var speedY = [1, 2, 3, 4, 5, 6][_.random(0,5)];
            LEVELS[0][ parseInt( Math.floor(Math.random()*200)+"000")  ] = [[Enemy, {
                canvas : canvas,
                context : canvas.getContext('2d'),
                bg : window.gb.imgs[
                    [
                        "app/imgs/enemy0.png","app/imgs/enemy1.png","app/imgs/enemy2.png","app/imgs/enemy3.png","app/imgs/enemy4.png","app/imgs/enemy5.png"][_.random(0,5)]
                    ],
                w : 40,
                h : 40,
                x : positionX,
                y : positionY ,
                speedX : speedX,
                speedY : speedY,
                blood : 2,
                eMissileSpeedX : speedX,
                eMissileSpeedY : speedY,
                EMissile : EMissile,
                eMissileH : 8,
                eMissileW : 8 ,
                eMissileDamage : 1
            }]];
            //
        };

        return LEVELS
    }

})