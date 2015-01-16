var tankCp = {
    ystop1: 0,
    xstop1: 0,
    sangphai1: true,
    sangtrai1: true,
    len: true,
    xuong: true,
    fristsMove1: true,
    tankstop: true,
    Xmax1: 0,
    tankCompetitorFrie1: true,
    keymap1_1: 0,
    dulieu1: "",
    Ymax1: 0,
    le1: 0,
    x1: 0, y1: 0,
    Compenva1: "down",
    Ycom1: 0,
    Xcom1: 0, yend1: 0, xend1: 0, unmove1: "",
    createCompetitorTankCP1: function(message) {
        lg = "";
        jsonObj = "";
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
                    }
                }
            }

        }
//    MessCopetitor=jsonObj;
//    console.log(" createCompetitor Nhan duoc du lieu khoi tao tank doi thu : " + message);
//    console.log(" createCompetitor da su li lieu nhan duoc tu khoi tao tank doi thu : " + jsonObj);
        dulieu1 = JSON.parse(jsonObj);
        Xcom1 = x1 = dulieu1[0].x; //vi tri phai ve
        Ycom1 = y1 = dulieu1[0].y;
        xend1 = dulieu1[0].xend;
        yend1 = dulieu1[0].yend;
        Compenva1 = dulieu1[0].navigation;
        context.drawImage(imageRepository.no, 63, 0, 30, 30, Xcom1, Ycom1, 30, 30);
        console.log(" createCompetitorTankCP1 hien tai dang lam theo doi tuong vi tri khoi tao tankdoi thu ca vi tri quan trong Xcom, Ycom, Compenva1 : " + Xcom1, Ycom1, Compenva1);
    },
    drawCompetitorTankCP1: function() {
        if (Compenva1 === "down") {
            if (fristsMove1 && MoveY_tk1()) {
                console.log("ham drawCompetitorTankCP1 nay cho xe tank 1 di xuong");
                tankStop_senddatatoserver("down", CurrentSesion, "tank1");
                fristsMove1 = false;
//            if (tankCompetitorFrie1) {
//                if (drawCompetitorBullettank1(xstop1, "down")) {// ban di tiep
////                    tankFire_senddataChangerMap(keymap1_1, "down", CurrentSesion); // thay doi map
//                    tankStop_senddatatoserver("right", CurrentSesion);
//                    fristsMove1 = false;
//                }
//            }

            }


//        if (leftmove) {
//            if (MoveXleft()) {
//                if (drawCompetitorBullet(xstop1, "left")) {
//                    tankFire_senddataChangerMap(keymap1_1, "left", CurrentSesion);// thay doi map
//                    leftmove = false;
//                }
//            }
//        }
//        if (rightmove) {
//            if (MoveXRight()) {
//                if (drawCompetitorBullet(xstop1, "right")) {
//                    tankFire_senddataChangerMap(keymap1_1, "right", CurrentSesion);// thay doi map
//                    rightmove = false;
//                }
//                tankStop_senddatatoserver("right", CurrentSesion);
//            }
//        }
////
//        if (upmove) {
//            if (MoveUp()) {
////                tankStop_senddatatoserver("up", CurrentSesion);
//                tankStop_senddatatoserver("random", CurrentSesion);
//            }
//        }
//
//        if (downmove) {
//            if (Move_Down()) {
//                if (drawCompetitorBullet(xstop1, "down")) {
//                    tankFire_senddataChangerMap(keymap1_1, "down", CurrentSesion);
//                    downmove = false;
//                }
////                tankStop_senddatatoserver("down", CurrentSesion);
////                tankStop_senddatatoserver("random", CurrentSesion);
//
//            }
//        }

        }
//    if (Compenva1 === "up") {
//
//        if (upmove) {
//            if (MoveUp()) {
////                tankStop_senddatatoserver("up", CurrentSesion);
////                tankStop_senddatatoserver("random", CurrentSesion);
//                if (drawCompetitorBullet(xstop1, "up")) {
////                    tankFire_senddataChangerMap(keymap1_1, "up", CurrentSesion);
//                    upmove = false;
//                }
//            }
//        }
//
//    }

    },
// dang thuc hien 

    getPositionUnMoveTk1: function(ms, tankkey) {
        var lg = ms.indexOf("Tk1Compe_down");
        var jsonObj = "";
        if (lg > 0) {
            jsonObj = ms.substring(0, lg);
        } else {
            lg = ms.indexOf("2TkCompe_down");
            if (lg > 0) {
                jsonObj = ms.substring(0, lg);
            }
        }

//    console.log("Data RECEIVED getPositionUnMoveTk1 khi nhan lan dau ve competoitor : " + jsonObj);
        unmove1 = JSON.parse(jsonObj);
        le = unmove1.length;
        var l = [];
        var j = 0;
        for (i = 0; i < unmove1.length; i++) {
            if (unmove1[i].obj === 1) {
//            console.log("vi tri dung khi Move down " + unmove1[i].y);
                l[j] = unmove1[i].y;
                j++;
            }

        }
        var min = l[0];
        for (i = 0; i < l.length; i++) {
            if (min > l[i])
                min = l[i];
        }
        // tim key map de ban va pha tuong
        var keymapTam = 0;
        for (i = 0; i < unmove1.length; i++) {
            if (unmove1[i].obj === 1 && unmove1[i].y === min) {
//            console.log("vi tri dung khi Move down " + unmove1[i].y);
                keymapTam = unmove1[i].Point;
                break;
            }

        }
        if (tankkey === "tank1") {
            Ymax1 = min - 30;
            keymap1_1 = keymapTam;
        }
        if (tankkey === "tank2") {
            Ymax2 = min - 30;
            keymap1_1_2 = keymapTam;
        }

        console.log("ham  getPositionUnMoveTk1 nhan duoc du lieu Ymax khi Move down:" + min + " ,");
        fristsMove1 = true;
    },
    MoveY_tk1: function() {// ham nay can cai tien
        if (fristsMove1) {
            if (Ycom1 > Ymax1 || Ycom1 >= 720) {
                xstop1 = Xcom1;
                ystop1 = Ycom1;
                return true;
            }
            Ycom1 += 1;
            if (Ycom1 <= Ymax1) {
                context.clearRect(Xcom1, Ycom1, 31, 31);
                context.drawImage(imageRepository.no, 63, 0, 30, 30, Xcom1, Ycom1, 30, 30);
                document.getElementById("mess").innerHTML = "ham MoveY_tk1 cho truong hop dau tien Ycom " + Ycom1 + " Xcom " + Xcom1 + "  Ymax: " + Ymax1;
            }

        }
    }
};