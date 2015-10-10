/**
 * Created by jessebstone on 9/20/15.
 */

define([],function() {



    var terminal_loaded = false;

    var ewallet_loaded = false;

    var store_loaded = false;


    var add_control = function(control_type){

            var control_click_handler = {
                home: function(){

                    // clicking on the home button hides all the other control windows


                    $('#terminal_div').hide();
                    $('#ewallet_div').hide();
                    $('#store_div').hide();
                },

                terminal: function(){

                 //clicking on the terminal button toggles the terminal div

                    $('#ewallet_div').hide();
                    $('#store_div').hide();
                    $('#terminal_div').toggle();

                },

                ewallet: function(){

                    //clicking on the ewallet button toggles the ewallet div

                    $('#terminal_div').hide();
                    $('#store_div').hide();
                    $('#ewallet_div').toggle();
                },

                store: function(){

                    //clicking on the market button toggles the market div

                    $('#terminal_div').hide();
                    $('#ewallet_div').hide();
                    $('#store_div').toggle();
                }
            };



            //create icon on control panel and attach the appropriate click handler
            var icon_class={

                home: 'class="fa fa-home"',
                terminal: 'class="fa fa-terminal"',
                ewallet: 'class="fa fa-university"',
                store: 'class="fa fa-shopping-cart"'
            };

            var div_id ={

                home: '.fa-home',
                terminal: '.fa-terminal',
                ewallet: '.fa-university',
                store: '.fa-shopping-cart'


            };

            $('#control_panel').append('<div class=control_icons><i '+icon_class[control_type]+'></i></div>');
            $(div_id[control_type]).click(control_click_handler[control_type]);


        };




    return {terminal_loaded:terminal_loaded,
            ewallet_loaded:ewallet_loaded,
            store_loaded:store_loaded,
            add_control:add_control}



});