// Copyright 2013 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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

//window.requestAnimFrame = (function() {
//    return  window.requestAnimationFrame ||
//            window.webkitRequestAnimationFrame ||
//            window.mozRequestAnimationFrame ||
//            window.oRequestAnimationFrame ||
//            window.msRequestAnimationFrame ||
//            function(/* function */ callback, /* DOMElement */ element) {
//                window.setTimeout(callback, 1000 / 60);
//            };
//})();
(function() {
    var stop = true, count = 1, tankkeymain = 0,
            coins = [],
            canvas;

    function gameLoop() {
        var i;
        if (stop) {
            window.requestAnimationFrame(gameLoop);
            // Clear the canvas
            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
            for (i = 0; i < coins.length; i += 1) {
                coins[i].update();
                coins[i].render();
            }
            if (count > 18 && count < 20) {
                canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
                sendRequestCreateTank("tank10", 0, 0, 10);// day la xe mau do
//                stop = false;// xe xanh vang

            } else
            if (count > 25 && count < 27) {
                canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
                sendRequestCreateTank("tank1", 0, 0, 1);// tank do
//                stop = false;

            } else
            if (count > 28 && count < 30) {
                canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
                sendRequestCreateTank("tank2", 300, 0, 2);// xe mau xanh dam
//                stop=false;
            } else
            if (count > 35 && count < 37) {
                sendRequestCreateTank("tank3", 570, 0, 3);// xe au cam
                canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
                stop = false;
            }
        }
    }
    function sendRequestCreateTank(tankname, x, y, tankkey) {
        var data = JSON.stringify(
                {"tank": tankname,
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
            var listdh = [230, 260, 290, 325, 357, 392, 420, 453, 483, 518];
            if (tickCount > ticksPerFrame) {
                if (count < 40)
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
            that.context.drawImage(that.image, frameIndex, 320, 30, 30, that.x, that.y, 30, 30);
        };

        that.getFrameWidth = function() {
            return that.width / numberOfFrames;
        };

        return that;
    }
    function spawnCoin(x, j) {
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
        coins[j].y = 0;
        // Load sprite sheet
        coinImg.src = "images/graphics.png";
    }
    // Get canvas
    canvas = document.getElementById("coinAnimation");
    canvas.width = 600;
    canvas.height = 50;

    spawnCoin(0, 0);
    spawnCoin(300, 1);
    spawnCoin(570, 2);
    gameLoop();

}());


