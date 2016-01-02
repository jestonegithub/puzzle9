/**
 * Created by jessestone on 1/1/16.
 */


define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var tmpl = require('hbs!app/templates/pricetickerItemView');


    var PriceTickerItemView = mn.ItemView.extend({

        template: tmpl,

        className:"price_box",

        modelEvents: {
            'change:current_price': 'render colorChanges'

        },


        colorChanges:function() {

            console.log('changing color');
            if (this.model.get('latest_price_change') < 0) {
                console.log('changing_to_red');
                $('#ticker_change').css('color', 'red')
            }
            else {
                $('#ticker_change').css('color', 'green')
            }

        }




    });


    return {PriceTickerItemView:PriceTickerItemView}

});