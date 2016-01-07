/**
 * Created by jessestone on 1/6/16.
 */


define(function (require) {
    var mn = require('marionette');
    var tmpl = require('hbs!app/templates/entPurchaseHoldingsView');


    var EntPurchaseHoldingsView = mn.ItemView.extend({

        template: tmpl,

        id:"ent_purchase_holdings_div"


    });

    return {EntPurchaseHoldingsView:EntPurchaseHoldingsView}

});