package com.jfgame.bean;

import java.util.Objects;

public class User {

    private String userName;
    private String pass;
    private int score;
    private int status; //0-Free; 1-Searching; 2-Playing
    private String userID;//= userID
    private int roomId;
    private String tableID;
    private String sessionID;
    private boolean onlyMessage;
    private String contentMessage;
    private String timer_out;

    public User() {
    }

    /**
     * @return the userName
     */
    public String getUserName() {
        return userName;
    }

    /**
     * @param userName the userName to set
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * @return the pass
     */
    public String getPass() {
        return pass;
    }

    /**
     * @param pass the pass to set
     */
    public void setPass(String pass) {
        this.pass = pass;
    }

    /**
     * @return the score
     */
    public int getScore() {
        return score;
    }

    /**
     * @param score the score to set
     */
    public void setScore(int score) {
        this.score = score;
    }

    /**
     * @return the status
     */
    public int getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(int status) {
        this.status = status;
    }

    /**
     * @return the onlyMessage
     */
    public boolean isOnlyMessage() {
        return onlyMessage;
    }

    /**
     * @param onlyMessage the onlyMessage to set
     */
    public void setOnlyMessage(boolean onlyMessage) {
        this.onlyMessage = onlyMessage;
    }

    /**
     * @return the contentMessage
     */
    public String getContentMessage() {
        return contentMessage;
    }

    /**
     * @param contentMessage the contentMessage to set
     */
    public void setContentMessage(String contentMessage) {
        this.contentMessage = contentMessage;
    }

    /**
     * @return the userID
     */
    public String getUserID() {
        return userID;
    }

    /**
     * @param userID the userID to set
     */
    public void setUserID(String userID) {
        this.userID = userID;
    }

    /**
     * @return the sessionID
     */
    public String getSessionID() {
        return sessionID;
    }

    /**
     * @param sessionID the sessionID to set
     */
    public void setSessionID(String sessionID) {
        this.sessionID = sessionID;
    }

    /**
     * @return the tableID
     */
    public String getTableID() {
        return tableID;
    }

    /**
     * @param tableID the tableID to set
     */
    public void setTableID(String tableID) {
        this.tableID = tableID;
    }

    /**
     * @return the roomId
     */
    public int getRoomId() {
        return roomId;
    }

    /**
     * @param roomId the roomId to set
     */
    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 89 * hash + Objects.hashCode(this.sessionID);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final User other = (User) obj;
        if (!Objects.equals(this.sessionID, other.sessionID)) {
            return false;
        }
        return true;
    }

    /**
     * @return the timer_out
     */
    public String getTimer_out() {
        return timer_out;
    }

    /**
     * @param timer_out the timer_out to set
     */
    public void setTimer_out(String timer_out) {
        this.timer_out = timer_out;
    }
}
