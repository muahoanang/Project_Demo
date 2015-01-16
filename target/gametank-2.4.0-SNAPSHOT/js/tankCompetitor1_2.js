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

function initTankcp2() {
    if (tankcp2.init())
        tankcp2.start();
}
var cvtankCP2 = document.getElementById("tankCP2");
var context_cp2 = cvtankCP2.getContext('2d');
var tankcp2 = new GameTankCP2();
var dulieu2;
var Ymax2 = 0;
var le1 = 0;
var x2, y2;
var Compenva2 = "down";
var Ycom2 = 0, Xcom2 = 0, ystop2 = 0, xstop2 = 0;
var sangphai2 = false, sangtrai2 = false, leftmove2 = false, rightmove2 = false;
var len2 = false, upmove2 = false, downmove2 = false;
var tankcp_navigation2, navishootGo2;
var tankstop = true;
var Xmax2 = 0;
var tankCompetitorFrie2 = false, StartgametankCp2 = false;
var keymap1_2 = 0;
var count_die2 = 0, speed2 = 1, xend2, yend2;
function createCompetitorTankCP2(message) {
    var lg = "";
    var jsonObj = "";
    lg = message.indexOf("2xetank_down");
    if (lg > 0) {
        jsonObj = message.substring(0, lg);
    } else
    {
        lg = message.indexOf("2xetank_right");
        if (lg > 0) {
            jsonObj = message.substring(0, lg);
        } else {
            lg = message.indexOf("2xetank_left");
            if (lg > 0) {
                jsonObj = message.substring(0, lg);
            } else {
                lg = message.indexOf("2xetank_up");
                if (lg > 0) {
                    jsonObj = message.substring(0, lg);
                } else {
                    sendRequestCreateTank("tank2", 300, 0, 2);
                    return false;
                }
            }
        }

    }
    dulieu2 = JSON.parse(jsonObj);
    Xcom2 = x2 = dulieu2[0].x; //vi tri phai ve
    Ycom2 = y2 = dulieu2[0].y;
    xend2 = dulieu2[0].xend;
    yend2 = dulieu2[0].yend;
    Compenva2 = dulieu2[0].navigation;
    StartgametankCp2 = true;
}

function drawCompetitorTankCP2() {
    if (count_die2 >= 2) {

    } else {
        if (downmove2 && MoveY_tk2_Down()) {
            tankCP2Stop_senddatatoserver("down", CurrentSesion, "tank2", x2, y2, xend2, yend2, xstop2, ystop2);
            downmove2 = false;

        }
        if (leftmove2 && Tank2MoveXleft()) {
            tankCP2Stop_senddatatoserver("left", CurrentSesion, "tank2", x2, y2, xend2, yend2, xstop2, ystop2);
            leftmove2 = false;

        }
        if (rightmove2 && MoveXRight_tank2Cp()) {
            tankCP2Stop_senddatatoserver("right", CurrentSesion, "tank2", x2, y2, xend2, yend2, xstop2, ystop2);
            rightmove2 = false;
        }
////
        if (upmove2 && MoveUp_tank2Cp()) {
            tankCP2Stop_senddatatoserver("up", CurrentSesion, "tank2", x2, y2, xend2, yend2, xstop2, ystop2);
            upmove2 = false;
        }

//        if (tankCompetitorFrie2) { tam dung hoat dong nay
//            if (drawCompetitorBullettank2(navishootGo2)) {// ban di tiep
////                context_cp2.drawImage(imageRepository.no, 63, 0, 30, 30, Xcom2, Ycom2, 30, 30);
//                tankFire_senddataChangerMap(keymap1_2, navishootGo2, CurrentSesion, xstop2, ystop2, "tank2"); // thay doi map
//                tankCompetitorFrie2 = false;
//            }
//        }
    }
}
;

function  tankCP2Stop_senddatatoserver(navigation, CurrentSesion, tank, x, y, xend, yend, xstop, ystop) {
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
    var tam;
    var kq = random1_2(2200);
    if (kq < 200) {
        tam += kq;
    } else {
        tam = kq;
    }
    if(isNaN(tam))tam=800;
    for (i = 0; i < tam; i++) {

    }

    sendText(tankposition + "tankStop");

}
function random1_2(max) {
    return Math.random() * max;
}
function sortSelect_tank2Cp(l2) {
    var i, j, min, minat;
    for (i = 0; i < (l2.length - 1); i++)
    {
        minat = i;
        min = l2[i];
        for (j = i + 1; j < (l2.length); j++) //select the min of the rest of array
        {
            if (min > l2[j])   //ascending order for descending reverse
            {
                minat = j; //the position of the min element 
                min = l2[j];
            }
        }
        var temp = l2[i];
        l2[i] = l2[minat]; //swap 
        l2[minat] = temp;
    }
}
//var l2 = []; //mang luu truu vi tri ma xe tank can kiem tra de dich chuyen cho truog hop sang trai sang phai
function moveleft_tankCp2(mess, tank) {
    //console.log(" moveleft_tankCp2 mapRowleft du lieu nhan duoc " + mess);
    var lg = mess.indexOf("2tankMoveLeft");
    var da = "";
    var keymaptam = 0;
    var listP = "";
    if (lg > 0) {
        da = mess.substring(0, lg);
        listP = JSON.parse(da);

        var l2 = [];
        var j = 0;
        for (i = 0; i < listP.length; i++) {
            if (listP[i].obj === 1) {
//           //console.log(" moveleft_tankCp1 mapRowleft, X: " + listP[i].x);
                l2[j] = listP[i].x;
                j++;
            }

        }
        if (l2.length > 0 && j > 0) {
            sortSelect_tank2Cp(l2); // sap xep
            //console.log("vi tri Xcom2:" + Xcom2);
// tim dich den    cho xe
            var max = 0;
            for (i = l2.length - 1; i > 0; i--) {
                if (Xcom2 > l2[i]) {
                    max = l2[i] + 16;
                    break;
                }
            }

            for (i = 0; i < listP.length; i++) {
                if (listP[i].obj === 1 && (listP[i].x + 2 >= Xmax2 - 15 && listP[i].x - 2 <= Xmax2 - 15)) {
//           //console.log("vi tri dung khi Move down " + unmove[i].y);
                    keymaptam = listP[i].Point;
                    break;
                }

            }
            Xmax2 = max;
            keymap1_2 = keymaptam;
            leftmove2 = true;
            sangtrai2 = true;
            //console.log("file moveleft_tankCp2 moveleft vi tri tank se den: " + Xmax2);
        } else {
            Xmax2 = 0;
            keymap1_2 = keymaptam;
            leftmove2 = true;
            sangtrai2 = true;

            //console.log("file moveleft_tankCp2 moveleft xe di khong vat can vi tri tank se den: " + Xmax2);
        }
        tankcp_navigation2 = "left";
        move_one_direction("left");
    } else {
        TankCp2Stop();
        tankStop_senddatatoserver("random", CurrentSesion, "tank2", x2, y2, xend2, yend2, xstop2, ystop2);
    }
}

function Tank2MoveXleft() {
    if (sangtrai2) {
        if (Xmax2 <= Xcom2) {
            Xcom2 -= speed2;
            context_cp2.clearRect(Xcom2 + 3, Ycom2, 30, 30);
            context_cp2.drawImage(imageRepository.no, 866, 0, 30, 30, Xcom2, Ycom2, 30, 30);
        } else {
            xstop2 = Xcom2;
            ystop2 = Ycom2;
            sangtrai2 = false;
            return true;
        }
    } else {
        return true;
    }
}

//xe tank sang phai
function  moveright_tank2Cp(mess) {
    var lg = mess.indexOf("2tankMoveRight");
    if (lg > 0) {
        var da = mess.substring(0, lg);
        var listP = JSON.parse(da);
        var j = 0;
        var l2 = [];
        for (i = 0; i < listP.length; i++) {
            if (listP[i].obj === 1) {
                l2[j] = listP[i].x;
                j++;
            }

        }
        if (l2.length > 0 && j > 0) {
// phai xap sep roi moi lam theo cach chon
            sortSelect_tank2Cp(l2);
            if (l2[l2.length - 1] > Xcom2) {
                for (i = 0; i < l2.length; i++) {
                    if (Xcom2 < l2[i]) {
                        Xmax2 = l2[i] - 31;
                        break;
                    }
                }

            } else {
                Xmax2 = 570;
            }
            for (i = 0; i < listP.length; i++) {
                if (listP[i].obj === 1 && (listP[i].x + 2 >= Xmax2 + 30 && listP[i].x - 2 <= Xmax2 + 30)) {
//           //console.log("vi tri dung khi Move down " + unmove[i].y);
                    keymap1_2 = listP[i].Point;
                    break;
                }

            }
        } else {
            Xmax2 = 570;
        }
        //console.log(" Sang ben phai mapRowRight Xmax2:" + Xmax2 + " , Xcom2: " + Xcom2);
        rightmove2 = true;
        sangphai2 = true;
        tankcp_navigation2 = "right";
        move_one_direction("right");
    } else {
        TankCp2Stop();
        tankStop_senddatatoserver("random", CurrentSesion, "tank2", x2, y2, xend2, yend2, xstop2, ystop2);
    }
}

function MoveXRight_tank2Cp() {
    if (sangphai2) {
        if (Xcom2 < Xmax2) {
            Xcom2 += speed2;
            context_cp2.clearRect(Xcom2 - 5, Ycom2, 30, 30);
            context_cp2.drawImage(imageRepository.no, 800, 0, 30, 30, Xcom2, Ycom2, 30, 30);
        } else {
            xstop2 = Xcom2;
            ystop2 = Ycom2;
            sangphai2 = false;
            return true;
        }
    } else {
        return true; // chu y cai can sua khi server su ly viec lua chon 
    }
}

//xe tank2 di len
//xe tank di len
function updown_tank2Cp(mess) {
    var lg = mess.indexOf("2tankMoveUp");
    if (lg > 0) {
        var da = mess.substring(0, lg);
        var listP = JSON.parse(da);
        var l2 = [];
        var j = 0;
        for (i = 0; i < listP.length; i++) {
            if (listP[i].obj === 1) {
//           //console.log("vi tri dung khi Move Up " + listP[i].y);
                l2[j] = listP[i].y;
                j++;
            }

        }

        if (l2.length > 0 && j > 0) {
            sortSelect_tank2Cp(l2);
            var countpoint = 0;
            for (i = 0; i < l2.length; i++) {
                if (l2[i] > Ycom2) {
                    countpoint++;
                    continue;
                } else {
                    Ymax2 = l2[i] + 15;
                    break;
                }
            }
            if (countpoint === l2.length)
                Ymax2 = 0;
        }
//tim key map
        for (i = 0; i < listP.length; i++) {
            if (listP[i].obj === 1 && listP[i].y === Ymax2 - 15) {
//           //console.log("vi tri dung khi Move down " + unmove[i].y);
                keymap1_2 = listP[i].Point;
                break;
            }

        }
//   //console.log("ham UpDown Ymin khi Move up: , Ymax: " + Ymax + "Ycom: " + Ycom + " count,l.length :" + countpoint, l.length);
        upmove2 = true;
        len2 = true;
        tankcp_navigation2 = "up";
        move_one_direction("up");
    } else {
        TankCp2Stop();
        tankStop_senddatatoserver("random", CurrentSesion, "tank2", x2, y2, xend2, yend2, xstop2, ystop2);
    }
}

function MoveUp_tank2Cp() {
    if (len2) {
        if (Ycom2 < Ymax2 || Ycom2 <= 0) {
            len2 = false;
//            upmove = false;
            xstop2 = Xcom2;
            ystop2 = Ycom2;
            return true;
        }
        Ycom2 -= speed2;
        if (Ycom2 >= Ymax2) {
            context_cp2.clearRect(Xcom2, Ycom2, 30, 30);
            context_cp2.drawImage(imageRepository.no, 770, 0, 30, 30, Xcom2, Ycom2, 30, 30);
        }
        document.getElementById("mess").innerHTML = "Ycom " + Ycom2 + " Xcom " + Xcom2;
    } else {
        return true;
    }
}

// dang thuc hien xe tank di xuong
var unmove2;
function  getPositionDownMoveTk2(ms, tankkey) {
    var lg = ms.indexOf("2TkCompe_down");
    var jsonObj = "";
    if (lg > 0) {
        jsonObj = ms.substring(0, lg);
        move_one_direction("down");
    } else {
        lg = ms.indexOf("2tankMoveDown");
        if (lg > 0) {
            jsonObj = ms.substring(0, lg);
            move_one_direction("down");
        }
        else {
            TankCp2Stop();
            tankStop_senddatatoserver("random", CurrentSesion, "tank2", x2, y2, xend2, yend2, xstop2, ystop2);
            return;
        }
    }

    //console.log("Data RECEIVED getPositionUnMoveTk2 khi nhan lan dau ve competoitor : " + ms);
    unmove2 = JSON.parse(jsonObj);
    le = unmove2.length;
    var l2 = [];
    var j = 0;
    for (i = 0; i < unmove2.length; i++) {
        if (unmove2[i].obj === 1) {
//           //console.log("vi tri dung khi Move down " + unmove1[i].y);
            l2[j] = unmove2[i].y;
            j++;
        }

    }
    sortSelect_tank2Cp(l2);
    var min = 0;
    for (i = 0; i < l2.length; i++) {
        if (l2[i] > Ycom2) {
            min = l2[i];
            break;
        }
    }
    if (min === 0) {
        min = 600;
    }
    // tim key map de ban va pha tuong
    var keymapTam = 0;
    for (i = 0; i < unmove2.length; i++) {
        if (unmove2[i].obj === 1 && unmove2[i].y === min) {
//           //console.log("vi tri dung khi Move down " + unmove1[i].y);
            keymapTam = unmove2[i].Point;
            break;
        }

    }
    Ymax2 = min - 30;
    keymap1_2 = keymapTam;
//   //console.log("ham  getPositionUnMoveTk1 nhan duoc du lieu Ymax khi Move down:" + min + " ,");
    downmove2 = true;
    tankcp_navigation2 = "down";

}

function MoveY_tk2_Down() {// ham nay can cai tien
    if (downmove2) {
        if (Ycom2 > Ymax2 || Ycom2 >= 570) {
            xstop2 = Xcom2;
            ystop2 = Ycom2;
            return true;
        }
        Ycom2 += speed2;
        if (Ycom2 <= Ymax2) {
            context_cp2.clearRect(Xcom2, Ycom2 - 2, 30, 31);
            context_cp2.drawImage(imageRepository.no, 835, 0, 30, 30, Xcom2, Ycom2, 30, 30);
            document.getElementById("mess").innerHTML = " cho truong hop dau tien Ycom " + Ycom2 + " Xcom " + Xcom2 + "  Ymax: " + Ymax2;
        }
    } else {
        return true;
    }
}

var bumtank2 = 0;
function drawCompetitorBullettank2(CPbulletnavigation) {
    switch (CPbulletnavigation) {
        case "down":
            {
                bumtank2 += 1;
                this.context.drawImage(imageRepository.no, 230, 262, 25, 25, xstop2 + 5, ystop2 + 25, 25, 25); // anh no
                if (bumtank2 > 15) {
                    context_cp2.clearRect(xstop2, ystop2 + 30, 30, 15); // khoang thung cua buc tuong
                    //ve lai xe tank
                    context_cp2.drawImage(imageRepository.no, 835, 0, 30, 30, Xcom2, Ycom2 - 5, 30, 30);
                    context_cp2.clearRect(Xcom2 + 45, Ycom2 - 5, 30, 30);
                    bumtank2 = 0;
                    return true;
                }
            }
            break;
        case "right":
            {
                bumtank2 += 1;
                //ve lai xe tank
                context.clearRect(Xcom2, Ycom2, 30, 30);
                context.drawImage(imageRepository.no, 800, 0, 30, 30, Xcom2 - 5, Ycom2, 30, 30);
                this.context.drawImage(imageRepository.no, 230, 262, 25, 25, xstop2 + 25, ystop2 + 5, 25, 25); // anh no
                if (bumtank2 > 15) {
                    context.clearRect(xstop2 + 45, ystop, 17, 31); // khoang thung cua buc tuong
                    bumtank2 = 0;
                    return true;
                }
            }
            break;
        case "left":
            {
                bumtank2 += 1; //ve lai xe tank
                context.clearRect(Xcom2, Ycom2, 30, 30);
                context.drawImage(imageRepository.no, 866, 0, 30, 30, Xcom2 + 5, Ycom2, 30, 30);
//            ve anh no bum
                this.context.drawImage(imageRepository.no, 230, 262, 20, 20, xstop2 - 20, ystop2 + 5, 20, 20); // anh no
                if (bumtank2 > 15) {
                    context.clearRect(xstop2 - 15, ystop2, 15, 32); // khoang thung cua buc tuong
                    bumtank2 = 0;
                    return true;
                }
            }
            break;
        case "up":
            {
                bumtank2 += 1; //ve lai xe tank
                context.clearRect(Xcom2, Ycom2 + 10, 30, 30);
                context.drawImage(imageRepository.no, 770, 0, 30, 30, Xcom2, Ycom2, 30, 30);
//            ve anh no bum
                this.context.drawImage(imageRepository.no, 230, 262, 20, 20, xstop2 + 5, ystop2 - 20, 20, 20); // anh no
                if (bumtank2 > 15) {
                    context.clearRect(ystop2 + 15, ystop2, 15, 31); // khoang thung cua buc tuong
                    bumtank2 = 0;
                    return true;
                }
            }
            break;
    }
}
;

function tankshootgo2(mess) {
    var lg = mess.indexOf("2tankMoveFireGo");
    var da = "", listP;
    if (lg > 0) {
        da = mess.substring(0, lg);
        listP = JSON.parse(da);
        tankCompetitorFrie2 = true;
        navishootGo2 = listP[0].navigation;

    } else {
        tankStop_senddatatoserver("random", CurrentSesion, "tank2", x2, y2, xend2, yend2, xstop2, ystop2);
    }
}
// chi cho phep xe di theo mot huong
function move_one_direction(nva) {
    switch (nva) {
        case "right":
            leftmove2 = false, rightmove2 = true, sangphai2 = true, upmove2 = false, downmove2 = false;
            break;
        case "left":
            leftmove2 = true, sangtrai2 = true, rightmove2 = false, upmove2 = false, downmove2 = false;
            break;
        case "up":
            leftmove2 = false, rightmove2 = false, upmove2 = true, len2 = true, downmove2 = false;
            break;
        case "down":
            leftmove2 = false, rightmove2 = false, upmove2 = false, downmove2 = true;
            break;
    }
}
function TankCp2Stop() {
    leftmove2 = false, rightmove2 = false, upmove2 = false, downmove2 = false;
}
// bat dau thu nghiep voi tank tu ddong2

function DrawableTcp2() {
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

    // Define abstract function to be implemented in child objects
    this.draw = function() {
    };
    this.move = function() {
    };
}

/**
 * Creates the Bullet object which the ship fires. The bullets are
 * drawn on the "main" canvas.
 */

var currentFireTcp2 = true;// cho bat tiep vien khac
var messa = document.getElementById("mess");
var messstatus = document.getElementById("messstatus");
var XbullteTcp2 = 0, YbullteTcp2 = 0, ontargetTcp2 = false;// cai nay de gi nhan dan ban chung dich

function BulletTcp2() {
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
            "tank": "tank2",
            "x": this.x,
            "y": this.y,
            "x1": x1,
            "y1": y1,
            "key": mapkey,
            "key1": mapkey,
            "navigation": navigation,
            "session": CurrentSesion
        });
//        sendText(tankposition + "changerMap");
        sendText(tankposition + "Tank2CPUpdateMap");
    };
    this.draw = function() {
        if (ontargetTcp2) {
            XbullteTcp2 = YbullteTcp2 = -10;
            return true;// dan trung dich
        }
        if (this.navigation === "") {
            this.navigation = "up";
            this.x += 14;
        }
        if (this.navigation === "up") {
            this.y -= this.speed;
            if (this.y <= -5) {
//                this.context_cp2.drawImage(imageRepository.no, 230, 262, 25, 25, this.x - 12, this.y, 25, 25);
                return true;
            }
            else {
                // kiem tra viec vien dan co cham vao tuong khong
                XbullteTcp2 = this.x, YbullteTcp2 = this.y;
                if (this.check_on_off_effect("up")) {
                    this.tankUserFire_senddataChangerMap("up");
                    return true;
                }

                this.context_cp2.clearRect(this.x, this.y, 10, 15);
                messa.innerHTML = "x= " + this.x + " y= " + this.y;
                this.context_cp2.drawImage(imageRepository.bullet, this.x, this.y);
            }

        } else if (this.navigation === "down") {
            this.y += this.speed;
            if (this.y >= 750) {
//                this.context_cp2.drawImage(imageRepository.no, 230, 262, 25, 25, this.x - 12, this.y, 25, 25);
                return true;
            }
            else {
                XbullteTcp2 = this.x, YbullteTcp2 = this.y;
                if (this.check_on_off_effect("down")) {
                    this.tankUserFire_senddataChangerMap("down");
                    return true;
                }

                this.context_cp2.clearRect(this.x, this.y - 8, 10, 15);
                messa.innerHTML = "x= " + this.x + " y= " + this.y;
                this.context_cp2.drawImage(imageRepository.bullet, this.x, this.y);
            }

        } else if (this.navigation === "right") {
            this.x += this.speed;
            if (this.x >= 750) {
//                this.context_cp2.drawImage(imageRepository.no, 230, 262, 25, 25, this.x, this.y - 12, 25, 25);
                return true;
            }
            else {
                XbullteTcp2 = this.x, YbullteTcp2 = this.y;
                if (this.check_on_off_effect("right")) {
                    this.tankUserFire_senddataChangerMap("right");
                    return true;
                }

                this.context_cp2.clearRect(this.x - 8, this.y - 1, 10, 15);
                messa.innerHTML = "x= " + this.x + " y= " + this.y;
                this.context_cp2.drawImage(imageRepository.bullet, this.x, this.y);
            }
        } else if (this.navigation === "left") {
            this.x -= this.speed;
            if (this.x <= -20) {
//                this.context_cp2.drawImage(imageRepository.no, 230, 262, 25, 25, this.x, this.y - 12, 25, 25);
                return true;
            }
            else {
                XbullteTcp2 = this.x, YbullteTcp2 = this.y;
                if (this.check_on_off_effect("left")) {
                    this.tankUserFire_senddataChangerMap("left");
                    return true;
                }

                this.context_cp2.clearRect(this.x + 8, this.y, 10, 15);
                messa.innerHTML = "x= " + this.x + " y= " + this.y;
                this.context_cp2.drawImage(imageRepository.bullet, this.x, this.y);
            }
        }

    };
    this.check_on_off_effect = function(nva) {
        currentFireTcp2 = false;
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
//        l += 1;
//////        this.context_cp2.drawImage(imageRepository.no, 230, 262, 25, 25, x , y , 25, 25); // anh no
//        if (l > 10) {
//            this.context_cp2.clearRect(x, y, 15, 15); // khoang thung cua buc tuong
////            //ve lai xe tank
//////                    context_cp2.drawImage(imageRepository.no, 63, 0, 30, 30, Xcom2, Ycom2 - 5, 30, 30);
//////                    context_cp2.clearRect(Xcom2, Ycom2 - 5, 30, 30);
//            l = 0;
//            return true;
//        }
        return true;
//        this.context_cp2.clearRect(XbullteTcp2, YbullteTcp2 - 16, 15, 15); // khoang thung cua buc tuong
////        l=0;
////        console.log(" this.drawtankUS_Bullet vi tri dan den: " + "X= " + XbullteTcp2, +"Y= " + YbullteTcp2);
//        return true;

    };
    //hieu ung no cho vien dan da cham dich

}
BulletTcp2.prototype = new DrawableTcp2();
function PoolTcp2(maxSize) {
    var size = maxSize; // Max bullets allowed in the pool
    var pool = [];

    /*
     * Populates the pool array with Bullet objects
     */
    this.init = function() {
        for (var i = 0; i < size; i++) {
            // Initalize the bullet object
            var bullet = new BulletTcp2();
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
                    var kq = random1_2(1000);
                    if (kq < 200) {
                        tam += kq;
                    } else if (kq > 900) {
                        tam -= 250;
                    } else {
                        tam = kq;
                    }
                       if(isNaN(tam))tam=800;
                    for (i = 0; i < tam; i++) {

                    }
                    currentFireTcp2 = true;// cho bat tiep vien khac
                    //                    ontargetTcp = false;
                }
            }
            else
                break;
        }
    };

}
function GameTankCP2() {

    this.init = function() {
        // Get the canvas elements
        this.bgCanvas = document.getElementById('background');
        this.shipCanvas = document.getElementById('ship');
        this.mainCanvas = document.getElementById('main');
        if (this.bgCanvas.getContext) {
            this.bgContext = this.bgCanvas.getContext('2d');
            this.mainContext = this.mainCanvas.getContext('2d');
            BulletTcp2.prototype.context_cp2 = this.mainContext;
            BulletTcp2.prototype.canvasWidth = this.mainCanvas.width;
            BulletTcp2.prototype.canvasHeight = this.mainCanvas.height;

            // Initialize the ship object
            this.ship = new TankCPShip2();
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
        Tankcpanimate2();
    };
}
var shootcout2 = 0, timeh_ung2 = 1, comm_no = false, tanknav_chang2 = 1;// kiem soat hieu ung
function Tankcpanimate2() {
    requestAnimFrame(Tankcpanimate2);
    if (StartgametankCp2) {
        drawCompetitorTankCP2();
        if (shootcout2 > 395 && count_die2 < 2) {
            tankcp2.ship.move();

            shootcout2++;
        } else if (shootcout2 < 400) {
            shootcout2++;
        } else {
            shootcout2 = 0;
        }
        if (tanknav_chang2 === 210 && count_die2 < 2) {
            TankCp2Stop();
            tankStop_senddatatoserver("random", CurrentSesion, "tank2", 0, 0, 0, 0, xstop2, ystop2);
            tanknav_chang2++;
        } else if (tanknav_chang2 < 345) {
            tanknav_chang2++;
        } else {
            tanknav_chang2 = 0;
        }
        tankcp2.ship.bulletPool.animate();//list bullet of ship
    }
}


function TankCPShip2() {
    this.speed = 1;
    this.bulletPool = new PoolTcp2(30);
    this.bulletPool.init();
    this.draw = function() {
        //        this.context_cp2.drawImage(imageRepository.spaceship, destX, destY, 30, 30, this.x, this.y, 30, 30);
    };
    this.move = function() {
        if (currentFireTcp2) {
            ontargetTcp = false;
            this.fire();
        }
    };
    this.fire = function() {
        if (tankcp_navigation2 === "up" || tankcp_navigation2 === "down") {
            //            this.bulletPool.get(Xcom2 + 14, Ycom2, 2, tankcp_navigation2);
            this.bulletPool.get(Xcom2 + 14, Ycom2 + 14, 4, tankcp_navigation2);
        } else {
            //            this.bulletPool.get(Xcom2, Ycom2 + 14, 2, tankcp_navigation2);
            this.bulletPool.get(Xcom2 + 14, Ycom2 + 14, 4, tankcp_navigation2);
        }
    };
}
TankCPShip2.prototype = new DrawableTcp2();
initTankcp2();
// cap nhat map

