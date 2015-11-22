/**
 * Created by jessebstone on 10/26/15.
 */


define(['./inventory','./ewallet','./resource_items','./timer'],function(inventory,ewallet,resourceitems,timer) {

    // parameters
    var ads_cost_coeff = 1;
    var ad_worker_multiplier = 5;
    var occupation_resource_interval = 5; //i.e., # of global units per resource update from workers
    var worker_delay = 3000; //number of ms before workers are created for each new ad



    var init_workers = function(){

        inventory.register_item('ads');
        inventory.register_item('workers');


    };


    // Ads 'class'
    function Ads() {

        this.num_ads = 0;
        this.cost = ads_cost_coeff*this.num_ads+1


    };

    Ads.prototype = {
        constructor:Ads,
        item_type:"Ads",
        max:10,
        //cost: this.num_ads+1,
        icon:"fa fa-newspaper-o",
        cost_type:"USD",
        available:true,
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
        }

    };


    // Workers 'class'
    function Workers() {

        this.num_workers = 0;
        this.occupied_workers = 0;
        this.avail_workers=this.num_workers-this.occupied_workers;


    };

    Workers.prototype = {
        constructor:Workers,
        item_type:"Workers",
        max:ad_worker_multiplier*Ads.max,
        icon:"fa fa-user",
        available:true,
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
    };


    // 'Occupation' class

    function Occupation(occupation_type) {

        this.occupation_type = occupation_type;
        this.max=occupations_table[occupation_type]['max'];
        this.num_active = 0;
        this.sinks = occupations_table[occupation_type]['sinks'];
        this.sources = occupations_table[occupation_type]['sources'];
        var self=this;


    };


    Occupation.prototype = {
        constructor:Occupation,
        item_type:"Occupation",
        available:true,
        increase_occupation:function(worker){
            if ((this.num_active < this.max) && (worker.avail_workers > 0)){
                this.num_active += 1;
                worker.add_occupied_workers(1);
                if (this.num_active === 1){
                    timer.addToList(this.occupation_type,this.update_resources.bind(this),occupation_resource_interval)}
            }
        },
        decrease_occupation: function(worker){
            if (this.num_active > 0) {
                this.num_active -= 1;
                worker.remove_occupied_workers(1);
                if (this.num_active === 0){timer.removeFromList(this.occupation_type)}
            }

        },
        update_resources: function() {

                // NEEDS WORK!!!!!!!!!!!!!!!!!!!!!!!!

                    // Need to do the following
                   //   1 - check that all costs are met
                   //   2- update cost resources
                   //   3 - update gained resources


                // this is probably very inefficient, but for now just going to look through costs/sinks for each number active for occupation
                for (i=0;i<this.num_active;i++) {

                    // check for sufficient funds
                    var sufficient_funds=check_funds(this.sinks);

                    if (sufficient_funds === true) {
                        //for sinks (costs)
                        for (var name in this.sinks) {
                            if (this.sinks.hasOwnProperty(name)) {
                                // special case where its btc or dollars, which don't have methods
                                if (name === 'btc' || name === 'dollars') {
                                        ewallet['change_' + name](-1 * this.sinks[name])
                                } else {
                                        resourceitems[name]['remove_resource'](this.sinks[name])
                                }
                            }
                        }
                        //for sources (gained resources)
                        for (var name in this.sources) {
                            if (this.sources.hasOwnProperty(name)) {

                                // special case where its btc or dollars, which don't have methods
                                if (name === 'btc' || name === 'dollars') {
                                        ewallet['change_' + name](this.sources[name])
                                } else {
                                        console.log(name,resourceitems[name]['add_resource']);
                                        resourceitems[name]['add_resource'](this.sources[name])
                                }
                            }
                        }
                    }
                }
            }
    };




    // stores the parameters for various occupations
    var occupations_table = {


      coders: {

          max: 10,
          sinks:{
              dollars:10
          },
          sources:{

            btc:1,
            emails:5,
            pass:10


          }
      },

      pharmacists: {
          max: 10,
          sinks:{
              dollars:10
          },
          sources:{
              pills:10
          }
      },

        clerks:{
          max:10,
            sinks:{
                dollars:10
            },
            sources:{
                passports:1
            }
        },

        journalists: {
            max:10,
            sinks:{
                dollars:10
            },
            sources:{
                intel:1,
                trade:1
            }



        },

        researchers: {},

        traders: {},

        engineers: {}


    };


    // Utility Functions

    var check_funds = function(costs){
        //checks that 'funds' (money or resources) are available for a purchase
        for (var name in costs) {
            if (costs.hasOwnProperty(name)) {
                // special case where its btc or dollars, which don't have methods
                if (name === 'btc' || name === 'dollars') {
                    if (ewallet['get_avail_' + name]() < costs[name]) {return false}
                } else {
                    if (resourceitems[name]['num']() < costs[name]) {return false}
                }
            }
        }

        return true;

    };

    return{Ads:Ads,
    Workers:Workers,
    Occupation:Occupation,
    occupations_table:occupations_table,
    init_workers:init_workers}


});