/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jfgame.bean;

import java.util.TreeMap;

/**
 *
 * @author Bach
 */
public class Map_screen {

    private TreeMap<Integer, Point> listPoint = new TreeMap();
    private TreeMap<Integer, Point> listPointMovefail = new TreeMap();

    public TreeMap<Integer, Point> getListPoint() {
        return listPoint;
    }

    public void setListPoint(TreeMap<Integer, Point> listPoint) {
        this.listPoint = listPoint;
    }

    public TreeMap<Integer, Point> getListPointMovefail() {
        return listPointMovefail;
    }

    public void setListPointMovefail(TreeMap<Integer, Point> listPointMovefail) {
        this.listPointMovefail = listPointMovefail;
    }

}
