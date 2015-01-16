/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jfgame.bean;

/**
 *
 * @author Bach
 */
public class Tank {

    private String tank;
    private float x, y;
    private String navigation;

    public String getNavigation() {
        return navigation;
    }

    public void setNavigation(String navigation) {
        this.navigation = navigation;
    }
    private String session;

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

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }
}
