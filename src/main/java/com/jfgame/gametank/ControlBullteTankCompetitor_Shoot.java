/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jfgame.gametank;

import com.jfgame.bean.ChangerMapTankCompetitor;
import com.jfgame.bean.Point;
import static com.jfgame.gametank.TankGame.listuser;
import java.io.IOException;
import java.util.TreeMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.Session;

/**
 *
 * @author Bach
 */
/*ghi nhan su thay doi map
 */
public class ControlBullteTankCompetitor_Shoot implements Runnable {

    private TreeMap<Integer, Point> listPoint_screen = new TreeMap();
    private ChangerMapTankCompetitor cmtc = new ChangerMapTankCompetitor();
    private TreeMap<Integer, Point> listPointMapUp = new TreeMap<>();
    private TreeMap<Integer, Point> listPointMapdown = new TreeMap<>();

    public ControlBullteTankCompetitor_Shoot(TreeMap<Integer, Point> listPoint_screen, ChangerMapTankCompetitor cmtc) {

        this.listPoint_screen = listPoint_screen;
        this.cmtc = cmtc;
    }

    public ControlBullteTankCompetitor_Shoot(ChangerMapTankCompetitor cmtc, TreeMap<Integer, Point> listPoint_screen, TreeMap<Integer, Point> listPointMapUp, TreeMap<Integer, Point> listPointMapdown) {
        try {
            this.cmtc = cmtc;
            this.listPoint_screen = listPoint_screen;

            this.listPointMapUp = listPointMapUp;
            this.listPointMapdown = listPointMapdown;
        } catch (Exception ex) {
            Logger.getLogger(TankGame.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    @Override
    public void run() {
        int keymap = 0, keymap1 = 0, keymap2 = 0;
        try {
            keymap = cmtc.getKey();
            String navigation = cmtc.getNavigation();
            Point p = listPoint_screen.get(keymap);
            String command = "";
//        phai thiet dat lai ca o hai map kia
            if (p != null) {
                p.setObj(0);
                Point p1 = null;
                keymap1 = keymap - 1;
                keymap2 = keymap - 50;
                if (navigation.equalsIgnoreCase("down") || navigation.equalsIgnoreCase("up")) {
                    p1 = listPoint_screen.get(keymap1);
                }
                if (navigation.equalsIgnoreCase("right") || navigation.equalsIgnoreCase("left")) {
                    p1 = listPoint_screen.get(keymap2);
                }
                if (p1 != null) {
                    p1.setObj(0);
                    //  gui map up date den cho no tung doi tuong  
                    command = getCommand(cmtc.getTank());// tank1
                   if( callservice(p, p1, command)){
                       
                   }else{
                      if(!callservice(p, p1, command)){tankNavigation(cmtc.getTank(), cmtc.getX(), cmtc.getY(), cmtc.getNavigation(), cmtc.getSession());} 
                      
                   }
                } else {
                    tankNavigation(cmtc.getTank(), cmtc.getX(), cmtc.getY(), cmtc.getNavigation(), cmtc.getSession());
                    System.out.println("ControlBullteTankCompetitor_Shoot tien hanh dieu huong cho tank vi diem thu 2");

                }
            } else {
                tankNavigation(cmtc.getTank(), cmtc.getX(), cmtc.getY(), cmtc.getNavigation(), cmtc.getSession());
                System.out.println("ControlBullteTankCompetitor_Shoot tien hanh dieu huong cho tank vi diem thu 1");
            }
        } catch (Exception e) {
            Logger.getLogger(ControlBullteTankCompetitor_Shoot.class.getName()).log(Level.SEVERE, null, e);
        }
    }

    private void tankNavigation(String tankname, float x, float y, String nav, String session) {
        try {
            StringBuilder dt = new StringBuilder();
            dt.append("{\"tank\":").append("\"").append(tankname).append("\"").append(",\"x\":").append(x).append(",\"y\":").append(y).append(",\"xend\":").append(500).append(",\"yend\":").append(700)
                    .append(",\"xstop\":").append(x).append(",\"ystop\":").append(y).append(",\"navigation\":\"").append(nav).append("\"").append(",\"session\":\"").append(session).append("\"}tankStop");
            System.out.println("tu tao tankstop de chuyen huong: " + dt.toString());
            TankMove move = new TankMove(dt.toString(), listPoint_screen);
            move.navigation();
        } catch (Exception e) {
            Logger.getLogger(ControlBullteTankCompetitor_Shoot.class.getName()).log(Level.SEVERE, null, e);
        }

    }

    synchronized private boolean callservice(Point p, Point p1, String command) {
        try {
            return sendUpdatematrix(listPoint_screen, cmtc.getSession()) && sendCommandUpdateMatrix_Map(cmtc.getSession(), p, p1, command);
        } catch (Exception e) {
            Logger.getLogger(ControlBullteTankCompetitor_Shoot.class.getName()).log(Level.SEVERE, null, e);
            return false;
        }

    }
// cai nay lam chua thanh cong

    private String getCommand(String tankname) {
        String re = "";
        try {
            switch (tankname) {
                case "tank":
                    re = "cmUpmapUs";
                    break;
                case "tank1":
                    re = "cmUpmapUs";
                    break;
                case "tank2":
                    re = "tank2cmUDmapUs";
                    break;
                case "tank3":
                    re = "tank3cmUDmapUs";
                    break;
            }
        } catch (Exception e) {

        }
        return re;
    }

//    thu nghiem tach chanh tranh cha bo nho
    private boolean sendUpdatematrix(TreeMap<Integer, Point> listPoint, String session) {
        boolean flag = false;
        try {
            movefail(listPoint, session);
        } catch (Exception e) {
            Logger.getLogger(ControlBullteTankCompetitor_Shoot.class.getName()).log(Level.SEVERE, null, e);
            return false;
        }
        return flag;
    }

    private boolean movefail(TreeMap<Integer, Point> listPoint, String session) {
        boolean flag = false;
        try {
            TreeMap<Integer, Point> listPointMapUp = new TreeMap<>();
            TreeMap<Integer, Point> listPointMapdown = new TreeMap<>();
            for (Integer y : listPoint.keySet()) {
                Point p = listPoint.get(y);
                int obj = p.getObj();

                if (obj > 0 && obj != 4 && y <= 1250) {
                    listPointMapUp.put(y, p);
                } else if ((obj > 0 && obj != 4) && y > 1250) {
                    listPointMapdown.put(y, p);
                }
            }
            sendMap(session, listPointMapdown, listPointMapUp);

        } catch (Exception e) {
            Logger.getLogger(ControlBullteTankCompetitor_Shoot.class.getName()).log(Level.SEVERE, null, e);
            return false;
        }
        return flag;
    }

    private boolean sendMap(final String session, final TreeMap<Integer, Point> listPointMapdown, final TreeMap<Integer, Point> listPointMapUp) {
        boolean flag = false;
        try {
            matrix_Map(session, listPointMapUp, "mapUPunmove");
            matrix_Map(session, listPointMapdown, "mapDownunmove");
            matrix_Map(session, listPointMapUp, "tank2mapUPunmove");
            matrix_Map(session, listPointMapdown, "tank2mapDownunmove");
            matrix_Map(session, listPointMapUp, "tank3mapUPunmove");
            matrix_Map(session, listPointMapdown, "tank3mapDownunmove");

        } catch (Exception e) {
            Logger.getLogger(ControlBullteTankCompetitor_Shoot.class.getName()).log(Level.SEVERE, null, e);
            return false;
        }
        return flag;
    }

    private boolean matrix_Map(String userSessiong, TreeMap<Integer, Point> listPoint, String comman) {

        StringBuilder data = new StringBuilder("[");
        try {
            for (Integer key : listPoint.keySet()) {
                Point p = listPoint.get(key);
                float x = p.getX();
                float y = p.getY();
                int k = p.getPosition();
                int obj = p.getObj();
                data.append("{" + "\"pname\":" + "\"").append(k).append("\"" + ",\"x\":").append(x).append(",\"y\":").append(y).append(",\"obj\":\"").append(obj).append("\"").append("},");
            }
            data.append("]");
            int l = data.length();
            data.deleteCharAt(l - 2);
            data.append(comman);//"mapMatrix"
            if (serverSend_dataToClient(data.toString(), userSessiong)) {
                return true;
            } else {
                sendUpdatematrix(listPoint, userSessiong);
                return true;
            }
        } catch (Exception e) {
            Logger.getLogger(ControlBullteTankCompetitor_Shoot.class.getName()).log(Level.SEVERE, null, e);
            return false;
        }

    }

    synchronized private boolean serverSend_dataToClient(String data, String userSession) {
        boolean f = false;
        for (Session usess : listuser) {
            if (usess.getId().equalsIgnoreCase(userSession)) {
                try {
                    usess.getBasicRemote().sendText(data);
                    f = true;
                } catch (IOException ex) {
                    Logger.getLogger(ControlBullteTankCompetitor_Shoot.class.getName()).log(Level.SEVERE, null, ex);
                    return false;
                }
            }
        }
        return f;
    }

    synchronized private boolean sendCommandUpdateMatrix_Map(final String userSessiong, final Point p1, final Point p2, final String comman) {
        boolean f = false;
        StringBuilder data = new StringBuilder("[");
        try {
            data.append("{" + "\"pname\":" + "\"").append(p1.getPosition()).append("\"" + ",\"x\":").append(p1.getX()).append(",\"y\":").append(p1.getY()).append(",\"obj\":\"").append(p1.getObj()).append("\"").append("},");
            data.append("{" + "\"pname\":" + "\"").append(p2.getPosition()).append("\"" + ",\"x\":").append(p2.getX()).append(",\"y\":").append(p2.getY()).append(",\"obj\":\"").append(p2.getObj()).append("\"").append("}");
            data.append("]");
            data.append(comman);
            serverSend_dataToClient(data.toString(), userSessiong);
        } catch (Exception e) {
            Logger.getLogger(ControlBullteTankCompetitor_Shoot.class.getName()).log(Level.SEVERE, null, e);
            return false;
        }
        return f;
    }

}

//                /phai ten hanh dieu huong tro lai cho no
//                 {"tank":"tank1","x":570,"y":179.5,"key":0,"x1":600,"y1":194.5,"key1":0,"navigation":"right","session":"2ee3df3c-478f-4208-8edf-0f53d217c30d"}bombardment

/*
 // dieu khien tank competiotor di tiep sau khi tuong bi ban dieu nay 
 TankMove tankMove = new TankMove(listPoint_screen);// cho nay da thay doi class TankMove nen can em lai ma khi dung
 String command = getCommand(cmtc.getTank(), cmtc.getNavigation());
 if (navigation.equalsIgnoreCase("down")) {
 System.out.println(" cmtc.getTank() = " + cmtc.getTank() + "cmtc.getX(),  " + cmtc.getX() + "   cmtc.getY()" + cmtc.getY() + "  command  " + command + "  Session: " + cmtc.getSession());
 tankMove.moveUp_Down(cmtc.getX(), cmtc.getY(), cmtc.getSession(), command);
 }
 if (navigation.equalsIgnoreCase("right")) {
 tankMove.moveLeft_Right(cmtc.getX(), cmtc.getY(), cmtc.getSession(), command);
 }
 if (navigation.equalsIgnoreCase("left")) {
 tankMove.moveLeft_Right(cmtc.getX(), cmtc.getY(), cmtc.getSession(), command);
 }
 if (navigation.equalsIgnoreCase("up")) {
 tankMove.moveUp_Down(cmtc.getX(), cmtc.getY(), cmtc.getSession(), command);
 }

 private String getCommand(String tankname, String nva) {
 String re = "";
 try {
 switch (tankname) {
 case "tank0":
 switch (nva) {
 case "down":
 re = "mapDOWN";
 break;
 case "up":
 re = "mapUPDOWN";
 break;
 case "right":
 re = "mapRowRight";
 break;
 case "left":
 re = "mapRowleft";
 break;

 }
 break;
 case "tank1":
 switch (nva) {
 case "down":
 re = "1tankMoveDown";
 break;
 case "up":
 re = "1tankMoveUp";
 break;
 case "right":
 re = "1tankMoveRight";
 break;
 case "left":
 re = "1tankMoveLeft";
 break;

 }

 break;
 }

 } catch (Exception e) {
 }
 return re;
 }

 private int getkeymap(TreeMap<Integer, Point> listPoint, float x, float y) {
 int key = 0;
 //        System.out.println("**********TankGame thong bao tim key1 cua diem co x: " + x + " ,y: " + y);
 try {
 for (int k : listPoint.keySet()) {
 Point p = listPoint.get(k);
 if (p.getX() >= x - 5 && p.getX() <= x + 5 && p.getY() >= y - 5 && p.getY() <= y + 5) {
 key = k;
 //                    System.out.println("*************class TankGame key1 tim duoc la :" + k + " obj: " + p.getObj() + "x: " + x + " ,y: " + y);
 }
 }
 } catch (Exception ex) {
 Logger.getLogger(TankGame.class
 .getName()).log(Level.SEVERE, null, ex);
 }
 return key;
 }
 */
/*


 synchronized private boolean sendMap(String session, String tankname) {
 boolean flag = false;
 try {

 if (matrix_Map_pointUpdate(session, listPointMapUp, "mapUPunmove")) {
 if (matrix_Map_pointUpdate(session, listPointMapdown, "mapDownunmove")) {

 }
 }
 if (matrix_Map_pointUpdate(session, listPointMapUp, "tank2mapUPunmove")) {
 if (matrix_Map_pointUpdate(session, listPointMapdown, "tank2mapDownunmove")) {
 }
 }

 } catch (Exception ex) {
 Logger.getLogger(ControlBullteTankCompetitor_Shoot.class.getName()).log(Level.SEVERE, null, ex);
 }
 return flag;
 }

 synchronized private boolean matrix_Map_pointUpdate(String userSession, TreeMap<Integer, Point> listPoint, String comman) {
 boolean f = false;
 StringBuilder data = new StringBuilder("[");
 try {
 for (Integer key : listPoint.keySet()) {
 Point p = listPoint.get(key);
 float x = p.getX();
 float y = p.getY();
 int k = p.getPosition();
 int obj = p.getObj();
 data.append("{" + "\"pname\":" + "\"").append(k).append("\"" + ",\"x\":").append(x).append(",\"y\":").append(y).append(",\"obj\":\"").append(obj).append("\"").append("},");
 }
 data.append("]");
 int l = data.length();
 data.deleteCharAt(l - 2);
 data.append(comman);//"mapMatrix"
 if (serverSend_dataToClient(data.toString(), userSession)) {
 f = true;
 }
 } catch (Exception e) {
 Logger.getLogger(ControlBullteTankCompetitor_Shoot.class.getName()).log(Level.SEVERE, null, e);
 }
 return f;
 }

 */
