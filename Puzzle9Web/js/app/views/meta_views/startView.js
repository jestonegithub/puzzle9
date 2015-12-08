/**
 * Created by jessebstone on 2/2/15.
 */

// This is a MOCK VIEW - meaning it doesn't do what a Marionette (or backbone) view does - its just a kludge of UI because, well, its just a start screen.
//     MAYBE I'll update it later.

define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var progressbar = require('progressbar');

    var StartView = mn.View.extend({

        initialize:function(){

            $('#main').append('<div id=title_circle></div><div id=start_button></div>');

             var title_circle = new progressbar.Circle('#title_circle', {strokeWidth: 2,color: '#572c94', text:{value:'Script9'},
                 fill: 'rgba(255,255,255,1)'});

             var start_button = new progressbar.Circle('#start_button', {strokeWidth:1, color:'#572c94',text:{value:'Start Game'},fill:'#ffffff'});

             var current_view = this;

             $('#start_button').click(function(){
                start_button.animate(1,function(){
                    $('#title_circle').remove();
                    $('#start_button').hide();
                    start_button.destroy();
                    bb.trigger('sequenceend');
                });
            });

                title_circle.animate(1);
        }
    });

    return {StartView:StartView}


});


