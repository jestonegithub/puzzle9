/**
 * Created by jessebstone on 11/23/15.
 */


define(function (require) {
    var mn = require('marionette');
    var os_tmpl = require('hbs!app/templates/osLayoutView');


    //This is a LayoutView - and the root view of the game living in #main

    var OSLayoutView = mn.LayoutView.extend({

        template: os_tmpl,

        id: "game_wrapper",

        regions: {
            inventory: "#inventory",
            region1:'#region1', //doubles for resources and terminal during hacking
            tools:'#tools',
            panels: "#panels",
            coin_box: '#coin_box',
            usd_box: '#usd_box',
            price_box: '#price_box',
            control_panel: '#control_panel',
            rainmeter: '#rainmeter',
            activity: '#activity',
            feed: '#feed'

        },

        append_layout: function(){

            $('#main').append(this.el);

        }







    });


    return {OSLayoutView:OSLayoutView}

});

