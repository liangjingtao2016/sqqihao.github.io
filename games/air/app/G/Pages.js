define(["app/C/Page"], function ( Page ) {

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

    var StartPage =  P(Page, function( startPage ){

        //var audio = new Audio;
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
            //audio.playmp3("./app/audio/mainMainMusic.mp3");

        };

        startPage.create = function() {
            util.clear( canvas );
            util.text(canvas, context, canvas.width/2, 4 , "info");
            startHandle = util.button(canvas, context, canvas.width/2, canvas.height/2-80 , "start", start);
            helpHandle = util.button(canvas, context, canvas.width/2, canvas.height/2 , "help", help);
            namesHandle = util.button(canvas, context, canvas.width/2, canvas.height/2+80 , "names", names);
        };

        startPage.destory = function () {
            //audio.pause();
            util.removeEv( canvas, "click", startHandle );
            util.removeEv( canvas, "click", helpHandle );
            util.removeEv( canvas, "click", namesHandle );
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