/**
 * Created by jessestone on 1/6/16.
 */

define(function (require) {
    var mn = require('marionette');
    var tmpl = require('hbs!app/templates/entOverviewView');


    var EntOverviewView = mn.ItemView.extend({

        template: tmpl,

        id:"ent_overview_div"


    });


    return {EntOverviewView:EntOverviewView}

});