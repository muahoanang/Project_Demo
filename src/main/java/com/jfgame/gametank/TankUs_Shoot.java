/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jfgame.gametank;

import com.jfgame.bean.ChangerMapTankCompetitor;
import com.jfgame.bean.Point;
import com.jfgame.tools.SendMatrixUpdate_Tankshool;
import java.util.Random;
import java.util.TreeMap;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Bach
 */
public class TankUs_Shoot extends Thread {

    private TreeMap<Integer, Point> listPoint_screen = new TreeMap();
    private ChangerMapTankCompetitor cmtc = new ChangerMapTankCompetitor();
    float xtest, ytest;

    public TankUs_Shoot(ChangerMapTankCompetitor cmtc, TreeMap<Integer, Point> listPoint_screen) {
        try {
            this.cmtc = cmtc;
            this.listPoint_screen = listPoint_screen;

        } catch (Exception ex) {
            Logger.getLogger(TankGame.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    @Override
    public void run() {
        int keymap = 0;
        keymap = cmtc.getKey();
        String navigation = cmtc.getNavigation();
        Point p = listPoint_screen.get(keymap);
        Random r = new Random();
        float tam = (r.nextFloat() * 5000);
        if (tam < 200) {
            tam += 1100;
        }
        try {
            if (p != null) {
                if ("tank_user".equalsIgnoreCase(cmtc.getTank())) {
//                    System.out.println("TankUS_shoot gui cap nhap diem truong hop dung " + p.getPosition());
                    p.setObj(0);
                    for (int i = 0; i < tam; i++) {

                    }
                    callservice(p);
                }
            }
        } catch (Exception e) {
            Logger.getLogger(TankUs_Shoot.class.getName()).log(Level.SEVERE, null, e);
        }

    }

    private void callservice(Point p) {
        SendMatrixUpdate_Tankshool smut = new SendMatrixUpdate_Tankshool(listPoint_screen, cmtc.getSession());
        smut.sendUpdatematrix();
        smut.sendCommandUpdateMatrix_Map(cmtc.getSession(), p, p, "cmUpmapUs");// cho nay dinh xoa lien luc 2 o nhung co le chi ap dung cho tank tu dong
    }

}

/*



 private boolean sendMap(String session, TreeMap<Integer, Point> listPoint) {
 TreeMap<Integer, Point> listPointMapUp = new TreeMap<>();
 TreeMap<Integer, Point> listPointMapdown = new TreeMap<>();
 boolean flag = false;
 try {
 for (Integer y : listPoint.keySet()) {
 Point p = listPoint.get(y);
 int obj = p.getObj();

 if (obj > 0 && obj != 4 && y < 1250) {
 listPointMapUp.put(y, p);
 } else if ((obj > 0 && obj != 4) && y >= 1250) {
 listPointMapdown.put(y, p);
 }

 }
 if (matrix_Map_pointUpdate(session, listPointMapUp, "mapUPunmove")) {
 if (matrix_Map_pointUpdate(session, listPointMapdown, "mapDownunmove")) {

 }
 return true;
 }
 } catch (Exception ex) {
 Logger.getLogger(TankUs_Shoot.class.getName()).log(Level.SEVERE, null, ex);
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
 }
 } catch (Exception e) {
 Logger.getLogger(TankUs_Shoot.class.getName()).log(Level.SEVERE, null, e);
 }
 return f;
 }

 synchronized private boolean serverSend_dataToClient(String data, String userSession) {
 boolean f = false;
 for (Session usess : listuser) {
 if (usess.getId().equalsIgnoreCase(userSession)) {
 try {
 usess.getBasicRemote().sendText(data);
 f = true;
 } catch (IOException ex) {
 Logger.getLogger(TankUs_Shoot.class.getName()).log(Level.SEVERE, null, ex);
 }
 }
 }
 return f;
 }
 nhung ham dang thay doi
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

 System.out.println("********** class TankUs_Shoot thong bao tim key1 cua diem co x: " + x + " ,y: " + y);
 try {
 for (int k : listPoint.keySet()) {
 Point p = listPoint.get(k);
 if (p.getX() >= x - 5 && p.getX() <= x + 5 && p.getY() >= y - 5 && p.getY() <= y + 5) {
 key = k;
 System.out.println("*************class TankUs_Shoot key1 tim duoc la :" + k + " obj: " + p.getObj() + "x: " + x + " ,y: " + y);
 }
 }
 } catch (Exception ex) {
 Logger.getLogger(TankGame.class
 .getName()).log(Level.SEVERE, null, ex);
 }
 return key;
 }
 @Override
 public void run() {
 int keymap = 0;
 keymap = cmtc.getKey();
 String navigation = cmtc.getNavigation();

 Point p = listPoint_screen.get(keymap);
 if (p != null) {
 if ("tank_user".equalsIgnoreCase(cmtc.getTank())) {
 System.out.println("TankUS_shoot gui cap nhap diem truong hop dung " + p.getPosition());
 p.setObj(0);
 callservice(p);

 } else {
 //                        // can thay code lai vi da sua phuong phap lay row va column
 System.out.println("Obj khi chua xac lap lai: " + p.getObj());
 p.setObj(0);
 System.out.println("diem thu nhat tu tren xuong co obj cua diem gui ve theo key : " + cmtc.getKey() + "toa do X: " + p.getX() + " Y:" + p.getY());
 int keymap1 = getkeymap(listPoint_screen, cmtc.getX1(), cmtc.getY1());
 Point p1 = listPoint_screen.get(keymap1);
 System.out.println("diem thu 2 co obj cua diem vua tim duoc key1 : " + p1.getObj() + "toa do X: " + p1.getX() + " Y:" + p1.getY());
 p1.setObj(0);
 //gui map vua cap nhap den      
 sendMap(cmtc.getSession(), listPoint_screen);
 TankMove tankMove = new TankMove(cmtc.getSession(), listPoint_screen);// cho nay da thay doi class TankMove nen can em lai ma khi dung
 String command = getCommand(cmtc.getTank(), cmtc.getNavigation());
 if (navigation.equalsIgnoreCase("down")) {
 System.out.println(" cmtc.getTank() = "+cmtc.getTank()+"cmtc.getX(),  "+cmtc.getX()+ "   cmtc.getY()"+cmtc.getY()+"  command  "+command+"  Session: "+cmtc.getSession());
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
 }
 }
 }

 */
