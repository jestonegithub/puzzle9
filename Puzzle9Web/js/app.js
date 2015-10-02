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
        app: '../app'
        //jquery:'jquery-1.7.min.js'
    },
    shim: {
        'progressbar':{ deps:[],exports: 'progressbar'},
        'd3':{deps:[],exports:'d3'},
        'nv':{deps:['d3'],exports:'nv'},
        'bootstrap':{deps:['jquery'],exports:'bootstrap'}


    }
});

// Start the main app logic.
requirejs(['jquery','app/game'],
    function   (jquery,game) {
        //jQuery, and the app/sub module are all
        //loaded and can be used here now.

        //puzzle.init();
        game.init();

    });