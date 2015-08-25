define(["app/C/Progress"], function ( Progress ) {

    /**
     * @desc 预加载图片；
     * */
    var loadGImgsModule = function( canvas ,context, callback ) {

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
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.font = "40px Arial";
            context.fillStyle = "#7F8C8D";
            context.fillText(parseInt(per*100)+"%",100,100);

            context.restore();

        });

        progress.load( window.gb.users );

    };

    return loadGImgsModule;
});