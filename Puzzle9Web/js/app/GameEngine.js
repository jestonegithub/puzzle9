/**
 * Created by jessebstone on 11/16/15.
 */


define(function (require) {
    var mn = require('marionette');
    var sv = require('./views/meta_views/startView');
    var lv = require('./views/meta_views/loadOSView');
    var gmv = require('./views/meta_views/gamemenuView');
    var osv = require('./views/osLayoutView');



    // The game engine is intended to handle the following:
    //   - determine if there is saved data, and if so, handle loading
    //   - load the app from start if no saved data
    //   - load in the various 'primary' pieces/modules of the game - e.g., Cryptonite OS & Actors
    //   - create the menu and house the menu logic



    var savedgame = false;

    var GameEngine = mn.Application.extend({

        initialize:function(){

            //TODO:check for saved data and initiate actions necessary to load app accordingly...for now assume none

            //the menu view is always visible throughout the life of the app - regardless of startscreen, main game, etc. - so we initialize it here
            this.gamemenuview = new gmv.GameMenuView();

        },

        goToStart:function(){
            //loads the stand-alone start screen (no associated model) - loadOS method is then called upon custom event firing indicating startsequence over
            this.startview = new sv.StartView();
            this.startview.on('sequenceend',this.loadOS);
        },

        loadOS:function(){
            //loadOS just shows a loading progress(circle) - no logic
            this.loadOSview = new lv.LoadOSView();

            //next we will instantiate the OS model and the OS view (i.e., Cryptonite OS, the main game view) - and append it to the DOM only after 'loadOS' sequence has ended
            //  the OS view is going to be the 'root view' of the game. It will live in #main, which is a 900x720 DIV (or whatever the dimensions end up being)

            this.oslayoutview = new osv.OSLayoutView().render();

            this.oslayoutview.listenTo(this.loadOSview,'loadOSEnd', this.oslayoutview.append_layout);

        },

        loadOS_saved:function(){

            // This may be used when there is an existing game saved

        },

        showOS:function(){
            //now we 'show' the OS
        },


        // the following are methods related to GAME MENU Logic (like reset storage on 'restart')
        confirmRestart:function(){},

        hardRestart:function(){}

    });

    var game = new GameEngine();

    game.on('start',function(){
        if (savedgame === false){game.goToStart();}
        else{}
    });

    game.start();




    return GameEngine;
});