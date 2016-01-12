/**
 * Created by jessestone on 1/6/16.
 */

define(function (require) {
    var mn = require('marionette');
    var tmpl = require('hbs!app/templates/entLayoutView');
    var eov = require('./entOverviewView');
    var eav = require('./entAdView');
    var ephv = require('./entPurchaseHoldingsCollectionView');
    var emhv = require('./entManageHoldingsCollectionView');
    var eawv = require('./entAvailWorkerView');


    //This is a LayoutView - and the root view of the game living in #main

    var EntLayoutView = mn.LayoutView.extend({

        template: tmpl,

        id: "ent_div",

        regions: {
            ads: '#ad_container',
            holdings: '#ent_holding_container'

        },

        initialize:function(){

            var current_page = this.model.get('current_page');
            this.on('show',function(){
                this['on'+current_page]();
            },this);

        },


        events:{

            'click #ent_menu_overview':'onOverview',
            'click #ent_menu_purchase':'onPurchase',
            'click #ent_menu_manage':'onManage'

        },

        onOverview:function(){

            // clear existing underlines in menu and set selected menu item
            $('.ent_menu').css('color','white');
            $('#ent_menu_overview').css('color','yellow');

            this.getRegion('ads').empty();
            this.getRegion('holdings').show(new eov.EntOverviewView());

        },

        onPurchase:function(){

            // clear existing underlines in menu and set selected menu item
            $('.ent_menu').css('color','white');
            $('#ent_menu_purchase').css('color','yellow');

            this.getRegion('ads').show(new eav.EntAdView({model:this.model}));
            this.getRegion('holdings').show(new ephv.EntPurchaseHoldingsCollectionView({collection:this.model.get('purchase_collection')}));


        },

        onManage:function(){

            // clear existing underlines in menu and set selected menu item
            $('.ent_menu').css('color','white');
            $('#ent_menu_manage').css('color','yellow');

            this.getRegion('ads').show(new eawv.EntAvailWorkerView({model:this.model}));
            this.getRegion('holdings').show(new emhv.EntManageHoldingsCollectionView({collection:this.model.get('manage_collection')}));
            $('#ads').empty();


        }


    });


    return {EntLayoutView:EntLayoutView}

});