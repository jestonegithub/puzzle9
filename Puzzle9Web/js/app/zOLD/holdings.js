/**
 * Created by jessebstone on 10/26/15.
 */

define(['./inventory','./ewallet','./resource_items'],function(inventory,ewallet,resourceitems) {


    // Holding 'class'
    function Holding(holdings_type) {

        this.holding_type = holdings_type;
        this.name = holdings_table[holdings_type]['name'];
        this.costs= holdings_table[holdings_type]['costs'];
        this.occupation_supported = holdings_table[holdings_type]['occupation_supported'];
        this.blurb = holdings_table[holdings_type]['blurb'];
       // this.icon = holdings_table[holdings_type]['icon'];
        this.purchased = false;
        this.registering_items = holdings_table[holdings_type]['registering_items'];



    };

    Holding.prototype = {
        constructor:Holding,
        item_type:"Holdings",
        available:true,
        buy_holding: function() {

            //check that sufficient funds are available
            var sufficient_funds = check_funds(this.costs);


            if (sufficient_funds === true) {
                for (var name in this.costs) {
                    if (this.costs.hasOwnProperty(name)) {

                        // special case where its btc or dollars, which don't have methods
                        if (name === 'btc' || name === 'dollars') {

                            if (ewallet['get_avail_' + name]() >= this.costs[name]) {
                                ewallet['change_' + name](-1 * this.costs[name])
                                this.purchased = true;
                            }

                        } else {

                            if (resourceitems[name]['num'] >= this.costs[name]) {
                                resourceitems[name]['remove_resource'](this.costs[name])
                                this.purchased = true;
                            }
                        }
                    }
                }


                this.purchased = true;

                for (i = 0; i < this.registering_items.length; i++) {
                    console.log(this.registering_items[i]);
                    resourceitems[this.registering_items[i]].register_resource()
                }


            }

        }

    };


    var holdings_table = {

        zyng: {

            name:'Zyng!',
            occupation_supported:'coders',
            costs: {

                btc:1

            },
            blurb:'Addictive games with Adware.',
            registering_items:['emails','pass']


        },

        epharm: {


            name: 'E-Pharm',
            occupation_supported: 'pharmacists',
            costs: {
                btc:10
            },
            blurb:'No prescriptions?  No problem.',
            registering_items:['pills']


        },

        ezpaper: {

            name: 'E-Z-Papers',
            occupation_supported: 'clerks',
            costs: {
                btc:10
            },
            blurb:'Important documents when you need them.',
            registering_items:['docs']


        },

        press:{

            name:'FreedomPress',
            occupation_supported:'journalists',
            costs: {
                btc:10
            },
            blurb:'Liberate Information',
            registering_items:['intel','trade']

        },


        safeware: {

            name: 'Safeware',
            occupation_supported: 'researchers'

        },

        commgroup: {

            name: 'Commodities Group',
            occupation_supported: 'traders'

        },

        orange: {

            name: 'Orangebox',
            occupation_supported: 'engineers'
        }



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

    return {holdings_table:holdings_table,
            Holding:Holding}



});