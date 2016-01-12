/**
 * Created by jessestone on 1/6/16.
 */


define(function (require) {
    var mn = require('marionette');
    var mhiv = require('../views/entManageHoldingsItemView');


    var EntManageHoldingsCollectionView = mn.CollectionView.extend({

        childView:mhiv.ManageHoldingsItemView,

        id:"ent_manage_holdings_div",

        initialize:function(){

            //call onListingChange when the view is shown
            this.on('show',function(){this.onManagedChange()},this);

        },

        onManagedChange:function(){

            //we need to get the collection of 'listed' holdings (those that can be purchased, but aren't purchased yet)


        }

    });

    return {EntManageHoldingsCollectionView:EntManageHoldingsCollectionView}

});