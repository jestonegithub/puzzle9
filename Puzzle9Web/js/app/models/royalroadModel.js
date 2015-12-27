/**
 * Created by jessestone on 12/22/15.
 */


define(function (require) {
    // var mn = require('marionette');
    var bb = require('backbone');

    var RoyalRoadModel = bb.Model.extend({

        defaults: {

            test:'royal road'

        }

    });

    return {RoyalRoadModel:RoyalRoadModel}


});