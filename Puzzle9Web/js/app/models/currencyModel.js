/**
 * Created by jessebstone on 11/27/15.
 */



define(function (require) {
    // var mn = require('marionette');
    var bb = require('backbone');

    var DefaultCurrencyMax = 99999999;

    // a RESOURCE is anything that can be quantified, obtained and used to 'purchase' something else - currency is the exception and is separate

    var CurrencyModel = bb.Model.extend({

        defaults: {

            quantity: 0,
            active:false,
            type:'currency'

        },

        // all currencies require a name and type to be passed in when instance is created...


        // currencies can be added and removed...
        add_currency: function (num_added) {

            if (this.get('quantity')+num_added <= DefaultCurrencyMax){
                this.set({'quantity':this.get('quantity')+num_added});
            }

            console.log('coins:'+this.get('quantity'));

        },

        remove_currency: function (num_removed) {
            if (this.get('quantity') >= num_removed) {
                this.set({'quantity':this.get('quantity')-num_removed});
            }
        }
    });


    var Coins = new CurrencyModel({name:'trucoin',symbol:'trc'});
    var Dollars = new CurrencyModel({name:'dollars',symbol:'usd'});


    return {Coins:Coins,
            Dollars:Dollars}


});