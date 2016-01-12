/**
 * Created by jessestone on 1/5/16.
 */



define(function (require) {
    var bb = require('backbone');




    // there is TERMINAL and also a Hacker console - both sub-classes of this broader Console class of Model
    var HoldingModel = bb.Model.extend({

        //all terminals have: title bar, text display area and text input area
        defaults:{

            name:'',
            costs:{},
            cost_list:'',
            occupation:{},
            blurb: '',
            registering_items:[],
            purchased: false,
            listed:false

        },

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
                                resourceitems[name]['remove_currency'](this.costs[name])
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

    });


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



        }
        //,
        //
        //researchers: {},
        //
        //traders: {},
        //
        //engineers: {}


    };




    var holdings_list={

        zyng: {

            name:'Zyng!',
            occupation_supported: 'coders',
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

        }
        //,
        //
        //
        //safeware: {
        //
        //    name: 'Safeware',
        //    occupation_supported: 'researchers'
        //
        //},
        //
        //commgroup: {
        //
        //    name: 'Commodities Group',
        //    occupation_supported: 'traders'
        //
        //},
        //
        //orange: {
        //
        //    name: 'Orangebox',
        //    occupation_supported: 'engineers'
        //}

    };


    function objListString(obj){

        var list='';

        for (var name in obj) {
            if (obj.hasOwnProperty(name)) {
                list=list+name+': '+obj[name].toString()+' ';
            }
        }

        return list;

    }



    var Holdings = {}; //an object containing all possible holdings in the game

    for (var name in holdings_list){
        if (holdings_list.hasOwnProperty(name)) {

            Holdings[name]= new HoldingModel({

                'name':name,
                'costs':holdings_list[name].costs,
                'cost_list':objListString(holdings_list[name]['costs']),
                'blurb': holdings_list[name].blurb,
                'registering_items':holdings_list[name].registering_items,
                'purchased':holdings_list[name].purchased,
                'listed':holdings_list[name].listed,
                'occupation':occupations_table[holdings_list[name].occupation_supported]

            })


        }
    }




    return {HoldingModel:HoldingModel,
            Holdings:Holdings,
            holdings_list:holdings_list}


});



