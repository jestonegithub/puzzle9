/**
 * Created by jessebstone on 11/22/15.
 */


define(function (require) {
    var mn = require('marionette');
    var progressbar = require('progressbar');

    // This is a MOCK VIEW - meaning it doesn't do what a Marionette (or backbone) view does - its just a kluge of UI because, well, its just a transition screen.
    //   MAYBE I'll update it later.

    var load_gap = 500;  //ms to wait before starting load screen - just for effect

    var LoadOSView = mn.View.extend({

        initialize:function() {

            var current_view = this;

            setTimeout(function(){
            console.log('loading sequence');
            $('#start_button').css('margin-top', '300px');
            $('#start_button').show();
            var start_button = new progressbar.Circle('#start_button', {
                strokeWidth: 2,
                color: '#FCB03C',
                text: {value: 'Connecting to Remote Desktop'}
            });
            start_button.animate(1, {duration: 1000}, function () {
                $('#start_button').remove();
                current_view.trigger('loadOSEnd');
            });
                },load_gap);

        }
});

    return{LoadOSView:LoadOSView}
});