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

function initTankcp3() {
    if (tankcp3.init())
        tankcp3.start();
}
var cvtankCP3 = document.getElementById("tankCP3");
var context_cp3 = cvtankCP3.getContext('2d');
var tankcp3 = new GameTankCP3();
var dulieu3;
var Ymax3 = 0;
var le1 = 0;
var x3, y3;
var Compenva3 = "down";
var Ycom3 = 0, Xcom3 = 0, Xmax3 = 0, ystop3 = 0, xstop3 = 0;
var sangphai3 = false, sangtrai3 = true;
var len = true;
var len3 = false, upmove3 = false, downMove3 = false, count_die3 = 0;
var leftmove3 = false, rightmove3 = false, tankcp_navigation3;
var tankstop = true;
var tankCompetitorFrie1 = true, StartgametankCp3 = false;
var keymap1_3 = 0, x3, y3, xend3, yend3;// nhu nhung diem du phong

function createCompetitorTankCP3(message) {
    var lg = "";
    var jsonObj = "";
    lg = message.indexOf("3xetank_down");
    if (lg > 0) {
        jsonObj = message.substring(0, lg);
    } else {
        lg = message.indexOf("3xetank_right");
        if (lg > 0) {
            jsonObj = message.substring(0, lg);
        } else {
            lg = message.indexOf("3xetank_left");
            if (lg > 0) {
                jsonObj = message.substring(0, lg);
            } else {
                lg = message.indexOf("3xetank_up");
                if (lg > 0) {
                    jsonObj = message.substring(0, lg);
                } else {
                    sendRequestCreateTank("tank3", 570, 0, 3);
                    return false;
                }
            }
        }

    }
    dulieu3 = JSON.parse(jsonObj);
    Xcom3 = x3 = dulieu3[0].x; //vi tri phai ve
    Ycom3 = y3 = dulieu3[0].y;
    xend3 = dulieu3[0].xend;
    yend3 = dulieu3[0].yend;
    StartgametankCp3 = true;
}
/* 
 * ham kich ban cho xe tank no di lai la o day
 */

function drawCompetitorTankCP3() {

    if (downMove3 && MoveY_tk3_Down()) {
        tankCP3Stop_senddatatoserver("down", CurrentSesion, "tank3", x3, y3, xend3, yend3, xstop3, ystop3);
        downMove3 = false;
    }
    if (leftmove3 && Tank3MoveXleft()) {
        tankCP3Stop_senddatatoserver("left", CurrentSesion, "tank3", x3, y3, xend3, yend3, xstop3, ystop3);
        leftmove3 = false;
    }
    if (rightmove3 && MoveXRight_tank3Cp()) {
        tankCP3Stop_senddatatoserver("right", CurrentSesion, "tank3", x3, y3, xend3, yend3, xstop3, ystop3);
        rightmove3 = false;
    }
    if (upmove3 && MoveUp_tank3Cp()) {
        tankCP3Stop_senddatatoserver("up", CurrentSesion, "tank3", x3, y3, xend3, yend3, xstop3, ystop3);
        upmove3 = false;
    }
}
function  tankCP3Stop_senddatatoserver(navigation, CurrentSesion, tank, x, y, xend, yend, xstop, ystop) {
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
    var kq = random1_3(2000);
    if (kq < 200) {
        tam += kq;
    }  else {
        tam = kq;
    }
    if(isNaN(tam))tam=800;
    for (i = 0; i < tam; i++) {

    }

    sendText(tankposition + "tankStop");

}
function random1_3(max) {
    return Math.random() * max;
}
// dang thuc hien xe tank di xuong
var unmove3;
function  getPositionDownMoveTk3(ms, tankkey) {
    var lg = ms.indexOf("Tk3Compe_down");
    var jsonObj = "";
    if (lg > 0) {
        jsonObj = ms.substring(0, lg);
        move_one_direction3("down");
        tankcp_navigation3 = "down";
    } else {
        lg = ms.indexOf("3tankMoveDown");
        if (lg > 0) {
            jsonObj = ms.substring(0, lg);
            tankcp_navigation3 = "down";
            move_one_direction3("down");
        } else {
            TankCpStop();
            tankStop_senddatatoserver("random", CurrentSesion, "tank3", x3, y3, xend3, yend3, xstop3, ystop3);
            return;
        }
    }
    unmove3 = JSON.parse(jsonObj);
    le = unmove3.length;
    var l = [];
    var j = 0;
    for (i = 0; i < unmove3.length; i++) {
        if (unmove3[i].obj === 1) {
            l[j] = unmove3[i].y;
            j++;
        }
    }
    sortSelect_tank3Cp(l);
    var min = 0;
    for (i = 0; i < l.length; i++) {
        if (l[i] > min) {
            min = l[i];
            break;
        }
    }
    // tim key map de ban va pha tuong
    var keymapTam = 0;
    for (i = 0; i < unmove3.length; i++) {
        if (unmove3[i].obj === 1 && unmove3[i].y === min) {
            keymapTam = unmove3[i].Point;
            break;
        }
    }
    if (min === 0) {
        min = 600;
    }// khong tim duoc diem can truoc mat thii tien thang  xuong
    Ymax3 = min - 30;
    keymap1_3 = keymapTam;
    downMove3 = true;
}

function MoveY_tk3_Down() {// ham nay can cai tien
    if (downMove3) {
        if (Ycom3 > Ymax3 || Ycom3 >= 570) {
            xstop3 = Xcom3;
            ystop3 = Ycom3;
            return true;
        }
        Ycom3 += 1;
        if (Ycom3 <= Ymax3) {
            context_cp3.clearRect(Xcom3, Ycom3, 30, 31);
            context_cp3.drawImage(imageRepository.no, 450, 0, 30, 30, Xcom3, Ycom3, 30, 30);
            document.getElementById("mess").innerHTML = "ham MoveY_tk1 cho truong hop dau tien Ycom " + Ycom3 + " Xcom " + Xcom3 + "  Ymax: " + Ymax3;
        }
    } else {
        return true;
    }
}
// cho no di sang trai
function sortSelect_tank3Cp(l) {
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
//var l = []; //mang luu truu vi tri ma xe tank can kiem tra de dich chuyen cho truog hop sang trai sang phai
function moveleft_tankCp3(mess, tank) {
    //console.log(" moveleft_tankCp3 mapRowleft du lieu nhan duoc " + mess);
    var lg = mess.indexOf("3tankMoveLeft");
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
//           //console.log(" moveleft_tankCp3 mapRowleft, X: " + listP[i].x);
                l[j] = listP[i].x;
                j++;
            }
        }
        if (l.length > 0 && j > 0) {
            sortSelect_tank3Cp(l); // sap xep
// tim dichvar max = 0;
            var max = 0;
            for (i = l.length - 1; i > 0; i--) {
                if (Xcom3 > l[i]) {
                    max = l[i] + 16;
                    break;
                }
            }
            for (i = 0; i < listP.length; i++) {
                if (listP[i].obj === 1 && (listP[i].x + 2 >= Xmax3 - 15 && listP[i].x - 2 <= Xmax3 - 15)) {
//           //console.log("vi tri dung khi Move down " + unmove[i].y);
                    keymaptam = listP[i].Point;
                    break;
                }
            }
            if (tank === "tank3") {
                Xmax3 = max;
                keymap1_3 = keymaptam;
                leftmove3 = true;
                sangtrai3 = true;
            }
        } else {
            Xmax3 = 0;
            keymap1_3 = keymaptam;
            leftmove3 = true;
            sangtrai3 = true;
            //console.log("file  movelefmoveleft_tankCp3 day la truong hop khong vat canvi tri tank se den: " + Xmax3);
        }
        move_one_direction3("left");
        tankcp_navigation3 = "left";
    } else {
        TankCpStop();
        tankStop_senddatatoserver("random", CurrentSesion, "tank3", x3, y3, xend3, yend3, xstop3, ystop3);
    }


}

function Tank3MoveXleft() {
    if (sangtrai3) {
        if (Xmax3 <= Xcom3) {
            Xcom3--;
            context_cp3.clearRect(Xcom3 + 5, Ycom3, 30, 30);
            context_cp3.drawImage(imageRepository.no, 485, 0, 30, 30, Xcom3, Ycom3, 30, 30);
        } else {
            xstop3 = Xcom3;
            ystop3 = Ycom3;
            sangtrai3 = false;
            return true;
        }
    } else {
        return true;
    }
}

//xe tank sang phai
function  moveright_tank3Cp(mess) {
    var lg = mess.indexOf("3tankMoveRight");
    if (lg > 0) {
        var da = mess.substring(0, lg);
        var listP = JSON.parse(da);
        var l = [];
        var j = 0;
        for (i = 0; i < listP.length; i++) {
            if (listP[i].obj === 1) {

                l[j] = listP[i].x;
                j++;
            }

        }
        if (l.length > 0 && j > 0) {
// phai xap sep roi moi lam theo cach chon
            sortSelect_tank3Cp(l);
            if (l[l.length - 1] > Xcom3) {
                for (i = 0; i < l.length; i++) {
                    if (Xcom3 < l[i]) {
                        Xmax3 = l[i] - 31;
                        break;
                    }
                }

            } else {
                Xmax3 = 570;
            }
            for (i = 0; i < listP.length; i++) {
                if (listP[i].obj === 1 && (listP[i].x + 2 >= Xmax3 + 30 && listP[i].x - 2 <= Xmax3 + 30)) {
//           //console.log("vi tri dung khi Move down " + unmove[i].y);
                    keymap1_3 = listP[i].Point;
                    break;
                }

            }
        } else {
            Xmax3 = 570;
        }
        //console.log(" Sang ben phai mapRowRight Xmax3:" + Xmax3 + " , Xcom3: " + Xcom3);
        rightmove3 = true;
        sangphai3 = true; // dat ten nham
        move_one_direction3("right");
        tankcp_navigation3 = "right";
    } else {
        TankCpStop();
        tankStop_senddatatoserver("random", CurrentSesion, "tank3", x3, y3, xend3, yend3, xstop3, ystop3);
    }

}

function MoveXRight_tank3Cp() {
    if (sangphai3) {
        if (Xcom3 < Xmax3) {
            Xcom3++;
            context_cp3.clearRect(Xcom3 - 5, Ycom3, 30, 30);
            context_cp3.drawImage(imageRepository.no, 420, 0, 30, 30, Xcom3, Ycom3, 30, 30);
        } else {
            xstop3 = Xcom3;
            ystop3 = Ycom3;
            sangphai3 = false;
            return true;
        }

    } else {
        return true; // chu y cai can sua khi server su ly viec lua chon 
    }
}

//xe tank di len
function updown_tank3Cp(mess) {
    var lg = mess.indexOf("3tankMoveUp");
    if (lg > 0) {
        var da = mess.substring(0, lg);
        var listP = JSON.parse(da);
        var l = [];
        var j = 0;
        for (i = 0; i < listP.length; i++) {
            if (listP[i].obj === 1) {
//           //console.log("vi tri dung khi Move Up " + listP[i].y);
                l[j] = listP[i].y;
                j++;
            }
        }

        if (l.length > 0 && j > 0) {
            sortSelect_tank3Cp(l);
            var countpoint = 0;
            for (i = l.length - 1; i >= 0; i--) {
                if (l[i] > Ycom3) {
                    countpoint++;
                    continue;
                } else {
                    Ymax3 = l[i] + 18;
                    break;
                }
            }
            if (countpoint === l.length)
                Ymax3 = 0;
        }
//tim key map
        for (i = 0; i < listP.length; i++) {
            if (listP[i].obj === 1 && listP[i].y === Ymax3 - 15) {
//           //console.log("vi tri dung khi Move down " + unmove[i].y);
                keymap1_3 = listP[i].Point;
                break;
            }

        }
        upmove3 = true;
        len3 = true;
        move_one_direction3("up");
        tankcp_navigation3 = "up";
    } else {
        TankCpStop();
        tankStop_senddatatoserver("random", CurrentSesion, "tank3", x3, y3, xend3, yend3, xstop3, ystop3);
    }

}

function MoveUp_tank3Cp() {
    if (len3) {
        if (Ycom3 < Ymax3 || Ycom3 <= 0) {
            xuong3 = false;
            xstop3 = Xcom3;
            ystop3 = Ycom3;
            return true;
        }
        Ycom3 -= 1;
        if (Ycom3 >= Ymax3) {
            context_cp3.clearRect(Xcom3, Ycom3, 30, 31);
            context_cp3.drawImage(imageRepository.no, 386, 0, 30, 30, Xcom3, Ycom3, 30, 30);
        }
        document.getElementById("mess").innerHTML = "Ycom " + Ycom3 + " Xcom " + Xcom3;
    } else {
        return true;
    }
}

var bumtank3 = 0;
function drawCompetitorBullettank3(xfire, CPbulletnavigation) {
    switch (CPbulletnavigation) {
        case "down":
            {
                bumtank3 += 1;
                this.context_cp3.drawImage(imageRepository.no, 230, 262, 25, 25, xstop3 + 5, ystop3 + 25, 25, 25); // anh no
                if (bumtank3 > 20) {
                    context_cp3.clearRect(xfire, ystop3 + 30, 30, 15); // khoang thung cua buc tuong
                    //ve lai xe tank
                    context_cp3.clearRect(Xcom3, Ycom3, 30, 30);
                    context_cp3.drawImage(imageRepository.no, 63, 0, 30, 30, Xcom3, Ycom3 - 5, 30, 30);
                    return true;
                }

            }
            break;
        case "right":
            {
                bumtank3 += 1;
                //ve lai xe tank
                context_cp3.clearRect(Xcom3, Ycom3, 30, 30);
                context_cp3.drawImage(imageRepository.no, 33, 0, 30, 30, Xcom3 - 5, Ycom3, 30, 30);
                this.context_cp3.drawImage(imageRepository.no, 230, 262, 25, 25, xstop3 + 25, ystop3 + 5, 25, 25); // anh no

                if (bumtank3 > 20) {
                    context_cp3.clearRect(xfire + 28, ystop - 1, 17, 31); // khoang thung cua buc tuong
                    return true;
                }
            }
            break;
        case "left":
            {
                bumtank3 += 1; //ve lai xe tank
                context_cp3.clearRect(Xcom3, Ycom3, 30, 30);
                context_cp3.drawImage(imageRepository.no, 100, 0, 30, 30, Xcom3 + 5, Ycom3, 30, 30);
//            ve anh no bum
                this.context_cp3.drawImage(imageRepository.no, 230, 262, 20, 20, xstop3 - 20, ystop3 + 5, 20, 20); // anh no
                if (bumtank3 > 30) {
                    context_cp3.clearRect(xfire - 15, ystop3 - 2, 15, 32); // khoang thung cua buc tuong
                    return true;
                }
            }
            break;
        case "up":
            {
                bumtank3 += 1; //ve lai xe tank
                context_cp3.clearRect(Xcom3, Ycom3 + 10, 30, 30);
                context_cp3.drawImage(imageRepository.no, 0, 0, 30, 30, Xcom3, Ycom3, 30, 30);
//            ve anh no bum
                this.context_cp3.drawImage(imageRepository.no, 230, 262, 20, 20, xstop3 + 5, ystop3 - 20, 20, 20); // anh no
                if (bumtank3 > 30) {
                    context_cp3.clearRect(xfire + 15, ystop3 - 2, 15, 32); // khoang thung cua buc tuong
                    return true;
                }
            }
            break;
    }


}
;
// chi cho phep xe di theo mot huong
function move_one_direction3(nva) {
    switch (nva) {
        case "right":
            leftmove3 = false, rightmove3 = true, sangphai3 = true, upmove3 = false, downMove3 = false;
            break;
        case "left":
            leftmove3 = true, sangtrai3 = true, rightmove3 = false, upmove3 = false, downMove3 = false;
            break;
        case "up":
            leftmove3 = false, rightmove3 = false, upmove3 = true, len3 = true, downMove3 = false;
            break;
        case "down":
            leftmove3 = false, rightmove3 = false, upmove3 = false, downMove3 = true;
            break;
    }
}
function TankCpStop() {
    leftmove3 = false, rightmove3 = false, upmove3 = false, downMove3 = false;
}
// bat dau thu nghiep voi tank tu ddong3 tu dong ban

function DrawableTcp3() {
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


var currentFireTcp3 = true;// cho bat tiep vien khac
var messa = document.getElementById("mess");
var messstatus = document.getElementById("messstatus");
var XbullteTcp3 = 0, YbullteTcp3 = 0, ontargetTcp2 = false;// cai nay de gi nhan dan ban chung dich

function BulletTcp3() {
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
            "tank": "tank3",
            "x": this.x,
            "y": this.y,
            "x1": x1,
            "y1": y1,
            "key": mapkey,
            "key1": mapkey,
            "navigation": navigation,
            "session": CurrentSesion
        });
        sendText(tankposition + "Tank3CPUpdateMap");
    };
    this.draw = function() {
        if (ontargetTcp2) {
            XbullteTcp3 = YbullteTcp3 = -10;
            return true;// dan trung dich
        }
        if (this.navigation === "") {
            this.navigation = "up";
            this.x += 14;
        }
        if (this.navigation === "up") {
            this.y -= this.speed;
            if (this.y <= -5) {
//                this.context_cp3_cp3.drawImage(imageRepository.no, 230, 262, 25, 25, this.x - 12, this.y, 25, 25);
                return true;
            }
            else {
                // kiem tra viec vien dan co cham vao tuong khong
                XbullteTcp3 = this.x, YbullteTcp3 = this.y;
                if (this.check_on_off_effect("up")) {
                    this.tankUserFire_senddataChangerMap("up");
                    return true;
                }

                this.context_cp3_cp3.clearRect(this.x, this.y, 10, 15);
                messa.innerHTML = "x= " + this.x + " y= " + this.y;
                this.context_cp3_cp3.drawImage(imageRepository.bullet, this.x, this.y);
            }

        } else if (this.navigation === "down") {
            this.y += this.speed;
            if (this.y >= 750) {
//                this.context_cp3_cp3.drawImage(imageRepository.no, 230, 262, 25, 25, this.x - 12, this.y, 25, 25);
                return true;
            }
            else {
                XbullteTcp3 = this.x, YbullteTcp3 = this.y;
                if (this.check_on_off_effect("down")) {
                    this.tankUserFire_senddataChangerMap("down");
                    return true;
                }

                this.context_cp3_cp3.clearRect(this.x, this.y - 8, 10, 15);
                messa.innerHTML = "x= " + this.x + " y= " + this.y;
                this.context_cp3_cp3.drawImage(imageRepository.bullet, this.x, this.y);
            }

        } else if (this.navigation === "right") {
            this.x += this.speed;
            if (this.x >= 750) {
//                this.context_cp3_cp3.drawImage(imageRepository.no, 230, 262, 25, 25, this.x, this.y - 12, 25, 25);
                return true;
            }
            else {
                XbullteTcp3 = this.x, YbullteTcp3 = this.y;
                if (this.check_on_off_effect("right")) {
                    this.tankUserFire_senddataChangerMap("right");
                    return true;
                }

                this.context_cp3_cp3.clearRect(this.x - 8, this.y - 1, 10, 15);
                messa.innerHTML = "x= " + this.x + " y= " + this.y;
                this.context_cp3_cp3.drawImage(imageRepository.bullet, this.x, this.y);
            }
        } else if (this.navigation === "left") {
            this.x -= this.speed;
            if (this.x <= 0) {
//                this.context_cp3_cp3.drawImage(imageRepository.no, 230, 262, 25, 25, this.x, this.y - 12, 25, 25);
                return true;
            }
            else {
                XbullteTcp3 = this.x, YbullteTcp3 = this.y;
                if (this.check_on_off_effect("left")) {
                    this.tankUserFire_senddataChangerMap("left");
                    return true;
                }

                this.context_cp3_cp3.clearRect(this.x + 8, this.y, 10, 15);
                messa.innerHTML = "x= " + this.x + " y= " + this.y;
                this.context_cp3_cp3.drawImage(imageRepository.bullet, this.x, this.y);
            }
        }

    };
    this.check_on_off_effect = function(nva) {
        currentFireTcp3 = false;
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
//////        this.context_cp3_cp3.drawImage(imageRepository.no, 230, 262, 25, 25, x , y , 25, 25); // anh no
//        if (l > 10) {
//            this.context_cp3_cp3.clearRect(x, y, 15, 15); // khoang thung cua buc tuong
////            //ve lai xe tank
//////                    context_cp3_cp3.drawImage(imageRepository.no, 63, 0, 30, 30, Xcom2, Ycom2 - 5, 30, 30);
//////                    context_cp3_cp3.clearRect(Xcom2, Ycom2 - 5, 30, 30);
//            l = 0;
//            return true;
//        }
        return true;
//        this.context_cp3_cp3.clearRect(XbullteTcp3, YbullteTcp3 - 16, 15, 15); // khoang thung cua buc tuong
////        l=0;
////        console.log(" this.drawtankUS_Bullet vi tri dan den: " + "X= " + XbullteTcp3, +"Y= " + YbullteTcp3);
//        return true;

    };
    //hieu ung no cho vien dan da cham dich

}
BulletTcp3.prototype = new DrawableTcp3();
function PoolTcp3(maxSize) {
    var size = maxSize; // Max bullets allowed in the pool
    var pool = [];

    /*
     * Populates the pool array with Bullet objects
     */
    this.init = function() {
        for (var i = 0; i < size; i++) {
            // Initalize the bullet object
            var bullet = new BulletTcp3();
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
//lam cham viec cho phep barn tiep
                    var tam;
                    var kq = random1_3(1000);
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
                    currentFireTcp3 = true;// cho bat tiep vien khac
//                    ontargetTcp = false;
                }
            }
            else
                break;
        }
    };

}
function GameTankCP3() {
    this.init = function() {
        // Get the canvas elements
        this.bgCanvas = document.getElementById('background');
        this.shipCanvas = document.getElementById('ship');
        this.mainCanvas = document.getElementById('main');
        if (this.bgCanvas.getContext) {
            this.bgContext = this.bgCanvas.getContext('2d');

            this.mainContext = this.mainCanvas.getContext('2d');
            BulletTcp3.prototype.context_cp3_cp3 = this.mainContext;
            BulletTcp3.prototype.canvasWidth = this.mainCanvas.width;
            BulletTcp3.prototype.canvasHeight = this.mainCanvas.height;

            // Initialize the ship object
            this.ship = new TankCPShip3();
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
        Tankcpanimate3();
    };
}
var shootcout3 = 0, timeh_ung3 = 1, comm_no = false, tanknav_chang3 = 1;// kiem soat hieu ung
function Tankcpanimate3() {
    requestAnimFrame(Tankcpanimate3);
    if (StartgametankCp3) {
        drawCompetitorTankCP3();
        if (shootcout3 > 335 && count_die3 < 2) {
            tankcp3.ship.move();
            shootcout3++;
        } else if (shootcout3 < 338) {
            shootcout3++;
        } else {
            shootcout3 = 0;
        }
        if (tanknav_chang3 > 135 && tanknav_chang3 < 137 && count_die3 < 2) {
            TankCp2Stop();
            tankStop_senddatatoserver("random", CurrentSesion, "tank2", 0, 0, 0, 0, xstop3, ystop3);
            tanknav_chang3++;
        } else if (tanknav_chang3 < 300) {
            tanknav_chang3++;
        } else {
            tanknav_chang3 = 0;
        }
        tankcp3.ship.bulletPool.animate();//list bullet of ship
    }
}
function TankCPShip3() {
    this.speed = 1;
    this.bulletPool = new PoolTcp3(30);
    this.bulletPool.init();
    this.draw = function() {
//        this.context_cp3_cp3.drawImage(imageRepository.spaceship, destX, destY, 30, 30, this.x, this.y, 30, 30);
    };
    this.move = function() {
        if (currentFireTcp3) {
            ontargetTcp = false;
            this.fire();
        }
    };
    this.fire = function() {
        if (tankcp_navigation3 === "up" || tankcp_navigation3 === "down") {
//            this.bulletPool.get(Xcom2 + 14, Ycom2, 2, tankcp_navigation2);
            this.bulletPool.get(Xcom3 + 14, Ycom3 + 14, 4, tankcp_navigation3);
        } else {
//            this.bulletPool.get(Xcom2, Ycom2 + 14, 2, tankcp_navigation2);
            this.bulletPool.get(Xcom3 + 14, Ycom3 + 14, 4, tankcp_navigation3);
        }
    };
}
TankCPShip3.prototype = new DrawableTcp3();
initTankcp3();


