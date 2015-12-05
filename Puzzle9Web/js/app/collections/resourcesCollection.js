/**
 * Created by jessebstone on 11/26/15.
 */

define(function (require) {
    // var mn = require('marionette');
    var bb = require('backbone');
    var rm = require('../models/resourceModel');


    // a RESOURCE is anything that can be quantified, obtained and used to 'purchase' something else - currency is the exception and is a separate model

    var ResourcesCollection = bb.Collection.extend({

        model: rm.ResourceModel

    });

    return {ResourcesCollection:ResourcesCollection}


});