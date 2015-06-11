var cfg = {
    width:14,
    height:20,
    time : 400
};
requirejs.config({
    baseUrl: 'libs',
    paths: {
        app: '../app'
    }
});

requirejs(["app/controller/mainController"], function(con) {
    con();
});