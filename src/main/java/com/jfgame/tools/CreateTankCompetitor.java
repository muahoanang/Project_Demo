/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jfgame.tools;

import com.jfgame.bean.Point;
import com.jfgame.bean.TankCompetitorBean;
import com.jfgame.gametank.CreateMatrix;
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
public class CreateTankCompetitor implements Runnable {

    private int tankkey;
    private String currentSess, tankname;
    private float xstart, ystart;
    private TreeMap<Integer, Point> listPoint;
    private TreeMap<Integer, Point> listPointMapUp;
    private TreeMap<Integer, Point> listPointMapdown;
    private TankCompetitorBean tank = new TankCompetitorBean();

    public CreateTankCompetitor(TankCompetitorBean tank, TreeMap<Integer, Point> listPoint, TreeMap<Integer, Point> listPointMapUp, TreeMap<Integer, Point> listPointMapdown) {

        try {
            this.tank = tank;
            this.xstart = tank.getX();
            this.ystart = tank.getY();
            this.tankkey = tank.getTankkey();
            this.tankname = tank.getTank();
            this.currentSess = tank.getSession();

            this.listPoint = listPoint;
            this.listPointMapUp = listPointMapUp;
            this.listPointMapdown = listPointMapdown;

        } catch (Exception ex) {
            Logger.getLogger(CreateTankCompetitor.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    @Override
    public void run() {
        CreateMatrix matrix_Map = new CreateMatrix(currentSess, listPoint);
        try {
            switch (tankkey) {
                case 10: {
                    //chu y lenh gui tam htoi co loi vi chua dieu chinh duoc huong di mac dinh la di xuong
                    sendDataCreataTankCompetitor1_tamthoi(xstart, 0, "Competitor_down", currentSess);// tao tank thu1
                    if (matrix_Map.getPoisitionMover_Down_Up(currentSess, ystart, "mapDOWN")) {
                        // truyen toa do map thanh hai lua de phuc vu cho vieccap nhap lai anh tren man hinh khi no ban dan
                        SendMatrixUpdate_Tankshool smut = new SendMatrixUpdate_Tankshool(listPointMapUp, listPointMapdown);
                        smut.sendMap_forTankCP(currentSess, tankname);
                    }

                }
                break;
                case 1: {
                    //chu y lenh gui tam htoi co loi vi chua dieu chinh duoc huong di mac dinh la di xuong
                    sendDataCreataTankCompetitor1_tamthoi(xstart, 0, "xetank1_down", currentSess);// tao tank thu1
                    if (matrix_Map.getPoisitionMover_Down_Up(currentSess, ystart, "1tankMoveDown")) {
                        SendMatrixUpdate_Tankshool smut = new SendMatrixUpdate_Tankshool(listPointMapUp, listPointMapdown);
                        smut.sendMap_forTankCP(currentSess, tankname);
                    }

                }
                break;
                case 2: {
                    sendDataCreataTankCompetitor1_tamthoi(xstart, 0, "2xetank_left", currentSess);// tao tank thu2
                    if (matrix_Map.getPoisitionMover_Right_Left(currentSess, ystart, "2tankMoveLeft")) {
                        SendMatrixUpdate_Tankshool smut = new SendMatrixUpdate_Tankshool(listPointMapUp, listPointMapdown);
                        smut.sendMap_forTankCP(currentSess, tankname);
                    }
                }
                break;
                case 3: {
                    sendDataCreataTankCompetitor1_tamthoi(xstart, 0, "3xetank_down", currentSess);// tao tank thu3
                    if (matrix_Map.getPoisitionMover_Down_Up(currentSess, ystart, "3tankMoveDown")) {
                        SendMatrixUpdate_Tankshool smut = new SendMatrixUpdate_Tankshool(listPointMapUp, listPointMapdown);
                        smut.sendMap_forTankCP(currentSess, tankname);
                    }
                }
                break;
            }
        } catch (Exception e) {
            Logger.getLogger(CreateTankCompetitor.class.getName()).log(Level.SEVERE, null, e);
        }
    }

    synchronized private void sendDataCreataTankCompetitor1_tamthoi(float x, float y, String command, String Usession) {
        String tankmove_down = "[{\"tank\":\"tank\",\"x\":" + x + ",\"y\":" + y + ",\"session\":\"" + Usession + "\",\"navigation\":\"down\",\"xend\":" + 500 + ",\"yend\":" + 700 + "}]" + command;
        for (Session session : listuser) {
            if (session.getId().equalsIgnoreCase(Usession)) {
                try {
                    session.getBasicRemote().sendText(tankmove_down);
                } catch (IOException ex) {
                    Logger.getLogger(CreateTankCompetitor.class.getName()).log(Level.SEVERE, null, ex);
                }

            }
        }
    }

}
