define(["app/G/Enemy", "app/G/EMissile", "app/G/Boss"], function ( Enemy ,EMissile, Boss) {
    return function ( canvas) {
        //野怪地图
        var LEVELS = {
            //一级;
            0 : {
            },
            //二级;
            1 : {

            },
            //三级;
            2 : {

            },
            //四级;
            3 : {

            }
        };

        //生成一组野怪的方法;
        function group(obj, timeStart, timeEnd , Enemys) {
            for(var i=parseInt(timeStart) ; i<parseInt(timeEnd); i+=1000) {
                if( obj[i] instanceof Array ) {
                    obj[i].push( Enemys[0] );
                }else{
                    obj[i] = Enemys;
                };
            };
        };

        //一到四秒出现的野怪
        group(LEVELS[0], 1000, 4000, [
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
        ]);

        //7到11秒出现的野怪
        group(LEVELS[0], 7000, 11000, [

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
        ]);

        //12到18秒出现的野怪
        group(LEVELS[0], 12000, 18000, [

            [Enemy,{
                canvas : canvas,
                context : canvas.getContext('2d'),
                bg : window.gb.imgs["app/imgs/enemy1.png"],
                w : 40,
                h : 40,
                x : canvas.width/2,
                y : -10,
                speedX : 0,
                speedY : 2,
                EMissile : EMissile,
                eMissileBg :  window.gb.imgs["app/imgs/enemybullet.png"],
                eMissileH : 8,
                eMissileW : 8 ,
                eMissileSpeedX : -3,
                eMissileSpeedY : 5,
                eMissileDamage : 1
            }]
        ]);

        //20到26秒出现的野怪
        group(LEVELS[0], 20000, 26000, [

            [Enemy,{
                canvas : canvas,
                context : canvas.getContext('2d'),
                bg : window.gb.imgs["app/imgs/enemy3.png"],
                w : 40,
                h : 40,
                x : 0,
                y : canvas.width-1,
                speedX : 1,
                EMissile : EMissile,
                eMissileBg :  window.gb.imgs["app/imgs/enemybullet1.png"],
                eMissileH : 8,
                eMissileW : 8 ,
                eMissileSpeedX : 0,
                eMissileSpeedY : 5,
                eMissileDamage : 1
            }]
        ]);

        //30到36秒出现的野怪
        group(LEVELS[0], 30000, 36000, [

            [Enemy,{
                canvas : canvas,
                context : canvas.getContext('2d'),
                bg : window.gb.imgs["app/imgs/enemy4.png"],
                w : 40,
                h : 40,
                x : 1,
                y : canvas.width-1,
                speedX : 0,
                EMissile : EMissile,
                eMissileBg :  window.gb.imgs["app/imgs/blastz3.png"],
                eMissileH : 8,
                eMissileW : 8 ,
                eMissileSpeedX : 0,
                eMissileSpeedY : 5,
                eMissileDamage : 1
            }]
        ]);

        //37到40秒出现的野怪
        group(LEVELS[0], 37000, 40000, [

            [Enemy,{
                canvas : canvas,
                context : canvas.getContext('2d'),
                bg : window.gb.imgs["app/imgs/enemy5.png"],
                w : 40,
                h : 40,
                x : canvas.width-1,
                y : 0,
                speedX : 2,
                EMissile : EMissile,
                eMissileBg :  window.gb.imgs["app/imgs/blastz3.png"],
                eMissileH : 8,
                eMissileW : 8 ,
                eMissileSpeedX : 2,
                eMissileSpeedY : 5,
                eMissileDamage : 1
            }]
        ]);


        //41到50秒出现的野怪
        group(LEVELS[0], 41000, 50000, [

            [Enemy,{
                canvas : canvas,
                context : canvas.getContext('2d'),
                bg : window.gb.imgs["app/imgs/enemy6.png"],
                w : 50,
                h : 50,
                x : canvas.width-1,
                y : 100,
                speedX : 1,
                EMissile : EMissile,
                eMissileBg :  window.gb.imgs["app/imgs/blastz3.png"],
                eMissileH : 8,
                eMissileW : 8 ,
                eMissileSpeedX : 0,
                eMissileSpeedY : 5,
                eMissileDamage : 1
            }]
        ]);

        //50到55秒出现的野怪
        group(LEVELS[0], 50000, 55000, [

            [Enemy,{
                canvas : canvas,
                context : canvas.getContext('2d'),
                bg : window.gb.imgs["app/imgs/enemy7.png"],
                w : 50,
                h : 50,
                x : canvas.width-1,
                y : 0,
                speedX : 1,
                EMissile : EMissile,
                eMissileBg :  window.gb.imgs["app/imgs/blastz3.png"],
                eMissileH : 8,
                eMissileW : 8 ,
                eMissileSpeedX : 0,
                eMissileSpeedY : 5,
                eMissileDamage : 1
            }]
        ]);

        //55到60秒出现的野怪
        group(LEVELS[0], 55000, 60000, [

            [Enemy,{
                canvas : canvas,
                context : canvas.getContext('2d'),
                bg : window.gb.imgs["app/imgs/enemy8.png"],
                w : 50,
                h : 50,
                x : canvas.width-1,
                y : 0,
                speedX : 1,
                EMissile : EMissile,
                eMissileBg :  window.gb.imgs["app/imgs/blastz3.png"],
                eMissileH : 8,
                eMissileW : 8 ,
                eMissileSpeedX : 0,
                eMissileSpeedY : 5,
                eMissileDamage : 1
            }]
        ]);

        //随机怪物;
        for(var i=0; i<400; i++ ) {
            var positionX = [-10,canvas.width-10][_.random(0,1)];
            var positionY = _.random(-20,100);
            var speedX = positionX <0 ? [1, 2, 3, 4, 5, 6][_.random(0,5)] : [-1,-2,-3, -4][_.random(0,5)];
            var speedY = [1, 2, 3, 4, 5][_.random(0,4)];
            LEVELS[0][ parseInt( Math.floor(Math.random()*200)+"000")  ] = [[Enemy, {
                canvas : canvas,
                context : canvas.getContext('2d'),
                bg : window.gb.imgs[
                    [
                        "app/imgs/enemy0.png","app/imgs/enemy1.png","app/imgs/enemy2.png","app/imgs/enemy3.png","app/imgs/enemy4.png","app/imgs/enemy5.png","app/imgs/enemy6.png","app/imgs/enemy7.png","app/imgs/enemy8.png","app/imgs/enemy9.png"][_.random(0,8)]
                    ],
                w : 40,
                h : 40,
                x : positionX,
                y : positionY ,
                speedX : speedX,
                speedY : speedY,
                blood : 2,
                eMissileSpeedX : speedX+2,
                eMissileSpeedY : speedY+2,
                eMissileBg : window.gb.imgs[["app/imgs/enemybullet1.png","app/imgs/enemybullet.png","app/imgs/blastz1.png","app/imgs/blastz2.png","app/imgs/blastz3.png","app/imgs/blastz4.png","app/imgs/blastz5.png","app/imgs/blastz6.png"][_.random(0.7)]],
                EMissile : EMissile,
                eMissileH : 8,
                eMissileW : 8 ,
                eMissileDamage : 1
            }]];
            //
        };
        //第一关的boss要出现了;
        LEVELS[0][ /*"201000"*/"1000" ] = [[Boss, {
            canvas : canvas,
            context : canvas.getContext('2d'),
            bg : window.gb.imgs["app/imgs/boss.png"],
            w : 176,
            h : 80,
            x : (canvas.width-176)/2,
            y : -79 ,
            speedX : 0,
            speedY : 1,
            blood : 20,
            eMissileSpeedX : 0,
            eMissileSpeedY : 4,
            eMissileBg : window.gb.imgs["app/imgs/bossbullet2.png"],
            EMissile : EMissile,
            eMissileH : 41,
            eMissileW : 16,
            eMissileDamage : 1
        }]];

        LEVELS[1] = LEVELS[0];

        return LEVELS;
    };

})