/**
 * Created by jessebstone on 11/22/15.
 */


// Another MOCK VIEW - may revise with template at a later date...

define(function (require) {
    var mn = require('marionette');


    var GameMenuView = mn.View.extend({

        initialize:function(){

            $('#game_menu').html('<div>Game Menu</div>');


        }
    });

    return {GameMenuView:GameMenuView}


});