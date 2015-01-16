//(function() {
//    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
//    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
//    // requestAnimationFrame polyfill by Erik MÃ¶ller. fixes from Paul Irish and Tino Zijdel
//    // MIT license
//
//    var lastTime = 0;
//    var vendors = ['ms', 'moz', 'webkit', 'o'];
//    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
//        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
//        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
//                || window[vendors[x] + 'CancelRequestAnimationFrame'];
//    }
//
//    if (!window.requestAnimationFrame)
//        window.requestAnimationFrame = function(callback, element) {
//            var currTime = new Date().getTime();
//            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
//            var id = window.setTimeout(function() {
//                callback(currTime + timeToCall);
//            },
//                    timeToCall);
//            lastTime = currTime + timeToCall;
//            return id;
//        };
//
//    if (!window.cancelAnimationFrame)
//        window.cancelAnimationFrame = function(id) {
//            clearTimeout(id);
//        };
//}());
 function tankBum(tankX, tankY) {
    var stop = true, count = 1, tankkeymain = 0,
            coins = [],
            canvas;

    function gameLoop() {
        if (stop) {
//            window.requestAnimationFrame(gameLoop);
            // Clear the canvas
            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
            coins[0].update();
            coins[0].render();
            if (count => 40 & count < 42)
                stop = false;
        }
    }
    function sendRequestCreateTank(x, y, tankkey) {
        var data = JSON.stringify(
                {"tank": "tank",
                    "x": x,
                    "y": y,
                    "tankkey": tankkey,
                    "session": CurrentSesion});
        if (tankkeymain !== tankkey) {
            sendText(data + "RequestCreateTankCP");
            tankkeymain = tankkey;
        }
    }
    function sprite(options) {
        var that = {},
                frameIndex = 230,
                tickCount = 0,
                ticksPerFrame = options.ticksPerFrame || 0,
                numberOfFrames = options.numberOfFrames || 1, i = options.i;

        that.context = options.context;
        that.width = options.width;
        that.height = options.height;
        that.x = 0;
        that.y = 0;
        that.image = options.image;
        that.scaleRatio = 1;

        that.update = function() {

            tickCount += 1;

//            var listdh = [230, 260, 290, 325, 357, 392, 420, 453, 483, 518];
            var listdh = [230, 260, 290];//, 325, 357, 392, 420];
            if (tickCount > ticksPerFrame) {
                if (count < 50)
                    count++;
                else {
                    count = 0;
                }
                tickCount = 0;
                // If the current frame index is in range
                if (i < 10) {
                    // Go to the next frame
                    frameIndex = listdh[i];
                    i++;
                } else {
//                    frameIndex = 0;
                    i = 0;
                }
            }
        };

        that.render = function() {
            // Draw the animation
            that.context.drawImage(that.image, frameIndex, 257, 30, 30, that.x, that.y, 30, 30);
        };

        that.getFrameWidth = function() {
            return that.width / numberOfFrames;
        };

        return that;
    }
    function spawnCoin(x, y, j) {
        var coinImg;
        // Create sprite sheet
        coinImg = new Image();
        // Create sprite
        coins[j] = sprite({
            context: canvas.getContext("2d"),
            width: 1000,
            height: 100,
            image: coinImg,
            numberOfFrames: 10,
            ticksPerFrame: 4, i: 0
        });

        coins[j].x = x;
        coins[j].y = y;
        // Load sprite sheet
        coinImg.src = "images/graphics.png";
    }
    // Get canvas
    canvas = document.getElementById("coinAnimation");
    canvas.width = 750;
    canvas.height = 750;

    spawnCoin(tankX, tankY, 0);

    gameLoop();

};
