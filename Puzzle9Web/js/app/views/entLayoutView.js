/**
 * Created by jessestone on 1/6/16.
 */

define(function (require) {
    var mn = require('marionette');
    var tmpl = require('hbs!app/templates/entLayoutView');
    var eov = require('./entOverviewView');
    var eav = require('./entAdView');
    var ephv = require('./entPurchaseHoldingsView');
    var emhv = require('./entManageHoldingsView');


    //This is a LayoutView - and the root view of the game living in #main

    var EntLayoutView = mn.LayoutView.extend({

        template: tmpl,

        id: "ent_div",

        regions: {
            ads: '#ad_container',
            holdings: '#ent_holding_container'

        },

        events:{

            'click #ent_menu_overview':'onOverview',
            'click #ent_menu_purchase':'onPurchase',
            'click #ent_menu_manage':'onManage'

        },

        onOverview:function(){

            this.getRegion('ads').empty();
            this.getRegion('holdings').show(new eov.EntOverviewView());

        },

        onPurchase:function(){

            this.getRegion('ads').show(new eav.EntAdView({model:this.model}));
            this.getRegion('holdings').show(new ephv.EntPurchaseHoldingsView());

        },

        onManage:function(){

            this.getRegion('ads').empty();
            this.getRegion('holdings').show(new emhv.EntManageHoldingsView());


        }


    });


    return {EntLayoutView:EntLayoutView}

});