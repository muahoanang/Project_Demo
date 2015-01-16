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
function initTankcp() {
    if (tankcp.init())
        tankcp.start();
}
var cvtankCP1 = document.getElementById("tankCP1");
var context_cp1 = cvtankCP1.getContext('2d');
var tankcp = new GameTankCP();
var dulieu1;
var Ymax1 = 0;
var le1 = 0;
var x1, y1;
var Compenva1 = "down";
var Ycom1 = 0, Xcom1 = 0, ystop1 = 0, xstop1 = 0;
var sangphai1 = false, sangtrai1 = true, len = true, xuong1 = false, upmove1 = false, tankcp_navigation;
var downMove1 = false, tankstop = true, leftmove1 = false, rightmove1 = false, StartgametankCp1 = false;
var Xmax1 = 0;
var tankCompetitorFrie1 = false, navishootGo = "";
var keymap1_1 = 0;
var count_die = 0, speed = 1;
var xend1 = yend1 = 0;
function createCompetitorTankCP1(message) {
    var lg = "";
    var jsonObj = "";
    lg = message.indexOf("xetank1_down");
    if (lg > 0) {
        jsonObj = message.substring(0, lg);
    } else
    {
        lg = message.indexOf("xetank1_right");
        if (lg > 0) {
            jsonObj = message.substring(0, lg);
        } else {
            lg = message.indexOf("xetank1_left");
            if (lg > 0) {
                jsonObj = message.substring(0, lg);
            } else {
                lg = message.indexOf("xetank1_up");
                if (lg > 0) {
                    jsonObj = message.substring(0, lg);
                } else {
                    sendRequestCreateTank("tank1", 0, 0, 1);
                    return false;
                }
            }
        }

    }
    dulieu1 = JSON.parse(jsonObj);
    Xcom1 = x1 = dulieu1[0].x; //vi tri phai ve
    Ycom1 = y1 = dulieu1[0].y;
    xend1 = dulieu1[0].xend;
    yend1 = dulieu1[0].yend;
    Compenva1 = dulieu1[0].navigation;
    StartgametankCp1 = true;
}

function move_one_direction_tank1(nva) {
    switch (nva) {
        case "right":
            leftmove1 = false, rightmove1 = true, sangphai1 = true, upmove1 = false, downMove1 = false;
            break;
        case "left":
            leftmove1 = true, sangtrai1 = true, rightmove1 = false, upmove1 = false, downMove1 = false;
            break;
        case "up":
            leftmove1 = false, rightmove1 = false, upmove1 = true, xuong1 = true, downMove1 = false;
            break;
        case "down":
            leftmove1 = false, rightmove1 = false, upmove1 = false, downMove1 = true;
            break;
    }
}
/* 
 * ham kich ban cho xe tank no di lai la o day
 */
function drawCompetitorTankCP1() {
    if (count_die >= 2) {
    } else {
        if (downMove1 && MoveY_tk1_Down()) {
            tankCP1Stop_senddatatoserver("down", CurrentSesion, "tank1", x1, y1, xend1, yend1, xstop1, ystop1);
            downMove1 = false;

        }
        if (leftmove1 && Tank1MoveXleft()) {
            tankCP1Stop_senddatatoserver("left", CurrentSesion, "tank1", x1, y1, xend1, yend1, xstop1, ystop1);
            leftmove1 = false;

        }
        if (rightmove1 && MoveXRight_tank1Cp()) {
            tankCP1Stop_senddatatoserver("right", CurrentSesion, "tank1", x1, y1, xend1, yend1, xstop1, ystop1);

            rightmove1 = false;
        }
////
        if (upmove1 && MoveUp_tank1Cp()) {
            tankCP1Stop_senddatatoserver("up", CurrentSesion, "tank1", x1, y1, xend1, yend1, xstop1, ystop1);
            upmove1 = false;
        }

//        if (tankCompetitorFrie1) {
//            if (drawCompetitorBullettank1(xstop1, navishootGo)) {// ban di tiep
////                context_cp1.drawImage(imageRepository.no, 63, 0, 30, 30, Xcom1, Ycom1, 30, 30);
//                tankFire_senddataChangerMap(keymap1_1, navishootGo, CurrentSesion, xstop1, ystop1, "tank1"); // thay doi map
//                tankCompetitorFrie1 = false;
//            }
//        }
    }
}


function  tankCP1Stop_senddatatoserver(navigation, CurrentSesion, tank, x, y, xend, yend, xstop, ystop) {
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
    var kq = random1_1();
    if (kq < 200) {
        tam += kq;
    } else if (kq > 1000) {
        tam -= 250;
    }
       if(isNaN(tam))tam=800;
    for (i = 0; i < tam; i++) {

    }

    sendText(tankposition + "tankStop");

}
function random1_1() {
    return Math.random() * 2000;
}
// dang thuc hien xe tank di xuong
var unmove1;
function  getPositionDownMoveTk1(ms, tankkey) {
    var lg = ms.indexOf("Tk1Compe_down");
    var jsonObj = "";
    if (lg > 0) {
        jsonObj = ms.substring(0, lg);
        move_one_direction_tank1("down");
    } else {
        lg = ms.indexOf("1tankMoveDown");
        if (lg > 0) {
            jsonObj = ms.substring(0, lg);
            move_one_direction_tank1("down");
        }
        else {
            TankCp1Stop();
            tankStop_senddatatoserver("down", CurrentSesion, "tank1", x1, y1, xend1, yend1, xstop1, ystop1);
            downMove1 = false;
            return;
        }
    }
    var l1 = [];
//    console.log("Xe tank competitor nhan getPositionUnMoveTk1 khi nhan lan dau ve competoitor : " + ms);
    unmove1 = JSON.parse(jsonObj);
    le = unmove1.length;

    var j = 0;
    for (i = 0; i < unmove1.length; i++) {
        if (unmove1[i].obj === 1) {
//           //console.log("vi tri dung khi Move down " + unmove1[i].y);
            l1[j] = unmove1[i].y;
            j++;
        }
    }
    sortSelect(l1);
    var min = 0;
    for (i = 0; i < l1.length; i++) {
        if (l1[i] > min) {
            min = l1[i];
            break;
        }
    }
    // tim key map de ban va pha tuong
    var keymapTam = 0;
    for (i = 0; i < unmove1.length; i++) {
        if (unmove1[i].obj === 1 && unmove1[i].y === min) {
//           //console.log("vi tri dung khi Move down " + unmove1[i].y);
            keymapTam = unmove1[i].Point;
            break;
        }

    }
    if (min === 0) {
        min = 600;
    }// khong tim duoc diem can truoc mat thii tien thang  xuong
    Ymax1 = min - 30;
    keymap1_1 = keymapTam;
//   //console.log("ham  getPositionUnMoveTk1 nhan duoc du lieu Ymax khi Move down:" + min + " ,");
    downMove1 = true;
    tankcp_navigation = "down";
}

function MoveY_tk1_Down() {// ham nay can cai tien
    if (downMove1) {
        if (Ycom1 > Ymax1 || Ycom1 >= 570) {
            xstop1 = Xcom1;
            ystop1 = Ycom1;
            return true;
        }
        if (Ycom1 <= Ymax1) {
            Ycom1 += speed;
            tankCP_anbullte("down");
            context_cp1.clearRect(Xcom1, Ycom1, 31, 31);
            context_cp1.drawImage(imageRepository.no, 63, 0, 30, 30, Xcom1, Ycom1, 30, 30);
            document.getElementById("mess").innerHTML = "ham MoveY_tk1 cho truong hop dau tien Ycom " + Ycom1 + " Xcom " + Xcom1 + "  Ymax: " + Ymax1;
        }

    } else {
        return true;
    }
}
// cho no di sang trai
function sortSelect_tank1Cp(l1) {
    var i, j, min, minat;
    for (i = 0; i < (l1.length - 1); i++)
    {
        minat = i;
        min = l1[i];
        for (j = i + 1; j < (l1.length); j++) //select the min of the rest of array
        {
            if (min > l1[j])   //ascending order for descending reverse
            {
                minat = j; //the position of the min element 
                min = l1[j];
            }
        }
        var temp = l1[i];
        l1[i] = l1[minat]; //swap 
        l1[minat] = temp;
    }
}

function moveleft_tankCp1(mess, tank) {
    //console.log(" moveleft_tankCp1 mapRowleft du lieu nhan duoc " + mess);
    var lg = mess.indexOf("1tankMoveLeft");
    var da = "";
    var listP = "";
    var l1 = [];
    var keymaptam = 0;
    if (lg > 0) {
        da = mess.substring(0, lg);
        listP = JSON.parse(da);
        var j = 0;
        for (i = 0; i < listP.length; i++) {
            if (listP[i].obj === 1) {
                l1[j] = listP[i].x;
                j++;
            }
        }
        if (l1.length > 0 && j > 0) {
            sortSelect_tank1Cp(l1); // sap xep
            var max = 0;
            for (i = l1.length - 1; i > 0; i--) {
                if (Xcom1 > l1[i]) {
                    max = l1[i] + 16;
                    break;
                }
            }
            for (i = 0; i < listP.length; i++) {
                if (listP[i].obj === 1 && (listP[i].x + 2 >= Xmax1 - 15 && listP[i].x - 2 <= Xmax1 - 15)) {
                    keymaptam = listP[i].Point;
                    break;
                }
            }
            if (tank === "tank1") {
                Xmax1 = max;
                keymap1_1 = keymaptam;
                leftmove1 = true;
                sangtrai1 = true;
            }
        } else {
            Xmax1 = 0;
            keymap1_1 = keymaptam;
            leftmove1 = true;
            sangtrai1 = true;
        }
        tankcp_navigation = "left";
        move_one_direction_tank1("left");
    } else {
        TankCp1Stop();
        tankStop_senddatatoserver("ramdom", CurrentSesion, "tank1", x1, y1, xend1, yend1, xstop1, ystop1);
    }
}

function Tank1MoveXleft() {
    if (sangtrai1) {
        if (Xmax1 <= Xcom1) {
            Xcom1 -= speed;
            tankCP_anbullte("left");
            context_cp1.clearRect(Xcom1 + 2, Ycom1, 30, 30);
            context_cp1.drawImage(imageRepository.no, 100, 0, 30, 30, Xcom1, Ycom1 - 2, 30, 30);
        } else {
            xstop1 = Xcom1;
            ystop1 = Ycom1;
            sangtrai1 = false;
            return true;
        }
    } else {
        return true;
    }
}

//xe tank sang phai
function  moveright_tank1Cp(mess) {
    var lg = mess.indexOf("1tankMoveRight");
    if (lg > 0) {
        var da = mess.substring(0, lg);
        var listP = JSON.parse(da);
        var j = 0;
        var l1 = [];
        for (i = 0; i < listP.length; i++) {
            if (listP[i].obj === 1) {

                l1[j] = listP[i].x;
                j++;
            }
        }
        if (l1.length > 0 && j > 0) {
// phai xap sep roi moi lam theo cach chon
            sortSelect_tank1Cp(l1);
            if (l1[l1.length - 1] > Xcom1) {

                for (i = 0; i < l1.length; i++) {
                    if (Xcom1 < l1[i]) {
                        Xmax1 = l1[i] - 31;
                        break;
                    }
                }
            } else {
                Xmax1 = 570;
            }
            for (i = 0; i < listP.length; i++) {
                if (listP[i].obj === 1 && (listP[i].x + 2 >= Xmax1 + 30 && listP[i].x - 2 <= Xmax1 + 30)) {
                    keymap1_1 = listP[i].Point;
                    break;
                }
            }
        } else {
            Xmax1 = 570;
        }
        rightmove1 = true;
        sangphai1 = true;
        tankcp_navigation = "right";
        move_one_direction_tank1("right");
    } else {
        TankCp1Stop();
        tankStop_senddatatoserver("ramdom", CurrentSesion, "tank1", x1, y1, xend1, yend1, xstop1, ystop1);
    }
}

function MoveXRight_tank1Cp() {
    if (sangphai1) {
        if (Xcom1 < Xmax1) {
            Xcom1 += speed;
            tankCP_anbullte("right");
            context_cp1.clearRect(Xcom1 - 5, Ycom1, 30.5, 30.5);
            context_cp1.drawImage(imageRepository.no, 30, 0, 30, 30, Xcom1, Ycom1 - 2, 30, 30);
        } else {
            xstop1 = Xcom1;
            ystop1 = Ycom1;
            sangphai1 = false;
            return true;
        }
    } else {
        return true;
    }
}

//xe tank di len
function updown_tank1Cp(mess) {
    var lg = mess.indexOf("1tankMoveUp");
    if (lg > 0) {
        var da = mess.substring(0, lg);
        var listP = JSON.parse(da);
        var l1 = [];
        var j = 0;
        for (i = 0; i < listP.length; i++) {
            if (listP[i].obj === 1) {
                l1[j] = listP[i].y;
                j++;
            }
        }
        if (l1.length > 0 && j > 0) {
            sortSelect_tank1Cp(l1);
            var countpoint = 0;
            for (i = l1.length - 1; i >= 0; i--) {
                if (l1[i] > Ycom1) {
                    countpoint++;
                    continue;
                } else {
                    Ymax1 = l1[i] + 15;
                    break;
                }
            }
            if (countpoint === l1.length)
                Ymax1 = 0;
        }
//tim key map
        for (i = 0; i < listP.length; i++) {
            if (listP[i].obj === 1 && listP[i].y === Ymax1 - 15) {
                keymap1_1 = listP[i].Point;
                break;
            }

        }
        upmove1 = true;
        xuong1 = true;
        tankcp_navigation = "up";
        move_one_direction_tank1("up");
    } else {
        TankCp1Stop();
        tankStop_senddatatoserver("ramdom", CurrentSesion, "tank1", x1, y1, xend1, yend1, xstop1, ystop1);
    }
}

function MoveUp_tank1Cp() {
    if (xuong1) {
        if (Ycom1 < Ymax1 || Ycom1 <= 0) {
            xuong1 = false;
//            upmove = false;
            xstop1 = Xcom1;
            ystop1 = Ycom1;
            return true;
        }
        Ycom1 -= speed;
        tankCP_anbullte("up");
        if (Ycom1 >= Ymax1) {
            context_cp1.clearRect(Xcom1, Ycom1, 30, 30);
            context_cp1.drawImage(imageRepository.no, 0, 0, 30, 30, Xcom1, Ycom1 - 2, 30, 30);
        }
        document.getElementById("mess").innerHTML = "Ycom " + Ycom1 + " Xcom " + Xcom1;
    } else {
        return true;
    }
}
// xac nhan xe tank bi an dan 
function tankCP_anbullte(nav) {
    switch (nav) {
        case "left":
            {

                if ((Xbullte >= Xcom1 - 2) && (Ycom1 + 30 >= Ybullte && Ycom1 - 2 <= Ybullte)) {
                    settankCPandan();
                    sangtrai1 = false;
                    console.log("  tankCP_anbullte(nav) truong hop xe bi an dan khi sang trai" + Xmax1 + " , Xcom: " + Xcom1);
                }
            }
            break;
        case "right":

            if ((Xcom1 + 30 >= Xbullte || Xcom1 === Xbullte) && (Ycom1 + 30 >= Ybullte && Ycom1 - 2 <= Ybullte)) {
                settankCPandan();
                sangphai1 = false;
                console.log("  tankCP_anbullte(nav) truong hop xe bi an dan khi xang phai" + Xmax1 + " , Xcom: " + Xcom1);
            }
            break;
        case "up":
            {

                if ((Ycom1 + 32 >= Ybullte) && (Xcom1 + 30 >= Xbullte && Xcom1 - 2 <= Xbullte)) {
                    settankCPandan();
                    xuong1 = false;
                    console.log("  *****tankCP_anbullte(nav) truong hop xe bi an dan khi len" + Xmax1 + " , Xcom: " + Xcom1);
                }

            }
            break;
        case "down":
            {
                if ((Ycom1 === Ybullte) && (Xcom1 + 30 >= Xbullte && Xcom1 - 2 <= Xbullte)) {
                    settankCPandan();
                    downMove1 = false;
                    console.log(" ------- tankCP_anbullte(nav) truong hop xe bi an dan khi Xuong" + Xmax1 + " , Xcom: " + Xcom1);
                }

            }
            break;
    }
    return true;
}
function settankCPandan() {
    ontarget = true;
    xstop1 = Xcom1;
    ystop1 = Ycom1;
    count_die++;
}
var bumtank1 = 0;
function drawCompetitorBullettank1(xfire, CPbulletnavigation) {
    switch (CPbulletnavigation) {
        case "down":
            {
                bumtank1 += 1;
                this.context.drawImage(imageRepository.no, 230, 262, 25, 25, xstop1 + 5, ystop1 + 25, 25, 25); // anh no
                if (bumtank1 > 20) {
                    context.clearRect(xfire, ystop1 + 30, 30, 15); // khoang thung cua buc tuong
                    //ve lai xe tank
                    context.drawImage(imageRepository.no, 63, 0, 30, 30, Xcom1, Ycom1 - 5, 30, 30);
                    context.clearRect(Xcom1, Ycom1 - 5, 30, 30);
                    bumtank1 = 0;
                    return true;
                }
            }
            break;
        case "right":
            {
                bumtank1 += 1;
                //ve lai xe tank
                context.clearRect(Xcom1, Ycom1, 30, 30);
                context.drawImage(imageRepository.no, 33, 0, 30, 30, Xcom1 - 5, Ycom1, 30, 30);
                this.context.drawImage(imageRepository.no, 230, 262, 25, 25, xstop1 + 25, ystop1 + 5, 25, 25); // anh no
                if (bumtank1 > 20) {
                    context.clearRect(xfire + 28, ystop - 1, 17, 31); // khoang thung cua buc tuong
                    bumtank1 = 0;
                    return true;
                }
            }
            break;
        case "left":
            {
                bumtank1 += 1; //ve lai xe tank
                context.clearRect(Xcom1, Ycom1, 30, 30);
                context.drawImage(imageRepository.no, 100, 0, 30, 30, Xcom1 + 5, Ycom1, 30, 30);
//            ve anh no bum
                this.context.drawImage(imageRepository.no, 230, 262, 20, 20, xstop1 - 20, ystop1 + 5, 20, 20); // anh no
                if (bumtank1 > 20) {
                    context.clearRect(xfire - 15, ystop1 - 2, 15, 32); // khoang thung cua buc tuong
                    bumtank1 = 0;
                    return true;
                }
            }
            break;
        case "up":
            {
                bumtank1 += 1; //ve lai xe tank
                context.clearRect(Xcom1, Ycom1 + 10, 30, 30);
                context.drawImage(imageRepository.no, 0, 0, 30, 30, Xcom1, Ycom1, 30, 30);
//            ve anh no bum
                this.context.drawImage(imageRepository.no, 230, 262, 20, 20, xstop1 + 5, ystop1 - 20, 20, 20); // anh no
                if (bumtank1 > 20) {
                    context.clearRect(xfire + 15, ystop1 - 2, 15, 32); // khoang thung cua buc tuong
                    bumtank1 = 0;
                    return true;
                }
            }
            break;
    }
}
;
//nhanlenh ban tuong va di tiep
function tankshootgo(mess) {
    var lg = mess.indexOf("1tankMoveFireGo");
    var da = "", listP;
    if (lg > 0) {
        da = mess.substring(0, lg);
        listP = JSON.parse(da);
        tankCompetitorFrie1 = true;
        navishootGo = listP[0].navigation;
    }
}

// phai cho tank tu dong ban duoc dan  va ghi nhan thay doi map
////

function DrawableTcp() {
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

var currentFireTcp = true;// cho bat tiep vien khac
var messa = document.getElementById("mess");
var messstatus = document.getElementById("messstatus");
var XbullteTcp = 0, YbullteTcp = 0, ontargetTcp = false;

function BulletTcp() {
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
            "tank": "tank1",
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
        sendText(tankposition + "Tank1CPUpdateMap");
//        console.log(tankposition + "Tank1CPUpdateMap");
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
            if (this.y <= -5) {
//                this.context_cp1.drawImage(imageRepository.no, 230, 262, 25, 25, this.x - 12, this.y, 25, 25);
                return true;
            }
            else {
                // kiem tra viec vien dan co cham vao tuong khong
                XbullteTcp = this.x, YbullteTcp = this.y;
                if (this.check_on_off_effect("up")) {
                    this.tankUserFire_senddataChangerMap("up");
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
            if (this.x <= 0) {
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
        currentFireTcp = false;
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
//////        this.context_cp1.drawImage(imageRepository.no, 230, 262, 25, 25, x , y , 25, 25); // anh no
//        if (l > 10) {
//            this.context_cp1.clearRect(x, y, 15, 15); // khoang thung cua buc tuong
////            //ve lai xe tank
//////                    context_cp1.drawImage(imageRepository.no, 63, 0, 30, 30, Xcom1, Ycom1 - 5, 30, 30);
//////                    context_cp1.clearRect(Xcom1, Ycom1 - 5, 30, 30);
//            l = 0;
//            return true;
//        }
        return true;
//        this.context_cp1.clearRect(XbullteTcp, YbullteTcp - 16, 15, 15); // khoang thung cua buc tuong
////        l=0;
////        console.log(" this.drawtankUS_Bullet vi tri dan den: " + "X= " + XbullteTcp, +"Y= " + YbullteTcp);
//        return true;

    };
    //hieu ung no cho vien dan da cham dich

}
BulletTcp.prototype = new DrawableTcp();
function PoolTcp(maxSize) {
    var size = maxSize; // Max bullets allowed in the pool
    var pool = [];

    /*
     * Populates the pool array with Bullet objects
     */
    this.init = function() {
        for (var i = 0; i < size; i++) {
            // Initalize the bullet object
            var bullet = new BulletTcp();
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
                    }  else {
                        tam = kq;
                    }
                    if(isNaN(tam))tam=800;
                    for (i = 0; i < tam; i++) {

                    }
                    currentFireTcp = true;// cho bat tiep vien khac
                    ontargetTcp = false;
                }
            }
            else
                break;
        }
    };

}


function GameTankCP() {

    this.init = function() {
        // Get the canvas elements
        this.bgCanvas = document.getElementById('background');
        this.shipCanvas = document.getElementById('ship');
        this.mainCanvas = document.getElementById('main');
        if (this.bgCanvas.getContext) {
            this.bgContext = this.bgCanvas.getContext('2d');

            this.mainContext = this.mainCanvas.getContext('2d');
            BulletTcp.prototype.context_cp1 = this.mainContext;
            BulletTcp.prototype.canvasWidth = this.mainCanvas.width;
            BulletTcp.prototype.canvasHeight = this.mainCanvas.height;

            // Initialize the ship object
            this.ship = new TankCPShip();
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
        Tankcpanimate();
    };
}
// vong Lap de ve vien dan
function TankCp1Stop() {
    leftmove1 = false, rightmove1 = false, downMove1 = false, upmove1 = false;
}
var shootcout = 0, timeh_ung = 1, comm_no = false, tanknav_chang = 1;// kiem soat hieu ung
function Tankcpanimate() {
    requestAnimFrame(Tankcpanimate);
    if (StartgametankCp1) {
        drawCompetitorTankCP1();
        if (shootcout > 230 && count_die < 2) {
            tankcp.ship.move();
            shootcout++;
        } else if (shootcout < 235) {
//        updateMap();
            shootcout++;
        } else {
            shootcout = 0;
        }
        if (tanknav_chang === 165 && count_die < 2) {
            TankCp1Stop();
            tankStop_senddatatoserver("random", CurrentSesion, "tank1", 0, 0, 0, 0, xstop1, ystop1);
            tanknav_chang++;
        } else if (tanknav_chang < 345) {
            tanknav_chang++;
        } else {
            tanknav_chang = 0;
        }

        tankcp.ship.bulletPool.animate();//list bullet of ship
    }
}
function TankCPShip() {
    this.speed = 1;
    this.bulletPool = new PoolTcp(30);
    this.bulletPool.init();
    this.draw = function() {
//        this.context_cp1.drawImage(imageRepository.spaceship, destX, destY, 30, 30, this.x, this.y, 30, 30);
    };
    this.move = function() {
        if (currentFireTcp) {
            ontargetTcp = false;
            this.fire();
        }
    };
    this.fire = function() {
        if (tankcp_navigation === "up" || tankcp_navigation === "down") {
//            this.bulletPool.get(Xcom1 + 14, Ycom1, 2, tankcp_navigation);
            this.bulletPool.get(Xcom1 + 14, Ycom1 + 14, 6, tankcp_navigation);
        } else {
//            this.bulletPool.get(Xcom1, Ycom1 + 14, 2, tankcp_navigation);
            this.bulletPool.get(Xcom1 + 14, Ycom1 + 14, 6, tankcp_navigation);
        }
    };
}
TankCPShip.prototype = new DrawableTcp();
initTankcp();


