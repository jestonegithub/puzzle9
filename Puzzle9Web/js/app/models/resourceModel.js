/**
 * Created by jessebstone on 11/26/15.
 */


define(function (require) {
   // var mn = require('marionette');
    var bb = require('backbone');
    var rl = require('../../../data/resource_list');


    var DefaultResourceMax = 99999999999;

    // a RESOURCE is anything that can be quantified, obtained and used to 'purchase' something else - currency is the exception and is separate

    var ResourceModel = bb.Model.extend({

        defaults: {

            quantity: 0,
            active:false

        },

        // all resources require a name and type to be passed in when instance is created...


        // resources can be added and removed...
        add_currency: function (num_added) {
            if (this.num+num_added <= DefaultResourceMax){
                this.num += num_added;
            }
        },

        remove_currency: function (num_removed) {
            if (this.num >= num_removed) {
                this.num -= num_removed
            }
        }
    });

    // initialize all the resources in 'resource_list'

    var Resources = {};

    for (i=0;i < rl.ResourceList.length;i++){
        Resources[rl.ResourceList[i]['name']] = new ResourceModel({name:rl.ResourceList[i]['name'],type:rl.ResourceList[i]['type']})
    }


    return {ResourceModel:ResourceModel,
            Resources:Resources}


});