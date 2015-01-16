/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jfgame.gametank;

import com.jfgame.bean.Point;
import java.util.TreeMap;
import static com.jfgame.gametank.TankGame.listuser;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.Session;

/**
 *
 * @author Bach
 */
public class CreateMatrix {

    String session;
    private TreeMap<Integer, Point> listPoint = new TreeMap<>();// map_screen.getListPoint();

    public CreateMatrix(String session, TreeMap<Integer, Point> listPoint) {
        this.session = session;
        this.listPoint = listPoint;
    }

    /**
     *
     * @param session ham nay e gui di mang cac diem ma tank xe di
     * @param xstop
     * @param command
     */
    synchronized public boolean getPoisitionMover_Down_Up(String session, float xstop, String command) {
        boolean fl = false;
        String mapColumn = getColumn(xstop, command);
        for (Session session1 : listuser) {
            if (session.equalsIgnoreCase(session1.getId())) {
                try {
                    session1.getBasicRemote().sendText(mapColumn);
                    fl = true;
                } catch (IOException ex) {
                    Logger.getLogger(CreateMatrix.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }
        return fl;
    }
// lay cot cho viec di len di cuong

    public String getColumn(float xstop, String comman) {
        StringBuilder tankmove = new StringBuilder("[");
//        if (xstop >= 721 && xstop <= 750) {
//            xstop = 720;
//        }
       
        float xstop1 = xstop + 15;
        try {
            for (Integer k : listPoint.keySet()) {
                Point p = listPoint.get(k);
                float ym = p.getY();
                float xm = p.getX();
                int obj = p.getObj();
//   if ((xm + 8 >= xstop && xm - 8 <= xstop) || (xm + 8 >= xstop1 && xm - 8 <= xstop1)) {
                if ((xm + 8 >= xstop && xm - 8 <= xstop) ) {
                    tankmove.append("{\"Point\":").append(k).append(",\"x\":").append(xm).append(",\"y\":").append(ym).append(",\"obj\":").append(obj).append("},");
                }
            }
            tankmove.append("]");
            int l = tankmove.length();
            tankmove.deleteCharAt(l - 2);
            tankmove.append(comman);
            System.out.println("-**********CreateMatrix Tien hanh kiem tra toa do theo cot: "+tankmove);
        } catch (Exception e) {
            Logger.getLogger(CreateMatrix.class.getName()).log(Level.SEVERE, null, e);
        }
        return tankmove.toString();
    }
// lay hang cho viec sang trai sang phai

    synchronized public boolean getPoisitionMover_Right_Left(String session, float ystop, String command) {
        String mapColumn = getRow(ystop, command);
        boolean f = false;
        for (Session session1 : listuser) {
            if (session.equalsIgnoreCase(session1.getId())) {
                try {
                    session1.getBasicRemote().sendText(mapColumn);
                    f = true;
                } catch (IOException ex) {
                    Logger.getLogger(CreateMatrix.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }
        return f;
    }

    public String getRow(float ystop, String comman) {
        int i = 0;
        float ystop2 = ystop + 15;
        StringBuilder tankmove = new StringBuilder("[");
        try {
            for (Integer k : listPoint.keySet()) {
                Point p = listPoint.get(k);

                float ym = p.getY();
                float xm = p.getX();
                int obj = p.getObj();
//                 if ((ym - 8 <= ystop && ym + 8 >= ystop) || (ym - 8 <= ystop2 && ym + 8 >= ystop2)) {
                if ((ym - 8 <= ystop && ym + 8 >= ystop)) {
                    tankmove.append("{\"Point\":").append(k).append(",\"x\":").append(xm).append(",\"y\":").append(ym).append(",\"obj\":").append(obj).append("},");
                    i++;
                }
            }
            if (i == 0) {

            }
            tankmove.append("]");
            int l = tankmove.length();
            tankmove.deleteCharAt(l - 2);

            tankmove.append(comman);
            System.out.println("-**********CreateMatrix Tien hanh kiem tra toa do theo hang: "+tankmove);
        } catch (Exception e) {
            Logger.getLogger(CreateMatrix.class.getName()).log(Level.SEVERE, null, e);
        }
        return tankmove.toString();
    }
//sen data to client

}
