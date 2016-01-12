/**
 * Created by jessestone on 1/8/16.
 */


define(function (require) {
    var bb = require('backbone');
    var hm = require('../models/holdingModel');


    var PurchaseHoldingCollection = bb.Collection.extend({

        model:hm.HoldingModel

    });


    return {PurchaseHoldingCollection:PurchaseHoldingCollection}


});