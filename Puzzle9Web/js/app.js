/**
 * Created by jessebstone on 2/2/15.
 */

requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app',
        backbone:'backbone',
        text:'../text',
        marionette:'backbone.marionette',
        underscore:'underscore',
        hbs: 'lib/require-handlebars-plugin/hbs'
        //jquery:'jquery-1.7.min.js'
    },
    shim: {
        'progressbar':{ deps:[],exports: 'progressbar'},
        'd3':{deps:[],exports:'d3'},
        'nv':{deps:['d3'],exports:'nv'},
        'bootstrap':{deps:['jquery'],exports:'bootstrap'}
    },
    hbs: { // optional
        helpers: true,            // default: true
        templateExtension: 'hbs', // default: 'hbs'
        partialsUrl: ''           // default: ''
    }

});

// Start the main app logic.
requirejs(['jquery','app/GameEngine'],
    function   (jquery,GameEngine) {
        //jQuery, and the app/sub module are all
        //loaded and can be used here now.

        //GameEngine is loaded and that is where the game logic starts...there is no call here



    });