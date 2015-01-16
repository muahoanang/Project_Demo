/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jfgame.bean;

/**
 *
 * @author Bach
 */
public class TankCompetitorBean {

    private String tank;
    private float x, y;
    private String navigation;
    private int status;
    private int tankkey;
    private String session;
    private String evt;

    public String getEvt() {
        return evt;
    }

    public void setEvt(String evt) {
        this.evt = evt;
    }

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }

    public TankCompetitorBean(String tank, float x, float y, String navigation, int status, int tankkey) {
        this.tank = tank;
        this.x = x;
        this.y = y;
        this.navigation = navigation;
        this.status = status;
        this.tankkey = tankkey;
    }

    public TankCompetitorBean() {
    }

    public int getTankkey() {
        return tankkey;
    }

    public void setTankkey(int tankkey) {
        this.tankkey = tankkey;
    }

    public String getTank() {
        return tank;
    }

    public void setTank(String tank) {
        this.tank = tank;
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public String getNavigation() {
        return navigation;
    }

    public void setNavigation(String navigation) {
        this.navigation = navigation;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

}
