/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jfgame.gametank;

import com.jfgame.bean.Point;
import java.util.TreeMap;

/**
 *
 * @author Bach
 */
public class GetPointScreen implements Runnable {

    private String message = "";
    private int command = 0;
    private TreeMap<Integer, Point> listPoint_screen = new TreeMap();

    public GetPointScreen(String message, int command,TreeMap<Integer, Point> listPoint_screen) {
        this.message = message;
        this.command = command;
        this.listPoint_screen=listPoint_screen;
       
       
    }

    @Override
    public void run() {
        TankMove tankMove = new TankMove(message, listPoint_screen);
        if (command == 1) {
            tankMove.navigation();
        }
    }

}
