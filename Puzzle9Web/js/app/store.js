/**
 * Created by jessebstone on 9/29/15.
 */

define(['./ewallet','bootstrap'],function(ewallet,bootstrap) {


    var init = function(){


        var store_selection_text = '<div class="container">'+
            '<div class="dropdown">'+
            '<button class="btn btn-xs dropdown-toggle" type="button" data-toggle="dropdown">Bookmarks'+
            '<span class="caret"></span></button>'+
            '<ul class="dropdown-menu">'+
            '<li class="dropdown-header">www</li>'+
            '<li><a id="test">Super Servers</a></li>'+
            '<li class="divider"></li>'+
            '<li class="dropdown-header">deep</li>'+
            '<li><a href="#">royal road</a></li>'+
            '</ul></div> </div>';


        //$('#home_screen').append('<div id=store_div class="store_style">' +
        //'<div id=store_title class=store_style>STORE</div>'+
        //'<div id=store_menu><p id="store_menu_nile" class="store_menu">Nile</p><p id="store_menu" class="store_menu">Ebay</p></div>'+
        //'<div id=store_content_area></div></div>')


        $('#home_screen').append('<div id=store_div class="store_style"><div id="store_top"><div id="store_title">TORque</div>' +
        '<div id="store_address"><input type="text" name="command" id="torque_address_input" placeholder="localhost:8123/#" disabled></div><div id=store_menu>'+store_selection_text+'</div></div>'+
        '<div id=store_content_area></div></div>');

        $('#test').click(function(){alert('hey')})


    };



    return {init:init}


});

