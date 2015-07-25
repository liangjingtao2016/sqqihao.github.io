define(function() {

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
            context.font = "bold 10px serif";
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

    return Info;
})