/**
 * Created by jessestone on 1/5/16.
 */


define(function (require) {
    var bb = require('backbone');



    // there is TERMINAL and also a Hacker console - both sub-classes of this broader Console class of Model
    var OccupationModel = bb.Model.extend({

        defaults:{

            name:'',
            num_active: 0,
            max:'',
            sinks: {},
            sources:{}

        },


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
                            resourceitems[name]['remove_currency'](this.sinks[name])
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
                            console.log(name,resourceitems[name]['add_currency']);
                            resourceitems[name]['add_currency'](this.sources[name])
                        }
                    }
                }
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


    var Occupations = {};

    for (var name in occupations_table){
        if (occupations_table.hasOwnProperty(name)) {

            Occupations[name]= new OccupationModel({
                'name': name,
                'max' : occupations_table[name].max,
                'sinks' : occupations_table[name].sinks,
                'sources' : occupations_table[name].sources
             })


        }
    }




    return {Occupations:Occupations}


});















