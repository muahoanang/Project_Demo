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
import java.util.Random;
import java.util.TreeMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.Session;

/**
 *
 * @author Bach
 */
/*ghi nhan su thay doi map o truong hop ban di tiep
 */
public class TankCompetitor_Shoot implements Runnable {

    private TreeMap<Integer, Point> listPoint_screen = new TreeMap();
    private ChangerMapTankCompetitor cmtc = new ChangerMapTankCompetitor();
    float xtest, ytest;
    String message;
    String tankname;
    String nva;
    String userSession;

    public TankCompetitor_Shoot(ChangerMapTankCompetitor cmtc, TreeMap<Integer, Point> listPoint_screen, String message) {
        try {
            this.cmtc = cmtc;
            this.listPoint_screen = listPoint_screen;
            this.message = message;
            xtest = cmtc.getX();
            ytest = cmtc.getY();
            nva= cmtc.getNavigation();
            userSession=cmtc.getSession();
        } catch (Exception ex) {
            Logger.getLogger(TankCompetitor_Shoot.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public void run() {
        int keymap = 0, keymap1 = 0, keymap2 = 0;
        keymap = cmtc.getKey();
        String navigation = cmtc.getNavigation();
        try {
            Point p = listPoint_screen.get(keymap);
            if (p != null) {
                p.setObj(0);
                Point p1 = null;
                keymap1 = keymap - 1;
                keymap2 = keymap - 40;
                if (navigation.equalsIgnoreCase("down") || navigation.equalsIgnoreCase("up")) {
                    p1 = listPoint_screen.get(keymap1);
                }
                if (navigation.equalsIgnoreCase("right") || navigation.equalsIgnoreCase("left")) {
                    p1 = listPoint_screen.get(keymap2);
                }
                if (p1 != null) {
                    p1.setObj(0);
                    sendMap(cmtc.getSession(), listPoint_screen);
                    sendCommandUpdateMatrix_Map(cmtc.getSession(), p, p1, "tank0UpTowpoint");
                } else {
                    tankNavigation(cmtc.getTank(), cmtc.getX(), cmtc.getY(), cmtc.getNavigation(), cmtc.getSession());
                    System.out.println("TankCompetitor_Shoot tien hanh dieu huong cho tank vi diem thu 2");
                }
            } else {
                tankNavigation(cmtc.getTank(), cmtc.getX(), cmtc.getY(), cmtc.getNavigation(), cmtc.getSession());
                System.out.println("TankCompetitor_Shoot tien hanh dieu huong cho tank vi diem thu 1");
            }
        } catch (Exception e) {
            Logger.getLogger(TankCompetitor_Shoot.class.getName()).log(Level.SEVERE, null, e);
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
            Logger.getLogger(TankCompetitor_Shoot.class.getName()).log(Level.SEVERE, null, e);
        }

    }

    private boolean sendMap(String session, TreeMap<Integer, Point> listPoint) {
        TreeMap<Integer, Point> listPointMapUp = new TreeMap<>();
        TreeMap<Integer, Point> listPointMapdown = new TreeMap<>();
        boolean flag = false;
        try {
            for (Integer y : listPoint.keySet()) {
                Point p = listPoint.get(y);
                int obj = p.getObj();

                if (obj > 0 && obj != 4 && y < listPoint.size() / 2) {
                    listPointMapUp.put(y, p);
                } else if ((obj > 0 && obj != 4) && y >= listPoint.size() / 2) {
                    listPointMapdown.put(y, p);
                }

            }
            if (matrix_Map_pointUpdate(session, listPointMapUp, "tank0mapUPunmove")) {
                if (matrix_Map_pointUpdate(session, listPointMapdown, "tank0mapDownunmove")) {
                    return true;
                }

            }
        } catch (Exception ex) {
           
            Logger.getLogger(TankCompetitor_Shoot.class.getName()).log(Level.SEVERE, null, ex);
        }
        return flag;
    }

    private boolean matrix_Map_pointUpdate(String userSession, TreeMap<Integer, Point> listPoint, String comman) {
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
            } else {
                sendMap(userSession, listPoint);
                f = true;
            }
        } catch (Exception e) {
            // tao lai lenh tank stop de gui di  khoi dong lai qua trinh choi
            tankNavigation(tankname, xtest, ytest, nva, userSession);
            Logger.getLogger(TankCompetitor_Shoot.class.getName()).log(Level.SEVERE, null, e);
        }
        return f;
    }

    synchronized private boolean serverSend_dataToClient(String data, String userSession) {
        boolean f = false;
        Random r = new Random();
        float tam = (r.nextFloat() * 3500);
        if (tam < 200) {
            tam += 800;
        } 
        for (Session usess : listuser) {
            if (usess.getId().equalsIgnoreCase(userSession)) {
                try {
                    for (int i = 0; i < tam; i++) {
                        
                    }
                    usess.getBasicRemote().sendText(data);
                    return true;
                } catch (IOException ex) {
                     for (int i = 0; i < tam; i++) {
                        
                    }
                    // tao lai lenh tank stop de gui di  khoi dong lai qua trinh choi
                       tankNavigation(tankname, xtest, ytest, nva, TankGame.currentSess );
                    Logger.getLogger(TankCompetitor_Shoot.class.getName()).log(Level.SEVERE, null, ex);
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
              tankNavigation(tankname, xtest, ytest, nva, TankGame.currentSess );
            Logger.getLogger(ControlBullteTankCompetitor_Shoot.class.getName()).log(Level.SEVERE, null, e);
            return false;
        }
        return f;
    }
}
//                /phai ten hanh dieu huong tro lai cho no
//                 {"tank":"tank1","x":570,"y":179.5,"key":0,"x1":600,"y1":194.5,"key1":0,"navigation":"right","session":"2ee3df3c-478f-4208-8edf-0f53d217c30d"}bombardment
/*

 private int getkeymap(TreeMap<Integer, Point> listPoint, float x, float y) {
 int key = 0;
 try {
 for (int k : listPoint.keySet()) {
 Point p = listPoint.get(k);
 if (p.getX() >= x - 5 && p.getX() <= x + 5 && p.getY() >= y - 5 && p.getY() <= y + 5) {
 key = k;
 }
 }
 } catch (Exception ex) {
 Logger.getLogger(TankCompetitor_Shoot.class.getName()).log(Level.SEVERE, null, ex);
 }
 return key;
 }
 * private String getCommand(String tankname, String nva) {
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
 }*/
