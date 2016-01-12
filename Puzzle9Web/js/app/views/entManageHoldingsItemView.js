/**
 * Created by jessestone on 1/11/16.
 */


define(function (require) {
    var mn = require('marionette');
    var tmpl = require('hbs!app/templates/entManageHoldingsItemView');


    var ManageHoldingsItemView = mn.ItemView.extend({

        template: tmpl,

        className:"managed_holding",

        modelEvents: {
            'change:quantity': 'render'
        }


    });


    return {ManageHoldingsItemView:ManageHoldingsItemView}

});