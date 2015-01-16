/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jfgame.gametank;

import com.jfgame.bean.CountUser;
import static com.jfgame.gametank.TankGame.listUsname;
import static com.jfgame.gametank.TankGame.listuser;
import com.jfgame.bean.User;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.Session;
import org.codehaus.jackson.map.ObjectMapper;

/**
 *
 * @author Bach
 */
public class FreePlayer {

    private String current_sessionuid;
    private int roomId;

    public FreePlayer(String current_sessionuid, int roomId) {
        this.current_sessionuid = current_sessionuid;
        this.roomId = roomId;
    }

    public boolean addUserInCommonTable(String message, int free) {
        boolean ok = false;
        try {
            //them nguoi choi vao list user
            ObjectMapper useLogin = new ObjectMapper();
            User ulg = useLogin.readValue(message, User.class);
            String uname = "";
            if (free > 0) {
                if (CountUser.count <= Double.MAX_VALUE) {
                    CountUser.count++;
                } else {
                    CountUser.count = 0;
                }
                uname = "Guess_" + CountUser.count;
                ulg.setUserName(uname);
            }

            ulg.setSessionID(current_sessionuid);
            roomId = ulg.getRoomId();
            listUsname.add(ulg);
            for (Session session : listuser) {
                if (session.getId().equalsIgnoreCase(current_sessionuid)) {
                    String usercurrent = setDataForCurrent("userCurrent", "table", uname);
                    session.getBasicRemote().sendText(usercurrent);
                }
            }

        } catch (Exception e) {
            Logger.getLogger(FreePlayer.class.getName()).log(Level.SEVERE, null, e);
        }
        return ok;
    }

    private String setDataForCurrent(String command, String table_name, String usname) {
        StringBuilder sb = new StringBuilder();
        try {

            sb.append("[{");
            sb.append("\"userName\":\"");
            sb.append(usname);
            sb.append("\",");
            sb.append("\"sessionID\":\"");
            sb.append(current_sessionuid);
            sb.append("\",");
            sb.append("\"roomId\":\"");
            sb.append(roomId);
            sb.append("\",");
            sb.append("\"tableID\":\"");
            sb.append(table_name);
            sb.append("\"}]");
            sb.append(command);
        } catch (Exception e) {
            Logger.getLogger(FreePlayer.class.getName()).log(Level.SEVERE, null, e);
        }
        return sb.toString();

    }
}
