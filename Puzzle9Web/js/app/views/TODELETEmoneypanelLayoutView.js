/**
 * Created by jessebstone on 11/27/15.
 */


define(function (require) {
    var mn = require('marionette');

    var MoneypanelLayoutView = mn.LayoutView.extend({

        template: '#money_panel',

        regions: {
            btc_region:"#btc_region",
            usd_region:"#usd_region",
            region1c:"#price_region"
        }

    });


    return {MoneypanelLayoutView:MoneypanelLayoutView}


});