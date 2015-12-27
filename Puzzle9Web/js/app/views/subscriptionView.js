/**
 * Created by jessestone on 12/20/15.
 */


define(function (require) {
    var mn = require('marionette');
    var tmpl = require('hbs!app/templates/subscriptionView');



    var SubscriptionSiteItemView = mn.ItemView.extend({

        template: tmpl,

        className:"subscription_site_div",

        events:{
            'click #subscription_button':'onSubscribe'
        },

        modelEvents: {
            'change:renewal_button_active': 'changeButton'
        },

        onSubscribe:function(){
            if ((this.model.get('attempting_renewal') === false) && (this.model.get('renewal_button_active') === true)){
            this.model.set({'attempting_renewal':true});}
        },


        changeButton:function(){

            if (this.model.get('renewal_button_active') === true){
                $('#subscription_button').addClass('renew_sub').text('Renew Subscription').show();
            }else{
                console.log('hey hey');
                $('#subscription_button').hide();
            }
        }








    });


    return {SubscriptionSiteItemView:SubscriptionSiteItemView}

});