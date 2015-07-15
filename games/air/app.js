requirejs.config({
    baseUrl: 'libs',
    paths: {
        app: '../app'
    }
});

requirejs(["app/main"],function() {
    //alert(1)
});