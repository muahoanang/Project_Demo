
var wsUri = "ws://" + document.location.host + document.location.pathname + "endpoint";
if (window.location.protocol == "https:") {
    wsUri = "wss://" + document.location.host + document.location.pathname + "endpoint";
}
var websocket;
try {
    websocket = new WebSocket(wsUri);
} catch (e) {
    console.log(e.toString());
}
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
var Compenva = "down";
var Startgame = false;
var tankCompetitorFrie = false;
var bgCanvas = document.getElementById("background");
var context = bgCanvas.getContext('2d');

//het han nhan mess
function onError(evt) {
    websocket = new WebSocket(wsUri);
    sendUserLoginText(player + "login");
}

websocket.onopen = function(evt) {
    onOpen(evt);
};
websocket.onmessage = function(evt) {
    onMessage(evt);
};
websocket.onclose = function(evt) {
////    websocket = new WebSocket(wsUri);
    websocket.close();
 
};
websocket.onerror = function(evt) {
    onError(evt);
};

function onOpen() {
    document.getElementById("messstatus").innerHTML = ("Connected to " + wsUri);
}

var player = JSON.stringify({
    "userName": "userDemo",
    "userID": "",
    "roomId": 1,
    "status": 0,
    "tableID": "",
    "sessionID": "",
    "onlyMessage": false,
    "contentMessage": "null"
});
var CurrentSesion = "";
function currentUser(ms) {
    var lg = ms.indexOf("userCurrent");
    var source = "userCurrent";
    var sdata = ms.substring(0, lg);
    var user = JSON.parse(sdata);
//    console.log("function currentUser Data RECEIVED when " + source + " : " + sdata);
    player.userName = user[0].userName;
    CurrentSesion = (user[0].sessionID);
//    console.log(CurrentSesion);
}
function sendText(json) {
    if (websocket.readyState == 1) {
        websocket.send(json);
//        console.log("sen data:" + json);
    } else {
        websocket.onopen = function(e) {
            websocket.send(json);
//            console.log("sen data:" + json);
        };
    }
}
;

function onMessage(evt) {
    ms = evt.data;
    parseComander(ms);
    switch (option)
    {
        case 1:
            {
                var lg = ms.indexOf("userCurrent");
                currentUser(ms);
            }
            break;
        case 2:
            {
                lg = ms.indexOf("drawtankMove");
                var tabledata = ms.substring(0, lg);
//                drawTankMove(tabledata);
            }
            break;
        case 3:
            {
                createmap(ms);
                draw_Screen();
            }
            break;
        case 4:
            {// cap nhat maptre
                setmapUnmovetank0(ms);
            }
            break;
        case 6:
            {// cap nhat map phia duoi
                setmapDownunmovetank0(ms);
            }
            break;
        case 101:
            {// cap nhat map phia duoi
                mapUpdatefortank0(ms);
            }
            break;
        case 5:
            {
                createCompetitor(ms);
            }
            break;


        case 25:
            {
                console.log(" case 25 ma nhan duoc khi tao xe thu 2:" + ms);
                createCompetitorTankCP2(ms);
                // movedown(ms);
//               
            }
            break;
        case 13:
            {
                console.log("case 13ma nhan duoc khi tao xe thu 1 " + ms);
                createCompetitorTankCP1(ms);
                // movedown(ms);
//               
            }
            break;


        case 7:
            {//de khoi phuc khi gap su co dung xe giua chung
                console.log("nhan duoc loi tu server xe bi tac tu: " + ms);
                tank2Stop_senddatatoserver(ms);
            }
            break;
            //dieu khien xe tank 0
        case 8:
            {
//                console.log(ms);
                moveleft(ms, "tank");
            }
            break;
        case 9:
            {
//                console.log(ms);
                moveright(ms);
            }
            break;
        case 10:
            {
//                console.log(ms);
                updown(ms);
            }
            break;
        case 11:
            {
//                console.log(ms);
                movedown(ms);
            }
            break;
        case 12:
            {
                console.log(ms);
                // movedown(ms);
            }
            break;
// dieu khien tank 1
        case 14:
            {
//                console.log(ms);
                getPositionDownMoveTk1(ms, "tank1");
            }
            break;
        case 15:
            {// tank1 di sang trai
//                console.log("gameprocess nhan duoc  o ham danh cho tank1 co case 15: "+ms);
                moveleft_tankCp1(ms, "tank1");
            }
            break;
        case 16:
            {
                moveright_tank1Cp(ms);
            }
            break;
        case 17:
            {
                updown_tank1Cp(ms);
            }
            break;
        case 51:
            {
                tankshootgo(ms);
            }
            break;
// dieu khien tank 2
        case 18:
            {
                moveleft_tankCp2(ms, "tank2");
            }
            break;
        case 19:
            {
                moveright_tank2Cp(ms);
            }
            break;
        case 20:
            {
                updown_tank2Cp(ms);
            }
            break;
        case 21:
            {
                getPositionDownMoveTk2(ms, "tank2");// 
            }
            break;
        case 22:
            {
                settank2mapUPunmove(ms, "tank2");//tank2mapUPunmove 
            }
            break;
        case 23:
            {
                settank2mapDownunmove(ms, "tank2");// //             tank2mapDownunmove
            }
            break;
        case 24:
            {
                mapUpdateforUS_tank2(ms);// //             Update for two point bi ban
            }
            break;

        case 26:
            {
                tankshootgo2(ms);
            }
            break;
            // dieu khien xe tank thu3
        case 30:
            {
                console.log("nhan lenh tao tank thu3 case30:" + ms);
                createCompetitorTankCP3(ms);
            }
            break;
        case 31:
            {
                moveleft_tankCp3(ms, "tank3");
            }
            break;
        case 32:
            {
                moveright_tank3Cp(ms);
            }
            break;
        case 33:
            {
                updown_tank3Cp(ms);
            }
            break;
        case 34:
            {
                getPositionDownMoveTk3(ms, "tank3");
            }
            break;
        case 35:
            {
                mapUpdateforUS_tank3(ms);  //tank3cmUDmapUs;// cap nhat hai diem vua bi ban
            }
            break;

        case 36:
            {
                settank3mapUPunmove(ms, "tank3");//tank2mapUPunmove 
            }
            break;
        case 37:
            {
                settank3mapDownunmove(ms, "tank3");  //tank3cmUDmapUs;// cap nhat hai diem vua bi ban
            }
            break;

// cap nhap map
        case 70:
            {
                mapUnmove(ms);
            }
            break;
        case 71:
            {
                mapDownunmove(ms);
            }
            break;
        case 72:
            {
//                console.log(ms);
                mapUpdateforUS(ms);
            }
            break;
        case 73:
            {
                console.log(ms);
            }
            break;
        default:
    }
}

function parseComander(message) {
    var lg = message.indexOf("userCurrent");
    if (lg !== -1) {
        return option = 1;
    }
    lg = message.indexOf("mapMatrix");
    if (lg !== -1) {
        return   option = 3;
    }
    lg = message.indexOf("drawtankMove");
    if (lg !== -1) {
        return option = 2;
    }

// doan nay nhan lenh tao competitor
    lg = message.indexOf("Competitor_down");
    if (lg !== -1) {
        return   option = 5;
    }
    lg = message.indexOf("Competitor_up");
    if (lg !== -1) {
        return   option = 5;
    }
    lg = message.indexOf("Competitor_right");
    if (lg !== -1) {
        return   option = 5;
    }
    lg = message.indexOf("Competitor_left");
    if (lg !== -1) {
        return   option = 5;
    }
///
    ///
    // doan nay nhan lenh tao competitor thu2
    lg = message.indexOf("2xetank_down");
    if (lg !== -1) {
        return   option = 25;
    }
    lg = message.indexOf("2xetank_up");
    if (lg !== -1) {
        return   option = 25;
    }
    lg = message.indexOf("2xetank_right");
    if (lg !== -1) {
        return   option = 25;
    }
    lg = message.indexOf("2xetank_left");
    if (lg !== -1) {
        return   option = 25;
    }
//
    // doan nay nhan lenh tao competitor thu1
    lg = message.indexOf("xetank1_down");
    if (lg !== -1) {
        return   option = 13;
    }
    lg = message.indexOf("xetank1_up");
    if (lg !== -1) {
        return   option = 13;
    }
    lg = message.indexOf("xetank1_right");
    if (lg !== -1) {
        return   option = 13;
    }
    lg = message.indexOf("xetank1_left");
    if (lg !== -1) {
        return   option = 13;
    }

////xe tank thu 3
    // doan nay nhan lenh tao competitor thu3
    lg = message.indexOf("3xetank_down");
    if (lg !== -1) {
        return   option = 30;
    }
    lg = message.indexOf("3xetank_up");
    if (lg !== -1) {
        return   option = 30;
    }
    lg = message.indexOf("3xetank_right");
    if (lg !== -1) {
        return   option = 30;
    }
    lg = message.indexOf("3xetank_left");
    if (lg !== -1) {
        return   option = 30;
    }
/////
    lg = message.indexOf("tank0mapUPunmove");
    if (lg !== -1) {
        return   option = 4;
    }
    lg = message.indexOf("tank0mapDownunmove");// tam thoi chu dung
    if (lg !== -1) {
        return   option = 6;
    }
    lg = message.indexOf("tank0UpTowpoint");
    if (lg !== -1) {
        return   option = 101;
    }

// nhan lenh dieu huong cho xe thu 0
    lg = message.indexOf("ErrorTankCompetitor");
    if (lg !== -1) {
        return   option = 7;
    }
    lg = message.indexOf("mapRowleft");
    if (lg !== -1) {
        return   option = 8;
    }

    lg = message.indexOf("mapRowRight");
    if (lg !== -1) {
        return   option = 9;
    }
    lg = message.indexOf("mapUPDOWN");
    if (lg !== -1) {
        return   option = 10;
    }

    lg = message.indexOf("mapDOWN");
    if (lg !== -1) {
        return   option = 11;
    }
    lg = message.indexOf("commandtoTank");
    if (lg !== -1) {
        return   option = 12;
    }


/// nhan lenh dieu huong cho tank 1
    lg = message.indexOf("Tk1Compe_down");
    if (lg !== -1) {
        return   option = 14;
    }
    lg = message.indexOf("1tankMoveLeft");
    if (lg !== -1) {
        return   option = 15;
    }

    lg = message.indexOf("1tankMoveRight");
    if (lg !== -1) {
        return   option = 16;
    }
    lg = message.indexOf("1tankMoveUp");
    if (lg !== -1) {
        return   option = 17;
    }

    lg = message.indexOf("1tankMoveDown");
    if (lg !== -1) {
        return   option = 14;
    }

// xe tank thu 2tankMoveLeft
    lg = message.indexOf("2tankMoveLeft");//lenh sang trai
    if (lg !== -1) {
        return   option = 18;
    }

    lg = message.indexOf("2tankMoveRight");//lenh sang phai
    if (lg !== -1) {
        return   option = 19;
    }
    lg = message.indexOf("2tankMoveUp");// lenh di len
    if (lg !== -1) {
        return   option = 20;
    }

    lg = message.indexOf("2tankMoveDown");// lenh di xuong
    if (lg !== -1) {
        return   option = 21;
    }

    lg = message.indexOf("2TkCompe_down");// tao tank2 di xuong
    if (lg !== -1) {
        return   option = 21;
    }

    lg = message.indexOf("tank2mapUPunmove");//nhan update mapcho xe 2
    if (lg !== -1) {
        return   option = 22;
    }
    lg = message.indexOf("tank2mapDownunmove");// nhan update mapcho xe 2
    if (lg !== -1) {
        return   option = 23;
    }
    lg = message.indexOf("tank2cmUDmapUs");// nhan update mapcho xe 2
    if (lg !== -1) {
        return   option = 24;
    }
    lg = message.indexOf("2tankMoveFireGo");// tao tank2 di xuong
    if (lg !== -1) {
        return   option = 26;
    }
    // dieu huong xe thu 3

    lg = message.indexOf("3tankMoveLeft");//lenh sang trai
    if (lg !== -1) {
        return   option = 31;
    }

    lg = message.indexOf("3tankMoveRight");//lenh sang phai
    if (lg !== -1) {
        return   option = 32;
    }
    lg = message.indexOf("3tankMoveUp");// lenh di len
    if (lg !== -1) {
        return   option = 33;
    }

    lg = message.indexOf("3tankMoveDown");// lenh di xuong
    if (lg !== -1) {
        return   option = 34;
    }
    lg = message.indexOf("tank3cmUDmapUs");// lenh di xuong
    if (lg !== -1) {
        return   option = 35;
    }

    lg = message.indexOf("tank3mapUPunmove");// cap nhap map phan tren
    if (lg !== -1) {
        return   option = 36;
    }
    lg = message.indexOf("tank3mapDownunmove");// cap nhat map phan duoi
    if (lg !== -1) {
        return   option = 37;
    }



    lg = message.indexOf("mapUPunmove");// map un move
    if (lg !== -1) {
        return   option = 70;
    }
    lg = message.indexOf("mapDownunmove");// map un move
    if (lg !== -1) {
        return   option = 71;
    }
    lg = message.indexOf("cmUpmapUs");// map tank user update
    if (lg !== -1) {
        return   option = 72;
    }
    lg = message.indexOf("You_Ok");// map tank user update
    if (lg !== -1) {
        return   option = 73;
    }


    lg = message.indexOf("1tankMoveFireGo");// map tank user update
    if (lg !== -1) {
        return   option = 51;
    }
//    da dung 100
}
var cmUpmapUsplayer = JSON.stringify({
    "userName": "userDemo",
    "userID": "",
    "roomId": 1,
    "status": 0,
    "tableID": "",
    "sessionID": "",
    "onlyMessage": false,
    "contentMessage": "null"
});

function sendUserLoginText(json) {
    if (websocket.readyState == 1) {
        websocket.send(json);
        console.log("sen data:" + json);
    } else {
        websocket.onopen = function(e) {
            websocket.send(json);
            console.log("sen data:" + json);
        };
    }
}
;
function  tank2Stop_senddatatoserver(mess) {
    var navigation, tank, xstop, ystop;
    var lg = mess.indexOf("ErrorTankCompetitor");
    var da = "";
    if (lg > 0) {
        da = mess.subString(0, lg);
        var data = JSON.parse(da);
        navigation = data[0].navigation;
        xstop = data[0].xstop;
        ystop = data[0].ystop;
        tank = data[0].tank;
    }
    var tankposition = JSON.stringify({
        "tank": tank,
        "xstop": xstop,
        "ystop": ystop,
        "navigation": navigation,
        "session": CurrentSesion

    });
    sendText(tankposition + "tankStop");
}

// cho tank 0
var psUP = "";
var psDown = "";
var psUPtank = "", psDowntank = "";
function setmapUnmovetank0(message) {
    var lg = message.indexOf("tank0mapUPunmove");
    if (lg > 0) {
        var jsonObj = message.substring(0, lg);
//        console.log("Ban do nhan duoc tu setmapUnmovetank0  : " + jsonObj);
        //loock_unloock("mapup");
//        psUPtank = JSON.parse(jsonObj);
        psUP = JSON.parse(jsonObj);
    }
//updateMap() ;
}
function setmapDownunmovetank0(message) {
    var lg = message.indexOf("tank0mapDownunmove");
    if (lg > 0) {
        var jsonObj = message.substring(0, lg);
        // loock_unloock("mapdown");
//        console.log("tank0mapDownunmove Ban do nhan duoc tu ve o phan phia duoi : " + jsonObj);
//        psDowntank = JSON.parse(jsonObj);
        psDown = JSON.parse(jsonObj);
    }
}
function mapUpdatefortank0(message) {
    var lg = message.indexOf("tank0UpTowpoint");
    if (lg > 0) {
        var jsonObj = message.substring(0, lg);
//        console.log("Ban do nhan duoc tu cap nhat map sau khi ban vao chuong nai vat mapUpdateforUS : " + jsonObj);
        var ps = JSON.parse(jsonObj);
        for (i = 0; i < ps.length; i++) {
            context.clearRect(ps[i].x, ps[i].y, 15, 15);
        }
    }
}
// phan nay cho tank1 
var mapup = false;// dieu khien viec cap nhat map
var mapdown = false;
function loock_unloock(comm) {
    switch (comm) {
        case"mapup":
            mapup = true;
            mapdown = false;
            break;
        case"mapdown":
            mapup = false;
            mapdown = true;
            break;
    }
}
//var psMD;
function mapUnmove(message) {
    var lg = message.indexOf("mapUPunmove");
    if (lg > 0) {
        var jsonObj = message.substring(0, lg);
//    console.log("Ban do nhan duoc tu mapUPunmove  : " + jsonObj);
        loock_unloock("mapup");
        psUP = JSON.parse(jsonObj);
    }
//updateMap() ;
}
function mapDownunmove(message) {
    var lg = message.indexOf("mapDownunmove");
    if (lg > 0) {
        var jsonObj = message.substring(0, lg);
        loock_unloock("mapdown");
//        console.log("mapDownunmove Ban do nhan duoc tu ve o phan phia duoi : " + jsonObj);
        psDown = JSON.parse(jsonObj);
    }
}

function updateMap_UP_tank1() {
    if (psUP !== "") {

        for (i = 0; i < psUP.length; i++) {
            if (psUP[i].obj == 1) {

                context.drawImage(img, 0, 0, 15, 15, psUP[i].x, psUP[i].y, 15, 15);
            }
            else if (psUP[i].obj == 2) {
//            context.drawImage(img, 895, 15, 17, 17, psUP[i].x, psUP[i].y, 17, 17);
                context.drawImage(img, 90, 0, 15, 15, psUP[i].x, psUP[i].y, 15, 15);
            } else if (psUP[i].obj == 3) {
                context.drawImage(img, 30, 0, 15, 15, psUP[i].x, psUP[i].y, 15, 15);
            } else if (psUP[i].obj == 4) {
                context.drawImage(img, 120, 0, 15, 15, psUP[i].x, psUP[i].y, 15, 15);
            } else if (psUP[i].obj == 5) {
                context.drawImage(img1, 895, 70, 35, 40, psUP[i].x, psUP[i].y, 35, 40);
            }
        }
    }
}

function updateMap_Down_tank1() {
    if (psDown !== "") {
        for (i = 0; i < psDown.length; i++) {
            if (psDown[i].obj == 1) {

                context.drawImage(img, 0, 0, 15, 15, psDown[i].x, psDown[i].y, 15, 15);
            }
            else if (psDown[i].obj == 2) {
//            context.drawImage(img, 895, 15, 17, 17, psDown[i].x, psDown[i].y, 17, 17);
                context.drawImage(img, 90, 0, 15, 15, psDown[i].x, psDown[i].y, 15, 15);
            } else if (psDown[i].obj == 3) {
                context.drawImage(img, 30, 0, 15, 15, psDown[i].x, psDown[i].y, 15, 15);
            } else if (psDown[i].obj == 4) {
                context.drawImage(img, 120, 0, 15, 15, psDown[i].x, psDown[i].y, 15, 15);
            } else if (psDown[i].obj == 5) {
                context.drawImage(img1, 895, 70, 35, 40, psDown[i].x, psDown[i].y, 35, 40);
            }
        }
    }
}

function mapUpdateforUS(message) {
    var lg = message.indexOf("cmUpmapUs");
    var jsonObj = message.substring(0, lg);
//    console.log("Ban do nhan duoc tu mapUpdateforUS : " + jsonObj);
    var ps = JSON.parse(jsonObj);
    for (i = 0; i < ps.length; i++) {
        context.clearRect(ps[i].x, ps[i].y, 15, 15);
    }
}
/// thu cap nhap map cho tankCP2

var psUP_tank2 = "";
var psDown_tank2 = "";
//var psMD;
function  settank2mapUPunmove(message, tank2) {
//    console.log(" tank2mapUPunmove Du lieu nhan tu viec cap nhap map cua Tank2" + message);
    var lg = message.indexOf("tank2mapUPunmove");
    if (lg > 0) {
        var jsonObj = message.substring(0, lg);
        loock_unloock("mapup");
//    console.log("Ban do nhan duoc tu mapUPunmove  : " + jsonObj);
//        psUP_tank2 = JSON.parse(jsonObj);
        psUP = JSON.parse(jsonObj);
    } else {
    }
//updateMap_tank2();
}
function settank2mapDownunmove(message, tank2) {
    var lg = message.indexOf("tank2mapDownunmove");
//    console.log(" -----------tank2mapDownunmoveDu lieu nhan tu viec cap nhap map cua Tank2" + message);
    if (lg > 0) {
        var jsonObj = message.substring(0, lg);
//    console.log("mapDownunmove Ban do nhan duoc tu ve o phan phia duoi : " + jsonObj);
        loock_unloock("mapdown");
//        psDown_tank2 = JSON.parse(jsonObj);
        psDown = JSON.parse(jsonObj);
    } else {
    }
//updateMap_tank2();
}

function mapUpdateforUS_tank2(message) {
    var lg = message.indexOf("tank2cmUDmapUs");
//    console.log(" -----------mapUpdateforUS_tank3  lieu nhan tu viec cap nhap 2 diem vua ban map cua Tank3" + message);
    if (lg > 0) {
        var jsonObj = message.substring(0, lg);
//    console.log("Ban do nhan duoc tu mapUpdateforUS : " + jsonObj);
        var ps = JSON.parse(jsonObj);
        for (i = 0; i < ps.length; i++) {
            context.clearRect(ps[i].x, ps[i].y, 15, 15);
        }
    } else {
        console.log("mapUpdateforUS_tank3 du lieu gui xuong co van de");
    }
}
var timeUpdate = 0, timedraw = 0;
var drawmap = true;
// tank thu 3

function mapUpdateforUS_tank3(message) {
    var lg = message.indexOf("tank3cmUDmapUs");
//    console.log(" -----------mapUpdateforUS_tank3  lieu nhan tu viec cap nhap 2 diem vua ban map cua Tank3" + message);
    if (lg > 0) {
        var jsonObj = message.substring(0, lg);
//    console.log("Ban do nhan duoc tu mapUpdateforUS : " + jsonObj);
        var ps = JSON.parse(jsonObj);
        for (i = 0; i < ps.length; i++) {
            context.clearRect(ps[i].x, ps[i].y, 15, 15);
        }
    } else {
        console.log("mapUpdateforUS_tank3 du lieu gui xuong co van de");
    }
}

var psUP_tank3 = "";
var psDown_tank3 = "";
//var psMD;
function  settank3mapUPunmove(message, tank2) {
//    console.log(" settank3mapDownunmove Du lieu nhan tu viec cap nhap map cua Tank3" + message);
    var lg = message.indexOf("tank3mapUPunmove");
    if (lg > 0) {
        var jsonObj = message.substring(0, lg);
        loock_unloock("mapup");
//    console.log("Ban do nhan duoc tu mapUPunmove  : " + jsonObj);
//        psUP_tank3 = JSON.parse(jsonObj);
        psUP = JSON.parse(jsonObj);
    } else {

    }
//updateMap_tank2();
}
function settank3mapDownunmove(message, tank2) {
    var lg = message.indexOf("tank3mapDownunmove");
//    console.log(" -----------settank3mapDownunmove lieu nhan tu viec cap nhap map cua Tank3" + message);
    if (lg > 0) {
        var jsonObj = message.substring(0, lg);
//    console.log("mapDownunmove Ban do nhan duoc tu ve o phan phia duoi : " + jsonObj);
        loock_unloock("mapdown");
//        psDown_tank3 = JSON.parse(jsonObj);
        psDown = JSON.parse(jsonObj);
    } else {

    }
//updateMap_tank2();
}



function mapUpdate() {
    window.requestAnimFrame(mapUpdate);
//    if (mapup) {
//        timeUpdate++;
//        updateMap_UP_tank1();
//        updateMap_UP_tank2();
//        updateMap_UP_tank3();
//        if (timeUpdate > 40) {
//            mapup = false;
//            timeUpdate = 0;
//        }
//    }
//    if (mapdown) {
//        timeUpdate++;
//        updateMap_Down_tank1();
//        updateMap_Down_tank2();
//        updateMap_Down_tank3();
//        if (timeUpdate > 40) {
//            mapdown = false;
//            timeUpdate = 0;
//        }
//    }
    if (drawmap && Startgame) {
        timedraw++;
        draw_Screen();
        if (timedraw > 15) {
            drawmap = false;
            timedraw = 0;
        }
    }
}
mapUpdate();
