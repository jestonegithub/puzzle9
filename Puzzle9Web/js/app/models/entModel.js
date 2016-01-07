/**
 * Created by jessestone on 1/3/16.
 */


define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var hm = require('./holdingModel');
    var om = require('./occupationModel');


    // The Ent Model...

    // there is TERMINAL and also a Hacker console - both sub-classes of this broader Console class of Model
    var EntModel = bb.Model.extend({

        //all terminals have: title bar, text display area and text input area
        defaults:{

            open: false,
            installed:false,
            ad_rate:1,
            ads_purchased:0,
            ads_max:100,
            workers:0,
            workers_avail:0,
            workers_occupied:0,
            listed_holdings:[]

        },

        // Add Holdings to screen
        updateAvailHoldings:function(){



        },

        //AD methods (buy, remove and update # workers)
        buy_ads: function(worker){
            if ((ewallet.get_avail_dollars() >= this.cost) && (this.num_ads < this.max) ){
                this.num_ads += 1;
                ewallet.change_dollars(-1*this.cost);
                inventory.update_item('ads',this.num_ads);
                this.update_workers(worker);
            }

        },
        remove_ads: function(num_deleted) {

            if (this.num_ads >= num_deleted){this.num_ads -= num_deleted}
        },

        update_workers: function(worker) {

            setTimeout(function(){worker.add_workers(5)},worker_delay);
        },


        // Worker Methods
        add_workers: function(num){
            this.num_workers += num;
            this.avail_workers=this.num_workers-this.occupied_workers;
            inventory.update_item('workers',this.num_workers);

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
        }

        
    });









    return {EntModel:EntModel}

});