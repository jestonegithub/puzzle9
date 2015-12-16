/**
 * Created by jessestone on 12/15/15.
 */


define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var pm = require('./programModel');



    // there is TERMINAL and also a Hacker console - both sub-classes of this broader Console class of Model
    var BrowserModel = pm.ProgramModel.extend({

        //all terminals have: title bar, text display area and text input area
        defaults:{

            bookmark_list:{},
            current_site:''


        },


        addBookmark:function(){}

        


    });





    return {BrowserModel:BrowserModel}





});