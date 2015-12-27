/**
 * Created by jessestone on 12/15/15.
 */


define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var _ = require('underscore');
    var pm = require('./programModel');
    var ssm = require('./subscriptionSiteModel');
    var sv = require('../views/subscriptionView');
    var rrm = require('./royalroadModel');
    var rrv = require('../views/roayroadItemView');


    var site_index={

        'UBC Home':{
            address:'http://localhost:8123/#ubcHome',
            model: new ssm.SubscriptionSiteModel(),
            view_class: sv.SubscriptionSiteItemView
        },

        'Royal Road':{
            address:'http://7hd3rr9347.onion',
            model: new rrm.RoyalRoadModel(),
            view_class: rrv.RoyalRoadItemView
        }
    };



    // there is TERMINAL and also a Hacker console - both sub-classes of this broader Console class of Model
    var BrowserModel = pm.ProgramModel.extend({

        //all terminals have: title bar, text display area and text input area
        defaults:{

            bookmark_list:['UBC Home'],
            current_site:'UBC Home',
            current_address:'http://localhost:8123/#ubcHome',
            current_model:site_index['UBC Home']['model'],
            current_view_class:site_index['UBC Home']['view_class'],
            open:false,
            installed:true

        },

        initialize:function(){

          //bb.on('make_site2_available',function(){this.addSite('site2')},this)
            //_.bind(this.addSite('Royal Road'),this)();

            this.on('change:current_site',function(){console.log('site changed')});

        },


        addSite:function(site){

            console.log(this.bookmark_list);

                //.push(site);

        },

        setCurrentSite:function(){

            this.set({'current_address' : site_index[this.get('current_site')]['address']});
            this.set({'current_model' : site_index[this.get('current_site')]['model']});
            this.set({'current_view_class' : site_index[this.get('current_site')]['view_class']});

        }

    });



    return {BrowserModel:BrowserModel}

});