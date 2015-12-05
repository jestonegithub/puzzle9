/**
 * Created by jessebstone on 11/27/15.
 */

define(function (require) {
    var mn = require('marionette');
    var currency_tmpl = require('hbs!app/templates/currency_Box');



    var CurrencyItemView = mn.ItemView.extend({

        template: currency_tmpl,

        className:"active_currency",

        modelEvents: {
            'change:quantity': 'render'
        }


    });


    return {CurrencyItemView:CurrencyItemView}

});