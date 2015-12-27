/**
 * Created by jessestone on 12/22/15.
 */


define(function (require) {
    var mn = require('marionette');
    var tmpl = require('hbs!app/templates/royalroadItemView');



    var RoyalRoadItemView = mn.ItemView.extend({

        template: tmpl,

        className:"subscription_site_div"

        //modelEvents: {
        //    'change:current_site': 'render'
        //}


    });


    return {RoyalRoadItemView:RoyalRoadItemView}

});