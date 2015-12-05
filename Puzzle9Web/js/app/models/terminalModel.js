/**
 * Created by jessebstone on 12/1/15.
 */



define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var cm = require('consoleModel');



    // TERMINAL MODEL
    var TerminalModel = cm.ConsoleModel.extend({


        defaults:{

            my_region:"#activity" //may or may not be useful for terminal to know where in OS layout it is (what region)

        },



        //terminal can be used for various purposes/actions, currently: install, load(hackerware) and read (local files)


        // command line instructions given by user will always contain an 'action' and a 'recipient' - there can be filler stuff too which doesn't matter

        action_list:['install','load','read'],
        recipient_list: ['bit-o-matic','crypton','entreprenuer'],

        parse_input:function(a_list,r_list){


            var action = "",recipient = "";

            //parse out 'action' (install, load, etc.) and 'recipient' (a particular program, file, etc.)

            

            return [action,recipient];

        },


        install:function(){},

        load:function(){},

        read: function(){},

        //this gets called by submit action in 'form' of terminal
        onNewCommand:function(){}




    });





    return {}





});