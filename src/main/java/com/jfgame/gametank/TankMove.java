package com.jfgame.gametank;

import com.jfgame.bean.NavigationTank;
import com.jfgame.bean.Point;
//import static com.jfgame.gametank.CreateMatrix.map_screen;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import static com.jfgame.gametank.TankGame.listuser;
import java.util.Random;
import java.util.TreeMap;
import javax.websocket.Session;

/**
 *
 * @author Bach
 */
public class TankMove {

    private TreeMap<Integer, Point> listPoint_screen = new TreeMap<>();
    private NavigationTank Ntank = new NavigationTank();
    float xstop, ystop;
    String session, navigation;

    public TankMove(TreeMap<Integer, Point> listPoint_screen) {
        this.listPoint_screen = listPoint_screen;
    }

    public TankMove(String mess, TreeMap<Integer, Point> listPoint_screen) {
        int i = mess.indexOf("tankStop");
        ObjectMapper tankstop = new ObjectMapper();
        String ms = "";
        if (i > 0) {
            ms = mess.substring(0, i);
        }
        if (ms != null && ms.length() > 0) {
            try {
                Ntank = tankstop.readValue(ms, NavigationTank.class);
                this.listPoint_screen = listPoint_screen;
            } catch (JsonParseException ex) {
                Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, ex);
            } catch (JsonMappingException ex) {
                Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, ex);
            } catch (IOException ex) {
                Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, ex);
            }

        }

    }

    public void navigation() {
        float x, y, xend, yend = 0;
        String nav = "", tank = "";
        if (Ntank != null) {
            navigation = nav = Ntank.getNavigation();

            tank = Ntank.getTank();
            this.xstop = Ntank.getXstop();
            this.ystop = Ntank.getYstop();
            this.session = Ntank.getSession();
        }
        // chon huong di tot nhat cho tank
        if ("down".equalsIgnoreCase(nav)) {
            tanknavigationMove(2, tank);
        }
        if ("up".equalsIgnoreCase(nav)) {
            tanknavigationMove(2, tank);
        }
        if ("left".equalsIgnoreCase(nav)) {
            tanknavigationMove(4, tank);
        }
        if ("right".equalsIgnoreCase(nav)) {
            tanknavigationMove(4, tank);
        }
        if ("random".equalsIgnoreCase(nav)) {
            tanknavigationMove(2, tank);
        }
    }
    /*
     * ham dinh huong cho tank chuyen huong khi gap vat can
     * co the lui lai ,re phai, re trai, ban dan giai phong duong di
     * 
     */

    private void tanknavigationMove(int rd, String tankName) {
        Random ran = new Random();
        int huong = ran.nextInt(4) + 1;
        String commandUp = "";
        String commandDown = "";
        String commandRight = "";
        String commandLeft = "";
        String commandFire = "";
        String commandFireGo = "";
        switch (tankName) {
            case "tank1": {
                commandUp = "1tankMoveUp";
                commandDown = "1tankMoveDown";
                commandRight = "1tankMoveRight";
                commandLeft = "1tankMoveLeft";
                commandFire = "1tankMoveFire";
                commandFireGo = "1tankMoveFireGo";
            }
            break;
            case "tank2": {
                commandUp = "2tankMoveUp";
                commandDown = "2tankMoveDown";
                commandRight = "2tankMoveRight";
                commandLeft = "2tankMoveLeft";
                commandFire = "2tankMoveFire";
                commandFireGo = "2tankMoveFireGo";
            }
            break;
            case "tank3": {
                commandUp = "3tankMoveUp";
                commandDown = "3tankMoveDown";
                commandRight = "3tankMoveRight";
                commandLeft = "3tankMoveLeft";
                commandFire = "3tankMoveFire";
                commandFireGo = "3tankMoveFireGo";
            }
            break;
            case "tank": {
                commandUp = "mapUPDOWN";
                commandDown = "mapDOWN";
                commandRight = "mapRowRight";
                commandLeft = "mapRowleft";
                commandFire = "2tankMoveFire";
                commandFireGo = "2tankMoveFireGo";
            }
            break;
        }

        switch (huong) {
            case 1:
                try {
                    moveLeft_Right(xstop, ystop, session, commandRight);
//                    System.out.println("Class TankMove Huong :" + huong + " right ,Random");
                } catch (Exception ex) {
                    tankErrorSenddata(xstop, ystop, session, commandRight, tankName);
                }
                break;
            case 2:
                try {
                    moveLeft_Right(xstop, ystop, session, commandLeft);
//                    System.out.println("Class TankMove Huong :" + huong + " Left ,Random");
                } catch (Exception e) {
                    tankErrorSenddata(xstop, ystop, session, commandLeft, tankName);
                }

                break;
            case 3:
                try {
                    moveUp_Down(xstop, ystop, session, commandDown);
//                    System.out.println("Class TankMove Huong :" + huong + " Down ,Random");
                } catch (Exception e) {
                    tankErrorSenddata(xstop, ystop, session, commandDown, tankName);
                }

                break;
            case 4:
                try {
                    moveUp_Down(xstop, ystop, session, commandUp);
//                    System.out.println("Class TankMove Huong :" + huong + " UP ,Random");
                } catch (Exception e) {
                    tankErrorSenddata(xstop, ystop, session, commandUp, tankName);
                }

                break;
            case 5:
                try {
                    tankshootNext(commandFireGo, tankName, navigation, xstop, ystop);
                } catch (Exception e) {
                    tankErrorSenddata(xstop, ystop, session, commandUp, tankName);
                }

                break;
        }

    }

    synchronized private void tankMoveSenddata(String sess, String command) {
//        String sess = this.tank.getSession();
        Random r = new Random();
        float tam = (r.nextFloat() * 5000);
        if (tam < 200) {
            tam += 1300;
        } 
        for (Session session : listuser) {
            if (session.getId().equalsIgnoreCase(sess)) {
                try {
                     for (int i = 0; i < tam; i++) {
                        
                    }
                    session.getBasicRemote().sendText(command);
                } catch (IOException ex) {
                    Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, ex);

                }

            }
        }
    }

    private void tankErrorSenddata(float xstop, float ystop, String sess, String command, String tankName) {
//        String sess = this.tank.getSession();
        for (Session session : listuser) {
            if (session.getId().equalsIgnoreCase(sess)) {
                try {
                    String tankmove = "[{\"tank\":\"" + tankName + "\",\"xstop\":" + xstop + ",\"ystop\":" + ystop + ",\"session\":\"" + sess + "\",\"commam\":\"" + command + "\"}]" + "ErrorTankCompetitor";
                    session.getBasicRemote().sendText(tankmove);
                } catch (IOException ex) {
                    Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, ex);

                }

            }
        }
    }

    public String getRow(float ystop, String comman) {
        int i = 0;
        float ystop2 = ystop + 15;
        StringBuilder tankmove = new StringBuilder("[");
        try {
            for (Integer k : listPoint_screen.keySet()) {
                Point p = listPoint_screen.get(k);

                float ym = p.getY();
                float xm = p.getX();
                int obj = p.getObj();
//                if ((ym - 8 <= ystop && ym + 8 >= ystop) || (ym - 8 <= ystop2 && ym + 8 >= ystop2)) {
                if ((ym - 8 <= ystop && ym + 8 >= ystop)) {
                    tankmove.append("{\"Point\":").append(k).append(",\"x\":").append(xm).append(",\"y\":").append(ym).append(",\"obj\":").append(obj).append("},");
                    i++;
                }
            }

            tankmove.append("]");
            int l = tankmove.length();
            tankmove.deleteCharAt(l - 2);

            tankmove.append(comman);
//            System.out.println("---------------------------------------------------------------------------------");
//            System.out.println("so diem tim duoc theo hang " + i);
//            System.out.println("TankMove Tien hanh kiem tra toa do theo hang-------------****: " + tankmove);
//            System.out.println("--------------------------------------*/////////////////////////-------------------------------------------");

        } catch (Exception e) {
            Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, e);
        }
        return tankmove.toString();
    }

    public String getColumn(float xstop, String comman) {
        StringBuilder tankmove = new StringBuilder("[");
//        if (xstop >= 721 && xstop <= 750) {
//            xstop = 720;
//        }
        int count = 0;
        float xstop1 = xstop + 15;
        try {
            for (Integer k : listPoint_screen.keySet()) {
                Point p = listPoint_screen.get(k);

                float ym = p.getY();
                float xm = p.getX();
                int obj = p.getObj();
//if ((xm + 8 >= xstop && xm - 8 <= xstop) || (xm + 8 >= xstop1 && xm - 8 <= xstop1)) {
                if ((xm + 8 >= xstop && xm - 8 <= xstop)) {
                    tankmove.append("{\"Point\":").append(k).append(",\"x\":").append(xm).append(",\"y\":").append(ym).append(",\"obj\":").append(obj).append("},");
                    count++;
                }
            }
            tankmove.append("]");
            int l = tankmove.length();
            tankmove.deleteCharAt(l - 2);

            tankmove.append(comman);
//            System.out.println("---------------------------------------------------------------------------------");
//            System.out.println("so diem tim duoc theo cot " + count);
//            System.out.println("-**********TankMove Tien hanh kiem tra toa do theo cot: " + tankmove);
//            System.out.println("---------------------------------*******************************------------------------------------------------");
        } catch (Exception e) {
            Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, e);
        }
        return tankmove.toString();
    }
    // dinh huong cho tank sdi sang phai hoac trai

    public void moveLeft_Right(float xstop, float ystop, String session, String comman) {
        try {
            for (Integer k : listPoint_screen.keySet()) {
                Point p = listPoint_screen.get(k);
                float xm = p.getX();
                float ym = p.getY();
                int obj = p.getObj();

                if (((xstop - 15) <= xm) && (xm <= (xstop + 15)) && ((ystop - 15) < ym) && (ym <= (ystop + 15)) && (obj == 0 || obj == 4)) {
                    if (session.length() > 0) {
                        String listpoint = getRow(ystop, comman);
                        tankMoveSenddata(session, listpoint);
                    }
                    break;
                }
            }
        } catch (Exception e) {
            Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, e);
        }

    }

    // dinh huong cho tank tien len 
    public void moveUp_Down(float xstop, float ystop, String session, String comman) {
//        System.out.println("class TankMove moveUp_Down so luong diem: " + listPoint_screen.size());
        try {
            for (Integer k : listPoint_screen.keySet()) {
                Point p = listPoint_screen.get(k);
                float xm = p.getX();
                float ym = p.getY();
                int obj = p.getObj();

                if (((xstop - 15) <= xm) && (xm <= (xstop + 15)) && ((ystop - 15) < ym) && (ym <= (ystop + 15)) && (obj == 0 || obj == 4)) {
//                    System.out.println("  moveUp_Down se truyen di xstop " + xm + "  ystop" + ym);
                    if (session.length() > 0) {
                        String listpoint = getColumn(xstop, comman);
                        tankMoveSenddata(session, listpoint);
                    }
                    break;
                }
            }
        } catch (Exception e) {
            Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, e);
        }

    }
    /*dieu khien tank ban vo tuong va di tiep
     */

    private void tankshootNext(String command, String tankname, String nva, float x, float y) {
        String tankmove = "";
        try {
            tankmove = "[{\"tank\":\"" + tankname + "\",\"x\":" + x + ",\"y\":" + y + ",\"session\":\"" + session + "\",\"navigation\":\"" + nva + "\",\"xend\":" + 500 + ",\"yend\":" + 700 + "}]" + command;
            tankMoveSenddata(session, tankmove);
        } catch (Exception e) {
            Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, e);
        }

    }
}
