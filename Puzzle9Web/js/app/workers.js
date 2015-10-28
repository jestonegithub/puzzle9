/**
 * Created by jessebstone on 10/26/15.
 */


define(['./inventory','./ewallet','./resource_items'],function(inventory,ewallet,resourceitems) {

    // parameters
    var ads_cost_coeff = 1;
    var ad_worker_multiplier = 5;
    var occupation_resource_interval = 10; //i.e., # of global units per resource update from workers



    var init_workers = function(){

        inventory.register_item('ads');
        inventory.register_item('workers');


    };


    // Ads 'class'
    function Ads() {

        this.num_ads = 0;


    };

    Ads.prototype = {
        constructor:Ads,
        item_type:"Ads",
        max:10,
        cost: ads_cost_coeff*this.num_ads,
        icon:"fa fa-newspaper-o",
        cost_type:"USD",
        available:true,
        buy_ads: function(){

             if (ewallet.get_avail_dollars() >= this.cost ){

                 this.num_ads += 1;
                 ewallet.change_dollars(-1*this.cost);

             }

        },
        delete_ads: function(num_deleted) {

                if (this.num_ads >= num_deleted){this.num_ads -= num_deleted}


        },

        update_workers: function() {




        }

    };


    // Workers 'class'
    function Workers() {

        this.num_workers = 0;
        this.occupied_workers = 0;


    };

    Workers.prototype = {
        constructor:Workers,
        item_type:"Workers",
        max:ad_worker_multiplier*Ads.max,
        icon:"fa fa-user",
        available:true,
        add_workers: function(num){

                this.num_workers += num;

        },
        remove_workers: function(num) {

            if (this.num_workers >= num){this.num_workers -= num}

        },

        add_occupied_workers: function(num_added) {

            if ((this.num_workers-this.occupied_workers) > num_added) {

                this.occupied_workers += num_added;

            }


        },


        remove_occupied_workers: function(num_removed) {

            if (this.occupied_workers >= num_removed) {

                this.occupied_workers -= num_removed;

            }


        }


    };


    // 'Occupation' class

    function Occupation(occupation_type) {

        this.occupation_type = occupation_type;
        this.max=occupations_table[occupation_type]['max'];
        this.num_active = 0;
        this.sinks = occupations_table[occupation_type]['sinks'];
        this.sources = occupations_table[occupation_type]['sources'];


    };


    Occupation.prototype = {
        constructor:Occupation,
        item_type:"Occupation",
        available:true,
        update_resources: function() {

            //register a function with timer that updates resources at resource interval

            var resource_accounting = function() {

                //for sinks (costs)
                for (var name in this.sinks) {
                    if (this.sinks.hasOwnProperty(name)) {

                        // special case where its btc or dollars, which don't have methods
                        if (name === 'btc' || name === 'dollars') {

                            if (ewallet['get_avail_'+name] >= this.sinks[name]) {ewallet['change_'+name](-1*this.sinks[name])}

                        }else{

                            if (resourceitems[name]['num'] >= this.sinks[name]) {resourceitems[name]['remove_resource'](this.sinks[name])}

                        }
                    }
                }


                //for sources (gained resources)

                for (var name in this.sources) {
                    if (this.sources.hasOwnProperty(name)) {

                        // special case where its btc or dollars, which don't have methods
                        if (name === 'btc' || name === 'dollars') {

                            if (ewallet['get_avail_'+name] >= this.sources[name]) {ewallet['change_'+name](this.sources[name])}

                        }else{

                            if (resourceitems[name]['num'] >= this.sources[name]) {resourceitems[name]['add_resource'](this.sources[name])}

                        }
                    }
                }



            }


        }

    };




    // stores the parameters for various occupations
    var occupations_table = {


      salesmen: {

          max: 10,
          sinks:{

              dollars:10

          },
          sources:{

            user_info:10,
            passwords:10,
            bots: 10

          }


      },

      pharmacists: {},

        activists: {},

        researchers: {},

        traders: {},

        engineers: {}


    };



});