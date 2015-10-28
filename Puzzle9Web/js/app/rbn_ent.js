/**
 * Created by jessebstone on 10/24/15.
 */

define(['./controlPanel'],function(controlPanel) {


    var init = function() {


        //sets up the rbn_ent divs and menu

        $('#home_screen').append('<div id=rbn_ent_div class="rbn_ent_style">' +
        '<div id="rbn_ent_header"><div id=rbn_ent_title class=rbn_ent_style>RBN Entrepreneur</div>'+
        '<div id=rbn_ent_menu><p class="rbn_ent_menu">My Companies</p><p class="rbn_ent_menu">Company Listings</p></div></div>'+
        '<div id=rbn_ent_content_area>' +
        '<div id=rbn_ent_landing>' +
        '<p>Go ahead.  Build that corporate EMPIRE you\'ve always dreamed of.</p>'+
        '</div>'+
        '<div id=mycomps>Testing My Companies</div>' +
        '<div id=compsales>Testing Company Listings</div>'+
        '</div>'+
        '</div>');


        $('#mycomps').hide();
        $('#compsales').hide();

        //set handlers for the menu buttons
        $('#mycomps').click(function(){

            $('#compsales').css('text-decoration','none');
            $('#mycomps').css('text-decoration','underline');

            $('#rbn_ent_landing').hide();
            $('#compsales').hide();
            $('#mycomps').show();

        });

        $('#compsales').click(function(){

            $('#mycomps').css('text-decoration','none');
            $('#compsales').css('text-decoration','underline');

            $('#rbn_ent_landing').hide();
            $('#mycomps').hide();
            $('#compsales').show();


        });



        $('#rbn_ent_div').hide();










    };




    return{init:init}


});