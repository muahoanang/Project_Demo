var game = new Game();
var Xcom = 0, xtank, ytank;// hai cai nay de dieu huong tank bang chuot
var Ycom = 0;
var img = new Image();
var img1 = new Image();
var data;
function random1_u(max) {
    return Math.random() * max;
}
function createmap(message) {
    img.src = "images/tiles.png";
    img1.src = "images/graphics.png";
    var lg = message.indexOf("mapMatrix");
    var jsonObj = message.substring(0, lg);
//    console.log("Ban do nhan duoc tu viec ve man hinh : " + jsonObj);
    data = JSON.parse(jsonObj);
    Startgame = true;
}

function draw_Screen() {
    if (data != null) {
        for (j = 0; j < data.length; j++) {
            context.drawImage(img, 90, 0, 15, 15, data[j].x, 300, 15, 15);// ve doan phan cach
            if (data[j].obj == 1) {
                context.drawImage(img, 0, 0, 15, 15, data[j].x, data[j].y, 15, 15);
            }
            else if (data[j].obj == 2) {
//            context.drawImage(img, 895, 15, 17, 17, data[j].x, data[j].y, 17, 17);
                context.drawImage(img, 90, 0, 15, 15, data[j].x, data[j].y, 15, 15);
            } else if (data[j].obj == 3) {
                context.drawImage(img, 30, 0, 15, 15, data[j].x, data[j].y, 15, 15);
            } else if (data[j].obj == 4) {
                context.drawImage(img, 120, 0, 15, 15, data[j].x, data[j].y, 15, 15);
            } else if (data[j].obj == 5) {
                context.drawImage(img1, 895, 70, 35, 40, data[j].x, data[j].y, 35, 40);
            }
        }
    }
}

function init() {
    if (game.init())
        game.start();
    sendUserLoginText(player + "login");// dang nhap tu dong

}

/**
 * Define an object to hold all our images for the game so images
 * are only ever created once. This type of object is known as a 
 * singleton.
 */
var imageRepository = new function() {
    // Define images
    this.background = new Image();
    this.spaceship = new Image();
    this.bullet = new Image();
    this.no = new Image();
    // Ensure all images have loaded before starting the game
    var numImages = 4;
    var numLoaded = 0;
    function imageLoaded() {
        numLoaded++;
        if (numLoaded === numImages) {
            window.init();
        }
    }
    this.background.onload = function() {
        imageLoaded();
    };
    this.spaceship.onload = function() {
        imageLoaded();
    };
    this.bullet.onload = function() {
        imageLoaded();
    };
    this.no.onload = function() {
        imageLoaded();
    };

    // Set images src
    this.background.src = "images/bg.png";
    this.spaceship.src = "images/tank.png";
    this.bullet.src = "images/missile.png";
    this.no.src = "images/graphics.png";
};
/**
 * Creates the Drawable object which will be the base class for
 * all drawable objects in the game. Sets up defualt variables
 * that all child objects will inherit, as well as the defualt
 * functions. 
 */
function Drawable() {
    this.init = function(x, y, width, height) {
        // Defualt variables
        xtank = this.x = x;
        ytank = this.y = y;
        this.width = width;
        this.height = height;
    };

    this.speed = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;

    // Define abstract function to be implemented in child objects
    this.draw = function() {
    };
    this.move = function() {
    };
}
/**
 * Creates the Background object which will become a child of
 * the Drawable object. The background is drawn on the "background"
 * canvas and creates the illusion of moving by panning the image.
 */
function Background() {
    this.speed = 1; // Redefine speed of the background for panning

    // Implement abstract function
    this.draw = function() {
        // Pan background
        this.y += this.speed;
        this.context.drawImage(imageRepository.background, this.x, this.y);

        // Draw another image at the top edge of the first image
        this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);

        // If the image scrolled off the screen, reset
        if (this.y >= this.canvasHeight)
            this.y = 0;
    };
}
// Set Background to inherit properties from Drawable
Background.prototype = new Drawable();
/**
 * Creates the Bullet object which the ship fires. The bullets are
 * drawn on the "main" canvas.
 */

var currentFire = true;// cho bat tiep vien khac
var messa = document.getElementById("mess");
var messstatus = document.getElementById("messstatus");
var Xbullte, Ybullte, ontarget = false;

function Bullet() {
    this.alive = false; // Is true if the bullet is currently in use
    this.navigation = "";
    this.spawn = function(x, y, speed, navigation) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.alive = true;
        this.navigation = navigation;
    };
    var mapkey;
    var x1 = 0;
    var y1 = 0;
    this.tankUserFire_senddataChangerMap = function(navigation) {
        var tankposition = JSON.stringify({
            "tank": "tank_user",
            "x": this.x,
            "y": this.y,
            "x1": x1,
            "y1": y1,
            "key": mapkey,
            "key1": mapkey,
            "navigation": navigation,
            "session": CurrentSesion
        });
        var tam;
        var kq = random1_u(2000);
        if (kq < 200) {
            tam += kq+600;
        } else {
            tam = kq;
        }
        if (isNaN(tam))
            tam = 900;
        for (i = 0; i < tam; i++) {

        }
        sendText(tankposition + "changerMap");
    };
    this.draw = function() {
        if (ontarget) {
            Xbullte = Ybullte = -10;
            return true;// dan trung dich
        }
        if (this.navigation === "") {
            this.navigation = "up";
            this.x += 14;
        }
        if (this.navigation === "up") {
            this.y -= this.speed;
            if (this.y <= -5) {
//                this.context.drawImage(imageRepository.no, 230, 262, 25, 25, this.x - 12, this.y, 25, 25);
                return true;
            }
            else {
                // kiem tra viec vien dan co cham vao tuong khong
                Xbullte = this.x, Ybullte = this.y;
                if (this.check_on_off_effect("up")) {
                    this.tankUserFire_senddataChangerMap("up");
                    return true;
                }
                this.context.clearRect(this.x - 1, this.y - 1, 10, 10);
                messa.innerHTML = "x= " + this.x + " y= " + this.y;
                this.context.drawImage(imageRepository.bullet, this.x, this.y);
            }

        } else if (this.navigation === "down") {
            this.y += this.speed;
            if (this.y >= 750) {
//                this.context.drawImage(imageRepository.no, 230, 262, 25, 25, this.x - 12, this.y, 25, 25);
                return true;
            }
            else {
                Xbullte = this.x, Ybullte = this.y;
                if (this.check_on_off_effect("down")) {
                    this.tankUserFire_senddataChangerMap("down");
                    return true;
                }

                this.context.clearRect(this.x - 2, this.y - 2, 10, 10);
                messa.innerHTML = "x= " + this.x + " y= " + this.y;
                this.context.drawImage(imageRepository.bullet, this.x, this.y);
            }

        } else if (this.navigation === "right") {
            this.x += this.speed;
            if (this.x >= 750) {
//                this.context.drawImage(imageRepository.no, 230, 262, 25, 25, this.x, this.y - 12, 25, 25);
                return true;
            }
            else {
                Xbullte = this.x, Ybullte = this.y;
                if (this.check_on_off_effect("right")) {
                    this.tankUserFire_senddataChangerMap("right");
                    return true;
                }

                this.context.clearRect(this.x - 4, this.y - 1, 10, 10);
                messa.innerHTML = "x= " + this.x + " y= " + this.y;
                this.context.drawImage(imageRepository.bullet, this.x, this.y);
            }
        } else if (this.navigation === "left") {
            this.x -= this.speed;
            if (this.x <= 0) {
//                this.context.drawImage(imageRepository.no, 230, 262, 25, 25, this.x, this.y - 12, 25, 25);
                return true;
            }
            else {
                Xbullte = this.x, Ybullte = this.y;
                if (this.check_on_off_effect("left")) {
                    this.tankUserFire_senddataChangerMap("left");
                    return true;
                }

                this.context.clearRect(this.x - 1, this.y - 1, 10, 10);
                messa.innerHTML = "x= " + this.x + " y= " + this.y;
                this.context.drawImage(imageRepository.bullet, this.x, this.y);
            }
        }

    };
    this.check_on_off_effect = function(nva) {
        currentFire = false;
        if (this.testbuller_effect(this.x, this.y, nva)) {
            if (this.drawtankUS_Bullet(nva)) {
//                ontarget = true;no duoc thiet dat ben tank cp khi vien dan ban chung tank dick
                return true;
            }
        }
    };
    /* Resets the bullet values
     */
    this.clear = function() {
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.alive = false;
    };

    this.testbuller_effect = function(x, y, nav) {
        var xrl;
        if (nav === "left")
            xrl = 14;
        else if (nav === "right") {
            xrl = 5;
        }
        var xr = 14;

        if (y <= 300) {

            for (i = psUP.length - 1; i >= 0; i--) {

                if ((y <= psUP[i].y + 11 && y >= psUP[i].y + 5) && (x > psUP[i].x - xr && x < psUP[i].x + xr)) {
//                    console.log(" *****************khi y<= 375 y= " + y, "mapkey :" + psUP[i].pname);
                    this.x = psUP[i].x;
                    this.y = psUP[i].y;
                    mapkey = psUP[i].pname;
                    return true;
                }
            }

            if (nav === "left" || nav === "right") {
                for (i = psUP.length - 1; i >= 0; i--) {
                    if ((this.x >= psUP[i].x - xrl && this.x <= psUP[i].x + xrl) && (this.y > psUP[i].y - xr && this.y < psUP[i].y + xr)) {
                        this.x = psUP[i].x;
                        this.y = psUP[i].y;
                        mapkey = psUP[i].pname;
                        return true;
                    }
                }
            }

        } else {
            for (i = psDown.length - 1; i > 0; i--) {
                if ((y <= psDown[i].y + 11 && y >= psDown[i].y + 5) && (x > psDown[i].x - xr && x < psDown[i].x + xr)) {
//                    console.log("--------------------------- khi y> 375 y= " + y, "mapkey :" + psDown[i].pname);
                    this.x = psDown[i].x;
                    this.y = psDown[i].y;
                    mapkey = psDown[i].pname;
                    return true;
                }
            }
            if (nav === "left" || nav === "right") {
                for (i = psDown.length - 1; i >= 0; i--) {
                    if ((this.x >= psDown[i].x - xrl && this.x <= psDown[i].x + xrl) && (this.y > psDown[i].y - xr && this.y < psDown[i].y + xr)) {
                        this.x = psDown[i].x;
                        this.y = psDown[i].y;
                        mapkey = psDown[i].pname;
                        return true;
                    }
                }
            }
        }

        return false;
    };

    this.drawtankUS_Bullet = function(CPbulletnavigation) {
//        this.context.drawImage(imageRepository.no, 230, 265, 20, 20, Xbullte - 10, Ybullte - 20, 20, 20); // anh no
        this.context.clearRect(Xbullte, Ybullte, 12, 12); // khoang thung cua buc tuong
//        console.log(" this.drawtankUS_Bullet vi tri dan den: " + "X= " + Xbullte, +"Y= " + Ybullte);
        return true;

    }
    ;
}

Bullet.prototype = new Drawable();
function Pool(maxSize) {
    var size = maxSize; // Max bullets allowed in the pool
    var pool = [];

    /*
     * Populates the pool array with Bullet objects
     */
    this.init = function() {
        for (var i = 0; i < size; i++) {
            // Initalize the bullet object
            var bullet = new Bullet();
            bullet.init(0, 0, imageRepository.bullet.width,
                    imageRepository.bullet.height);
            pool[i] = bullet;
        }
    };

    /*
     * Grabs the last item in the list and initializes it and
     * pushes it to the front of the array.
     */
    this.get = function(x, y, speed, navigation) {
        if (!pool[size - 1].alive) {
            pool[size - 1].spawn(x, y, speed, navigation);
            pool.unshift(pool.pop());
        }
    };

    /*
     * Used for the ship to be able to get two bullets at once. If
     * only the get() function is used twice, the ship is able to
     * fire and only have 1 bullet spawn instead of 2.
     */
    this.getTwo = function(x1, y1, speed1, x2, y2, speed2) {
        if (!pool[size - 1].alive &&
                !pool[size - 2].alive) {
            this.get(x1, y1, speed1);
            this.get(x2, y2, speed2);
        }
    };

    /*
     * Draws any in use Bullets. If a bullet goes off the screen,
     * clears it and pushes it to the front of the array.
     */
    this.animate = function() {
        for (var i = 0; i < size; i++) {
            // Only draw until we find a bullet that is not alive
            if (pool[i].alive) {
                if (pool[i].draw()) {
                    pool[i].clear();
                    pool.push((pool.splice(i, 1))[0]);
//                    console.log("vien dan da duoc thu hoi");
                    var tam;
                    var kq = random1_u(2000);

                    if (kq < 200) {
                        tam += kq;
                    } else {
                        tam = kq;
                    }
                    if (isNaN(tam))
                        tam = 800;
                    for (i = 0; i < tam; i++) {

                    }
                    currentFire = true;// cho bat tiep vien khac
                    ontarget = false;
                }
            }
            else
                break;
        }
    };
}
/**
 * Create the Ship object that the player controls. The ship is
 * drawn on the "ship" canvas and uses dirty rectangles to move
 * around the screen.
 */
var destX = 0;
var destY = 0;


function Ship() {
    this.speed = 1;
    this.bulletPool = new Pool(30);
    this.bulletPool.init();
    this.navigation = "";
    var fireRate = 15;
    var counter = 0;
    var nvaleft = nvaright = nvaup = nvadown = false;
    this.draw = function() {
        this.context.drawImage(imageRepository.spaceship, destX, destY, 30, 30, this.x, this.y, 30, 30);
    };
    this.move = function() {
        counter++;
        // Determine if the action is move action
        if (KEY_STATUS.left || KEY_STATUS.right ||
                KEY_STATUS.down || KEY_STATUS.up) {

            if (KEY_STATUS.left) {
                destX = 90;
                this.draw();
                this.context.clearRect(this.x, this.y, this.width, this.height);
                this.x -= this.speed;
                if (this.y < 300) {
                    this.testmover(this.x, this.y, psUP, "left");
                } else {
                    this.testmover(this.x, this.y, psDown, "left");
                }
                this.changernva("left");
                if (this.x <= 0) // Keep player within the screen
                    this.x = 0;
            } else if (KEY_STATUS.right) {
                destX = 30;
                this.draw();
                this.context.clearRect(this.x - 5, this.y, this.width, this.height);
                this.x += this.speed;
                if (this.y < 300) {
                    this.testmover(this.x, this.y, psUP, "right");
                } else {
                    this.testmover(this.x, this.y, psDown, "right");
                }
                this.changernva("right");
                if (this.x >= this.canvasWidth - 30)
                    this.x = this.canvasWidth - 30;
            } else if (KEY_STATUS.up) {
                destX = 0;
                destY = 0;
                this.draw();
                this.context.clearRect(this.x, this.y, this.width, this.height);
                this.y -= this.speed;
                if (this.y < 300) {
                    this.testmover(this.x, this.y, psUP, "up");
                } else {
                    this.testmover(this.x, this.y, psDown, "up");
                }
                this.changernva("up");
                if (this.y <= 0)
                    this.y = 0;
            } else if (KEY_STATUS.down) {
                destX = 60;
                this.draw();
                this.context.clearRect(this.x, this.y - 3, this.width, this.height);
                this.y += this.speed;
                if (this.y < 300) {
                    this.testmover(this.x, this.y, psUP, "down");
                } else {
                    this.testmover(this.x, this.y, psDown, "down");
                }
                this.changernva("down");
                if (this.y >= this.canvasHeight - 30)
                    this.y = this.canvasHeight - 30;
            }
            this.draw();
        }
        if (KEY_STATUS.space && counter >= fireRate) {
            if (currentFire) {
                ontarget = false;
                this.fire();
                counter = 0;
            }
        }
        xtank = this.x;
        ytank = this.y;
    };
    this.fire = function() {
        this.findnva();
        if (this.navigation === "up" || this.navigation === "down") {
            this.bulletPool.get(this.x + 14, this.y, 2, this.navigation);
        } else {
            this.bulletPool.get(this.x, this.y + 14, 2, this.navigation);
        }
    };
    this.findnva = function() {
        if (nvaleft) {
            this.navigation = "left";
            return true;
        }
        if (nvadown) {
            this.navigation = "down";
            return true;
        }
        if (nvaright) {
            this.navigation = "right";
            return true;
        }
        if (nvaup) {
            this.navigation = "up";
            return true;
        }
    };
    this.changernva = function(nva) {
        switch (nva) {
            case "left":
                {
                    nvaleft = true;
                    nvaright = nvaup = nvadown = false;
                }
                break;
            case "right":
                {
                    nvaright = true;
                    nvaleft = nvaup = nvadown = false;
                }
                break;
            case "up":
                {
                    nvaup = true;
                    nvaright = nvaleft = nvadown = false;
                }
                break;
            case "down":
                {
                    nvadown = true;
                    nvaleft = nvaup = nvaright = false;
                }
                break;
        }
    };
    this.testmover = function(x, y, listunmove, nav) {
        var xtest = "";
        var ytest1 = "";
        var ytest2 = "";
        if (nav === "left") {
            xtest = 16;
        } else if (nav === "right") {
            xtest = -30;
        }
        if (nav === "up") {
            ytest1 = 17;
            ytest2 = 15;
        } else if (nav === "down") {
            ytest1 = -15;
            ytest2 = -17;
        }
        if (nav === "left" || nav === "right") {
            for (i = 0; i < listunmove.length; i++) {
                if (x + 3 === listunmove[i].x + xtest && (y > listunmove[i].y - 25 && y < listunmove[i].y + 15)) {
                    if (nav === "left") {
                        this.x += this.speed;
                        this.draw();
                    } else {
                        this.x -= this.speed;
                        this.draw();
                    }

                }
            }
        }

        if (nav === "up" || nav === "down") {

            for (i = 0; i < listunmove.length; i++) {//down
                if ((y <= listunmove[i].y + ytest1 && y >= listunmove[i].y + ytest2) && (x > listunmove[i].x - 18 && x < listunmove[i].x + 16)) {
                    if (nav === "up") {
                        this.y += this.speed;
                        this.draw();
                    } else {
                        this.y -= this.speed;
                        this.draw();
                    }
                }
            }
        }
    };
}
Ship.prototype = new Drawable();
function  tankMove(destX, destY, navigation, CurrentSesion) { //hien tai hong dung lenh nay lua
    var tankposition = JSON.stringify({
        "tank": "tank",
        "x": destX,
        "y": destY,
        "navigation": navigation,
        "session": CurrentSesion

    });
    sendText(tankposition + "tankMove");
}
/*
 * 
 * sendata position Bullte destX, destY to server 
 */
function  tankFire(destX, destY, navigation, CurrentSesion) {
    var tankposition = JSON.stringify({
        "tank": "tank",
        "x": destX,
        "y": destY,
        "navigation": navigation,
        "session": CurrentSesion

    });
    sendText(tankposition + "tankFire");
}

/**
 * Creates the Game object which will hold all objects and data for
 * the game.
 */
function Game() {
    /*
     * Gets canvas information and context and sets up all game
     * objects. 
     * Returns true if the canvas is supported and false if it
     * is not. This is to stop the animation script from constantly
     * running on browsers that do not support the canvas.
     */
    this.init = function() {
        // Get the canvas elements
        this.bgCanvas = document.getElementById('background');
        this.shipCanvas = document.getElementById('ship');
        this.mainCanvas = document.getElementById('main');
        // Test to see if canvas is supported. Only need to
        // check one canvas
        if (this.bgCanvas.getContext) {
            this.bgContext = this.bgCanvas.getContext('2d');
            this.shipContext = this.shipCanvas.getContext('2d');
            this.mainContext = this.mainCanvas.getContext('2d');

            // Initialize objects to contain their context and canvas
            // information
            Background.prototype.context = this.bgContext;
            Background.prototype.canvasWidth = this.bgCanvas.width;
            Background.prototype.canvasHeight = this.bgCanvas.height;

            Ship.prototype.context = this.shipContext;
            Ship.prototype.canvasWidth = this.shipCanvas.width;
            Ship.prototype.canvasHeight = this.shipCanvas.height;

            Bullet.prototype.context = this.mainContext;
            Bullet.prototype.canvasWidth = this.mainCanvas.width;
            Bullet.prototype.canvasHeight = this.mainCanvas.height;
            // Initialize the background object
            this.background = new Background();
            this.background.init(0, 0); // Set draw point to 0,0

            // Initialize the ship object
            this.ship = new Ship();
            // Set the ship to start near the bottom middle of the canvas
            var shipStartX = this.shipCanvas.width / 2 - imageRepository.spaceship.width;
            var shipStartY = this.shipCanvas.height / 4 * 3 + imageRepository.spaceship.height * 2;
            this.ship.init(shipStartX, shipStartY, imageRepository.spaceship.width,
                    imageRepository.spaceship.height);
            return true;
        } else {
            return false;
        }
    };

    // Start the animation loop
    this.start = function() {
        this.ship.draw();
        animate();
    };
}
/**
 * The animation loop. Calls the requestAnimationFrame shim to
 * optimize the game loop and draws all game objects. This
 * function must be a gobal function and cannot be within an
 * object.
 */
var drawcount = 0;
function animate() {
    requestAnimFrame(animate);
    game.ship.move();
    game.ship.bulletPool.animate();
    
    
}
// The keycodes that will be mapped when a user presses a button.
// Original code by Doug McInnes
KEY_CODES = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

// Creates the array to hold the KEY_CODES and sets all their values
// to false. Checking true/flase is the quickest way to check status
// of a key press and which one was pressed when determining
// when to move and which direction.
KEY_STATUS = {};
for (code in KEY_CODES) {
    KEY_STATUS[KEY_CODES[code]] = false;
}
/**
 * Sets up the document to listen to onkeydown events (fired when
 * any key on the keyboard is pressed down). When a key is pressed,
 * it sets the appropriate direction to true to let us know which
 * key it was.
 */
document.onkeydown = function(e) {
    // Firefox and opera use charCode instead of keyCode to
    // return which key was pressed.
    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = true;
    }
};
/**
 * Sets up the document to listen to ownkeyup events (fired when
 * any key on the keyboard is released). When a key is released,
 * it sets teh appropriate direction to false to let us know which
 * key it was.
 */
document.onkeyup = function(e) {
    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = false;
    }
};

var tankshootcv = document.getElementById("fire");
var tankcanvas = document.getElementById("getmouse");
var mousedown = false, mx, my;

tankcanvas.addEventListener('mousemove', function(e) {
    mx = e.pageX - tankcanvas.offsetLeft;
    my = e.pageY - tankcanvas.offsetTop;
});

// toggle mousedown state and prevent canvas from being selected
var nvamouse;
tankshootcv.addEventListener('mousedown', function(e) {
    e.preventDefault();
//    console.log("mousePos x= " + mx + " ,Y= " + my, xtank, ytank);
    KEY_STATUS[KEY_CODES['32']] = true;
});
tankshootcv.addEventListener('mouseup', function(e) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES['32']] = true;// doan nay de tu dong day
});


tankcanvas.addEventListener('mousedown', function(e) {
    e.preventDefault();
//    console.log("tankshootcv mousePos x= " + mx + " ,Y= " + my, xtank, ytank);
    var hieux = mx - xtank;
    var hieuy = my - ytank;
    if ((hieux > 0) && (hieuy > 0) && (hieux > hieuy)) {

        KEY_STATUS[KEY_CODES['39']] = true;
        nvamouse = "right";
    } else if ((hieux < 0) && (hieuy > 0)) {
        KEY_STATUS[KEY_CODES['37']] = true;
        nvamouse = "left";
    } else if ((hieux > 0) && (hieuy > 0) && (hieuy > hieux)) {
        KEY_STATUS[KEY_CODES['40']] = true;
        nvamouse = "down";
    } else if ((hieuy < 0) && (hieux > 0)) {
        KEY_STATUS[KEY_CODES['38']] = true;
        nvamouse = "up";
    }

    mousedown = true;
});

tankcanvas.addEventListener('mouseup', function(e) {
    e.preventDefault();
    switch (nvamouse) {
        case "right":
            {
                KEY_STATUS[KEY_CODES['39']] = false;
            }
            break;
        case "left":
            {
                KEY_STATUS[KEY_CODES['37']] = false;
            }
            break;
        case "up":
            {
                KEY_STATUS[KEY_CODES['38']] = false;
            }
            break;
        case "down":
            {
                KEY_STATUS[KEY_CODES['40']] = false;
            }
            break;
    }
    mousedown = false;
});

window.requestAnimFrame = (function() {
    return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();