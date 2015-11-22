/**
 * Created by jessebstone on 11/11/15.
 */


define(['./resource_items','./ewallet'],function(resourceitems,ewallet) {

    // Hackingprog 'class'

    function Hackingprog(hackingprog_type) {

        this.hackingprog_type = hackingprog_type;
        this.name = hackingprog_table[hackingprog_type]['name'];
        this.costs= hackingprog_table[hackingprog_type]['costs'];
        this.blurb = hackingprog_table[hackingprog_type]['blurb'];
        this.purchased = false;
        this.registering_items = hackingprog_table[hackingprog_type]['registering_items'];

    };

    Hackingprog.prototype = {
        constructor:Hackingprog,
        item_type:"Hacking Program",
        available:true,
        purchase_tool: function() {

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


    var hackingprog_table = {

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




    // AttackItem 'class'
    function Attackitem(attackitem_type) {

        this.attackitem_type = attackitem_type;
        this.name = attackitem_table[attackitem_type]['name'];
        this.num = 0;



    };

    Attackitem.prototype = {
        constructor: Attackitem,
        item_type: "Resource",
        available: true,
        register_resource: function(){
            inventory.register_item(this.resource_type)
        },
        add_resource: function (num_added) {

            this.num += num_added;
            inventory.update_item(this.resource_type,this.num);


        },

        remove_resource: function (num_removed){

            if(this.num >= num_removed) {this.num -= num_removed};

        }


    };



    var resources_table = {

        emails: {

            name:'emails'
        },

        pass: {

            name:'passwords'
        },

        bots: {

            name:'bots'
        },

        pills: {

            name:'pills'
        },

        trade: {

            name:'trade secrets'
        },

        intel: {

            name:'foreign intel'

        },
        docs:{

            name:'passports'

        },

        exploits: {

            name:'exploits'
        },

        silicon: {

            name:'silicon'
        },

        chips: {

            name: 'chips'

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



});

