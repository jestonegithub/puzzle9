/**
 * Created by jessestone on 1/11/16.
 */



define(function (require) {
    var bb = require('backbone');
    var om = require('../models/occupationModel');

    var ManageHoldingCollection = bb.Collection.extend({

        model:om.OccupationModel

    });


    return {ManageHoldingCollection:ManageHoldingCollection}


});