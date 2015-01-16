/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jfgame.gametank;

import com.jfgame.bean.Point;
import com.jfgame.bean.ListTankCompetitor;
import com.jfgame.bean.TankCompetitorBean;
//import static com.jfgame.gametank.CreateMatrix.map_screen;
import static com.jfgame.gametank.TankGame.listuser;
//import static com.jfgame.gametank.TankGame.listTankCompetitor;
import java.io.IOException;
import java.util.TreeMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.Session;

/**
 *
 * @author Bach
 */
/*
 * class create Competitor and send client
 */
public class Competitor {

    private TreeMap<Integer, Point> listPoint_screen = new TreeMap<>();//map_screen.getListPoint();

    /**
     * create List tank competitor
     *
     * @param x
     * @param y
     * @param command
     * @param Usession
     */
    /*send data to client
     
    public void tankMoveSenddata(float x, float y, String command, String Usession) {
        String sess = Usession;
        try {
            createListCompetitor(Usession, x, y, "up");// tao ra mang tank doi thu
//            ListTankCompetitor tc = listTankCompetitor.get(Usession);// lay mang tank competitor theo Session

//            TankCompetitorBean bean = tc.getTankCompetitorBean(1);

            String tankmove_down = "[{\"tank\":\"tank\",\"x\":" + x + ",\"y\":" + y + ",\"session\":\"" + sess + "\",\"navigation\":\"down\",\"xend\":" + 500 + ",\"yend\":" + 700 + "}]" + command;
            String tankmove_up = "[{\"tank\":\"tank\",\"x\":" + bean.getX() + ",\"y\":" + bean.getY() + ",\"session\":\"" + sess + "\",\"navigation\":\"up\",\"xend\":" + 500 + ",\"yend\":" + 700 + "}]" + command;
            String tankmove_right = "[{\"tank\":\"tank\",\"x\":" + x + ",\"y\":" + y + ",\"session\":\"" + sess + "\",\"navigation\":\"right\",\"xend\":" + 500 + ",\"yend\":" + 700 + "}]" + command;
            String tankmove_left = "[{\"tank\":\"tank\",\"x\":" + bean.getX() + ",\"y\":" + bean.getY() + ",\"session\":\"" + sess + "\",\"navigation\":\"left\",\"xend\":" + 500 + ",\"yend\":" + 700 + "}]" + command;
            for (Session session : listuser) {
                if (session.getId().equalsIgnoreCase(sess)) {
                    try {
//                    session.getBasicRemote().sendText(tankmove_down);
                        session.getBasicRemote().sendText(tankmove_left);

                    } catch (IOException ex) {
                        Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, ex);
                    }

                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private static void createListCompetitor(String Usession, float x, float y, String nav) {
        ListTankCompetitor competitor = new ListTankCompetitor();// tao ra list tankCompetitor
//        listTankCompetitor.put(Usession, competitor);
        // tam thoi ta thu nghiem da 
        competitor.createTankCompetitor(1, Usession, x, y, nav, 1, 1);// chu y hai gia tri dau ta se phai kiem saot sau
    }*/
}
//String tankmove = "[{\"tank\":\"tank\",\"x\":" + x + ",\"y\":" + y + ",\"session\":\"" + sess + "\",\"navigation\":\"down\",\"Ymax\":250,\"rotary\":\"\"},"
//                + "{\"tank\":\"tank\",\"x\":" + x + ",\"y\":" + y + ",\"session\":\"" + sess + "\",\"navigation\":\"down\",\"Ymax\":250,\"rotary\":\"left\",\"Xmax\":300}]" +command;
