/**
 * Created by jessebstone on 11/30/15.
 */

define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var pm = require('./programModel');



    // there is TERMINAL and also a Hacker console - both sub-classes of this broader Console class of Model
    var ConsoleModel = pm.ProgramModel.extend({

        //all terminals have: title bar, text display area and text input area
        defaults:{

            //title_bar:"console",
            //input_handle:"user",
            //input_form_id:"#form_input"
            //display_packets - no default: all consoles load in a file with various automated responses to be displayed based on input commands

        }

    });







    return {ConsoleModel:ConsoleModel}





});