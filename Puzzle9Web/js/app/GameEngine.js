/**
 * Created by jessebstone on 11/16/15.
 */

var tester = {};  //creating a global object that GameEngine instance will attach to so I can do manual calls for testing...

define(function (require) {
    var _ = require('underscore');
    var bb = require('backbone');
    var mn = require('marionette');
    var sv = require('./views/meta_views/startView');
    var lv = require('./views/meta_views/loadOSView');
    var gmv = require('./views/meta_views/gamemenuView');
    var osv = require('./views/osLayoutView');
    var rm = require('./models/resourceModel');
    var rlv = require('./views/resourcesLayoutView');
    var cm = require('./models/currencyModel');
    var tiv = require('./views/terminalItemView');
    var tm = require('./models/terminalModel');
    var time = require('./models/timeModel');
    var civ = require('./views/currencyItemView');
    var bm = require('./models/browserModel');




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
            this.local_mining_interval = 5;
            this.coin_currency = {};

        },


        goToStart:function(){
            //loads the stand-alone start screen (no associated model) - loadOS method is then called upon custom event firing indicating startsequence over
            this.startview = new sv.StartView();

        },

        loadOS:function(){


            //loadOS just shows a loading progress(circle) - no logic
            this.loadOSview = new lv.LoadOSView();

            //next we will instantiate the OS model and the OS view (i.e., Cryptonite OS, the main game view) - and append it to the DOM only after 'loadOS' sequence has ended
            //  the OS view is going to be the 'root view' of the game. It will live in #main, which is a 900x720 DIV (or whatever the dimensions end up being)

            //Here we load all the models and views that are necessary to run the basic OS features - we also load models for all resources, tools (not yet available) and
            //    and currency

            //load in MODELS
            //  Resources and currency/prices (placeholder for price only) - TODO: add tool models
            this.resources = rm.Resources; // to reduce clutter in GameEngine, object of all resources is loaded within resourceModel module and exported to here
            this.coin_currency = new cm.CurrencyModel({name:'zipcoin',symbol:'zpc'});
            this.usd_currency = new cm.CurrencyModel({name:'dollars',symbol:'usd'});



            //creating overall oslayout view; append to DOM and then HIDE until load animation has ended

            this.oslayoutview = new osv.OSLayoutView().render();
            this.oslayoutview.append_layout();
            $('#game_wrapper').hide();


            //create VIEWS: for resources to go in region1 of the OSlayoutview, tools (TBD), currencies, control panel and feed - and OSlayout view

            //resource views
            this.resourceslayoutview = new rlv.ResourcesLayoutView();
            this.resourceslayoutview.render();
            this.oslayoutview.region1.show(this.resourceslayoutview);


            //TODO: tool views




            //// the TERMINAL is a default program on starting up OS - so we add a new terminal model
            this.terminalModel = new tm.TerminalModel({input_form_id:"#user_input"});
            //this.terminalView = new tiv.TerminalItemView({model:this.terminalModel});


            //// browser is also a default program on starting up OS - so we add a new browser model
            //TODO: this.browserModel = new bm.BrowserModel();



            this.listenTo(this.loadOSview,'loadOSEnd', function(){
                $('#game_wrapper').show();
                $('.suite_icons').hide();
                bb.trigger('OSrunning');
            });



            // TESTING
            tester.resources = this.resources;


        },

        loadOS_saved:function(){

            // This may be used when there is an existing game saved
            console.log('test');

        },


        //CONTROL PANEL STUFF


        initialize_control_buttons:function(){

            $('#home_btn_box').click(_.bind(function(){
                console.log('closing any open view in #activity');
                this.oslayoutview.activity.empty();
                this.terminalModel.set({'open': false});


            },this));


            $('#terminal_btn_box').click(_.bind(function(){

                if(this.terminalModel.get('open') === false) {
                    this.oslayoutview.activity.show(new tiv.TerminalItemView({model: this.terminalModel}));
                    this.terminalModel.set({'open': true});
                    console.log('opening terminal window in #activity');
                }
            },this));






        },

        freeze_control_buttons:function(){

          $('#home_btn_box').off('click');
          $('#terminal_btn_box').off('click');


        },

        add_control_button: function(){




        },


        inventory_init: function(){

            //this loads in the resources into


            //this.resourcescollection = new rc.ResourcesCollection();




        },


        // the following are methods related to GAME MENU Logic (like reset storage on 'restart')
        confirmRestart:function(){},

        hardRestart:function(){}

    });

    var game = new GameEngine();

    game.on('start',function(){
        if (savedgame === false){
            game.goToStart();
        }
        else{}
    });

    bb.on('sequenceend',_.bind(game.loadOS,game)); //will load up the OS once the 'start' animation is completed

    // call some more initalizing stuff around start-up
    bb.on('OSrunning',function(){
        //attaching handlers to the HOME and TERMINAL control buttons
        game.initialize_control_buttons();
    });

    //allows controls to be frozen and reactivated when things like password routine are running...
    bb.on('freeze_controls',game.freeze_control_buttons);
    bb.on('unfreeze_controls',function(){
        game.initialize_control_buttons();
    });



    game.time = new time.TimeModel();
    game.time.startTime();

    bb.on('starting_local_mining',function(){
        game.oslayoutview.coin_box.show(new civ.CurrencyItemView({model:game.coin_currency}));
        game.time.addToList('local_mining', function(){game.coin_currency.add_resource(1);}, game.local_mining_interval)
    });

    game.start();











    return GameEngine;
});