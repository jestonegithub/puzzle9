/**
 * Created by jessestone on 12/14/15.
 */

define(function (require) {
    var mn = require('marionette');
    var res_tmpl = require('hbs!app/templates/minerView');


    var ResourceItemView = mn.ItemView.extend({

        template: res_tmpl,

        className:"active_resource",

        modelEvents: {
            'change:quantity': 'render'
        }


    });


    return {ResourceItemView:ResourceItemView}

});