/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jfgame.tools;

import com.jfgame.bean.Point;
import com.jfgame.gametank.TankGame;
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
public class SendMatrixUpdate_Tankshool {

    private TreeMap<Integer, Point> listPointMapUp = new TreeMap<>();
    private TreeMap<Integer, Point> listPointMapdown = new TreeMap<>();
    private TreeMap<Integer, Point> listPoint_screen = new TreeMap<>();
    private String session;

    public SendMatrixUpdate_Tankshool() {
    }

    public SendMatrixUpdate_Tankshool(TreeMap<Integer, Point> listPoint_screen, String session) {
        this.listPoint_screen = listPoint_screen;
        this.session = session;
    }

    public SendMatrixUpdate_Tankshool(TreeMap<Integer, Point> listPointMapUp, TreeMap<Integer, Point> listPointMapdown) {
        this.listPointMapUp = listPointMapUp;
        this.listPointMapdown = listPointMapdown;
    }
// bat dau cum nay

    public void sendUpdatematrix() {
        try {
            movefail(listPoint_screen, session);
        } catch (Exception e) {
            Logger.getLogger(SendMatrixUpdate_Tankshool.class.getName()).log(Level.SEVERE, null, e);
        }
    }

    private boolean movefail(TreeMap<Integer, Point> listPoint, String session) {
        boolean f = false;
        try {
            TreeMap<Integer, Point> listPointMapUp = new TreeMap<>();
            TreeMap<Integer, Point> listPointMapdown = new TreeMap<>();
            for (Integer y : listPoint.keySet()) {
                Point p = listPoint.get(y);
                int obj = p.getObj();

                if (obj > 0 && obj != 4 && y <= 800) {
                    listPointMapUp.put(y, p);
                } else if ((obj > 0 && obj != 4) && y > 800) {
                    listPointMapdown.put(y, p);
                }

            }
            if (sendMap(session, listPointMapdown, listPointMapUp)) {
                f = true;
            } else {
                sendUpdatematrix();
            }

        } catch (Exception e) {
            Logger.getLogger(SendMatrixUpdate_Tankshool.class.getName()).log(Level.SEVERE, null, e);
        }
        return f;
    }

    private boolean sendMap(String session, TreeMap<Integer, Point> listPointMapdown, TreeMap<Integer, Point> listPointMapUp) {
        boolean b = false;
        try {
            if (matrix_Map(session, listPointMapUp, "mapUPunmove")) {
                matrix_Map(session, listPointMapdown, "mapDownunmove");
                b = true;
            }

        } catch (Exception e) {
            Logger.getLogger(SendMatrixUpdate_Tankshool.class.getName()).log(Level.SEVERE, null, e);
        }
        return b;
    }
// ham nay gui map cho tankCp

    /**
     *
     * @param userSessiong
     * @param listPoint
     * @param comman
     * @send matrix map screen
     */
    private boolean matrix_Map(String userSessiong, TreeMap<Integer, Point> listPoint, String comman) {
        boolean flg = false;
        String data = createData(listPoint, comman);
        try {
            if (serverSend_dataToClient(data, userSessiong)) {
                return true;
            } else {
                data = createData(listPoint, comman);// thu lai mot lan lua
                serverSend_dataToClient(data, userSessiong);
            }
        } catch (Exception e) {
            Logger.getLogger(SendMatrixUpdate_Tankshool.class.getName()).log(Level.SEVERE, null, e);
        }

        return flg;
    }

    private String createData(TreeMap<Integer, Point> listPoint, String comman) {
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

        } catch (Exception e) {
            Logger.getLogger(SendMatrixUpdate_Tankshool.class.getName()).log(Level.SEVERE, null, e);

        }
        return data.toString();
    }

    synchronized private boolean serverSend_dataToClient(String data, String userSession) {
        boolean f = false;
        Random r = new Random();
        float tam = (r.nextFloat() * 2500);
        if (tam < 200) {
            tam += 600;
        } 
        for (Session usess : listuser) {
            if (usess.getId().equalsIgnoreCase(userSession)) {
                try {
                    for (int i = 0; i < tam; i++) {

                    }
                    usess.getBasicRemote().sendText(data);
                    return true;
                } catch (IOException ex) {
                    send_whenerror(data);
                    Logger.getLogger(SendMatrixUpdate_Tankshool.class.getName()).log(Level.SEVERE, null, ex);
                    return false;
                }
            }
        }
        return f;
    }

    private void send_whenerror(String data) {
        try {
            TankGame.sesserror.getBasicRemote().sendText(data);
        } catch (IOException ex) {
            Logger.getLogger(SendMatrixUpdate_Tankshool.class.getName()).log(Level.SEVERE, null, ex);
        }

    }
// end cum

    synchronized public void sendCommandUpdateMatrix_Map(final String userSessiong, final Point p1, final Point p2, final String comman) {
        new Thread(new Runnable() {

            @Override
            public void run() {
                StringBuilder data = new StringBuilder("[");
                try {
                    data.append("{" + "\"pname\":" + "\"").append(p1.getPosition()).append("\"" + ",\"x\":").append(p1.getX()).append(",\"y\":").append(p1.getY()).append(",\"obj\":\"").append(p1.getObj()).append("\"").append("},");
                    data.append("{" + "\"pname\":" + "\"").append(p2.getPosition()).append("\"" + ",\"x\":").append(p2.getX()).append(",\"y\":").append(p2.getY()).append(",\"obj\":\"").append(p2.getObj()).append("\"").append("}");
                    data.append("]");
                    data.append(comman);
                    serverSend_dataToClient(data.toString(), userSessiong);

                } catch (Exception e) {
                    Logger.getLogger(SendMatrixUpdate_Tankshool.class
                            .getName()).log(Level.SEVERE, null, e);
                }
            }
        }).start();

    }

    public boolean sendMap_forTankCP(String session, String tankname) {
        boolean flag = false;
        try {
            switch (tankname) {
                case "tank10":
                    if (matrix_Map(session, listPointMapUp, "tank0mapUPunmove")) {
                        if (matrix_Map(session, listPointMapdown, "tank0mapDownunmove")) {
                            return true;
                        }
                    }
                    break;
                case "tank1": {
                    if (matrix_Map(session, listPointMapUp, "mapUPunmove")) {
                        if (matrix_Map(session, listPointMapdown, "mapDownunmove")) {
                            return true;
                        }
                    }
                }
                break;

                case "tank2": {
                    if (matrix_Map(session, listPointMapUp, "tank2mapUPunmove")) {
                        if (matrix_Map(session, listPointMapdown, "tank2mapDownunmove")) {
                            return true;
                        }
                    }
                }
                break;
                case "tank3": {
                    if (matrix_Map(session, listPointMapUp, "tank3mapUPunmove")) {
                        if (matrix_Map(session, listPointMapdown, "tank3mapDownunmove")) {
                            return true;
                        }
                    }
                }
                break;

            }
        } catch (Exception ex) {
            Logger.getLogger(SendMatrixUpdate_Tankshool.class
                    .getName()).log(Level.SEVERE, null, ex);
        }
        return flag;
    }
}
