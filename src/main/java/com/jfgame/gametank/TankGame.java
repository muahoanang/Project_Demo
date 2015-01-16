/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jfgame.gametank;

import com.jfgame.bean.ChangerMapTankCompetitor;
import com.jfgame.bean.NavigationTank;
import com.jfgame.bean.Point;
import com.jfgame.bean.Tank;
import com.jfgame.bean.TankCompetitorBean;
import com.jfgame.bean.User;
import static com.jfgame.gametank.TankGame.listuser;
import com.jfgame.tools.CreateTankCompetitor;
import com.jfgame.tools.TankCP1_Shoot1;
import com.jfgame.tools.TankCP1_Shoot2;
import com.jfgame.tools.TankCP1_Shoot3;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

/**
 *
 * @author Bach
 */
@ServerEndpoint("/endpoint")
public class TankGame {

    public static final Set<Session> listuser = Collections.synchronizedSet(new HashSet<Session>());
    /**
     * Set<User> listUsname save username and Session of user
     */
    public static final Set<User> listUsname = Collections.synchronizedSet(new HashSet<User>());
    public static String currentSess = "";
 public static Session sesserror;
    /*Map save list point screent 
     */
    public static final Map<String, TreeMap<Integer, Point>> listPointMap = Collections.synchronizedMap(new ConcurrentHashMap<String, TreeMap<Integer, Point>>());
    public static final Map<String, TreeMap<Integer, Point>> listPoint_UpMap = Collections.synchronizedMap(new ConcurrentHashMap<String, TreeMap<Integer, Point>>());
    public static final Map<String, TreeMap<Integer, Point>> listPoint_DownMap = Collections.synchronizedMap(new ConcurrentHashMap<String, TreeMap<Integer, Point>>());

    /**
     * day la mang tank Competitor
     *
     * @param message
     * @param client
     */
    @OnMessage
    public void onMessage(String message, Session client) {
        try {
            int key = paserCommander(message);
            switch (key) {
                case 1: {
                    try {
                        FreePlayer fuser = new FreePlayer(currentSess, 1);
                        fuser.addUserInCommonTable(message, 1);
                        new Thread(new Runnable() {

                            @Override
                            synchronized public void run() {
                                for (Session session : listuser) {
                                    if (session.getId().equalsIgnoreCase(currentSess)) {
                                        getListPoint(currentSess);// tao ra matrix

                                        if (matrix_Map(currentSess, listPointMap.get(currentSess))) {
                                            sendMap(currentSess, listPointMap.get(currentSess));
                                        } else {
                                            matrix_Map(currentSess, listPointMap.get(currentSess));
                                            sendMap(currentSess, listPointMap.get(currentSess));
                                        }
                                        break;
                                    }
                                }

                            }
                        }).start();
                    } catch (Exception e) {
                        Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, e);
                    }

                }
                break;

                case 2: {
                    System.out.println(message);
//                    hien tai khong con dung lenh nay lua
                }
                break;
                case 3: {//hien tai dang tam khong dung luSS
                    try {
                        System.out.println(message);
                        int i = message.indexOf("tankFire");
                        String ms = message.substring(0, i);
                        Tank t = new Tank();
                        ObjectMapper tank = new ObjectMapper();
                        t = tank.readValue(ms, Tank.class);
                        String ses = t.getSession();
                        StringBuilder sb = new StringBuilder("");
                        sb.append("[{\"tank\":\"tank\",\"x\":" + t.getX() + ",\"y\":" + t.getY() + ",\"session\":\"" + ses + "\"}]");
                        for (Session session : listuser) {
                            if (session.getId().equalsIgnoreCase(ses)) {
                                session.getBasicRemote().sendText(sb.toString() + "tankFire");
                            }
                        }
                    } catch (Exception e) {
                        Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, e);
                    }
                }
                break;
                case 4: {
                    try {
                        //chu y viec lay tao do cac diem de yeu cau tank di chua on va co o hai loi TankMover va CreateMatrix
//                        System.out.println(" class Tank Game nhan tu tank stop" + message);
                        NavigationTank Ntank = new NavigationTank();

                        int i = message.indexOf("tankStop");//tankMove
                        ObjectMapper tankstop = new ObjectMapper();
                        String ms = "";

                        if (i > 0) {
                            ms = message.substring(0, i);
                        }
                        if (ms != null && ms.length() > 0) {
                            try {
                                Ntank = tankstop.readValue(ms, NavigationTank.class);
                                Thread t = new Thread(new GetPointScreen(message, 1, listPointMap.get(Ntank.getSession())));
                                t.start();
                            } catch (JsonParseException ex) {
                                Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, ex);
                            } catch (JsonMappingException ex) {
                                Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, ex);
                            } catch (IOException ex) {
                                Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, ex);
                            }

                        }

                    } catch (Exception e) {
                        Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, e);
                    }

                }
                break;
                case 5: {
                    try {
//                        System.out.println(" class Tank Game ghi nhan thay doi map tu Tank User: " + message);
                        ChangerMapTankCompetitor cmtc = new ChangerMapTankCompetitor();
                        TreeMap<Integer, Point> listPoint_screen = new TreeMap();

                        ObjectMapper om = new ObjectMapper();
                        int i = message.indexOf("changerMap");

                        if (i > 0) {
                            String dt = message.substring(0, i);
                            if (dt.length() > 0) {
                                cmtc = om.readValue(dt, ChangerMapTankCompetitor.class);
                                for (String k : listPointMap.keySet()) {
                                    if (k.equalsIgnoreCase(cmtc.getSession())) {
                                        listPoint_screen = listPointMap.get(k);
                                        break;
                                    }
                                }

                                Thread t =new TankUs_Shoot(cmtc, listPoint_screen);
                                t.start();
                            }
                        } else {
                            System.out.println("Class TankGame phan tich ObjectMapper that bai");
                        }
                    } catch (Exception e) {
                        Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, e);
                    }

                }
                break;
                case 6: {
                    try {

//                        System.out.println(" class Tank Game nhan tu lenh tao tank doi thu" + message);
                        TankCompetitorBean tank = new TankCompetitorBean();
                        TreeMap<Integer, Point> listPoint = new TreeMap();
                        TreeMap<Integer, Point> listPointMapUp = new TreeMap<>();
                        TreeMap<Integer, Point> listPointMapdown = new TreeMap<>();
                        int i = message.indexOf("RequestCreateTankCP");
                        if (i > 0) {
                            String dt = message.substring(0, i);
                            if (dt.length() > 0) {
                                ObjectMapper mapper = new ObjectMapper();
                                tank = mapper.readValue(dt, TankCompetitorBean.class);
                                String currentSess = tank.getSession();
                                for (String k : listPointMap.keySet()) {
                                    if (k.equalsIgnoreCase(tank.getSession())) {
                                        listPoint = listPointMap.get(currentSess);
                                        listPointMapUp = listPoint_UpMap.get(currentSess);
                                        listPointMapdown = listPoint_DownMap.get(currentSess);
                                    }
                                }
                                Thread t = new Thread(new CreateTankCompetitor(tank, listPoint, listPointMapUp, listPointMapdown));
                                t.start();
                            }
                        }

                    } catch (Exception e) {
                        Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, e);
                    }

                }
                break;

                case 8: {
                    try {// nhan lenh ban cu a xe tank thu nhat
//                        System.out.println(" class Tank Game nhan tu tank Tank0CPUpdateMap thay doi map: " + message);
                        ChangerMapTankCompetitor cmtc = new ChangerMapTankCompetitor();
                        TreeMap<Integer, Point> listPoint_screen = new TreeMap();
                        ObjectMapper om = new ObjectMapper();
                        int i = message.indexOf("Tank0CPUpdateMap");
                        if (i > 0) {
                            String dt = message.substring(0, i);
                            if (dt.length() > 0) {
                                cmtc = om.readValue(dt, ChangerMapTankCompetitor.class
                                );
                                for (String k
                                        : listPointMap.keySet()) {
                                    if (k.equalsIgnoreCase(cmtc.getSession())) {
                                        listPoint_screen = listPointMap.get(k);
                                        break;
                                    }
                                }
                                Thread t = new Thread(new TankCompetitor_Shoot(cmtc, listPoint_screen, message));
                                t.start();
                            }
                        } else {
                            System.out.println("Class TankGame phan tich ObjectMapper that bai");
                        }
                    } catch (Exception e) {
                        Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, e);
                    }
                }
                break;
                case 10: {
                    try {// nhan lenh ban cu a xe tank thu nhat
//                        System.out.println(" class Tank Game nhan tu tank Tank1CPUpdateMap thay doi map: " + message);
                        ChangerMapTankCompetitor cmtc = new ChangerMapTankCompetitor();
                        TreeMap<Integer, Point> listPoint_screen = new TreeMap();
                        ObjectMapper om = new ObjectMapper();
                        int i = message.indexOf("Tank1CPUpdateMap");
                        if (i > 0) {
                            String dt = message.substring(0, i);
                            if (dt.length() > 0) {
                                cmtc = om.readValue(dt, ChangerMapTankCompetitor.class
                                );
                                for (String k
                                        : listPointMap.keySet()) {
                                    if (k.equalsIgnoreCase(cmtc.getSession())) {
                                        listPoint_screen = listPointMap.get(k);
                                        break;
                                    }
                                }
                                Thread t = new Thread(new TankCP1_Shoot1(cmtc, listPoint_screen, message));
                                t.start();
                            }
                        } else {
                            System.out.println("Class TankGame phan tich ObjectMapper that bai");
                        }
                    } catch (Exception e) {
                        Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, e);
                    }
                }
                break;
                case 11: {
                    try {
//                        System.out.println(" class Tank Game nhan tu tank Tank2CPUpdateMap thay doi map: " + message);
                        ChangerMapTankCompetitor cmtc = new ChangerMapTankCompetitor();
                        TreeMap<Integer, Point> listPoint_screen = new TreeMap();
                        ObjectMapper om = new ObjectMapper();
                        int i = message.indexOf("Tank2CPUpdateMap");
                        if (i > 0) {
                            String dt = message.substring(0, i);
                            if (dt.length() > 0) {
                                cmtc = om.readValue(dt, ChangerMapTankCompetitor.class
                                );
                                for (String k : listPointMap.keySet()) {
                                    if (k.equalsIgnoreCase(cmtc.getSession())) {
                                        listPoint_screen = listPointMap.get(k);
                                        break;
                                    }
                                }
                                Thread t = new TankCP1_Shoot2(cmtc, listPoint_screen, message);
                                t.start();
                            }
                        } else {
                            System.out.println("Class TankGame phan tich ObjectMapper that bai");
                        }
                    } catch (Exception e) {
                        Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, e);
                    }
                }
                break;
                case 12: {
                    try {
//                        System.out.println(" class Tank Game nhan tu tank Tank3CPUpdateMap thay doi map: " + message);
                        ChangerMapTankCompetitor cmtc = new ChangerMapTankCompetitor();
                        TreeMap<Integer, Point> listPoint_screen = new TreeMap();
                        ObjectMapper om = new ObjectMapper();
                        int i = message.indexOf("Tank3CPUpdateMap");
                        if (i > 0) {
                            String dt = message.substring(0, i);
                            if (dt.length() > 0) {
                                cmtc = om.readValue(dt, ChangerMapTankCompetitor.class
                                );
                                for (String k
                                        : listPointMap.keySet()) {
                                    if (k.equalsIgnoreCase(cmtc.getSession())) {
                                        listPoint_screen = listPointMap.get(k);
                                        break;
                                    }
                                }
                                Thread t = new Thread(new TankCP1_Shoot3(cmtc, listPoint_screen, message));
                                t.start();
                            }
                        } else {
                            System.out.println("Class TankGame phan tich ObjectMapper that bai");
                        }
                    } catch (Exception e) {
                        Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, e);
                    }
                }
                break;

                case 9: {// ham nay kiem soat cap nhat map khi tank cp ban dan
                    try {
//                        System.out.println(" class Tank Game ham update map TankCP: " + message);
                        ChangerMapTankCompetitor cmtc = new ChangerMapTankCompetitor();
                        ObjectMapper om = new ObjectMapper();
                        int i = message.indexOf("TankCPUpdateMap");
                        TreeMap<Integer, Point> listPoint_screen = new TreeMap<>();
//                    TreeMap<Integer, Point> listPointMapUp = new TreeMap<>();
//                    TreeMap<Integer, Point> listPointMapdown = new TreeMap<>();
                        if (i > 0) {
                            String dt = message.substring(0, i);
                            if (dt.length() > 0) {
                                cmtc = om.readValue(dt, ChangerMapTankCompetitor.class);
                                System.out.println("****************  TankGame nhan  tu:" + cmtc.getTank());
                                String keyse = cmtc.getSession();
                                for (String k : listPointMap.keySet()) {
                                    if (k.equalsIgnoreCase(cmtc.getSession())) {
                                        listPoint_screen = listPointMap.get(k);
//                                    listPointMapUp = listPoint_UpMap.get(keyse);
//                                    listPointMapdown = listPoint_DownMap.get(keyse);
                                        break;
                                    }
                                }

                                Thread t = new Thread(new ControlBullteTankCompetitor_Shoot(listPoint_screen, cmtc));
                                t.start();
                            }
                        }
                    } catch (Exception e) {
                        Logger.getLogger(TankMove.class.getName()).log(Level.SEVERE, null, e);
                    }

                }
                break;
            }

        } catch (Exception ex) {
            Logger.getLogger(TankGame.class.getName()).log(Level.SEVERE, null, ex);
        }//
    }

    //create matrix position of scrren
    public int paserCommander(String message) {
        int result = 0;
        try {
            int index = message.indexOf("login");
            if (index > 0) {
                return 1;//login
            }

            int tankMove = message.indexOf("tankMove");
            if (tankMove > 0) {
                return 2;
            }

            int tankFire = message.indexOf("tankFire");
            if (tankFire > 0) {
                return 3;
            }

            int tankStop = message.indexOf("tankStop");
            if (tankStop > 0) {
                return 4;
            }

            int tankCompetitorFire = message.indexOf("changerMap");
            if (tankCompetitorFire > 0) {
                return 5;
            }
            int requestCreateTankCP = message.indexOf("RequestCreateTankCP");
            if (requestCreateTankCP > 0) {
                return 6;
            }
            int Tank0CPUpdateMap = message.indexOf("Tank0CPUpdateMap");
            if (Tank0CPUpdateMap > 0) {
                return 8;
            }
            int tankCPUpdateMap = message.indexOf("TankCPUpdateMap");
            if (tankCPUpdateMap > 0) {
                return 9;
            }

            int tank1CPUpdateMap = message.indexOf("Tank1CPUpdateMap");
            if (tank1CPUpdateMap > 0) {
                return 10;
            }

            int tank2CPUpdateMap = message.indexOf("Tank2CPUpdateMap");
            if (tank2CPUpdateMap > 0) {
                return 11;
            }
            int tank3CPUpdateMap = message.indexOf("Tank3CPUpdateMap");
            if (tank3CPUpdateMap > 0) {
                return 12;
            }

        } catch (Exception e) {
        }
        return result;
    }

    @OnOpen
    synchronized public void onOpen(Session session) {
        listuser.add(session);
        sesserror=session;
        currentSess = session.getId();
        System.out.println("one User moi dang nhap");

    }

    @OnClose
    synchronized public void onClose(Session session) {
        try {

            listPointMap.remove(session.getId());
            listuser.remove(session);
            System.out.println("da remove: " + session.getId());

        } catch (Exception e) {
            Logger.getLogger(TankGame.class
                    .getName()).log(Level.SEVERE, null, e);
        }

    }
//remover khoi danh sach session dang quan ly
    /// lap matrix
    private int x = 0, y = 0;

    private void getListPoint(String session) {
        int h = 0, w = 0, k = 1;
        TreeMap<Integer, Point> listPoint = new TreeMap<>();
        try {
            for (int i = 0; i < 40; i++) {
                for (int j = 0; j < 40; j++) {
                    Point point = new Point();
                    point.setX(x + w);
                    point.setY(y + h);
                    point.setPosition(k);
                    //set object for row
                    point.setObj(map[i][j]);

                    listPoint.put(k, point);
                    w += 15;
                    k++;
                }
                w = 0;
                h += 15;
            }
            listPointMap.put(session, listPoint);
            setListPointTankUnMove(session, listPoint);

        } catch (Exception e) {
            Logger.getLogger(TankMove.class
                    .getName()).log(Level.SEVERE, null, e);
        }

    }

    private boolean setListPointTankUnMove(String session, TreeMap<Integer, Point> listPoint) {
        TreeMap<Integer, Point> listPointMapUp = new TreeMap<>();
        TreeMap<Integer, Point> listPointMapdown = new TreeMap<>();
        boolean flag = false;
        try {
            for (Integer y : listPoint.keySet()) {
                Point p = listPoint.get(y);
                int obj = p.getObj();
                if (obj > 0 && obj != 4 && y <= 800) {
                    listPointMapUp.put(y, p);
                } else if ((obj > 0 && obj != 4) && y > 800) {
                    listPointMapdown.put(y, p);
                }
            }
            listPoint_UpMap.put(session, listPointMapUp);
            listPoint_DownMap.put(session, listPointMapdown);

        } catch (Exception e) {
            Logger.getLogger(TankMove.class
                    .getName()).log(Level.SEVERE, null, e);
        }
        return flag;
    }

    private int map[][] = {
        {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
        {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0},
        {0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
        {0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4},
        {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4},
        {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4},
        {0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0},
        {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
        {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
        {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
        {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4},
        {0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4},
        {0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4}};
//      /

    /*     * @param userSessiong
     * @param listPoint
     * @return boolean
     */
    public boolean matrix_Map(String userSessiong, TreeMap<Integer, Point> listPoint) {
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
            data.append("mapMatrix");

            if (serverSend_dataToClient(data.toString(), userSessiong)) {
                return true;
            } else {
                serverSend_dataToClient(data.toString(), userSessiong);
            }
        } catch (Exception e) {
            Logger.getLogger(CreateMatrix.class
                    .getName()).log(Level.SEVERE, null, e);
        }
        return f;
    }

    private boolean sendMap(String session, TreeMap<Integer, Point> listPoint) {
        TreeMap<Integer, Point> listPointMapUp = new TreeMap<>();
        TreeMap<Integer, Point> listPointMapdown = new TreeMap<>();
        boolean flag = false;
        try {
            for (Integer y : listPoint.keySet()) {
                Point p = listPoint.get(y);
                int obj = p.getObj();

                if (obj > 0 && obj != 4 && y <= 800) {
                    listPointMapUp.put(y, p);
                } else if ((obj > 0 && obj != 4) && y > 800) {//= 1250
                    listPointMapdown.put(y, p);
                }

            }
            if (matrix_Map_pointUpdate(session, listPointMapUp, "mapUPunmove")) {
                if (matrix_Map_pointUpdate(session, listPointMapdown, "mapDownunmove")) {
                    return true;
                } else {
                    matrix_Map_pointUpdate(session, listPointMapUp, "mapUPunmove");// gui 2 lan
                    matrix_Map_pointUpdate(session, listPointMapdown, "mapDownunmove");
                }

            }
        } catch (Exception ex) {
            Logger.getLogger(CreateMatrix.class
                    .getName()).log(Level.SEVERE, null, ex);
        }
        return flag;
    }

    /**
     *
     * @param userSession
     * @param listPoint
     * @param comman
     * @send matrix map screen
     */
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
            Logger.getLogger(CreateMatrix.class
                    .getName()).log(Level.SEVERE, null, e);
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
                    Logger.getLogger(CreateMatrix.class
                            .getName()).log(Level.SEVERE, null, ex);
                }
            }
        }
        return f;
    }

}

//
//
//    private void removeUserOut(Set<Session> listUserRemove) {
//        for (Session ss : listUserRemove) {
//            listuser.remove(ss);
//            listUserRemove.remove(ss);
//            System.out.println("Classs Demogame da remove session id:" + ss.getId());
//        }
//    }
//// lay toa do diem tiep theo len tam thoi chua dung den
//
//    private int getkeymap(TreeMap<Integer, Point> listPoint, float x, float y, String navigation) {
//        int key = 0;
//        //cho nay khong co y nghi nhung de lai suy nghi tiep
//        float x1 = 0, y1 = 0;
//        switch (navigation) {
//            case "down":
//                x1 += 15;
//                y1 += 30;
//                break;
//            case "right":
//                x1 += 30;
//                y1 += 15;
//                break;
//            case "left":
//                x1 -= 15;
//                y1 += 15;
//                break;
//            case "up":
//                x1 += 15;//sai nhung vo tinh lai dung y
//                break;
//        }
//        System.out.println("**********TankGame thong bao tim key1 cua diem co x:" + x + " y:" + y);
//        try {
//            for (int k : listPoint.keySet()) {
//                Point p = listPoint.get(k);
//                if (p.getX() >= x1 - 5 && p.getX() <= x1 + 5 && p.getY() >= y1 - 5 && p.getY() <= y1 + 5) {
//                    System.out.println("*************class TankGame key1 tim duoc la :" + k + " obj: " + p.getObj());
//                    key = k;
//
//                }
//            }
//        } catch (Exception ex) {
//            Logger.getLogger(TankGame.class
//                    .getName()).log(Level.SEVERE, null, ex);
//        }
//        return key;
//    }
