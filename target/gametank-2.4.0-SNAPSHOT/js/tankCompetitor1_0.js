//
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
function initTankcp_dt() {
    if (tankcp0.init())
        tankcp0.start();
}
var cvtankCP0 = document.getElementById("tankdich");
var context_cp0 = cvtankCP0.getContext('2d');
var tankcp0 = new GameTankCP0();
var showlsus = document.getElementById("mess");
var leftmove = false, rightmove = false, upmove = false, downmove = false;
var sangphai = false, sangtrai = false, len = false, xuong = false;
var backOldpoint = true, StartgameTankcp1_0 = false;
var xen, yend;
var imgk = 21;
var dulieu;
var Ymax = 0, Xmax = 0;
var le = 0;
var x, y;
var ystop = 0, xstop = 0, xend = 0, yend = 0;
var tankCompetitorFrie = true;
var keymap = 0, keymap1 = 0, tankcp_navigation1_0;
function createCompetitor(message) {
    var lg = "";
    var jsonObj = "";
    lg = message.indexOf("Competitor_down");
    if (lg > 0) {
        jsonObj = message.substring(0, lg);
    } else
    {
        lg = message.indexOf("Competitor_right");
        if (lg > 0) {
            jsonObj = message.substring(0, lg);
        } else {
            lg = message.indexOf("Competitor_left");
            if (lg > 0) {
                jsonObj = message.substring(0, lg);
            } else {
                lg = message.indexOf("Competitor_up");
                if (lg > 0) {
                    jsonObj = message.substring(0, lg);
                } else {
                    sendRequestCreateTank("tank", 0, 0, 0);
                    return false;
                }
            }
        }
    }
    dulieu = JSON.parse(jsonObj);
    Xcom = x = dulieu[0].x; //vi tri phai ve
    Ycom = y = dulieu[0].y;
    xend = dulieu[0].xend;
    yend = dulieu[0].yend;
    Compenva = dulieu[0].navigation;
    StartgameTankcp1_0 = true;
}

function drawCompetitor() {

    if (leftmove && MoveXleft()) {
        tankStop_senddatatoserver("left", CurrentSesion, "tank", x, y, xend, yend, xstop, ystop);
        TankCpdtStop();
        leftmove = false;
    }
    if (rightmove && MoveXRight()) {
        tankStop_senddatatoserver("right", CurrentSesion, "tank", x, y, xend, yend, xstop, ystop);
        TankCpdtStop();
        rightmove = false;
    }
    if (upmove && MoveUp()) {
        tankStop_senddatatoserver("up", CurrentSesion, "tank", x, y, xend, yend, xstop, ystop);
        TankCpdtStop();
        upmove = false;
    }

    if (downmove && Move_Down()) {
        tankStop_senddatatoserver("down", CurrentSesion, "tank", x, y, xend, yend, xstop, ystop);
        TankCpdtStop();
        downmove = false;
    }

}

function  tankFire_senddataChangerMap(keymap, navigation, CurrentSesion, xstop, ystop, tank) {
    // cho nayse phai sua nha
    var x1 = 0;
    var y1 = 0;
    switch (navigation) {
        case "down":
            x1 = (xstop + 15);
            y1 = ystop + 30;
            break;
        case "right":
            x1 = xstop + 30;
            y1 = ystop + 15;
            break;
        case "left":
            x1 = xstop - 15;
            y1 = ystop + 15;
            break;
        case "up":
            x1 = (xstop + 15);
            y1 = ystop;
            break;
    }

    var tankposition = JSON.stringify({
        "tank": tank,
        "x": xstop,
        "y": ystop,
        "key": keymap,
        "x1": x1,
        "y1": y1,
        "key1": keymap1,
        "navigation": navigation,
        "session": CurrentSesion

    });
    sendText(tankposition + "bombardment");
    tankCompetitorFrie = false;
    bun = 0;
}

function  tankStop_senddatatoserver(navigation, CurrentSesion, tank, x, y, xend, yend, xstop, ystop) {
    var tankposition = JSON.stringify({
        "tank": tank,
        "x": x,
        "y": y,
        "xend": xend,
        "yend": yend,
        "xstop": xstop,
        "ystop": ystop,
        "navigation": navigation,
        "session": CurrentSesion

    });
//    console.log(tankposition + "tankStop");
    var tam;
    var kq = random1_0(2000);
    if (kq < 200) {
        tam += kq;
    } else if (kq > 1000) {
        tam -= 250;
    } else {
        tam = kq;
    }
       if(isNaN(tam))tam=800;
    for (i = 0; i < tam; i++) {

    }
    sendText(tankposition + "tankStop");

}
function random1_0(max) {
    return Math.random() * max;
}
/*
 * chuyen huong sang trai
 */
var unmove;
function moveleft(mess, tank) {
    var lg = mess.indexOf("mapRowleft");
    var da = "";
    var keymaptam = 0;
    var listP = "";
    if (lg > 0) {
        da = mess.substring(0, lg);
        listP = JSON.parse(da);
        var l = [];
        var j = 0;
        for (i = 0; i < listP.length; i++) {
            if (listP[i].obj === 1) {
                l[j] = listP[i].x;
                j++;
            }
        }
        if (l.length > 0 && j > 0) {
            sortSelect(l); // sap xep
// tim dich den    cho xe
            var max = 0;
            for (i = l.length - 1; i > 0; i--) {
                if (Xcom1 > l[i]) {
                    max = l[i] + 16;
                    break;
                }
            }
            for (i = 0; i < listP.length; i++) {
                if (listP[i].obj === 1 && (listP[i].x + 2 >= Xmax - 30 && listP[i].x - 2 <= Xmax - 30)) {
                    keymaptam = listP[i].Point;
                    break;
                }
            }
            Xmax = max;
            keymap = keymaptam;
            leftmove = true;
            sangphai = true;
        } else {
            Xmax = 0;
            leftmove = true;
            sangtrai = true;
        }
        tankcp_navigation1_0 = "left";

    } else {
        TankCpdtStop();
        move_one_direction_tank1_0("left");
        tankStop_senddatatoserver("random", CurrentSesion, "tank", x, y, xend, yend, xstop, ystop);
    }
}

function MoveXleft() {
    if (sangtrai) {
        if (Xmax <= Xcom) {
            Xcom--;
            context_cp0.clearRect(Xcom + 5, Ycom, 30, 30);
            context_cp0.drawImage(imageRepository.no, 356, 0, 30, 30, Xcom, Ycom, 30, 30);
        } else {
            xstop = Xcom;
            ystop = Ycom;
            sangtrai = false;
            return true;
        }
    } else {
        return true;
    }
}

//sap xep theo phuong phap chon

function sortSelect(l) {
    var i, j, min, minat;
    for (i = 0; i < (l.length - 1); i++)
    {
        minat = i;
        min = l[i];
        for (j = i + 1; j < (l.length); j++) //select the min of the rest of array
        {
            if (min > l[j])   //ascending order for descending reverse
            {
                minat = j; //the position of the min element 
                min = l[j];
            }
        }
        var temp = l[i];
        l[i] = l[minat]; //swap 
        l[minat] = temp;
    }
}
/*
 * chuyen huong sang phai
 * phai gop vao de tich kiem ma dang co su nham lan o co sang trai sang phai
 */
function  moveright(mess) {
    var lg = mess.indexOf("mapRowRight");
    if (lg > 0) {
        var da = mess.substring(0, lg);
        var listP = JSON.parse(da);
        var j = 0;
        var l = [];
        for (i = 0; i < listP.length; i++) {
            if (listP[i].obj === 1) {
                l[j] = listP[i].x;
                j++;
            }
        }
        if (l.length > 0 && j > 0) {
            sortSelect(l);
            for (i = 0; i < l.length; i++) {
                if (l[i] > Xcom) {
                    if (l[i] < 600)
                        Xmax = l[i] - 31;
                    else {
                        Xmax = 570;
                    }
                    break;
                }
            }
            for (i = 0; i < listP.length; i++) {
                if (listP[i].obj === 1 && (listP[i].x + 2 >= Xmax + 30 && listP[i].x - 2 <= Xmax + 30)) {
                    keymap = listP[i].Point;
                    break;
                }
            }
        } else {
            Xmax = 570;
        }
        rightmove = true;
        sangphai = true;
        tankcp_navigation1_0 = "right";
    } else {
        TankCpdtStop();
        move_one_direction_tank1_0("right");
        tankStop_senddatatoserver("random", CurrentSesion, "tank", x, y, xend, yend, xstop, ystop);
    }

}
function MoveXRight() {
    if (sangphai) {
        if (Xcom < Xmax) {
            Xcom++;
            context_cp0.clearRect(Xcom - 5, Ycom, 30, 30);
            context_cp0.drawImage(imageRepository.no, 290, 0, 30, 30, Xcom, Ycom, 30, 30);
        } else {
            xstop = Xcom;
            ystop = Ycom;
            sangphai = false;
            return true;
        }
    } else {
        return true;
    }
}
// cho xe tan di len

function updown(mess) {
    var lg = mess.indexOf("mapUPDOWN");
    if (lg > 0) {
        var da = mess.substring(0, lg);
        var listP = JSON.parse(da);
        var j = 0;
        var l = [];
        for (i = 0; i < listP.length; i++) {
            if (listP[i].obj === 1) {
                l[j] = listP[i].y;
                j++;
            }
        }
        if (l.length > 0 && j > 0) {
            sortSelect(l);
            var countpoint = 0;
            for (i = l.length - 1; i >= 0; i--) {
                if (l[i] > Ycom) {
                    countpoint++;
                    continue;
                } else {
                    Ymax = l[i] + 15;
                    break;
                }
            }
            if (countpoint === l.length)
                Ymax = 0;
        }
//tim key map
        for (i = 0; i < listP.length; i++) {
            if (listP[i].obj === 1 && listP[i].y === Ymax - 15) {
                keymap = listP[i].Point;
                break;
            }
        }
        upmove = true;
        len = true;
        tankcp_navigation1_0 = "up";
    } else {
        TankCpdtStop();
        move_one_direction_tank1_0("up");
        tankStop_senddatatoserver("random", CurrentSesion, "tank", x, y, xend, yend, xstop, ystop);
    }
}

function MoveUp() {
    if (len) {
        if (Ycom < Ymax || Ycom <= 0) {
            len = false;
            xstop = Xcom;
            ystop = Ycom;
            return true;
        }
        Ycom -= 1;
        if (Ycom >= Ymax) {
            context_cp0.clearRect(Xcom, Ycom, 31, 31);
            context_cp0.drawImage(imageRepository.no, 258, 0, 30, 30, Xcom, Ycom, 30, 30);
        }
        document.getElementById("mess").innerHTML = "Ycom " + Ycom + " Xcom " + Xcom;
    } else {
        return true;
    }
}

// cho xe tang di xuong
function movedown(mess) {
    var lg = mess.indexOf("mapDOWN");
    if (lg > 0) {
        var da = mess.substring(0, lg);
        var listP = JSON.parse(da);
//        console.log(" mang nhan duoc: "+mess);
        var l = [];
        var j = 0;
        for (i = 0; i < listP.length; i++) {
            if (listP[i].obj === 1) {
                l[j] = listP[i].y;
                j++;
            }
        }
        sortSelect(l);
        var min = 0;
        for (i = 0; i < l.length; i++) {
            if (l[i] > Ycom) {
                min = l[i];
                break;
            }
        }
        if (min === 0) {
            min = 600;
        }
        //tim key map
        for (i = 0; i < listP.length; i++) {
            if (listP[i].obj === 1 && listP[i].y === min) {
                keymap = listP[i].Point;
                break;
            }
        }
        Ymax = min - 30;
        downmove = true;
        xuong = true;
        tankcp_navigation1_0 = "down";
//        console.log("diem ma tank se den la: "+Ymax);
    } else {
        TankCpdtStop();
        move_one_direction_tank1_0("down");
        tankStop_senddatatoserver("random", CurrentSesion, "tank", x, y, xend, yend, xstop, ystop);
    }
}
;
function Move_Down() {
    if (xuong) {
//             console.log("diem ma tank se den la: "+Ymax+" Ycom: "+Ycom);
        if (Ycom > Ymax || Ycom >= context_cp0.hieght - 30) {
            xuong = false;
            xstop = Xcom;
            ystop = Ycom;
            return true;
        }
        Ycom += 1;
        if (Ycom <= Ymax) {
            context_cp0.clearRect(Xcom, Ycom - 6, 31, 31);
            context_cp0.drawImage(imageRepository.no, 322, 0, 30, 30, Xcom, Ycom, 30, 30);
        }
        document.getElementById("mess").innerHTML = "Ycom " + Ycom + " Xcom " + Xcom;
    } else {
        return true;
    }
}
//
function move_one_direction_tank1_0(nva) {
    switch (nva) {
        case "right":
            leftmove = false, rightmove = true, sangphai = true, upmove = false, downmove = false;
            break;
        case "left":
            leftmove1 = true, sangtrai = true, rightmove = false, upmove = false, downmove = false;
            break;
        case "up":
            leftmove1 = false, rightmove = false, upmove = true, len = true, downmove = false;
            break;
        case "down":
            leftmove1 = false, rightmove = false, upmove = false, downmove = true, xuong = true;
            break;
    }
}
function TankCpdtStop() {
    leftmove = false, rightmove = false, downmove = false, upmove = false, len = false, xuong = false,
            sangphai = false, sangtrai = false;
}
var bun = 0;
function drawCompetitorBullet(xfire, CPbulletnavigation) {
    switch (CPbulletnavigation) {
        case "down":
            {
                bun += 1;
                this.context_cp0.drawImage(imageRepository.no, 230, 262, 25, 25, xstop + 5, ystop + 25, 25, 25); // anh no
                if (bun > 20) {
                    context_cp0.clearRect(xfire, ystop + 30, 30, 15); // khoang thung cua buc tuong
                    //ve lai xe tank
                    context_cp0.clearRect(Xcom, Ycom, 30, 30);
                    context_cp0.drawImage(imageRepository.no, 63, 0, 30, 30, Xcom, Ycom - 5, 30, 30);
                    return true;
                }

            }
            break;
        case "right":
            bun += 1;
            //ve lai xe tank
            context_cp0.clearRect(Xcom, Ycom, 30, 30);
            context_cp0.drawImage(imageRepository.no, 33, 0, 30, 30, Xcom - 5, Ycom, 30, 30);
            this.context_cp0.drawImage(imageRepository.no, 230, 262, 25, 25, xstop + 25, ystop + 5, 25, 25); // anh no

            if (bun > 20) {
                context_cp0.clearRect(xfire + 28, ystop - 1, 17, 31); // khoang thung cua buc tuong
                return true;
            }
            break;
        case "left":
            bun += 1; //ve lai xe tank
            context_cp0.clearRect(Xcom, Ycom, 30, 30);
            context_cp0.drawImage(imageRepository.no, 100, 0, 30, 30, Xcom + 5, Ycom, 30, 30);
            //            ve anh no bum
            this.context_cp0.drawImage(imageRepository.no, 230, 262, 20, 20, xstop - 20, ystop + 5, 20, 20); // anh no
            if (bun > 30) {
                context_cp0.clearRect(xfire - 15, ystop - 2, 15, 32); // khoang thung cua buc tuong
                return true;
            }

            break;
        case "up":
            bun += 1; //ve lai xe tank
            context_cp0.clearRect(Xcom, Ycom + 10, 30, 30);
            context_cp0.drawImage(imageRepository.no, 0, 0, 30, 30, Xcom, Ycom, 30, 30);
            //            ve anh no bum
            this.context_cp0.drawImage(imageRepository.no, 230, 262, 20, 20, xstop + 5, ystop - 20, 20, 20); // anh no
            if (bun > 30) {
                context_cp0.clearRect(xfire, ystop - 14, 30, 15); // khoang thung cua buc tuong
                return true;
            }
            break;
    }


}
;
// phai cho tank tu dong ban duoc dan  va ghi nhan thay doi map
function DrawableTankcp() {
    this.init = function(x, y, width, height) {
        // Defualt variables
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };
    this.speed = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.draw = function() {
    };
    this.move = function() {
    };
}

/**
 * Creates the Bullet object which the ship fires. The bullets are
 * drawn on the "main" canvas.
 */
var currentFireTcp0 = true;
var messa = document.getElementById("mess");
var messstatus = document.getElementById("messstatus");
var XbullteTcp = 0, YbullteTcp = 0, ontargetTcp = false, count_die0 = 0;

function BulletTankcp() {
    this.alive = false;
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
            "tank": "tank",
            "x": this.x,
            "y": this.y,
            "x1": x1,
            "y1": y1,
            "key": mapkey,
            "key1": mapkey,
            "navigation": navigation,
            "session": CurrentSesion
        });
//        console.log("tankposition : " + tankposition);
        sendText(tankposition + "Tank0CPUpdateMap");
    };
    this.draw = function() {
        if (ontargetTcp) {
            XbullteTcp = YbullteTcp = -10;
            return true;// dan trung dich
        }
        if (this.navigation === "") {
            this.navigation = "up";
            this.x += 14;
        }
        if (this.navigation === "up") {
            this.y -= this.speed;
            if (this.y <= -20) {
                return true;
            }
            else {
                XbullteTcp = this.x, YbullteTcp = this.y;
                if (this.check_on_off_effect("up")) {
                    this.tankUserFire_senddataChangerMap("up");
//                    StartgameTankcp1_0 = false;
                    return true;

                }

                this.context_cp1.clearRect(this.x, this.y, 10, 15);
                messa.innerHTML = "x= " + this.x + " y= " + this.y;
                this.context_cp1.drawImage(imageRepository.bullet, this.x, this.y);
            }

        } else if (this.navigation === "down") {
            this.y += this.speed;
            if (this.y >= 750) {
//                this.context_cp1.drawImage(imageRepository.no, 230, 262, 25, 25, this.x - 12, this.y, 25, 25);
                return true;
            }
            else {
                XbullteTcp = this.x, YbullteTcp = this.y;
                if (this.check_on_off_effect("down")) {
                    this.tankUserFire_senddataChangerMap("down");
                    return true;
                }

                this.context_cp1.clearRect(this.x, this.y - 8, 10, 15);
                messa.innerHTML = "x= " + this.x + " y= " + this.y;
                this.context_cp1.drawImage(imageRepository.bullet, this.x, this.y);
            }

        } else if (this.navigation === "right") {
            this.x += this.speed;
            if (this.x >= 750) {
//                this.context_cp1.drawImage(imageRepository.no, 230, 262, 25, 25, this.x, this.y - 12, 25, 25);
                return true;
            }
            else {
                XbullteTcp = this.x, YbullteTcp = this.y;
                if (this.check_on_off_effect("right")) {
                    this.tankUserFire_senddataChangerMap("right");
                    return true;
                }

                this.context_cp1.clearRect(this.x - 8, this.y - 1, 10, 15);
                messa.innerHTML = "x= " + this.x + " y= " + this.y;
                this.context_cp1.drawImage(imageRepository.bullet, this.x, this.y);
            }
        } else if (this.navigation === "left") {
            this.x -= this.speed;
            if (this.x <= -20) {
//                this.context_cp1.drawImage(imageRepository.no, 230, 262, 25, 25, this.x, this.y - 12, 25, 25);
                return true;
            }
            else {
                XbullteTcp = this.x, YbullteTcp = this.y;
                if (this.check_on_off_effect("left")) {
                    this.tankUserFire_senddataChangerMap("left");
                    return true;
                }

                this.context_cp1.clearRect(this.x + 8, this.y, 10, 15);
                messa.innerHTML = "x= " + this.x + " y= " + this.y;
                this.context_cp1.drawImage(imageRepository.bullet, this.x, this.y);
            }
        }

    };
    this.check_on_off_effect = function(nva) {
        currentFireTcp0 = false;
        if (this.testbuller_effect(this.x, this.y, nva)) {
            if (this.drawtankUS_Bullet(this.x, this.y)) {
//                ontargetTcp = true;
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

    this.testbuller_effect = function(x, y, nav) { //vi tri vien dan duoc coi la chung dich
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
    var l = 0;
    this.drawtankUS_Bullet = function(x, y) {
        return true;
//        l += 1;
//////        this.context_cp1.drawImage(imageRepository.no, 230, 262, 25, 25, x , y , 25, 25); // anh no
//        if (l > 10) {
//            this.context_cp1.clearRect(x, y, 15, 15); // khoang thung cua buc tuong
////            //ve lai xe tank
//////                    context_cp1.drawImage(imageRepository.no, 63, 0, 30, 30, Xcom1, Ycom1 - 5, 30, 30);
//////                    context_cp1.clearRect(Xcom1, Ycom1 - 5, 30, 30);
//            l = 0;
//            return true;
//        }
//        return true;
//        this.context_cp1.clearRect(XbullteTcp, YbullteTcp - 16, 15, 15); // khoang thung cua buc tuong
////        l=0;
////        console.log(" this.drawtankUS_Bullet vi tri dan den: " + "X= " + XbullteTcp, +"Y= " + YbullteTcp);
//        return true;

    };
    //hieu ung no cho vien dan da cham dich

}
BulletTankcp.prototype = new DrawableTankcp();

function PoolTankcp(maxSize) {
    var size = maxSize; // Max bullets allowed in the pool
    var pool = [];

    /*
     * Populates the pool array with Bullet objects
     */
    this.init = function() {
        for (var i = 0; i < size; i++) {
            // Initalize the bullet object
            var bullet = new BulletTankcp();
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
                    var kq = random1_0(1000);
                    if (kq < 200) {
                        tam += kq;
                    }  else {
                        tam = kq;
                    }
                    if(isNaN(tam))tam=800;
                    for (i = 0; i < tam; i++) {

                    }
                    currentFireTcp0 = true;// cho bat tiep vien khac
                    ontargetTcp = false;
                }
            }
            else
                break;
        }
    };

}

function GameTankCP0() {

    this.init = function() {
        // Get the canvas elements
        this.bgCanvas = document.getElementById('background');
        this.shipCanvas = document.getElementById('ship');
        this.mainCanvas = document.getElementById('main');
        if (this.bgCanvas.getContext) {
            this.bgContext = this.bgCanvas.getContext('2d');

            this.mainContext = this.mainCanvas.getContext('2d');
            BulletTankcp.prototype.context_cp1 = this.mainContext;
            BulletTankcp.prototype.canvasWidth = this.mainCanvas.width;
            BulletTankcp.prototype.canvasHeight = this.mainCanvas.height;

            // Initialize the ship object
            this.ship = new TankCPShip0();
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
//        this.ship.draw();
        Tankcpanimate0();
    };
}

var shootcout0 = 0, tanknav_chang0 = 1;// kiem soat hieu ung
function Tankcpanimate0() {
    requestAnimFrame(Tankcpanimate0);
    if (StartgameTankcp1_0) {
        drawCompetitor();
        if (shootcout0 > 600 && count_die0 < 2) {
            tankcp0.ship.move();
            shootcout0++;
        } else if (shootcout0 < 605) {
            shootcout0++;
        } else {
            shootcout0 = 0;
        }

        if (tanknav_chang0 === 90 && count_die0 < 2) {
            TankCpdtStop();
            tankStop_senddatatoserver("random", CurrentSesion, "tank", 0, 0, 0, 0, xstop, ystop);
            tanknav_chang0++;
        } else if (tanknav_chang0 < 210) {
            tanknav_chang0++;
        } else {
            tanknav_chang0 = 0;
        }
        tankcp0.ship.bulletPool.animate();//list bullet of ship
    }
}
function TankCPShip0() {
    this.speed = 1;
    this.bulletPool = new PoolTankcp(30);
    this.bulletPool.init();
    this.draw = function() {
//        this.context_cp1.drawImage(imageRepository.spaceship, destX, destY, 30, 30, this.x, this.y, 30, 30);
    };
    this.move = function() {
        if (currentFireTcp0) {
            ontargetTcp = false;
            this.fire();
        }
    };
    this.fire = function() {
        if (tankcp_navigation1_0 === "up" || tankcp_navigation1_0 === "down") {
//            this.bulletPool.get(Xcom1 + 14, Ycom1, 2, tankcp_navigation);
            this.bulletPool.get(Xcom + 14, Ycom + 14, 6, tankcp_navigation1_0);
        } else {
//            this.bulletPool.get(Xcom1, Ycom1 + 14, 2, tankcp_navigation);
            this.bulletPool.get(Xcom + 14, Ycom + 14, 6, tankcp_navigation1_0);
        }
    };
}

// up date map

TankCPShip0.prototype = new DrawableTankcp();
initTankcp_dt();
