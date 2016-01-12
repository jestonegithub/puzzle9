/**
 * Created by jessestone on 1/11/16.
 */


define(function (require) {
    var mn = require('marionette');
    var tmpl = require('hbs!app/templates/entpurchaseHoldingsItemView');


    var PurchaseHoldingsItemView = mn.ItemView.extend({

        template: tmpl,

        className:"purchased_holding",

        modelEvents: {
            'change:quantity': 'render'
        }


    });


    return {PurchaseHoldingsItemView:PurchaseHoldingsItemView}

});