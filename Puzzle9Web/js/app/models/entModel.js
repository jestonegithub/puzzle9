/**
 * Created by jessestone on 1/3/16.
 */


define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var _ = require('underscore');
    var hm = require('./holdingModel');
    var om = require('./occupationModel');
    var lhc = require('../collections/PurchaseHoldingCollection');
    var mhc = require('../collections/ManageHoldingCollection');
    var util = require('../Utilities');


    // parameters

        //delay before new workers are added after purchasing ads (in ms)
        var worker_delay = 1000;


    // The Ent Model...

    // there is TERMINAL and also a Hacker console - both sub-classes of this broader Console class of Model
    var EntModel = bb.Model.extend({

        //all terminals have: title bar, text display area and text input area
        defaults:{

            open: false,
            installed:false,
            current_page:'Overview',
            ad_rate:1,
            ads_purchased:0,
            ads_max:20,
            workers:0,
            workers_avail:0,
            workers_occupied:0,
            purchase_holdings:[],
            manage_holdings:[],
            purchase_collection: new lhc.PurchaseHoldingCollection(),
            manage_collection: new mhc.ManageHoldingCollection()

        },

        // Add Holdings to screen
        updateAvailHoldings:function(){



        },

        //AD methods (buy, remove and update # workers)
        buy_ads: function(){

             if (this.get('ads_purchased') < this.get('ads_max')) {

                 if (util.withdrawal_funds('dollars', this.get('ad_rate'))) {

                     var current_ad_cnt = this.get('ads_purchased');
                     this.set({'ads_purchased': current_ad_cnt + 1});
                     this.update_workers();
                     console.log(this.get('ads_purchased'));

                 }
             }

        },
        remove_ads: function(num_deleted) {


        },

        update_workers: function() {

            console.log('in update workers - countdown...');
            setTimeout(_.bind(this.add_workers,this,5),worker_delay);

        },


        // Worker Methods
        add_workers: function(num){
            console.log('in add workers...');
            this.set({'workers': this.get('workers')+num});
            this.set({'workers_avail':this.get('workers')-this.get('workers_occupied')});
            console.log(this.get('workers'));


        },
        remove_workers: function(num) {
            if (this.num_workers >= num){this.num_workers -= num}
        },

        add_occupied_workers: function(num_added) {
            this.occupied_workers += num_added;
            this.avail_workers=this.num_workers-this.occupied_workers;
        },
        remove_occupied_workers: function(num_removed) {
            this.occupied_workers -= num_removed;
            this.avail_workers=this.num_workers-this.occupied_workers;
        },


        //this is for adding holdings (used by external modules)
        add_listed_holding: function(listing){

            this.get('purchase_collection').add(hm.Holdings[listing]);

        },


        //this is used to change the holding from the listed to purchased state
        change_to_purchased_holding: function(listing){

            var model= this.get('purchase_collection').where({name:listing});
            this.get('manage_collection').add(model);
            this.get('purchase_collection').remove(model);

        }





    });









    return {EntModel:EntModel}

});