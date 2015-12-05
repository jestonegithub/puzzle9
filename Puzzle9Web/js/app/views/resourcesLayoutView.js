/**
 * Created by jessebstone on 11/27/15.
 */


define(function (require) {
    var mn = require('marionette');
    var resources_tmpl = require('hbs!app/templates/resourcesLayoutView');




    var ResourcesLayoutView = mn.LayoutView.extend({

        template: resources_tmpl,

        id:"resources_div",

        regions: {
            region1a:"#region1a",
            region1b:"#region1b",
            region1c:"#region1c",
            region1d:"#region1d",
            region1e:"#region1e",
            region1f:"#region1f",
            region1g:"#region1g",
            region2a:"#region2a",
            region2b:"#region2b",
            region2c:"#region2c",
            region2d:"#region2d",
            region2e:"#region2e",
            region2f:"#region2f",
            region2g:"#region2g",
            region3a:"#region3a",
            region3b:"#region3b",
            region3c:"#region3c",
            region3d:"#region3d",
            region3e:"#region3e",
            region3f:"#region3f",
            region3g:"#region3g"

        }


    });


    return {ResourcesLayoutView:ResourcesLayoutView}



});