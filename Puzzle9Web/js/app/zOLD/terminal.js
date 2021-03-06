/**
 * Created by jessebstone on 9/18/15.
 */



define(['./controlPanel','./ewallet','./store','./network_display','./rbn_ent','./rbn_actor'],function(controlPanel,ewallet,store,network_display,rbnent,rbnactor) {

    var control_nickname={

        "install bit-o-matic": 'ewallet',
        store:'store'

    };


    var init = function(){


        $('#home_screen').append('<div id=terminal_div>' +
        '<div id=terminal_head>user137 - bash</div>' +
        '<div id=terminal_body>' +
        '<div id=terminal_display>Last login: Sun Sep 20 00:40:14 on ttys000 </div>' +
        '<div id=terminal_input></div><div id=command_line_user>user137$</div>' +
        '<form id=form_command autocomplete="off">'+
            '<input type="text" name="command" id="user_input">'+
            '<input type="submit" value="Submit" id="console_submit">'+
        '</form>' +
        '</div>');

        $('#terminal_div').hide();

        $('#console_submit').hide();
        $("#form_command").submit(function(e) {
            e.preventDefault();
            input_handler();

        });

    };


    //actions

    var display_file = function (file) {

        //command is 'read filename'


    };

    var install_system = function(system) {

        //command is 'sudo apt-get install bitzwallet'


    };


    //handler for calling action functions based on user input

    var input_handler = function() {

        //define a dictionary of commands -> action functions

        var action ={

            //'sudo apt-get install bitzwallet'

            "install bit-o-matic":function(){


                ewallet.init();
                controlPanel.add_control('ewallet');
                controlPanel.ewallet_loaded=true;


            },

            "install crypton":function(){

                if ((controlPanel.ewallet_loaded != true) || (controlPanel.store_loaded != false)){

                }
                else {
                    store.init();
                    controlPanel.add_control('store');
                    controlPanel.store_loaded = true;
                }


            },

            "install entrepreneur":function(){

                    rbnent.init();
                    controlPanel.add_control('rbn_ent');
                    controlPanel.rbn_ent_loaded = true;


            },

            show_network:network_display.display_network


        };




        // read command line input
        var input1=$('#user_input').val();

        //call appropriate action function using dict. - check that action hasn't already been done...

        if (action[input1] != undefined) {


            if (controlPanel[control_nickname[input1] + '_loaded'] != true) {
                action[input1]();
            }
            //cloudHack.add_control('ewallet');

        }
        //clear command from input line after enter

        $('#user_input').val("");




    };



    //DEV ONLY!!!!!!!

    setTimeout(function() {
        ewallet.init();
        controlPanel.add_control('ewallet');
        controlPanel.ewallet_loaded = true;

        store.init();
        controlPanel.add_control('store');
        controlPanel.store_loaded = true;


        rbnent.init();
        controlPanel.add_control('rbn_ent');
        controlPanel.rbn_ent_loaded = true;
    },2000);


    return{init:init}
    //input_handler:input_handler};

});