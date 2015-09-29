define(["app/C/Page"], function ( Page ) {

    var selectPage = P(Page, function ( page ) {
        var plant0,plant1, canvas , context;
        page.init = function ( can, con ) {
            canvas = can;
            context = con;
        };

        page.create = function () {
            var _this = this;
            //创建两个图片的按钮;

            context.drawImage( window.gb.imgs["app/imgs/background1.jpg"], 0 , 0 ,window.gb.imgs["app/imgs/background1.jpg"].width, window.gb.imgs["app/imgs/background1.jpg"].height, 0, 0 ,canvas.width, canvas.height);
            context.fillStyle = "#ffffff";
            context.font = "20px Arial";
            context.fillText("选择作战飞机", 10 , 30);
            plant0 = util.drawImage(canvas, context, window.gb.imgs["app/imgs/plane11.png"], canvas.width/2-40, canvas.height/2 - 100 ,80, 80 ,function() {
                _this.destory();
                window.gb.initUserData("app/imgs/plane8.png");
                window.gb.start();
            });

            plant1 = util.drawImage(canvas, context, window.gb.imgs["app/imgs/plane12.png"], canvas.width/2-40, canvas.height/2 ,80, 80 ,function() {
                _this.destory();
                window.gb.initUserData("app/imgs/plane9.png");
                window.gb.start();
            });
        };

        page.destory = function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            //清除图片的点击事件;
            util.removeEv(canvas,typeof window.ontouchstart === "object" ? "touchstart" : "click", plant0);
            util.removeEv(canvas,typeof window.ontouchstart === "object" ? "touchstart" : "click", plant1);
        };

    });

    var HelpPage = P(Page, function ( page ) {

        var backFn, canvas, context;

        page.init = function ( can, con ) {
            canvas = can;
            context = con;
        };

        page.create = function () {
            util.clear( canvas );

            context.fillStyle = "#ffffff";
            context.drawImage(window.gb.imgs["app/imgs/g2.jpg"],0 , 0 , canvas.width, canvas.height);
            context.font = "30px Arial";
            context.fillText("help page", canvas.width/2, 30);
            context.font = "16px Arial";
            context.fillText("在电脑端通过方向键或者鼠标可移动", 0 , canvas.height-60);
            context.fillText("在手机或者平板上直接触屏飞机可移动", 0 , canvas.height-30);

            backFn = util.button(canvas, context, 60, 10 , "back", function() {
                pages.back();
            });
        };

        page.destory = function () {
            util.clear( canvas );
            util.removeEv(canvas, typeof window.ontouchstart === "object" ? "touchstart" : "click", backFn);
        };

    });

    var NamePage = P(Page, function ( namePage ) {

        var backFn , canvas, context;

        namePage.init = function ( can ,con) {
            canvas = can;
            context = con;
        };

        namePage.create = function () {

            util.clear( canvas );
            context.drawImage(window.gb.imgs["app/imgs/author.png"],0 , 0 , canvas.width, canvas.height);

            context.fillStyle = "#ffffff";
            backFn = util.button(canvas, context, 60, 10 , "back", function() {
                pages.back();
            });
            context.font = "20px Arial";
            context.fillText("about page", canvas.width/2, 20);
            context.fillText("author qihao", canvas.width/2, 40);
            context.fillText("designer qihao", canvas.width/2, 60);
            context.fillText("music qihao", canvas.width/2, 80);
            context.fillText("my blog : ", 0, 180);
            context.fillText("www.cnblogs.com/diligenceday", 0, 200);

        };

        namePage.destory = function () {

            util.clear( canvas );
            util.removeEv(canvas, typeof window.ontouchstart === "object" ? "touchstart" : "click", backFn);

        };

    });

    var StartPage =  P(Page, function( startPage ){

        //var audio = new Audio;
        var canvas,context;
        var startHandle, helpHandle, namesHandle;

        var start = function () {

            pages.add( new selectPage( canvas , context) );

        };

        var help = function() {

            pages.add( new HelpPage( canvas, context ) );

        };

        var names = function() {

            pages.add( new NamePage( canvas, context ) );

        };


        startPage.init = function( can ,con) {

            canvas = can;
            context = con;
            //audio.playmp3("./app/audio/mainMainMusic.mp3");

        };

        startPage.create = function() {
            util.clear( canvas );
            context.save();
            context.fillStyle = "#f00";
            context.drawImage(window.gb.imgs["app/imgs/start.png"], 0, 0, canvas.width, canvas.height);
            util.text(canvas, context, canvas.width/2, 4 , "地球保卫战");

            startHandle = util.button(canvas, context, canvas.width/2, canvas.height/2-80 , "start", start);
            helpHandle = util.button(canvas, context, canvas.width/2, canvas.height/2 , "help", help);
            namesHandle = util.button(canvas, context, canvas.width/2, canvas.height/2+80 , "about", names);
            context.restore();
        };

        startPage.destory = function () {
            //audio.pause();
            util.removeEv( canvas, typeof window.ontouchstart === "object" ? "touchstart" : "click", startHandle );
            util.removeEv( canvas, typeof window.ontouchstart === "object" ? "touchstart" : "click", helpHandle );
            util.removeEv( canvas, typeof window.ontouchstart === "object" ? "touchstart" : "click", namesHandle );
            util.clear( canvas );
        };

    });

    return {
        SelectPage : selectPage,
        HelpPage : HelpPage,
        NamePage : NamePage,
        StartPage : StartPage
    }
})