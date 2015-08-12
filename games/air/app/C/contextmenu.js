define(function() {

    if(typeof document.ontouchstart==="object") {
        document.addEventListener("touchstart", function (ev) {
            ev.preventDefault&&ev.preventDefault();
        },false);
        document.addEventListener("touchmove", function (ev) {
            ev.preventDefault&&ev.preventDefault();
        },false);
    }else{
        document.addEventListener("contextmenu", function(ev) {
            ev.preventDefault&&ev.preventDefault();
            return false;
        },false);
    }
})