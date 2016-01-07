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
    var blv = require('./views/browserLayoutView');
    var bmv = require('./views/browserMenuItemView');
    var utils = require('./Utilities');
    var wv = require('./views/welcomeView');
    var trm = require('./models/tradingModel');
    var triv = require('./views/tradingItemView');
    var ptiv = require('./views/pricetickerItemView');
    var entv = require('./views/entLayoutView');
    var entm = require('./models/entModel');





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
            this.coin_currency = cm.Coins;
            this.usd_currency = cm.Dollars;



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
            this.browserModel = new bm.BrowserModel();


            //// trading model
            this.tradingModel = new trm.TradingModel();


            this.entModel = new entm.EntModel();



            this.listenTo(this.loadOSview,'loadOSEnd', function(){
                $('#game_wrapper').show();
                $('.suite_icons').hide();
                $('#trade_btn_box').find('.suite_icons').show();
                $('#ent_btn_box').find('.suite_icons').show();
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

            var set_all_as_closed=function(){

                this.terminalModel.set({'open': false});
                this.browserModel.set({'open': false});
                this.tradingModel.set({'open':false});
                this.entModel.set({'open':false});
                //this.current_browser_layout.destroy();

            };


            var destroy_browserLayout=function(){

                this.current_browser_layout.destroy();

            };

            $('#home_btn_box').click(_.bind(function(){
                console.log('closing any open view in #activity');
                this.oslayoutview.activity.empty();
                _.bind(set_all_as_closed,this)();
                if (this.current_browser_layout != undefined){_.bind(destroy_browserLayout,this)();}
                //this.terminalModel.set({'open': false});
                //this.browserModel.set({'open': false});


            },this));


            $('#terminal_btn_box').click(_.bind(function(){

                if(this.terminalModel.get('open') === false) {
                    this.oslayoutview.activity.show(new tiv.TerminalItemView({model: this.terminalModel}));
                    _.bind(set_all_as_closed,this)();
                    this.terminalModel.set({'open': true});
                    if (this.current_browser_layout != undefined){_.bind(destroy_browserLayout,this)();}
                    console.log('opening terminal window in #activity');
                }
            },this));


            $('#browser_btn_box').click(_.bind(function(){

                if(this.browserModel.get('open') === false) {
                    this.current_browser_layout = new blv.BrowserLayoutView({model:this.browserModel});
                    this.oslayoutview.activity.show(this.current_browser_layout);
                    _.bind(set_all_as_closed,this)();
                    this.browserModel.set({'open': true});

                    //load current view
                    this.current_browser_layout.load_site();

                    //load handler for when current site changes

                    //this.current_browser_layout.siteregion.show(new subv.SubscriptionSiteItemView({model:this.browserModel}));
                    console.log('opening browser window in #activity');
                }
            },this));

            $('#trade_btn_box').click(_.bind(function(){
                if(this.tradingModel.get('open') === false) {
                    this.oslayoutview.activity.show(new triv.TradingItemView({model: this.tradingModel}));
                    _.bind(set_all_as_closed,this)();
                    this.tradingModel.set({'open': true});
                    if (this.current_browser_layout != undefined){_.bind(destroy_browserLayout,this)();}
                    console.log('opening trading floor window in #activity');
                }
            },this));

            $('#ent_btn_box').click(_.bind(function(){
                if(this.entModel.get('open') === false) {
                    this.oslayoutview.activity.show(new entv.EntLayoutView({model: this.entModel}));
                    _.bind(set_all_as_closed,this)();
                    this.entModel.set({'open': true});
                    if (this.current_browser_layout != undefined){_.bind(destroy_browserLayout,this)();}
                    console.log('opening entrepreneur window in #activity');
                }
            },this));


        },

        freeze_control_buttons:function(){

          $('#home_btn_box').off('click');
          $('#terminal_btn_box').off('click');
          $('#browser_btn_box').off('click');
          $('#trade_btn_box').off('click');
          $('#ent_btn_box').off('click');



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
        game.oslayoutview.activity.show(new wv.WelcomeView());
    });

    bb.on('FreeTrialStarted',function(){
        //attaching handlers to the HOME and TERMINAL control buttons
        game.initialize_control_buttons();

    });

    //allows controls to be frozen and reactivated when things like password routine are running...
    bb.on('freeze_controls',game.freeze_control_buttons);
    bb.on('unfreeze_controls',function(){
        game.initialize_control_buttons();
    });



    game.time = time.Timer;
    game.time.startTime();

    bb.on('starting_local_mining',function(){
        game.oslayoutview.coin_box.show(new civ.CurrencyItemView({model:game.coin_currency}));
        game.time.addToList('local_mining', function(){game.coin_currency.add_currency(1);}, game.local_mining_interval);


        //DEV ONLY

        game.oslayoutview.usd_box.show(new civ.CurrencyItemView({model:game.usd_currency}));
        game.usd_currency.add_currency(100);
        game.oslayoutview.price_box.show(new ptiv.PriceTickerItemView({model:game.tradingModel}));

    });

    game.start();

    

    //For DEV: lets you tweet directly
    tester.tweet = utils.tweet;

    return GameEngine;
});