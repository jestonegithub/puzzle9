/**
 * Created by jessestone on 12/21/15.
 */


define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var time = require('./timeModel');
    var util = require('../Utilities');
    var _ = require('underscore');




    // there is TERMINAL and also a Hacker console - both sub-classes of this broader Console class of Model
    var SubscriptionSiteModel = bb.Model.extend({

        //all terminals have: title bar, text display area and text input area
        defaults:{

            active_subscription:false,
            attempting_renewal:false,
            renewal_button_active:true,
            renewal_late:false,
            renewal_period:2, //in days
            renewal_reminder_day:1,
            renewal_cost:1 //in USD

        },


        initialize:function() {

            this.on('change:attempting_renewal',function(){

                if (this.get('attempting_renewal') === true){

                    console.log('Attempting to Buy Subscription');
                    var withdrawal = util.withdrawal_funds('dollars',this.get('renewal_cost'));
                    console.log(withdrawal);
                    if (withdrawal) {

                        this.set({'active_subscription' : true});
                        this.set({'renewal_button_active' : false});
                        if (this.get('renewal_late') === true) {
                            time.Timer.restartTime();
                            this.set({'renewal_late' : false});
                        }
                        this.set({'attempting_renewal' :false});
                    }else{
                        this.set({'attempting_renewal' :false});
                        console.log('Insufficient Funds for Subscription');
                    }
                }
            },this);


            this.once('change:active_subscription',function(){

                time.Timer.addToList('subscription_reminder', _.bind(function () {
                    this.reminder();
                },this), time.Timer.get('game_date_duration')*this.get('renewal_reminder_day'));

                time.Timer.addToList('subscription_shutdown', _.bind(function () {
                    this.shutDown();
                },this), time.Timer.get('game_date_duration')*this.get('renewal_period'));


            },this);


        },

        reminder:function(){

            console.log('pay your bill!');
            this.set({'renewal_button_active' : true});

        },

        shutDown:function(){

            if (this.active_subscription != true) {

                console.log('shutting off programs');
                time.Timer.pauseTime();
                this.set({'renewal_late' : true});
            }
        }


    });

    return {SubscriptionSiteModel:SubscriptionSiteModel}

});