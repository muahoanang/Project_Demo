window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

//function screenpart() {
//    context.beginPath();
//    context.strokeStyle = "white";
//    for (var i = 30; i <= 750; ) {
//        context.moveTo(i, 0);
//        context.lineTo(i, 800);
//        
//        context.moveTo(0,i);
//        context.lineTo(800,i);
//        context.stroke();
//        i += 30;
//    }
//
//}
//screenpart();
var currentkey;




//function loop() {
//    requestAnimFrame(loop);
//  
//
//    load();
//}

//window.onload = loop();

//canvas.addEventListener( "keydown", doKeyDown, true);
//
//function doKeyDown(e) {
//    var key = e.keyCode;
//    //We will add another clause to prevent reverse gear
//    if (key === "37" && d !== "right"){
//       destX +=10;
//       alert( e.keyCode );
//        load();
//        //d = "left";
//    }
//    else if (key === "38" && d !== "down"){
//        
//        d = "up";
//    }
//    
//    else if (key === "39" && d !== "left"){
//        d = "right";
//         destX -=10;
//        load();
//    }
//    else if (key === "40" && d !== "up"){
//        d = "down";}
//    //The snake is now keyboard controllable
//};