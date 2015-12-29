/**
 * Created by jessestone on 12/27/15.
 */


define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var tmpl = require('hbs!app/templates/welcomeView');



    var WelcomeView = mn.ItemView.extend({

        template: tmpl,

        className:"welcome_div",

        events:{

            'click #start_trial_btn' : function(){

                bb.trigger('FreeTrialStarted');
                this.destroy();

            }


        }


    });


    return {WelcomeView:WelcomeView}

});