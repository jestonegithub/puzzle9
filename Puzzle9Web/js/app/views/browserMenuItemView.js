/**
 * Created by jessestone on 12/21/15.
 */

define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var tmpl = require('hbs!app/templates/browserMenuView');
    var _ = require('underscore');



    var BrowserMenuItemView = mn.ItemView.extend({

        template: tmpl,

        className:"browser_menu_style",

        initialize:function(){


            var this_model = this.model;
            this.on('show',function(){

                $('.bookmark_container').find('a').click(function(){

                    console.log($(this).text());
                    this_model.set({'current_site':$(this).text()});
                    this_model.setCurrentSite();
                    console.log('firing message');
                    bb.trigger('new_site_selected');
                })


            })

        },

        modelEvents: {
            'change:bookmark_list': 'render'

        }





    });


    return {BrowserMenuItemView:BrowserMenuItemView}

});