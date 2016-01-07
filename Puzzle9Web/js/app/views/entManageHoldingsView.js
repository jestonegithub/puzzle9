/**
 * Created by jessestone on 1/6/16.
 */


define(function (require) {
    var mn = require('marionette');
    var tmpl = require('hbs!app/templates/entManageHoldingsView');


    var EntManageHoldingsView = mn.ItemView.extend({

        template: tmpl,

        id:"ent_manage_holdings_div"


    });

    return {EntManageHoldingsView:EntManageHoldingsView}

});