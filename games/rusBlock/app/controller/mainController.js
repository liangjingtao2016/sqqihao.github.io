define(function() {
    var isMobile = function() {
        return navigator.userAgent.toLowerCase().indexOf("mobile") !== -1 || navigator.userAgent.toLowerCase().indexOf("android") !== -1  || navigator.userAgent.toLowerCase().indexOf("pad") !== -1;
    }
    //分数模块;
    var score = {};
    require(["app/model/score"],function(defineScore) {
        score = defineScore;
    });
    var startGame = function() {
        $(this).attr("disabled","true");
        requirejs(["app/model/data","app/view/init","app/model/Block","app/view/mobileDOM"],function(data, view, Block, mobileDOM){
            var block = new Block;
            var mapData = {};

            //方块发生改变的时候，我们用回调重新渲染界面;
            block.onupdate( function() {
                var blockData = this.get();
                //把数据格式转化成map数据;
                mapData = data.extend(blockData);
                $("#table").html( view( mapData ) );
            });

            block.testTouch = data.testTouch;

            //如果元素触底了或者是元素已经被卡主不能动的情况下;
            block.onend(function() {
                //这个说明当前的block触底了
                data.set( mapData );
                //我们需要重新生成一个方块;
                block = new Block();
                block.onupdate = this.onupdate;
                block.onend = this.onend;
                block.moveRight = this.moveRight;
                block.moveLeft = this.moveLeft;
                block.rotate = this.rotate;
                block.ontestY = this.ontestY;
                block.testTouch = this.testTouch;
                //通过data计算，如果有连接起来的一条线，就执行SCORE回调, 随之会更新当前界面的分值;
                //如果方块跑到了最上面就是游戏失败了;
                data.oncalculate( score.addScore , block.destory.bind(block));
            });
            if(!isMobile()) {
                $(window).keydown(function(ev) {
                    if(ev.keyCode === 37) {
                        block.add(block.moveLeft,"left");
                    }else if( ev.keyCode === 39 ) {
                        block.add(block.moveRight,"right");
                    }else if( ev.keyCode === 40 ) {
                        block.add(block.moveDown,"down");
                    }else if( ev.keyCode === 38 ) {
                        block.rotate();
                    };
                });
            }else{
                mobileDOM.addDOM();
                $(".arrow-up").tap(function() {
                    block.rotate();
                });
                $(".arrow-down").tap(function() {
                    block.add(block.moveDown,"down");
                });
                $(".arrow-left").tap(function() {
                    block.add(block.moveLeft,"left");
                });
                $(".arrow-right").tap(function() {
                    block.add(block.moveRight,"right");
                });
            };
        });
    };

    //绑定界面事件 ,keyDown;
    var bindEvent = function() {
        //start....
        $("#start").click(startGame)
    };
    //为移动端添加DOM节点,
    //然后绑定移动端的事件;

    return function() {
        bindEvent();
    }
});