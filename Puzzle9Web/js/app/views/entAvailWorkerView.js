/**
 * Created by jessestone on 1/12/16.
 */


define(function (require) {
    var mn = require('marionette');
    var tmpl = require('hbs!app/templates/entAvailWorkerView');


    var EntAvailWorkerView = mn.ItemView.extend({

        template: tmpl,

        id:"ent_avail_worker_div",


        modelEvents:{

            'change:workers_avail':'render'

        }


    });

    return {EntAvailWorkerView:EntAvailWorkerView}

});