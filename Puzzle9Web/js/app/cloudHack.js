/**
 * Created by jessebstone on 9/17/15.
 */


define(['./rainmeter','./terminal','./feed','./controlPanel','progressbar','./ewallet','./store'],function(rainmeter,terminal,feed,controlPanel,progressbar,ewallet,store) {


    var home_screen_initialized = false;


    var init = function() {

       //runs on starting cloudHack UI for the first time...

       //first we need to generate a 'connecting to remote desktop' transition screen - we can load resources during this time if needed

 // DEV ONLY
        //$('#start_button').css('margin-top','300px');
        //
        //var start_button = new progressbar.Circle('#start_button', {strokeWidth:2, color:'#FCB03C',text:{value:'Connecting to Remote Desktop'}});
        //
        //
        //start_button.animate(1,{duration:1800},function() {
        //
        //    $('#start_button').remove();
        //    $('#game_wrapper').fadeIn('slow');
        //
        //});


        $('body').append('<div id=game_wrapper></div>');
       // $('#game_wrapper').hide();

            //divide game_wrapper into an inventory div, a money panel div, a control panel div and a homescreen div
            $('#game_wrapper').append('<div id=inventory></div><div id=money_panel></div><div id="inventory_menu"></div><div id=control_panel></div><div id=home_screen>' +
            '<img id=homescreen_image src="../images/city_backdrop.jpg"></div>');




            // fill inventory div with div boxes (these will be dynamically given ids later)
            for (i = 0; i < 42; i++) {

                $('#inventory').append('<div class=inventory_box><div class="item_name"></div><div class="item_value"></div></div>');


            }


            // initialize home_screen
            home_screen_display.init();

            //initialize the terminal (for later use), initialize the control panel: add home icon and terminal icon, startup the feed



            controlPanel.add_control('home');
            terminal.init();
            controlPanel.add_control('terminal');
            controlPanel.terminal_loaded = true;

        ////remove all below after dev done & remove ewallet from deps of cloudhack...
        //$('#home_screen').append('<div id=terminal></div>');
        //
        //
        //ewallet.init();
        //
        //
        //store.init();
        //$('#store_div').hide();







   };








    var home_screen_display = {


        init: function(){

            home_screen_initialized=true;
            rainmeter.init();

            feed.init();

        }



    };







    var inventory_display = {


        init: function(){





        }




    };





    return {init:init
    };



});