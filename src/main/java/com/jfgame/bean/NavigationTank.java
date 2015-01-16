/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jfgame.bean;

/**
 *
 * @author Bach
 */
public class NavigationTank {

    private float x, y, xend, yend, xstop, ystop;
    private String navigation, session,tank;

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

    public float getXend() {
        return xend;
    }

    public void setXend(float xend) {
        this.xend = xend;
    }

    public float getYend() {
        return yend;
    }

    public void setYend(float yend) {
        this.yend = yend;
    }

    public float getXstop() {
        return xstop;
    }

    public void setXstop(float xstop) {
        this.xstop = xstop;
    }

    public float getYstop() {
        return ystop;
    }

    public void setYstop(float ystop) {
        this.ystop = ystop;
    }

    public String getNavigation() {
        return navigation;
    }

    public void setNavigation(String navigation) {
        this.navigation = navigation;
    }

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }
    
}
