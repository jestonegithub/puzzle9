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



    };

    Holding.prototype = {
        constructor:Holding,
        item_type:"Holdings",
        available:true,
        buy_holding: function(){

            // need to loop through all the costs and check that they are available
            for (var name in this.costs) {
                if (this.costs.hasOwnProperty(name)) {

                    // special case where its btc or dollars, which don't have methods
                    if (name === 'btc' || name === 'dollars') {

                        if (ewallet['get_avail_'+name]() >= this.costs[name]) {
                            ewallet['change_'+name](-1*this.costs[name])
                            this.purchased=true;
                        }

                    }else{

                        if (resourceitems[name]['num'] >= this.costs[name]) {
                            resourceitems[name]['remove_resource'](this.costs[name])
                            this.purchased=true;
                        }

                    }
                }
            }
        },

        create_workers: function() {




        }

    };


    var holdings_table = {

        zyng: {

            name:'Zyng!',
            occupation_supported:'coders',
            costs: {

                btc:1

            },
            blurb:'Addictive games with Adware.'


        },

        epharm: {


            name: 'E-Pharm',
            occupation_supported: 'pharmacists',
            costs: {

                btc:10

            }


        },

        anon: {

            name: 'pseudo',
            occupation_supported: 'activists'

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



    }


    return {holdings_table:holdings_table,
            Holding:Holding}



});