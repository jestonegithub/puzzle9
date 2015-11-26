/**
 * Created by jessebstone on 11/23/15.
 */


define(function (require) {
    var mn = require('marionette');
    var os_tmpl = require('hbs!app/templates/osLayoutView');


    //This is a LayoutView - and the root view of the game living in #main

    var OSLayoutView = mn.LayoutView.extend({

        template: os_tmpl,

        regions: {
            inventory: "#inventory",
            panels: "#panels",
            money_panel: '#money_panel',
            inventory_menu: '#inventory_menu',
            control_panel: '#control_panel',
            activity: '#activity',
            feed: '#feed'

        },

        append_layout: function(){

            $('#main').append(this.el);

        }


    });


    return {OSLayoutView:OSLayoutView}

});

