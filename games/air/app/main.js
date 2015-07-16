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

require(["app/util/Event","app/util/EventBase", "app/util/global", "app/util/requestAnimationFrame" ]);

require(["app/util/loadImgs", "app/C/ExTaskList", "app/C/Pages", "app/G/Pages",
        "app/C/Page", "app/C/Bg" , "app/G/Info", "app/G/MoonWarr",
        "app/C/loadGImgsModule", "app/Model/levels"],
    function( loadImgs, TaskList , Pages, gPages, Page ,Bg, Info, MoonWarr, loadGImgsModule, levels) {

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

    var canvas = document.getElementsByTagName("canvas")[0];
    var context = canvas.getContext("2d");
    var sound = new GT.Sound({
        id: "sfx-1",
        src: "./app/audio/music.mp4",
        loop: true,
        volume: 1,
        tag: "sfx",
        channel: 2
    });
    sound.load();
    sound.onLoad = function(){
        this.play();
    };

    function g( level ) {

        //生成关卡数据;
        var LEVELS = levels( canvas );

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
        //跳过去了;
        g();
    };

    loadGImgsModule(canvas, context ,function () {

        var test = true;
        if( test ) {
            g();
        }else{
            window.pages = new Pages();
            pages.add( new gPages.StartPage( canvas ) );
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
});