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
        add_resource: function (num_added) {
            if (this.num+num_added <= DefaultResourceMax){
                this.num += num_added;
            }
        },

        remove_resource: function (num_removed) {
            if (this.num >= num_removed) {
                this.num -= num_removed
            }
        }
    });



    return {CurrencyModel:CurrencyModel}


});