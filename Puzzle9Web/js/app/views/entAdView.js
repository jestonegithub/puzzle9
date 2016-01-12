/**
 * Created by jessestone on 1/6/16.
 */


define(function (require) {
    var mn = require('marionette');
    var tmpl = require('hbs!app/templates/entAdView');


    var EntAdView = mn.ItemView.extend({

        template: tmpl,

        id:"ent_ads_div",

        events:{

        'click #buy_ads_btn':'onAdPurchase'


        },

        modelEvents:{

            'change:ads_purchased':'render',
            'change:workers_avail':'render'

        },


        onAdPurchase:function(){
            this.model.buy_ads();
        }



    });

    return {EntAdView:EntAdView}

});