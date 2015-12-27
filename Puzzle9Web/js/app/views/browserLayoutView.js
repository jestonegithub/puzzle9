/**
 * Created by jessestone on 12/16/15.
 */


define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var _ = require('underscore');
    var bootstrap = require('bootstrap');
    var browserLayout_tmpl = require('hbs!app/templates/browserLayoutView');
    var bmv = require('./browserMenuItemView');

    var BrowserLayoutView = mn.LayoutView.extend({

        template: browserLayout_tmpl,

        id:"browser_div",

        regions: {
            menuregion:'#browser_menu_region',
            siteregion:'#site_content_region'
        },



        initialize: function(){

            this.on('show',this.load_menu,this);
            bb.on('new_site_selected', _.bind(this.load_site,this));
            
        },

        load_menu: function(){

            this.getRegion('menuregion').show(new bmv.BrowserMenuItemView({model:this.model}));

        },


        load_site:function(){

            console.log('loading site');
            var site_model = this.model.get('current_model');
            var site_view_class = this.model.get('current_view_class');
            this.getRegion('siteregion').show(new site_view_class({model:site_model}));

        }
    });



    return {BrowserLayoutView:BrowserLayoutView}


});