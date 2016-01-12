/**
 * Created by jessestone on 1/6/16.
 */


define(function (require) {
    var mn = require('marionette');
    var phiv = require('../views/entPurchaseHoldingsItemView');


    var EntPurchaseHoldingsCollectionView = mn.CollectionView.extend({

        childView:phiv.PurchaseHoldingsItemView,

        id:"ent_purchase_holdings_div",

        events:{



        },

        initialize:function(){

            //call onListingChange when the view is shown
            this.on('show',function(){this.onPurchaseChange()},this);

        },

        onPurchaseChange:function(){

            //we need to get the collection of 'listed' (purchaseable) holdings (those that can be purchased, but aren't purchased yet)


        }

    });

    return {EntPurchaseHoldingsCollectionView:EntPurchaseHoldingsCollectionView}

});