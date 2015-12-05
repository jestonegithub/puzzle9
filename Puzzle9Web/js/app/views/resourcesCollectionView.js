/**
 * Created by jessebstone on 11/27/15.
 */

define(function (require) {
    var mn = require('marionette');
    var riv = require('./resourceItemView');


    var ResourcesCollectionView = mn.CollectionView.extend({

        childView: riv.ResourceItemView


    });


    return{ResourcesCollectionView:ResourcesCollectionView}

});