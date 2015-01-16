/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jfgame.bean;

import java.util.HashMap;

/**
 *
 * @author Bach
 */
public class ListTankCompetitor {

    private HashMap<Integer, TankCompetitorBean> listTankCompetitor = new HashMap<>();

    public ListTankCompetitor() {

    }

    /**
     * +
     * tao ra tank doi thu trong mang
     *
     * @param key
     * @param tank
     * @param x
     * @param y
     * @param navigation
     * @param status
     */
    public void createTankCompetitor(int key, String tank, float x, float y, String navigation, int status, int tankkey) {
        TankCompetitorBean bean = new TankCompetitorBean(tank, x, y, navigation, status, tankkey);
        if (!listTankCompetitor.containsKey(key)) {
            listTankCompetitor.put(key, bean);
        } else {
// khong tao duoc ra tank do vi no da ton tai eoi
        }
    }
// phai co ham truy cap den tung tank trong day

    public TankCompetitorBean getTankCompetitorBean(int key) {
        TankCompetitorBean bean = new TankCompetitorBean();
        try {
            if (listTankCompetitor.containsKey(key)) {
                bean = listTankCompetitor.get(key);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return bean;
    }

    public HashMap<Integer, TankCompetitorBean> getListTankCompetitor() {
        return listTankCompetitor;
    }

    public void setListTankCompetitor(HashMap<Integer, TankCompetitorBean> listTankCompetitor) {
        this.listTankCompetitor = listTankCompetitor;
    }

}
